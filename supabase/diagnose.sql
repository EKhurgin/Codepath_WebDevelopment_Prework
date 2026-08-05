-- ============================================================
-- Creatorverse — diagnose an empty roster
-- Run this whole file in: Supabase -> SQL Editor -> New query
-- ============================================================

-- 1. Does the table exist, and is RLS on?
--    rls_enabled must be FALSE for the anon key to read rows.
select
  schemaname,
  tablename,
  rowsecurity as rls_enabled
from pg_tables
where tablename = 'creators';

-- 2. How many rows are actually in there?
select count(*) as row_count from public.creators;

-- 3. What does the data look like?
select id, name, url from public.creators order by id;
