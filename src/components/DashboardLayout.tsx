import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { UserInfoBox } from "@/components/UserInfoBox";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
  user?: {
    name: string;
    role: string;
    email: string;
    permissions: string[];
  };
}

export function DashboardLayout({ children, currentView, onViewChange, user }: DashboardLayoutProps) {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const handleSettings = () => {
    toast.info("Settings opened");
    // Navigate to settings
  };

  const handleProfile = () => {
    toast.info("Profile opened");
    // Navigate to profile
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-secondary">
        <AppSidebar 
          activeView={currentView} 
          setActiveView={onViewChange}
          userPermissions={user?.permissions || []}
          currentUser={user || { name: "User", role: "Staff", email: "", permissions: [] }}
        />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b bg-card/50 backdrop-blur-sm shadow-soft">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">OTWare Dashboard</h1>
                <p className="text-sm text-muted-foreground">Healthcare Management System</p>
              </div>
              
              <UserInfoBox 
                user={user || { name: "User", role: "Staff", email: "", permissions: [] }}
                onLogout={handleLogout}
                onSettings={handleSettings}
                onProfile={handleProfile}
              />
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="border-t bg-card/30 backdrop-blur-sm p-4 text-center text-sm text-muted-foreground">
            © 2024 OTWare Healthcare Solutions. All rights reserved.
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}