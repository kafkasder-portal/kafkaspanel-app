-- Disable RLS Completely - Manual SQL Commands
-- Bu komutları Supabase Dashboard > SQL Editor'da çalıştırın

-- =============================================
-- DISABLE RLS ON ALL TABLES
-- =============================================

-- Disable RLS on all tables
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.beneficiaries DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.aid_records DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.in_kind_aids DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_attendees DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_agenda DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.meeting_minutes DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications DISABLE ROW LEVEL SECURITY;

-- =============================================
-- DROP ALL EXISTING POLICIES
-- =============================================

-- Drop all policies from all tables
DROP POLICY IF EXISTS "Users can view meetings they organize or participate in" ON meetings;
DROP POLICY IF EXISTS "Users can create meetings" ON meetings;
DROP POLICY IF EXISTS "Meeting organizers can update their meetings" ON meetings;
DROP POLICY IF EXISTS "Meeting organizers can delete their meetings" ON meetings;

DROP POLICY IF EXISTS "Users can view participants of meetings they're involved in" ON meeting_attendees;
DROP POLICY IF EXISTS "Meeting organizers can manage participants" ON meeting_attendees;
DROP POLICY IF EXISTS "Users can update their own participation status" ON meeting_attendees;

DROP POLICY IF EXISTS "Users can view agenda for meetings they're involved in" ON meeting_agenda;
DROP POLICY IF EXISTS "Meeting organizers can manage agenda items" ON meeting_agenda;

DROP POLICY IF EXISTS "Users can view notes for meetings they're involved in" ON meeting_minutes;
DROP POLICY IF EXISTS "Meeting participants can create notes" ON meeting_minutes;
DROP POLICY IF EXISTS "Note creators can update their notes" ON meeting_minutes;

-- Drop any other policies that might exist
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "Authenticated users can access all data" ON ' || quote_ident(r.tablename);
    END LOOP;
END $$;

-- =============================================
-- CREATE ERROR_LOGS TABLE IF MISSING
-- =============================================

CREATE TABLE IF NOT EXISTS public.error_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    error_type TEXT NOT NULL,
    error_message TEXT NOT NULL,
    stack_trace TEXT,
    user_id UUID REFERENCES public.user_profiles(id),
    request_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS for error_logs too
ALTER TABLE public.error_logs DISABLE ROW LEVEL SECURITY;

-- =============================================
-- GRANT ALL PERMISSIONS
-- =============================================

-- Grant all permissions to all roles
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO service_role;

GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- =============================================
-- VERIFY CHANGES
-- =============================================

-- Check RLS status
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
    'user_profiles', 'beneficiaries', 'family_members', 'applications',
    'aid_records', 'payments', 'in_kind_aids', 'meetings', 'meeting_attendees',
    'meeting_agenda', 'meeting_minutes', 'documents', 'notifications', 'error_logs'
)
ORDER BY tablename;
