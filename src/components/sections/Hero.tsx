import { ArrowIcon } from '../ui/ArrowIcon'
import { CodeEditor } from '../ui/CodeEditor'
import { ToolDock, WorkflowPanel } from '../ui/WorkflowPanel'
import { usePreferences } from '../../contexts/PreferencesContext'

export function Hero() {
  const { t } = usePreferences()
  return (
    <section className="hero hero--workspace" id="inicio" aria-labelledby="hero-title">
      <div className="hero__ambient" aria-hidden="true"><span>&lt;/&gt;</span><span>01</span><span>BUILD</span></div>
      <div className="hero__meta reveal">
        <span><i className="status-dot" /> {t('hero.role')}</span>
        <span>{t('hero.flow')}</span>
      </div>

      <div className="hero__workspace">
        <div className="hero__copy">
          <p className="hero__hello reveal"><span>01</span> {t('hero.hello')}</p>
          <h1 id="hero-title" className="reveal reveal--delay-1">
            {t('hero.line1')} <em>{t('hero.idea')}</em><br />
            {t('hero.line2')}<br />
            <strong>{t('hero.line3')}</strong>
          </h1>
          <p className="hero__description reveal reveal--delay-2">
            {t('hero.description')}
          </p>
          <div className="hero__actions reveal reveal--delay-2">
          <a className="button button--primary" href="#proyectos">
            {t('hero.projects')} <ArrowIcon direction="down" />
          </a>
            <a className="text-link" href="#contacto">{t('hero.contact')} <ArrowIcon /></a>
          </div>
          <div className="hero__runtime"><span>✓</span> {t('hero.runtime')} <b>·</b> {t('hero.ai')} <b>·</b> {t('hero.web')}</div>
        </div>
        <div className="hero__workbench reveal reveal--delay-2">
          <div className="hero__editor"><CodeEditor /></div>
          <WorkflowPanel />
        </div>
      </div>

      <ToolDock />

      <a className="hero__scroll" href="#proyectos"><span>{t('hero.scroll')}</span><i /></a>
    </section>
  )
}
