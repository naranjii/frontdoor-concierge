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
        return <div className="p-6"><h2 className="text-2xl font-bold">Permissions Management</h2><p className="text-muted-foreground">Coming soon...</p></div>;
      case "settings":
        return <div className="p-6"><h2 className="text-2xl font-bold">System Settings</h2><p className="text-muted-foreground">Coming soon...</p></div>;
      
      // Finance
      case "finance-overview":
        return <FinanceDashboard />;
      case "invoices":
        return <div className="p-6"><h2 className="text-2xl font-bold">Invoices</h2><p className="text-muted-foreground">Coming soon...</p></div>;
      case "expenses":
        return <div className="p-6"><h2 className="text-2xl font-bold">Expenses</h2><p className="text-muted-foreground">Coming soon...</p></div>;
      
      // Coordination
      case "scheduling":
        return <CoordinatorDashboard />;
      case "therapist-workload":
        return <div className="p-6"><h2 className="text-2xl font-bold">Therapist Workload</h2><p className="text-muted-foreground">Coming soon...</p></div>;
      case "queue":
        return <div className="p-6"><h2 className="text-2xl font-bold">Reception Queue</h2><p className="text-muted-foreground">Coming soon...</p></div>;
      
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