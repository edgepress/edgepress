import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import React from "react";

// Interface for props
interface AppHeaderProps {
  toggleSidebar?: () => void;
}

export function AppHeader({ toggleSidebar }: AppHeaderProps) {
  return (
    <header className="h-14 px-4 border-b flex items-center justify-between bg-background">
      <div className="flex items-center gap-4">
        {toggleSidebar && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <Link href="/" className="font-semibold text-lg">
          EdgePress
        </Link>
      </div>
    </header>
  );
} 
