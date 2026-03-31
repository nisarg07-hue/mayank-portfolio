export type WorkItem = {
  id: string;
  title: string;
  brand?: string;
  role: string;
  year: string;
  duration?: string;
  tags: string[];
  poster: string;
  video?: string;
};

export const selectedWork: WorkItem[] = [
  {
    id: "midnight-cuts",
    title: "Midnight Cuts",
    brand: "Studio / Spec",
    role: "Edit • Rhythm",
    year: "2026",
    duration: "0:42",
    tags: ["Ads", "Music"],
    poster: "/work/poster-1.svg",
  },
  {
    id: "silverframe",
    title: "Silverframe",
    brand: "Brand",
    role: "Edit • Color polish",
    year: "2025",
    duration: "0:30",
    tags: ["Ads"],
    poster: "/work/poster-2.svg",
  },
  {
    id: "wedding-film",
    title: "A Quiet Vow",
    brand: "Wedding Film",
    role: "Edit • Sound polish",
    year: "2025",
    duration: "1:10",
    tags: ["Weddings"],
    poster: "/work/poster-3.svg",
  },
  {
    id: "shorts",
    title: "Shorts: Hook → Payoff",
    brand: "Creator",
    role: "Edit • Repurpose",
    year: "2024",
    duration: "0:20",
    tags: ["Shorts"],
    poster: "/work/poster-4.svg",
  },
  {
    id: "music-video",
    title: "Neon Pulse",
    brand: "Music Video",
    role: "Edit • Motion accents",
    year: "2024",
    duration: "0:55",
    tags: ["Music"],
    poster: "/work/poster-5.svg",
  },
  {
    id: "product",
    title: "Precision Product",
    brand: "Brand",
    role: "Edit • Pace",
    year: "2023",
    duration: "0:35",
    tags: ["Ads"],
    poster: "/work/poster-6.svg",
  },
];

