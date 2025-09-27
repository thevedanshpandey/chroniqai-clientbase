import { Outlet } from "react-router-dom";
import { useState, useCallback } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNavigation } from "@/components/TopNavigation";
import { Footer } from "@/components/Footer";
import { useSheetData } from "@/hooks/useSheetData";

export function Layout() {
  const { isLoading, fetchSheetData } = useSheetData();

  const handleRefresh = useCallback(() => {
    fetchSheetData();
  }, [fetchSheetData]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <TopNavigation onRefresh={handleRefresh} isRefreshing={isLoading} />
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
}