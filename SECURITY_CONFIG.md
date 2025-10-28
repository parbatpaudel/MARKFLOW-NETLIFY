# Security Configuration Guide

This guide explains how to securely configure your environment variables for the application.

## Environment Variables Setup

### 1. Create .env.local file

Copy the example file and fill in your actual values:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your actual configuration values.

### 2. Database Configuration

Your Neon database connection string should follow this format:

```
DATABASE_URL=postgresql://username:password@hostname:port/database_name?sslmode=require&channel_binding=require
```

Example:
```
DATABASE_URL=postgresql://neondb_owner:npg_J4OqyEQzfr1T@ep-falling-heart-aegm91jn-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

**Security Notes:**
- Never commit your `.env.local` file to version control
- The `.gitignore` file already includes `.env.local` for protection
- Always use `sslmode=require` for encrypted connections
- Use the pooler URL for better connection management

### 3. Sensitive Data Handling

The application implements several security measures:

#### Input Sanitization
- All form inputs are sanitized to prevent XSS attacks
- String length limits prevent buffer overflow attacks
- HTML/script tags are stripped from user inputs

#### Error Handling
- Generic error messages prevent information leakage
- Detailed errors are only logged server-side
- Database errors don't expose internal structure

#### Environment Variable Protection
- Sensitive values are never exposed in API responses
- Debug endpoints are disabled in production
- Environment variables are validated on startup

### 4. Production Security

Before deploying to production:

1. **Verify SSL Configuration**
   - Ensure `sslmode=require` is in your DATABASE_URL
   - Check that your Neon database has SSL enabled

2. **Set Strong Secrets**
   - Generate a strong `NEXTAUTH_SECRET`:
     ```bash
     openssl rand -base64 32
     ```

3. **Disable Debug Endpoints**
   - The debug environment endpoint only works in development mode
   - Never expose sensitive debug information in production

4. **Review Public Variables**
   - Only `NEXT_PUBLIC_*` variables are exposed to the client
   - Never put secrets in public environment variables

### 5. Testing Security

You can test your configuration in development:

1. Visit `/debug-env` to check environment variable setup
2. Use `/test-form-submission` to test form handling
3. Check server logs for any security warnings

### 6. Best Practices

1. **Regular Rotation**
   - Rotate database passwords periodically
   - Update API keys and secrets regularly

2. **Access Control**
   - Use least-privilege database users
   - Restrict database access to only necessary operations

3. **Monitoring**
   - Monitor server logs for suspicious activity
   - Set up alerts for failed login attempts

4. **Backup**
   - Regularly backup your database
   - Test restoration procedures

By following these guidelines, your application will maintain a secure configuration while properly connecting to your Neon database.