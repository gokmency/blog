"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function AskBar() {
  const { language } = useLanguage();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const examples =
    language === "tr"
      ? [
          "Ne iş yapıyorsun?",
          "GRAINZ nedir?",
          "Hangi teknolojilerle çalışıyorsun?",
          "Nerede yaşıyorsun?",
          "Web3 tarafında en güçlü olduğun alan ne?",
          "Şu ara ne geliştiriyorsun?",
        ]
      : [
          "What do you do?",
          "What is GRAINZ?",
          "What technologies do you use?",
          "Where do you live?",
          "What’s your strongest area in Web3?",
          "What are you building lately?",
        ];

  const ask = async (qOverride?: string) => {
    const q = (qOverride ?? question).trim();
    if (!q) return;
    setStatus("loading");
    setAnswer("");
    setError("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const json = (await res.json()) as { ok: boolean; answer?: string; error?: string; message?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.message || json.error || `HTTP_${res.status}`);
      }
      setAnswer(json.answer || "");
    } catch (e) {
      setError(e instanceof Error ? e.message : "FAILED");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <section className="py-12">
      <div className="flex items-center gap-3 border border-[var(--line)] bg-transparent px-3 py-2">
        <Search size={16} className="text-[var(--muted)]" />
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void ask();
          }}
          placeholder={language === "tr" ? "Hakkımda soru sor…" : "Ask about me…"}
          className="h-10 w-full bg-transparent font-sans text-[16px] text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
        />
        <button
          type="button"
          onClick={() => void ask()}
          disabled={status === "loading" || !question.trim()}
          className="h-10 shrink-0 rounded-none bg-[var(--accent)] px-4 font-sans text-[14px] text-white hover:bg-[var(--accent-dark)] disabled:opacity-60"
        >
          {status === "loading" ? "…" : language === "tr" ? "Sor" : "Ask"}
        </button>
      </div>

      <div className="mt-3 font-sans text-[12px] text-[var(--muted)]">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {examples.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                setQuestion(q);
                void ask(q);
              }}
              className="hover:text-[var(--accent)] hover:underline decoration-[var(--accent)] underline-offset-4"
            >
              “{q}”
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div className="mt-6 font-sans text-[12px] text-[var(--muted)]">Error: {error}</div>
      ) : null}

      {answer ? (
        <div className="mt-8 font-serif text-[18px] leading-[1.85] text-[var(--foreground)]">
          {answer}
        </div>
      ) : null}
    </section>
  );
}


