import React from "react";

import { ClientLayout } from "./components/ClientLayout";

export default function FocusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-screen w-screen flex-col'>
      <div className='relative flex-1 overflow-y-auto'>
        <ClientLayout>
          {children}
        </ClientLayout>
      </div>
    </div>
  );
}
