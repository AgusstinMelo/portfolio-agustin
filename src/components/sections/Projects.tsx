import { useState } from 'react'
import { projects } from '../../data/content'
import type { Project } from '../../types/content'
import { ArrowIcon } from '../ui/ArrowIcon'
import { SectionLabel } from '../ui/SectionLabel'
import { WindowFrame } from '../ui/WindowFrame'
import { usePreferences } from '../../contexts/PreferencesContext'
import type { TranslationKey } from '../../i18n/translations'

type ProjectTab = 'preview' | 'overview' | 'stack'

function ProjectPlaceholder({ project }: { project: Project }) {
  const { t } = usePreferences()
  return (
    <div className={`project-explorer__placeholder project-visual--${project.id}`} aria-label={`${t('projects.captureSpace')} ${project.name}`}>
      {project.id === 'rift-deck' ? <div className="rift-mark"><span>RD</span><div className="rift-mark__ring" /></div> : <div className="finteem-mark"><span>MY</span><strong>FINTEEM</strong><i /></div>}
      <span className="project-visual__note">{t('projects.capture')}</span>
    </div>
  )
}

function ProjectPanel({ project, tab }: { project: Project; tab: ProjectTab }) {
  const { t } = usePreferences()
  const prefix = project.id === 'rift-deck' ? 'project.rift' : 'project.myfinteem'
  const description = t(`${prefix}.description` as TranslationKey)
  const contribution = t(`${prefix}.contribution` as TranslationKey)
  if (tab === 'preview') return <ProjectPlaceholder project={project} />
  if (tab === 'stack') return (
    <div className="project-panel project-panel--stack">
      <span className="project-panel__comment">// {t('projects.confirmed')}</span>
      {project.technologies.length ? <div>{project.technologies.map((item) => <span key={item}>{item}</span>)}</div> : <p>{t('projects.stackPending')}</p>}
    </div>
  )
  return (
    <div className="project-panel">
      <span className="project-panel__comment">// {t('projects.context')}</span>
      <h4>{project.name}</h4><p>{description}</p>
      <dl><dt>{t('projects.contribution')}</dt><dd>{contribution}</dd></dl>
    </div>
  )
}

export function Projects() {
  const [activeProject, setActiveProject] = useState(0)
  const [activeTab, setActiveTab] = useState<ProjectTab>('preview')
  const project = projects[activeProject]
  const { t } = usePreferences()
  const prefix = project.id === 'rift-deck' ? 'project.rift' : 'project.myfinteem'
  const eyebrow = t(`${prefix}.eyebrow` as TranslationKey)
  const description = t(`${prefix}.description` as TranslationKey)
  const contribution = t(`${prefix}.contribution` as TranslationKey)
  const tabLabels = { preview: t('projects.preview'), overview: t('projects.overview'), stack: t('projects.stack') }
  const chooseProject = (index: number) => { setActiveProject(index); setActiveTab('preview') }

  return (
    <section className="projects projects--explorer" id="proyectos" aria-labelledby="projects-title">
      <div className="projects__bridge" aria-hidden="true"><span>02</span><i /><span>{t('projects.bridge')}</span><i /></div>
      <div className="projects__heading">
        <SectionLabel index="01">{t('projects.label')}</SectionLabel>
        <h2 id="projects-title">{t('projects.title1')}<br /><em>{t('projects.title2')}</em></h2>
        <p><span className="syntax-comment">// </span>{t('projects.intro')}</p>
      </div>
      <div className="project-selector" role="tablist" aria-label={t('projects.select')}>
        {projects.map((item, index) => (
          <button type="button" role="tab" aria-selected={activeProject === index} className={activeProject === index ? 'project-selector__item project-selector__item--active' : 'project-selector__item'} onClick={() => chooseProject(index)} key={item.id}>
            <span>{item.index}</span><strong>{item.name}</strong><small>{t(`${item.id === 'rift-deck' ? 'project.rift' : 'project.myfinteem'}.eyebrow` as TranslationKey)}</small>
          </button>
        ))}
      </div>
      <article className={`project-explorer project-explorer--${project.tone}`} key={project.id}>
        <div className="project-explorer__copy">
          <p>{eyebrow}</p><h3>{project.name}</h3>
          <p className="project-explorer__description">{description}</p>
          <p className="project-explorer__contribution">{contribution}</p>
          {project.url ? <a href={project.url} target="_blank" rel="noreferrer">{t('projects.open')} <ArrowIcon direction="up-right" /></a> : <span className="project-explorer__pending">{t('projects.linkPending')}</span>}
        </div>
        <WindowFrame title={`${project.id}.workspace`} path={`/projects/${project.id}`} className="project-explorer__window">
          <div className="project-explorer__tabs" role="tablist" aria-label={`${t('projects.info')} ${project.name}`}>
            {(['preview', 'overview', 'stack'] as ProjectTab[]).map((tab) => <button type="button" role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} key={tab}>{tabLabels[tab]}</button>)}
          </div>
          <div className="project-explorer__viewport" aria-live="polite"><ProjectPanel project={project} tab={activeTab} /></div>
        </WindowFrame>
      </article>
      <div className="project-pagination" aria-label={t('projects.navigation')}>
        <span>{String(activeProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
        <div><button type="button" onClick={() => chooseProject((activeProject - 1 + projects.length) % projects.length)} aria-label={t('projects.previous')}>←</button><button type="button" onClick={() => chooseProject((activeProject + 1) % projects.length)} aria-label={t('projects.next')}>→</button></div>
      </div>
    </section>
  )
}
