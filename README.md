# Lustre — MERN Conversion

A MongoDB / Express / React / Node.js rebuild of the "Lustre" plastic-surgery HTML template,
with a full custom admin panel for editing every piece of site content.

```
lustre-mern/
├── server/   # Express + Mongoose API, JWT auth, Cloudinary image uploads
├── client/   # React (Vite) — public site + /admin CRUD panel, same app
└── README.md
```

## 1. Prerequisites

- Node.js 18+
- A MongoDB database (local `mongod`, or a free MongoDB Atlas cluster)
- A free [Cloudinary](https://cloudinary.com) account (for image uploads — cloud name, API key, API secret)

## 2. Server setup

```bash
cd server
cp .env.example .env
# edit .env: set MONGO_URI, JWT_SECRET, CLOUDINARY_* , ADMIN_EMAIL / ADMIN_PASSWORD
npm install
npm run seed:admin   # creates your first admin login using ADMIN_EMAIL/ADMIN_PASSWORD from .env
npm run dev           # starts the API on http://localhost:5000
```

Health check: `GET http://localhost:5000/api/health`

## 3. Client setup

```bash
cd client
cp .env.example .env   # VITE_API_URL=/api is correct for local dev (uses the Vite proxy)
npm install
npm run dev             # starts the site on http://localhost:5173
```

The public site is at `/`, the admin panel is at `/admin` (log in with the admin account you seeded).

## 4. Production build

```bash
cd client
npm run build      # outputs static files to client/dist — serve with any static host / nginx / Express static

cd ../server
npm start           # NODE_ENV=production node src/app.js
```

Set `CLIENT_ORIGIN` in the server `.env` to your deployed client's URL so CORS allows it.

## 5. What's editable from `/admin`

Every content block listed in the original brief is stored in MongoDB and editable without a
redeploy: header/nav, home hero slides (both home pages), about section, services (list + full
detail page content), "who we are", how-it-works steps, booking section copy, testimonials,
gallery/before-after images, brand logos, blog posts (full CRUD), team members, pricing plans,
projects/portfolio, FAQ, contact info, footer, and per-page SEO title/description. Booking,
contact, and newsletter form submissions are stored in Mongo and viewable under **Form
Submissions** in the admin sidebar.

Images are uploaded via Cloudinary (multer → memory buffer → Cloudinary `upload_stream`); the
old image is deleted from Cloudinary automatically when a record's image is replaced or the
record is deleted.

## 6. Fidelity notes — please read

This was built to reuse the original template's CSS/JS **files** as-is (see `client/public/assets`)
and to keep the same section class names so the original selectors still work. A few things are
worth knowing before you treat this as pixel-final:

- **`main.js` re-injection, not re-implementation.** The template's `js/main.js` is an
  unmodified copy of the original file, loaded once as a global script isn't enough in an SPA
  (it only runs once, on first paint). Instead, `client/src/hooks/useLegacyScripts.js`
  re-injects a fresh `<script>` tag for the same file on every route change and after each
  page's API data has rendered, which forces the browser to re-run every GSAP/AOS/WOW/Swiper/etc.
  init in that file against the current DOM. This is a good approximation of "reload the page"
  without an actual reload, but it hasn't been visually verified in a real browser during this
  build — some ScrollTrigger/SplitText timelines that depend on very specific DOM timing may
  need a manual look and small tweaks.
- **Home.jsx is the fully-detailed reference page.** It mirrors `index.html`'s markup closely,
  section by section, with real content swapped for API data. The other 13 pages (About,
  Services, Projects, Team, Pricing, Blog, FAQ, Contact, etc.) follow the same section-class
  conventions and are fully wired to the API and router, but weren't transcribed with the same
  line-by-line density as Home — some decorative elements (background shape overlays, secondary
  animation wrapper `div`s) were simplified. If you want a section pixel-matched, use the
  corresponding block in `Home.jsx` as the template and the original page's HTML (in
  `client/public/assets` is CSS/JS only — see the note below) as the reference.
- **`Home2` (Home Page 02) is a stub.** It fetches its own hero slides but currently reuses no
  other sections — see the comment in `client/src/pages/Home2.jsx`. It's structured so you can
  paste the shared sections in from `Home.jsx`.
- **Original template HTML files aren't included** (only `css/`, `js/`, `img/`, `fonts/`,
  `fontawesome*` were copied into `client/public/assets`, since the HTML itself was rebuilt as
  React). Keep your original `lustre.zip` handy if you want to diff any page's markup exactly.
- **Nested/array admin fields use JSON text areas**, not custom drag-and-drop repeater UIs — for
  example footer columns, social links, and "who we are" feature items are edited as a JSON
  array in a textarea, with the field labeled accordingly. This keeps the admin functional for
  every field without a much larger UI-component build-out; it's a reasonable place to invest
  more time if you want a nicer editing experience for those specific fields.
- **Rich text fields (service/blog body) are raw HTML textareas**, not a WYSIWYG editor. Swap in
  something like TipTap or React-Quill if you want formatting controls in the admin UI itself.

None of these change the data model, the API, or the routing — they're presentation-layer
follow-ups that don't require touching the backend.

## 7. Security / production checklist already in place

- Passwords hashed with bcrypt; JWT auth with expiry; all mutating admin routes require a valid
  token (`protect` middleware), enforced server-side, not just hidden in the UI
- `helmet`, `cors` (env-configurable origin), and rate limiting (global + stricter on public
  form endpoints) on the API
- `express-validator` on public form submissions; Mongoose schema validation everywhere else
- Centralized error handler covering bad ObjectIds, duplicate keys, validation errors, and
  Multer errors, with stack traces stripped in production
- Image upload type/size limits enforced server-side (5MB, image mimetypes only)
- Indexes on slug fields, order fields, and common filter/search fields
- No secrets committed — `.env.example` provided for both `server/` and `client/`
