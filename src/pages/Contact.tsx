import Media from "../components/marketing/Media";
import { FormEvent, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Meta, PageIntro } from "../components/marketing/Elements";
import { site } from "../data/site";
import { useApiRequest } from "../hooks/useApiRequest";
type Plan = {
  name: string;
  price?: string;
  period?: string;
  features?: string[];
};
export default function Contact() {
  const location = useLocation();
  const [params] = useSearchParams();
  const state = location.state as { source?: string; plan?: Plan } | null;
  const plan = state?.plan;
  const [values, setValues] = useState(() => ({
    name: "",
    email: "",
    subject: plan
      ? `Work Café — ${plan.name} inquiry`
      : params.get("service") || "",
    message: plan
      ? `I’m interested in the ${plan.name}.\n${plan.price ? `Price: ${plan.price} FCFA/${plan.period || ""}\n` : ""}${plan.features?.join(", ") || ""}\nPlease share availability and booking details.`
      : "",
  }));
  const { request } = useApiRequest<{ success: boolean; message: string }>();
  const inFlight = useRef(false);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const configured = Boolean(import.meta.env.VITE_API_URL);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const data = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()]),
    );
    if (Object.values(data).some((value) => !value)) {
      setError("Please complete every field with your details.");
      setStatus("error");
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    try {
      const result = await request({
        method: "POST",
        url: "/contact/form",
        data: {
          ...data,
          source: state?.source || "website-project",
          plan: plan || null,
        },
      });
      if (result?.success !== true)
        throw new Error("The server did not confirm your message.");
      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError(
        "We couldn’t confirm delivery. Please try again, or email us directly using the address on this page.",
      );
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }
  return (
    <div className="editorial-page">
      <Meta title="Start a project" path="/contact" />
      <div className="site-container visual-page-intro">
        <PageIntro
          label="LET’S TALK"
          title="Every useful idea starts with a conversation."
          text="Tell us what you’re working on, what’s getting in the way, or what you’d like to make possible."
        />
        <Media asset="systems" caption priority className="intro-photo" />
      </div>
      <section className="site-container contact-grid">
        <aside>
          <p className="eyebrow">A DIRECT LINE</p>
          <a className="contact-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a href={`tel:${site.phone}`}>{site.phoneLabel}</a>
          <p>{site.location}</p>
          <div className="contact-note">
            <h2>A little context goes a long way.</h2>
            <p>
              Share the problem, who the project is for, and any timing or
              constraints you already know. It’s fine if you’re still figuring
              things out.
            </p>
          </div>
        </aside>
        {configured ? (
          <form
            onSubmit={submit}
            className="project-form"
            aria-label="Project inquiry"
            aria-busy={status === "sending"}
          >
            <div className="form-pair">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={120}
                  value={values.name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
              </label>
            </div>
            <label>
              What would you like to discuss?
              <input
                name="subject"
                required
                maxLength={200}
                placeholder="A new product, an existing challenge…"
                value={values.subject}
                onChange={(e) =>
                  setValues({ ...values, subject: e.target.value })
                }
              />
            </label>
            <label>
              Tell us a little about it
              <textarea
                name="message"
                required
                maxLength={5000}
                rows={5}
                placeholder="The idea, the people, the possibilities."
                value={values.message}
                onChange={(e) =>
                  setValues({ ...values, message: e.target.value })
                }
              />
            </label>
            <p className="form-note">
              Your details and message are emailed to MTMKay so we can respond
              to your inquiry.
            </p>
            <div aria-live="polite" role="status">
              {status === "success" && (
                <p className="form-success">
                  Thank you. Your message has been sent to MTMKay.
                </p>
              )}
            </div>
            {status === "error" && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button
              className="solid-link"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send inquiry"}{" "}

            </button>
          </form>
        ) : (
          <div className="contact-note">
            <h2>Email us to get started.</h2>
            <p>
              The inquiry form is pending configuration. You can contact us
              directly by email.
            </p>
            <a className="solid-link" href={`mailto:${site.email}`}>
              Start a conversation
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
