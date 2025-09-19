import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { 
  Calendar, 
  Users, 
  Clock, 
  Plus, 
  Edit,
  Building2,
  CalendarDays,
  UserCheck,
  Activity,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { toast } from "sonner"

export default function CoordinatorDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const mockSchedules = [
    { id: 1, patient: "John Doe", therapist: "Dr. Sarah Johnson", time: "09:00", duration: "60min", status: "confirmed", type: "Physical Therapy" },
    { id: 2, patient: "Jane Smith", therapist: "Dr. Mike Chen", time: "10:30", duration: "45min", status: "pending", type: "Speech Therapy" },
    { id: 3, patient: "Bob Johnson", therapist: "Dr. Lisa Roberts", time: "14:00", duration: "60min", status: "confirmed", type: "Occupational Therapy" },
    { id: 4, patient: "Alice Brown", therapist: "Dr. Sarah Johnson", time: "15:30", duration: "30min", status: "waiting", type: "Consultation" }
  ]

  const mockTherapists = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "Physical Therapy", appointments: 6, availability: "Available", workload: 85 },
    { id: 2, name: "Dr. Mike Chen", specialty: "Speech Therapy", appointments: 4, availability: "Busy", workload: 70 },
    { id: 3, name: "Dr. Lisa Roberts", specialty: "Occupational Therapy", appointments: 5, availability: "Available", workload: 75 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success text-success-foreground"
      case "pending":
        return "bg-warning text-warning-foreground"
      case "waiting":
        return "bg-primary text-primary-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getWorkloadColor = (workload: number) => {
    if (workload >= 80) return "text-destructive"
    if (workload >= 60) return "text-warning"
    return "text-success"
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate)
    newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 1 : -1))
    setSelectedDate(newDate)
  }

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">OTWare Coordinator</h1>
            </Link>
            <div className="flex items-center gap-2">
              <Badge className="bg-accent text-accent-foreground">Coordinator</Badge>
              <Button onClick={() => toast.success("New appointment scheduled!")}>
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
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
              <div className="text-2xl font-bold">{mockSchedules.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockSchedules.filter(s => s.status === 'confirmed').length} confirmed
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
                {mockTherapists.filter(t => t.availability === 'Available').length} available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Workload</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(mockTherapists.reduce((sum, t) => sum + t.workload, 0) / mockTherapists.length)}%
              </div>
              <p className="text-xs text-muted-foreground">Capacity utilization</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reception Queue</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Patients waiting</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="schedule" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="schedule">Today's Schedule</TabsTrigger>
            <TabsTrigger value="therapists">Therapist Workload</TabsTrigger>
            <TabsTrigger value="queue">Reception Queue</TabsTrigger>
          </TabsList>

          {/* Schedule */}
          <TabsContent value="schedule" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">Schedule</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateDay('prev')}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="px-4 py-2 bg-card rounded-md">
                    <p className="font-medium">{formatDate(selectedDate)}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigateDay('next')}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button onClick={() => toast.success("New appointment created!")}>
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </Button>
            </div>

            <div className="grid gap-4">
              {mockSchedules.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{appointment.patient}</h3>
                        <p className="text-sm text-muted-foreground">
                          {appointment.time} • {appointment.duration} • {appointment.therapist}
                        </p>
                        <p className="text-sm text-muted-foreground">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Therapists */}
          <TabsContent value="therapists" className="space-y-6">
            <h2 className="text-2xl font-bold">Therapist Workload</h2>
            
            <div className="grid gap-4">
              {mockTherapists.map((therapist) => (
                <Card key={therapist.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
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
                        <Badge variant={therapist.availability === "Available" ? "default" : "secondary"}>
                          {therapist.availability}
                        </Badge>
                        <Button variant="outline" size="sm">Assign Patient</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Today's Appointments: {therapist.appointments}</span>
                        <span className={getWorkloadColor(therapist.workload)}>
                          Workload: {therapist.workload}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${therapist.workload >= 80 ? 'bg-destructive' : therapist.workload >= 60 ? 'bg-warning' : 'bg-success'}`}
                          style={{ width: `${therapist.workload}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Queue */}
          <TabsContent value="queue" className="space-y-6">
            <h2 className="text-2xl font-bold">Reception Queue</h2>
            
            <div className="grid gap-4">
              {[
                { name: "Emily Davis", therapist: "Dr. Sarah Johnson", time: "10:30 AM", status: "waiting" },
                { name: "Michael Brown", therapist: "Dr. Mike Chen", time: "11:00 AM", status: "processing" },
                { name: "Sarah Wilson", therapist: "Dr. Lisa Roberts", time: "11:30 AM", status: "waiting" }
              ].map((item, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Appointment with {item.therapist} at {item.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Notify Therapist
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}