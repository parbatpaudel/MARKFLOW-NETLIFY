# Security & Environment Variables Guide

## ⚠️ Important Security Notes

### Never Commit Secrets
- **NEVER** commit `.env`, `.env.local`, or any files containing actual API keys, passwords, or secrets
- All sensitive credentials should be stored in **Netlify Environment Variables** only
- Use `.env.example` as a template (contains placeholder values only)

### Protected Files
The following files are automatically ignored by Git:
- `.env`
- `.env.local`
- `.env*.local`
- Any files matching `.env.development.local`, `.env.test.local`, `.env.production.local`

## 🔐 Environment Variables Setup

### For Local Development
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in your actual values in `.env.local`
3. **Never commit `.env.local`** - it's automatically ignored

### For Production (Netlify)
1. Go to **Netlify Dashboard** → Your Site → **Site settings** → **Environment variables**
2. Add each environment variable from `.env.example` with actual production values
3. Reference: [Netlify Environment Variables Docs](https://docs.netlify.com/environment-variables/overview/)

## 📋 Required Environment Variables

### Database (Neon PostgreSQL)
- `DATABASE_URL` - Pooled connection for general use
- `DATABASE_URL_UNPOOLED` - Direct connection for serverless functions

### Authentication (Supabase)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

### NextAuth
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - `http://localhost:3000` (dev) or your production URL

### Google OAuth
- `GOOGLE_CLIENT_ID` - From Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - From Google Cloud Console

### reCAPTCHA (Optional)
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - reCAPTCHA v2 site key
- `RECAPTCHA_SECRET_KEY` - reCAPTCHA v2 secret key

## 🚫 Netlify Secrets Scanning

If Netlify detects secrets in your build:

### Option 1: Remove Secrets from Repository
- Ensure no `.env` files are committed
- Remove any hardcoded secrets from code
- Use environment variables instead

### Option 2: Configure Secrets Scanning (Already Done)
The `netlify.toml` is configured to ignore:
- Documentation files (*.md)
- Setup guides
- Example files

### Option 3: Disable for Specific Keys
If needed, add to `netlify.toml`:
```toml
[build.environment]
  SECRETS_SCAN_OMIT_KEYS = "key1,key2,key3"
```

## 🔍 Checking for Exposed Secrets

### Before Committing
Run these checks:
```bash
# Check for .env files in git
git ls-files | grep .env

# Search for common secret patterns
git grep -i "api_key\|secret\|password\|token"

# Check what's staged
git diff --staged
```

### If Secrets Were Committed
1. **Rotate all exposed credentials immediately**
2. Remove from git history:
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env" \
     --prune-empty --tag-name-filter cat -- --all
   ```
3. Force push: `git push origin --force --all`
4. Update all secrets in Netlify environment variables

## ✅ Best Practices

1. **Use `.env.local` for development** - Never commit it
2. **Store production secrets in Netlify** - Use the dashboard
3. **Rotate secrets regularly** - Especially if exposed
4. **Use different keys for dev/prod** - Never share credentials
5. **Review before committing** - Check `git diff` for secrets
6. **Use `.env.example`** - Document required variables

## 📚 Additional Resources

- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Secrets Detection Best Practices](https://docs.netlify.com/security/secure-access-to-sites/secrets-controller/)

## 🆘 Support

If you encounter secrets scanning issues:
1. Check this guide
2. Review `netlify.toml` configuration
3. Verify `.gitignore` is working
4. Contact Netlify Support if issues persist
