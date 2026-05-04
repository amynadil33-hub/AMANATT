-- Run this in Supabase SQL Editor
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique,
  phone text,
  role text default 'customer' check (role in ('customer', 'admin')),
  membership_tier text default 'Silver',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  category text,
  location text,
  status text default 'upcoming',
  image_url text,
  minimum_investment numeric,
  funding_goal numeric,
  funded_amount numeric default 0,
  expected_return numeric,
  profit_share text,
  duration text,
  description text,
  created_at timestamptz default now()
);

create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists public.investments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  amount numeric not null,
  expected_return numeric,
  status text default 'active',
  invested_at timestamptz default now(),
  created_at timestamptz default now()
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  amount numeric not null,
  status text default 'completed',
  reference text,
  created_at timestamptz default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text not null,
  read_status boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.portfolio_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  current_value numeric,
  return_to_date numeric,
  allocation_percent numeric,
  created_at timestamptz default now()
);

create table if not exists public.kyc_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text default 'draft',
  step_data jsonb default '{}'::jsonb,
  submitted_at timestamptz,
  reviewed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists public.investment_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  investment_interest text,
  message text,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  subject text not null,
  message text not null,
  status text default 'open',
  created_at timestamptz default now()
);

-- RLS
alter table public.profiles enable row level security;
alter table public.investments enable row level security;
alter table public.transactions enable row level security;
alter table public.notifications enable row level security;
alter table public.portfolio_entries enable row level security;
alter table public.kyc_submissions enable row level security;
alter table public.support_tickets enable row level security;

create policy "users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "users update own profile" on public.profiles for update using (auth.uid() = id);

create policy "users read own investments" on public.investments for select using (auth.uid() = user_id);
create policy "users read own transactions" on public.transactions for select using (auth.uid() = user_id);
create policy "users read own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "users update own notifications" on public.notifications for update using (auth.uid() = user_id);
create policy "users read own portfolio" on public.portfolio_entries for select using (auth.uid() = user_id);
create policy "users read own kyc" on public.kyc_submissions for select using (auth.uid() = user_id);
create policy "users insert own kyc" on public.kyc_submissions for insert with check (auth.uid() = user_id);
create policy "users update own kyc" on public.kyc_submissions for update using (auth.uid() = user_id);
create policy "users read own tickets" on public.support_tickets for select using (auth.uid() = user_id);
create policy "users insert own tickets" on public.support_tickets for insert with check (auth.uid() = user_id);

-- public read tables
alter table public.projects enable row level security;
alter table public.faq_items enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.investment_applications enable row level security;

create policy "public read projects" on public.projects for select using (true);
create policy "public read faq" on public.faq_items for select using (true);
create policy "public insert contact" on public.contact_submissions for insert with check (true);
create policy "public insert applications" on public.investment_applications for insert with check (true);
