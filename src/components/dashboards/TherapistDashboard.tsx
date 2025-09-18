import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileText, User } from "lucide-react"

const mockAppointments = [
  { 
    id: 1, 
    patient: "John Doe", 
    time: "09:00 AM", 
    date: "2024-01-16",
    status: "scheduled",
    type: "Physical Therapy",
    notes: "Follow-up session for knee rehabilitation"
  },
  { 
    id: 2, 
    patient: "Jane Smith", 
    time: "10:30 AM", 
    date: "2024-01-16",
    status: "in-progress",
    type: "Physical Therapy",
    notes: "Initial assessment for back pain"
  },
]

const mockPatients = [
  { 
    id: 1, 
    name: "John Doe", 
    condition: "Knee Injury", 
    lastSession: "2024-01-15",
    progress: "Improving"
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    condition: "Back Pain", 
    lastSession: "2024-01-14",
    progress: "Stable"
  },
]

export function TherapistDashboard() {
  const [sessionNotes, setSessionNotes] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-primary text-primary-foreground"
      case "in-progress":
        return "bg-accent text-accent-foreground"
      case "completed":
        return "bg-success text-success-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case "Improving":
        return "bg-success text-success-foreground"
      case "Stable":
        return "bg-warning text-warning-foreground"
      case "Declining":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Therapist Dashboard</h1>
          <p className="text-muted-foreground">Manage your schedule and patient records</p>
        </div>
      </div>

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
              1 in progress, 1 scheduled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPatients.length}</div>
            <p className="text-xs text-muted-foreground">
              Under your care
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAppointments.find(apt => apt.status === 'scheduled')?.time || 'None'}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockAppointments.find(apt => apt.status === 'scheduled')?.patient || 'No appointments'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Session Notes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Completed this week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">My Schedule</TabsTrigger>
          <TabsTrigger value="patients">Patient Records</TabsTrigger>
          <TabsTrigger value="notes">Session Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6">
          <h2 className="text-xl font-semibold">Today's Schedule</h2>
          
          <div className="grid gap-4">
            {mockAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{appointment.patient}</h3>
                      <p className="text-sm text-muted-foreground">
                        {appointment.type} • {appointment.notes}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{appointment.time}</span>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Start Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-6">
          <h2 className="text-xl font-semibold">My Patients</h2>
          
          <div className="grid gap-4">
            {mockPatients.map((patient) => (
              <Card key={patient.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {patient.condition} • Last session: {patient.lastSession}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getProgressColor(patient.progress)}>
                      {patient.progress}
                    </Badge>
                    <Button variant="outline" size="sm">
                      View Records
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Session Notes</CardTitle>
                <CardDescription>
                  Add notes for the current or most recent session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter session notes, observations, and treatment plans..."
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  className="min-h-[200px]"
                />
                <div className="flex gap-2">
                  <Button>Save Notes</Button>
                  <Button variant="outline">Save as Template</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Session Notes</CardTitle>
                <CardDescription>Previously recorded session notes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">John Doe</h4>
                      <span className="text-xs text-muted-foreground">Jan 15, 2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Good progress with knee exercises. Range of motion improved by 15 degrees. 
                      Continue current treatment plan.
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Jane Smith</h4>
                      <span className="text-xs text-muted-foreground">Jan 14, 2024</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Initial assessment completed. Developed treatment plan focusing on 
                      core strengthening and posture correction.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}