import { Bell, Settings, User, ChevronDown, RefreshCw } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopNavigationProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function TopNavigation({ onRefresh, isRefreshing }: TopNavigationProps) {
  return (
    <header className="h-16 bg-card border-b border-border/50 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="lg:hidden" />
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
          <span className="font-semibold text-foreground">Client Dashboard</span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {onRefresh && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover:bg-secondary/50"
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        )}

        <Button variant="ghost" size="icon" className="hover:bg-secondary/50">
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="hover:bg-secondary/50">
          <Settings className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 hover:bg-secondary/50">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback className="bg-gradient-primary text-white text-sm">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}