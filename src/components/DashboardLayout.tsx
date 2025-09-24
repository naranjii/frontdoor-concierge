import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { UserInfoBox } from "@/components/UserInfoBox";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
}

// Mock user data - replace with real data from your API
const mockUser = {
  name: "Dr. Sarah Johnson",
  role: "Senior Staff",
  email: "sarah.johnson@otware.com",
  permissions: ["admin", "finance", "coordination"] // This determines which sections show in sidebar
};

export function DashboardLayout({ children, currentView, onViewChange }: DashboardLayoutProps) {
  const handleLogout = () => {
    toast.success("Logged out successfully");
    // Handle logout logic here
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
          userPermissions={mockUser.permissions}
          currentUser={mockUser}
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
                user={mockUser}
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