import { AppSidebar } from '@edgepress/ui/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@edgepress/ui/components/breadcrumb';
import {Separator} from '@edgepress/ui/components/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@edgepress/ui/components/sidebar';

const data = {
  navMain: [
    {
      icon: 'SquareTerminal',
      isActive: true,
      title: 'Posts',
      url: '/posts',
    },
    {
      icon: 'Bot',     
      title: 'Models',
      url: '#',
    },
    {
      icon: 'BookOpen',
      title: 'Documentation',
      url: '#',
    },
  ],
  navSecondary: [
    {
      icon: 'Settings',
      title: 'Settings',
      url: '#',
    },
    {
      icon: 'LifeBuoy',
      title: 'Support',
      url: '#',
    },
    {
      icon: 'Send',
      title: 'Feedback',
      url: '#',
    },
  ],
  projects: [
    {
      icon: 'Frame',
      name: 'Design Engineering',
      url: '#',
    },
    {
      icon: 'PieChart',
      name: 'Sales & Marketing',
      url: '#',
    },
    {
      icon: 'Map',
      name: 'Travel',
      url: '#',
    },
  ],
  teams: [
    {
      logo: 'GalleryVerticalEnd',
      name: 'EdgePress',
      plan: 'Free',
    },
  ],
  user: {
    avatar: '/avatars/lawrence.jpg',
    email: 'lawrence@edgepress.co',
    name: 'Lawrence',
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar data={data} />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='#'>
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
