import { useState } from "react";
import { Navigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import AdminDashboard from "@/pages/AdminDashboard";
import FinanceDashboard from "@/pages/FinanceDashboard";
import CoordinatorDashboard from "@/pages/CoordinatorDashboard";
import TherapistDashboard from "@/pages/TherapistDashboard";
import ReceptionistDashboard from "@/pages/ReceptionistDashboard";

export default function DashboardRouter() {
  const { user, profile, permissions, isOwner, loading } = useAuth()
  
  // Set initial view based on permissions
  const getInitialView = () => {
    if (permissions.includes("admin")) return "staff"
    if (permissions.includes("finance")) return "finance-overview"
    if (permissions.includes("coordination")) return "scheduling"
    if (permissions.includes("therapy")) return "appointments"
    if (permissions.includes("reception")) return "logbook"
    return "staff"
  }
  
  const [activeView, setActiveView] = useState(getInitialView())

  // Show loading while auth is resolving
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Redirect to auth if not authenticated
  if (!user || !profile) {
    return <Navigate to="/auth" replace />
  }

  const currentUser = {
    name: profile.name,
    role: isOwner ? "Owner" : "Staff Member",
    email: profile.email,
    permissions: permissions
  }

  const renderActiveView = () => {
    // If user has admin permission, always show admin dashboard
    if (permissions.includes("admin")) {
      return <AdminDashboard />;
    }

    // Otherwise show based on active view
    switch (activeView) {
      // Finance
      case "finance-overview":
      case "invoices":
      case "expenses":
        return <FinanceDashboard />;
      
      // Coordination
      case "scheduling":
      case "therapist-workload":
      case "queue":
        return <CoordinatorDashboard />;
      
      // Reception
      case "logbook":
      case "registrations":
      case "checkin":
        return <ReceptionistDashboard />;
      
      // Therapy
      case "appointments":
      case "patients":
      case "notes":
        return <TherapistDashboard />;
      
      default:
        // Show first available dashboard based on permissions
        if (permissions.includes("finance")) return <FinanceDashboard />;
        if (permissions.includes("coordination")) return <CoordinatorDashboard />;
        if (permissions.includes("therapy")) return <TherapistDashboard />;
        if (permissions.includes("reception")) return <ReceptionistDashboard />;
        return <div className="p-6"><h2 className="text-2xl font-bold">Dashboard</h2><p className="text-muted-foreground">No permissions assigned</p></div>;
    }
  };

  return (
    <ProtectedRoute>
      <DashboardLayout 
        currentView={activeView} 
        onViewChange={setActiveView}
        user={currentUser}
      >
        {renderActiveView()}
      </DashboardLayout>
    </ProtectedRoute>
  );
}