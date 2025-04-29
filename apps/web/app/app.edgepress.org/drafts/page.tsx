import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArticleList } from "@/components/app/article-list";
import { PlusCircle } from "lucide-react";

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
          <Link href="/app.edgepress.org/articles/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Draft
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <ArticleList status="draft" />
      </div>
    </div>
  );
} 
