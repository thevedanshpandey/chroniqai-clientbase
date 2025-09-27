import { useState } from "react";
import { BarChart3, FileDown, Home, TrendingUp, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Export", url: "/export", icon: FileDown },
  { title: "About Founder", url: "/about-founder", icon: User },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-neon-blue/10 text-neon-blue border-l-2 border-neon-blue shadow-glow-primary" 
      : "hover:bg-secondary/50 hover:text-neon-blue/80 transition-all duration-300";

  return (
    <Sidebar
      className="bg-background border-r border-border/50 transition-all duration-300"
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
{open && (
              <div>
                <h2 className="text-lg font-bold text-foreground">LinkedIn</h2>
                <p className="text-xs text-muted-foreground">Outreach Dashboard</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `${getNavCls({ isActive })} flex items-center space-x-3 p-3 rounded-lg`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {open && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}