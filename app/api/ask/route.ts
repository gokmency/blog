import { NextResponse } from "next/server";
import { BURAK_PROFILE } from "@/lib/ai/profile";

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

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const rl = rateLimit(ip, 12, 60_000); // 12 req / minute / IP
    if (!rl.ok) {
      return NextResponse.json({ ok: false, error: "RATE_LIMITED" }, { status: 429 });
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

    const prompt = `${BURAK_PROFILE}\n\nUser question:\n${question}\n\nAnswer:`;

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
        { ok: false, error: "GEMINI_FAILED", status: res.status },
        { status: 502 },
      );
    }

    const answer = extractText(json) || "I don't know based on what I have.";
    return NextResponse.json({ ok: true, answer });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: "FAILED", message }, { status: 500 });
  }
}


