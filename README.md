# Loco

Loco is a location and vibe discovery app built with the modern Next.js App Router stack. The current product flow is centered around onboarding: users pick the kinds of experiences they care about, those preferences are stored in client state, and the homepage adapts based on those selections.

This README focuses on the tech stack used in the project and how each piece is applied inside the codebase.

## Project Goal

The app is designed to help users discover things to do around them, including:

- events
- places
- markets
- food
- music
- art and culture
- outdoor experiences
- nightlife

The current implementation already includes:

- a welcome screen
- a vibe-selection onboarding page
- a personalized homepage entry flow
- a MongoDB-backed API route for fetching event data

## Core Tech Stack

### 1. Next.js 16

The application is built on **Next.js 16** and uses the **App Router** architecture.

Why it matters in this project:

- routes are created from the `app/` directory
- UI pages and API endpoints live in the same framework
- the project is set up for server-rendered and client-rendered React flows
- file-based routing keeps the structure simple for a small product

Where it shows up:

- `app/page.tsx` powers the main entry route
- `app/vibes-selection/page.tsx` handles onboarding preferences
- `app/api/events/route.ts` exposes backend data through a route handler
- `app/layout.tsx` defines the root layout shared across screens

### 2. React 19

Loco uses **React 19** for the UI layer.

How React is used here:

- interactive pages are marked with `"use client"`
- onboarding interactions use React state with `useState`
- components are split into focused units like `WelcomeScreen`, `Homepage`, and `BottomNavBar`
- conditional rendering determines whether a user sees onboarding or the personalized homepage

Examples in the codebase:

- `app/page.tsx` checks stored user preferences and switches between screens
- `app/vibes-selection/page.tsx` manages category selection interactions

### 3. TypeScript 5

The codebase uses **TypeScript** for safer development and better editor support.

Benefits in this project:

- improved type safety for components and route logic
- better autocomplete and refactoring support
- smoother scaling as the app grows beyond the current onboarding flow

Configuration notes:

- `tsconfig.json` enables `strict` mode
- path aliases are configured so `@/*` maps to the project root
- the project uses modern `moduleResolution: "bundler"` for compatibility with the current Next.js toolchain

## Frontend Stack

### 4. Tailwind CSS 4

Styling is powered primarily by **Tailwind CSS 4**.

Why it fits this project:

- rapid UI iteration for landing and onboarding screens
- utility-first classes keep styling close to the JSX
- responsive layout work is straightforward

Where it is configured:

- `postcss.config.mjs` loads `@tailwindcss/postcss`
- `app/globals.css` imports Tailwind with `@import "tailwindcss";`

How it is used:

- flexbox and grid layouts for onboarding and homepage sections
- spacing, typography, borders, and colors directly inside components
- responsive sizing such as width constraints for welcome screen content

### 5. Custom CSS

In addition to Tailwind, the project uses **custom CSS files** for page-specific styling.

Why both are used:

- Tailwind handles most layout and utility styling
- dedicated CSS files can hold more isolated or page-specific rules

Example:

- `app/vibes-selection/vibe-selection.css`

### 6. Fonts with `next/font`

The app uses **`next/font/google`** to load typography in a framework-optimized way.

Fonts currently referenced:

- Geist
- Geist Mono
- Nunito

Why this matters:

- better performance than manual font loading alone
- font configuration lives close to the root layout
- typography is easier to standardize across the app

Main usage:

- `app/layout.tsx` imports and configures the fonts
- `app/globals.css` applies `Nunito` via a CSS variable for the main body text

## State Management

### 7. Zustand

Client-side state is managed with **Zustand**.

Why Zustand is a good fit here:

- very lightweight compared to larger state libraries
- simple store setup for early-stage product flows
- easy sharing of onboarding preferences between pages and components

Current implementation:

- `app/store/globalStore.ts` defines `usePreferenceStore`
- the store holds `preferenceStore`
- selected onboarding categories are saved through `setPreferenceStore`

How the store is used:

- `app/vibes-selection/page.tsx` writes selected vibe categories
- `app/page.tsx` reads them to decide which screen to render
- `app/layout.tsx` uses the same state to decide whether to show the bottom navigation

## Backend and Data Layer

### 8. Next.js Route Handlers

Backend logic currently lives inside **Next.js route handlers**.

Why this is useful:

- frontend and backend can live in one codebase
- no need for a separate Express or Node API server
- ideal for lightweight CRUD or content-serving endpoints

Current endpoint:

- `app/api/events/route.ts`

What it does:

- connects to the database
- fetches event records using a Mongoose model
- returns JSON through `NextResponse`

### 9. MongoDB

The project uses **MongoDB** as its database.

Why MongoDB makes sense here:

- flexible schema design for places, events, and lifestyle content
- easy iteration while the product model is still evolving
- good fit for content objects like events, categories, and location metadata

Environment requirement:

- `MONGODB_URI` must be defined in `.env.local`

### 10. Mongoose

The MongoDB integration is handled with **Mongoose**.

Why Mongoose is being used:

- schema-based modeling on top of MongoDB
- cleaner database access from application code
- easier control over validation and document structure

Where it appears:

- `lib/mongodb.ts` manages and caches the database connection
- `models/Event.ts` defines the schema used for event-style content
- `app/api/events/route.ts` queries the model with `Event.find()`

Important architectural detail:

- the connection logic caches the Mongoose connection on `global` to avoid opening unnecessary new connections during development and hot reloads

### 11. Native MongoDB Driver

The project also includes the **official MongoDB Node.js driver** as a dependency.

Why that matters:

- it gives the codebase flexibility if lower-level database access is needed later
- right now, the main persistence flow is centered on Mongoose rather than the raw driver

## Tooling and Developer Experience

### 12. ESLint 9

Linting is handled by **ESLint 9** with Next.js presets.

Why it matters:

- keeps the codebase consistent
- catches common React and TypeScript mistakes
- aligns the project with Next.js best practices

Configuration:

- `eslint.config.mjs`
- uses `eslint-config-next/core-web-vitals`
- uses `eslint-config-next/typescript`

### 13. npm-Based Workflow

The project currently uses the standard npm scripts:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

What each script does:

- `dev` starts the local development server
- `build` creates a production build
- `start` runs the production server
- `lint` checks code quality with ESLint

## Current Architecture at a Glance

The codebase is organized around the Next.js App Router:

```text
app/
  api/
    events/
      route.ts         -> API route for event data
  components/         -> reusable UI pieces
  store/              -> Zustand global store
  vibes-selection/    -> onboarding screen and styles
  globals.css         -> app-wide styles
  layout.tsx          -> root layout
  page.tsx            -> main entry page

lib/
  mongodb.ts          -> database connection helper

models/
  Event.ts            -> Mongoose schema/model layer

public/
  ...                 -> static images and UI assets
```

## How the Stack Works Together

Here is the practical flow of the current app:

1. A user lands on the homepage.
2. React and Zustand check whether onboarding preferences already exist.
3. If no preferences exist, the user is shown the welcome and vibe-selection flow.
4. Selected preferences are stored in the Zustand global store.
5. The UI switches to the homepage experience once preferences are available.
6. Event data can be served through the Next.js API route backed by MongoDB and Mongoose.

This combination makes the app:

- fast to iterate on
- simple to maintain in one repository
- ready to grow into a fuller location discovery platform

## Why This Stack Fits Loco

This stack is well suited to the current phase of the project because it balances speed, flexibility, and room to scale:

- **Next.js** provides a full-stack React framework in one codebase
- **React** makes the onboarding and UI flows interactive
- **TypeScript** adds safety as the app grows
- **Tailwind CSS** speeds up interface development
- **Zustand** keeps state sharing simple
- **MongoDB + Mongoose** support flexible content-driven data models
- **ESLint** helps keep the codebase healthy

## Setup Notes

To run the project locally:

1. install dependencies
2. create a `.env.local` file with `MONGODB_URI`
3. start the dev server with `npm run dev`

Example environment variable:

```env
MONGODB_URI=your_mongodb_connection_string
```

Then open:

```text
http://localhost:3000
```

## Future Stack Growth

Based on the current structure, this project is well positioned to add:

- authentication
- persistent user profiles
- saved places and events
- search and filtering
- recommendation logic
- map integrations
- deployment and observability tooling

The current foundation is modern, lightweight, and appropriate for building those next layers without a major rewrite.
