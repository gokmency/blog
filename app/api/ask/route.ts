import { NextResponse } from "next/server";
import { buildProfilePrompt } from "@/lib/ai/profile";

// Very small in-memory rate limiter (best-effort on serverless).
const buckets = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
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

    const body = (await req.json()) as { question?: unknown };
    const question = typeof body.question === "string" ? body.question.trim() : "";

    if (!question || question.length < 2 || question.length > 500) {
      return NextResponse.json({ ok: false, error: "INVALID_QUESTION" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ ok: false, error: "NOT_CONFIGURED" }, { status: 500 });
    }

    const system = buildProfilePrompt();
    const prompt = `${system}\n\nUser question:\n${question}\n\nAnswer:`;

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
            temperature: 0.2,
            maxOutputTokens: 250,
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
    if (!isGreetingQuestion(question)) {
      answer = stripGreeting(answer);
    }
    return NextResponse.json({ ok: true, answer });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: "FAILED", message }, { status: 500 });
  }
}


