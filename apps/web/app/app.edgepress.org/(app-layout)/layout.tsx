import React, { ReactNode } from 'react';

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

import { AppSidebar } from '@/components/app/app-sidebar';

interface AppLayoutProps {
  children: ReactNode;
  params: Promise<{
    breadcrumbs?: Array<{
      title: string;
      href?: string;
    }>;
    title?: string;
  }>;
}

export default async function AppLayout({children, params}: AppLayoutProps) {
  const { breadcrumbs, title } = await params;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs?.map((item, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <BreadcrumbSeparator className='hidden md:block' />
                    )}
                    <BreadcrumbItem className='hidden md:block'>
                      {item.href ? (
                        <BreadcrumbLink href={item.href}>
                          {item.title}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{item.title}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
                {title && (
                  <>
                    {breadcrumbs && breadcrumbs.length > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      <BreadcrumbPage>{title}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
