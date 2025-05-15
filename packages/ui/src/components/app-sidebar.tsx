"use client"

import * as React from "react"
import { useMemo } from "react"
import * as LucideIcons from "lucide-react"

import { NavMain } from "@edgepress/ui/components/nav-main"
import { NavProjects } from "@edgepress/ui/components/nav-projects"
import { NavSecondary } from "@edgepress/ui/components/nav-secondary"
import { NavUser } from "@edgepress/ui/components/nav-user"
import { TeamSwitcher } from "@edgepress/ui/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@edgepress/ui/components/sidebar"

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

type TeamItem = {
  logo: string;
  name: string;
  plan: string;
}

type ProjectItem = {
  icon: string;
  name: string;
  url: string;
}

type UserData = {
  avatar: string;
  email: string;
  name: string;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: {
    teams: Array<TeamItem>;
    navMain: Array<NavItem>;
    navSecondary: Array<NavItem>;
    projects: Array<ProjectItem>;
    user: UserData;
  }
}

// Helper function to map icon string names to Lucide components
const mapIconToComponent = (iconName: string) => {
  const Icon = (LucideIcons as Record<string, any>)[iconName] || LucideIcons.CircleDashed;
  return Icon;
};

export function AppSidebar({ data, ...props }: AppSidebarProps) {
  // Process data with useMemo to prevent unnecessary recalculations
  const processedData = useMemo(() => ({
    teams: data.teams.map(team => ({
      ...team,
      logo: mapIconToComponent(team.logo),
    })),
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
    user: data.user,
  }), [data]);

  const { teams, navMain, navSecondary, projects, user } = processedData;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={projects} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
