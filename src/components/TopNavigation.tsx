import { useState } from "react";
import { Bell, Settings, User, ChevronDown, Menu } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TopNavigation() {
  const [selectedClient, setSelectedClient] = useState("DharatalAI");
  
  const clients = [
    { name: "DharatalAI", status: "active" },
    { name: "Mercato Agency", status: "active" },
    { name: "Danish", status: "active" },
  ];

  return (
    <header className="h-16 bg-card border-b border-border/50 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="lg:hidden" />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 hover:bg-secondary/50">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <span className="font-semibold text-foreground">{selectedClient}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {clients.map((client) => (
              <DropdownMenuItem
                key={client.name}
                onClick={() => setSelectedClient(client.name)}
                className="flex items-center space-x-2"
              >
                <div className={`w-2 h-2 rounded-full ${
                  client.status === 'active' ? 'bg-neon-green' : 'bg-muted-foreground'
                }`}></div>
                <span>{client.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center space-x-3">
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
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}