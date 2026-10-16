import { useEffect, useRef, useState } from 'react'
import { projects, technologies } from '../../data/content'
import { usePreferences } from '../../contexts/PreferencesContext'
import type { TranslationKey } from '../../i18n/translations'
import { SectionLabel } from '../ui/SectionLabel'
import apiRestLogo from '../../assets/api-rest.webp'
import bitbucketLogo from '../../assets/bitbucket.png'
import cppLogo from '../../assets/C.png'
import gitLogo from '../../assets/git.png'
import githubLogo from '../../assets/github.png'
import aiLogo from '../../assets/ia-integrations.png'
import javascriptLogo from '../../assets/javascript.webp'
import jiraLogo from '../../assets/jira.webp'
import nextLogo from '../../assets/nextjs.png'
import pythonLogo from '../../assets/python.webp'
import reactLogo from '../../assets/React.webp'
import sqlLogo from '../../assets/sql.jpg'
import supabaseLogo from '../../assets/supabase.webp'
import typescriptLogo from '../../assets/typescript.webp'
import vercelLogo from '../../assets/vercel.webp'
import viteLogo from '../../assets/vite.jpg'

interface ToolInfo { category: TranslationKey; description: TranslationKey; use: TranslationKey; logo: string; fillLogo?: boolean; largeLogo?: boolean }

const tools: Record<string, ToolInfo> = {
  JavaScript: { category: 'tech.language', description: 'tech.javascript', use: 'tech.use.javascript', logo: javascriptLogo, largeLogo: true },
  TypeScript: { category: 'tech.language', description: 'tech.typescript', use: 'tech.use.typescript', logo: typescriptLogo, fillLogo: true },
  React: { category: 'tech.framelibrary', description: 'tech.react', use: 'tech.use.react', logo: reactLogo },
  'Next.js': { category: 'tech.framelibrary', description: 'tech.next', use: 'tech.use.next', logo: nextLogo, fillLogo: true },
  Vite: { category: 'tech.tools', description: 'tech.vite', use: 'tech.use.vite', logo: viteLogo },
  Python: { category: 'tech.language', description: 'tech.python', use: 'tech.use.python', logo: pythonLogo },
  'C / C++': { category: 'tech.language', description: 'tech.cpp', use: 'tech.use.cpp', logo: cppLogo },
  SQL: { category: 'tech.language', description: 'tech.sql', use: 'tech.use.sql', logo: sqlLogo },
  Supabase: { category: 'tech.platforms', description: 'tech.supabase', use: 'tech.use.supabase', logo: supabaseLogo },
  'APIs REST': { category: 'tech.integrations', description: 'tech.rest', use: 'tech.use.rest', logo: apiRestLogo },
  Git: { category: 'tech.tools', description: 'tech.git', use: 'tech.use.git', logo: gitLogo },
  GitHub: { category: 'tech.platforms', description: 'tech.github', use: 'tech.use.github', logo: githubLogo, fillLogo: true },
  BitBucket: { category: 'tech.platforms', description: 'tech.bitbucket', use: 'tech.use.bitbucket', logo: bitbucketLogo },
  Jira: { category: 'tech.tools', description: 'tech.jira', use: 'tech.use.jira', logo: jiraLogo, fillLogo: true },
  Vercel: { category: 'tech.platforms', description: 'tech.vercel', use: 'tech.use.vercel', logo: vercelLogo },
  'IA Integration': { category: 'tech.integrations', description: 'tech.aiIntegration', use: 'tech.use.aiIntegration', logo: aiLogo },
}

const names = [...technologies]
// Kept off until the relationship view has a final interaction design.
const SHOW_TECH_RELATIONSHIPS = false
const technologyRelations = [
  ['JavaScript', 'TypeScript'], ['JavaScript', 'React'], ['JavaScript', 'Vite'],
  ['TypeScript', 'React'], ['TypeScript', 'Next.js'], ['TypeScript', 'Vite'], ['TypeScript', 'IA Integration'],
  ['React', 'Next.js'], ['React', 'Vite'], ['React', 'Supabase'], ['React', 'APIs REST'],
  ['Next.js', 'Supabase'], ['Next.js', 'Vercel'], ['Vite', 'Vercel'],
  ['Python', 'SQL'], ['Python', 'APIs REST'], ['Python', 'IA Integration'],
  ['SQL', 'Supabase'], ['SQL', 'IA Integration'], ['Supabase', 'APIs REST'],
  ['Supabase', 'IA Integration'], ['APIs REST', 'IA Integration'],
  ['Git', 'GitHub'], ['Git', 'BitBucket'], ['GitHub', 'Jira'], ['GitHub', 'Vercel'],
  ['BitBucket', 'Jira'], ['BitBucket', 'Vercel'],
] as const

const connectionsFor = (name: string) => names.filter((candidate) => technologyRelations.some(([from, to]) =>
  (from === name && to === candidate) || (to === name && from === candidate)))
const clampScale = (scale: number) => Math.min(1.6, Math.max(.65, scale))

export function Technologies() {
  const [selected, setSelected] = useState('React')
  const [inspectorOpen, setInspectorOpen] = useState(false)
  const [view, setView] = useState({ x: 0, y: 0, scale: 1 })
  const [dragging, setDragging] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ pointerId: number; x: number; y: number; originX: number; originY: number } | null>(null)
  const suppressToolClickRef = useRef(false)
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>())
  const current = tools[selected]
  const currentConnections = SHOW_TECH_RELATIONSHIPS ? connectionsFor(selected) : []
  const { t } = usePreferences()

  const usages = projects.filter((project) => project.technologies.includes(selected))
  const zoomAt = (nextScale: number, originX?: number, originY?: number) => {
    const viewport = viewportRef.current
    if (!viewport) return
    const scale = clampScale(nextScale)
    const x = originX ?? viewport.clientWidth / 2
    const y = originY ?? viewport.clientHeight / 2
    setView((current) => ({ x: x - ((x - current.x) / current.scale) * scale, y: y - ((y - current.y) / current.scale) * scale, scale }))
  }
  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const bounds = viewport.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      setView((current) => {
        const scale = clampScale(current.scale * (event.deltaY < 0 ? 1.1 : .9))
        return { x: x - ((x - current.x) / current.scale) * scale, y: y - ((y - current.y) / current.scale) * scale, scale }
      })
    }
    viewport.addEventListener('wheel', handleWheel, { passive: false })
    return () => viewport.removeEventListener('wheel', handleWheel)
  }, [])
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('.tool-map-controls')) return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, originX: view.x, originY: view.y }
    suppressToolClickRef.current = false
  }
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const deltaX = event.clientX - drag.x
    const deltaY = event.clientY - drag.y
    if (!suppressToolClickRef.current && Math.hypot(deltaX, deltaY) < 5) return
    suppressToolClickRef.current = true
    setDragging(true)
    setView((current) => ({ ...current, x: drag.originX + deltaX, y: drag.originY + deltaY }))
  }
  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return
    dragRef.current = null
    setDragging(false)
  }
  const chooseWithKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? names.length - 1 : (index + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1) + names.length) % names.length
    const next = names[nextIndex]
    setSelected(next)
    setInspectorOpen(true)
    nodeRefs.current.get(next)?.focus()
  }

  return (
    <section className="technologies technologies--ecosystem" id="tecnologias" aria-labelledby="technologies-title">
      <div className="technologies__intro">
        <SectionLabel index="03" light>{t('tech.label')}</SectionLabel>
        <div><h2 id="technologies-title">{t('tech.title1')}<br /><em>{t('tech.title2')}</em></h2><p>{t('tech.intro')}</p></div>
      </div>

      <div className="tool-ecosystem">
        <div className={`tool-ecosystem__map${dragging ? ' tool-ecosystem__map--dragging' : ''}`} ref={viewportRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={stopDragging} onPointerCancel={stopDragging}>
          <div className="tool-map-controls" onDoubleClick={(event) => event.stopPropagation()}>
            <span>wheel: zoom · drag: move</span>
            <button type="button" onClick={() => zoomAt(view.scale - .15)} aria-label="Zoom out">−</button>
            <button type="button" onClick={() => setView({ x: 0, y: 0, scale: 1 })} aria-label="Reset view">{Math.round(view.scale * 100)}%</button>
            <button type="button" onClick={() => zoomAt(view.scale + .15)} aria-label="Zoom in">+</button>
          </div>
          <div className="tool-ecosystem__nodes" role="list" aria-label={t('tech.select')} style={{ transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})` }}>
            {names.map((name, index) => {
              const info = tools[name]
              const state = selected === name ? ' tool-node--selected' : SHOW_TECH_RELATIONSHIPS && currentConnections.includes(name) ? ' tool-node--connected' : ''
              return <button type="button" role="listitem" className={`tool-node tool-node--${index + 1}${state}`} aria-pressed={selected === name} onClick={() => { if (suppressToolClickRef.current) { suppressToolClickRef.current = false; return } setSelected(name); setInspectorOpen(true) }} onKeyDown={(event) => chooseWithKeyboard(event, index)} ref={(node) => { if (node) nodeRefs.current.set(name, node); else nodeRefs.current.delete(name) }} key={name}><span className={`tool-node__mark${info.fillLogo ? ' tool-node__mark--fill' : ''}${info.largeLogo ? ' tool-node__mark--large' : ''}`} aria-hidden="true"><img src={info.logo} alt="" /></span><span className="tool-node__category">{t(info.category)}</span><strong>{name}</strong></button>
            })}
          </div>
        </div>

        <aside className={`tool-inspector${inspectorOpen ? ' tool-inspector--open' : ''}`} aria-live="polite">
          <button className="tool-inspector__close" type="button" onClick={() => setInspectorOpen(false)} aria-label={t('nav.close')}>×</button>
          <div className="tool-inspector__bar"><span>{t('tech.inspector')}</span><i /></div>
          <div className="tool-inspector__identity"><span className="tool-inspector__category">{t(current.category)}</span><span className={`tool-inspector__logo${current.fillLogo ? ' tool-inspector__logo--fill' : ''}${current.largeLogo ? ' tool-inspector__logo--large' : ''}`} aria-hidden="true"><img src={current.logo} alt="" /></span></div>
          <h3>{selected}</h3><p>{t(current.description)}</p>
          {SHOW_TECH_RELATIONSHIPS && <div className="tool-inspector__section"><span>{t('tech.related')}</span><strong>{currentConnections.length ? currentConnections.join(' · ') : t('tech.independent')}</strong></div>}
          <div className="tool-inspector__section"><span>{t('tech.primaryUse')}</span><strong>{t(current.use)}</strong></div>
          <div className="tool-inspector__section tool-inspector__usage"><span>{t('tech.usedIn')}</span>{usages.length ? usages.map((project) => <a href="#proyectos" key={project.id}>{project.name}<b>↗</b></a>) : <small>{t('tech.noUsage')}</small>}</div>
        </aside>
      </div>

    </section>
  )
}
