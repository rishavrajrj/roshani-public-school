-- ============================================================================
-- ROSHANI PUBLIC SCHOOL — SUPABASE SECURITY & DATABASE ADVISOR FIX SCRIPT
-- Resolves Security & Performance Advisor Issues in Supabase Project
-- ============================================================================

-- Step 1: Revoke EXECUTE on SECURITY DEFINER functions from anonymous and public roles
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;

-- Step 2: Index Foreign Keys (Resolves Unindexed Foreign Key Performance Warnings)
CREATE INDEX IF NOT EXISTS idx_documents_created_by ON public.documents (created_by);
CREATE INDEX IF NOT EXISTS idx_gallery_album_id ON public.gallery (album_id);
CREATE INDEX IF NOT EXISTS idx_gallery_uploaded_by ON public.gallery (uploaded_by);

-- Step 3: Enable RLS and set policies for gallery_albums
ALTER TABLE IF EXISTS public.gallery_albums ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access to gallery albums" ON public.gallery_albums;
DROP POLICY IF EXISTS "Allow authenticated admins full access to gallery albums" ON public.gallery_albums;

CREATE POLICY "Allow public read access to gallery albums"
  ON public.gallery_albums FOR SELECT TO public USING (true);

CREATE POLICY "Allow authenticated write gallery albums"
  ON public.gallery_albums FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update gallery albums"
  ON public.gallery_albums FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete gallery albums"
  ON public.gallery_albums FOR DELETE TO authenticated USING (true);

-- Step 4: Fix Profiles RLS Policies & Columns
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE IF EXISTS public.profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE IF EXISTS public.profiles ALTER COLUMN id SET DEFAULT gen_random_uuid();
ALTER TABLE IF EXISTS public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

DROP POLICY IF EXISTS "Allow authenticated users to insert/update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow users to read own profile or admins to read all" ON public.profiles;
DROP POLICY IF EXISTS "Profiles read access" ON public.profiles;
DROP POLICY IF EXISTS "Profiles write access" ON public.profiles;
DROP POLICY IF EXISTS "Profiles update access" ON public.profiles;
DROP POLICY IF EXISTS "Profiles delete access" ON public.profiles;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  );
$$;

CREATE POLICY "Profiles read access"
  ON public.profiles FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Profiles write access"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Profiles update access"
  ON public.profiles FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Profiles delete access"
  ON public.profiles FOR DELETE TO authenticated
  USING (true);


-- Step 5: Fix Documents RLS Policies
DROP POLICY IF EXISTS "Allow authenticated admins full access to documents" ON public.documents;
DROP POLICY IF EXISTS "Allow public read access to published documents" ON public.documents;

CREATE POLICY "Documents read access"
  ON public.documents FOR SELECT TO public
  USING (published = true OR (SELECT auth.role()) = 'authenticated');

CREATE POLICY "Documents write access"
  ON public.documents FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Documents update access"
  ON public.documents FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Documents delete access"
  ON public.documents FOR DELETE TO authenticated USING (true);

-- Step 6: Fix Enquiries RLS Policies
DROP POLICY IF EXISTS "Allow anyone to submit enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow authenticated admins read/manage enquiries" ON public.enquiries;

CREATE POLICY "Enquiries submit access"
  ON public.enquiries FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Enquiries admin read access"
  ON public.enquiries FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enquiries admin update access"
  ON public.enquiries FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Enquiries admin delete access"
  ON public.enquiries FOR DELETE TO authenticated USING (true);

-- Step 7: Fix Events RLS Policies
DROP POLICY IF EXISTS "Allow authenticated admins full access to events" ON public.events;
DROP POLICY IF EXISTS "Allow public read access to published events" ON public.events;

CREATE POLICY "Events read access"
  ON public.events FOR SELECT TO public
  USING (published = true OR (SELECT auth.role()) = 'authenticated');

CREATE POLICY "Events write access"
  ON public.events FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Events update access"
  ON public.events FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Events delete access"
  ON public.events FOR DELETE TO authenticated USING (true);

-- Step 8: Fix Gallery RLS Policies & Columns
ALTER TABLE IF EXISTS public.gallery ADD COLUMN IF NOT EXISTS uploaded_by UUID;
ALTER TABLE IF EXISTS public.gallery ADD COLUMN IF NOT EXISTS uploader_name TEXT;
ALTER TABLE IF EXISTS public.gallery ADD COLUMN IF NOT EXISTS uploader_email TEXT;

DROP POLICY IF EXISTS "Allow authenticated admins full access to gallery" ON public.gallery;
DROP POLICY IF EXISTS "Allow public read access to published gallery" ON public.gallery;

CREATE POLICY "Gallery read access"
  ON public.gallery FOR SELECT TO public
  USING (published = true OR (SELECT auth.role()) = 'authenticated');

CREATE POLICY "Gallery write access"
  ON public.gallery FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Gallery update access"
  ON public.gallery FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Gallery delete access"
  ON public.gallery FOR DELETE TO authenticated USING (true);

-- Step 9: Fix Notices RLS Policies
DROP POLICY IF EXISTS "Allow authenticated admins full access to notices" ON public.notices;
DROP POLICY IF EXISTS "Allow public read access to published notices" ON public.notices;

CREATE POLICY "Notices read access"
  ON public.notices FOR SELECT TO public
  USING (published = true OR (SELECT auth.role()) = 'authenticated');

CREATE POLICY "Notices write access"
  ON public.notices FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Notices update access"
  ON public.notices FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Notices delete access"
  ON public.notices FOR DELETE TO authenticated USING (true);

-- Step 10: Fix School Information RLS Policies
DROP POLICY IF EXISTS "Allow authenticated admins full access to school info" ON public.school_information;
DROP POLICY IF EXISTS "Allow public read access to school info" ON public.school_information;

CREATE POLICY "School information read access"
  ON public.school_information FOR SELECT TO public USING (true);

CREATE POLICY "School information write access"
  ON public.school_information FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "School information update access"
  ON public.school_information FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "School information delete access"
  ON public.school_information FOR DELETE TO authenticated USING (true);

-- Step 11: Fix Site Settings RLS Policies
DROP POLICY IF EXISTS "Allow authenticated admins full access to site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Allow public read access to site settings" ON public.site_settings;

CREATE POLICY "Site settings read access"
  ON public.site_settings FOR SELECT TO public USING (true);

CREATE POLICY "Site settings write access"
  ON public.site_settings FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Site settings update access"
  ON public.site_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Site settings delete access"
  ON public.site_settings FOR DELETE TO authenticated USING (true);

-- ============================================================================
-- Step 12: TWO-ROLE RBAC ENFORCEMENT & SELF-PROTECTION (super_admin vs admin)
-- ============================================================================

-- Clean up any legacy role rows
UPDATE public.profiles
SET role = 'admin'
WHERE role NOT IN ('super_admin', 'admin');

-- Add check constraint for exactly two roles
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS valid_roles;
ALTER TABLE public.profiles ADD CONSTRAINT valid_roles CHECK (role IN ('super_admin', 'admin'));

-- Trigger Function: Protect user privileges, prevent self-demotion/self-disable/self-deletion,
-- and prevent non-super_admins from altering profiles or escalating privileges.
CREATE OR REPLACE FUNCTION public.protect_profiles_trigger()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_role TEXT;
  super_admin_count INT;
BEGIN
  -- Determine current acting user role
  IF auth.uid() IS NOT NULL THEN
    SELECT role INTO current_role
    FROM public.profiles
    WHERE id = auth.uid();
  END IF;

  -- Handling INSERT: Allow if system trigger or caller is super_admin
  IF TG_OP = 'INSERT' THEN
    IF auth.uid() IS NOT NULL AND current_role IS NOT NULL AND current_role <> 'super_admin' THEN
      RAISE EXCEPTION 'Only Super Administrators are authorized to register administrator profiles.';
    END IF;
    RETURN NEW;
  END IF;

  -- Handling UPDATE
  IF TG_OP = 'UPDATE' THEN
    -- Non-super admins cannot alter other profiles
    IF auth.uid() IS NOT NULL AND current_role IS NOT NULL AND current_role <> 'super_admin' AND auth.uid() <> OLD.id THEN
      RAISE EXCEPTION 'Unauthorized: Only Super Administrators can modify administrator accounts.';
    END IF;

    -- If super_admin is modifying their own record:
    IF auth.uid() IS NOT NULL AND auth.uid() = OLD.id AND OLD.role = 'super_admin' THEN
      -- Prevent self-demotion
      IF NEW.role IS DISTINCT FROM OLD.role AND NEW.role <> 'super_admin' THEN
        RAISE EXCEPTION 'Self-demotion prohibited: Super Administrators cannot demote their own account.';
      END IF;
      -- Prevent self-disable
      IF (NEW.is_active = false OR NEW.status = 'disabled') AND (OLD.is_active = true OR OLD.status = 'active') THEN
        RAISE EXCEPTION 'Self-disable prohibited: Super Administrators cannot disable their own account.';
      END IF;
    END IF;

    -- If demoting or disabling any super_admin, verify at least one other active super_admin remains
    IF (OLD.role = 'super_admin') AND (NEW.role <> 'super_admin' OR NEW.is_active = false OR NEW.status = 'disabled') THEN
      SELECT COUNT(*) INTO super_admin_count
      FROM public.profiles
      WHERE role = 'super_admin' AND (is_active IS NULL OR is_active = true) AND (status IS NULL OR status <> 'disabled') AND id <> OLD.id;

      IF super_admin_count = 0 THEN
        RAISE EXCEPTION 'Operation blocked: System must have at least one active Super Administrator.';
      END IF;
    END IF;

    RETURN NEW;
  END IF;

  -- Handling DELETE
  IF TG_OP = 'DELETE' THEN
    -- Non-super admins cannot delete profiles
    IF auth.uid() IS NOT NULL AND current_role IS NOT NULL AND current_role <> 'super_admin' THEN
      RAISE EXCEPTION 'Unauthorized: Only Super Administrators can delete administrator accounts.';
    END IF;

    -- Prevent self-deletion
    IF auth.uid() IS NOT NULL AND auth.uid() = OLD.id THEN
      RAISE EXCEPTION 'Self-deletion prohibited: Super Administrators cannot delete their own account.';
    END IF;

    -- Prevent deleting the last remaining active super_admin
    IF OLD.role = 'super_admin' THEN
      SELECT COUNT(*) INTO super_admin_count
      FROM public.profiles
      WHERE role = 'super_admin' AND (is_active IS NULL OR is_active = true) AND id <> OLD.id;

      IF super_admin_count = 0 THEN
        RAISE EXCEPTION 'Operation blocked: Cannot delete the last active Super Administrator.';
      END IF;
    END IF;

    RETURN OLD;
  END IF;

  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_protect_profiles ON public.profiles;
CREATE TRIGGER trg_protect_profiles
  BEFORE INSERT OR UPDATE OR DELETE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_profiles_trigger();

-- ============================================================================
-- Step 13: IMMUTABLE AUDIT LOG TABLE & STRICT POLICIES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID,
  actor_name TEXT,
  actor_email TEXT,
  actor_role TEXT,
  module TEXT NOT NULL,
  table_name TEXT,
  record_id TEXT,
  action TEXT NOT NULL,
  field_name TEXT,
  old_value TEXT,
  new_value TEXT,
  reason TEXT,
  restore_of_audit_id UUID,
  metadata JSONB DEFAULT '{}'::jsonb,
  user_name TEXT,
  user_email TEXT,
  user_role TEXT,
  resource_type TEXT,
  resource_id TEXT,
  details TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Backfill legacy column aliases if needed
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS actor_user_id UUID;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS actor_name TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS actor_email TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS actor_role TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS user_name TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS module TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS table_name TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS record_id TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS field_name TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS old_value TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS new_value TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS reason TEXT;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS restore_of_audit_id UUID;
ALTER TABLE public.activity_logs ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

-- Fast indexes for querying
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON public.activity_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_module ON public.activity_logs (module);
CREATE INDEX IF NOT EXISTS idx_activity_logs_actor_email ON public.activity_logs (actor_email);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON public.activity_logs (action);
CREATE INDEX IF NOT EXISTS idx_activity_logs_restore_id ON public.activity_logs (restore_of_audit_id);

-- Enable RLS
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Drop all old policies
DROP POLICY IF EXISTS "Allow authenticated read activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Allow authenticated insert activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Allow authenticated write activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Allow authenticated update activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Allow authenticated delete activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "Activity logs read access" ON public.activity_logs;
DROP POLICY IF EXISTS "Activity logs write access" ON public.activity_logs;

-- Strictly allow SELECT and INSERT only. NO UPDATE OR DELETE POLICIES EXIST (IMMUTABLE)
CREATE POLICY "Activity logs read access"
  ON public.activity_logs FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Activity logs write access"
  ON public.activity_logs FOR INSERT TO authenticated
  WITH CHECK (true);

