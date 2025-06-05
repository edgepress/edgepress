import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { getUserMemberInfo } from "@/lib/api-utils";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { error, member, session, site } = await getUserMemberInfo(await headers());

    // Get some basic stats
    const stats = {
      totalMembers: await prisma.member.count(),
      totalOrganizations: await prisma.organization.count(),
      totalPosts: await prisma.post.count(),
      totalSites: await prisma.site.count(),
      totalUsers: await prisma.user.count(),
    };

    const debugInfo = {
      authentication: {
        error: error || null,
        hasMember: !!member,
        hasSession: !!session,
        hasSite: !!site,
        memberId: member?.id || null,
        organizationId: member?.organizationId || null,
        organizationName: member?.organization?.name || null,
        sessionUserEmail: session?.user?.email || null,
        sessionUserId: session?.user?.id || null,
        siteId: site?.id || null,
        siteName: site?.name || null,
      },
      database: {
        connected: true,
        stats,
      },
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(debugInfo);

  } catch (error) {
    console.error("Debug auth error:", error);
    return NextResponse.json({
      authentication: {
        error: error instanceof Error ? error.message : 'Unknown error',
        hasSession: false,
      },
      database: {
        connected: false,
        error: error instanceof Error ? error.message : 'Database connection failed',
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 
