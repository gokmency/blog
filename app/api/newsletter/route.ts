import { NextResponse } from "next/server";
import { subscribeToNewsletter, unsubscribeFromNewsletter } from "@/lib/hashnode/api";

function isValidEmail(email: string) {
  // intentionally simple (keeps minimal + avoids over-rejecting)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: unknown; mode?: unknown };
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const mode = body.mode === "resend" ? "resend" : "subscribe";

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "INVALID_EMAIL" }, { status: 400 });
    }

    // Hashnode sometimes keeps users in PENDING; calling subscribe again may not resend.
    // For explicit resends, we clear the previous pending by unsubscribing first.
    if (mode === "resend") {
      try {
        await unsubscribeFromNewsletter(email);
      } catch {
        // ignore: user might not exist yet
      }
    }

    const status = await subscribeToNewsletter(email);
    return NextResponse.json({ ok: true, status });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: "FAILED", message }, { status: 500 });
  }
}


