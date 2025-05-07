import Image from 'next/image';
import Link from 'next/link';

export async function generateStaticParams() {
  return [];
}


const topicPosts = {
  'edge-computing': [
    {
      slug: 'featured-post',
      title: 'The Future of Content Management in the Edge Computing Era',
      excerpt: 'Explore how edge computing is transforming the way we create, manage, and distribute content across the web.',
      publishedAt: 'June 12, 2023',
      readingTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
      author: {
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce',
      }
    }
  ],
  'content-strategy': [
    {
      slug: 'featured-post',
      title: 'The Future of Content Management in the Edge Computing Era',
      excerpt: 'Explore how edge computing is transforming the way we create, manage, and distribute content across the web.',
      publishedAt: 'June 12, 2023',
      readingTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
      author: {
        name: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce',
      }
    },
    {
      slug: 'content-strategy',
      title: 'Developing an Effective Content Strategy for 2023',
      excerpt: 'How to create a content strategy that drives engagement and conversion in the modern digital landscape.',
      publishedAt: 'April 22, 2023',
      readingTime: '7 min read',
      coverImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
      author: {
        name: 'Jordan Smith',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      }
    }
  ],
  'performance': [
    {
      slug: 'performance-optimization',
      title: 'Performance Optimization for Content Delivery',
      excerpt: 'Tips and tricks to optimize your content delivery for lightning-fast performance.',
      publishedAt: 'May 5, 2023',
      readingTime: '6 min read',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      author: {
        name: 'Lisa Chen',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
      }
    }
  ],
  'design': [
    {
      slug: 'responsive-design',
      title: 'Responsive Design Patterns for Modern Web Apps',
      excerpt: 'Exploring effective responsive design strategies for content-heavy applications.',
      publishedAt: 'May 15, 2023',
      readingTime: '4 min read',
      coverImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766',
      author: {
        name: 'Miguel Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      }
    }
  ],
  'development': [
    {
      slug: 'performance-optimization',
      title: 'Performance Optimization for Content Delivery',
      excerpt: 'Tips and tricks to optimize your content delivery for lightning-fast performance.',
      publishedAt: 'May 5, 2023',
      readingTime: '6 min read',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      author: {
        name: 'Lisa Chen',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
      }
    },
    {
      slug: 'collaborative-editing',
      title: 'Building Real-time Collaborative Editing Tools',
      excerpt: 'A deep dive into the technology behind real-time collaborative content editing.',
      publishedAt: 'May 28, 2023',
      readingTime: '3 min read',
      coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      }
    }
  ],
  'seo': [
    {
      slug: 'modern-seo',
      title: 'Modern SEO Techniques for Content Creators',
      excerpt: 'Learn how search engine optimization has evolved and what strategies work best today.',
      publishedAt: 'April 10, 2023',
      readingTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a',
      author: {
        name: 'Taylor Wong',
        avatar: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7',
      }
    }
  ]
};

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  
  const topicKey = topic.toLowerCase();
  const posts = topicPosts[topicKey as keyof typeof topicPosts] || [];
  const topicTitle = topic.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Topic: {topicTitle}</h1>
        <p className="text-xl text-muted-foreground">
          Explore our articles about {topicTitle.toLowerCase()}
        </p>
      </header>
      
      {posts.length > 0 ? (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow flex flex-col">
              <Link href={`/posts/${post.slug}`} className="h-56 relative block">
                <Image 
                  src={post.coverImage} 
                  alt={post.title} 
                  fill
                  className="object-cover"
                />
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-3 line-clamp-2">
                  <Link href={`/posts/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-muted-foreground mb-6 line-clamp-3 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative mr-3">
                      <Image 
                        src={post.author.avatar} 
                        alt={post.author.name} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">{post.author.name}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {post.publishedAt} • {post.readingTime}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-2">No articles found</h2>
          <p className="text-muted-foreground">
            We couldn't find any articles for this topic. Check back later!
          </p>
        </div>
      )}
      
      <div className="mt-12 border-t pt-8">
        <Link href={`/posts`} className="flex items-center text-muted-foreground hover:text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to all posts
        </Link>
      </div>
    </div>
  );
} 
