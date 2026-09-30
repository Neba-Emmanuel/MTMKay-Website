import Media from "./Media";
import { type MediaKey } from "../../data/media";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { capabilities, process, project, site } from "../../data/site";
export function Meta({
  title,
  path,
  description = site.description,
  draft = false,
}: {
  title: string;
  path: string;
  description?: string;
  draft?: boolean;
}) {
  return (
    <Helmet>
      <title>{title} | MTMKay</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${site.origin}${path}`} />
      <meta property="og:title" content={`${title} | MTMKay`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${site.origin}${path}`} />
      <meta name="twitter:title" content={`${title} | MTMKay`} />
      <meta name="twitter:description" content={description} />
      {draft && <meta name="robots" content="noindex, follow" />}
    </Helmet>
  );
}
export function ProjectCard() {
  return (
    <article className="project-card">
      <Link
        className="project-visual"
        to={`/work/${project.slug}`}
        aria-label={`Read the case study for ${project.name}`}
      >
        <Media
          asset="exam"
          className="project-cover"
          sizes="(max-width: 700px) calc(100vw - 40px), calc(100vw - 112px)"
        />
        <span className="project-image-label">MTMKAY EXAM PREP</span>
      </Link>
      <p className="project-image-note">
        Concept illustration / MTMKay Exam Prep
      </p>
      <div className="project-caption">
        <div>
          <p className="eyebrow">{project.category}</p>
          <h3>
            <Link to={`/work/${project.slug}`}>{project.name}</Link>
          </h3>
        </div>
        <span className="draft-tag">{project.status}</span>
      </div>
    </article>
  );
}
export function Capabilities({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="capability-list">
      {capabilities.map((item, i) => (
        <article
          className={`capability-row ${detailed ? "capability-with-image" : ""}`}
          key={item.id}
          id={item.id}
        >
          {detailed && (
            <Media
              asset={
                (
                  [
                    "systems",
                    "collaboration",
                    "laptop",
                    "workspace",
                  ] as MediaKey[]
                )[i]
              }
              className="service-photo"
              sizes="(max-width: 700px) calc(100vw - 40px), 210px"
            />
          )}
          <span className="row-number">0{i + 1}</span>
          <h3>{item.title}</h3>
          <div>
            <p>{detailed ? item.details : item.text}</p>
            {detailed && (
              <ul className="deliverables">
                {item.deliverables.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            )}
          </div>
          <Link
            className="text-link"
            to={
              detailed
                ? `/contact?service=${encodeURIComponent(item.title)}`
                : `/services#${item.id}`
            }
            aria-label={`${detailed ? "Discuss" : "Explore"} ${item.title}`}
          >
            {detailed ? "Discuss" : "Explore"}
          </Link>
        </article>
      ))}
    </div>
  );
}
export function Process() {
  return (
    <div className="process-grid">
      {process.map((step, i) => (
        <article key={step.title}>
          <span className="row-number">0{i + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </article>
      ))}
    </div>
  );
}
export function CTA() {
  return (
    <section className="closing-cta">
      <div className="site-container">
        <p className="eyebrow">LET’S MAKE SOMETHING USEFUL</p>
        <Link to="/contact" className="closing-link">
          <h2>
            Have a problem
            <br />
            worth solving?
          </h2>
        </Link>
        <div className="closing-bottom">
          <p>
            Bring your idea. Bring your challenge.
            <br />
            We’ll start with a conversation.
          </p>
          <Link className="text-link" to="/contact">
            Start a project
          </Link>
        </div>
      </div>
    </section>
  );
}
export function PageIntro({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <header className="page-intro site-container">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p className="intro-copy">{text}</p>
    </header>
  );
}
