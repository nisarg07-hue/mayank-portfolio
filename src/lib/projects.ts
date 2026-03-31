import type { Project } from '@/types'

export const projects: Project[] = [
  {
    slug: 'aether-brand-film',
    title: 'Aether Brand Film',
    client: 'Aether Studio',
    category: 'Brand Film',
    year: '2024',
    thumbnail: '/images/project-1.webp',
    video: '/videos/project-1.webm',
    description:
      'A cinematic brand film that transformed raw footage into a luxury visual narrative.',
    tags: ['Brand Film', 'Color Grade', 'Sound Design'],
    caseStudy: {
      heroImage: '/images/project-1-hero.webp',
      problem:
        'Aether needed a brand film that felt aspirational but grounded — transforming 4 hours of raw footage into a 60-second commercial that worked across social and broadcast.',
      approach:
        'Cinematic colour grading with warm-cool contrast to signal luxury. Pacing synced precisely to the music score. Three revision rounds to align with brand tone.',
      result:
        '2.4M organic views in 7 days. Brand partnership inquiries increased 340% in the following month.',
      metrics: [
        { label: 'Organic Views', value: '2.4M' },
        { label: 'Days to 1M', value: '3' },
        { label: 'Partnership Increase', value: '340%' },
        { label: 'Deliverables', value: '6' },
      ],
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      nextSlug: 'solar-reels-campaign',
    },
  },
  {
    slug: 'solar-reels-campaign',
    title: 'Solar Reels Campaign',
    client: 'Solar Inc',
    category: 'Social Media',
    year: '2024',
    thumbnail: '/images/project-2.webp',
    video: '/videos/project-2.webm',
    description:
      'A multi-platform social campaign built for maximum retention and shareability.',
    tags: ['Social Media', 'Reels', 'Motion Graphics'],
    caseStudy: {
      heroImage: '/images/project-2-hero.webp',
      problem:
        'Solar Inc needed a social-first campaign with consistent visual identity across 12 short-form videos for Instagram, YouTube Shorts, and TikTok.',
      approach:
        'Modular edit system — one base grade, platform-specific aspect ratios and pacing. Caption animations designed for silent viewing.',
      result:
        '8.7M combined views across platforms. Average watch-through rate of 73% vs industry average of 45%.',
      metrics: [
        { label: 'Combined Views', value: '8.7M' },
        { label: 'Watch-through Rate', value: '73%' },
        { label: 'Videos Delivered', value: '12' },
        { label: 'Platforms', value: '3' },
      ],
      nextSlug: 'the-midnight-edit',
    },
  },
  {
    slug: 'the-midnight-edit',
    title: 'The Midnight Edit',
    client: 'Independent',
    category: 'Cinematic',
    year: '2023',
    thumbnail: '/images/project-3.webp',
    video: '/videos/project-3.webm',
    description:
      'A personal cinematic short exploring urban nightlife through long-exposure and slow motion.',
    tags: ['Cinematic', 'Color Grade', 'Personal Work'],
    caseStudy: {
      heroImage: '/images/project-3-hero.webp',
      problem:
        'A personal project to explore cinematic language — specifically contrast between long exposure stillness and high-speed slow motion in urban environments.',
      approach:
        'Shot over 3 nights in Pune. S-log3 footage graded in DaVinci Resolve with a custom LUT. Original score composed specifically for the cut.',
      result:
        'Featured in 2 independent film festivals. 400K views on YouTube, highest-performing personal work to date.',
      metrics: [
        { label: 'YouTube Views', value: '400K' },
        { label: 'Film Festivals', value: '2' },
        { label: 'Shoot Nights', value: '3' },
      ],
      nextSlug: 'aether-brand-film',
    },
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProject(currentSlug: string): Project | undefined {
  const current = getProjectBySlug(currentSlug)
  if (!current?.caseStudy?.nextSlug) return undefined
  return getProjectBySlug(current.caseStudy.nextSlug)
}
