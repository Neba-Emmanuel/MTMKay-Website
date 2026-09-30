import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const destinations = [
  {
    to: "/work",
    label: "Explore our work",
    detail: "Ideas put into practice.",
  },
  {
    to: "/services",
    label: "Discover our services",
    detail: "Find the right support.",
  },
  {
    to: "/trainings",
    label: "Learn something new",
    detail: "Take your next step.",
  },
];

export default function NotFound() {
  return (
    <div className="editorial-page not-found-page">
      <Helmet>
        <title>Page not found | MTMKay</title>
        <meta name="robots" content="noindex, follow" />
        <meta
          name="description"
          content="This page couldn’t be found. Find your way back to MTMKay’s work, services, and training."
        />
      </Helmet>
      <section
        className="site-container not-found-hero"
        aria-labelledby="not-found-title"
      >
        <div className="not-found-copy">
          <p className="eyebrow">404 / PAGE NOT FOUND</p>
          <h1 id="not-found-title">
            A little
            <br />
            off course.
          </h1>
          <p className="not-found-description">
            The page you’re looking for may have moved, or the address might be
            a little off. Let’s get you somewhere useful.
          </p>
          <div className="not-found-actions">
            <Link className="solid-link" to="/">
              Back to home
            </Link>
            <Link className="text-link" to="/contact">
              Talk to our team
            </Link>
          </div>
        </div>
        <div className="not-found-art" aria-hidden="true">
          <span className="not-found-coordinate">
            MTMKAY / FIND YOUR DIRECTION
          </span>
          <div className="not-found-number">
            <span>4</span>
            <span className="not-found-zero">
              <span className="not-found-orbit" />
              <span className="not-found-point" />
            </span>
            <span>4</span>
          </div>
          <span className="not-found-art-note">
            <span /> A SMALL DETOUR. A NEW DIRECTION.
          </span>
        </div>
      </section>
      <nav
        className="site-container not-found-destinations"
        aria-label="Useful places to go"
      >
        <p className="eyebrow">A GOOD PLACE TO START</p>
        <div className="not-found-links">
          {destinations.map((destination, index) => (
            <Link key={destination.to} to={destination.to}>
              <span className="row-number">0{index + 1}</span>
              <span>
                <strong>{destination.label}</strong>
                <span>{destination.detail}</span>
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
