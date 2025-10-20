# Email Notification Setup Guide

## Overview
The website now includes email notifications for contact form submissions (both from the contact page and chatbot). This guide will help you configure email delivery.

## Quick Setup (Recommended: Resend)

### 1. Create a Resend Account
- Go to [https://resend.com](https://resend.com)
- Sign up for a free account (100 emails/day free)
- Verify your email address

### 2. Get Your API Key
- In the Resend dashboard, go to "API Keys"
- Click "Create API Key"
- Give it a name (e.g., "marketflow-production")
- Copy the API key (starts with `re_`)

### 3. Add Environment Variables
Add these to your `.env.local` file (for local development) and Vercel environment variables (for production):

```bash
# Resend Email Service
RESEND_API_KEY=re_your_api_key_here

# Email recipient for notifications
NOTIFICATION_EMAIL=your-email@example.com

# App URL (for email notification callbacks)
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 4. Verify Your Domain (Production)
For production use with your own domain:
1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `marketflow.com`)
4. Add the DNS records Resend provides to your domain settings
5. Wait for verification (usually 5-10 minutes)

### 5. Update Email "From" Address
Once your domain is verified, update the email sender in `/app/api/send-notification/route.ts`:

```typescript
from: 'marketflow <notifications@your-domain.com>', // Update this line
```

## Testing Email Notifications

### Local Testing
1. Add the environment variables to `.env.local`
2. Restart your development server
3. Submit a contact form or use the chatbot
4. Check your inbox for the notification

### Production Testing
1. Add environment variables to Vercel:
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add `RESEND_API_KEY`, `NOTIFICATION_EMAIL`, and `NEXT_PUBLIC_APP_URL`
   - Redeploy your application
2. Test with a real submission

## Email Notification Features

### What Gets Sent
- **Subject**: "New Lead: [Business Name] ([Industry])"
- **Content**: 
  - Contact name and email
  - Business name and industry
  - Full message
  - Timestamp
  - Source (contact form or chatbot)

### Reply-To Header
Emails include a `reply-to` header with the submitter's email, so you can reply directly to them.

## Troubleshooting

### No Emails Received
1. Check your spam/junk folder
2. Verify API key is correct in environment variables
3. Check Resend dashboard logs for delivery status
4. Ensure domain is verified (for production)

### Console Logging
Even if email delivery fails, all submissions are:
- Saved to Supabase database
- Logged to the server console
- Still return success to the user

### Alternative Email Services

If you prefer a different email service:

**SendGrid:**
```bash
SENDGRID_API_KEY=your_key
```

**AWS SES:**
```bash
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
```

Update `/app/api/send-notification/route.ts` with the appropriate API calls.

## Database Schema Update

Ensure your Supabase `contacts` table has these columns:
```sql
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_name TEXT,
  industry TEXT,
  company TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'contact_form',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

Run this SQL in your Supabase SQL editor if the columns don't exist:
```sql
ALTER TABLE contacts 
ADD COLUMN IF NOT EXISTS business_name TEXT,
ADD COLUMN IF NOT EXISTS industry TEXT,
ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'contact_form';
```

## Support
For issues or questions, check:
- Resend documentation: https://resend.com/docs
- Vercel environment variables: https://vercel.com/docs/environment-variables
