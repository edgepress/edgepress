import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  return [];
}

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">EdgePress Blog</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Thoughts, stories and ideas about content management and publishing
        </p>
        
        {/* Featured Post */}
        <div className="bg-muted rounded-xl overflow-hidden shadow-sm">
          <div className="md:flex">
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <Image 
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643" 
                alt="Featured post" 
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 md:w-1/2 md:p-8">
              <div className="text-sm text-muted-foreground mb-2">June 12, 2023 • 5 min read</div>
              <h2 className="text-2xl font-bold mb-4">
                <Link href="/posts/featured-post" className="hover:text-primary">
                  The Future of Content Management in the Edge Computing Era
                </Link>
              </h2>
              <p className="text-muted-foreground mb-6">
                Explore how edge computing is transforming the way we create, manage, and distribute content across the web.
              </p>
              <Link 
                href="/posts/featured-post" 
                className="inline-flex items-center font-medium text-primary hover:underline"
              >
                Read more
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Posts */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Recent Posts</h2>
          <Link href="/posts" className="text-primary hover:underline">
            View all
          </Link>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Post 1 */}
          <article className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="h-48 relative">
              <Image 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                alt="Blog post" 
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <div className="text-sm text-muted-foreground mb-2">May 28, 2023 • 3 min read</div>
              <h3 className="text-xl font-bold mb-3">
                <Link href="/posts/collaborative-editing" className="hover:text-primary">
                  Building Real-time Collaborative Editing Tools
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4">
                A deep dive into the technology behind real-time collaborative content editing.
              </p>
            </div>
          </article>
          
          {/* Post 2 */}
          <article className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="h-48 relative">
              <Image 
                src="https://images.unsplash.com/photo-1558655146-d09347e92766" 
                alt="Blog post" 
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <div className="text-sm text-muted-foreground mb-2">May 15, 2023 • 4 min read</div>
              <h3 className="text-xl font-bold mb-3">
                <Link href="/posts/responsive-design" className="hover:text-primary">
                  Responsive Design Patterns for Modern Web Apps
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4">
                Exploring effective responsive design strategies for content-heavy applications.
              </p>
            </div>
          </article>
          
          {/* Post 3 */}
          <article className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="h-48 relative">
              <Image 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" 
                alt="Blog post" 
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <div className="text-sm text-muted-foreground mb-2">May 5, 2023 • 6 min read</div>
              <h3 className="text-xl font-bold mb-3">
                <Link href="/posts/performance-optimization" className="hover:text-primary">
                  Performance Optimization for Content Delivery
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4">
                Tips and tricks to optimize your content delivery for lightning-fast performance.
              </p>
            </div>
          </article>
        </div>
      </section>
      
      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Explore Topics</h2>
        <div className="flex flex-wrap gap-2">
          {['Technology', 'Design', 'Content Strategy', 'Development', 'UI/UX', 'Performance'].map((tag) => (
            <Link 
              key={tag} 
              href={`/topics/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 bg-muted text-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="bg-muted p-8 rounded-xl">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-2/3 mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Subscribe to our newsletter</h2>
            <p className="text-muted-foreground">
              Get the latest posts and updates delivered to your inbox.
            </p>
          </div>
          <div className="md:w-1/3">
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 rounded-md border border-border bg-background"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
