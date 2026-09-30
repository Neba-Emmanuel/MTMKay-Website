# Rebuild verification

The client journey is: learn about MTMKay → explore services/work → open Contact → submit an inquiry → POST the existing backend contact endpoint → render delivery feedback.

## Completed
- Production Vite build and TypeScript check pass.
- Browser checked Home, Services, About, Work, draft case study, Contact at 1440px, 390px and 320px widths: each renders its heading, with no horizontal overflow, broken images, or Vite overlay.
- Desktop and mobile screenshots visually reviewed for typography, layout, project cover, and form.
- Mobile navigation opens, exposes links, and closes after navigation.
- Local-only intercepted contact request with `{ success: true, message: ... }` shows the success message and clears the form.
- Failed request shows the delivery error and keeps the user’s input. No actual inquiry emails were sent.
- Contact has labelled required fields, native email validation, trimmed input checks, a disabled sending button, an immediate in-flight guard, and live success/error announcements.
- Backend source confirms POST `/contact/form`, matching request fields, rate limiter, and the response shape now used by the client.
- Removed browser Tailwind CDN. Build-time Tailwind v3 matches the former runtime major version; safelisted existing dynamically generated lead-form colors.
- Retained Work Café route checked; clipped the off-screen entrance animation overflow in the public layout.
- Existing admin, payment, training, registration, blog, and OG-handler routes remain in place. Their complete transactional flows were not re-executed.

## Not verified / launch gates
- Live SMTP delivery and auto-reply (requires an authorised recipient and deployment SMTP configuration).
- Owner approval of service positioning, contact details, and case-study details/assets. Public attribution of the exam/STEM platform to MTMKay has been confirmed.
- Legal/privacy copy approval.
- Full performance audit and external-service availability. This remains a Vite SPA; main marketing page metadata is updated client-side, with baseline social metadata in index.html. Existing server-side blog/training preview handlers are preserved.

No standalone test or lint suites existed in this repository. `npm run typecheck` was added for repeatable static checking. Browser response tests used interception, not production submissions.

## Image-led pages and team update

- Home, Services, About, Work, case study, and Contact checked at 1440px, 390px and 320px: images decode successfully, no broken images or horizontal overflow, and no browser errors.
- Visually reviewed desktop hero and mobile Services/About layouts. A fresh viewport capture confirmed the About photographs render; an initial full-page screenshot was captured before paint.
- Four existing team profiles and portraits reused on Home and About. Existing dummy biography text is omitted from the rendered section.
- Footer government-contracting link points to the retained `/capabilities-statement` route.
- Built-in image generation produced two conceptual assets. Provenance, final prompts, final paths and optimisation details are in `IMAGE_ASSETS.md`.
