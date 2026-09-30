import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CTA, Meta, PageIntro } from "../components/marketing/Elements";
import Media from "../components/marketing/Media";
import { useApiRequest } from "../hooks/useApiRequest";

type Training = {
  id: number;
  slug: string;
  title: string;
  summary?: string;
  category?: string;
  imageUrl?: string;
  price?: number;
  slots?: { startDate: string; availableSeats: number }[];
};

export default function Trainings() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [ready, setReady] = useState(false);
  const { request, data, loading, error } = useApiRequest<Training[]>();
  const fetchTrainings = useCallback(async () => {
    try {
      await request({ method: "GET", url: "/trainings" });
    } catch {
      /* The request hook exposes the error to the page. */
    } finally {
      setReady(true);
    }
  }, [request]);
  useEffect(() => {
    void fetchTrainings();
  }, [fetchTrainings]);
  const trainings = Array.isArray(data) ? data : [];
  const categories = Array.from(
    new Set(
      trainings.flatMap((item) => (item.category ? [item.category] : [])),
    ),
  );
  const filtered = trainings.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      `${item.title} ${item.summary || ""}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );

  return (
    <div className="editorial-page resource-page">
      <Meta
        title="Academy & training"
        path="/trainings"
        description="Explore practical technology training at MTMKay. Find your next course, browse sessions, and build useful skills."
      />
      <div className="site-container visual-page-intro">
        <PageIntro
          label="ACADEMY & TRAINING"
          title="Build skills. Open possibilities."
          text="Practical technology training for your next step. Explore our programmes, find a session that works for you, and put what you learn into practice."
        />
        <Media asset="collaboration" caption priority className="intro-photo" />
      </div>
      <section
        className="site-container resource-section"
        aria-labelledby="programmes-title"
      >
        <div className="resource-heading">
          <div>
            <p className="eyebrow">LEARN WITH MTMKAY</p>
            <h2 id="programmes-title">Find your next step.</h2>
          </div>
          <p>Explore the current training catalogue.</p>
        </div>
        <div className="catalogue-filters">
          <label htmlFor="training-search">
            Search programmes
            <input
              id="training-search"
              type="search"
              placeholder="What would you like to learn?"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <label htmlFor="training-category">
            Category
            <select
              id="training-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="All">All categories</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        {loading || !ready ? (
          <div className="resource-state" role="status">
            Loading programmes…
          </div>
        ) : error ? (
          <div className="resource-state" role="alert">
            <h3>We couldn’t load the programmes.</h3>
            <p>Please try again to see available training.</p>
            <button className="solid-link" onClick={fetchTrainings}>
              Try again
            </button>
          </div>
        ) : filtered.length ? (
          <>
            <p className="catalogue-count" role="status">
              {filtered.length}{" "}
              {filtered.length === 1 ? "programme" : "programmes"}
            </p>
            <div className="resource-grid">
              {filtered.map((training) => {
                const nextDate = (training.slots || [])
                  .map((slot) => slot.startDate)
                  .filter((date) => Number.isFinite(Date.parse(date)))
                  .sort((a, b) => Date.parse(a) - Date.parse(b))[0];
                const seats = (training.slots || []).reduce(
                  (sum, slot) => sum + (slot.availableSeats || 0),
                  0,
                );
                return (
                  <article className="resource-card" key={training.id}>
                    <Link
                      to={`/trainings/${training.slug}`}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <img
                        className="resource-cover"
                        src={training.imageUrl || "/learning.jpg"}
                        alt=""
                        loading="lazy"
                        onError={(event) => {
                          if (
                            !event.currentTarget.src.endsWith("/learning.jpg")
                          )
                            event.currentTarget.src = "/learning.jpg";
                        }}
                      />
                    </Link>
                    <div className="resource-card-body">
                      <p className="eyebrow">
                        {training.category || "PRACTICAL LEARNING"}
                      </p>
                      <h3>
                        <Link to={`/trainings/${training.slug}`}>
                          {training.title}
                        </Link>
                      </h3>
                      <p>
                        {training.summary ||
                          "Explore the programme for course content and session details."}
                      </p>
                      <div className="resource-meta">
                        {nextDate && (
                          <span>
                            Starts{" "}
                            {new Date(nextDate).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        )}
                        <span>{training.slots?.length || 0} sessions</span>
                        {seats > 0 && <span>{seats} seats available</span>}
                      </div>
                      <div className="resource-card-bottom">
                        <strong>
                          {training.price != null
                            ? `${Number(training.price).toLocaleString()} XAF`
                            : "Enquire for pricing"}
                        </strong>
                        <Link
                          className="text-link"
                          to={`/trainings/${training.slug}`}
                        >
                          View programme
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          <div className="resource-state">
            <h3>
              {trainings.length
                ? "No matching programmes."
                : "New opportunities to learn are on the way."}
            </h3>
            <p>
              {trainings.length
                ? "Try another search or choose a different category."
                : "Check back for upcoming training, or tell us what you’d like to learn."}
            </p>
            {trainings.length ? (
              <button
                className="text-link"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Clear filters
              </button>
            ) : (
              <Link
                className="text-link"
                to="/contact?service=Training%20enquiry"
              >
                Ask about training
              </Link>
            )}
          </div>
        )}
      </section>
      <section className="resource-band">
        <div className="site-container community-section">
          <div>
            <p className="eyebrow">SPACE TO FOCUS</p>
            <h2>A place to put your learning to work.</h2>
          </div>
          <div>
            <p>
              Explore the Work Café for a workspace with internet, power, and
              room to focus.
            </p>
            <Link className="text-link" to="/work-cafe">
              Discover the Work Café
            </Link>
          </div>
        </div>
      </section>
      <CTA />
    </div>
  );
}
