export interface Project {
  id: string
  index: string
  name: string
  eyebrow: string
  description: string
  contribution?: string
  technologies: string[]
  url?: string
  githubUrl?: string
  image?: string
  tone: 'light' | 'dark'
}

export interface TechnologyGroup {
  title: string
  items: string[]
}
