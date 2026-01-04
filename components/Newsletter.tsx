"use client";

import { useState } from "react";

const SUBSTACK_SUBSCRIBE_URL = "https://substack.com/@gokmenceliks";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const copy = {
    placeholder: "Email address",
    button: "Subscribe",
    hint: "Get an email when I publish something new.",
  };

  return (
    <section className="py-12">
      <p className="mb-4 font-sans text-sm text-[var(--foreground)]">{copy.hint}</p>
      <form
        className="flex w-full flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          const v = email.trim();
          const url = new URL(SUBSTACK_SUBSCRIBE_URL);
          if (v) url.searchParams.set("email", v);
          window.open(url.toString(), "_blank", "noopener,noreferrer");
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
          className="h-11 shrink-0 rounded-none bg-[var(--accent)] px-5 font-sans text-[14px] text-white hover:bg-[var(--accent-dark)]"
        >
          {copy.button}
        </button>
      </form>
      <p className="mt-3 font-sans text-[12px] text-[var(--muted)]">
        Opens Substack to confirm subscription.
      </p>
    </section>
  );
}


