# Rebuild review and launch requirements

The consultancy positioning and service/process wording are **draft copy from the supplied rebuild brief**, not independently verified company claims. Review before publishing.

## Evidence reused
- `public/mtmkay_logo.png`: existing company logo; existing blue palette informed the new #2450d8 design token.
- Existing Contact/Footer: support@mtmkay.com, +237 671 128 616, Kumba, Cameroon, LinkedIn profile.
- Existing package metadata and sitemap: https://www.mtmkay.com. Confirm preferred production domain before launch.
- Backend `src/routes/contact.ts` and `src/controllers/contactController.ts`: POST /contact/form, accepts name/email/subject/message, returns `{ success, message }`, sends inquiry to configured ADMIN_EMAIL (fallback support@mtmkay.com) and an auto-reply. Frontend now handles that actual response contract.

- Owner confirmation in this conversation: the exam/STEM platform may be publicly credited as MTMKay’s work. This confirms project attribution, not specific delivery scope or results.
- Public branding and audience checked at https://exam.mtmkay.com/ and https://exam.mtmkay.com/about. Product features were cross-checked against the adjacent Exam Prep repository; see `EXAM_PREP_CASE_STUDY_SOURCES.md`.

## Required owner review
- [ ] Approve consultancy positioning, all four capabilities, and the proposed engagement approach in `src/data/site.ts`.
- [ ] Reconfirm public contact channels, location, domain, logo, and blue.
- [ ] Approve legal company name and any required privacy policy before launching the inquiry form. The form explains that inquiry details are emailed to MTMKay; this is not a substitute for a reviewed policy.
- [x] Confirm public attribution of the exam/STEM platform to MTMKay (owner confirmed in conversation).
- [x] Replace the Exam Prep draft with a product case study grounded in the public website and project code. No unverified delivery dates, individual contributions, or measured outcomes are claimed.
- The Exam Prep cover remains a labelled concept illustration. The case study does not present it as a product screenshot.
- [ ] Review inherited Academy, Insights, Work Café, training, payment, and capabilities-statement content separately; routes and business integrations remain intact.
- [ ] Review backend contact auto-reply branding (currently mentions IT Training).
- [ ] Confirm SMTP delivery in the deployment environment with an authorised test recipient.

## Case study publishing
`/work` and `/work/exam-preparation` now contain the completed product case study. Draft metadata and the robots exclusion were removed, and both routes were added to the sitemap. This is a local website update, not a deployment. The case study describes the product and its learning flow, without quoting unverified impact figures.

## Editing and integrations
- Central company details, capabilities, process, hero and project: `src/data/site.ts`.
- Reusable marketing components: `src/components/marketing/Elements.tsx`.
- Responsive design tokens and styles: `src/styles/marketing.css`.
- `VITE_API_URL` remains the existing backend base URL. If absent, the contact page shows an email path and clearly states the form is pending configuration.
- Work Café contact navigation state and plan context are retained.
- Existing training/blog OG handlers, admin, registration and payment routes are preserved.
- Tailwind v3 is compiled at build time through PostCSS (matching the previous CDN version); the runtime Tailwind CDN is removed.
- No deployment was performed as part of the rebuild.

## Image-led design update
Existing MTMKay photographs are reused on the main pages. Generated abstract and STEM imagery, responsive sizes, captions, and source provenance are documented in `IMAGE_ASSETS.md`. The user authorised creating imagery and placeholders. The Exam Prep case study uses a labelled conceptual cover; actual product screenshots are not claimed.

## Team and government-contracting navigation
The user requested the team section and a footer government-contracting link. Team names, roles and portraits are reused from the existing `src/data/team.ts` and `public/team/` assets. Dummy biographies are not rendered. The government-contracting link leads to the existing capabilities statement; the inherited contracting claims and PDF are unchanged.
