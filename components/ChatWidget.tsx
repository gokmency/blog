"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X, Send } from "lucide-react";
import { type Lang } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export function ChatWidget({ lang }: { lang: Lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const t = {
    talkToMe: lang === "tr" ? "Benimle konuş" : "Talk to me",
    placeholder: lang === "tr" ? "Bir şeyler sor..." : "Ask something...",
    greeting: lang === "tr"
      ? "Selam! Ben Gökmen AI. Projelerim, teknolojiler veya benim hakkımda merak ettiğin her şeyi sorabilirsin."
      : "Hi! I'm Gökmen AI. Ask me anything about my projects, stack, or background.",
    error: lang === "tr" ? "Üzgünüm, şu an cevap veremiyorum." : "Sorry, I can't answer right now.",
    typing: lang === "tr" ? "Gökmen AI yazıyor..." : "Gökmen AI is typing..."
  };

  useEffect(() => {
    setMessages([
      {
        id: "init-1",
        role: "assistant",
        text: t.greeting,
      },
    ]);
  }, [lang]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: userMsg.text }),
      });
      const json = await res.json();

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: (res.ok && json.ok) ? json.answer : t.error,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: t.error,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4 font-sans md:bottom-6 md:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="flex h-[500px] w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--background)] shadow-2xl md:h-[600px] md:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--background)] p-4">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[var(--line)]">
                   <Image
                     src="/assets/gokmen-ai-avatar.png"
                     alt="Gökmen AI"
                     fill
                     className="object-cover"
                   />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">Gökmen AI</h3>
                  <p className="text-xs text-[var(--muted)]">Bot</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-[var(--muted)] hover:bg-[var(--line)] hover:text-[var(--foreground)]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto bg-[var(--background)] p-4"
            >
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[var(--foreground)] text-[var(--background)]'
                          : 'bg-[var(--line)] text-[var(--foreground)]'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-1 rounded-2xl bg-[var(--line)] px-4 py-3">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--muted)] [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--muted)] [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--muted)]"></span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-[var(--line)] bg-[var(--background)] p-4">
              <div className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--background)] px-4 py-2 focus-within:border-[var(--accent)]">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void handleSend();
                  }}
                  placeholder={t.placeholder}
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                />
                <button
                  onClick={() => void handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="text-[var(--accent)] disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Big Avatar Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-end justify-center outline-none"
      >
        <div className="relative h-40 w-40 md:h-64 md:w-64">
           <Image
             src={isHovering && !isOpen ? "/assets/gokmen-ai-avatar-thumbs.png" : "/assets/gokmen-ai-avatar.png"}
             alt="Chat with Gökmen AI"
             fill
             className="object-contain drop-shadow-2xl transition-all duration-300"
             priority
           />
        </div>

         {/* Tooltip / Label */}
         {!isOpen && (
            <div className="absolute bottom-[80%] right-[70%] whitespace-nowrap rounded-lg bg-[var(--foreground)] px-3 py-1.5 text-xs font-medium text-[var(--background)] shadow-lg">
              {t.talkToMe}
              <div className="absolute -bottom-1 right-2 h-2 w-2 rotate-45 bg-[var(--foreground)]"></div>
            </div>
         )}
      </motion.button>
    </div>
  );
}
