import type { Project, TechnologyGroup } from '../types/content'

export const navItems = [
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Tecnologías', href: '#tecnologias' },
  { label: 'Cómo trabajo', href: '#como-trabajo' },
  { label: 'Contacto', href: '#contacto' },
]

export const projects: Project[] = [
  {
    id: 'rift-deck',
    index: '01',
    name: 'Rift Deck',
    eyebrow: 'Producto web · Wild Rift',
    description:
      'Una aplicación web relacionada con League of Legends: Wild Rift, pensada para convertir información del juego en una experiencia clara y útil.',
    contribution: 'Proyecto de desarrollo web.',
    technologies: [],
    url: 'https://www.riftdeck.com.ar',
    tone: 'dark',
  },
  {
    id: 'myfinteem',
    index: '02',
    name: 'MyFinteem',
    eyebrow: 'Proyecto de software',
    description:
      'Un proyecto colaborativo cuya historia, alcance y contribución se documentarán aquí con detalle.',
    contribution: 'Participación pendiente de completar.',
    technologies: [],
    tone: 'light',
  },
]

export const technologyGroups: TechnologyGroup[] = [
  { title: 'Lenguajes', items: ['JavaScript', 'TypeScript', 'Python', 'C / C++'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Vite'] },
  { title: 'Datos y servicios', items: ['SQL', 'Supabase', 'APIs REST'] },
  { title: 'Herramientas y despliegue', items: ['Git', 'GitHub', 'Vercel'] },
  { title: 'Desarrollo asistido por IA', items: ['Codex'] },
]

export const socialLinks = {
  email: '',
  github: '',
  linkedin: '',
  resume: '',
}
