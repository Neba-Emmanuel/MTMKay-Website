import { Link } from "react-router-dom";
import { Meta, PageIntro } from "../components/marketing/Elements";
import Media from "../components/marketing/Media";

const pricingPlans = [
  {
    id: "hourly",
    name: "Hourly Pass",
    price: "500",
    unit: "FCFA",
    period: "hour",
    description: "Perfect for quick tasks, meetings, or between appointments",
    features: [
      "High-speed WiFi",
      "Power outlets",
      "Comfortable workspace",
      "Complimentary water",
      "Access to lounge area",
    ],
    popular: false,
    buttonText: "Start Now",
  },
  {
    id: "daily",
    name: "Day Pass",
    price: "2,000",
    unit: "FCFA",
    period: "day",
    description: "Ideal for focused work sessions and online learning",
    features: [
      "All Hourly benefits",
      "One complimentary coffee",
      "8 AM - 8 PM access",
    ],
    popular: false,
    buttonText: "Book Day Pass",
  },
  {
    id: "weekly",
    name: "Weekly Pass",
    price: "10,000",
    unit: "FCFA",
    period: "week",
    description: "Great for project-based work or short-term needs",
    features: [
      "All Daily benefits",
      "5 complimentary coffees",
      "7 consecutive days",
    ],
    popular: false,
    buttonText: "Book Weekly Pass",
  },
  {
    id: "monthly",
    name: "Monthly Subscription",
    price: "30,000",
    unit: "FCFA",
    period: "month",
    description: "Our best value for regular users and remote professionals",
    features: [
      "All Weekly benefits",
      "Unlimited coffee",
      "Dedicated desk option",
      "Guest passes (2/month)",
    ],
    popular: true,
    buttonText: "Subscribe Now",
  },
];

// Features and amenities
const amenities = [
  {
    name: "High-Speed Internet",
    description: "100Mbps dedicated Starlink connection",
  },
  {
    name: "Reliable Power",
    description: "Backup generator & UPS for each desk",
  },
  {
    name: "Coffee & Beverages",
    description: "Complimentary coffee, tea, and water",
  },
  {
    name: "Print & Scan",
    description: "Professional printing services available",
  },
  {
    name: "Tech-Ready Desks",
    description: "Pre-installed software",
  },
  {
    name: "Universal Power",
    description: "Multiple outlets at every desk",
  },
  {
    name: "Meeting Rooms",
    description: "Bookable private meeting spaces",
  },
  {
    name: "Air Conditioning",
    description: "Climate-controlled environment",
  },
  {
    name: "Quiet Zones",
    description: "Dedicated silent work areas",
  },
  {
    name: "Mobile Charging",
    description: "Mobile charging outlets",
  },
  { name: "Flexible Hours", description: "Open 7 days a week" },
];

// Benefits for businesses
const businessBenefits = [
  "Cost-effective alternative to office leases",
  "No long-term commitments required",
  "Scalable workspace solutions",
  "Professional environment for client meetings",
  "Networking opportunities with other professionals",
  "Access to training and upskilling programs",
];

const faqs = [
  {
    q: "Can I book a desk in advance?",
    a: "Yes, we recommend booking in advance, especially during peak hours. Monthly subscribers get priority booking.",
  },
  {
    q: "Is there food available?",
    a: "We have a café serving light snacks and beverages. You're also welcome to bring your own food.",
  },
  {
    q: "Do you offer day passes for weekends?",
    a: "Yes, our day passes are available 7 days a week, 8 AM to 8 PM.",
  },
  {
    q: "Can I bring a guest?",
    a: "Monthly subscribers receive 2 guest passes per month. Day pass holders can add guests for 500 FCFA each.",
  },
  {
    q: "What's the cancellation policy?",
    a: "Hourly and day passes are non-refundable. Weekly and monthly subscriptions can be cancelled with 7 days notice.",
  },
];

export default function WorkCafe() {
  return (
    <div className="editorial-page resource-page">
      <Meta
        title="Work Café"
        path="/work-cafe"
        description="A workspace in Kumba for focused work and online learning. Explore hourly, daily, weekly, and monthly Work Café plans."
      />
      <div className="site-container visual-page-intro">
        <PageIntro
          label="WORK CAFÉ / KUMBA"
          title="Make room for good work."
          text="A quiet, professional workspace with reliable internet and power. Bring your laptop, settle in, and make progress on what matters to you."
        />
        <Media asset="workspace" caption priority className="intro-photo" />
      </div>
      <div className="site-container resource-intro-actions">
        <Link
          className="solid-link"
          to="/contact"
          state={{ source: "work-cafe", plan: { name: "General Inquiry" } }}
        >
          Book your spot
        </Link>
        <a className="text-link" href="#pricing">
          Explore the passes
        </a>
        <span>From 500 FCFA / hour</span>
      </div>
      <section className="resource-band">
        <div className="site-container resource-section">
          <div className="resource-heading">
            <div>
              <p className="eyebrow">SETTLE IN. GET STARTED.</p>
              <h2>The essentials, taken care of.</h2>
            </div>
            <p>
              Space for focused work, remote meetings, and your next learning
              session.
            </p>
          </div>
          <div className="amenity-grid">
            {amenities.map((item, index) => (
              <article key={item.name}>
                <span className="row-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="pricing" className="site-container resource-section">
        <div className="resource-heading">
          <div>
            <p className="eyebrow">YOUR TIME. YOUR SPACE.</p>
            <h2>A pass that fits your day.</h2>
          </div>
          <p>Drop in for an hour or make it your regular place to work.</p>
        </div>
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article
              key={plan.id}
              className={`pass-card ${plan.popular ? "pass-featured" : ""}`}
            >
              <p className="eyebrow">
                {plan.popular
                  ? "FOR YOUR EVERYDAY"
                  : `${plan.period.toUpperCase()} BY ${plan.period.toUpperCase()}`}
              </p>
              <h3>{plan.name}</h3>
              <p className="pass-price">
                {plan.price}
                <span>
                  {plan.unit} / {plan.period}
                </span>
              </p>
              <p>{plan.description}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Link
                className={plan.popular ? "solid-link" : "text-link"}
                to="/contact"
                state={{
                  source: "work-cafe",
                  plan: {
                    name: plan.name,
                    price: plan.price,
                    period: plan.period,
                    features: plan.features,
                  },
                }}
              >
                {plan.buttonText}
              </Link>
            </article>
          ))}
        </div>
        <p className="resource-footnote">
          Need a setup for your team?{" "}
          <Link
            className="text-link"
            to="/contact?service=Work%20Caf%C3%A9%20corporate%20rates"
          >
            Ask about corporate rates
          </Link>
        </p>
      </section>
      <section className="site-container resource-section resource-split">
        <div>
          <p className="eyebrow">FOR TEAMS & BUSINESSES</p>
          <h2>A working base, without the long lease.</h2>
          <p className="section-copy">
            A professional environment for your team, client meetings, and
            project work. Corporate partnerships are available for teams of five
            or more.
          </p>
          <ul className="editorial-list">
            {businessBenefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link
            className="text-link"
            to="/contact?service=Work%20Caf%C3%A9%20team%20enquiry"
          >
            Talk to our team
          </Link>
        </div>
        <div className="resource-panel">
          <p className="eyebrow">CORPORATE PARTNERSHIP</p>
          <h3>Room for your whole team.</h3>
          <dl className="facts-list">
            <div>
              <dt>Dedicated desks</dt>
              <dd>From 25,000 FCFA / month</dd>
            </div>
            <div>
              <dt>Private offices</dt>
              <dd>Custom quote</dd>
            </div>
            <div>
              <dt>Meeting room credits</dt>
              <dd>Included</dd>
            </div>
            <div>
              <dt>Training discounts</dt>
              <dd>10–20% off</dd>
            </div>
          </dl>
          <p>First month free for annual commitments.</p>
          <Media asset="collaboration" caption />
        </div>
      </section>
      <section className="resource-band">
        <div className="site-container community-section">
          <div>
            <p className="eyebrow">KEEP LEARNING</p>
            <h2>Make your workspace a classroom.</h2>
          </div>
          <div>
            <p>
              Work Café subscribers get discounts on MTMKay IT training
              programmes. Explore a new skill while you’re here.
            </p>
            <Link className="text-link" to="/trainings">
              Explore training programmes
            </Link>
          </div>
        </div>
      </section>
      <section className="site-container resource-section resource-split">
        <div>
          <p className="eyebrow">BEFORE YOU VISIT</p>
          <h2>A few useful details.</h2>
        </div>
        <div className="editorial-faq">
          {faqs.map((faq) => (
            <details key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="closing-cta">
        <div className="site-container">
          <p className="eyebrow">YOUR NEXT PRODUCTIVE DAY</p>
          <h2>
            Bring your work.
            <br />
            We’ll make room.
          </h2>
          <div className="closing-bottom">
            <p>Find your place at the Work Café in Kumba.</p>
            <Link
              className="text-link"
              to="/contact"
              state={{ source: "work-cafe", plan: { name: "First Visit" } }}
            >
              Book your first visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
