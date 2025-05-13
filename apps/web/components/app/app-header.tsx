import React from "react";

import { Button } from "@edgepress/ui/components/button";
import { Menu } from "lucide-react";
import Link from "next/link";

// Interface for props
interface AppHeaderProps {
  toggleSidebar?: () => void;
}

export function AppHeader({ toggleSidebar }: AppHeaderProps) {
  return (
    <header className="h-14 px-4 border-b flex items-center justify-between bg-background">
      <div className="flex items-center gap-4">
        {toggleSidebar && (
          <Button size="icon" variant="ghost" className="md:hidden" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <Link className="font-semibold text-lg" href="/">
          EdgePress
        </Link>
      </div>
    </header>
  );
} 
