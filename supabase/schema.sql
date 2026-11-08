-- GRANDCLIPS accounts: run this once in Supabase > SQL Editor > New query.
-- Profiles (random username + avatar seed) and favorites, locked down with row-level security.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null check (username ~ '^[A-Za-z_]{3,20}$'),
  avatar_seed text not null check (char_length(avatar_seed) between 4 and 40),
  created_at timestamptz not null default now()
);
-- Usernames are unique regardless of capitals: NeonHustler and neonhustler can't both exist.
create unique index if not exists profiles_username_unique on public.profiles (lower(username));

alter table public.profiles enable row level security;
drop policy if exists "Profiles are public" on public.profiles;
create policy "Profiles are public" on public.profiles for select using (true);
drop policy if exists "Create your own profile" on public.profiles;
create policy "Create your own profile" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
drop policy if exists "Edit your own profile" on public.profiles;
create policy "Edit your own profile" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create table if not exists public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  item_id text not null check (char_length(item_id) <= 200),
  item jsonb,
  created_at timestamptz not null default now(),
  primary key (user_id, item_id)
);
create index if not exists favorites_item_created on public.favorites (item_id, created_at);

alter table public.favorites enable row level security;
drop policy if exists "See your own favorites" on public.favorites;
create policy "See your own favorites" on public.favorites for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Add your own favorites" on public.favorites;
create policy "Add your own favorites" on public.favorites for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "Update your own favorites" on public.favorites;
create policy "Update your own favorites" on public.favorites for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "Remove your own favorites" on public.favorites;
create policy "Remove your own favorites" on public.favorites for delete to authenticated using ((select auth.uid()) = user_id);

-- "Delete profile": removes the signed-in user's login. Their profile and favorites go with it (on delete cascade).
create or replace function public.delete_me()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from auth.users where id = auth.uid();
$$;
revoke all on function public.delete_me() from public, anon;
grant execute on function public.delete_me() to authenticated;
