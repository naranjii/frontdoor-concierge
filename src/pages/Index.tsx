import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Calendar, TrendingUp, Settings } from "lucide-react"
import { Link } from "react-router-dom"

// Import dashboard components
import { AdminDashboard } from "@/components/dashboards/AdminDashboard"
import { FinanceDashboard } from "@/components/dashboards/FinanceDashboard"
import { CoordinatorDashboard } from "@/components/dashboards/CoordinatorDashboard"
import { TherapistDashboard } from "@/components/dashboards/TherapistDashboard"

// Mock receptionist dashboard component
const ReceptionistDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reception Dashboard</h1>
          <p className="text-muted-foreground">Manage patient and guest check-ins</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">New Patient</Button>
          <Button>Check In Guest</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Check-ins</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Queue Length</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Patients waiting</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expected Arrivals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Next 2 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Wait Time</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 min</div>
            <p className="text-xs text-muted-foreground">Below target</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Queue</CardTitle>
          <CardDescription>Patients and guests currently waiting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "John Doe", type: "Patient", time: "10:30 AM", status: "waiting" },
              { name: "Jane Smith", type: "Guest", time: "10:45 AM", status: "processing" },
              { name: "Bob Johnson", type: "Patient", time: "11:00 AM", status: "waiting" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.type} • Arrived at {item.time}</p>
                </div>
                <Badge variant={item.status === "processing" ? "default" : "secondary"}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function Index() {
  const [currentRole, setCurrentRole] = useState("receptionist")

  // Mock user data
  const user = {
    name: "Sarah Johnson",
    email: "sarah@clinic.com",
    role: "RECEPTIONIST",
    institution: "Wellness Clinic"
  }

  const availableRoles = [
    { value: "receptionist", label: "Receptionist", component: ReceptionistDashboard },
    { value: "admin", label: "Admin", component: AdminDashboard },
    { value: "coordinator", label: "Coordinator", component: CoordinatorDashboard },
    { value: "therapist", label: "Therapist", component: TherapistDashboard },
    { value: "finance", label: "Finance", component: FinanceDashboard }
  ]

  const CurrentDashboard = availableRoles.find(role => role.value === currentRole)?.component || ReceptionistDashboard

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-foreground">HealthHub</span>
            </Link>
            
            <Tabs value={currentRole} onValueChange={setCurrentRole}>
              <TabsList className="bg-muted">
                {availableRoles.map((role) => (
                  <TabsTrigger key={role.value} value={role.value} className="px-4">
                    {role.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-medium text-sm">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.role} • {user.institution}</div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Link to="/login">
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <CurrentDashboard />
      </main>
    </div>
  )
}