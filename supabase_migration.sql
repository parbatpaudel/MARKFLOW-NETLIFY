-- ================================================
-- SUPABASE DATABASE MIGRATION
-- marketflow Website Enhancements
-- ================================================
-- 
-- This migration adds support for:
-- - Business Name field in contact submissions
-- - Industry field for lead categorization
-- - Source tracking (contact_form vs chat)
-- - Proper indexing for performance
--
-- RUN THIS IN YOUR SUPABASE SQL EDITOR
-- ================================================

-- Step 1: Add new columns to contacts table
-- (IF NOT EXISTS prevents errors if already run)

ALTER TABLE contacts 
ADD COLUMN IF NOT EXISTS business_name TEXT,
ADD COLUMN IF NOT EXISTS industry TEXT,
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'contact_form',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Step 2: Create indexes for better query performance

CREATE INDEX IF NOT EXISTS contacts_created_at_idx 
ON contacts(created_at DESC);

CREATE INDEX IF NOT EXISTS contacts_source_idx 
ON contacts(source);

CREATE INDEX IF NOT EXISTS contacts_industry_idx 
ON contacts(industry);

-- Step 3: Verify the schema (optional check query)
-- Run this to confirm all columns exist:

SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'contacts'
ORDER BY ordinal_position;

-- Expected columns after migration:
-- - id (uuid)
-- - name (text)
-- - email (text)
-- - business_name (text) [NEW]
-- - industry (text) [NEW]
-- - company (text)
-- - subject (text)
-- - message (text)
-- - source (text) [NEW]
-- - created_at (timestamp with time zone) [NEW]

-- ================================================
-- OPTIONAL: Sample query to view recent submissions
-- ================================================

-- View all contact submissions from the last 7 days
SELECT 
  created_at,
  name,
  email,
  business_name,
  industry,
  source,
  LEFT(message, 50) || '...' as message_preview
FROM contacts
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC
LIMIT 20;

-- ================================================
-- OPTIONAL: Analytics queries
-- ================================================

-- Count submissions by source
SELECT 
  source,
  COUNT(*) as total_submissions
FROM contacts
GROUP BY source;

-- Count submissions by industry
SELECT 
  industry,
  COUNT(*) as total_submissions
FROM contacts
WHERE industry IS NOT NULL
GROUP BY industry
ORDER BY total_submissions DESC;

-- Recent submissions with all details
SELECT 
  created_at,
  name,
  email,
  business_name,
  industry,
  company,
  subject,
  message,
  source
FROM contacts
ORDER BY created_at DESC
LIMIT 10;

-- ================================================
-- ROLLBACK (if needed)
-- ================================================
-- CAUTION: Only run this if you need to undo the migration
-- This will remove the new columns and indexes

-- DROP INDEX IF EXISTS contacts_created_at_idx;
-- DROP INDEX IF EXISTS contacts_source_idx;
-- DROP INDEX IF EXISTS contacts_industry_idx;

-- ALTER TABLE contacts 
-- DROP COLUMN IF EXISTS business_name,
-- DROP COLUMN IF EXISTS industry,
-- DROP COLUMN IF EXISTS source,
-- DROP COLUMN IF EXISTS created_at;

-- ================================================
-- NOTES
-- ================================================
-- 
-- 1. This migration is idempotent (safe to run multiple times)
-- 2. Existing data is preserved
-- 3. New columns allow NULL values for backward compatibility
-- 4. Default values are set for 'source' and 'created_at'
-- 5. Indexes improve query performance for filtering and sorting
--
-- After running this migration:
-- - Deploy your updated Next.js application
-- - Test contact form submission
-- - Test chat contact submission
-- - Verify data is being stored correctly
-- - Check email notifications (if configured)
--
-- ================================================
