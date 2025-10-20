# 🚀 Netlify Deployment Setup Guide

## ✅ What's Been Configured

### 1. **Neon Database Integration**
- ✅ Contact form now saves to Neon PostgreSQL database
- ✅ Removed Supabase dependency for contact form
- ✅ Using `@neondatabase/serverless` package

### 2. **Mobile UI Changes**
- ✅ Login/Auth removed from mobile view
- ✅ "Get Started" button only shows on desktop
- ✅ Mobile navbar only has navigation links + YouTube

### 3. **Desktop Auth**
- ✅ Google OAuth still works on desktop
- ✅ Email/password login on desktop
- ✅ User info and logout button on desktop

---

## 📋 Step-by-Step Netlify Setup

### **Step 1: Create Database Table in Neon**

1. **Go to Neon Console:**
   ```
   https://console.neon.tech/
   ```

2. **Open SQL Editor** (in your project)

3. **Copy and run the SQL:**
   - Open file: [`neon-setup.sql`](./neon-setup.sql)
   - Copy entire content
   - Paste in Neon SQL Editor
   - Click **Run**

4. **Verify table created:**
   ```sql
   SELECT * FROM contacts LIMIT 5;
   ```

---

### **Step 2: Configure Environment Variables in Netlify**

1. **Go to Netlify Dashboard:**
   ```
   https://app.netlify.com/
   ```

2. **Navigate to:**
   - Your Site → **Site settings** → **Environment variables**

3. **Add these variables** (click "Add a variable"):

#### **Required Variables:**

```bash
# Neon Database (Pooled)
DATABASE_URL
Value: postgresql://neondb_owner:npg_J4OqyEQzfr1T@ep-falling-heart-aegm91jn-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require

# Neon Database (Unpooled - same as pooled for now)
DATABASE_URL_UNPOOLED
Value: postgresql://neondb_owner:npg_J4OqyEQzfr1T@ep-falling-heart-aegm91jn-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require

# NextAuth Secret (for desktop auth)
NEXTAUTH_SECRET
Value: a8f3c9e2d7b4f6a1e9c8d5b2f4a7e3c6d9b1f8a4e2c7d5b3f6a9e1c4d8b2f5a7

# NextAuth URL (change to your actual Netlify URL)
NEXTAUTH_URL
Value: https://YOUR-SITE-NAME.netlify.app

# Supabase (for desktop auth only)
NEXT_PUBLIC_SUPABASE_URL
Value: https://ldsppreromxfqqfzsvjl.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkc3BwcmVyb214ZnFxZnpzdmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MzcwMTQsImV4cCI6MjA3NjQxMzAxNH0.1opft879DOoFGx11fhlj0tH3ZnRgmEbBfj-v4upk168

# App URL
NEXT_PUBLIC_APP_URL
Value: https://YOUR-SITE-NAME.netlify.app

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY
Value: 6LcOjO8rAAAAABwdQ40OGdkm1zS36qa9rrJEZWFm

RECAPTCHA_SECRET_KEY
Value: 6LcOjO8rAAAAACSk_b6RTt79IOEJ7daX93UKBYKr

# Gemini AI
GEMINI_API_KEY
Value: AIzaSyB6kXUj7Qjo14pL-vitKzT7vP2czTSXeiI

GEMINI_MODEL
Value: gemini-2.0-flash

# Super AI Memory
SUPER_AI_MEMORY_KEY
Value: sm_Jn5LgxYXtkmcFX6kGKzZjE_BoClrDZTaiFgswDuUmYJUjMsGTkzDuseIunirOPyFfygRrYzlOfSpJvrtCvNtvdM
```

4. **Important:** Make sure all variables are set for:
   - ✅ **Production**
   - ✅ **Deploy Previews**
   - ✅ **Branch Deploys**

---

### **Step 3: Deploy to Netlify**

#### **Option A: Deploy from Git (Recommended)**

1. **Connect your repository:**
   - Netlify Dashboard → **Add new site** → **Import an existing project**
   - Choose GitHub/GitLab/Bitbucket
   - Select your repository

2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - (These are already in `netlify.toml`)

3. **Click Deploy**

#### **Option B: Manual Deploy**

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

---

### **Step 4: Update NEXTAUTH_URL**

After your site is deployed:

1. **Copy your Netlify URL:**
   ```
   https://your-site-name.netlify.app
   ```

2. **Update environment variable:**
   - Go back to **Environment variables**
   - Find `NEXTAUTH_URL`
   - Update value to your actual URL
   - Click **Save**

3. **Redeploy** (Netlify will auto-redeploy when env vars change)

---

## 🧪 Testing

### **Test Locally First:**

```bash
# Make sure .env.local has all variables
npm run dev

# Test contact form:
# 1. Go to http://localhost:3000/contact
# 2. Fill out and submit form
# 3. Check Neon database for new entry

# Test desktop auth:
# 1. Use desktop browser
# 2. Click "Get Started"
# 3. Try Google login

# Test mobile (no auth):
# 1. Use mobile or resize browser
# 2. "Get Started" should NOT appear
# 3. Only navigation menu visible
```

### **Test on Netlify:**

1. **After deployment**, visit your Netlify URL
2. **Test contact form** - submit a message
3. **Check Neon database** - verify data saved
4. **Test desktop auth** - login should work
5. **Test mobile** - no login button should appear

---

## 📊 Database Verification

### **Check Contact Submissions in Neon:**

1. Go to Neon Console → SQL Editor
2. Run:
   ```sql
   SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10;
   ```

3. You should see your test submissions!

### **View Statistics:**

```sql
SELECT * FROM contact_stats;
```

---

## 🔧 Environment Variable Scopes

| Variable | Required For | Scope |
|----------|-------------|-------|
| `DATABASE_URL` | Contact form | All deploys |
| `DATABASE_URL_UNPOOLED` | Migrations | All deploys |
| `NEXTAUTH_SECRET` | Desktop auth | All deploys |
| `NEXTAUTH_URL` | Desktop auth | Production only |
| `NEXT_PUBLIC_SUPABASE_URL` | Desktop auth | All deploys |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Desktop auth | All deploys |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Contact form | All deploys |
| `RECAPTCHA_SECRET_KEY` | Contact form | All deploys |

---

## ✅ Success Checklist

Before going live:

- [ ] Run `neon-setup.sql` in Neon SQL Editor
- [ ] Verify `contacts` table exists in Neon
- [ ] Add all environment variables in Netlify
- [ ] Update `NEXTAUTH_URL` to your Netlify URL
- [ ] Test contact form locally
- [ ] Test desktop auth locally
- [ ] Verify mobile has no login button
- [ ] Deploy to Netlify
- [ ] Test contact form on production
- [ ] Check Neon database for submissions
- [ ] Test desktop auth on production

---

## 🎯 What Changed

### **Files Modified:**
- ✅ [`lib/neon.ts`](./lib/neon.ts) - Neon database connection
- ✅ [`app/api/contact/route.ts`](./app/api/contact/route.ts) - Now uses Neon instead of Supabase
- ✅ [`components/ui/navbar.tsx`](./components/ui/navbar.tsx) - Removed login from mobile
- ✅ [`.env.local`](./.env.local) - Added Neon credentials

### **Files Created:**
- ✅ [`neon-setup.sql`](./neon-setup.sql) - Database schema
- ✅ [`netlify.toml`](./netlify.toml) - Netlify configuration
- ✅ [`NETLIFY_SETUP.md`](./NETLIFY_SETUP.md) - This guide

### **Packages Added:**
- ✅ `@neondatabase/serverless` - Neon PostgreSQL client

---

## ❓ Troubleshooting

### Contact Form Not Saving?

1. **Check Neon connection:**
   ```bash
   # In browser console after form submit
   # Look for: ✅ Contact saved to Neon database
   ```

2. **Verify environment variables:**
   - Make sure `DATABASE_URL` is set in Netlify
   - Check Netlify deploy logs for errors

3. **Check Neon dashboard:**
   - Go to Operations → Query History
   - Look for INSERT statements

### Desktop Auth Not Working?

1. **Check `NEXTAUTH_URL`:**
   - Must match your actual Netlify URL
   - Include `https://`

2. **Verify Supabase variables:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Check Google OAuth:**
   - Make sure Netlify URL is in Google Console redirect URIs

### Mobile Still Showing Login?

1. **Clear browser cache**
2. **Hard refresh:** Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. **Check responsive view:** F12 → Toggle device toolbar

---

## 🚀 You're Ready!

Your setup now includes:
- ✅ **Neon database** for contact form storage
- ✅ **Mobile-friendly** (no auth clutter on mobile)
- ✅ **Desktop auth** (Google OAuth + email/password)
- ✅ **Netlify deployment** ready
- ✅ **Production-ready** environment variables

**Deploy and enjoy!** 🎉
