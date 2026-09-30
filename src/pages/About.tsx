import Team from "../components/marketing/Team";
import Media from "../components/marketing/Media";
import { Link } from "react-router-dom";
import { CTA, Meta, PageIntro } from "../components/marketing/Elements";
import { site } from "../data/site";
export default function About() {
  return (
    <div className="editorial-page">
      <Meta title="About" path="/about" />
      <div className="site-container visual-page-intro">
        <PageIntro
          label="MEET MTMKAY"
          title={site.aboutHeading}
          text={site.aboutBody}
        />
        <Media asset="team" caption priority className="intro-photo" />
      </div>
      <section className="about-statement">
        <div className="site-container">
          <p className="eyebrow">OUR STARTING POINT</p>
          <h2>
            People first.
            <br />
            Purpose always.
          </h2>
          <p>
            Technology is most useful when it makes someone’s work, learning, or
            everyday life better. That’s the starting point for the company
            we’re building.
          </p>
        </div>
      </section>
      <section className="site-container section-space positioning">
        <div className="positioning-visual">
          <p className="eyebrow">HOW WE THINK</p>
          <Media asset="collaboration" caption />
        </div>
        <div>
          <h2>
            Listen closely.
            <br />
            Make things clear.
            <br />
            Build what matters.
          </h2>
          <p className="section-copy">
            We believe a good partnership needs honest conversations, an
            understood problem, and a shared definition of progress. Our
            proposed approach brings discovery, design, engineering, and
            improvement into one conversation.
          </p>
          <Link className="text-link" to="/services">
            See how we can help
          </Link>
        </div>
      </section>
      <div className="site-container">
        <Media
          asset="workspace"
          caption
          className="community-photo"
          sizes="(max-width:700px) calc(100vw - 40px), calc(100vw - 112px)"
        />
      </div>
      <section className="site-container community-section">
        <div>
          <p className="eyebrow">BEYOND PROJECT DELIVERY</p>
          <h2>
            A place to learn.
            <br />A place to work.
          </h2>
        </div>
        <div>
          <p>
            Explore MTMKay’s existing training programmes and Work Café in
            Kumba.
          </p>
          <Link className="text-link" to="/trainings">
            Academy & training
          </Link>
          <Link className="text-link" to="/work-cafe">
            Discover the Work Café
          </Link>
        </div>
      </section>
      <Team />
      <CTA />
    </div>
  );
}
