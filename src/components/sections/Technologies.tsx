import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { projects } from '../../data/content'
import { usePreferences } from '../../contexts/PreferencesContext'
import type { TranslationKey } from '../../i18n/translations'
import { SectionLabel } from '../ui/SectionLabel'

interface ToolInfo { category: TranslationKey; connects: string[]; description: TranslationKey; mark: string }

const tools: Record<string, ToolInfo> = {
  JavaScript: { category: 'tech.language', connects: ['TypeScript', 'React', 'APIs REST'], description: 'tech.javascript', mark: 'JS' },
  TypeScript: { category: 'tech.language', connects: ['JavaScript', 'React', 'Next.js', 'Vite'], description: 'tech.typescript', mark: 'TS' },
  React: { category: 'tech.frontend', connects: ['JavaScript', 'TypeScript', 'Vite', 'Next.js', 'Vercel'], description: 'tech.react', mark: '⚛' },
  'Next.js': { category: 'tech.frontend', connects: ['React', 'TypeScript', 'Vercel'], description: 'tech.next', mark: 'N' },
  Vite: { category: 'tech.frontend', connects: ['React', 'TypeScript', 'Vercel'], description: 'tech.vite', mark: 'V' },
  Python: { category: 'tech.language', connects: ['APIs REST'], description: 'tech.python', mark: 'Py' },
  'C / C++': { category: 'tech.language', connects: [], description: 'tech.cpp', mark: 'C+' },
  SQL: { category: 'tech.data', connects: ['Supabase'], description: 'tech.sql', mark: 'SQL' },
  Supabase: { category: 'tech.backend', connects: ['SQL', 'APIs REST'], description: 'tech.supabase', mark: 'S' },
  'APIs REST': { category: 'tech.services', connects: ['JavaScript', 'Python', 'Supabase'], description: 'tech.rest', mark: 'API' },
  Git: { category: 'tech.tool', connects: ['GitHub'], description: 'tech.git', mark: 'G' },
  GitHub: { category: 'tech.tool', connects: ['Git', 'Vercel'], description: 'tech.github', mark: 'GH' },
  Vercel: { category: 'tech.deploy', connects: ['React', 'Next.js', 'Vite', 'GitHub'], description: 'tech.vercel', mark: '▲' },
  Codex: { category: 'tech.ai', connects: ['Git', 'GitHub'], description: 'tech.codex', mark: '</>' },
}

const names = Object.keys(tools)
const edges = names.flatMap((from) => tools[from].connects
  .filter((to) => names.indexOf(from) < names.indexOf(to) || !tools[to]?.connects.includes(from))
  .map((to) => ({ from, to })))

interface Point { x: number; y: number }
interface DrawnEdge { from: string; to: string; start: Point; end: Point }
const canonicalTechnology = (name: string) => name === 'APIs Rest' ? 'APIs REST' : name

export function Technologies() {
  const [selected, setSelected] = useState('React')
  const [usageIndex, setUsageIndex] = useState(0)
  const [drawnEdges, setDrawnEdges] = useState<DrawnEdge[]>([])
  const ecosystemRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>())
  const current = tools[selected]
  const { t } = usePreferences()

  useLayoutEffect(() => {
    const ecosystem = ecosystemRef.current
    if (!ecosystem) return
    const measure = () => {
      const bounds = ecosystem.getBoundingClientRect()
      setDrawnEdges(edges.flatMap(({ from, to }) => {
        const startNode = nodeRefs.current.get(from)
        const endNode = nodeRefs.current.get(to)
        if (!startNode || !endNode) return []
        const a = startNode.getBoundingClientRect()
        const b = endNode.getBoundingClientRect()
        return [{ from, to, start: { x: a.left + a.width / 2 - bounds.left, y: a.top + a.height / 2 - bounds.top }, end: { x: b.left + b.width / 2 - bounds.left, y: b.top + b.height / 2 - bounds.top } }]
      }))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(ecosystem)
    window.addEventListener('resize', measure)
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  const usages = projects.filter((project) => project.technologies.some((technology) => canonicalTechnology(technology) === selected))
  const practiceProject = usages[usageIndex] ?? usages[0]
  useEffect(() => setUsageIndex(0), [selected])

  const changeUsage = (direction: number) => {
    setUsageIndex((index) => (index + direction + usages.length) % usages.length)
  }
  const chooseWithKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? names.length - 1 : (index + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1) + names.length) % names.length
    const next = names[nextIndex]
    setSelected(next)
    nodeRefs.current.get(next)?.focus()
  }

  return (
    <section className="technologies technologies--ecosystem" id="tecnologias" aria-labelledby="technologies-title">
      <div className="technologies__intro">
        <SectionLabel index="03" light>{t('tech.label')}</SectionLabel>
        <div><h2 id="technologies-title">{t('tech.title1')}<br /><em>{t('tech.title2')}</em></h2><p>{t('tech.intro')}</p></div>
      </div>

      <div className="tool-ecosystem">
        <div className="tool-ecosystem__map" ref={ecosystemRef}>
          <svg className="tool-connections" aria-hidden="true">
            {drawnEdges.map(({ from, to, start, end }) => {
              const active = from === selected || to === selected
              const middle = start.x + (end.x - start.x) / 2
              return <g className={active ? 'tool-connection tool-connection--active' : 'tool-connection'} key={`${from}-${to}`}><path d={`M ${start.x} ${start.y} H ${middle} V ${end.y} H ${end.x}`} /><circle cx={middle} cy={end.y} r="3" /></g>
            })}
          </svg>
          <div className="tool-ecosystem__nodes" role="list" aria-label={t('tech.select')}>
            {Object.entries(tools).map(([name, info], index) => {
              const related = current.connects.includes(name)
              const state = selected === name ? ' tool-node--selected' : related ? ' tool-node--connected' : ' tool-node--muted'
              return <button type="button" role="listitem" className={`tool-node tool-node--${index + 1}${state}`} aria-pressed={selected === name} onClick={() => setSelected(name)} onKeyDown={(event) => chooseWithKeyboard(event, index)} ref={(node) => { if (node) nodeRefs.current.set(name, node); else nodeRefs.current.delete(name) }} key={name}><span className="tool-node__mark" aria-hidden="true">{info.mark}</span><span className="tool-node__category">{t(info.category)}</span><strong>{name}</strong></button>
            })}
          </div>
        </div>

        <aside className="tool-inspector" aria-live="polite">
          <div className="tool-inspector__bar"><span>{t('tech.inspector')}</span><i /></div><span className="tool-inspector__category">{t(current.category)}</span><h3>{selected}</h3><p>{t(current.description)}</p>
          <div className="tool-inspector__section"><span>{t('tech.related')}</span><strong>{current.connects.length ? current.connects.join(' · ') : t('tech.independent')}</strong></div>
          <div className="tool-inspector__section tool-inspector__usage"><span>{t('tech.usedIn')}</span>{usages.length ? usages.map((project) => <a href="#proyectos" key={project.id}>{project.name}<b>↗</b></a>) : <small>{t('tech.noUsage')}</small>}</div>
        </aside>
      </div>

      <div className={`technology-practice${practiceProject ? '' : ' technology-practice--empty'}`} aria-live="polite">
        {practiceProject ? <>
          <div className="technology-practice__intro"><span>{t('tech.practice')} / {practiceProject.index}</span><h3>{practiceProject.name}</h3><p>{t(practiceProject.id === 'rift-deck' ? 'project.rift.description' : 'project.myfinteem.description')}</p></div>
          <div className="technology-practice__stack" aria-label={t('projects.confirmed')}>
            {practiceProject.technologies.map((technology, index) => <span className="technology-practice__item" key={technology}><i>{tools[canonicalTechnology(technology)]?.mark ?? '•'}</i><span>{technology}</span>{index < practiceProject.technologies.length - 1 && <b aria-hidden="true">→</b>}</span>)}
          </div>
          <div className="technology-practice__actions">
            {usages.length > 1 && <div className="technology-practice__navigation"><button type="button" onClick={() => changeUsage(-1)} aria-label={t('projects.previous')}>←</button><span>{usageIndex + 1} / {usages.length}</span><button type="button" onClick={() => changeUsage(1)} aria-label={t('projects.nextProject')}>→</button></div>}
            <a href="#proyectos" aria-label={`${t('tech.viewProject')}: ${practiceProject.name}`}>↗</a>
          </div>
        </> : <div className="technology-practice__empty"><span>{t('tech.practice')}</span><h3>{selected}</h3><p>{t('tech.noUsage')}</p></div>}
      </div>
    </section>
  )
}
