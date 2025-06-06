// import { parse } from "@edgepress/utils/middleware";
// import { prismaEdge } from "@edgepress/prisma/edge";
import { NextRequest, NextResponse } from 'next/server';
// import { getUserViaToken } from "./utils/get-user-via-token";

export default async function SiteMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const domain = req.headers.get('x-forwarded-host') || req.headers.get('host');

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

  return NextResponse.rewrite(
    new URL(`/${domain}${pathname === '/' ? '' : pathname}`, req.url)
  );
}
