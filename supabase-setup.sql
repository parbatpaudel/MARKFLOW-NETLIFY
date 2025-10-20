-- =====================================================
-- Supabase Database Setup for MarketFlow
-- =====================================================
-- Run this in Supabase SQL Editor: 
-- https://supabase.com/dashboard/project/ldsppreromxfqqfzsvjl/editor
-- =====================================================

-- 1. Create Contacts Table
-- =====================================================
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  
  -- Business Information
  business_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  company TEXT,
  
  -- Message Details
  subject TEXT,
  message TEXT NOT NULL,
  
  -- Metadata
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  replied_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON public.contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS contacts_email_idx ON public.contacts (email);
CREATE INDEX IF NOT EXISTS contacts_status_idx ON public.contacts (status);

-- =====================================================
-- 2. Enable Row Level Security (RLS)
-- =====================================================
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT (for contact form submissions)
CREATE POLICY "Allow public contact form submissions"
ON public.contacts
FOR INSERT
TO anon
WITH CHECK (true);

-- Only authenticated users can view contacts
CREATE POLICY "Authenticated users can view all contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can update contacts (for admin dashboard)
CREATE POLICY "Authenticated users can update contacts"
ON public.contacts
FOR UPDATE
TO authenticated
USING (true);

-- Only authenticated users can delete contacts
CREATE POLICY "Authenticated users can delete contacts"
ON public.contacts
FOR DELETE
TO authenticated
USING (true);

-- =====================================================
-- 3. Create User Profiles Table (Optional)
-- =====================================================
-- This links to Supabase Auth users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Profile Information
  full_name TEXT,
  avatar_url TEXT,
  email TEXT,
  
  -- Business Information
  company TEXT,
  role TEXT,
  
  -- Preferences
  email_notifications BOOLEAN DEFAULT true,
  
  CONSTRAINT profiles_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$')
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- =====================================================
-- 4. Create Function to Auto-Create Profile on Signup
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile when user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 5. Create Analytics View (Optional)
-- =====================================================
CREATE OR REPLACE VIEW public.contact_stats AS
SELECT
  COUNT(*) as total_contacts,
  COUNT(*) FILTER (WHERE status = 'new') as new_contacts,
  COUNT(*) FILTER (WHERE status = 'read') as read_contacts,
  COUNT(*) FILTER (WHERE status = 'replied') as replied_contacts,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as contacts_this_week,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as contacts_this_month,
  COUNT(DISTINCT email) as unique_contacts
FROM public.contacts;

-- Grant access to authenticated users
GRANT SELECT ON public.contact_stats TO authenticated;

-- =====================================================
-- 6. Test Data (Optional - Remove in Production)
-- =====================================================
-- Uncomment to add test data:
/*
INSERT INTO public.contacts (name, email, business_name, industry, message)
VALUES 
  ('John Doe', 'john@example.com', 'Tech Corp', 'Technology', 'Interested in your services'),
  ('Jane Smith', 'jane@example.com', 'E-Shop Ltd', 'E-commerce', 'Need help with marketing'),
  ('Bob Johnson', 'bob@example.com', 'Health Plus', 'Healthcare', 'Looking for consultation');
*/

-- =====================================================
-- 7. Grant Permissions
-- =====================================================
-- Grant usage on sequences
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant access to tables
GRANT ALL ON public.contacts TO anon, authenticated;
GRANT ALL ON public.profiles TO authenticated;

-- =====================================================
-- ✅ Setup Complete!
-- =====================================================
-- Next Steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Configure Google OAuth in Supabase Dashboard
-- 3. Test contact form submission
-- 4. Test Google authentication
-- =====================================================
