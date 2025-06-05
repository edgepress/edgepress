import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// Generate a URL-friendly slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single dash
    .trim();
}

// Create excerpt from content
export function generateExcerpt(content: any): string {
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

// Get user session and member information
export async function getUserMemberInfo(headers: Headers) {
  try {
    console.log('Getting session...');
    const session = await auth.api.getSession({ headers });
    
    if (!session) {
      console.log('No session found');
      return { error: 'No active session', member: null, session: null, site: null };
    }

    console.log('Session found for user:', session.user?.id);

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

    if (!member) {
      console.log('No member found for user:', session.user.id);
      return { error: 'User is not a member of any organization', member: null, session, site: null };
    }

    console.log('Member found:', member.id, 'for organization:', member.organization.name);

    const site = member?.organization.sites[0] || null;

    if (!site) {
      console.log('No site found for organization:', member.organization.id);
      return { error: 'No site found for this organization', member, session, site: null };
    }

    console.log('Site found:', site.id, site.name);

    return { error: null, member, session, site };
  } catch (error) {
    console.error('Error in getUserMemberInfo:', error);
    return { error: 'Authentication error', member: null, session: null, site: null };
  }
}

// Find or create category
export async function findOrCreateCategory(category: string | null, siteId: string) {
  if (category) {
    const categorySlug = generateSlug(category);
    return await prisma.category.upsert({
      create: {
        name: category,
        siteId,
        slug: categorySlug,
      },
      update: {},
      where: {
        slug: categorySlug,
      },
    });
  } else {
    // Create or get default category
    return await prisma.category.upsert({
      create: {
        name: 'Uncategorized',
        siteId,
        slug: 'uncategorized',
      },
      update: {},
      where: {
        slug: 'uncategorized',
      },
    });
  }
}

// Generate unique slug for posts
export async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;
  
  while (await prisma.post.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

// Serialize content for database storage
export function serializeContent(content: any): string {
  return typeof content === 'string' ? content : JSON.stringify(content);
} 
