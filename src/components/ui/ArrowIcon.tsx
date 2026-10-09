interface ArrowIconProps {
  direction?: 'right' | 'down' | 'up-right'
}

export function ArrowIcon({ direction = 'right' }: ArrowIconProps) {
  return (
    <svg className={`arrow arrow--${direction}`} viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  )
}
