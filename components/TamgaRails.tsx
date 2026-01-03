"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { TAMGAS, type TamgaItem } from "@/lib/tamgas/data";

type TooltipState = {
  x: number;
  y: number;
  side: "left" | "right";
  item: TamgaItem;
} | null;

export function TamgaRails({ items = TAMGAS }: { items?: TamgaItem[] }) {
  const { language } = useLanguage();
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const raf = useRef<number | null>(null);

  // Use 28 tamgas total: 14 on the left + 14 on the right (no scroll).
  const [left, right] = useMemo(() => {
    const capped = items.slice(0, 28);
    return [capped.slice(0, 14), capped.slice(14, 28)] as const;
  }, [items]);

  const hide = () => setTooltip(null);

  const showFromEl = (el: HTMLElement, side: "left" | "right", item: TamgaItem) => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      // For both sides we store an x that will be used as `left`.
      // Right side uses translate(-100%, -50%) to "dock" the tooltip to the left of x.
      const x = side === "left" ? rect.right + 12 : rect.left - 12;
      const y = rect.top + rect.height / 2;
      setTooltip({ x, y, side, item });
    });
  };

  const renderItem = (item: TamgaItem, side: "left" | "right") => {
    const copy = language === "tr" ? item.tr : item.en;

    return (
      <button
        key={item.id}
        type="button"
        className={[
          "pointer-events-auto",
          "grid place-items-center",
          "h-11 w-11 lg:h-12 lg:w-12",
          "opacity-25 hover:opacity-95 focus:opacity-95",
          "transition-opacity duration-150",
          "outline-none",
        ].join(" ")}
        onMouseEnter={(e) => showFromEl(e.currentTarget, side, item)}
        onMouseLeave={hide}
        onFocus={(e) => showFromEl(e.currentTarget, side, item)}
        onBlur={hide}
        aria-label={`${copy.title}: ${copy.description}`}
      >
        <Image
          src={item.image}
          alt={copy.title}
          width={48}
          height={48}
          className="h-9 w-9 select-none object-contain contrast-125 lg:h-10 lg:w-10"
          priority={false}
        />
      </button>
    );
  };

  return (
    <div className="pointer-events-none hidden md:block">
      {/* Left rail */}
      <div className="fixed left-0 top-0 bottom-0 z-10 flex items-center">
        <div className="pointer-events-auto flex h-[calc(100vh-120px)] flex-col justify-between py-4 pl-4 pr-2">
          {left.map((i) => renderItem(i, "left"))}
        </div>
      </div>

      {/* Right rail */}
      <div className="fixed right-0 top-0 bottom-0 z-10 flex items-center">
        <div className="pointer-events-auto flex h-[calc(100vh-120px)] flex-col justify-between py-4 pr-4 pl-2">
          {right.map((i) => renderItem(i, "right"))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip ? (
        <div
          className="pointer-events-none fixed z-20"
          style={{
            top: tooltip.y,
            left: tooltip.x,
            transform:
              tooltip.side === "left"
                ? "translateY(-50%)"
                : "translate(-100%, -50%)",
          }}
        >
          <div className="w-[260px] rounded-none border border-[var(--line)] bg-[var(--background)] px-3 py-2 font-sans text-[12px] text-[var(--foreground)] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            <div className="mb-1 text-[var(--accent)]">{(language === "tr" ? tooltip.item.tr : tooltip.item.en).title}</div>
            <div className="text-[var(--muted)]">{(language === "tr" ? tooltip.item.tr : tooltip.item.en).description}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}


