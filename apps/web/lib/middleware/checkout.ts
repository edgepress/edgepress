import { NextRequest, NextResponse } from 'next/server';

export default async function CheckoutMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  return NextResponse.rewrite(
    new URL(`/checkout.edgepress.org${pathname === '/' ? '' : pathname}`, req.url)
  );
}
