import { useState } from 'react'
import { SectionLabel } from '../ui/SectionLabel'
import { usePreferences } from '../../contexts/PreferencesContext'
import type { TranslationKey } from '../../i18n/translations'

interface ToolInfo { category: TranslationKey; connects: string[]; description: TranslationKey }
const tools: Record<string, ToolInfo> = {
  JavaScript: { category: 'tech.language', connects: ['React', 'APIs REST'], description: 'tech.javascript' }, TypeScript: { category: 'tech.language', connects: ['React', 'Next.js', 'Vite'], description: 'tech.typescript' }, React: { category: 'tech.frontend', connects: ['TypeScript', 'Vite', 'Next.js', 'Vercel'], description: 'tech.react' }, 'Next.js': { category: 'tech.frontend', connects: ['React', 'TypeScript', 'Vercel'], description: 'tech.next' }, Vite: { category: 'tech.frontend', connects: ['React', 'TypeScript', 'Vercel'], description: 'tech.vite' }, Python: { category: 'tech.language', connects: ['APIs REST'], description: 'tech.python' }, 'C / C++': { category: 'tech.language', connects: [], description: 'tech.cpp' }, SQL: { category: 'tech.data', connects: ['Supabase'], description: 'tech.sql' }, Supabase: { category: 'tech.backend', connects: ['SQL', 'APIs REST'], description: 'tech.supabase' }, 'APIs REST': { category: 'tech.services', connects: ['JavaScript', 'Python', 'Supabase'], description: 'tech.rest' }, Git: { category: 'tech.tool', connects: ['GitHub'], description: 'tech.git' }, GitHub: { category: 'tech.tool', connects: ['Git', 'Vercel'], description: 'tech.github' }, Vercel: { category: 'tech.deploy', connects: ['React', 'Next.js', 'Vite', 'GitHub'], description: 'tech.vercel' }, Codex: { category: 'tech.ai', connects: ['Git', 'GitHub'], description: 'tech.codex' },
}

export function Technologies() {
  const [selected, setSelected] = useState('React')
  const current = tools[selected]
  const { t } = usePreferences()
  return (
    <section className="technologies technologies--ecosystem" id="tecnologias" aria-labelledby="technologies-title">
      <div className="technologies__intro"><SectionLabel index="03">{t('tech.label')}</SectionLabel><h2 id="technologies-title">{t('tech.title1')}<br /><em>{t('tech.title2')}</em></h2></div>
      <div className="tool-ecosystem">
        <div className="tool-ecosystem__nodes" aria-label={t('tech.select')}>
          {Object.entries(tools).map(([name, info]) => {
            const state = selected === name ? ' tool-node--selected' : current.connects.includes(name) ? ' tool-node--connected' : ''
            return <button type="button" className={`tool-node${state}`} aria-pressed={selected === name} onClick={() => setSelected(name)} key={name}><span>{t(info.category)}</span>{name}</button>
          })}
        </div>
        <aside className="tool-inspector" aria-live="polite">
          <div className="tool-inspector__bar"><span>{t('tech.inspector')}</span><i /></div><span className="tool-inspector__category">{t(current.category)}</span><h3>{selected}</h3><p>{t(current.description)}</p>
          <div><span>{t('tech.related')}</span><strong>{current.connects.length ? current.connects.join(' · ') : t('tech.independent')}</strong></div>
        </aside>
      </div>
    </section>
  )
}
