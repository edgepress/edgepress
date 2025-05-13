import { Button } from "@edgepress/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@edgepress/ui/components/dropdown-menu";
import { 
  CalendarDays, 
  Edit, 
  Eye, 
  MoreHorizontal, 
  Trash 
} from "lucide-react";
import Link from "next/link";

// 模擬文章資料
const mockPosts = [
  {
    id: "1",
    createdAt: "2023-09-15",
    excerpt: "Learn how to build modern web applications with Next.js...",
    status: "published",
    title: "Getting Started with Next.js",
    views: 1240,
  },
  {
    id: "2",
    createdAt: "2023-10-05",
    excerpt: "TypeScript adds static type definitions to JavaScript, helping...",
    status: "published",
    title: "The Power of TypeScript",
    views: 856,
  },
  {
    id: "3",
    createdAt: "2023-11-20",
    excerpt: "Tailwind CSS is a utility-first CSS framework packed with...",
    status: "draft",
    title: "Mastering Tailwind CSS",
    views: 0,
  },
];

export function PostList({ status = "all" }: { status?: "all" | "draft" | "published" }) {
  // 根據狀態過濾文章
  const posts = status === "all" 
    ? mockPosts 
    : mockPosts.filter(article => 
        status === "draft" 
          ? article.status === "draft" 
          : article.status === "published"
      );

  return (
    <div className="space-y-4">
      {posts.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-muted-foreground">No articles found</p>
        </div>
      ) : (
        posts.map((post) => (
          <div 
            key={post.id} 
            className="p-4 border rounded-lg bg-background hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">
                  <Link className="hover:underline" href={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/posts/${post.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/posts/${post.id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center text-xs text-muted-foreground">
                <CalendarDays className="mr-1 h-3 w-3" />
                {post.createdAt}
              </span>
              {post.status === "published" ? (
                <span className="flex items-center text-xs text-muted-foreground">
                  <Eye className="mr-1 h-3 w-3" />
                  {post.views} views
                </span>
              ) : (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                  Draft
                </span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
} 
