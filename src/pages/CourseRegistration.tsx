import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { Meta } from "../components/marketing/Elements";
import { useApiRequest } from "../hooks/useApiRequest";
import { usePublicResource } from "../hooks/usePublicResource";
import { site } from "../data/site";

interface TrainingSlot {
  id: number;
  startDate: string;
  endDate: string;
  schedule: string;
  seats: number;
  availableSeats: number;
}
interface Training {
  id: number;
  title: string;
  slug: string;
  summary: string;
  price: number;
  slots: TrainingSlot[];
}
interface Registration {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  schedule: string;
  amount: number;
  paymentStatus: string;
}
const formatDate = (value: string) =>
  Number.isFinite(Date.parse(value))
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Date to be confirmed";
const formatPrice = (value: number) =>
  Number(value) === 0 ? "Free" : `${Number(value).toLocaleString()} XAF`;

export function RegistrationProgress({
  step,
  free,
}: {
  step: number;
  free: boolean;
}) {
  return (
    <ol className="registration-progress" aria-label="Registration progress">
      {[
        "Your details",
        free ? "Review & confirm" : "Payment",
        "Confirmation",
      ].map((label, index) => (
        <li
          key={label}
          className={step >= index + 1 ? "is-current" : ""}
          aria-current={step === index + 1 ? "step" : undefined}
        >
          <span aria-hidden="true">0{index + 1}</span>
          <span>{label}</span>
          {step > index + 1 && <span className="sr-only">Completed</span>}
        </li>
      ))}
    </ol>
  );
}

export default function CourseRegistration() {
  const location = useLocation();
  const initial = location.state as {
    trainingSlug?: string;
    slotId?: string | number;
  } | null;
  const { data, status, retry } = usePublicResource<Training[]>("/trainings");
  const { request } = useApiRequest();
  const trainings = Array.isArray(data) ? data : [];
  const [selectedTrainingId, setSelectedTrainingId] = useState("");
  const [slotId, setSlotId] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inFlight = useRef(false);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const selectedTraining = trainings.find(
    (item) => String(item.id) === selectedTrainingId,
  );
  const selectedSlot = selectedTraining?.slots?.find(
    (slot) => String(slot.id) === slotId,
  );
  const free = selectedTraining ? Number(selectedTraining.price) === 0 : false;
  const canRegister = Boolean(selectedSlot && selectedSlot.availableSeats > 0);

  useEffect(() => {
    if (!Array.isArray(data) || !initial?.trainingSlug) return;
    const training = data.find((item) => item.slug === initial.trainingSlug);
    if (!training) return;
    setSelectedTrainingId(String(training.id));
    const available = (training.slots || []).filter(
      (slot) => slot.availableSeats > 0,
    );
    const slot =
      available.find((item) => String(item.id) === String(initial.slotId)) ||
      available[0];
    setSlotId(slot ? String(slot.id) : "");
  }, [data, initial?.trainingSlug, initial?.slotId]);
  useEffect(() => {
    if (step > 1) stepHeading.current?.focus();
  }, [step]);

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    setError("");
    if (
      !fullname.trim() ||
      !email.trim() ||
      phone.replace(/\D/g, "").length < 8 ||
      !canRegister ||
      !selectedTraining ||
      !selectedSlot
    ) {
      setError(
        "Please enter your contact details and choose a session with available seats.",
      );
      return;
    }
    inFlight.current = true;
    setLoading(true);
    try {
      const response = await request({
        method: "POST",
        url: "/registrations",
        data: {
          trainingId: selectedTraining.id,
          fullname: fullname.trim(),
          email: email.trim(),
          phone: phone.trim(),
          schedule: selectedSlot.schedule,
          amount: selectedTraining.price,
        },
      });
      if (!response?.registration?.id)
        throw new Error("Registration was not confirmed.");
      setRegistration(response.registration);
      setStep(2);
    } catch {
      setError(
        "We couldn’t create your registration. Please try again, or contact our team for help.",
      );
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }

  async function handlePaymentConfirm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || !registration || !selectedTraining) return;
    setError("");
    inFlight.current = true;
    setLoading(true);
    try {
      if (free) {
        await request({
          method: "POST",
          url: "/registrations/free",
          data: { registrationId: registration.id },
        });
        setStep(3);
      } else {
        const response = await request({
          method: "POST",
          url: "/payments/initiate",
          data: {
            email: registration.email,
            registrationId: registration.id,
            amount: selectedTraining.price,
            fullname: registration.fullname,
            phone: phone.trim(),
            trainingTitle: selectedTraining.title,
          },
        });
        const link = response?.link || response?.paymentUrl;
        if (!link) throw new Error("No payment link returned.");
        const destination = new URL(link);
        if (!["https:", "http:"].includes(destination.protocol))
          throw new Error("Invalid payment link.");
        setPaymentLink(destination.href);
        window.location.assign(destination.href);
      }
    } catch {
      setError(
        free
          ? "We couldn’t confirm your registration. Please try again."
          : "We couldn’t open the payment page. Your registration is saved; please try again to continue payment.",
      );
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  }

  return (
    <div className="editorial-page resource-page registration-page">
      <Meta
        title="Course registration"
        path="/register"
        description="Choose your MTMKay training session, add your details, and complete your registration."
        draft
      />
      <header className="site-container detail-header registration-header">
        <Link
          className="text-link"
          to={
            selectedTraining
              ? `/trainings/${selectedTraining.slug}`
              : "/trainings"
          }
        >
          {selectedTraining ? "Back to programme" : "All programmes"}
        </Link>
        <p className="eyebrow">ACADEMY / REGISTRATION</p>
        <h1>
          Your next chapter
          <br />
          starts here.
        </h1>
        <p className="detail-deck">
          Choose your programme, tell us a little about yourself, and take the
          next step in your learning.
        </p>
      </header>
      <section
        className="site-container registration-section"
        aria-label="Course registration"
      >
        <RegistrationProgress step={step} free={free} />
        {status === "loading" ? (
          <div className="resource-state" role="status">
            Loading available programmes…
          </div>
        ) : status !== "success" ? (
          <div className="resource-state" role="alert">
            <h2>We couldn’t load the programmes.</h2>
            <p>Please try again to see available sessions.</p>
            <button className="solid-link" onClick={retry}>
              Try again
            </button>
          </div>
        ) : !trainings.length ? (
          <div className="resource-state">
            <h2>New programmes are on the way.</h2>
            <p>Contact us to ask about upcoming training.</p>
            <Link
              className="text-link"
              to="/contact?service=Training%20enquiry"
            >
              Ask about training
            </Link>
          </div>
        ) : (
          <div className="registration-layout">
            <div className="registration-main">
              {step === 1 && (
                <form
                  onSubmit={handleFormSubmit}
                  className="registration-form"
                  aria-busy={loading}
                >
                  <p className="eyebrow">01 / YOUR DETAILS</p>
                  <h2>Let’s get you started.</h2>
                  <p className="registration-intro">
                    All fields are required. We’ll use these details for your
                    registration and confirmation.
                  </p>
                  <fieldset disabled={loading}>
                    <legend>Your programme</legend>
                    <label htmlFor="training">
                      Programme
                      <select
                        id="training"
                        required
                        value={selectedTrainingId}
                        onChange={(event) => {
                          setSelectedTrainingId(event.target.value);
                          setSlotId("");
                          setError("");
                        }}
                      >
                        <option value="">Choose a programme</option>
                        {trainings.map((training) => (
                          <option key={training.id} value={training.id}>
                            {training.title} — {formatPrice(training.price)}
                          </option>
                        ))}
                      </select>
                    </label>
                    {selectedTraining && (
                      <>
                        <label htmlFor="slot">
                          Session
                          <select
                            id="slot"
                            required
                            value={slotId}
                            onChange={(event) => setSlotId(event.target.value)}
                            disabled={!selectedTraining.slots?.length}
                          >
                            <option value="">Choose a session</option>
                            {(selectedTraining.slots || []).map((slot) => (
                              <option
                                key={slot.id}
                                value={slot.id}
                                disabled={slot.availableSeats <= 0}
                              >
                                {slot.schedule || "Training session"} ·{" "}
                                {formatDate(slot.startDate)} –{" "}
                                {formatDate(slot.endDate)} ·{" "}
                                {slot.availableSeats > 0
                                  ? `${slot.availableSeats} seats left`
                                  : "Full"}
                              </option>
                            ))}
                          </select>
                        </label>
                        {!(selectedTraining.slots || []).some(
                          (slot) => slot.availableSeats > 0,
                        ) && (
                          <p className="registration-note" role="status">
                            There are no available seats for this programme
                            right now. Choose another programme or{" "}
                            <Link
                              to={`/contact?service=${encodeURIComponent(`Training enquiry: ${selectedTraining.title}`)}`}
                            >
                              ask about upcoming sessions
                            </Link>
                            .
                          </p>
                        )}
                      </>
                    )}
                  </fieldset>
                  <fieldset disabled={loading}>
                    <legend>Your contact details</legend>
                    <label htmlFor="fullname">
                      Full name
                      <input
                        id="fullname"
                        autoComplete="name"
                        required
                        value={fullname}
                        onChange={(event) => setFullname(event.target.value)}
                        placeholder="Your full name"
                      />
                    </label>
                    <div className="registration-fields">
                      <label htmlFor="email">
                        Email address
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="you@example.com"
                        />
                      </label>
                      <label htmlFor="phone">
                        Phone number
                        <input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          required
                          minLength={8}
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          placeholder="e.g. +237 6XXXXXXXX"
                        />
                      </label>
                    </div>
                  </fieldset>
                  {error && (
                    <p className="registration-error" role="alert">
                      {error}
                    </p>
                  )}
                  <button
                    className="solid-link"
                    type="submit"
                    disabled={loading || !canRegister}
                  >
                    {loading
                      ? "Saving your details…"
                      : free
                        ? "Review registration"
                        : "Continue to payment"}
                  </button>
                  <p className="registration-footnote">
                    {free
                      ? "No payment is required for this programme."
                      : "You’ll review your registration before opening the payment page."}
                  </p>
                </form>
              )}
              {step === 2 && (
                <form
                  className="registration-form"
                  onSubmit={handlePaymentConfirm}
                  aria-busy={loading}
                >
                  <p className="eyebrow">
                    02 / {free ? "REVIEW & CONFIRM" : "PAYMENT"}
                  </p>
                  <h2 ref={stepHeading} tabIndex={-1}>
                    {free ? "One last step." : "Complete your registration."}
                  </h2>
                  <p className="registration-intro">
                    {free
                      ? "Review your details, then confirm your place. This programme is free."
                      : "Your details are saved. Continue to the payment page to finish your registration."}
                  </p>
                  <dl className="facts-list registration-review">
                    <div>
                      <dt>Registration</dt>
                      <dd>MTM-{registration?.id}</dd>
                    </div>
                    <div>
                      <dt>Name</dt>
                      <dd>{registration?.fullname}</dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd>{registration?.email}</dd>
                    </div>
                    <div>
                      <dt>Phone</dt>
                      <dd>{registration?.phone}</dd>
                    </div>
                    <div>
                      <dt>Schedule</dt>
                      <dd>{registration?.schedule}</dd>
                    </div>
                  </dl>
                  {!free && (
                    <>
                      <p className="eyebrow">MOBILE MONEY</p>
                      <div className="payment-methods">
                        <span>MTN Mobile Money</span>
                        <span>Orange Money</span>
                      </div>
                      <label htmlFor="payment-phone">
                        Payment phone number
                        <input
                          id="payment-phone"
                          type="tel"
                          autoComplete="tel"
                          minLength={8}
                          required
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          disabled={loading}
                        />
                      </label>
                      <p className="registration-note">
                        Complete payment on the provider’s page. Your
                        registration is confirmed once payment is verified.
                      </p>
                    </>
                  )}
                  {error && (
                    <p className="registration-error" role="alert">
                      {error}
                    </p>
                  )}
                  <button
                    className="solid-link"
                    type="submit"
                    disabled={loading}
                  >
                    {loading
                      ? "Processing…"
                      : free
                        ? "Confirm free registration"
                        : "Proceed to payment"}
                  </button>
                  {paymentLink && (
                    <p className="registration-footnote">
                      If the payment page hasn’t opened,{" "}
                      <a className="text-link" href={paymentLink}>
                        continue to payment
                      </a>
                      .
                    </p>
                  )}
                </form>
              )}
              {step === 3 && (
                <div className="registration-confirmation">
                  <p className="eyebrow">03 / CONFIRMED</p>
                  <h2 ref={stepHeading} tabIndex={-1}>
                    You’re ready
                    <br />
                    to get started.
                  </h2>
                  <p className="registration-intro">
                    Thank you, {registration?.fullname}. Your registration for{" "}
                    {selectedTraining?.title} is confirmed.
                  </p>
                  <dl className="facts-list registration-review">
                    <div>
                      <dt>Registration</dt>
                      <dd>MTM-{registration?.id}</dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd>{registration?.email}</dd>
                    </div>
                    <div>
                      <dt>Schedule</dt>
                      <dd>{registration?.schedule}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>Confirmed</dd>
                    </div>
                  </dl>
                  <Link className="solid-link" to="/trainings">
                    Explore more programmes
                  </Link>
                  <Link className="text-link" to="/">
                    Return home
                  </Link>
                </div>
              )}
            </div>
            <aside className="registration-summary">
              <p className="eyebrow">YOUR LEARNING PLAN</p>
              <h2>{selectedTraining?.title || "A useful next step."}</h2>
              <p>
                {selectedTraining?.summary ||
                  "Choose a programme to see your session details and course fee here."}
              </p>
              {selectedTraining && (
                <>
                  <dl className="facts-list">
                    {selectedSlot && (
                      <>
                        <div>
                          <dt>Dates</dt>
                          <dd>
                            {formatDate(selectedSlot.startDate)}
                            <br />
                            {formatDate(selectedSlot.endDate)}
                          </dd>
                        </div>
                        <div>
                          <dt>Schedule</dt>
                          <dd>{selectedSlot.schedule || "To be confirmed"}</dd>
                        </div>
                        {step === 1 && (
                          <div>
                            <dt>Available seats</dt>
                            <dd>{selectedSlot.availableSeats}</dd>
                          </div>
                        )}
                      </>
                    )}
                    <div className="registration-total">
                      <dt>Programme fee</dt>
                      <dd>{formatPrice(selectedTraining.price)}</dd>
                    </div>
                  </dl>
                  {step === 1 && (
                    <Link
                      className="text-link"
                      to={`/trainings/${selectedTraining.slug}`}
                    >
                      View programme details
                    </Link>
                  )}
                </>
              )}
              <div className="registration-help">
                <p className="eyebrow">A LITTLE HELP?</p>
                <p>
                  Questions about the course or your registration? We’re here to
                  help.
                </p>
                <a className="text-link" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </div>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}
