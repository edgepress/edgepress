// import { parse } from "@edgepress/utils/middleware";
// import { prismaEdge } from "@edgepress/prisma/edge";
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
// import { getUserViaToken } from "./utils/get-user-via-token";

export default async function AppMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // const user = await getUserViaToken(req);

  // if (!user && path !== "/login") {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // } else if (user) {
  //   const isAdminUser = await prismaEdge.projectUsers.findUnique({
  //     where: {
  //       userId_projectId: {
  //         userId: user.id,
  //       },
  //     },
  //   });

  //   if (!isAdminUser) {
  //     return NextResponse.next(); // throw 404 page
  //   } else if (path === "/login") {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  // }

  // Allow access to login and signup pages without authentication
  if (pathname.startsWith('/login') || pathname.startsWith('/signup')) {
    return NextResponse.rewrite(
      new URL(`/app.edgepress.co${pathname}`, req.url)
    );
  }

  try {
    // Check if user is authenticated using better-auth
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      // User is not authenticated, redirect to login
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // User is authenticated, allow access to protected routes
    return NextResponse.rewrite(
      new URL(`/app.edgepress.co${pathname === '/' ? '' : pathname}`, req.url)
    );
  } catch (error) {
    // Error checking authentication, redirect to login
    console.error('Authentication check failed:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
