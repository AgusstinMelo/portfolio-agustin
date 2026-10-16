import { useEffect, useState } from 'react'

const backgroundCode = ['while (curious) {', '  learn();', '  build();', '}']

function getDayOfYear(date: Date) {
  return Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 86_400_000)
}

export function CodeWatermark({ className = '' }: { className?: string }) {
  const [firstLine, setFirstLine] = useState(() => getDayOfYear(new Date()))

  useEffect(() => {
    let timer = 0
    const scheduleNextDay = () => {
      const now = new Date()
      const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
      timer = window.setTimeout(() => {
        setFirstLine(getDayOfYear(new Date()))
        scheduleNextDay()
      }, nextDay.getTime() - now.getTime() + 1000)
    }
    scheduleNextDay()
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className={`code-watermark${className ? ` ${className}` : ''}`} aria-hidden="true">
      {backgroundCode.map((line, index) => <div key={line}><span>{firstLine + index}</span><code>{line}</code></div>)}
    </div>
  )
}
