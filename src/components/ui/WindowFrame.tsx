import type { ReactNode } from 'react'

interface WindowFrameProps {
  title: string
  path?: string
  children: ReactNode
  className?: string
}

export function WindowFrame({ title, path, children, className = '' }: WindowFrameProps) {
  return (
    <div className={`window-frame ${className}`}>
      <div className="window-frame__bar">
        <div className="window-frame__controls" aria-hidden="true"><span /><span /><span /></div>
        <span className="window-frame__title">{title}</span>
        <span className="window-frame__path">{path}</span>
      </div>
      {children}
    </div>
  )
}
