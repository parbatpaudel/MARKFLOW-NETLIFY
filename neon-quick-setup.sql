-- Quick setup for contacts table
-- Copy and paste this into Neon SQL Editor

CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  company TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  replied_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Add indexes for better performance
CREATE INDEX idx_contacts_created_at ON contacts (created_at DESC);
CREATE INDEX idx_contacts_email ON contacts (email);

-- Test that it worked
SELECT COUNT(*) FROM contacts;
