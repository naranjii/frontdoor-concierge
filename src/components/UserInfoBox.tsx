import { LogOut, Settings, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserInfoBoxProps {
  user: {
    name: string;
    role: string;
    email?: string;
    permissions: string[];
  };
  onLogout: () => void;
  onSettings?: () => void;
  onProfile?: () => void;
}

export function UserInfoBox({ user, onLogout, onSettings, onProfile }: UserInfoBoxProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex items-center gap-3">
      {/* Notifications */}
      <Button variant="ghost" size="sm" className="relative">
        <Bell className="h-4 w-4" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
      </Button>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-3 h-auto p-2 hover:bg-accent/10">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm font-medium">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56 bg-card border shadow-medium">
          <DropdownMenuLabel className="pb-2">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{user.name}</p>
              {user.email && (
                <p className="text-xs text-muted-foreground">{user.email}</p>
              )}
              <div className="flex flex-wrap gap-1 mt-2">
                {user.permissions.map((permission) => (
                  <Badge key={permission} variant="secondary" className="text-xs capitalize">
                    {permission}
                  </Badge>
                ))}
              </div>
            </div>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          {onProfile && (
            <DropdownMenuItem onClick={onProfile} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          )}
          
          {onSettings && (
            <DropdownMenuItem onClick={onSettings} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onClick={onLogout} 
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}