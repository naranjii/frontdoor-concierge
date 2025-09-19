import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import Landing from "@/pages/Landing"
import Login from "@/pages/Login"
import AdminDashboard from "@/pages/AdminDashboard"
import FinanceDashboard from "@/pages/FinanceDashboard"
import CoordinatorDashboard from "@/pages/CoordinatorDashboard"
import TherapistDashboard from "@/pages/TherapistDashboard"
import ReceptionistDashboard from "@/pages/ReceptionistDashboard"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-secondary">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/finance" element={<FinanceDashboard />} />
          <Route path="/coordinator" element={<CoordinatorDashboard />} />
          <Route path="/therapist" element={<TherapistDashboard />} />
          <Route path="/receptionist" element={<ReceptionistDashboard />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App;