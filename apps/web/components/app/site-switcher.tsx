"use client"

import React, { useState } from "react"
import { Globe, ChevronsUpDown, Check, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Mock data for sites - 實際應用中應該從API獲取
const MOCK_SITES = [
  { id: "site1", name: "My Blog", domain: "blog.example.com" },
];

interface Site {
  id: string;
  name: string;
  domain: string;
}

export function SiteSwitcher() {
  const { isMobile } = useSidebar()
  const [currentSite, setCurrentSite] = useState<Site>(MOCK_SITES[0] as Site);

  if (!MOCK_SITES.length) {
    return null;
  }


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <Globe className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {currentSite.name}
                </span>
                <span className='truncate text-xs text-muted-foreground'>
                  {currentSite.domain}
                </span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              站點列表
            </DropdownMenuLabel>
            {MOCK_SITES.map((site) => (
              <DropdownMenuItem
                key={site.id}
                onClick={() => setCurrentSite(site)}
                className='gap-2 p-2'
              >
                <div className='flex items-center gap-2 truncate'>
                  <span className='truncate'>{site.name}</span>
                </div>
                {currentSite.id === site.id && (
                  <Check className='ml-auto size-4 text-primary flex-shrink-0' />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className='gap-2 p-2'>
              <Link href='/sites/new' className='flex items-center gap-2'>
                <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                  <Plus className='size-4' />
                </div>
                <div className='font-medium text-muted-foreground'>
                  新增站點
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
} 
