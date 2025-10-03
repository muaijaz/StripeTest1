# CivicFund (StripeTest1)

CivicFund is a Next.js + Stripe Connect reference implementation for political donations inspired by ActBlue. It demonstrates how to combine donor experiences, campaign/PAC onboarding, and administrative oversight with FEC-ready exports.

## Architecture overview

- **Framework**: Next.js 14 App Router with React Server Components, server actions, and NextAuth for authentication.
- **Database**: PostgreSQL accessed through Prisma ORM. Prisma schema models donors, campaigns, PACs, admins, donations, audit logs, and employment info needed for FEC compliance.
- **Authentication**: Email/password credentials handled by NextAuth using the Prisma adapter. Sessions stored in the database.
- **Payments**: Stripe SDK + Stripe Connect. Server actions encapsulate PaymentIntent creation, donor customer creation, and Express account onboarding for candidates/PACs.
- **State management**: Minimal client state using React hooks; React Query provider included for data fetching patterns.
- **Styling**: Tailwind CSS utility classes with a small set of global components.

## Key flows

1. **Donor discovery** – Landing page showcases featured candidates/PACs with donation CTAs. Logged-in donors will be able to re-use saved payment methods (Stripe Customer IDs) for one-click donations.
2. **Donation processing** – `createPaymentIntent` server action prepares a PaymentIntent configured for Connect transfers (application fee, on_behalf_of, transfer_data). Stripe Elements or Payment Links should confirm the PaymentIntent client-side.
3. **Candidate/PAC applications** – Registration form submits to `applyForAccount`, logging an audit entry and creating a draft Stripe Express account ready for onboarding links.
4. **Dashboards** – Separate donor, candidate, and admin dashboards display mock analytics and provide CSV export links. Replace mock data with database/Stripe queries for production.
5. **Exports** – `/api/export/*` routes generate CSV output following the minimal FECFile column requirements using data from Prisma.

## Stripe integration notes

- **Connect accounts**: Candidates and PACs receive Express accounts created in `applyForAccount`. Store `stripeAccountId` after onboarding completes to route funds and show payout status.
- **Fees**: Application fee percent configurable through `STRIPE_APPLICATION_FEE_PERCENT`. PaymentIntent server action calculates platform fee and sets `transfer_data.destination` for automatic payouts.
- **Webhooks**: Configure a webhook endpoint (e.g., `/api/webhooks/stripe`) to reconcile charges, payouts, and account updates. Not implemented here; add verification using `STRIPE_CONNECT_WEBHOOK_SECRET`.
- **Saved payment methods**: `getOrCreateDonorProfile` generates Stripe Customers for logged-in donors, enabling SetupIntents for card vaulting and recurring donations.

## FEC compliance considerations

- Capture employer and occupation for donors over $200 via `EmploymentInfo` relation.
- Respect federal + state contribution limits by implementing guardrails before confirming PaymentIntents.
- Store address, phone, and donor attestations for compliance reporting.
- `generateFecCsv` shows how to format exports for ingestion into FECFile. Extend headers and memo fields to match the exact form (e.g., SA11A, SA17).

## Limitations and TODOs

- No real database migrations have been run; execute `npx prisma migrate dev` after configuring `DATABASE_URL`.
- Stripe calls require valid API keys; use Stripe CLI or mocked responses during development.
- Authentication uses credential provider only. Add password hashing on sign-up flow and MFA for admins.
- Dashboards display mocked metrics; connect to live Stripe data (Balance transactions, Charges) and analytics queries.
- CSV exports pull the latest 25 donations; expand for pagination or S3 archival.
- Missing webhook/event ingestion for payouts, disputes, chargebacks, and Connect account status updates.
- Admin approval workflow is not fully implemented—add status transitions and notifications via email/Slack.
- Client-side donation component is simplified; integrate Stripe Elements for PCI compliance.

## Running locally

```bash
cp .env.example .env
# fill in Stripe + database credentials
pnpm install # or npm install
npx prisma generate
npm run dev
```

Open `http://localhost:3000` to explore the landing page and dashboards.

## Project structure

```
src/
  app/
    (auth)/               // Login + registration routes
    (dashboard)/          // Donor, candidate, admin dashboards
    api/                  // Next.js route handlers (auth + exports)
  components/             // UI modules for cards, dashboards, forms
  lib/                    // Shared utilities (formatting, etc.)
  server/                 // Server-only code (Prisma, Stripe, actions)
prisma/                   // Prisma schema
```

## Next steps for production

1. Implement admin review queue to approve applications, capture Stripe onboarding link, and set `applicationStatus`.
2. Build donor sign-up with password hashing (`bcryptjs.hash`) and email verification.
3. Replace mock dashboard data with Prisma queries, add charts via a visualization library, and sync with Stripe Balance API.
4. Add scheduled compliance checks to enforce contribution limits and flag suspicious activity.
5. Integrate background jobs (e.g., BullMQ) for heavy exports and FEC filing automation.
6. Harden security (role-based access control, logging, SOC2 controls, rate limiting).
7. Deploy with Vercel (frontend) + managed PostgreSQL + Stripe webhooks behind secure endpoints.
