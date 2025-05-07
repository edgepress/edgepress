import Link from 'next/link';

export const runtime = 'edge';

const topics = [
  { name: 'Edge Computing', slug: 'edge-computing', count: 1 },
  { name: 'Content Strategy', slug: 'content-strategy', count: 2 },
  { name: 'Performance', slug: 'performance', count: 1 },
  { name: 'Design', slug: 'design', count: 1 },
  { name: 'Development', slug: 'development', count: 2 },
  { name: 'SEO', slug: 'seo', count: 1 },
  { name: 'UI/UX', slug: 'ui-ux', count: 1 },
  { name: 'Mobile', slug: 'mobile', count: 1 },
  { name: 'Collaboration', slug: 'collaboration', count: 1 },
  { name: 'Real-time', slug: 'real-time', count: 1 },
  { name: 'Marketing', slug: 'marketing', count: 1 },
  { name: 'Growth', slug: 'growth', count: 1 }
];

export default function TopicsPage() {

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">All Topics</h1>
        <p className="text-xl text-muted-foreground">
          Browse content by topic to find exactly what you're looking for
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {topics.map(topic => (
          <Link
            key={topic.slug}
            href={`/topics/${topic.slug}`}
            className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-shadow"
          >
            <div className="font-bold text-lg mb-1">{topic.name}</div>
            <div className="text-sm text-muted-foreground">{topic.count} article{topic.count !== 1 ? 's' : ''}</div>
          </Link>
        ))}
      </div>
      
      <div className="mt-12 border-t pt-8">
        <Link href={`/`} className="flex items-center text-muted-foreground hover:text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to home
        </Link>
      </div>
    </div>
  );
} 
