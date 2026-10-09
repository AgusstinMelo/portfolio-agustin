import { useEffect, useState } from 'react'
import { navItems } from '../../data/content'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen)
    return () => document.body.classList.remove('menu-open')
  }, [isOpen])

  return (
    <header className="header">
      <a className="brand" href="#inicio" aria-label="Agustín, ir al inicio">
        <span>A</span>gustín<span className="brand__dot">.</span>
        <small>dev</small>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
        aria-controls="main-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span />
        <span />
      </button>

      <nav id="main-navigation" className={`nav${isOpen ? ' nav--open' : ''}`} aria-label="Navegación principal">
        <div className="nav__count">(04)</div>
        <ul>
          {navItems.map((item, index) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setIsOpen(false)}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="header__status" aria-label="Estado del sitio">
        <span className="status-dot" />
        <span>available</span>
        <span className="header__branch">⑂ main</span>
      </div>
    </header>
  )
}
