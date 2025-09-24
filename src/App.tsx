import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import Landing from "@/pages/Landing"
import Login from "@/pages/Login"
import DashboardRouter from "@/pages/DashboardRouter"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-secondary">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardRouter />} />
          {/* Legacy routes for direct access */}
          <Route path="/admin" element={<DashboardRouter />} />
          <Route path="/finance" element={<DashboardRouter />} />
          <Route path="/coordinator" element={<DashboardRouter />} />
          <Route path="/therapist" element={<DashboardRouter />} />
          <Route path="/receptionist" element={<DashboardRouter />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App;