"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function AskPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const ask = async () => {
    const q = question.trim();
    if (!q) return;
    setStatus("loading");
    setAnswer("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const json = (await res.json()) as { ok: boolean; answer?: string };
      if (!res.ok || !json.ok) throw new Error("FAILED");
      setAnswer(json.answer || "");
      setStatus("idle");
    } catch {
      setStatus("error");
      setAnswer("Could not answer right now.");
    }
  };

  return (
    <section className="py-16">
      <div className="mx-auto w-full max-w-[680px]">
        <h1 className="mb-8 font-serif text-[28px] leading-tight tracking-tight text-[var(--foreground)]">
          Ask about Burak
        </h1>

        <div className="flex items-center gap-3 border border-[var(--line)] bg-transparent px-3 py-2">
          <Search size={16} className="text-[var(--muted)]" />
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void ask();
            }}
            placeholder="Ask a question…"
            className="h-10 w-full bg-transparent font-sans text-[16px] text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
          />
          <button
            type="button"
            onClick={() => void ask()}
            disabled={status === "loading" || !question.trim()}
            className="h-10 shrink-0 rounded-none bg-[var(--accent)] px-4 font-sans text-[14px] text-white hover:bg-[var(--accent-dark)] disabled:opacity-60"
          >
            {status === "loading" ? "…" : "Ask"}
          </button>
        </div>

        <div className="mt-6 font-sans text-[12px] text-[var(--muted)]">
          Examples: “What do you write about?” · “How can I contact you?” · “What’s the purpose of this site?”
        </div>

        {answer ? (
          <div className="mt-10 font-serif text-[18px] leading-[1.85] text-[var(--foreground)]">
            {answer}
          </div>
        ) : null}
      </div>
    </section>
  );
}


