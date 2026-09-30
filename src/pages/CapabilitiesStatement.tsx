import { Link } from "react-router-dom";
import { Meta, PageIntro } from "../components/marketing/Elements";

const competencies = [
  {
    category: "Cybersecurity & Compliance",
    items: [
      "Cybersecurity assessments & vulnerability scanning",
      "ACAS / Nessus operations and reporting",
      "DoD cybersecurity readiness support",
      "Cybersecurity evaluations and risk identification",
      "Vulnerability remediation guidance",
      "Audit-ready compliance documentation",
    ],
  },
  {
    category: "IT Infrastructure & Support",
    items: [
      "IT support and technical program administration",
      "Network troubleshooting and optimization",
      "Server and systems administration",
      "Hardware/software deployment and maintenance",
      "Help desk and end-user support",
      "Cloud infrastructure management",
    ],
  },
  {
    category: "Program Management & Consulting",
    items: [
      "Technology integration and digital transformation",
      "Program management and technical documentation",
      "Technology consulting and modernization support",
      "Process improvement and workflow optimization",
      "Strategic IT planning and roadmap development",
      "Quality assurance and control",
    ],
  },
];

const differentiators = [
  {
    title: "Service-Disabled Veteran-Owned",
    description:
      "SDVOSB certified with proven military discipline and mission-focused approach",
  },
  {
    title: "DoD Systems Expertise",
    description:
      "ACAS / Nessus certified with hands-on experience in defense environments",
  },
  {
    title: "Military-Grade Precision",
    description:
      "Aviation maintenance and QAR oversight background ensuring zero-defect execution",
  },
  {
    title: "Security-First Approach",
    description:
      "Compliance-focused solutions built on top secret cleared experience",
  },
];

const certifications = [
  { name: "SAM Registered" },
  { name: "Top Secret Security Clearance" },
  { name: "CompTIA Security+" },
  { name: "CompTIA A+" },
  { name: "CompTIA Network+" },
  { name: "ACAS Certified" },
  { name: "DoD Cybersecurity Certified" },
];

const naicsCodes = [
  "541512",
  "541513",
  "541519",
  "541611",
  "541690",
  "561210",
  "611430",
  "611519",
  "721199",
];

export default function Capabilities() {
  return (
    <div className="editorial-page resource-page">
      <Meta
        title="Government contracting"
        path="/capabilities-statement"
        description="MTMKay government contracting capabilities: IT infrastructure, cybersecurity, and technical programme support. View our business information and capabilities statement."
      />
      <div className="site-container contracting-intro">
        <PageIntro
          label="GOVERNMENT CONTRACTING"
          title="Built for the mission ahead."
          text="IT, cybersecurity, and programme support grounded in U.S. Navy experience. Structured delivery, clear accountability, and a focus on your mission."
        />
        <aside className="contracting-identity">
          <p className="eyebrow">BUSINESS AT A GLANCE</p>
          <h2>MTMKay</h2>
          <p>Service-Disabled Veteran-Owned Small Business</p>
          <dl className="facts-list">
            <div>
              <dt>UEI</dt>
              <dd>N6TVP1A8K7J1</dd>
            </div>
            <div>
              <dt>CAGE code</dt>
              <dd>9V6S7</dd>
            </div>
            <div>
              <dt>Business type</dt>
              <dd>SDVOSB</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>Florida, USA</dd>
            </div>
          </dl>
          <a
            className="text-link"
            href="/mtmkay-capabilities-statement.pdf"
            download="MTMKay-Capabilities-Statement.pdf"
          >
            Download capabilities PDF
          </a>
        </aside>
      </div>
      <div className="site-container resource-intro-actions">
        <Link
          className="solid-link"
          to="/contact?service=Government%20capabilities%20package"
        >
          Request capabilities package
        </Link>
        <a className="text-link" href="#core-competencies">
          Explore our competencies
        </a>
      </div>
      <section className="resource-band">
        <div className="site-container community-section">
          <div>
            <p className="eyebrow">EXPERIENCE WITH PURPOSE</p>
            <h2>
              Precision in the details.
              <br />
              Clarity in delivery.
            </h2>
          </div>
          <div>
            <p>
              MTMKay provides IT and cybersecurity support grounded in hands-on
              U.S. Navy experience. Our background spans aviation maintenance
              oversight, enterprise IT environments, and quality assurance.
            </p>
            <p>
              Based in Florida, we help organisations modernise their technology
              with a focus on accuracy, accountability, and mission alignment.
            </p>
          </div>
        </div>
      </section>
      <section
        id="core-competencies"
        className="site-container resource-section"
      >
        <div className="resource-heading">
          <div>
            <p className="eyebrow">HOW WE SUPPORT YOUR MISSION</p>
            <h2>Core competencies.</h2>
          </div>
          <p>Technical capability backed by defence experience.</p>
        </div>
        <div className="competency-list">
          {competencies.map((item, index) => (
            <article key={item.category}>
              <span className="row-number">0{index + 1}</span>
              <h3>{item.category}</h3>
              <ul className="editorial-list">
                {item.items.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="resource-band">
        <div className="site-container resource-section">
          <div className="resource-heading">
            <div>
              <p className="eyebrow">WHAT WE BRING</p>
              <h2>Experience that makes a difference.</h2>
            </div>
          </div>
          <div className="differentiator-grid">
            {differentiators.map((item, index) => (
              <article key={item.title}>
                <span className="row-number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="site-container resource-section resource-split">
        <div>
          <p className="eyebrow">QUALIFICATIONS</p>
          <h2>Licenses & certifications.</h2>
          <ul className="editorial-list">
            {certifications.map((cert) => (
              <li key={cert.name}>{cert.name}</li>
            ))}
          </ul>
        </div>
        <div className="resource-panel">
          <p className="eyebrow">PROCUREMENT INFORMATION</p>
          <h3>NAICS codes</h3>
          <div className="naics-grid">
            {naicsCodes.map((code) => (
              <span key={code}>{code}</span>
            ))}
          </div>
          <p>
            IT consulting, cybersecurity, training, and professional services.
          </p>
          <a
            className="text-link"
            href="/mtmkay-capabilities-statement.pdf"
            download="MTMKay-Capabilities-Statement.pdf"
          >
            Download the full statement
          </a>
        </div>
      </section>
      <section className="site-container resource-section resource-split">
        <div>
          <p className="eyebrow">NOTABLE CLIENTELE</p>
          <h2>Supporting mission-critical operations.</h2>
        </div>
        <div className="client-reference">
          <p className="flex item-center">
            <img src="/netc.webp" alt="NETC photo" width="32" height="24"/>
            <h3>NETC Pensacola</h3>
          </p>
          <p>Naval Education and Training Command</p>
          <p className="resource-footnote">
            IT support & cybersecurity readiness
          </p>
          <p>Additional client references available upon request.</p>
        </div>
      </section>
      <section className="closing-cta">
        <div className="site-container">
          <p className="eyebrow">LET’S TALK ABOUT YOUR REQUIREMENTS</p>
          <h2>
            A clear brief.
            <br />A dependable partner.
          </h2>
          <div className="government-contact">
            <div>
              <span>Government point of contact</span>
              <strong>Michael Mbu</strong>
            </div>
            <div>
              <span>Call</span>
              <a href="tel:+16122241176">+1 (612) 224-1176</a>
            </div>
            <div>
              <span>Email</span>
              <a href="mailto:mbu.michael@mtmkay.com">mbu.michael@mtmkay.com</a>
            </div>
          </div>
          <Link
            className="text-link"
            to="/contact?service=Government%20contracting"
          >
            Discuss your requirements
          </Link>
        </div>
      </section>
    </div>
  );
}
