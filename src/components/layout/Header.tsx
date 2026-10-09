import { useEffect, useState } from 'react'
import { navItems } from '../../data/content'
import { usePreferences } from '../../contexts/PreferencesContext'
import { PreferenceControls } from '../ui/PreferenceControls'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = usePreferences()
  const labels = [t('nav.projects'), t('nav.about'), t('nav.technologies'), t('nav.process'), t('nav.contact')]

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen)
    return () => document.body.classList.remove('menu-open')
  }, [isOpen])

  return (
    <header className="header">
      <a className="brand" href="#inicio" aria-label={t('nav.home')}>
        Agustín Melo<span className="brand__dot">.</span>
        <small>dev</small>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={isOpen ? t('nav.close') : t('nav.open')}
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <nav id="main-navigation" className={`nav${isOpen ? ' nav--open' : ''}`} aria-label={t('nav.label')}>
        <div className="nav__count">(0{navItems.length})</div>
        <ul>
          {navItems.map((item, index) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setIsOpen(false)}>
                <span>0{index + 1}</span>
                {labels[index]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="header__tools">
      <div className="header__status" aria-label={t('nav.status')}>
        <span className="status-dot" />
        <span>{t('nav.available')}</span>
        <span className="header__branch">⑂ main</span>
      </div>
      <PreferenceControls />
      </div>
    </header>
  )
}
