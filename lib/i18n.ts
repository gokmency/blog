export type Lang = "en" | "tr";

export function isLang(value: string): value is Lang {
  return value === "en" || value === "tr";
}

export function getLangFromPathname(pathname: string): Lang {
  const seg = pathname.split("/")[1] || "";
  return isLang(seg) ? seg : "en";
}

export const copy = {
  en: {
    nav: {
      about: "About",
      blog: "Blog",
      languageToggleAria: "Switch language",
    },
    home: {
      headline: "Thinker. Builds. Ships.",
      summaryTitle: "Indie developer & product builder",
      summaryP1: "I build products end-to-end—from idea to launch.",
      summaryP2:
        "If you want to test an idea or need someone who can build and help with marketing/growth, reach out.",
      summaryP3: "",
      ctaGrainz: "Explore GRAINZ",
      ctaAbout: "Read more",
      ctaBlog: "Read the blog",
      askHint: "Ask about me…",
    },
    about: {
      title: "About",
    },
    blog: {
      title: "Blog",
    },
    ask: {
      title: "Ask about Burak",
      placeholder: "Ask a question…",
      button: "Ask",
      examples:
        "Examples: “What do you write about?” · “How can I contact you?” · “What’s the purpose of this site?”",
    },
  },
  tr: {
    nav: {
      about: "Hakkımda",
      blog: "Blog",
      languageToggleAria: "Dil değiştir",
    },
    home: {
      headline: "Düşünür. Kurar. Geliştirir.",
      summaryTitle: "Indie developer & product builder",
      summaryP1: "Fikirden yayına kadar ürünü uçtan uca inşa ederim.",
      summaryP2:
        "Bir fikri test etmek istiyorsan ya da hem inşa edip hem pazarlama/growth tarafında destek olacak birine ihtiyacın varsa iletişime geç.",
      summaryP3: "",
      ctaGrainz: "GRAINZ’i keşfet",
      ctaAbout: "Hakkımda",
      ctaBlog: "Blog’a git",
      askHint: "Hakkımda soru sor…",
    },
    about: {
      title: "Hakkımda",
    },
    blog: {
      title: "Blog",
    },
    ask: {
      title: "Burak hakkında sor",
      placeholder: "Bir soru sor…",
      button: "Sor",
      examples: "Örnekler: “Ne iş yapıyorsun?” · “Nasıl iletişime geçebilirim?” · “Bu sitenin amacı ne?”",
    },
  },
} as const;

