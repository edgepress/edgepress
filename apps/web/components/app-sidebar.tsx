"use client"

import * as React from "react"
import { useMemo } from "react"

import { NavMain } from "@edgepress/ui/components/nav-main"
import { NavProjects } from "@edgepress/ui/components/nav-projects"
import { NavSecondary } from "@edgepress/ui/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@edgepress/ui/components/sidebar"
import { TeamSwitcher } from "@edgepress/ui/components/team-switcher"
import * as LucideIcons from "lucide-react"

import { NavUser } from "@/components/nav-user"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: {
    navMain: Array<NavItem>;
    navSecondary: Array<NavItem>;
    projects: Array<ProjectItem>;
    teams: Array<TeamItem>;
    user: UserData;
  }
}

type NavItem = {
  icon: string;
  title: string;
  url: string;
  isActive?: boolean;
  items?: Array<{
    title: string;
    url: string;
  }>;
}

type ProjectItem = {
  icon: string;
  name: string;
  url: string;
}

type TeamItem = {
  logo: string;
  name: string;
  plan: string;
}

type UserData = {
  avatar: string;
  email: string;
  name: string;
}

// Helper function to map icon string names to Lucide components
const mapIconToComponent = (iconName: string) => {
  const Icon = (LucideIcons as Record<string, any>)[iconName] || LucideIcons.CircleDashed;
  return Icon;
};

export function AppSidebar({ data, ...props }: AppSidebarProps) {
  // Process data with useMemo to prevent unnecessary recalculations
  const processedData = useMemo(() => ({
    navMain: data.navMain.map(item => ({
      ...item,
      icon: mapIconToComponent(item.icon),
    })),
    navSecondary: data.navSecondary.map(item => ({
      ...item,
      icon: mapIconToComponent(item.icon),
    })),
    projects: data.projects.map(project => ({
      ...project,
      icon: mapIconToComponent(project.icon),
    })),
    teams: data.teams.map(team => ({
      ...team,
      logo: mapIconToComponent(team.logo),
    })),
    user: data.user,
  }), [data]);

  const { navMain, navSecondary, projects, teams, user } = processedData;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={projects} />
        <NavSecondary className="mt-auto" items={navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
} 
