# Google OAuth Setup Guide for Supabase

## Prerequisites
- Supabase project: `https://ldsppreromxfqqfzsvjl.supabase.co`
- Google Cloud Console account

---

## Part 1: Create Google OAuth Credentials

### Step 1: Go to Google Cloud Console
1. Visit: https://console.cloud.google.com/
2. Create a new project or select an existing one

### Step 2: Enable Google+ API
1. Go to **APIs & Services** > **Library**
2. Search for **"Google+ API"**
3. Click **Enable**

### Step 3: Create OAuth 2.0 Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS** > **OAuth client ID**
3. If prompted, configure the OAuth consent screen:
   - User Type: **External**
   - App name: **Your App Name** (e.g., "MarketFlow")
   - User support email: **Your email**
   - Developer contact: **Your email**
   - Click **Save and Continue**
   - Scopes: Leave default, click **Save and Continue**
   - Test users: Add your email, click **Save and Continue**

4. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: **MarketFlow Auth** (or any name)
   
5. Add Authorized JavaScript origins:
   ```
   http://localhost:3000
   https://your-production-domain.com
   ```

6. Add Authorized redirect URIs:
   ```
   https://ldsppreromxfqqfzsvjl.supabase.co/auth/v1/callback
   http://localhost:3000/auth/callback
   https://your-production-domain.com/auth/callback
   ```

7. Click **CREATE**
8. **Copy the Client ID and Client Secret** - you'll need these next!

---

## Part 2: Configure Supabase

### Step 1: Go to Supabase Dashboard
1. Visit: https://supabase.com/dashboard/project/ldsppreromxfqqfzsvjl
2. Go to **Authentication** > **Providers**

### Step 2: Enable Google Provider
1. Find **Google** in the list
2. Toggle it **ON**
3. Paste your **Client ID** from Google Console
4. Paste your **Client Secret** from Google Console
5. Click **Save**

### Step 3: Configure Redirect URLs (Site URL)
1. Go to **Authentication** > **URL Configuration**
2. Set **Site URL** to:
   - Development: `http://localhost:3000`
   - Production: `https://your-production-domain.com`
3. Add **Redirect URLs**:
   ```
   http://localhost:3000/**
   https://your-production-domain.com/**
   ```
4. Click **Save**

---

## Part 3: Update Your .env.local

Add these variables to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ldsppreromxfqqfzsvjl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkc3BwcmVyb214ZnFxZnpzdmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MzcwMTQsImV4cCI6MjA3NjQxMzAxNH0.1opft879DOoFGx11fhlj0tH3ZnRgmEbBfj-v4upk168

# Optional: For production deployment
NEXT_PUBLIC_APP_URL=https://your-production-domain.com
```

---

## Part 4: Test Google Authentication

### Development Testing:
1. Start your development server: `npm run dev`
2. Click "Get Started" button
3. Click "Continue with Google"
4. You should be redirected to Google login
5. After successful login, you'll be redirected back to your app

### Verify Authentication:
- Open browser console
- After login, check: `User authenticated!` message
- Your user info will be stored in Supabase Auth

---

## Part 5: Database Setup for Contacts

Your contact form is already configured! But ensure the table exists:

### Create Contacts Table in Supabase:
1. Go to **Database** > **Tables**
2. Click **Create a new table**
3. Table name: `contacts`
4. Columns:
   - `id` (uuid, primary key, auto-generated)
   - `created_at` (timestamp with time zone, default: now())
   - `name` (text)
   - `email` (text)
   - `business_name` (text)
   - `industry` (text)
   - `company` (text, nullable)
   - `subject` (text, nullable)
   - `message` (text)

5. Click **Save**

### Enable Row Level Security (Optional but Recommended):
```sql
-- Allow anonymous inserts (for contact form)
CREATE POLICY "Allow public contact submissions"
ON contacts FOR INSERT
TO anon
WITH CHECK (true);

-- Only authenticated users can view
CREATE POLICY "Only authenticated users can view contacts"
ON contacts FOR SELECT
TO authenticated
USING (true);
```

---

## Troubleshooting

### Google Auth Not Working?
- ✅ Check redirect URIs match exactly in Google Console
- ✅ Ensure Google+ API is enabled
- ✅ Verify Client ID and Secret are correctly pasted in Supabase
- ✅ Check browser console for errors
- ✅ Clear browser cookies and try again

### Contact Form Not Saving?
- ✅ Check Supabase table exists with correct column names
- ✅ Verify Row Level Security policies allow inserts
- ✅ Check browser Network tab for API errors
- ✅ Look at Supabase logs in Dashboard > Logs

### Environment Variables Not Loading?
- ✅ Restart your dev server after changing `.env.local`
- ✅ Ensure file is named exactly `.env.local` (not `.env`)
- ✅ Variables must start with `NEXT_PUBLIC_` to be accessible in browser

---

## ✅ Success Checklist

- [ ] Google OAuth credentials created
- [ ] Supabase Google provider enabled
- [ ] Redirect URLs configured
- [ ] Environment variables set
- [ ] Contacts table created in Supabase
- [ ] Row Level Security policies added
- [ ] Google login tested successfully
- [ ] Contact form submissions saving to database

---

## Next Steps

Once everything is working:

1. **Add user profile features** - Display user info after login
2. **Protected routes** - Restrict access to authenticated users
3. **Email notifications** - Get notified of new contacts
4. **Admin dashboard** - View all contact submissions
5. **Deploy to Vercel** - Your app is ready for production!

---

**Need Help?**
- Supabase Docs: https://supabase.com/docs/guides/auth/social-login/auth-google
- Google OAuth Docs: https://developers.google.com/identity/protocols/oauth2
