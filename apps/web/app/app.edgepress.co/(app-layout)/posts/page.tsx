
import { Button } from "@edgepress/ui/components/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

import { PostList } from "@/components/app/article-list";

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Posts</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor all your published content
          </p>
        </div>
        <Button asChild>
          <Link href="/posts/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <PostList status="published" />
      </div>
    </div>
  );
} 
