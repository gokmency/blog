"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TAMGAS, type TamgaItem } from "@/lib/tamgas/data";

type Corner = "tl" | "tr" | "bl" | "br";

const CORNERS: Corner[] = ["tl", "tr", "bl", "br"];

function cornerClass(corner: Corner) {
  switch (corner) {
    case "tl":
      return "top-6 left-6";
    case "tr":
      return "top-6 right-6";
    case "bl":
      return "bottom-6 left-6";
    case "br":
      return "bottom-6 right-6";
  }
}

export function TamgaFrame({
  items = TAMGAS,
}: {
  items?: TamgaItem[];
}) {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);
  const active = activeId ? byId.get(activeId) : null;
  const activeCopy = active ? (language === "tr" ? active.tr : active.en) : null;

  // We only render 4 symbols as a minimalist "frame" (one per corner).
  const frameItems = useMemo(() => items.slice(0, 4), [items]);

  return (
    <div className="pointer-events-none hidden md:block">
      {/* Corner frame */}
      <div className="fixed inset-0 z-10">
        {CORNERS.map((corner, idx) => {
          const item = frameItems[idx];
          if (!item) return null;
          const copy = language === "tr" ? item.tr : item.en;
          const isActive = activeId === item.id;

          return (
            <button
              key={corner}
              type="button"
              className={[
                "pointer-events-auto fixed",
                cornerClass(corner),
                "h-10 w-10 p-0",
                "opacity-20 hover:opacity-60 focus:opacity-60",
                "outline-none",
              ].join(" ")}
              onMouseEnter={() => setActiveId(item.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(item.id)}
              onBlur={() => setActiveId(null)}
              aria-label={`${copy.title}: ${copy.description}`}
            >
              <Image
                src={item.image}
                alt={copy.title}
                className={[
                  "h-10 w-10 select-none",
                  "object-contain",
                  isActive ? "contrast-125" : "",
                ].join(" ")}
                priority={false}
              />
            </button>
          );
        })}
      </div>

      {/* Minimal info line (updates on hover/focus) */}
      <div className="fixed bottom-6 left-1/2 z-10 w-[min(680px,calc(100vw-48px))] -translate-x-1/2">
        <div className="font-sans text-[12px] text-[#666]">
          {activeCopy ? (
            <>
              <span className="text-[#111]">{activeCopy.title}</span>
              <span className="mx-2">—</span>
              <span>{activeCopy.description}</span>
            </>
          ) : (
            <span className="opacity-0">.</span>
          )}
        </div>
      </div>
    </div>
  );
}


