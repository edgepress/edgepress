# Authentication Setup Guide

This guide explains how to set up the authentication system for EdgePress.

## Overview

The authentication system uses [better-auth](https://better-auth.com) with the following features:

- Email/Password authentication
- Social authentication (Google, GitHub, Microsoft)
- Session management
- Route protection via middleware
- Logout functionality

## Environment Variables

Create a `.env.local` file in the `apps/web` directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/edgepress"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-secret-key-here"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth (optional)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Microsoft OAuth (optional)
MICROSOFT_CLIENT_ID="your-microsoft-client-id"
MICROSOFT_CLIENT_SECRET="your-microsoft-client-secret"

# App Configuration
NEXT_PUBLIC_APP_URL="http://app.localhost:3000"
```

## Social Authentication Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://app.localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google` (for production)

### GitHub OAuth

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL:
   - `http://app.localhost:3000/api/auth/callback/github`
   - `https://yourdomain.com/api/auth/callback/github` (for production)

### Microsoft OAuth

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to Azure Active Directory > App registrations
3. Create a new registration
4. Add redirect URIs:
   - `http://app.localhost:3000/api/auth/callback/microsoft`
   - `https://yourdomain.com/api/auth/callback/microsoft` (for production)

## Database Setup

The authentication system requires database tables for users, sessions, and accounts. These are automatically created by better-auth when using Prisma.

Make sure your Prisma schema includes the necessary models for better-auth.

## Route Protection

### Server-side Protection

Routes under `/app.edgepress.co/(app-layout)` are automatically protected by:

1. **Middleware**: `apps/web/lib/middleware/app.ts` checks authentication status
2. **Layout**: `apps/web/app/app.edgepress.co/(app-layout)/layout.tsx` verifies session

### Client-side Protection

For client-side route protection, use the `AuthGuard` component:

```tsx
import { AuthGuard } from "@/components/auth/auth-guard";

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <div>This content is only visible to authenticated users</div>
    </AuthGuard>
  );
}
```

## Authentication Hook

Use the `useAuth` hook for client-side authentication state:

```tsx
import { useAuth } from "@/lib/hooks/use-auth";

export default function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please log in</div>;

  return <div>Welcome, {user.name}!</div>;
}
```

## API Routes

Authentication API routes are handled by better-auth at `/api/auth/*`:

- `/api/auth/sign-in` - Sign in endpoint
- `/api/auth/sign-up` - Sign up endpoint
- `/api/auth/sign-out` - Sign out endpoint
- `/api/auth/session` - Get current session
- `/api/auth/callback/*` - OAuth callback endpoints

## Pages

- `/login` - Login page with tabs for sign in and sign up
- `/signup` - Signup page (defaults to sign up tab)

## Components

- `SignIn` - Email/password and social sign in form
- `SignUp` - Email/password registration form
- `NavUser` - User dropdown with logout functionality
- `AuthGuard` - Client-side route protection component

## Security Features

- CSRF protection
- Secure session management
- Password hashing
- Rate limiting (can be configured)
- Trusted origins configuration

## Troubleshooting

### Common Issues

1. **Redirect loops**: Check that middleware is properly configured
2. **Social auth not working**: Verify OAuth app settings and callback URLs
3. **Database errors**: Ensure Prisma schema is up to date and database is running
4. **Session not persisting**: Check cookie settings and HTTPS configuration

### Debug Mode

Set `NODE_ENV=development` to enable debug logging for better-auth. 
