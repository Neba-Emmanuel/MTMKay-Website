import { Link } from "react-router-dom";
import { Meta } from "./Elements";

export default function DetailState({
  kind,
  status,
  retry,
}: {
  kind: "programme" | "article";
  status: "loading" | "missing" | "error";
  retry: () => void;
}) {
  const path = kind === "programme" ? "/trainings" : "/blog";
  const back = kind === "programme" ? "All programmes" : "All insights";
  return (
    <div className="editorial-page resource-page">
      <Meta
        title={
          status === "loading"
            ? `Loading ${kind}`
            : `${kind === "programme" ? "Programme" : "Article"} unavailable`
        }
        path={path}
        draft
      />
      <div className="site-container detail-state">
        <Link className="text-link" to={path}>
          {back}
        </Link>
        <div
          className="resource-state"
          role={status === "error" ? "alert" : "status"}
        >
          <p className="eyebrow">
            {kind === "programme" ? "ACADEMY & TRAINING" : "INSIGHTS"}
          </p>
          <h1>
            {status === "loading"
              ? `Loading your ${kind}…`
              : status === "missing"
                ? `This ${kind} isn’t available.`
                : `We couldn’t load this ${kind}.`}
          </h1>
          {status !== "loading" && (
            <p>
              {status === "missing"
                ? `It may have moved or is no longer published. Explore the other ${kind === "programme" ? "programmes" : "articles"} available.`
                : "Please try again in a moment."}
            </p>
          )}
          {status === "error" && (
            <button className="solid-link" onClick={retry}>
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
