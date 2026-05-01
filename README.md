# Trellis Money

A full-stack personal finance platform that aggregates bank accounts and investments, tracks net worth over time, and projects future financial health — all in one dashboard.

---

## Screenshots

### Landing Page
<img width="1507" height="855" alt="Screenshot 2026-01-10 at 6 21 30 PM" src="https://github.com/user-attachments/assets/406e2a6e-7950-4b71-98cb-db4986265159" />

### Dashboard
<img width="1512" height="859" alt="Screenshot 2026-01-21 at 5 45 11 PM" src="https://github.com/user-attachments/assets/3e2ba499-e44f-46d5-9587-bdcb851a59f5" />
<img width="1512" height="856" alt="Screenshot 2026-01-21 at 5 49 38 PM" src="https://github.com/user-attachments/assets/dbba92a4-ce43-4b9a-a2ca-5199af8f2efa" />

### Dashboard (Dark Mode)
<img width="1506" height="825" alt="Screenshot 2026-01-31 at 12 24 12 PM" src="https://github.com/user-attachments/assets/fa45904c-3fce-45d0-a03d-8ed58db43502" />
<img width="1506" height="824" alt="Screenshot 2026-01-31 at 12 32 10 PM" src="https://github.com/user-attachments/assets/b6ed8abc-bfc3-4c4e-b2c5-d2ef9d307d99" />

### Add Multiple Members
<img width="1512" height="855" alt="Screenshot 2026-01-07 at 8 37 12 PM" src="https://github.com/user-attachments/assets/ecfc0fb0-6d59-4533-ad94-6750331a0ad0" />

### Sign In Page
<img width="1511" alt="Screenshot 2025-06-09 at 7 53 02 PM" src="https://github.com/user-attachments/assets/f3376d73-e44d-4c53-a47d-9b9b380e95cf" />

### Subscription (Stripe Integration)
<img width="3024" height="1964" alt="Screenshot 2026-01-10 at 6 28 05 PM" src="https://github.com/user-attachments/assets/6a209c72-9173-4207-be4c-a0c7d4cc56bc" />
<img width="1508" alt="Screenshot 2025-06-09 at 7 58 50 PM" src="https://github.com/user-attachments/assets/3641699e-664f-471d-acb9-e495d9e277ed" />
<img width="1512" height="820" alt="Screenshot 2026-01-10 at 6 18 52 PM" src="https://github.com/user-attachments/assets/6a61ceee-73e5-43ed-993e-d393505b1a1b" />

### Add Connection (Plaid Integration)
<img width="1512" height="828" alt="Screenshot 2026-01-31 at 11 56 35 AM" src="https://github.com/user-attachments/assets/85523d36-036f-4aa4-a024-cf6b1ad0cfed" />

### Entity-Relationship Diagram
<img width="1791" height="2112" alt="trellis-money-schema (4)" src="https://github.com/user-attachments/assets/5dcf7e24-b70d-4629-a45a-08fe53d523c0" />

---

## Features

- **Bank & Investment Aggregation** — Connect any financial institution via Plaid Link; accounts, holdings, and securities sync automatically.
- **Net Worth Tracking** — Historical net worth chart built with Visx/D3 so users can see how their wealth has changed over time.
- **Projected Net Worth & Financial Assets** — Algorithm-driven projections that compound existing holdings forward to show estimated future wealth.
- **Cash Flow Analysis** — Visualize income vs. expenses across all linked accounts.
- **Investment Holdings** — Breakdown of every security, quantity, current price, and gain/loss per position.
- **Key Statistics** — Summary cards for total assets, liabilities, investment value, and more.
- **Household / Multi-Member Support** — Invite additional household members so a family can see a unified financial picture.
- **Subscription Tiers (Stripe)** — Free and paid plans managed through Stripe Checkout and webhooks; subscription state is synced to the database in real time.
- **Dark Mode** — Full light/dark theme powered by `next-themes`.
- **Admin Panel** — Internal admin routes for user and plan management.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, shadcn/ui, Radix UI |
| Animation | Framer Motion |
| Charts | Visx (D3-backed) |
| Auth | Supabase Auth |
| Database | PostgreSQL (AWS RDS) |
| ORM | Drizzle ORM |
| Migrations | Drizzle Kit |
| Bank Data | Plaid |
| Payments | Stripe |
| Image CDN | Cloudinary |
| State Management | Zustand, TanStack Query |
| Forms | React Hook Form + Zod |
| Testing | Jest, React Testing Library, Cypress |
| Component Docs | Storybook |
| Analytics | Vercel Analytics, Vercel Speed Insights |
| Deployment | Vercel |

---

## Project Structure

```
├── app/                    # Next.js App Router (pages, layouts, API routes)
│   ├── (auth)/             # Auth group — sign in, sign up, password reset
│   ├── (marketing)/        # Public marketing/landing pages
│   ├── (admin)/            # Internal admin panel
│   └── api/                # API route handlers (Plaid, Stripe webhooks, etc.)
├── components/             # Shared UI components
├── features/               # Feature-scoped logic (accounts, dashboard, net-worth, …)
├── drizzle/
│   ├── schema/             # Drizzle table definitions (users, accounts, holdings, …)
│   ├── migrations/         # Auto-generated SQL migration files
│   ├── seed.ts             # Database seeding script
│   └── migrate.ts          # Migration runner
├── services/               # External API integrations (Plaid, Stripe, Supabase)
├── hooks/                  # Custom React hooks
├── stores/                 # Zustand stores
├── lib/                    # Shared utilities and config
├── context/                # React context providers
├── types/                  # Global TypeScript types
├── utils/                  # Pure utility functions
├── scripts/                # One-off scripts (e.g. Stripe product sync)
├── stories/                # Storybook stories
└── cypress/                # End-to-end tests
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- PostgreSQL database (local or AWS RDS)
- Plaid developer account
- Stripe account
- Supabase project

### Installation

```bash
git clone [https://github.com/your-username/trellis-money.git](https://github.com/emiliorivera747/trellis-money-aws-postregres.git)
cd trellis-money-aws-postregres
pnpm install
```

### Environment Variables

Create a `.env.local` file at the project root:

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Plaid
PLAID_CLIENT_ID=your-client-id
PLAID_SECRET=your-secret
PLAID_ENV=sandbox   # sandbox | development | production

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup

```bash
# Generate and run migrations
pnpm db:generate
pnpm db:migrate

# (Optional) Seed the database with sample data
pnpm db:seed

# (Optional) Sync Stripe products and prices to the database
pnpm sync:stripe
```

### Running Locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the Next.js development server |
| `pnpm build` | Production build |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format all files with Prettier |
| `pnpm check-types` | TypeScript type check (no emit) |
| `pnpm test` | Run Jest unit tests |
| `pnpm test:watch` | Jest in watch mode |
| `pnpm cypress:open` | Open Cypress test runner |
| `pnpm storybook` | Start Storybook on port 6006 |
| `pnpm db:generate` | Generate Drizzle migration files |
| `pnpm db:migrate` | Apply pending migrations |
| `pnpm db:seed` | Seed the database |
| `pnpm sync:stripe` | Sync Stripe products/prices to the DB |

---

## Architecture Highlights

### Plaid Integration
The app connects to Plaid in sandbox, development, and production modes. A Plaid Link session creates an `item` in the database; subsequent webhook events trigger account, balance, holding, and security syncs. All sync functions are optimized to run in O(1) database round-trips using batch transactions.

### Stripe Subscriptions
Stripe Checkout handles plan purchases. Webhook handlers (idempotent, transaction-wrapped) keep the local `subscription` and `user` tables in sync with Stripe state — covering creation, updates, cancellations, and renewals.

### Financial Projections
A custom projection engine compounds existing investment holdings forward year-by-year using expected annual return rates. Data is pre-computed outside of loops and cached, giving O((accounts × holdings) + (data × years)) complexity instead of the naive triple-nested approach.

### Performance
Key optimizations shipped to production:

- Replaced `findMany` table scans with `findUnique` index lookups — **~95% faster** per query
- Batched N+1 database loops into single `$transaction` calls — **~90% fewer** DB round-trips
- Parallelized independent async operations with `Promise.all` — **~70% faster** data sync
- Converted O(n²) user-sync loops to O(n) Set-based lookups — **~95% faster** for large datasets

See [PERFORMANCE_OPTIMIZATIONS.md](PERFORMANCE_OPTIMIZATIONS.md) for the full breakdown.

---

## Testing

```bash
# Unit and integration tests
pnpm test

# End-to-end tests (requires dev server running)
pnpm cypress:open

# Component isolation
pnpm storybook
```

---

## Deployment

The app is configured for Vercel deployment out of the box (`vercel.json`). The Dockerfile is included for self-hosted or containerized deployments.

1. Push to your GitHub repository.
2. Import the project in Vercel and set all environment variables from the `.env.local` template above.
3. Vercel will automatically build and deploy on every push to `main`.

For the database, point `DATABASE_URL` to your AWS RDS PostgreSQL instance and run `pnpm db:migrate` as part of your CI/CD pipeline or manually before the first deploy.
