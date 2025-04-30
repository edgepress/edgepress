import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  FileEdit, 
  UserCircle, 
  Settings,
  PlusCircle,
  BookOpen,
  Tag
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function AppSidebar() {
  return (
    <aside className="w-64 border-r h-[calc(100vh-3.5rem)] bg-background flex flex-col overflow-y-auto">
      <div className="p-4">
        <Button variant="outline" className="w-full justify-start gap-2" asChild>
          <Link href="/posts/new">
            <PlusCircle className="h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>
      <Separator />
      <div className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          <Link href="/" passHref>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/posts" passHref>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BookOpen className="h-4 w-4" />
              Published Posts
            </Button>
          </Link>
          <Link href="/drafts" passHref>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <FileEdit className="h-4 w-4" />
              Drafts
            </Button>
          </Link>
          <Link href="/categories" passHref>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Tag className="h-4 w-4" />
              Categories
            </Button>
          </Link>
        </nav>
        <Separator className="my-4" />
        <div className="px-3 py-2">
          <h3 className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
            Account
          </h3>
        </div>
        <nav className="grid gap-1 px-2">
          <Link href="/profile" passHref>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <UserCircle className="h-4 w-4" />
              Profile
            </Button>
          </Link>
          <Link href="/settings" passHref>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
      </div>
    </aside>
  );
} 
