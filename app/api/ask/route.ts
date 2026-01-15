import { NextResponse } from "next/server";
import { buildProfilePrompt } from "@/lib/ai/profile";

// Very small in-memory rate limiter (best-effort on serverless).
const buckets = new Map<string, { count: number; resetAt: number }>();
let lastCleanup = 0;

function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();

  // Clean up old entries periodically.
  if (now > lastCleanup + windowMs * 10) {
    for (const [key, b] of buckets.entries()) {
      if (now > b.resetAt) {
        buckets.delete(key);
      }
    }
    lastCleanup = now;
  }

  const b = buckets.get(key);
  if (!b || now > b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  if (b.count >= limit) return { ok: false, remaining: 0 };
  b.count += 1;
  return { ok: true, remaining: limit - b.count };
}

function extractText(data: unknown): string {
  try {
    const obj = data as any;
    const parts = obj?.candidates?.[0]?.content?.parts;
    if (Array.isArray(parts)) {
      return parts.map((p) => (typeof p?.text === "string" ? p.text : "")).join("").trim();
    }
  } catch {}
  return "";
}

function isGreetingQuestion(q: string) {
  const s = q.trim().toLowerCase();
  return (
    /^(selam|merhaba|sa|hey|hi|hello)\b/.test(s) ||
    /\b(kimsin|sen kimsin|who are you|what are you)\b/.test(s)
  );
}

function stripGreeting(answer: string) {
  return answer
    // Remove common greeting/boilerplate prefixes the model may prepend.
    .replace(/^selam!\s*ben\s+gökmen\s+çelik'?in\s+dijital\s+(zihniyim|asistanıyım)\.?\s*/i, "")
    .replace(/^selam!\s*/i, "")
    .replace(/^bir\s+fikrin\s+varsa\s+paylaş,\s*elimden\s+geldiğince\s+yardımcı\s+olayım\.?\s*/i, "")
    .replace(/^share\s+your\s+idea,\s*i'?ll\s+help\s+as\s+much\s+as\s+i\s+can\.?\s*/i, "")
    .trim();
}

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export async function POST(req: Request) {
  try {
    // Netlify provides client IP in this header:
    // https://docs.netlify.com/edge-functions/headers-and-cookies/#netlify-and-x-forwarded-for
    const ip =
      req.headers.get("x-nf-client-connection-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    // If we can't reliably identify the client, fall back to UA to avoid global 429s.
    const rlKey =
      ip !== "unknown"
        ? ip
        : `${req.headers.get("user-agent") || "ua"}|${req.headers.get("accept-language") || "lang"}`;

    const rl = rateLimit(rlKey, 30, 60_000); // 30 req / minute / client
    if (!rl.ok) {
      return NextResponse.json(
        { ok: false, error: "RATE_LIMITED", message: "Too many requests. Please wait a minute." },
        { status: 429 },
      );
    }

    const body = (await req.json()) as { question?: unknown; messages?: ChatMessage[] };

    // Support both single question (legacy/simple) and history (messages array)
    let question = "";
    let history: ChatMessage[] = [];

    if (Array.isArray(body.messages)) {
      history = body.messages;
      const lastMsg = history[history.length - 1];
      if (lastMsg && lastMsg.role === "user") {
        question = lastMsg.text.trim();
        // Remove the last message from history so we don't duplicate it in the prompt
        history = history.slice(0, -1);
      }
    } else if (typeof body.question === "string") {
      question = body.question.trim();
    }

    if (!question || question.length < 2 || question.length > 500) {
      return NextResponse.json({ ok: false, error: "INVALID_QUESTION" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "NOT_CONFIGURED" }, { status: 500 });
    }

    const system = buildProfilePrompt();

    // Format history for the prompt
    // We only take the last ~10 messages to keep context window manageable
    const relevantHistory = history.slice(-10);
    const historyText = relevantHistory
      .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.text}`)
      .join("\n");

    const prompt = `${system}\n\n### CONVERSATION HISTORY\n${historyText}\n\nUser: ${question}\nAssistant:`;

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7, // Increased for more natural/sincere tone
            maxOutputTokens: 500, // Increased to allow for more detailed answers
          },
        }),
      },
    );

    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: "GEMINI_FAILED",
          status: res.status,
          message: (json as any)?.error?.message || undefined,
        },
        { status: 502 },
      );
    }

    let answer = extractText(json) || "I don't know based on what I have.";

    // We can probably relax the stripGreeting logic if we trust the system prompt more,
    // but keeping it safe is fine.
    if (!isGreetingQuestion(question) && history.length === 0) {
      answer = stripGreeting(answer);
    }
    return NextResponse.json({ ok: true, answer });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: "FAILED", message }, { status: 500 });
  }
}
