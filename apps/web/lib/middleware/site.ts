// import { parse } from "@repo/utils/middleware";
// import { prismaEdge } from "@repo/prisma/edge";
import { NextRequest, NextResponse } from 'next/server';
// import { getUserViaToken } from "./utils/get-user-via-token";

export default async function SiteMiddleware(req: NextRequest) {
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

  return NextResponse.rewrite(
    new URL(`/[domain]${pathname === '/' ? '' : pathname}`, req.url)
  );
}
