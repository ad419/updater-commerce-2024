import { SanityLive } from "@/sanity/lib/live";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";
import { Toaster } from "sonner";
import Header from "../components/Header";
import "../globals.css";
import DarkModeProvider from "../utils/DarkModeProvider";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// fetch the main banner from sanity

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <DarkModeProvider>
            <Header />
            <main>{children}</main>
            <SanityLive />
            <Toaster />
          </DarkModeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
