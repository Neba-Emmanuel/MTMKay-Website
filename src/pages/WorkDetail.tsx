import Media from "../components/marketing/Media";
import { Link, useParams } from "react-router-dom";
import { CTA, Meta, PageIntro } from "../components/marketing/Elements";
import { project } from "../data/site";
import NotFound from "./NotFound";

const capabilities = [
  {
    title: "Practice with a purpose.",
    text: "Learners choose an exam pathway and subject, then work through questions in a timed session. The exam engine records answers and calculates a result when the session is submitted.",
  },
  {
    title: "Turn answers into insight.",
    text: "A result is more than a total. Answer review separates correct, incorrect, and unanswered questions, with explanations where available. The dashboard brings recent attempts and focus topics into view.",
  },
  {
    title: "Make practicals easier to follow.",
    text: "Science practicals break an experiment into steps, supported by visual material, observations, apparatus information, and safety guidance. Learners can revisit each stage at their own pace.",
  },
];
export default function WorkDetail() {
  const { slug } = useParams();
  if (slug !== project.slug) return <NotFound />;
  return (
    <div className="editorial-page">
      <Meta
        title={`${project.name} — case study`}
        path={`/work/${project.slug}`}
        description={project.description}
      />
      <PageIntro
        label="EDUCATION / DIGITAL LEARNING"
        title="A clearer path from revision to readiness."
        text={project.description}
      />
      <section className="site-container case-study">
        <div className="case-introduction">
          <h2>{project.name}</h2>
          <a
            className="solid-link"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore the live platform
          </a>
        </div>
        <Media
          asset="exam"
          className="case-cover"
          caption
          priority
          sizes="(max-width:700px) calc(100vw - 40px), calc(100vw - 112px)"
        />
        <dl className="case-facts">
          <div>
            <dt>Product</dt>
            <dd>MTMKay Exam Prep</dd>
          </div>
          <div>
            <dt>Audience</dt>
            <dd>Learners in Cameroon</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>Exam preparation & digital learning</dd>
          </div>
          <div>
            <dt>Platform</dt>
            <dd>Web application</dd>
          </div>
        </dl>
        <div className="case-row">
          <h2>The learning challenge.</h2>
          <p>
            Preparing for an exam means more than reading the material. Learners
            need to practise under time limits, understand mistakes, and decide
            what to study next. Science subjects add another challenge:
            connecting written explanations with the steps of a practical
            experiment.
          </p>
        </div>
        <div className="case-row">
          <h2>A connected approach.</h2>
          <p>
            MTMKay Exam Prep brings practice, review, and practical learning
            into one product. Its public exam pathways cover GCE Ordinary and
            Advanced Levels, HND and BTS, and concours and professional
            examinations. Arts and science subjects sit within the same learning
            experience.
          </p>
        </div>
        <section
          className="case-capabilities"
          aria-labelledby="case-capabilities-heading"
        >
          <p className="eyebrow">INSIDE THE PRODUCT</p>
          <h2 id="case-capabilities-heading">
            Practise. Understand. Try again.
          </h2>
          <div className="case-capability-grid">
            {capabilities.map((item, index) => (
              <article key={item.title}>
                <span className="row-number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
        <div className="case-row">
          <h2>Behind the learning experience.</h2>
          <p>
            The product connects student accounts, exam sessions, saved answers,
            and results. Administration tools support the question bank,
            subjects, practical content, and users. This gives the learning
            experience a content-management foundation as well as a
            student-facing interface.
          </p>
        </div>
        <div className="case-row">
          <h2>The product in use.</h2>
          <div>
            <p>
              The platform is live at exam.mtmkay.com, with a public
              introduction and account entry points. Its product structure
              connects each practice attempt to a review, then gives learners a
              route back into revision. That practice–review–revise cycle is the
              central idea behind the experience.
            </p>
            <a
              className="text-link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit MTMKay Exam Prep
            </a>
          </div>
        </div>
        <div className="case-row">
          <h2>What this work represents.</h2>
          <p>
            A digital product shaped around a specific learning context:
            Cameroon’s exam pathways, recurring practice, and practical science.
            It brings assessment and learning support together so the next
            action is easier to find, whether that is starting a test,
            revisiting an answer, or working through an experiment.
          </p>
        </div>
        <Link className="text-link" to="/work">
          Back to work
        </Link>
      </section>
      <CTA />
    </div>
  );
}
