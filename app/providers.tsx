"use client";

import React from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider initialTheme="light">
      <LanguageProvider initialLanguage="en">{children}</LanguageProvider>
    </ThemeProvider>
  );
}


