"use client";

import React from "react";

import { cn } from "@edgepress/ui/lib/utils";

import { useSidebar } from "./SidebarContext";

export default function AdaptiveContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSidebarOpen } = useSidebar();

  return (
    <div 
      className={cn(
        'transition-all duration-300 ease-in-out h-full p-4',
        isSidebarOpen ? 'pr-[336px]' : 'pr-4'
      )}
    >
      {children}
    </div>
  );
} 
