"use client"

import { useState } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@edgepress/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@edgepress/ui/components/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@edgepress/ui/components/sidebar"
import {
  Building,
  ChevronsUpDown,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  User,
  Users,
} from "lucide-react"
import Link from "next/link"

// Mock user data - 實際應用中應該從認證系統獲取
const USER_DATA = {
  avatar: "",
  email: "john.doe@example.com",
  name: "John Doe"
}

// Define organization interface
interface Organization {
  id: string;
  logo: string | null;
  name: string;
  role: string;
}

// Mock data for organizations
const MOCK_ORGANIZATIONS: Organization[] = [
  { 
    id: "org1", 
    logo: null, 
    name: "Personal", 
    role: "Owner"
  },
  { 
    id: "org2", 
    logo: "https://api.dicebear.com/6.x/initials/svg?seed=AC", 
    name: "Acme Corporation", 
    role: "Admin"
  },
  { 
    id: "org3", 
    logo: "https://api.dicebear.com/6.x/initials/svg?seed=DS", 
    name: "Design Studio",
    role: "Member"
  },
];

export function NavUser() {
  const { isMobile } = useSidebar()
  const [currentOrg, setCurrentOrg] = useState<Organization>(MOCK_ORGANIZATIONS[0]!)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage alt={USER_DATA.name} src={USER_DATA.avatar} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{USER_DATA.name}</span>
                <span className="truncate text-xs text-muted-foreground">{USER_DATA.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
            align="end"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8">
                  <AvatarImage alt={USER_DATA.name} src={USER_DATA.avatar} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{USER_DATA.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{USER_DATA.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuLabel className="px-2 py-1 text-xs text-muted-foreground">
              Current Organization
            </DropdownMenuLabel>
            <div className="px-2 py-1">
              <div className="flex items-center gap-2 rounded-md bg-muted p-1.5">
                {currentOrg.logo ? (
                  <Avatar className="h-6 w-6">
                    <AvatarImage alt={currentOrg.name} src={currentOrg.logo} />
                    <AvatarFallback>{currentOrg.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                    <Building className="h-3.5 w-3.5 text-primary" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{currentOrg.name}</span>
                  <span className="text-xs text-muted-foreground">{currentOrg.role}</span>
                </div>
              </div>
            </div>
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Switch Organization</span>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="min-w-[220px]">
                <DropdownMenuRadioGroup 
                  value={currentOrg.id} 
                  onValueChange={(id: string) => {
                    const org = MOCK_ORGANIZATIONS.find(o => o.id === id);
                    if (org) setCurrentOrg(org);
                  }}
                >
                  {MOCK_ORGANIZATIONS.map((org) => (
                    <DropdownMenuRadioItem 
                      key={org.id} 
                      className="py-1.5 cursor-pointer"
                      value={org.id}
                    >
                      <div className="flex items-center gap-2">
                        {org.logo ? (
                          <Avatar className="h-6 w-6">
                            <AvatarImage alt={org.name} src={org.logo} />
                            <AvatarFallback>{org.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                            <Building className="h-3.5 w-3.5 text-primary" />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{org.name}</span>
                          <span className="text-xs text-muted-foreground">{org.role}</span>
                        </div>
                      </div>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link className="flex w-full items-center cursor-pointer" href="/organizations/new">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Create Organization</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link className="flex w-full items-center cursor-pointer" href="/">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="flex w-full items-center cursor-pointer" href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="flex w-full items-center cursor-pointer" href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive flex items-center cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
} 
