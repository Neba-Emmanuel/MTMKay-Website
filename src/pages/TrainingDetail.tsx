import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Meta } from "../components/marketing/Elements";
import DetailState from "../components/marketing/DetailState";
import { usePublicResource } from "../hooks/usePublicResource";

export interface Training {
  id: number;
  title: string;
  slug: string;
  summary: string;
  objectives?: string;
  eligibility?: string;
  outline?: string;
  resources?: string;
  price: number;
  imageUrl?: string;
  category?: string;
  slots?: {
    id: number;
    startDate: string;
    endDate: string;
    schedule: string;
    seats: number;
    availableSeats: number;
  }[];
}
const linesOf = (value?: string) =>
  (value || "")
    .split("\n")
    .map((line) => line.trim().replace(/^[-•]\s*/, ""))
    .filter(Boolean);
export function parseOutline(value?: string) {
  const modules: { title: string; topics: string[] }[] = [];
  for (const line of linesOf(value)) {
    if (/^(module|week|part|section)\b/i.test(line))
      modules.push({ title: line, topics: [] });
    else {
      if (!modules.length)
        modules.push({ title: "Programme overview", topics: [] });
      modules[modules.length - 1].topics.push(line);
    }
  }
  return modules;
}
const formatDate = (date: string) =>
  Number.isFinite(Date.parse(date))
    ? new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date to be confirmed";
function CourseSection({
  label,
  title,
  items,
  empty,
}: {
  label: string;
  title: string;
  items: string[];
  empty: string;
}) {
  return (
    <section className="course-section">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
      {items.length ? (
        <ul className="editorial-list">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="section-copy">{empty}</p>
      )}
    </section>
  );
}
export function TrainingContent({ training }: { training: Training }) {
  const slots = training.slots || [];
  const modules = parseOutline(training.outline);
  const hasSeats = slots.some((slot) => slot.availableSeats > 0);
  return (
    <div className="editorial-page resource-page">
      <Meta
        title={training.title}
        path={`/trainings/${training.slug}`}
        description={training.summary}
      />
      {training.imageUrl && (
        <Helmet>
          <meta property="og:image" content={training.imageUrl} />
        </Helmet>
      )}
      <header className="site-container detail-header course-header">
        <Link className="text-link" to="/trainings">
          All programmes
        </Link>
        <p className="eyebrow">
          ACADEMY / {training.category || "PRACTICAL LEARNING"}
        </p>
        <h1>{training.title}</h1>
        <p className="detail-deck">{training.summary}</p>
        <div className="detail-header-bottom">
          <a className="solid-link" href="#training-sessions">
            View available sessions
          </a>
          <span>Learn with MTMKay</span>
        </div>
      </header>
      <div className="site-container">
        <img
          className="detail-cover course-cover"
          src={training.imageUrl || "/learning.jpg"}
          alt={training.title}
          decoding="async"
          onError={(event) => {
            if (!event.currentTarget.src.endsWith("/learning.jpg"))
              event.currentTarget.src = "/learning.jpg";
          }}
        />
      </div>
      <div className="site-container course-layout">
        <div>
          <CourseSection
            label="01 / THE OUTCOME"
            title="What you’ll learn."
            items={linesOf(training.objectives)}
            empty="Ask our team about the learning outcomes for this programme."
          />
          <CourseSection
            label="02 / YOUR STARTING POINT"
            title="Who it’s for."
            items={linesOf(training.eligibility)}
            empty="No specific entry requirements are listed. Contact us to see if this programme fits your experience."
          />
          <section className="course-section">
            <p className="eyebrow">03 / THE PROGRAMME</p>
            <h2>A look at the course.</h2>
            {modules.length ? (
              <div className="editorial-faq course-modules">
                {modules.map((module, index) => (
                  <details key={index} open={index === 0}>
                    <summary>{module.title}</summary>
                    {module.topics.length > 0 && (
                      <ul>
                        {module.topics.map((topic, i) => (
                          <li key={i}>{topic}</li>
                        ))}
                      </ul>
                    )}
                  </details>
                ))}
              </div>
            ) : (
              <p className="section-copy">
                The detailed course outline will be shared by our training team.
              </p>
            )}
          </section>
          <CourseSection
            label="04 / WHAT’S INCLUDED"
            title="Tools for the journey."
            items={linesOf(training.resources)}
            empty="Contact us for details about the learning materials and resources."
          />
        </div>
        <aside id="training-sessions" className="course-booking">
          <p className="eyebrow">TAKE THE NEXT STEP</p>
          <h2>Make time to learn.</h2>
          <p className="course-price">
            {training.price != null
              ? `${Number(training.price).toLocaleString()} XAF`
              : "Ask about pricing"}
            <span>Programme fee</span>
          </p>
          <h3>Available sessions</h3>
          {slots.length ? (
            <div className="session-list">
              {slots.map((slot, index) => (
                <article key={slot.id}>
                  <p className="eyebrow">
                    SESSION {String(index + 1).padStart(2, "0")}
                  </p>
                  <h4>
                    {formatDate(slot.startDate)}
                    {slot.endDate && ` – ${formatDate(slot.endDate)}`}
                  </h4>
                  <p>{slot.schedule || "Schedule to be confirmed"}</p>
                  <p>
                    {slot.availableSeats > 0
                      ? `${slot.availableSeats} / ${slot.seats} seats available`
                      : "This session is full"}
                  </p>
                  {slot.availableSeats > 0 && (
                    <Link
                      className="text-link"
                      to="/register"
                      state={{
                        trainingId: training.id,
                        trainingSlug: training.slug,
                        slotId: String(slot.id),
                      }}
                      aria-label={`Register for session ${index + 1}, starting ${formatDate(slot.startDate)}`}
                    >
                      Choose this session
                    </Link>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p className="section-copy">
              New sessions will appear here when they’re available.
            </p>
          )}
          {hasSeats ? (
            <Link
              className="solid-link"
              to="/register"
              state={{ trainingId: training.id, trainingSlug: training.slug }}
            >
              Register now
            </Link>
          ) : (
            <p className="course-availability">
              {slots.length
                ? "All current sessions are full."
                : "No sessions available yet."}
            </p>
          )}
          <Link
            className="text-link"
            to={`/contact?service=${encodeURIComponent(`Training enquiry: ${training.title}`)}`}
          >
            Ask about this programme
          </Link>
        </aside>
      </div>
      <section className="resource-band">
        <div className="site-container community-section">
          <div>
            <p className="eyebrow">FIND YOUR DIRECTION</p>
            <h2>Another skill in mind?</h2>
          </div>
          <div>
            <p>
              Explore the rest of our programmes, or talk to us about what you’d
              like to learn next.
            </p>
            <Link className="text-link" to="/trainings">
              Browse all programmes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
export default function TrainingDetail() {
  const { id = "" } = useParams<{ id: string }>();
  const { data, status, retry } = usePublicResource<Training>(
    `/trainings/${encodeURIComponent(id)}`,
  );
  if (status !== "success" || !data)
    return (
      <DetailState
        kind="programme"
        status={status === "success" ? "missing" : status}
        retry={retry}
      />
    );
  return <TrainingContent key={data.slug} training={data} />;
}
