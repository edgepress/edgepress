import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from '@/lib/middleware/utils/parse';
import { ADMIN_HOSTNAMES, APP_HOSTNAMES, CHECKOUT_HOSTNAMES } from '@/lib/constants';
import { AdminMiddleware, AppMiddleware, SiteMiddleware, CheckoutMiddleware } from '@/lib/middleware';

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
  const { domain, path } = parse(request);

  if (!domain) {
    return NextResponse.redirect(new URL('/home', request.url));
  }
  
  if (domain.startsWith('localhost')) {
    return NextResponse.next();
  }

  const isAdminHost = ADMIN_HOSTNAMES.has(domain);
  const isAppHost = APP_HOSTNAMES.has(domain);
  const isCheckoutHost = CHECKOUT_HOSTNAMES.has(domain);
  if (isAdminHost) {
    return AdminMiddleware(request);
  }

  if (isAppHost) {
    return AppMiddleware(request);
  }

  if (isCheckoutHost) {
    return CheckoutMiddleware(request);
  }

  return SiteMiddleware(request);
}
