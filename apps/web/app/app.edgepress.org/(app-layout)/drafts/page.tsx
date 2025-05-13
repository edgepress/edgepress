
import { Button } from "@edgepress/ui/components/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

import { PostList } from "@/components/app/article-list";

export default function DraftsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Drafts</h1>
          <p className="text-muted-foreground mt-1">
            Continue working on your unpublished content
          </p>
        </div>
        <Button asChild>
          <Link href="/posts/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Draft
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <PostList status="draft" />
      </div>
    </div>
  );
} 
