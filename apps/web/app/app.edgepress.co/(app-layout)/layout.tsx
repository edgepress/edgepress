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
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AppSidebar } from '@/components/app-sidebar';
import { auth } from '@/lib/auth';

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
};

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const cookiesStore = await cookies();
  const sidebarState = cookiesStore.get('sidebar_state');

  // Check authentication
  const session = await auth.api.getSession({
    headers: new Headers({
      'cookie': cookiesStore.toString(),
    }),
  });

  // If no session, redirect to login
  if (!session) {
    redirect('/login');
  }

  const user = {
    avatar: session.user.image || '/avatars/default.jpg',
    email: session.user.email,
    name: session.user.name,
  };

  let defaultOpen = true;
  
  if(sidebarState) {
    defaultOpen = sidebarState.value === 'true';
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar data={{ ...data, user }} />
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
