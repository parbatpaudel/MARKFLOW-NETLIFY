# Netlify Secrets Scanning - Safe to Ignore

## These are NOT actual secrets - they are public environment variables

The following environment variables with `NEXT_PUBLIC_` prefix are INTENTIONALLY 
exposed in the client-side bundle and are NOT sensitive:

1. NEXT_PUBLIC_SUPABASE_URL
   - Public URL of your Supabase project
   - Not sensitive, needed for client connections
   - Protected by Row Level Security (RLS)

3. NEXT_PUBLIC_SUPABASE_ANON_KEY
   - Public anonymous key for Supabase
   - Safe to expose, has limited permissions
   - Protected by Supabase's security policies

4. NEXT_PUBLIC_FIREBASE_API_KEY
   - Firebase's public API key
   - Designed to be in client-side code
   - Reference: https://firebase.google.com/docs/projects/api-keys

## Why NEXT_PUBLIC_ variables are safe

Next.js uses the `NEXT_PUBLIC_` prefix to indicate variables that should be 
embedded in the client-side JavaScript bundle. These are:

- Intentionally public
- Required for frontend functionality
- Not sensitive credentials
- Protected by other security measures (API keys, CORS, RLS, etc.)

## Actual Secrets (Never Exposed)

The following are TRUE secrets and should ONLY be in Netlify Environment Variables:

- GOOGLE_CLIENT_SECRET (server-side only)
- NEXTAUTH_SECRET (server-side only)
- DATABASE_URL (server-side only)
- DATABASE_URL_UNPOOLED (server-side only)

These NEVER appear in client-side code and are not in the repository.

## Configuration Applied

In `netlify.toml`, we've configured:
```toml
SECRETS_SCAN_OMIT_KEYS = "NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_FIREBASE_API_KEY"
```

This tells Netlify's secrets scanner to ignore these public variables.
