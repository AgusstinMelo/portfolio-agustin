import { ArrowIcon } from '../ui/ArrowIcon'
import { CodeEditor } from '../ui/CodeEditor'
import { ToolDock, WorkflowPanel } from '../ui/WorkflowPanel'

export function Hero() {
  return (
    <section className="hero hero--workspace" id="inicio" aria-labelledby="hero-title">
      <div className="hero__ambient" aria-hidden="true"><span>&lt;/&gt;</span><span>01</span><span>BUILD</span></div>
      <div className="hero__meta reveal">
        <span><i className="status-dot" /> Software & web developer</span>
        <span>idea / strategy / build</span>
      </div>

      <div className="hero__workspace">
        <div className="hero__copy">
          <p className="hero__hello reveal"><span>01</span> Hola, soy Agustín.</p>
          <h1 id="hero-title" className="reveal reveal--delay-1">
            De una <em>idea</em><br />
            a un producto<br />
            que <strong>se entiende.</strong>
          </h1>
          <p className="hero__description reveal reveal--delay-2">
            Desarrollo experiencias web con velocidad, criterio de producto y herramientas modernas. Entiendo qué necesitás comunicar y lo convierto en una solución clara, funcional y bien ejecutada.
          </p>
          <div className="hero__actions reveal reveal--delay-2">
          <a className="button button--primary" href="#proyectos">
            Ver proyectos <ArrowIcon direction="down" />
          </a>
            <a className="text-link" href="#contacto">Contactar <ArrowIcon /></a>
          </div>
          <div className="hero__runtime"><span>✓</span> product-minded <b>·</b> AI-assisted workflow <b>·</b> web development</div>
        </div>
        <div className="hero__workbench reveal reveal--delay-2">
          <div className="hero__editor"><CodeEditor /></div>
          <WorkflowPanel />
        </div>
      </div>

      <ToolDock />

      <a className="hero__scroll" href="#proyectos"><span>scroll</span><i /></a>
    </section>
  )
}
