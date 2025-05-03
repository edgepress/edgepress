import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/app/stats-card";
import { PostList } from "@/components/app/article-list";
import { 
  FileText, 
  FileEdit, 
  Eye, 
  ThumbsUp 
} from "lucide-react";

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
          title="Total Posts" 
          value={3} 
          icon={<FileText className="h-5 w-5" />}
          description="All time" 
        />
        <StatsCard 
          title="Published" 
          value={2} 
          icon={<FileText className="h-5 w-5" />}
          description="Live on site" 
        />
        <StatsCard 
          title="Total Views" 
          value="2,096" 
          icon={<Eye className="h-5 w-5" />}
          trend="up"
          trendValue="12%"
          description="vs last month" 
        />
        <StatsCard 
          title="Engagement" 
          value="96" 
          icon={<ThumbsUp className="h-5 w-5" />}
          description="Likes and comments" 
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/posts">View all</Link>
          </Button>
        </div>
        <PostList />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Draft Posts</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/drafts">View all drafts</Link>
          </Button>
        </div>
        <PostList status="draft" />
      </div>
    </div>
  );
} 
