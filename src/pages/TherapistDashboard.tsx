import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { 
  Calendar, 
  Users, 
  FileText, 
  Clock, 
  Save,
  Building2,
  User,
  Activity,
  Edit,
  Eye
} from "lucide-react"
import { toast } from "sonner"

export default function TherapistDashboard() {
  const [sessionNotes, setSessionNotes] = useState("")

  const mockAppointments = [
    { id: 1, patient: "John Doe", time: "09:00", duration: "60min", status: "confirmed", type: "Physical Therapy" },
    { id: 2, patient: "Jane Smith", time: "10:30", duration: "45min", status: "in-progress", type: "Follow-up" },
    { id: 3, patient: "Bob Johnson", time: "14:00", duration: "60min", status: "upcoming", type: "Initial Assessment" },
    { id: 4, patient: "Alice Brown", time: "15:30", duration: "30min", status: "upcoming", type: "Progress Review" }
  ]

  const mockPatients = [
    { id: 1, name: "John Doe", condition: "Lower back pain", lastSession: "2024-01-10", progress: "Good", sessions: 8 },
    { id: 2, name: "Jane Smith", condition: "Knee rehabilitation", lastSession: "2024-01-08", progress: "Excellent", sessions: 12 },
    { id: 3, name: "Bob Johnson", condition: "Shoulder injury", lastSession: "2024-01-05", progress: "Moderate", sessions: 4 },
    { id: 4, name: "Alice Brown", condition: "Post-surgery therapy", lastSession: "2024-01-03", progress: "Good", sessions: 6 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success text-success-foreground"
      case "in-progress":
        return "bg-primary text-primary-foreground"
      case "upcoming":
        return "bg-warning text-warning-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case "Excellent":
        return "bg-success text-success-foreground"
      case "Good":
        return "bg-primary text-primary-foreground"
      case "Moderate":
        return "bg-warning text-warning-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const saveSessionNotes = () => {
    if (sessionNotes.trim()) {
      toast.success("Session notes saved successfully!")
      setSessionNotes("")
    } else {
      toast.error("Please enter session notes before saving")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">OTWare Therapist</h1>
            </Link>
            <div className="flex items-center gap-2">
              <Badge className="bg-success text-success-foreground">Therapist</Badge>
              <Button onClick={() => toast.success("Notes saved!")}>
                <Save className="w-4 h-4 mr-2" />
                Quick Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockAppointments.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockAppointments.filter(a => a.status === 'confirmed').length} confirmed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockPatients.length}</div>
              <p className="text-xs text-muted-foreground">Under your care</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAppointments.find(a => a.status === 'upcoming')?.time || "None"}
              </div>
              <p className="text-xs text-muted-foreground">
                {mockAppointments.find(a => a.status === 'upcoming')?.patient || "No upcoming"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Session Notes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
            <TabsTrigger value="patients">Patient Records</TabsTrigger>
            <TabsTrigger value="notes">Session Notes</TabsTrigger>
          </TabsList>

          {/* Schedule */}
          <TabsContent value="schedule" className="space-y-6">
            <h2 className="text-2xl font-bold">Today's Schedule</h2>
            
            <div className="grid gap-4">
              {mockAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{appointment.patient}</h3>
                        <p className="text-sm text-muted-foreground">
                          {appointment.time} • {appointment.duration} • {appointment.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        {appointment.status === 'in-progress' ? 'Continue' : 'Start Session'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Patients */}
          <TabsContent value="patients" className="space-y-6">
            <h2 className="text-2xl font-bold">Patient Records</h2>
            
            <div className="grid gap-4">
              {mockPatients.map((patient) => (
                <Card key={patient.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-accent-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{patient.name}</h3>
                          <p className="text-sm text-muted-foreground">{patient.condition}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getProgressColor(patient.progress)}>
                          {patient.progress}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Last Session:</span>
                        <p className="font-medium">{patient.lastSession}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Sessions:</span>
                        <p className="font-medium">{patient.sessions}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Progress:</span>
                        <p className="font-medium">{patient.progress}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notes */}
          <TabsContent value="notes" className="space-y-6">
            <h2 className="text-2xl font-bold">Session Notes</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Current Session Notes</CardTitle>
                <CardDescription>Document patient progress and treatment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter session notes here..."
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className="min-h-32"
                />
                <Button onClick={saveSessionNotes}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Notes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Session Notes</CardTitle>
                <CardDescription>Previously recorded session notes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { patient: "John Doe", date: "2024-01-10", notes: "Patient showed significant improvement in mobility. Reduced pain from 7/10 to 4/10." },
                    { patient: "Jane Smith", date: "2024-01-08", notes: "Completed full range of motion exercises. Patient reports feeling stronger." },
                    { patient: "Bob Johnson", date: "2024-01-05", notes: "Initial assessment completed. Baseline measurements recorded." }
                  ].map((note, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{note.patient}</h4>
                        <span className="text-sm text-muted-foreground">{note.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{note.notes}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}