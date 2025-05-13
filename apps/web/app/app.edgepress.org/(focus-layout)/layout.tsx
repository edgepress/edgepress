import React, { Suspense } from "react";

import AdaptiveContent from "./components/AdaptiveContent";
import { AICopilotSidebar } from "./components/AICopilotSidebar";
import { SidebarProvider } from "./components/SidebarContext";

export default function FocusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className='flex h-screen w-screen flex-col'>
        <div className='relative flex-1 overflow-y-auto'>
          <AdaptiveContent>
            {children}
          </AdaptiveContent>
          <Suspense fallback={<div>Loading...</div>}>
            <AICopilotSidebar />
          </Suspense>
        </div>
      </div>
    </SidebarProvider>
  );
}
