import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserPlus, Bell, Settings, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Staff } from "@/lib/supabase";

interface DashboardHeaderProps {
  onCheckIn: () => void;
  staff: Staff;
}

export const DashboardHeader = ({ onCheckIn, staff }: DashboardHeaderProps) => {
  const { signOut } = useAuth();
  
  return (
    <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10 shadow-soft">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="hover:bg-muted transition-smooth" />
          
          <div className="flex items-center gap-3">
            {/* Customizable logo area */}
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Frontdoor Dashboard</h1>
              <p className="text-sm text-muted-foreground">Healthcare Administration</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={onCheckIn}
            className="bg-gradient-primary hover:bg-primary/90 text-primary-foreground shadow-soft"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Quick Check-in
          </Button>
          
          <Button variant="ghost" size="icon">
            <Bell className="w-4 h-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {staff.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium leading-none">{staff.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {staff.email}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  Role: {staff.role}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};