import {
  CTA,
  Meta,
  PageIntro,
  ProjectCard,
} from "../components/marketing/Elements";
export default function Work() {
  return (
    <div className="editorial-page">
      <Meta title="Work" path="/work" />
      <PageIntro
        label="OUR WORK"
        title="Good thinking, put into practice."
        text="Explore how we turn practical needs into digital products, starting with learning and exam preparation in Cameroon."
      />
      <section className="site-container work-index">
        <ProjectCard />
      </section>
      <CTA />
    </div>
  );
}
