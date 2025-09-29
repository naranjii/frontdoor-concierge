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
  const [activeView, setActiveView] = useState("staff"); // Default view

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
    switch (activeView) {
      // Administration
      case "staff":
        return <AdminDashboard />;
      case "permissions":
        return <AdminDashboard />; // Use admin dashboard for permissions management
      case "settings":
        return <AdminDashboard />; // Use admin dashboard for system settings
      
      // Finance
      case "finance-overview":
        return <FinanceDashboard />;
      case "invoices":
        return <FinanceDashboard />; // Use finance dashboard for invoices
      case "expenses":
        return <FinanceDashboard />; // Use finance dashboard for expenses
      
      // Coordination
      case "scheduling":
        return <CoordinatorDashboard />;
      case "therapist-workload":
        return <CoordinatorDashboard />; // Use coordinator dashboard for therapist workload
      case "queue":
        return <CoordinatorDashboard />; // Use coordinator dashboard for reception queue
      
      // Reception
      case "logbook":
        return <ReceptionistDashboard />;
      case "registrations":
        return <div className="p-6"><h2 className="text-2xl font-bold">Patient Registrations</h2><p className="text-muted-foreground">Coming soon...</p></div>;
      case "checkin":
        return <div className="p-6"><h2 className="text-2xl font-bold">Patient Check-in</h2><p className="text-muted-foreground">Coming soon...</p></div>;
      
      // Therapy
      case "appointments":
        return <TherapistDashboard />;
      case "patients":
        return <div className="p-6"><h2 className="text-2xl font-bold">My Patients</h2><p className="text-muted-foreground">Coming soon...</p></div>;
      case "notes":
        return <div className="p-6"><h2 className="text-2xl font-bold">Session Notes</h2><p className="text-muted-foreground">Coming soon...</p></div>;
      
      default:
        return <AdminDashboard />;
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