"use client";

import React from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider initialTheme="light">
      {children}
    </ThemeProvider>
  );
}


