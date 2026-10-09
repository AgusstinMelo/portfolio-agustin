import type { ReactNode } from 'react'

interface SectionLabelProps {
  index: string
  children: ReactNode
  light?: boolean
}

export function SectionLabel({ index, children, light = false }: SectionLabelProps) {
  return (
    <div className={`section-label${light ? ' section-label--light' : ''}`}>
      <span>{index}</span>
      <span>{children}</span>
    </div>
  )
}
