import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import AdminDashboard from "@/pages/AdminDashboard";
import FinanceDashboard from "@/pages/FinanceDashboard";
import CoordinatorDashboard from "@/pages/CoordinatorDashboard";
import TherapistDashboard from "@/pages/TherapistDashboard";
import ReceptionistDashboard from "@/pages/ReceptionistDashboard";

export default function DashboardRouter() {
  const [activeView, setActiveView] = useState("staff"); // Default view

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
    <DashboardLayout 
      currentView={activeView} 
      onViewChange={setActiveView}
    >
      {renderActiveView()}
    </DashboardLayout>
  );
}