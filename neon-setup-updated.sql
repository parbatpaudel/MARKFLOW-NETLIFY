-- =====================================================
-- Neon Database Setup for MarketFlow Contact Form (Updated)
-- =====================================================
-- Run this in Neon SQL Editor
-- =====================================================

-- 1. Create Contacts Table
-- =====================================================
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  
  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Business Information
  business_name TEXT,
  industry TEXT,
  company TEXT,
  business_description TEXT,
  
  -- Message Details
  subject TEXT,
  message TEXT NOT NULL,
  
  -- Onboarding Questionnaire Fields
  country TEXT,
  other_country TEXT,
  country_code TEXT,
  business_size TEXT,
  annual_revenue TEXT,
  ebitda TEXT,
  currency TEXT,
  how_heard TEXT,
  other_how_heard TEXT,
  schedule_meeting TEXT,
  
  -- Metadata
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  replied_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- 2. Create Newsletter Subscribers Table
-- =====================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  email TEXT NOT NULL UNIQUE,
  
  -- Metadata
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- =====================================================
-- 3. Add Missing Columns to Existing Contacts Table (if needed)
-- =====================================================
-- These commands will add columns if they don't exist yet
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS other_country TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS country_code TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS business_size TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS annual_revenue TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS ebitda TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS currency TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS how_heard TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS other_how_heard TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS schedule_meeting TEXT;

-- =====================================================
-- 4. Create Indexes for Better Performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts (email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts (status);
CREATE INDEX IF NOT EXISTS idx_contacts_industry ON contacts (industry);
CREATE INDEX IF NOT EXISTS idx_contacts_country ON contacts (country);
CREATE INDEX IF NOT EXISTS idx_contacts_business_size ON contacts (business_size);
CREATE INDEX IF NOT EXISTS idx_contacts_schedule_meeting ON contacts (schedule_meeting);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_created_at ON newsletter_subscribers (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers (email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers (status);

-- =====================================================
-- 5. Add Email Validation Constraints
-- =====================================================
ALTER TABLE contacts 
ADD CONSTRAINT email_format_check 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE newsletter_subscribers 
ADD CONSTRAINT newsletter_email_format_check 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- =====================================================
-- 6. Create View for Statistics (Optional)
-- =====================================================
CREATE OR REPLACE VIEW contact_stats AS
SELECT
  COUNT(*) as total_contacts,
  COUNT(*) FILTER (WHERE status = 'new') as new_contacts,
  COUNT(*) FILTER (WHERE status = 'read') as read_contacts,
  COUNT(*) FILTER (WHERE status = 'replied') as replied_contacts,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as contacts_this_week,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as contacts_this_month,
  COUNT(DISTINCT email) as unique_contacts
FROM contacts;

-- =====================================================
-- 7. Create View for Newsletter Statistics (Optional)
-- =====================================================
CREATE OR REPLACE VIEW newsletter_stats AS
SELECT
  COUNT(*) as total_subscribers,
  COUNT(*) FILTER (WHERE status = 'active') as active_subscribers,
  COUNT(*) FILTER (WHERE status = 'unsubscribed') as unsubscribed_subscribers,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as new_subscribers_this_week,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as new_subscribers_this_month
FROM newsletter_subscribers;

-- =====================================================
-- 8. Insert Test Data (Optional - Remove in Production)
-- =====================================================
-- Uncomment to test:
/*
INSERT INTO contacts (name, email, business_name, industry, message)
VALUES 
  ('John Doe', 'john@example.com', 'Tech Corp', 'Technology', 'Interested in your services'),
  ('Jane Smith', 'jane@example.com', 'E-Shop Ltd', 'E-commerce', 'Need help with marketing');
*/

-- =====================================================
-- 9. Verify Setup
-- =====================================================
-- Run this to confirm tables were created:
SELECT 
  table_name, 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name IN ('contacts', 'newsletter_subscribers')
ORDER BY table_name, ordinal_position;

-- =====================================================
-- ✅ Setup Complete!
-- =====================================================
-- Your contacts and newsletter_subscribers tables are ready to receive submissions
-- from the Next.js forms via Neon serverless.
-- =====================================================