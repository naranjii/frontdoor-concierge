import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { DashboardLayout } from "@/components/DashboardLayout"
import { LogbookView } from "@/components/LogbookView"
import { RegistrationsView } from "@/components/RegistrationsView"
import { AdminDashboard } from "@/components/dashboards/AdminDashboard"
import { FinanceDashboard } from "@/components/dashboards/FinanceDashboard"
import { CoordinatorDashboard } from "@/components/dashboards/CoordinatorDashboard"
import { TherapistDashboard } from "@/components/dashboards/TherapistDashboard"
import { CheckInModal } from "@/components/CheckInModal"

export default function DashboardRouter() {
  const { staff } = useAuth()
  const [activeView, setActiveView] = useState(getDefaultView(staff?.role))
  const [isCheckInOpen, setIsCheckInOpen] = useState(false)

  function getDefaultView(role?: string) {
    switch (role) {
      case 'ADMIN':
        return 'staff'
      case 'FINANCE':
        return 'finances'
      case 'COORDINATOR':
        return 'scheduling'
      case 'THERAPIST':
        return 'scheduling'
      default:
        return 'logbook'
    }
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "logbook":
        return <LogbookView />
      case "registrations":
        return <RegistrationsView />
      case "staff":
        return <AdminDashboard />
      case "finances":
        return <FinanceDashboard />
      case "scheduling":
        return staff?.role === 'COORDINATOR' ? <CoordinatorDashboard /> : <TherapistDashboard />
      default:
        return <LogbookView />
    }
  }

  if (!staff) return null

  return (
    <>
      <DashboardLayout 
        currentView={activeView} 
        onViewChange={setActiveView}
      >
        {renderActiveView()}
      </DashboardLayout>
      
      <CheckInModal 
        open={isCheckInOpen} 
        onOpenChange={setIsCheckInOpen} 
      />
    </>
  )
}