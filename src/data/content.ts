import type { Project } from '../types/content'

export const navItems = [
  { label: 'Presentación', href: '#inicio' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Tecnologías', href: '#tecnologias' },
  { label: 'Contacto', href: '#contacto' },
]

export const projects: Project[] = [
  {
    id: 'rift-deck',
    index: '01',
    name: 'Rift Deck',
    technologies: ['Python', 'React', 'JavaScript', 'TypeScript', 'Next.js', 'APIs REST', 'Supabase', 'SQL', 'IA Integration', 'Vite', 'Vercel', 'Git', 'GitHub'],
    url: 'https://www.riftdeck.com.ar',
  },
  {
    id: 'myfinteem',
    index: '02',
    name: 'MyFinteem',
    technologies: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'Supabase', 'SQL', 'IA Integration', 'Vite', 'Vercel', 'Git', 'GitHub'],
  },
]

export const technologies = [
  'JavaScript', 'TypeScript', 'Python', 'C / C++', 'React', 'Next.js', 'Vite',
  'SQL', 'Supabase', 'APIs REST', 'Git', 'GitHub', 'BitBucket', 'Jira', 'Vercel',
  'IA Integration',
] as const

export const socialLinks = {
  github: 'https://github.com/AgusstinMelo',
  linkedin: 'https://www.linkedin.com/in/agust%C3%ADn-melo-6831a680/',
  resume: '/cv-agustin-melo.pdf',
}
