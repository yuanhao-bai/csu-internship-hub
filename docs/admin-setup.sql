-- Supabase setup for the CSU Internship Hub admin console.
-- Run this in Supabase SQL Editor after enabling Auth email login.
-- Replace YOUR_AUTH_USER_UUID with Da Bai's real auth.users.id after the admin account signs in once.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  grade text,
  major text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz
);

create table if not exists public.login_events (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users(id) on delete set null,
  email text,
  event_type text not null default 'login',
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.profiles enable row level security;
alter table public.login_events enable row level security;

create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = uid
  );
$$;

drop policy if exists "admins can view admin users" on public.admin_users;
create policy "admins can view admin users"
  on public.admin_users for select
  using (public.is_admin(auth.uid()));

drop policy if exists "admins can view profiles" on public.profiles;
create policy "admins can view profiles"
  on public.profiles for select
  using (public.is_admin(auth.uid()));

drop policy if exists "users can view own profile" on public.profiles;
create policy "users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "users can create own profile" on public.profiles;
create policy "users can create own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "admins can view login events" on public.login_events;
create policy "admins can view login events"
  on public.login_events for select
  using (public.is_admin(auth.uid()));

drop policy if exists "signed in users can write own login events" on public.login_events;
create policy "signed in users can write own login events"
  on public.login_events for insert
  with check (auth.uid() = user_id);

-- Optional: if your posts table already exists, keep the table and only apply this admin read policy.
-- Adjust policy names if your project already has different post policies.
alter table public.posts enable row level security;

drop policy if exists "admins can view all posts" on public.posts;
create policy "admins can view all posts"
  on public.posts for select
  using (public.is_admin(auth.uid()));

-- After Da Bai signs in once, run this with the actual user id from Supabase Auth -> Users:
-- insert into public.admin_users (user_id) values ('YOUR_AUTH_USER_UUID') on conflict do nothing;
