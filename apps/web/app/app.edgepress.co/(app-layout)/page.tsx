import { Button } from "@edgepress/ui/components/button";
import { 
  Eye, 
  FileText, 
  ThumbsUp 
} from "lucide-react";
import Link from "next/link";

import { PostList } from "@/components/app/article-list";
import { StatsCard } from "@/components/app/stats-card";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your content and performance
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          value={3} 
          description="All time" 
          title="Total Posts"
          icon={<FileText className="h-5 w-5" />} 
        />
        <StatsCard 
          value={2} 
          description="Live on site" 
          title="Published"
          icon={<FileText className="h-5 w-5" />} 
        />
        <StatsCard 
          value="2,096" 
          description="vs last month" 
          title="Total Views"
          icon={<Eye className="h-5 w-5" />}
          trend="up"
          trendValue="12%" 
        />
        <StatsCard 
          value="96" 
          description="Likes and comments" 
          title="Engagement"
          icon={<ThumbsUp className="h-5 w-5" />} 
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
          <Button asChild size="sm" variant="outline">
            <Link href="/posts">View all</Link>
          </Button>
        </div>
        <PostList />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Draft Posts</h2>
          <Button asChild size="sm" variant="outline">
            <Link href="/drafts">View all drafts</Link>
          </Button>
        </div>
        <PostList status="draft" />
      </div>
    </div>
  );
} 
