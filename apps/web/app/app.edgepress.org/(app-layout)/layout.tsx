'use client';

import React, {useState} from 'react';
import {AppHeader} from '@/components/app/app-header';
import {AppSidebar} from '@/components/app/app-sidebar';
import {Sheet, SheetContent} from '@/components/ui/sheet';
import {SidebarProvider} from '@/components/ui/sidebar';

export default function AppLayout({children}: {children: React.ReactNode}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <SidebarProvider>
      <AppHeader toggleSidebar={toggleSidebar} />
      <div className='flex flex-1 h-[calc(100vh-3.5rem)]'>
        {/* 桌面版側邊欄 - 在中等尺寸以上顯示 */}
        <div className='hidden md:block'>
          <AppSidebar />
        </div>

        {/* 移動版側邊欄 - 使用 Sheet 組件 */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side='left' className='p-0 w-64'>
            <AppSidebar />
          </SheetContent>
        </Sheet>

        {/* 主內容區域 */}
        <main className='flex-1 overflow-y-auto p-6'>
          <div className='container max-w-5xl mx-auto'>{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
