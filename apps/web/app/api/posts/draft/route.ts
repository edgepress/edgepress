import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import {
  findOrCreateCategory,
  generateExcerpt,
  generateUniqueSlug,
  getUserMemberInfo,
  serializeContent
} from "@/lib/api-utils";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { error, member, session, site } = await getUserMemberInfo(await headers());

    if (!session) {
      return NextResponse.json({ 
        code: "UNAUTHORIZED",
        error: error || "Please log in to save posts"
      }, { status: 401 });
    }

    if (!member) {
      return NextResponse.json({ 
        code: "NO_ORGANIZATION_MEMBERSHIP",
        error: error || "You need to be a member of an organization to create posts"
      }, { status: 403 });
    }

    if (!site) {
      return NextResponse.json({ 
        code: "NO_SITE_FOUND",
        error: error || "No site found for your organization"
      }, { status: 400 });
    }

    const body = await request.json();
    const { 
      category, 
      content, 
      isMarkdown = false, 
      postId = null, // For updating existing drafts
      title
    } = body;

    if (!title) {
      return NextResponse.json({ 
        code: "MISSING_TITLE",
        error: "Title is required" 
      }, { status: 400 });
    }

    // Find or create category
    const categoryRecord = await findOrCreateCategory(category, site.id);

    // Serialize content
    const serializedContent = serializeContent(content);

    let post;

    if (postId) {
      // Update existing draft
      post = await prisma.post.update({
        data: {
          categoryId: categoryRecord.id,
          content: serializedContent,
          excerpt: generateExcerpt(content),
          isMarkdown,
          title,
        },
        include: {
          author: {
            include: {
              user: true
            }
          },
          category: true
        },
        where: {
          id: postId,
          authorId: member.id, // Ensure user owns the post
        }
      });
    } else {
      // Create new draft
      const slug = await generateUniqueSlug(title);

      post = await prisma.post.create({
        data: {
          authorId: member.id,
          categoryId: categoryRecord.id,
          content: serializedContent,
          excerpt: generateExcerpt(content),
          isMarkdown,
          siteId: site.id,
          slug,
          title,
        },
        include: {
          author: {
            include: {
              user: true
            }
          },
          category: true
        }
      });
    }

    return NextResponse.json({
      message: "Draft saved successfully",
      post: {
        id: post.id,
        author: post.author.user.name,
        category: post.category.name,
        createdAt: post.createdAt,
        slug: post.slug,
        title: post.title,
        updatedAt: post.updatedAt,
      },
      success: true
    });

  } catch (error) {
    console.error("Error saving draft:", error);
    return NextResponse.json(
      { 
        code: "INTERNAL_ERROR",
        details: error instanceof Error ? error.message : 'Unknown error',
        error: "Failed to save draft"
      },
      { status: 500 }
    );
  }
} 
