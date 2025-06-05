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
    const { member, session, site } = await getUserMemberInfo(await headers());

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!member || !site) {
      return NextResponse.json({ 
        error: "No site found for this organization" 
      }, { status: 400 });
    }

    const body = await request.json();
    const { 
      category, 
      content, 
      isMarkdown = false, 
      postId = null, // For updating existing posts
      title
    } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    if (!content || (Array.isArray(content) && content.length === 0)) {
      return NextResponse.json({ error: "Content is required for publishing" }, { status: 400 });
    }

    // Find or create category
    const categoryRecord = await findOrCreateCategory(category, site.id);

    // Serialize content
    const serializedContent = serializeContent(content);

    let post;

    if (postId) {
      // Update existing post and publish it
      post = await prisma.post.update({
        data: {
          categoryId: categoryRecord.id,
          content: serializedContent,
          excerpt: generateExcerpt(content),
          isMarkdown,
          title,
          updatedAt: new Date(), // Explicitly update timestamp
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
      // Create new post and publish it
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
      message: "Post published successfully",
      post: {
        id: post.id,
        author: post.author.user.name,
        category: post.category.name,
        createdAt: post.createdAt,
        slug: post.slug,
        title: post.title,
        updatedAt: post.updatedAt,
        url: `/${post.slug}`, // You might want to adjust this based on your URL structure
      },
      success: true
    });

  } catch (error) {
    console.error("Error publishing post:", error);
    return NextResponse.json(
      { error: "Failed to publish post" },
      { status: 500 }
    );
  }
} 
