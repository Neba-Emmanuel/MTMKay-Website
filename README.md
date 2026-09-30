# MTMKay website

React + Vite website with consultancy pages and the existing training, blog, registration, payment, Work Café, and administration routes.

## Develop

```sh
npm ci
npm run dev
```

Set `VITE_API_URL` to the backend API base URL in your local environment. Without it, the contact page offers email instead of a form. Never add SMTP credentials or other server secrets to Vite variables.

## Verify and build

```sh
npm run typecheck
npm run build
npm run preview
```

Tailwind styles for the existing pages are compiled through PostCSS. The new design uses `src/styles/marketing.css`. No browser Tailwind CDN is required.

See [CONTENT_REVIEW.md](CONTENT_REVIEW.md) for copy ownership, case-study approval, contact delivery verification, and launch requirements. Company details, capabilities, process, and draft work content are editable in `src/data/site.ts`.

The backend contact contract is `POST /contact/form` with `name`, `email`, `subject`, and `message`; successful responses contain `{ "success": true, "message": "..." }`. Browser QA uses intercepted requests; live SMTP delivery needs an authorised end-to-end test before launch.
