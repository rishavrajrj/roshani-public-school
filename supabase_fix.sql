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

-- Step 4: Fix Profiles RLS Policies (Resolves Auth InitPlan & Multiple Permissive Policies)
DROP POLICY IF EXISTS "Allow authenticated users to insert/update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow users to read own profile or admins to read all" ON public.profiles;

CREATE POLICY "Profiles read access"
  ON public.profiles FOR SELECT TO authenticated
  USING (
    id = (SELECT auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = (SELECT auth.uid()) AND p.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Profiles write access"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (
    id = (SELECT auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = (SELECT auth.uid()) AND p.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Profiles update access"
  ON public.profiles FOR UPDATE TO authenticated
  USING (
    id = (SELECT auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = (SELECT auth.uid()) AND p.role IN ('admin', 'super_admin')
    )
  )
  WITH CHECK (
    id = (SELECT auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = (SELECT auth.uid()) AND p.role IN ('admin', 'super_admin')
    )
  );

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

-- Step 8: Fix Gallery RLS Policies
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
