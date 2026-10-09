import { useState } from 'react'
import { SectionLabel } from '../ui/SectionLabel'
import { WindowFrame } from '../ui/WindowFrame'
import { usePreferences } from '../../contexts/PreferencesContext'

type Goal = 'clients' | 'portfolio' | 'shop'
function MiniSite({ goal }: { goal: Goal }) {
  const { t } = usePreferences()
  if (goal === 'portfolio') return <div className="mini-site mini-site--portfolio"><nav><b>Studio.</b><span>Work&nbsp;&nbsp; About</span></nav><main><small>{t('work.selected')}</small><h4>{t('work.visible')}</h4><div><i /><i /><i /></div></main></div>
  if (goal === 'shop') return <div className="mini-site mini-site--shop"><nav><b>FORMA</b><span>{t('work.bag')}</span></nav><main><div className="mini-product"><span>{t('work.new')}</span><i /></div><div><small>{t('work.object')}</small><h4>{t('work.everyday')}</h4><button type="button">{t('work.add')}</button></div></main></div>
  return <div className="mini-site mini-site--clients"><nav><b>Norte°</b><span>{t('work.services')}</span></nav><main><small>{t('work.clientsTag')}</small><h4>{t('work.clientsTitle')}</h4><p>{t('work.clientsText')}</p><button type="button">{t('work.talk')}</button></main></div>
}

export function HowIWork() {
  const [goal, setGoal] = useState<Goal>('clients')
  const { t } = usePreferences()
  const goals: { id: Goal; label: string; note: string }[] = [{ id: 'clients', label: t('work.clients'), note: t('work.clientsNote') }, { id: 'portfolio', label: t('work.portfolio'), note: t('work.portfolioNote') }, { id: 'shop', label: t('work.shop'), note: t('work.shopNote') }]
  return (
    <section className="how-work" id="como-trabajo" aria-labelledby="how-work-title">
      <div className="how-work__intro"><SectionLabel index="04" light>{t('work.label')}</SectionLabel><h2 id="how-work-title">{t('work.title1')}<br /><em>{t('work.title2')}</em></h2><p>{t('work.intro')}</p></div>
      <div className="goal-builder">
        <div className="goal-builder__controls"><span>{t('work.question')}</span>{goals.map((item, index) => <button type="button" aria-pressed={goal === item.id} onClick={() => setGoal(item.id)} key={item.id}><small>0{index + 1}</small><strong>{item.label}</strong><span>{item.note}</span></button>)}</div>
        <WindowFrame title="objective.preview" path={t('work.example')} className="goal-builder__preview"><div className="preview-notice"><span>{t('work.preview')}</span><span>React + CSS</span></div><div className="mini-site-wrap" aria-live="polite"><MiniSite goal={goal} /></div></WindowFrame>
      </div>
    </section>
  )
}
