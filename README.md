# Loco

Simple, modern Next.js app for exploring and sharing "vibes" — events, places, markets, food, music, and more.

---

## Overview

`Loco` is a small web app built with Next.js and TypeScript. It provides a lightweight structure for listing and browsing curated "vibes" (events, places, etc.) and includes a minimal API, a MongoDB-backed data model, and a simple client-side store for UI state.

This README explains the project's purpose, tech stack, and how to run it locally.

## Tech stack

- **Next.js** (App Router) — server and client rendering, file-based routing under the `app/` directory.
- **React** + **TypeScript** — typed UI and components.
- **Node.js** — runtime for the Next server.
- **MongoDB** + **Mongoose** — data persistence. DB connection helper is in `lib/mongodb.ts` and the schema is in `models/Event.ts`.
- **Zustand** — lightweight client global store (`store/globalStore.ts`).
- **Tailwind CSS** + **PostCSS** — utility-first styling (see `postcss.config.mjs` and `globals.css`).
- **lucide-react** — icon components used in the UI.
- **ESLint** — linting with `eslint.config.mjs`.

Dependencies are listed in `package.json` (Next, React, Mongoose, MongoDB client, Zustand, Tailwind, etc.).

## Key files & folders

- `app/` — Next.js App Router pages and layouts.
- `app/api/events/route.ts` — server API route for fetching events.
- `components/` — React components and shared UI.
- `lib/mongodb.ts` — MongoDB connection helper (reads `MONGODB_URI`).
- `models/Event.ts` — Mongoose schema for vibe/event data.
- `store/globalStore.ts` — client-side state store (Zustand).
- `public/` — static assets, including `vibe-selection-vectors/`.

## Getting started (local)

Prerequisites:

- Node.js (recommended 18+)
- A MongoDB connection (Atlas or local)

Steps:

1. Install dependencies

```bash
npm install
```

2. Add environment variables

Create a file named `.env.local` in the project root and set at least:

```env
MONGODB_URI=your_mongodb_connection_string
```

The app uses `MONGODB_URI` (see `lib/mongodb.ts`).

3. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Development notes

- The API route `app/api/events/route.ts` uses `dbConnect()` from `lib/mongodb.ts` and returns all documents from the `Event` model.
- The Mongoose schema is defined in `models/Event.ts` (a compact `vibeSchema` used for events/places/categories).
- Styling uses Tailwind CSS configured through PostCSS. Run the dev server to see hot-reloading of styles.

## How to contribute

- Make small, focused commits and open a pull request.
- Ensure TypeScript types are satisfied and linting passes (`npm run lint`).

## Next steps / ideas

- Add authentication for user-submitted vibes.
- Add CRUD API routes for creating and updating vibes.
- Add tests and CI (unit + integration for API routes).

---

If you'd like, I can also add a `.env.example`, a short CONTRIBUTING guide, or expand the README with screenshots and example API responses. 

