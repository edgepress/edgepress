import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Generate a URL-friendly slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single dash
    .trim();
}

// Create excerpt from content
function generateExcerpt(content: any): string {
  if (!content) return '';
  
  // If content is array of blocks (TextEditor format)
  if (Array.isArray(content)) {
    const textContent = content
      .map((block: any) => {
        if (block.type === 'paragraph' && block.content) {
          return block.content.map((item: any) => item.text || '').join('');
        }
        return '';
      })
      .join(' ')
      .trim();
    
    return textContent.substring(0, 160) + (textContent.length > 160 ? '...' : '');
  }
  
  // If content is string (Markdown format)
  if (typeof content === 'string') {
    const plainText = content.replace(/[#*`_~\[\]]/g, '').trim();
    return plainText.substring(0, 160) + (plainText.length > 160 ? '...' : '');
  }
  
  return '';
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { category, content, isMarkdown = false, isPublished = false, title } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    // Get user's member record for the current organization
    const member = await prisma.member.findFirst({
      include: {
        organization: {
          include: {
            sites: true
          }
        }
      },
      where: {
        organization: {
          members: {
            some: {
              userId: session.user.id
            }
          }
        },
        userId: session.user.id
      }
    });

    if (!member || !member.organization.sites.length) {
      return NextResponse.json({ 
        error: "No site found for this organization" 
      }, { status: 400 });
    }

    const site = member.organization.sites[0]; // Use first site
    
    if (!site) {
      return NextResponse.json({ 
        error: "No site found for this organization" 
      }, { status: 400 });
    }

    // Find or create category
    let categoryRecord;
    if (category) {
      const categorySlug = generateSlug(category);
      categoryRecord = await prisma.category.upsert({
        create: {
          name: category,
          siteId: site.id,
          slug: categorySlug,
        },
        update: {},
        where: {
          slug: categorySlug,
        },
      });
    } else {
      // Create or get default category
      categoryRecord = await prisma.category.upsert({
        create: {
          name: 'Uncategorized',
          siteId: site.id,
          slug: 'uncategorized',
        },
        update: {},
        where: {
          slug: 'uncategorized',
        },
      });
    }

    // Generate unique slug
    const baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;
    
    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Serialize content
    const serializedContent = typeof content === 'string' 
      ? content 
      : JSON.stringify(content);

    // Create post
    const post = await prisma.post.create({
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

    return NextResponse.json({
      post: {
        id: post.id,
        author: post.author.user.name,
        category: post.category.name,
        createdAt: post.createdAt,
        isPublished,
        slug: post.slug,
        title: post.title,
      },
      success: true
    });

  } catch (error) {
    console.error("Error saving post:", error);
    return NextResponse.json(
      { error: "Failed to save post" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const posts = await prisma.post.findMany({
      include: {
        author: {
          include: {
            user: true
          }
        },
        category: true
      },
      orderBy: {
        updatedAt: 'desc'
      },
      skip: offset,
      take: limit
    });

    return NextResponse.json({
      posts: posts.map(post => ({
        id: post.id,
        author: post.author.user.name,
        category: post.category.name,
        createdAt: post.createdAt,
        excerpt: post.excerpt,
        slug: post.slug,
        title: post.title,
        updatedAt: post.updatedAt,
      }))
    });

  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
} 
