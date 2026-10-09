import { usePreferences } from '../../contexts/PreferencesContext'

export function WorkflowPanel() {
  const { t } = usePreferences()
  const steps = [
    { index: '01', label: t('workflow.understand'), detail: t('workflow.context'), status: t('workflow.input'), tone: 'input' },
    { index: '02', label: t('workflow.build'), detail: t('workflow.code'), status: t('workflow.active'), tone: 'active' },
    { index: '03', label: t('workflow.refine'), detail: t('workflow.detail'), status: t('workflow.review'), tone: 'review' },
    { index: '04', label: t('workflow.deliver'), detail: t('workflow.product'), status: t('workflow.ready'), tone: 'ready' },
  ]
  return (
    <div className="workflow-panel" aria-label={t('workflow.label')}>
      <div className="workflow-panel__header">
        <span>workflow.pipeline</span>
        <span className="workflow-panel__run"><i /> {t('workflow.ready')}</span>
      </div>
      <ol>
        {steps.map((step) => (
          <li key={step.index} className={step.tone === 'active' ? 'workflow-step workflow-step--active' : 'workflow-step'}>
            <span className="workflow-step__index">{step.index}</span>
            <div><strong>{step.label}</strong><small>{step.detail}</small></div>
            <span className={`workflow-step__status workflow-step__status--${step.tone}`}>{step.status}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function ToolDock() {
  const { t } = usePreferences()
  return (
    <div className="tool-dock" aria-label={t('workflow.tools')}>
      <span className="tool-dock__label">{t('workflow.tools')} /</span>
      <div className="tool-dock__items">
        <span>TypeScript</span><span>React</span><span>Next.js</span><span>Supabase</span><span>Python</span><span>Git</span>
      </div>
    </div>
  )
}
