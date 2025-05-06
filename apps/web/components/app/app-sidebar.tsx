'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {
  LayoutDashboard,
  FileEdit,
  PlusCircle,
  BookOpen,
  Tag,
  ChevronDown,
  FolderPlus,
} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarProvider,
} from '@/components/ui/sidebar';
import {NavUser} from '@/components/app/nav-user';
import {SiteSwitcher} from '@/components/app/site-switcher';

// Mock data for categories
const MOCK_CATEGORIES = [
  {id: 'cat1', name: 'Technology', postCount: 12},
  {id: 'cat2', name: 'Business', postCount: 8},
  {id: 'cat3', name: 'Design', postCount: 5},
  {id: 'cat4', name: 'Marketing', postCount: 7},
];

// NavContent component
function NavContent() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/'>
                <LayoutDashboard className='h-4 w-4' />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/posts' passHref>
                <BookOpen className='h-4 w-4' />
                <span>Published Posts</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/drafts' passHref>
                <FileEdit className='h-4 w-4' />
                <span>Drafts</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Categories Collapsible */}
          <SidebarMenuItem>
            <Collapsible
              open={categoriesOpen}
              onOpenChange={setCategoriesOpen}
              className='w-full'
            >
              <CollapsibleTrigger asChild>
                <SidebarMenuButton className='w-full justify-between gap-2'>
                  <div className='flex items-center gap-2'>
                    <Tag className='h-4 w-4' />
                    <span>Categories</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      categoriesOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className='pl-2'>
                {MOCK_CATEGORIES.map((category) => (
                  <SidebarMenuButton asChild className='w-full justify-between text-sm mt-1'>
                      <Link
                        key={category.id}
                        href={`/categories/${category.id}`}
                      passHref
                    >
                      <span className='truncate'>{category.name}</span>
                      <Badge variant='secondary' className='ml-2'>
                        {category.postCount}
                      </Badge>
                    </Link>
                  </SidebarMenuButton>
                ))}
                <Link href='/categories/new' passHref>
                  <SidebarMenuButton className='w-full justify-start gap-2 text-sm mt-2'>
                    <FolderPlus className='h-3.5 w-3.5' />
                    New Category
                  </SidebarMenuButton>
                </Link>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}

// NewPostButton component for the header
function NewPostButton() {
  return (
    <Button className='w-full justify-start gap-2 mt-4' asChild>
      <Link href='/posts/new'>
        <PlusCircle className='h-4 w-4' />
        New Post
      </Link>
    </Button>
  );
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarProvider>
      <Sidebar collapsible='icon' {...props}>
        <SidebarHeader className='p-4 space-y-2'>
          <SiteSwitcher />
          <NewPostButton />
        </SidebarHeader>
        <SidebarContent>
          <NavContent />
        </SidebarContent>
        <SidebarFooter className='px-3 py-2'>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}
