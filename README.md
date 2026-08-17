# Merica's Coffee — Frontend

A Vue 3 + Vite frontend for Merica's coffee cart, pop-up schedule, and contact form.

**This README covers:** quick setup, core technologies, environment variables used by the app, and external services.

**Features**
- Hero and schedule listing
- Embedded Google Maps view for the upcoming location
- Upcoming location configurable via environment variables
- Inline contact form with client-side validation
- Responsive UI using Tailwind CSS + Flowbite

**Technologies**
- **Framework:** Vue 3
- **Bundler / Dev Server:** Vite
- **Styling:** Tailwind CSS
- **UI components:** Flowbite + Flowbite Vue
- **Icons:** Iconify (used via @iconify-prerendered/vue-flowbite)
- **State management:** Pinia (installed)
- **Routing:** Vue Router
- **Dev tooling:** ESLint, Prettier, OXLint

See `package.json` for exact dependency versions.

**External services & integrations**
- Google Maps (embed via iframe) — used to display the upcoming location on the Home page.
- Contact submission: the frontend posts JSON to `/api/contact` (placeholder). Replace this with your own backend endpoint or a form service (Formspree / Getform / Netlify Functions).

**Environment variables**
Copy `.env.example` to `.env` or `.env.local` and adjust values.

Key variables used by the frontend (Vite `import.meta.env`):
- `VITE_UPCOMING_LOCATION_NAME` — upcoming location name
- `VITE_UPCOMING_LOCATION_DATE` — textual date label
- `VITE_UPCOMING_LOCATION_TIME` — time label
- `VITE_UPCOMING_LOCATION_ADDRESS` — used to build the Google Maps query

See [.env.example](.env.example) for sample values.

**Run locally**
Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Common scripts (from `package.json`):
- `dev` — start Vite dev server
- `build` — build for production
- `preview` — preview production build
- `format` — run Prettier on `src/`

**Files of interest**
- Home view: [src/views/Home.vue](src/views/Home.vue)
- Site config and constants: [src/config/site.ts](src/config/site.ts)
- Contact form: included in the Home view and posts to `/api/contact` by default

**Deployment & next steps**
- To enable server-side contact handling, add a simple serverless function or backend route at `/api/contact`.
- For a Google Maps marker or programmatic control, use the Google Maps JavaScript API (requires an API key and billing on a Google Cloud project).
- Optionally wire contact form to Formspree / Getform and replace the POST URL if you do not want a backend.

If you'd like, I can add example serverless handlers for Netlify/Vercel or update the map to use an API-key-based embed.

---

Original starter README content retained where applicable.
