export interface Project {
  slug: string
  title: string
  client: string
  category: string
  year: string
  thumbnail: string
  video?: string
  description: string
  tags: string[]

  caseStudy?: {
    heroImage: string
    problem: string
    approach: string
    result: string
    metrics: {
      label: string
      value: string
    }[]
    embedUrl?: string
    nextSlug?: string
  }
}

export interface NavLink {
  label: string
  href: string
  isExternal?: boolean
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export interface Service {
  id: number
  title: string
  description: string
  deliverables: string[]
  price: string
  duration: string
  image?: string
}
