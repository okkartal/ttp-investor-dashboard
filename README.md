# 💹 TTP Investor Dashboard

A full-stack tokenization platform dashboard for investors. Built for the TTP Full Stack Developer Evaluation.

## 🛠️ Tech Stack

- **Frontend**: Next.js(App Router), React, TailwindCSS
- **Backend**: Next.js API Routes (via Server Actions)
- **Database**: Supabase (PostgreSQL)
- **AI Tools Used**:
  - [ChatGPT-4](https://chat.openai.com/)

## 📸 Features

- 🔐 Static Login Page (real auth)
- 📊 Dashboard displaying:
  - Total Invested Amount
  - Portfolio Value
  - Distributions Received
  - Outstanding Commitments
- 📋 Investment Table:
  - Project Name, Token Class, ROI%, etc.
  - Sortable by ROI % and Distribution Date
- 💸 "Simulate Payout" button:
  - Updates Supabase in real-time using Server Actions
- ✅ Clean UI with Tailwind

## 📦 Supabase Schema

### `investor_summary`

| Column                  | Type     |
|-------------------------|----------|
| investor_id (PK)       | uuid     |
| total_invested_amount  | numeric  |
| portfolio_value        | numeric  |
| distributions_received | numeric  |
| outstanding_commitments| numeric  |

### `investments`

| Column                 | Type    |
|------------------------|---------|
| id (PK)                | uuid    |
| investor_id            | uuid    |
| project_name           | text    |
| token_class            | text    |
| shares_owned           | integer |
| market_value           | numeric |
| roi_percent            | numeric |
| next_distribution_date | date    |
| created_at             | timestamp |

## 🚀 Getting Started

1. **Clone Repo**
```bash
git clone https://github.com/okkartal/ttp-investor-dashboard.git
cd ttp-investor-dashboard



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
