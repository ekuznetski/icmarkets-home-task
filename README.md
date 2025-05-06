# Cryptocurrency Portfolio Tracker

A modern, interactive cryptocurrency portfolio tracker built with Next.js, React, and TypeScript. The application allows users to browse a list of cryptocurrencies, view detailed information, and manage a personal portfolio. The project emphasizes clean architecture, SSR/CSR, state persistence.

---

## Features

- **Cryptocurrency List Page (SSR):**

  - Displays a list of cryptocurrencies with prices, market cap, and 24h performance.
  - Search by name or symbol, sort and filter by various metrics.
  - Server-side rendering for fast initial load and SEO.
  - Loading and error states.

- **Cryptocurrency Detail Page (CSR):**

  - Shows detailed information about a selected cryptocurrency.
  - Client-side rendering for smooth interactivity.
  - "Add to Portfolio" and "Remove from Portfolio" button with instant feedback and transitions.

- **Portfolio Page:**

  - Displays all coins added to the user's portfolio.
  - Shows key stats and allows removing coins.
  - State is persisted across sessions (localStorage).

- **UI/UX:**

  - Built with Tailwind CSS and Shadcn.
  - Dark mode support.
  - Accessible and mobile-friendly.

- **State Management & Data Fetching:**

  - **Redux Toolkit** for global state (portfolio, UI state).
  - **redux-persist** for state persistence.
  - **@tanstack/react-query** for efficient API data fetching, caching, and hydration.

- **API:**

  - Uses [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data.

- **Testing & Code Quality:**
  - Unit tests with Jest and React Testing Library.
  - ESLint and Prettier for code consistency.

---

## Project Structure

```
src/
  app/                # Next.js app directory (routing, pages)
    portfolio/        # Portfolio page (SSR)
    symbolDetails/[id]/ # Cryptocurrency detail page (CSR)
    ...
  components/         # Reusable UI and core components
    core/             # Main feature components (tables, details, etc.)
    shared/           # Shared UI elements (loader, error, addToPortfolio)
    ui/               # UI primitives (button, card, input, etc.)
  domain/types/       # TypeScript types
  hooks/              # Custom React hooks (data, actions)
  store/              # Redux Toolkit slices, store, hooks
  utils/              # API requests, helpers
  lib/                # Query client, constants
public/               # Static assets
```

---

## Getting Started

### 1. Install dependencies

```bash
pnpm install
# or
yarn install
# or
npm install
```

### 2. Run the development server

```bash
pnpm dev
# or
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
pnpm build
pnpm start
```

---

## Available Commands

- `pnpm dev` — Start development server
- `pnpm build` — Build for production
- `pnpm start` — Start production server
- `pnpm lint` — Run ESLint
- `pnpm lint:fix` — Fix lint errors
- `pnpm format` — Format code with Prettier
- `pnpm format:check` — Check code formatting
- `pnpm test` — Run unit tests
- `pnpm test:watch` — Watch mode for tests
- `pnpm test:coverage` — Test coverage report

---

## Main Technologies Used

- **Next.js** (App Router, SSR/CSR, dynamic imports)
- **React 19** (functional components, hooks)
- **TypeScript** (strict typing)
- **Tailwind CSS** (utility-first styling)
- **Redux Toolkit** (global state management)
- **redux-persist** (state persistence)
- **@tanstack/react-query** (data fetching, caching, hydration)
- **Jest** & **React Testing Library** (unit testing)
- **ESLint** & **Prettier** (linting & formatting)
- **CoinGecko API** (cryptocurrency data)

---

## Architecture & Implementation Details

- **SSR/CSR:**

  - Cryptocurrency list and portfolio pages use SSR for fast load and SEO.
  - Cryptocurrency detail page uses CSR for interactivity.
  - React Query hydration is used for seamless data transfer between server and client.

- **State Management:**

  - Portfolio and UI state (sorting, etc.) are managed via Redux Toolkit.
  - State is persisted in localStorage using redux-persist.

- **Data Fetching:**

  - All cryptocurrency data is fetched from CoinGecko API using React Query.
  - Query caching, background updates, and error handling are built-in.

- **UI/UX:**

  - Tailwind CSS for all styling.
  - Responsive design, dark mode, accessible components.
  - Dynamic imports and skeleton loaders for smooth UX.

- **Testing:**
  - Unit tests for key components (see `src/components/core/__tests__`).

---

## API Reference

- **CoinGecko API**
  - List: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`
  - Details: `https://api.coingecko.com/api/v3/coins/{id}`

---

## Deployment

Deployed to `https://icmarkets-home-task.vercel.app/`
