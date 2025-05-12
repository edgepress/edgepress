'use client';

import React, {useState} from 'react';

import { 
  ChevronDown,
  Database, 
  FileText, 
  GanttChart,
  Globe,
  LayoutDashboard,
  LayoutGrid,
  MessageSquare,
  Settings,
  ShieldAlert,
  Tags,
  Users
} from "lucide-react";
import Link from "next/link";

import {NavUser} from '@/components/app/nav-user';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';

// AdminNavContent component
function AdminNavContent() {
  const [contentOpen, setContentOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [systemOpen, setSystemOpen] = useState(false);

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>
          <span className="text-xs font-medium uppercase">Overview</span>
        </SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip='Dashboard'>
              <Link href='/dashboard'>
                <LayoutDashboard className='h-4 w-4' />
                <span>System Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarSeparator />

      <SidebarGroup>
        <SidebarGroupLabel>
          <span className="text-xs font-medium uppercase">Content Management</span>
        </SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <Collapsible
              className='w-full'
              open={contentOpen}
              onOpenChange={setContentOpen}
            >
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className='w-full justify-between gap-2'
                  tooltip='Content'
                >
                  <div className='flex items-center gap-2'>
                    <FileText className='h-4 w-4' />
                    <span>Content Management</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      contentOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className='pl-2'>
                <SidebarMenuButton
                  asChild
                  className='w-full justify-between text-sm mt-1'
                >
                  <Link href='/posts'>
                    <span className='truncate'>All Posts</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  className='w-full justify-between text-sm mt-1'
                >
                  <Link href='/pages'>
                    <span className='truncate'>All Pages</span>
                    <LayoutGrid className='h-3.5 w-3.5' />
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  className='w-full justify-between text-sm mt-1'
                >
                  <Link href='/categories'>
                    <span className='truncate'>Categories</span>
                    <Tags className='h-3.5 w-3.5' />
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  className='w-full justify-between text-sm mt-1'
                >
                  <Link href='/comments'>
                    <span className='truncate'>Comments</span>
                    <MessageSquare className='h-3.5 w-3.5' />
                  </Link>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarSeparator />

      <SidebarGroup>
        <SidebarGroupLabel>
          <span className="text-xs font-medium uppercase">User Management</span>
        </SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <Collapsible
              className='w-full'
              open={usersOpen}
              onOpenChange={setUsersOpen}
            >
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className='w-full justify-between gap-2'
                  tooltip='Users'
                >
                  <div className='flex items-center gap-2'>
                    <Users className='h-4 w-4' />
                    <span>User Management</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      usersOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className='pl-2'>
                <SidebarMenuButton
                  asChild
                  className='w-full justify-between text-sm mt-1'
                >
                  <Link href='/users/administrators'>
                    <span className='truncate'>Administrators</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  className='w-full justify-between text-sm mt-1'
                >
                  <Link href='/users/editors'>
                    <span className='truncate'>Editors</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  className='w-full justify-between text-sm mt-1'
                >
                  <Link href='/users/authors'>
                    <span className='truncate'>Authors</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  className='w-full justify-between text-sm mt-1'
                >
                  <Link href='/users/organizations'>
                    <span className='truncate'>Organizations</span>
                  </Link>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarSeparator />

      <SidebarGroup>
        <SidebarGroupLabel>
          <span className="text-xs font-medium uppercase">System Settings</span>
        </SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <Collapsible
              className='w-full'
              open={systemOpen}
              onOpenChange={setSystemOpen}
            >
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className='w-full justify-between gap-2'
                  tooltip='System'
                >
                  <div className='flex items-center gap-2'>
                    <Settings className='h-4 w-4' />
                    <span>System Settings</span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      systemOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className='pl-2'>
                <SidebarMenuButton
                  asChild
                  className='w-full justify-between text-sm mt-1'
                >
                  <Link href='/settings/general'>
                    <span className='truncate'>General Settings</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  className='w-full justify-between text-sm mt-1'
                >
                  <Link href='/settings/sites'>
                    <span className='truncate'>Site Management</span>
                    <Globe className='h-3.5 w-3.5' />
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  className='w-full justify-between text-sm mt-1'
                >
                  <Link href='/settings/database'>
                    <span className='truncate'>Database Settings</span>
                    <Database className='h-3.5 w-3.5' />
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  className='w-full justify-between text-sm mt-1'
                >
                  <Link href='/settings/security'>
                    <span className='truncate'>Security Settings</span>
                    <ShieldAlert className='h-3.5 w-3.5' />
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuButton
                  asChild
                  className='w-full justify-between text-sm mt-1'
                >
                  <Link href='/settings/logs'>
                    <span className='truncate'>System Logs</span>
                    <GanttChart className='h-3.5 w-3.5' />
                  </Link>
                </SidebarMenuButton>
              </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}

export function AdminSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <span className="font-semibold">EdgePress Admin Panel</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <AdminNavContent />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
} 
