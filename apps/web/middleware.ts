import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_HOSTNAMES, APP_HOSTNAMES } from '@/lib/constants';
import { AdminMiddleware, AppMiddleware, SiteMiddleware } from '@/lib/middleware';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (proxies for third-party services)
     * 4. Metadata files: favicon.ico, sitemap.xml, robots.txt, manifest.webmanifest
     */
    '/((?!api/|_next/|_proxy/|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest).*)',
  ],
};
export default async function middleware(request: NextRequest) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') as string;

  if (!host) {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  
  if (host.startsWith('localhost')) {
    return NextResponse.next();
  }

  const isAdminHost = ADMIN_HOSTNAMES.has(host);
  const isAppHost = APP_HOSTNAMES.has(host);

  if (isAdminHost) {
    return AdminMiddleware(request);
  }

  if (isAppHost) {
    return AppMiddleware(request);
  }

  return SiteMiddleware(request);
}
