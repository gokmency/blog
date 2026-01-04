export type PersonalProfile = {
  name: string;
  title: string;
  location?: string;
  bio: string;
  work: string[];
  interests: string[];
  highlights: string[];
  contact: {
    email?: string;
  };
  socials: {
    website?: string;
    linkedin?: string;
    x?: string;
    hashnode?: string;
    github?: string;
  };
};

// Fill this with your canonical, up-to-date information.
// The chatbot will ONLY answer from this profile to avoid hallucinations.
export const PROFILE: PersonalProfile = {
  name: "Burak Gökmen Çelik",
  title: "Thinker. Builder. Nomad.",
  location: "TODO: City/Country (optional)",
  bio: "TODO: 2–4 sentences summary about who you are.",
  work: [
    "TODO: What you do professionally (1)",
    "TODO: What you do professionally (2)",
  ],
  interests: ["TODO: Topic 1", "TODO: Topic 2", "TODO: Topic 3"],
  highlights: [
    "TODO: Highlight 1 (project/achievement)",
    "TODO: Highlight 2",
  ],
  contact: {
    email: "TODO: contact email (optional)",
  },
  socials: {
    website: "https://gokmens.com",
    linkedin: "https://www.linkedin.com/in/gokmencelik/",
    x: "https://x.com/gokmeneth",
    hashnode: "https://gokmens.hashnode.dev",
    github: "https://github.com/gokmency",
  },
};

export function buildProfilePrompt() {
  return `
You are an assistant for a personal website. Your ONLY job is to answer questions about the person described below.

Hard rules:
- Answer in the SAME language as the user's message (e.g., Turkish in → Turkish out, English in → English out).
- Use ONLY the PROFILE data. Do not guess or invent details.
- If the user asks something not in the PROFILE, say you don't know and ask what detail to add.
- If the user asks for social links, share the relevant links from PROFILE.socials.
- Keep answers concise (3–8 sentences). Prefer factual bullets when appropriate.

PROFILE (source of truth):
${JSON.stringify(PROFILE, null, 2)}
`.trim();
}


