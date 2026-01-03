"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export function Newsletter() {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [lastEmail, setLastEmail] = useState<string>("");
  const isLoading = status === "loading";

  const copy =
    language === "tr"
      ? {
          placeholder: "E-posta adresin",
          button: "Abone ol",
          hint: "Yeni yazılar geldiğinde haber vereyim.",
          pending:
            "Onay e-postası gönderildi (PENDING). 1-5 dk sürebilir. Spam/Promotions klasörünü kontrol et. Gelmezse tekrar gönder ya da Gmail ile dene.",
          confirmed: "Aboneliğin aktif (CONFIRMED).",
          error: "Bir şeyler ters gitti. Tekrar dener misin?",
          resend: "Tekrar gönder",
        }
      : {
          placeholder: "Email address",
          button: "Subscribe",
          hint: "Get an email when I publish something new.",
          pending:
            "Confirmation email sent (PENDING). It may take 1–5 min. Check Spam/Promotions. If it doesn’t arrive, resend or try Gmail.",
          confirmed: "You’re subscribed (CONFIRMED).",
          error: "Something went wrong. Please try again.",
          resend: "Resend",
        };

  const submit = async (nextEmail: string) => {
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: nextEmail }),
      });
      const json = (await res.json()) as {
        ok: boolean;
        status?: "PENDING" | "CONFIRMED";
        error?: string;
        message?: string;
      };
      if (!res.ok || !json.ok) throw new Error(json.message || json.error || "FAILED");

      setLastEmail(nextEmail);
      setStatus("success");
      setMessage(json.status === "CONFIRMED" ? copy.confirmed : copy.pending);
    } catch {
      setStatus("error");
      setMessage(copy.error);
    }
  };

  return (
    <section className="py-12">
      <p className="mb-4 font-sans text-sm text-[var(--foreground)]">{copy.hint}</p>
      <form
        className="flex w-full flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          const nextEmail = email.trim();
          if (!nextEmail.length) return;
          void submit(nextEmail);
        }}
      >
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={copy.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 w-full rounded-none border border-[var(--line)] bg-transparent px-3 font-sans text-[14px] text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-0"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="h-11 shrink-0 rounded-none bg-[var(--accent)] px-5 font-sans text-[14px] text-white hover:bg-[var(--accent-dark)] disabled:opacity-60"
        >
          {copy.button}
        </button>
      </form>
      {message ? (
        <div className="mt-3 flex items-baseline justify-between gap-4">
          <p className="font-sans text-[12px] text-[var(--muted)]">{message}</p>
          {status === "success" && lastEmail ? (
            <button
              type="button"
              onClick={() => void submit(lastEmail)}
              className="shrink-0 font-sans text-[12px] text-[var(--foreground)] hover:text-[var(--accent)] hover:underline decoration-[var(--accent)] underline-offset-4 disabled:opacity-60"
              disabled={isLoading}
            >
              {copy.resend}
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}


