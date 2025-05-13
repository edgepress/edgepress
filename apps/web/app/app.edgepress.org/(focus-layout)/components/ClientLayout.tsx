"use client";

import React from "react";

import { AICopilotSidebar } from "./AICopilotSidebar";

export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AICopilotSidebar>{children}</AICopilotSidebar>;
} 
