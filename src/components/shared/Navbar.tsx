import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
const links = [
  ["/work", "Work"],
  ["/services", "Services"],
  ["/about", "About"],
  ["/contact", "Contact"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header
      className="site-header"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="site-container nav-inner">
        <Link to="/" className="brand" aria-label="MTMKay home">
          <img src="/mtmkay_logo.png" alt="" width="48" height="48" />
          <span>
            MTMKay<span className="brand-period">.</span>
          </span>
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close −" : "Menu +"}
        </button>
        <nav
          id="main-navigation"
          className={`main-navigation ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="nav-cta text-[#2450d8]"
            onClick={() => setOpen(false)}
          >
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}
