import { Link } from "react-router-dom";
import { site } from "../../data/site";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <div>
            <Link to="/" className="footer-brand">
              MTMKay<span>.</span>
            </Link>
            <p>Clear thinking. Useful technology.</p>
          </div>
          <div>
            <p className="eyebrow">LET’S TALK</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phone}`}>{site.phoneLabel}</a>
            <p>{site.location}</p>
          </div>
          <nav aria-label="Explore">
            <p className="eyebrow">EXPLORE</p>
            <Link to="/work">Work</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About</Link>
            <Link to="/about#team">Our team</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <nav aria-label="More from MTMKay">
            <p className="eyebrow">MORE FROM MTMKAY</p>
            <Link to="/trainings">Academy & training</Link>
            <Link to="/blog">Insights</Link>
            <Link to="/work-cafe">Work Café</Link>
             <Link to="/capabilities-statement">
            Government contracting
            </Link>
            <a
              href="https://www.linkedin.com/company/mtmkay/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>

          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MTMKay</span>
          <span>From Cameroon, with purpose.</span>
          <a href="#main-content">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
