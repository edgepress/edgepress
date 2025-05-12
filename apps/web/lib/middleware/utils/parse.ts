import { NextRequest } from "next/server";

export const parse = (req: NextRequest) => {
  let domain = req.headers.get("x-forwarded-host") || req.headers.get("host") as string;
  const path = req.nextUrl.pathname;

  domain = domain.replace(/^www./, '').toLowerCase();

  return {
    domain,
    path,
  }
}
