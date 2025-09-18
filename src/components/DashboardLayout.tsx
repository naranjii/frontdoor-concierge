import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth"
import { Navigate } from "react-router-dom"
import { AppSidebar } from "@/components/AppSidebar"
import { DashboardHeader } from "@/components/DashboardHeader"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentView: string
  onViewChange: (view: string) => void
}

export function DashboardLayout({ children, currentView, onViewChange }: DashboardLayoutProps) {
  const { staff } = useAuth()
  const [isCheckInOpen, setIsCheckInOpen] = useState(false)

  if (!staff) {
    return <Navigate to="/login" replace />
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-secondary">
        <AppSidebar 
          activeView={currentView} 
          setActiveView={onViewChange}
          userRole={staff.role}
        />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader 
            onCheckIn={() => setIsCheckInOpen(true)}
            staff={staff}
          />
          
          <main className="flex-1 p-6">
            {children}
          </main>
          
          <footer className="border-t bg-card p-4 text-center text-sm text-muted-foreground">
            © 2024 OTWare. All rights reserved.
          </footer>
        </div>
      </div>
    </SidebarProvider>
  )
}