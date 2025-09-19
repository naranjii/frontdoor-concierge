import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router-dom"
import { 
  Users, 
  UserPlus, 
  Clock, 
  Search, 
  Plus, 
  FileText, 
  QrCode,
  Building2,
  UserCheck,
  Activity
} from "lucide-react"
import { toast } from "sonner"

export default function ReceptionistDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCheckInOpen, setIsCheckInOpen] = useState(false)
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false)
  const [isNewGuestOpen, setIsNewGuestOpen] = useState(false)

  const mockPatients = [
    { id: 1, name: "John Doe", phone: "(555) 123-4567", lastVisit: "2024-01-10", status: "active" },
    { id: 2, name: "Jane Smith", phone: "(555) 234-5678", lastVisit: "2024-01-08", status: "active" },
    { id: 3, name: "Bob Johnson", phone: "(555) 345-6789", lastVisit: "2023-12-15", status: "inactive" }
  ]

  const mockQueue = [
    { id: 1, name: "John Doe", type: "Patient", time: "10:30 AM", status: "waiting", therapist: "Dr. Sarah Johnson" },
    { id: 2, name: "Jane Smith", type: "Guest", time: "10:45 AM", status: "processing", purpose: "Consultation" },
    { id: 3, name: "Bob Johnson", type: "Patient", time: "11:00 AM", status: "waiting", therapist: "Dr. Mike Chen" }
  ]

  const mockExpectedArrivals = [
    { id: 1, name: "Alice Brown", time: "11:30 AM", therapist: "Dr. Sarah Johnson", type: "Physical Therapy" },
    { id: 2, name: "Charlie Davis", time: "12:00 PM", therapist: "Dr. Lisa Roberts", type: "Speech Therapy" },
    { id: 3, name: "Emma Wilson", time: "12:30 PM", therapist: "Dr. Mike Chen", type: "Occupational Therapy" }
  ]

  const filteredPatients = mockPatients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "bg-warning text-warning-foreground"
      case "processing":
        return "bg-primary text-primary-foreground"
      case "completed":
        return "bg-success text-success-foreground"
      default:
        return "bg-secondary text-secondary-foreground"
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
              <h1 className="text-2xl font-bold text-foreground">OTWare Reception</h1>
            </Link>
            <div className="flex items-center gap-2">
              <Badge className="bg-primary text-primary-foreground">Receptionist</Badge>
              <Dialog open={isNewPatientOpen} onOpenChange={setIsNewPatientOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <UserPlus className="w-4 h-4 mr-2" />
                    New Patient
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Register New Patient</DialogTitle>
                    <DialogDescription>Add a new patient to the system</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="patientName">Full Name</Label>
                      <Input id="patientName" placeholder="Enter patient name" />
                    </div>
                    <div>
                      <Label htmlFor="patientPhone">Phone Number</Label>
                      <Input id="patientPhone" placeholder="(555) 123-4567" />
                    </div>
                    <div>
                      <Label htmlFor="patientEmail">Email</Label>
                      <Input id="patientEmail" type="email" placeholder="patient@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="patientDob">Date of Birth</Label>
                      <Input id="patientDob" type="date" />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        toast.success("Patient registered successfully!")
                        setIsNewPatientOpen(false)
                      }}
                    >
                      Register Patient
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isNewGuestOpen} onOpenChange={setIsNewGuestOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    New Guest
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Register New Guest</DialogTitle>
                    <DialogDescription>Add a new guest visitor</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="guestName">Full Name</Label>
                      <Input id="guestName" placeholder="Enter guest name" />
                    </div>
                    <div>
                      <Label htmlFor="guestPurpose">Purpose of Visit</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consultation">Initial Consultation</SelectItem>
                          <SelectItem value="family">Family Visit</SelectItem>
                          <SelectItem value="business">Business Meeting</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="guestCompany">Company/Organization</Label>
                      <Input id="guestCompany" placeholder="Optional" />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        toast.success("Guest registered successfully!")
                        setIsNewGuestOpen(false)
                      }}
                    >
                      Register Guest
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Users className="w-4 h-4 mr-2" />
                    Quick Check-in
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Quick Check-in</DialogTitle>
                    <DialogDescription>Check in a patient or guest</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input placeholder="Enter name" />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="patient">Patient</SelectItem>
                          <SelectItem value="guest">Guest</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => {
                        toast.success("Check-in completed!")
                        setIsCheckInOpen(false)
                      }}
                    >
                      Complete Check-in
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Stats Cards */}
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
              <CardTitle className="text-sm font-medium">Current Queue</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockQueue.length}</div>
              <p className="text-xs text-muted-foreground">People waiting</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expected Arrivals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockExpectedArrivals.length}</div>
              <p className="text-xs text-muted-foreground">Next 2 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Wait Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 min</div>
              <p className="text-xs text-success">Below target</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="queue" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="queue">Current Queue</TabsTrigger>
            <TabsTrigger value="expected">Expected Arrivals</TabsTrigger>
            <TabsTrigger value="patients">Patient Lookup</TabsTrigger>
            <TabsTrigger value="logbook">Today's Logbook</TabsTrigger>
          </TabsList>

          {/* Current Queue */}
          <TabsContent value="queue" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Current Queue</h2>
              <Badge className="bg-primary text-primary-foreground">
                Live Updates
              </Badge>
            </div>

            <div className="grid gap-4">
              {mockQueue.map((item) => (
                <Card key={item.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.type} • Arrived at {item.time}
                          {item.therapist && ` • ${item.therapist}`}
                          {item.purpose && ` • ${item.purpose}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Call Next
                      </Button>
                      <Button variant="outline" size="sm">
                        <QrCode className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Expected Arrivals */}
          <TabsContent value="expected" className="space-y-6">
            <h2 className="text-xl font-semibold">Expected Arrivals</h2>
            
            <div className="grid gap-4">
              {mockExpectedArrivals.map((arrival) => (
                <Card key={arrival.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{arrival.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {arrival.type} • {arrival.time} with {arrival.therapist}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">Expected</Badge>
                      <Button variant="outline" size="sm" onClick={() => setIsCheckInOpen(true)}>
                        Pre Check-in
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Patient Lookup */}
          <TabsContent value="patients" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Patient Lookup</h2>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
              </div>
            </div>

            <div className="grid gap-4">
              {filteredPatients.map((patient) => (
                <Card key={patient.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-semibold">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {patient.phone} • Last visit: {patient.lastVisit}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                        {patient.status}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => setIsCheckInOpen(true)}>
                        Check In
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Logbook */}
          <TabsContent value="logbook" className="space-y-6">
            <h2 className="text-xl font-semibold">Today's Logbook</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Check-in/Check-out Log</CardTitle>
                <CardDescription>Real-time visitor tracking for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Doe", action: "Check-in", time: "09:30 AM", type: "Patient" },
                    { name: "Jane Smith", action: "Check-out", time: "10:15 AM", type: "Guest" },
                    { name: "Bob Johnson", action: "Check-in", time: "10:30 AM", type: "Patient" },
                    { name: "Alice Brown", action: "Check-in", time: "11:00 AM", type: "Patient" }
                  ].map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          entry.action === "Check-in" ? "bg-success" : "bg-muted"
                        }`} />
                        <div>
                          <h4 className="font-medium">{entry.name}</h4>
                          <p className="text-sm text-muted-foreground">{entry.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">{entry.action}</div>
                        <div className="text-xs text-muted-foreground">{entry.time}</div>
                      </div>
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