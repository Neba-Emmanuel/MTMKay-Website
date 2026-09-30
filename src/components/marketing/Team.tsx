import { useState } from "react";
import { Link } from "react-router-dom";
import { teamData } from "../../data/team";
import { type TeamMember } from "../../../types";

function TeamPortrait({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`team-portrait team-portrait-${member.id}`}>
      {failed ? (
        <div
          className="portrait-placeholder"
          role="img"
          aria-label={`Portrait of ${member.name} coming soon`}
        >
          <span>
            {member.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </span>
          <small>Portrait coming soon</small>
        </div>
      ) : (
        <img
          src={member.imageUrl}
          alt={member.name}
          width="640"
          height="800"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
export default function Team({ preview = false }: { preview?: boolean }) {
  return (
    <section
      className="team-section section-space"
      id="team"
      aria-labelledby="team-title"
    >
      <div className="site-container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR TEAM</p>
            <h2 id="team-title">
              The people behind
              <br />
              the possibilities.
            </h2>
          </div>
          {preview ? (
            <Link className="text-link" to="/about#team">
              Meet MTMKay
            </Link>
          ) : (
            <p className="heading-aside">
              Meet the people bringing their perspectives to MTMKay.
            </p>
          )}
        </div>
        <div className="team-grid">
          {teamData.map((member) => (
            <article className="team-member" key={member.id}>
              <TeamPortrait member={member} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
