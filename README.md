# AMANATT (React + Vite + Supabase)

## 1) Connect this app to your Supabase project

1. In Supabase dashboard, open **Project Settings → API**.
2. Copy:
   - **Project URL**
   - **anon public key**
3. In this repo, create `.env` from `.env.example` and fill values:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

4. Start the app:

```bash
npm run dev
```

---

## 2) Create the database tables

This project includes a starter schema at:

- `supabase/schema.sql`

In Supabase:

1. Open **SQL Editor**
2. Paste `supabase/schema.sql`
3. Run it

It creates the tables used by the UI, including:

- `profiles`
- `projects`
- `faq_items`
- `investments`
- `transactions`
- `notifications`
- `portfolio_entries`
- `kyc_submissions`
- `contact_submissions`
- `investment_applications`
- `support_tickets`

It also enables basic Row Level Security (RLS) policies.

---

## 3) Important auth + profiles step

Because `profiles.id` references `auth.users(id)`, every app user should have a profile row.

Recommended approach:
- Add a DB trigger/function in Supabase that inserts a profile row when a new `auth.users` record is created.

(If you want, I can add that SQL trigger in the next step.)

---

## 4) Verify table connection quickly

After running schema and adding `.env`, test in app flows:

- Home/projects pages should read from `projects`.
- FAQ page should read from `faq_items`.
- Contact form should insert into `contact_submissions`.
- Apply form should insert into `investment_applications`.
- Signed-in user portal should read/write user-scoped tables (`investments`, `transactions`, `kyc_submissions`, etc.).

---

## 5) Notes

- `src/lib/supabase.ts` now reads credentials from env vars and throws a clear error if missing.
- Never commit private Supabase keys. Frontend should use only anon public key.
