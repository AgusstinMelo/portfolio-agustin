const steps = [
  { index: '01', label: 'Entender', detail: 'visión + contexto', status: 'input' },
  { index: '02', label: 'Construir', detail: 'código + IA', status: 'active' },
  { index: '03', label: 'Refinar', detail: 'criterio + detalle', status: 'review' },
  { index: '04', label: 'Entregar', detail: 'producto web', status: 'ready' },
]

export function WorkflowPanel() {
  return (
    <div className="workflow-panel" aria-label="Flujo de trabajo">
      <div className="workflow-panel__header">
        <span>workflow.pipeline</span>
        <span className="workflow-panel__run"><i /> ready</span>
      </div>
      <ol>
        {steps.map((step) => (
          <li key={step.index} className={step.status === 'active' ? 'workflow-step workflow-step--active' : 'workflow-step'}>
            <span className="workflow-step__index">{step.index}</span>
            <div><strong>{step.label}</strong><small>{step.detail}</small></div>
            <span className={`workflow-step__status workflow-step__status--${step.status}`}>{step.status}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function ToolDock() {
  return (
    <div className="tool-dock" aria-label="Herramientas y capacidades">
      <span className="tool-dock__label">toolbox /</span>
      <div className="tool-dock__items">
        <span>React</span><span>TypeScript</span><span>Next.js</span><span>Vite</span><span>IA asistida</span><span>Git</span>
      </div>
    </div>
  )
}
