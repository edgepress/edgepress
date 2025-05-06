"use client"

import {
  LogOut,
  ChevronsUpDown,
  User,
  Settings,
  LayoutDashboard,
  Building,
  Plus,
  Users,
  ChevronRight,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { useState } from "react"

// Mock user data - 實際應用中應該從認證系統獲取
const USER_DATA = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: ""
}

// Define organization interface
interface Organization {
  id: string;
  name: string;
  role: string;
  logo: string | null;
}

// Mock data for organizations
const MOCK_ORGANIZATIONS: Organization[] = [
  { 
    id: "org1", 
    name: "Personal", 
    role: "Owner", 
    logo: null
  },
  { 
    id: "org2", 
    name: "Acme Corporation", 
    role: "Admin", 
    logo: "https://api.dicebear.com/6.x/initials/svg?seed=AC"
  },
  { 
    id: "org3", 
    name: "Design Studio", 
    role: "Member",
    logo: "https://api.dicebear.com/6.x/initials/svg?seed=DS"
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
                <AvatarImage src={USER_DATA.avatar} alt={USER_DATA.name} />
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
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={USER_DATA.avatar} alt={USER_DATA.name} />
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
                    <AvatarImage src={currentOrg.logo} alt={currentOrg.name} />
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
            
            <DropdownMenuItem asChild className="px-2 py-1.5 my-1">
              <div className="flex w-full cursor-pointer items-center justify-between">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Switch Organization</span>
                </div>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="h-0 w-0 p-0">
                    <span className="sr-only">Open</span>
                  </DropdownMenuSubTrigger>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  <DropdownMenuSubContent className="min-w-[220px]">
                    <DropdownMenuRadioGroup 
                      value={currentOrg.id} 
                      onValueChange={(id) => {
                        const org = MOCK_ORGANIZATIONS.find(o => o.id === id);
                        if (org) setCurrentOrg(org);
                      }}
                    >
                      {MOCK_ORGANIZATIONS.map((org) => (
                        <DropdownMenuRadioItem 
                          key={org.id} 
                          value={org.id}
                          className="py-1.5 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            {org.logo ? (
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={org.logo} alt={org.name} />
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
                      <Link href="/organizations/new" className="flex w-full items-center cursor-pointer">
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Create Organization</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/" className="flex w-full items-center cursor-pointer">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex w-full items-center cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex w-full items-center cursor-pointer">
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
