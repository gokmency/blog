"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";

export function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [note, setNote] = useState("");
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setNote("");
    // focus first field
    setTimeout(() => firstFieldRef.current?.focus(), 0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const send = async () => {
    const vEmail = email.trim();
    const vMessage = message.trim();
    if (!vEmail || !vMessage) return;

    setStatus("sending");
    setNote("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: vEmail, message: vMessage, website }),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; message?: string };
      if (!res.ok || !json.ok) throw new Error(json.message || json.error || "FAILED");
      setStatus("sent");
      setNote("Sent.");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch {
      setStatus("error");
      setNote("Could not send. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="absolute left-1/2 top-1/2 w-[min(520px,calc(100vw-48px))] -translate-x-1/2 -translate-y-1/2">
        <div className="border border-[var(--line)] bg-[var(--background)] px-5 py-5 text-[var(--foreground)] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <div id={titleId} className="font-serif text-[18px]">
                Contact
              </div>
              <div className="mt-1 font-sans text-[12px] text-[var(--muted)]">
                Leave an email and a short message.
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 place-items-center border border-[var(--line)] hover:border-[var(--accent)]"
              aria-label="Close modal"
            >
              <X size={14} className="text-[var(--muted)]" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {/* Honeypot for bots */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              aria-hidden="true"
            />
            <input
              ref={firstFieldRef}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-none border border-[var(--line)] bg-transparent px-3 font-sans text-[14px] text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-0"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full resize-none rounded-none border border-[var(--line)] bg-transparent px-3 py-2 font-sans text-[14px] text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-0"
            />
            <div className="flex items-center justify-between gap-4">
              <div className="font-sans text-[12px] text-[var(--muted)]">{note}</div>
              <button
                type="button"
                onClick={() => void send()}
                disabled={status === "sending" || !email.trim() || !message.trim()}
                className="h-10 rounded-none bg-[var(--accent)] px-4 font-sans text-[14px] text-white hover:bg-[var(--accent-dark)] disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


