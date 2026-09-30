import Media from "../components/marketing/Media";
import {
  Capabilities,
  CTA,
  Meta,
  PageIntro,
  Process,
} from "../components/marketing/Elements";
export default function Services() {
  return (
    <div className="editorial-page">
      <Meta title="Services" path="/services" />
      <div className="site-container visual-page-intro">
        <PageIntro
          label="OUR CAPABILITIES"
          title="The thinking. The making. The follow-through."
          text="Whether you’re finding a direction, building a product, or improving what you already have, we start with what your organisation needs."
        />
        <Media asset="systems" caption priority className="intro-photo" />
      </div>
      <section className="site-container services-detail">
        <Capabilities detailed />
      </section>
      <section className="site-container section-space">
        <div className="section-heading">
          <div>
            <p className="eyebrow">WORKING TOGETHER</p>
            <h2>A clear way forward.</h2>
          </div>
          <p className="heading-aside">
            We agree the scope, deliverables, and way of working with you. Start
            with a focused question or discuss a broader product engagement.
          </p>
        </div>
        <Process />
      </section>
      <CTA />
    </div>
  );
}
