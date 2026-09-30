import Team from "../components/marketing/Team";
import { Link } from "react-router-dom";
import {
  Capabilities,
  CTA,
  Meta,
  Process,
  ProjectCard,
} from "../components/marketing/Elements";
import Media from "../components/marketing/Media";
import { site } from "../data/site";
export default function Home() {
  return (
    <div className="editorial-page">
      <Meta title="Technology consulting & software development" path="/" />
      <section className="hero site-container">
        <div className="hero-kicker">
          <p className="eyebrow">
            <span className="blue-dot" /> TECHNOLOGY CONSULTANCY & SOFTWARE
            DEVELOPMENT
          </p>
          <span className="eyebrow hero-location">
            KUMBA, CAMEROON · BUILT FOR WHAT’S NEXT
          </span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1>
              {site.hero.map((line, i) => (
                <span key={line} className={i === 0 ? "hero-dark" : ""}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="hero-description">{site.description}</p>
            <div className="hero-actions">
              <Link className="solid-link" to="/contact">
                Start a project
              </Link>
              <Link className="text-link" to="/work">
                Explore our work
              </Link>
            </div>
            <p className="hero-footnote">
              CLEAR THINKING. TANGIBLE POSSIBILITIES.
            </p>
          </div>
          <div className="hero-art">
            <Media
              asset="systems"
              priority
              className="hero-photo"
              sizes="(max-width: 700px) 100vw, 75vw"
            />
            <div className="image-corner">
              <span>
                FROM IDEA
                <br />
                TO IMPACT.
              </span>

            </div>
          </div>
        </div>
      </section>
      <div className="capability-strip" aria-label="Our disciplines">
        <span>STRATEGY</span>
        <span aria-hidden="true">✳</span>
        <span>DESIGN</span>
        <span aria-hidden="true">✳</span>
        <span>ENGINEERING</span>
        <span aria-hidden="true">✳</span>
        <span>INTEGRATION</span>
        <span aria-hidden="true">✳</span>
        <span>IMPROVEMENT</span>
      </div>
      <section className="site-container section-space positioning">
        <div className="positioning-visual">
          <p className="eyebrow">01 / CLEAR THINKING</p>
          <Media asset="collaboration" caption />
        </div>
        <div>
          <h2>{site.positioning}</h2>
          <p className="section-copy">{site.positioningBody}</p>
          <Link className="text-link" to="/about">
            Get to know MTMKay
          </Link>
        </div>
      </section>
      <section className="site-container section-space capabilities-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / WHAT WE DO</p>
            <h2>
              From idea to
              <br />
              infrastructure.
            </h2>
          </div>
          <Link className="text-link" to="/services">
            Explore our services
          </Link>
        </div>
        <Capabilities />
      </section>
      <section className="work-section section-space">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / WORK IN FOCUS</p>
              <h2>Useful by design.</h2>
            </div>
            <Link className="text-link" to="/work">
              Explore our work
            </Link>
          </div>
          <ProjectCard />
        </div>
      </section>
      <section className="site-container section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">04 / HOW WE WORK</p>
            <h2>
              Good questions.
              <br />
              Better outcomes.
            </h2>
          </div>
          <p className="heading-aside">
            A collaborative approach, shaped around the project. Clear decisions
            at every stage.
          </p>
        </div>
        <Process />
      </section>
      <section className="perspective">
        <div className="site-container perspective-inner">
          <Media asset="systems" className="perspective-photo" />
          <div>
            <p className="eyebrow">OUR POINT OF VIEW</p>
            <h2>{site.perspective}</h2>
            <p>{site.perspectiveBody}</p>
            <Link className="text-link" to="/contact">
              Let’s find the right approach
            </Link>
          </div>
        </div>
      </section>
      <section className="site-container section-space image-story">
        <Media asset="team" caption />
        <div>
          <p className="eyebrow">05 / ROOTED HERE. LOOKING AHEAD.</p>
          <h2>{site.aboutHeading}</h2>
          <p className="section-copy">{site.aboutBody}</p>
          <Link className="text-link" to="/about">
            More about us
          </Link>
        </div>
      </section>
      <Team preview />
      <CTA />
    </div>
  );
}
