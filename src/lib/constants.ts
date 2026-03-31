import type { Service } from "@/types";

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Brand Films",
    description:
      "Cinematic long-form content that tells your brand's story. " +
      "From concept through colour grade — every frame serves the narrative.",
    deliverables: [
      "60–180 second hero film",
      "Full colour grade + LUT",
      "Sound design + score sync",
      "3 revision rounds",
      "All source files delivered",
    ],
    price: "₹18,000",
    duration: "10–14 days",
    image: "/images/service-brand-films.webp",
  },
  {
    id: 2,
    title: "Social Reels",
    description:
      "Short-form video built for retention. Pacing, captions, and " +
      "aspect ratios optimised per platform — Instagram, YouTube Shorts, TikTok.",
    deliverables: [
      "3 reels (15–60 seconds each)",
      "Platform-native aspect ratios",
      "Caption animation",
      "Colour grade",
      "2 revision rounds per reel",
    ],
    price: "₹12,000",
    duration: "5–7 days",
    image: "/images/service-reels.webp",
  },
  {
    id: 3,
    title: "Commercial Edits",
    description:
      "High-energy product and commercial cuts designed to convert. " +
      "Pacing synced to brief, motion graphics where needed.",
    deliverables: [
      "30–90 second commercial",
      "Motion graphics",
      "Voice-over sync",
      "Colour grade",
      "3 revision rounds",
    ],
    price: "₹15,000",
    duration: "7–10 days",
    image: "/images/service-commercial.webp",
  },
  {
    id: 4,
    title: "Documentary & Long-form",
    description:
      "Narrative-driven long-form editing. Interviews, B-roll weaving, " +
      "pacing that holds attention across 5–30 minutes.",
    deliverables: [
      "Full narrative edit",
      "Interview sync + J/L cuts",
      "Colour grade",
      "Sound mix",
      "4 revision rounds",
    ],
    price: "₹25,000",
    duration: "14–21 days",
    image: "/images/service-documentary.webp",
  },
  {
    id: 5,
    title: "Monthly Retainer",
    description:
      "Dedicated editor on call. Consistent output, consistent quality, " +
      "no briefing overhead after the first month.",
    deliverables: [
      "8 reels OR 2 brand films per month",
      "Priority turnaround",
      "Unlimited revisions",
      "Brand kit integration",
      "Weekly delivery schedule",
    ],
    price: "₹40,000 / mo",
    duration: "Ongoing",
    image: "/images/service-retainer.webp",
  },
];

export const AVAILABILITY = {
  isAvailable: true,
  label: 'Available',
  subLabel: 'for projects',
  quarter: (() => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const q = Math.ceil((month + 1) / 3);
    return `Q${q} ${year}`;
  })(),
} as const;
