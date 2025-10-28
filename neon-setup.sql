-- =====================================================
-- Neon Database Setup for MarketFlow Contact Form
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
  business_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  company TEXT,
  business_description TEXT,
  
  -- Message Details
  subject TEXT,
  message TEXT NOT NULL,
  
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
-- 3. Create Indexes for Better Performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts (email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts (status);
CREATE INDEX IF NOT EXISTS idx_contacts_industry ON contacts (industry);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_created_at ON newsletter_subscribers (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON newsletter_subscribers (email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status ON newsletter_subscribers (status);

-- =====================================================
-- 4. Add Email Validation Constraints
-- =====================================================
ALTER TABLE contacts 
ADD CONSTRAINT email_format_check 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE newsletter_subscribers 
ADD CONSTRAINT newsletter_email_format_check 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- =====================================================
-- 5. Create View for Statistics (Optional)
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
-- 6. Create View for Newsletter Statistics (Optional)
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
-- 7. Insert Test Data (Optional - Remove in Production)
-- =====================================================
-- Uncomment to test:
/*
INSERT INTO contacts (name, email, business_name, industry, message)
VALUES 
  ('John Doe', 'john@example.com', 'Tech Corp', 'Technology', 'Interested in your services'),
  ('Jane Smith', 'jane@example.com', 'E-Shop Ltd', 'E-commerce', 'Need help with marketing');
*/

-- =====================================================
-- 8. Verify Setup
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