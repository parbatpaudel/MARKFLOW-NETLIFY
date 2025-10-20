# 🚀 Deployment Checklist

## Pre-Deployment Steps

### 1. Database Migration ✅
- [ ] Open Supabase Dashboard → SQL Editor
- [ ] Copy contents of `supabase_migration.sql`
- [ ] Run the migration
- [ ] Verify columns added successfully
- [ ] Run test query to confirm schema

### 2. Environment Variables Setup

#### Vercel Dashboard Setup
- [ ] Go to Vercel Dashboard
- [ ] Navigate to Project Settings → Environment Variables
- [ ] Add the following variables:

```
RESEND_API_KEY=re_your_api_key_here
NOTIFICATION_EMAIL=your-email@example.com
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

#### Optional but Recommended
```
RECAPTCHA_SECRET_KEY=your_recaptcha_secret
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

### 3. Email Service Configuration (Optional but Recommended)
- [ ] Create account at [Resend.com](https://resend.com)
- [ ] Verify your email
- [ ] Generate API key
- [ ] Add API key to Vercel environment variables
- [ ] For production: Verify your domain in Resend
- [ ] Update sender email in `app/api/send-notification/route.ts`

See `EMAIL_SETUP.md` for detailed instructions.

---

## Deployment

### Auto Deployment (Recommended)
Changes are already pushed to GitHub. Vercel will automatically:
- [ ] Detect the push
- [ ] Build the application
- [ ] Deploy to production

Monitor deployment at: https://vercel.com/dashboard

### Manual Deployment (if needed)
```bash
cd c:\Users\LENOVO\Desktop\cursor
vercel --prod
```

---

## Post-Deployment Verification

### 1. Basic Functionality Tests
- [ ] Visit your production URL
- [ ] Check homepage loads correctly
- [ ] Navigate to `/contact` page
- [ ] Verify Calendly widget appears (bottom-right)

### 2. Contact Form Testing
- [ ] Fill out contact form with test data
  - Name: Test User
  - Email: test@example.com
  - Business Name: Test Company
  - Industry: Technology
  - Message: Test submission
- [ ] Submit form
- [ ] Verify success message appears
- [ ] Check Supabase dashboard for new entry
- [ ] Check email inbox for notification (if configured)

### 3. Mobile Navigation Testing
- [ ] Open site on mobile device
- [ ] Tap hamburger menu
- [ ] Verify navigation links are visible
- [ ] Click on each link to test navigation
- [ ] Verify close button (X) works

### 4. Chat Widget Testing
- [ ] Click chat widget (bottom-right)
- [ ] Verify chat opens
- [ ] Test "Get in Touch with Our Team" button
- [ ] Follow AI prompts to submit contact info
- [ ] Verify confirmation message
- [ ] Check database for chat submission
- [ ] Check email for notification

### 5. Calendly Integration Testing
- [ ] Visit `/contact` page
- [ ] Look for "Schedule time with me" badge (bottom-right)
- [ ] Click badge
- [ ] Verify Calendly modal opens
- [ ] Test scheduling flow

---

## Performance Checks

### Lighthouse Scores (Chrome DevTools)
Run Lighthouse audit and verify:
- [ ] Performance: > 90
- [ ] Accessibility: > 90
- [ ] Best Practices: > 90
- [ ] SEO: > 90

### Mobile Testing
Test on actual devices:
- [ ] iPhone (iOS Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad or Android)

---

## Monitoring

### 1. Vercel Dashboard
Monitor for:
- [ ] Build errors
- [ ] Runtime errors
- [ ] Performance metrics

### 2. Supabase Dashboard
Check:
- [ ] Database connection status
- [ ] Table row count increases
- [ ] No error logs

### 3. Email Notifications (if configured)
Verify:
- [ ] Emails arrive within 1-2 minutes
- [ ] Email formatting is correct
- [ ] Reply-to header works
- [ ] All information is included

---

## Troubleshooting

### If Contact Form Doesn't Submit
1. Check browser console for errors
2. Verify Supabase credentials in environment variables
3. Check Supabase table permissions
4. Review network tab for failed API calls

### If Emails Don't Send
1. Verify RESEND_API_KEY is set correctly
2. Check Resend dashboard logs
3. Verify domain is verified (production only)
4. Check NOTIFICATION_EMAIL is valid
5. Review server logs in Vercel

### If Mobile Navigation Still Has Issues
1. Clear browser cache completely
2. Test on actual mobile device (not emulator)
3. Hard refresh: Ctrl+Shift+R (desktop) or force close app (mobile)
4. Check z-index conflicts in browser DevTools
5. Verify latest deployment is live

### If Chat Widget Doesn't Work
1. Check GEMINI_API_KEY is set
2. Verify browser console for errors
3. Check network tab for failed API calls
4. Clear localStorage and try again

---

## Success Criteria

All items below should be ✅ before considering deployment complete:

- [ ] Site loads without errors
- [ ] All pages accessible
- [ ] Contact form submits successfully
- [ ] Data appears in Supabase
- [ ] Mobile navigation works on real devices
- [ ] Chat widget opens and responds
- [ ] Chat contact submission works
- [ ] Calendly widget appears and functions
- [ ] Email notifications deliver (if configured)
- [ ] No console errors in production
- [ ] Mobile responsive on all devices
- [ ] Performance metrics acceptable

---

## Rollback Plan (Emergency)

If critical issues occur:

### Quick Rollback
```bash
# Revert to previous deployment in Vercel Dashboard
# Settings → Deployments → Click previous version → Promote to Production
```

### Git Rollback
```bash
cd c:\Users\LENOVO\Desktop\cursor
git log --oneline -5
git revert HEAD
git push origin main
```

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Resend Docs**: https://resend.com/docs
- **Calendly Embed**: https://help.calendly.com/hc/en-us/articles/223147027

---

## Next Steps After Successful Deployment

1. **Marketing**
   - Share updated contact page
   - Promote easy scheduling via Calendly
   - Highlight AI chat assistance

2. **Analytics**
   - Set up Google Analytics (if not already)
   - Track form submissions
   - Monitor chat engagement

3. **Lead Management**
   - Set up process for responding to submissions
   - Create email templates for follow-up
   - Consider CRM integration

4. **Optimization**
   - Monitor which industries submit most
   - A/B test contact form copy
   - Optimize chatbot responses based on common questions

---

**Deployment Date:** _____________
**Deployed By:** _____________
**Production URL:** _____________
**Status:** ⬜ In Progress | ⬜ Complete | ⬜ Issues Found
