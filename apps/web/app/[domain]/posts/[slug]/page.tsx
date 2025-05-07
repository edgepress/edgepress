import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readingTime: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
}

const posts: Record<string, Post> = {
  'featured-post': {
    slug: 'featured-post',
    title: 'The Future of Content Management in the Edge Computing Era',
    excerpt:
      'Explore how edge computing is transforming the way we create, manage, and distribute content across the web.',
    content: `
      <p>Edge computing is revolutionizing the way we think about content management systems (CMS). Traditional CMSes were built around the idea of centralized servers that store, process, and deliver content to end users. But as the web becomes more complex, and user expectations for performance continue to rise, this model is showing its limitations.</p>
      
      <h2>The Problem with Traditional Content Management</h2>
      
      <p>Traditional content management systems face several challenges in today's web environment:</p>
      
      <ul>
        <li><strong>Performance issues</strong>: Centralized servers can be geographically distant from users, causing latency.</li>
        <li><strong>Scalability limitations</strong>: Traffic spikes can overwhelm centralized architecture.</li>
        <li><strong>Complex infrastructure</strong>: Managing load balancers, caching systems, and CDNs adds complexity.</li>
        <li><strong>Limited user experiences</strong>: Traditional systems struggle to deliver the personalized, context-aware content users expect.</li>
      </ul>
      
      <h2>Enter Edge Computing</h2>
      
      <p>Edge computing moves processing and content delivery closer to the end user, often to the CDN edge nodes distributed around the world. This paradigm shift offers remarkable benefits for content management:</p>
      
      <ul>
        <li><strong>Dramatically faster load times</strong>: Content is served from the edge node closest to the user.</li>
        <li><strong>Better scalability</strong>: Edge networks scale automatically to handle traffic spikes.</li>
        <li><strong>Reduced server load</strong>: Processing is distributed across the edge network.</li>
        <li><strong>Enhanced personalization</strong>: Edge functions can customize content based on user context.</li>
      </ul>
      
      <h2>Edge-First CMSes are the Future</h2>
      
      <p>The next generation of content management systems are being built with edge computing principles from the ground up. These systems offer:</p>
      
      <ul>
        <li><strong>Global data replication</strong>: Content is automatically distributed to edge nodes worldwide.</li>
        <li><strong>Edge rendering</strong>: Pages are generated at the edge, not on a central server.</li>
        <li><strong>Intelligent caching</strong>: Cache invalidation happens automatically across the edge network.</li>
        <li><strong>Real-time collaboration</strong>: Multiple editors can work on content simultaneously.</li>
      </ul>
      
      <p>As we look to the future, edge computing will continue to transform content management, making websites faster, more reliable, and more capable of delivering the experiences users demand.</p>
    `,
    publishedAt: 'June 12, 2023',
    readingTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    author: {
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce',
      role: 'CTO, EdgePress',
    },
    tags: ['Edge Computing', 'Content Strategy', 'Performance'],
  },
  'collaborative-editing': {
    slug: 'collaborative-editing',
    title: 'Building Real-time Collaborative Editing Tools',
    excerpt:
      'A deep dive into the technology behind real-time collaborative content editing.',
    content: `
      <p>Real-time collaborative editing has transformed the way teams work together. Google Docs led the way, showing that multiple people could simultaneously edit a document without conflicts. Now, this capability is becoming an expected feature in content management systems.</p>

      <h2>The Technical Challenges</h2>

      <p>Building collaborative editing systems presents unique challenges:</p>

      <ul>
        <li><strong>Conflict resolution</strong>: Managing simultaneous edits without data loss</li>
        <li><strong>State synchronization</strong>: Keeping all users' views consistent</li>
        <li><strong>Network latency</strong>: Handling delays while maintaining responsiveness</li>
        <li><strong>Offline support</strong>: Allowing work to continue without internet connection</li>
      </ul>

      <h2>CRDTs: The Foundation of Modern Collaboration</h2>

      <p>Conflict-free Replicated Data Types (CRDTs) have emerged as the solution to many of these problems. CRDTs are data structures that allow multiple users to make concurrent updates without coordination, automatically resolving conflicts in a predictable way.</p>

      <p>This mathematical foundation allows collaborative editors to function without relying on a central server to resolve conflicts, making them ideal for edge computing environments where latency to a central server could degrade the user experience.</p>

      <h2>Implementing Collaborative Editing in Modern Web Apps</h2>

      <p>Today's collaborative editing libraries like Yjs, Automerge, and ShareDB make it easier than ever to add real-time collaboration to web applications. These libraries handle the complex synchronization logic, allowing developers to focus on building great user experiences.</p>

      <p>When combined with WebSockets or WebRTC, these technologies enable true peer-to-peer collaborative editing with minimal latency, creating a seamless experience for users regardless of their location.</p>

      <h2>The Future: Collaboration Everywhere</h2>

      <p>As collaborative editing technology matures, we're moving toward a future where collaboration isn't just a feature, but a fundamental aspect of how content is created and managed. From blog posts to code, from design files to databases, the ability to work together in real-time is becoming universal.</p>

      <p>This shift will continue to transform how teams work, making collaboration more efficient and enabling new workflows that weren't possible with traditional, single-user editing systems.</p>
    `,
    publishedAt: 'May 28, 2023',
    readingTime: '3 min read',
    coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      role: 'Lead Developer, EdgePress',
    },
    tags: ['Collaboration', 'Development', 'Real-time'],
  },
  'responsive-design': {
    slug: 'responsive-design',
    title: 'Responsive Design Patterns for Modern Web Apps',
    excerpt:
      'Exploring effective responsive design strategies for content-heavy applications.',
    content: `
      <p>Responsive design has evolved significantly since Ethan Marcotte first coined the term in 2010. While the core principles remain the same—fluid grids, flexible images, and media queries—today's web applications demand more sophisticated approaches to create truly device-agnostic experiences.</p>

      <h2>Beyond Breakpoints: Modern Responsive Design</h2>

      <p>Modern responsive design goes beyond simply adapting layouts at different screen sizes. It encompasses:</p>

      <ul>
        <li><strong>Container queries</strong>: Styling based on component size rather than viewport size</li>
        <li><strong>Responsive typography</strong>: Fluid type scales that adapt seamlessly across devices</li>
        <li><strong>Variable layouts</strong>: Using CSS Grid and Flexbox for dynamic, content-aware layouts</li>
        <li><strong>Feature detection</strong>: Adapting to device capabilities, not just screen sizes</li>
      </ul>

      <h2>Responsive Patterns for Content-Rich Applications</h2>

      <p>Content management systems face unique responsive design challenges. Articles, media galleries, dashboards, and editing interfaces all require thoughtful approaches to maintain usability across devices.</p>

      <p>Some effective patterns include:</p>

      <ul>
        <li><strong>Progressive disclosure</strong>: Revealing features and options as needed</li>
        <li><strong>Priority navigation</strong>: Adapting menus to prioritize the most important items</li>
        <li><strong>Responsive data tables</strong>: Reimagining tabular data for small screens</li>
        <li><strong>Adaptive media</strong>: Serving appropriate image and video sizes and formats</li>
      </ul>

      <h2>Performance as a Design Concern</h2>

      <p>Responsive design and performance are inseparable. A beautifully adaptive layout is meaningless if it's too slow to load. Modern responsive design practices include:</p>

      <ul>
        <li><strong>Responsive loading</strong>: Loading only what's needed for the current viewport</li>
        <li><strong>Image optimization</strong>: Using next-gen formats and responsive images</li>
        <li><strong>Font loading strategies</strong>: Preventing layout shifts and font flashing</li>
        <li><strong>Component-level code splitting</strong>: Loading JavaScript as needed</li>
      </ul>

      <h2>Testing Across Ecosystems</h2>

      <p>With the diversity of devices and browsers in use today, comprehensive testing is essential. This includes:</p>

      <ul>
        <li><strong>Device testing</strong>: Checking real devices, not just browser emulations</li>
        <li><strong>Browser compatibility</strong>: Testing across browser engines and versions</li>
        <li><strong>Accessibility testing</strong>: Ensuring usability for all users</li>
        <li><strong>Connection testing</strong>: Verifying performance on various network conditions</li>
      </ul>

      <p>By embracing these modern responsive design principles, content-heavy web applications can provide exceptional user experiences regardless of how, where, or on what device users access them.</p>
    `,
    publishedAt: 'May 15, 2023',
    readingTime: '4 min read',
    coverImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766',
    author: {
      name: 'Miguel Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      role: 'Design Lead, EdgePress',
    },
    tags: ['Design', 'UI/UX', 'Mobile'],
  },
  'performance-optimization': {
    slug: 'performance-optimization',
    title: 'Performance Optimization for Content Delivery',
    excerpt:
      'Tips and tricks to optimize your content delivery for lightning-fast performance.',
    content: `
      <p>Web performance is not just a technical concern—it's a critical business metric that directly impacts user engagement, conversion rates, and search engine rankings. For content-heavy websites, optimizing performance requires a holistic approach that addresses every aspect of the content delivery pipeline.</p>

      <h2>Understanding Core Web Vitals</h2>

      <p>Google's Core Web Vitals have become the industry standard for measuring user-centric performance. These metrics focus on:</p>

      <ul>
        <li><strong>Largest Contentful Paint (LCP)</strong>: How quickly the main content loads</li>
        <li><strong>First Input Delay (FID)</strong>: How quickly the page becomes interactive</li>
        <li><strong>Cumulative Layout Shift (CLS)</strong>: How stable the page is as it loads</li>
      </ul>

      <p>For content websites, these metrics are particularly important as users have high expectations for fast, stable reading experiences.</p>

      <h2>Edge Delivery for Faster Content</h2>

      <p>Edge computing has transformed content delivery by moving processing closer to the user. This approach offers several performance benefits:</p>

      <ul>
        <li><strong>Reduced latency</strong>: Serving content from the closest physical location</li>
        <li><strong>Edge rendering</strong>: Generating HTML at the edge rather than on a central server</li>
        <li><strong>Smart caching</strong>: Caching content intelligently based on patterns and rules</li>
        <li><strong>Instant invalidation</strong>: Updating content across the global edge network in milliseconds</li>
      </ul>

      <h2>Optimizing Media for the Modern Web</h2>

      <p>Images and videos typically comprise the majority of a content site's bandwidth. Modern optimization techniques include:</p>

      <ul>
        <li><strong>Next-gen formats</strong>: Using WebP, AVIF, and MP4 with AV1</li>
        <li><strong>Responsive images</strong>: Serving different sizes based on viewport dimensions</li>
        <li><strong>Lazy loading</strong>: Loading media only when it's about to enter the viewport</li>
        <li><strong>Video optimization</strong>: Compressing videos and using appropriate delivery methods</li>
      </ul>

      <h2>JavaScript Performance for Rich Experiences</h2>

      <p>Interactive content experiences often rely on JavaScript, which can impact performance if not optimized:</p>

      <ul>
        <li><strong>Code splitting</strong>: Loading only the code needed for the current page</li>
        <li><strong>Tree shaking</strong>: Eliminating unused code from bundles</li>
        <li><strong>Deferred execution</strong>: Prioritizing critical JavaScript and deferring the rest</li>
        <li><strong>Worker threads</strong>: Moving intensive operations off the main thread</li>
      </ul>

      <h2>Measuring and Iterating</h2>

      <p>Performance optimization is not a one-time task but an ongoing process. Effective measurement and iteration involve:</p>

      <ul>
        <li><strong>Real User Monitoring (RUM)</strong>: Collecting performance data from actual users</li>
        <li><strong>Synthetic testing</strong>: Running controlled tests in lab environments</li>
        <li><strong>Performance budgets</strong>: Setting and enforcing limits on metrics</li>
        <li><strong>Continuous integration</strong>: Automatically testing performance on every code change</li>
      </ul>

      <p>By adopting these performance optimization strategies, content publishers can deliver fast, engaging experiences that keep users coming back for more.</p>
    `,
    publishedAt: 'May 5, 2023',
    readingTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    author: {
      name: 'Lisa Chen',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
      role: 'Performance Engineer, EdgePress',
    },
    tags: ['Performance', 'Optimization', 'Development'],
  },
};

function getPostBySlug(slug: string) {
  return posts[slug];
}

function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit: number = 2
) {
  return Object.values(posts)
    .filter(
      (post) =>
        post.slug !== currentSlug && post.tags.some((tag) => tags.includes(tag))
    )
    .slice(0, limit);
}

export async function generateStaticParams() {
  return [];
}

export default async function PostPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.tags);

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <header className='mb-10'>
        <div className='flex items-center gap-2 text-sm text-muted-foreground mb-4'>
          <span>{post.publishedAt}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
          <span>•</span>
          <div className='flex gap-2'>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/topics/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className='hover:text-primary'
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6'>
          {post.title}
        </h1>
        <p className='text-xl text-muted-foreground mb-6'>{post.excerpt}</p>

        <div className='flex items-center gap-4'>
          <div className='w-12 h-12 rounded-full overflow-hidden relative'>
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className='object-cover'
            />
          </div>
          <div>
            <div className='font-medium'>{post.author.name}</div>
            <div className='text-sm text-muted-foreground'>
              {post.author.role}
            </div>
          </div>
        </div>
      </header>

      <div className='rounded-xl overflow-hidden w-full h-72 md:h-96 relative mb-10'>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className='object-cover'
          priority
        />
      </div>

      <article className='prose prose-lg max-w-none mb-16'>
        <div dangerouslySetInnerHTML={{__html: post.content}} />
      </article>

      <div className='mb-16'>
        <h3 className='text-lg font-medium mb-4'>Topics</h3>
        <div className='flex flex-wrap gap-2'>
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/topics/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className='px-4 py-2 bg-muted text-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors'
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      <section className='mb-12'>
        <h2 className='text-2xl font-bold mb-6'>Related Articles</h2>
        <div className='grid gap-8 md:grid-cols-2'>
          {relatedPosts.map((related) => (
            <article
              key={related.slug}
              className='bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow'
            >
              <div className='h-48 relative'>
                <Image
                  src={related.coverImage}
                  alt={related.title}
                  fill
                  className='object-cover'
                />
              </div>
              <div className='p-5'>
                <div className='text-sm text-muted-foreground mb-2'>
                  {related.publishedAt} • {related.readingTime}
                </div>
                <h3 className='text-xl font-bold mb-3'>
                  <Link
                    href={`/posts/${related.slug}`}
                    className='hover:text-primary'
                  >
                    {related.title}
                  </Link>
                </h3>
                <p className='text-muted-foreground mb-4'>{related.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className='border-t pt-8'>
        <Link
          href={`/posts`}
          className='flex items-center text-muted-foreground hover:text-primary'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='mr-2 h-4 w-4'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            />
          </svg>
          Back to all posts
        </Link>
      </div>
    </div>
  );
}
