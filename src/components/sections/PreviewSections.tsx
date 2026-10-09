import { technologyGroups, socialLinks } from '../../data/content'
import { ArrowIcon } from '../ui/ArrowIcon'
import { SectionLabel } from '../ui/SectionLabel'

export function AboutPreview() {
  return (
    <section className="about" id="sobre-mi" aria-labelledby="about-title">
      <SectionLabel index="02" light>Una mirada personal</SectionLabel>
      <div className="about__grid">
        <h2 id="about-title">Curiosidad,<br /><em>criterio</em> y código.</h2>
        <div className="about__copy">
          <p>Me acerco al desarrollo como una forma de convertir problemas e ideas en productos concretos.</p>
          <p>Me interesa entender cómo funcionan las cosas, aprender durante el proceso y cuidar tanto la lógica como la experiencia de quien usa el resultado.</p>
        </div>
      </div>
    </section>
  )
}

export function TechnologiesPreview() {
  return (
    <section className="technologies" id="tecnologias" aria-labelledby="technologies-title">
      <div className="technologies__intro">
        <SectionLabel index="03">Caja de herramientas</SectionLabel>
        <h2 id="technologies-title">Tecnologías que uso para<br /><em>dar forma a las ideas.</em></h2>
      </div>
      <div className="technology-groups">
        {technologyGroups.map((group, index) => (
          <div className="technology-group" key={group.title}>
            <span>0{index + 1}</span>
            <h3>{group.title}</h3>
            <p>{group.items.join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ContactPreview() {
  const emailHref = socialLinks.email ? `mailto:${socialLinks.email}` : undefined
  return (
    <footer className="contact" id="contacto">
      <SectionLabel index="04" light>Hablemos</SectionLabel>
      <div className="contact__main">
        <p>Disponible para conversar sobre oportunidades, proyectos e ideas.</p>
        <h2>¿Construimos algo<br /><em>interesante?</em></h2>
        {emailHref ? (
          <a className="contact__cta" href={emailHref}>Escribime <ArrowIcon direction="up-right" /></a>
        ) : (
          <span className="contact__pending">Correo · pendiente de completar</span>
        )}
      </div>
      <div className="contact__footer">
        <a href="#inicio">Agustín © 2026</a>
        <div>
          <span>GitHub · pendiente</span>
          <span>LinkedIn · pendiente</span>
          <span>CV · próximamente</span>
        </div>
        <a href="#inicio">Volver arriba ↑</a>
      </div>
    </footer>
  )
}
