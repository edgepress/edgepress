import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Generate a simple ID
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function POST(request: NextRequest) {
  try {
    // Get current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ 
        code: "UNAUTHORIZED",
        error: "Please log in first to set up your account"
      }, { status: 401 });
    }

    const userId = session.user.id;

    // Check if user already has setup
    const existingMember = await prisma.member.findFirst({
      include: {
        organization: {
          include: {
            sites: true
          }
        }
      },
      where: { userId }
    });

    if (existingMember && existingMember.organization.sites.length > 0) {
      const firstSite = existingMember.organization.sites[0]!;
      return NextResponse.json({
        data: {
          organizationId: existingMember.organization.id,
          organizationName: existingMember.organization.name,
          siteId: firstSite.id,
          siteName: firstSite.name,
        },
        message: "Account already set up",
        success: true
      });
    }

    // Create organization for the user
    const organization = await prisma.organization.create({
      data: {
        id: generateId(),
        createdAt: new Date(),
        name: `${session.user.name || session.user.email}'s Organization`,
        slug: `org-${Date.now()}`,
      }
    });

    // Add user as member of the organization
    const member = await prisma.member.create({
      data: {
        id: generateId(),
        createdAt: new Date(),
        organizationId: organization.id,
        role: 'admin',
        userId: userId,
      }
    });

    // Create a default site for the organization
    const site = await prisma.site.create({
      data: {
        domain: `site-${Date.now()}.edgepress.co`,
        name: `${session.user.name || session.user.email}'s Site`,
        organizationId: organization.id,
        subdomain: `site-${Date.now()}`,
      }
    });

    // Create default category
    const defaultCategory = await prisma.category.create({
      data: {
        name: 'Uncategorized',
        siteId: site.id,
        slug: 'uncategorized',
      }
    });

    return NextResponse.json({
      data: {
        defaultCategoryId: defaultCategory.id,
        memberId: member.id,
        organizationId: organization.id,
        organizationName: organization.name,
        siteId: site.id,
        siteName: site.name,
      },
      message: "Account setup completed successfully!",
      success: true
    });

  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { 
        code: "SETUP_ERROR",
        details: error instanceof Error ? error.message : 'Unknown error',
        error: "Failed to set up account"
      },
      { status: 500 }
    );
  }
} 
