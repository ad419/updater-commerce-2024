"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface DarkModeProviderProps {
  children: ReactNode;
}

export default function DarkModeProvider({ children }: DarkModeProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
