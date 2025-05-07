import Image from 'next/image';
import Link from 'next/link';

export const runtime = 'edge';

const posts = [
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
    },
    tags: ['Edge Computing', 'Content Strategy', 'Performance']
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
    },
    tags: ['Collaboration', 'Development', 'Real-time']
  },
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
    },
    tags: ['Design', 'UI/UX', 'Mobile']
  },
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
    },
    tags: ['Performance', 'Optimization', 'Development']
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
    },
    tags: ['Content Strategy', 'Marketing', 'Planning']
  },
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
    },
    tags: ['SEO', 'Content Strategy', 'Growth']
  },
];

export default function PostsPage() {
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">All Articles</h1>
        <p className="text-xl text-muted-foreground">
          Explore our latest thoughts and insights on content management, design, and technology.
        </p>
      </header>
      
      {/* Filter options */}
      <div className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="font-medium">Browse by topic:</span>
          {['All', 'Edge Computing', 'Design', 'Development', 'Content Strategy', 'Performance', 'SEO'].map((tag) => (
            <Link 
              key={tag} 
              href={tag === 'All' ? '/posts' : `/topics/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className={`px-4 py-2 text-sm rounded-full ${
                tag === 'All' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-primary hover:text-primary-foreground transition-colors'
              }`}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
      
      {/* Posts grid */}
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
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.slice(0, 2).map(tag => (
                  <Link 
                    key={tag} 
                    href={`/topics/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-xs px-3 py-1 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              
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
      
      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <nav className="flex items-center space-x-2">
          <a className="p-2 border rounded hover:bg-muted cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </a>
          <a className="py-2 px-4 border rounded bg-primary text-primary-foreground cursor-pointer">1</a>
          <a className="py-2 px-4 border rounded hover:bg-muted cursor-pointer">2</a>
          <a className="py-2 px-4 border rounded hover:bg-muted cursor-pointer">3</a>
          <a className="p-2 border rounded hover:bg-muted cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  );
} 
