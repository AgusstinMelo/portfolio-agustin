import { projects } from '../../data/content'
import type { Project } from '../../types/content'
import { ArrowIcon } from '../ui/ArrowIcon'
import { SectionLabel } from '../ui/SectionLabel'
import { WindowFrame } from '../ui/WindowFrame'

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return <img src={project.image} alt={`Captura de ${project.name}`} />
  }

  return (
    <div className={`project-visual project-visual--${project.id}`} aria-label={`Espacio reservado para una captura real de ${project.name}`}>
      {project.id === 'rift-deck' ? (
        <div className="rift-mark">
          <span>RD</span>
          <div className="rift-mark__ring" />
        </div>
      ) : (
        <div className="finteem-mark">
          <span>MY</span>
          <strong>FINTEEM</strong>
          <i />
        </div>
      )}
      <span className="project-visual__note">Captura pendiente</span>
    </div>
  )
}

export function Projects() {
  return (
    <section className="projects projects--workspace" id="proyectos" aria-labelledby="projects-title">
      <div className="projects__bridge" aria-hidden="true"><span>02</span><i /><span>idea → workflow → producto</span><i /></div>
      <div className="projects__heading">
        <SectionLabel index="01">Trabajo seleccionado</SectionLabel>
        <h2 id="projects-title">Productos con<br /><em>intención.</em></h2>
        <p><span className="syntax-comment">// </span>Una selección breve de ideas llevadas a la práctica.</p>
      </div>

      <div className="projects__list">
        {projects.map((project) => (
          <article className={`project project--${project.tone}`} key={project.id}>
            <div className="project__number">/{project.index}</div>
            <div className="project__visual-wrap">
              <WindowFrame title={`${project.id}.preview`} path={`/projects/${project.id}`}>
                <div className="project__tabs" role="presentation"><span className="project__tab--active">Preview</span><span>Overview</span><span>Stack</span></div>
                <ProjectVisual project={project} />
              </WindowFrame>
            </div>
            <div className="project__content">
              <p className="project__eyebrow">{project.eyebrow}</p>
              <h3>{project.name}</h3>
              <p className="project__description">{project.description}</p>
              <p className="project__contribution">{project.contribution}</p>
              {project.technologies.length > 0 ? (
                <div className="project__stack">{project.technologies.map((item) => <span key={item}>{item}</span>)}</div>
              ) : (
                <div className="project__stack project__stack--pending"><span>stack: pendiente de confirmar</span></div>
              )}
              <div className="project__links">
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noreferrer">
                    Visitar proyecto <ArrowIcon direction="up-right" />
                  </a>
                ) : (
                  <span>Enlace próximamente</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
