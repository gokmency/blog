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
  metadataBase: new URL("https://gokmens.com"),
  title: {
    default: "Burak Gökmen Çelik",
    template: "%s — Burak Gökmen Çelik",
  },
  description: "Personal blog & portfolio.",
  verification: {
    google: "NdcyiLGbqcOu3TpgComh7tslzt3zVTcVl0vBhjSsswo",
  },
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
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="beforeInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-596LBZWK');`}</Script>
        {/* End Google Tag Manager */}

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

        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-TM2ZE2ELCT"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-TM2ZE2ELCT');
        `}</Script>
      </head>
      <body className="antialiased bg-[var(--background)] text-[var(--foreground)]">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-596LBZWK"
            height={0}
            width={0}
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

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
