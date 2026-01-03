"use client";

import React from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider initialTheme="dark">
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}


