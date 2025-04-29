import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard,
  FileText, 
  Users, 
  Settings,
  LayoutGrid,
  Tags,
  MessageSquare
} from "lucide-react";

export function AdminSidebar() {
  return (
    <aside className="w-64 border-r h-[calc(100vh-3.5rem)] flex flex-col bg-background">
      <div className="flex flex-col gap-2 p-4">
        <p className="text-sm font-medium">Main Navigation</p>
        <nav className="flex flex-col gap-2">
          <Link href="/admin.edgepress.org/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin.edgepress.org/posts">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" />
              Posts
            </Button>
          </Link>
          <Link href="/admin.edgepress.org/pages">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LayoutGrid className="h-4 w-4" />
              Pages
            </Button>
          </Link>
          <Link href="/admin.edgepress.org/categories">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Tags className="h-4 w-4" />
              Categories
            </Button>
          </Link>
          <Link href="/admin.edgepress.org/comments">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <MessageSquare className="h-4 w-4" />
              Comments
            </Button>
          </Link>
        </nav>
      </div>
      <Separator />
      <div className="flex flex-col gap-2 p-4">
        <p className="text-sm font-medium">Administration</p>
        <nav className="flex flex-col gap-2">
          <Link href="/admin.edgepress.org/users">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              Users
            </Button>
          </Link>
          <Link href="/admin.edgepress.org/settings">
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
