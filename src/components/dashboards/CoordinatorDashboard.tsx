import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Clock, Plus } from "lucide-react"

const mockSchedules = [
  { 
    id: 1, 
    patient: "John Doe", 
    therapist: "Dr. Sarah Johnson", 
    time: "09:00 AM", 
    date: "2024-01-16",
    status: "scheduled",
    duration: "60 min"
  },
  { 
    id: 2, 
    patient: "Jane Smith", 
    therapist: "Dr. Mike Chen", 
    time: "10:30 AM", 
    date: "2024-01-16",
    status: "in-progress",
    duration: "45 min"
  },
  { 
    id: 3, 
    patient: "Bob Johnson", 
    therapist: "Dr. Sarah Johnson", 
    time: "02:00 PM", 
    date: "2024-01-16",
    status: "scheduled",
    duration: "60 min"
  },
]

const mockTherapists = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Physical Therapy", appointments: 5 },
  { id: 2, name: "Dr. Mike Chen", specialty: "Occupational Therapy", appointments: 3 },
  { id: 3, name: "Dr. Lisa Roberts", specialty: "Speech Therapy", appointments: 4 },
]

export function CoordinatorDashboard() {
  const [selectedDate, setSelectedDate] = useState("2024-01-16")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-primary text-primary-foreground"
      case "in-progress":
        return "bg-accent text-accent-foreground"
      case "completed":
        return "bg-success text-success-foreground"
      case "cancelled":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Coordinator Dashboard</h1>
          <p className="text-muted-foreground">Manage schedules and therapist assignments</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSchedules.length}</div>
            <p className="text-xs text-muted-foreground">
              3 scheduled, 1 in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Therapists</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTherapists.length}</div>
            <p className="text-xs text-muted-foreground">
              All available today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Queue Status</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Patients waiting
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Wait Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8 min</div>
            <p className="text-xs text-muted-foreground">
              Below target of 15 min
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
          <TabsTrigger value="therapists">Therapist Workload</TabsTrigger>
          <TabsTrigger value="queue">Reception Queue</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Schedule for {selectedDate}</h2>
            <div className="flex gap-2">
              <Button variant="outline">Previous Day</Button>
              <Button variant="outline">Next Day</Button>
            </div>
          </div>

          <div className="grid gap-4">
            {mockSchedules.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{appointment.patient}</h3>
                      <p className="text-sm text-muted-foreground">
                        with {appointment.therapist} • {appointment.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{appointment.time}</span>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="therapists" className="space-y-6">
          <h2 className="text-xl font-semibold">Therapist Workload</h2>
          
          <div className="grid gap-4">
            {mockTherapists.map((therapist) => (
              <Card key={therapist.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{therapist.name}</h3>
                      <p className="text-sm text-muted-foreground">{therapist.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold">{therapist.appointments}</span>
                    <span className="text-sm text-muted-foreground">appointments today</span>
                    <Button variant="outline" size="sm">
                      Assign Patient
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="queue" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Reception Queue</h2>
            <Badge className="bg-primary text-primary-foreground">
              Live Updates
            </Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Expected Arrivals</CardTitle>
              <CardDescription>
                Patients scheduled to arrive soon for reception check-in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockSchedules.filter(apt => apt.status === 'scheduled').map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{appointment.patient}</h4>
                    <p className="text-sm text-muted-foreground">
                      Expected at {appointment.time} • {appointment.therapist}
                    </p>
                  </div>
                  <Badge variant="outline">
                    Expected
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}