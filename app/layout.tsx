import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";
import { TamgaRails } from "@/components/TamgaRails";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Burak Gökmen Çelik",
    template: "%s — Burak Gökmen Çelik",
  },
  description: "Personal blog & portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${merriweather.variable} bg-[var(--background)]`}
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
        >{`(() => {
  try {
    const t = localStorage.getItem('bgc_theme');
    const theme = (t === 'light' || t === 'dark') ? t : 'light';
    document.documentElement.dataset.theme = theme;
  } catch {}
})();`}</Script>
      </head>
      <body className="antialiased bg-[var(--background)] text-[var(--foreground)]">
        <Providers>
          <TamgaRails />
          <div className="mx-auto min-h-screen w-full max-w-[680px] px-6">
            <Header />
            <main className="py-16">{children}</main>
            <footer className="py-12 font-sans text-sm text-[var(--muted)]">
              © {new Date().getFullYear()} Burak Gökmen Çelik
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
