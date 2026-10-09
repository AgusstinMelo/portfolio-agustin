import { SectionLabel } from '../ui/SectionLabel'
import { usePreferences } from '../../contexts/PreferencesContext'

export function About() {
  const { t } = usePreferences()
  const approach = [['01', t('about.understand'), t('about.understandText')], ['02', t('about.define'), t('about.defineText')], ['03', t('about.build'), t('about.buildText')], ['04', t('about.refine'), t('about.refineText')]]
  return (
    <section className="about about--narrative" id="sobre-mi" aria-labelledby="about-title">
      <SectionLabel index="02" light>{t('about.label')}</SectionLabel>
      <div className="about-narrative__intro"><h2 id="about-title">{t('about.title1')}<br /><em>{t('about.title2')}</em></h2><p>{t('about.intro')}</p></div>
      <ol className="approach-flow">
        {approach.map(([index, title, text]) => <li key={index}><span>{index}</span><div><h3>{title}</h3><p>{text}</p></div><i aria-hidden="true" /></li>)}
      </ol>
    </section>
  )
}
