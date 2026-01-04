import { NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: unknown; message?: unknown; website?: unknown };

    // Honeypot (bots)
    if (typeof body.website === "string" && body.website.trim().length) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "INVALID_EMAIL" }, { status: 400 });
    }
    if (!message || message.length < 2 || message.length > 4000) {
      return NextResponse.json({ ok: false, error: "INVALID_MESSAGE" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;

    if (!apiKey || !to || !from) {
      return NextResponse.json({ ok: false, error: "NOT_CONFIGURED" }, { status: 500 });
    }

    const subject = `New message from gokmens.com`;
    const text = `From: ${email}\n\n${message}\n`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return NextResponse.json(
        { ok: false, error: "RESEND_FAILED", message: errText.slice(0, 500) },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: "FAILED", message }, { status: 500 });
  }
}


