import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Link } from "react-router-dom"
import { 
  Users, 
  Shield, 
  Settings, 
  Download, 
  Upload, 
  Plus, 
  Edit, 
  Trash2, 
  Building2,
  UserPlus,
  Database,
  Key
} from "lucide-react"
import { toast } from "sonner"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false)

  const mockStaff = [
    { id: 1, name: "Dr. Sarah Johnson", email: "sarah@clinic.com", role: "THERAPIST", status: "active" },
    { id: 2, name: "Mike Chen", email: "mike@clinic.com", role: "COORDINATOR", status: "active" },
    { id: 3, name: "Lisa Roberts", email: "lisa@clinic.com", role: "RECEPTIONIST", status: "active" },
    { id: 4, name: "John Finance", email: "john@clinic.com", role: "FINANCE", status: "inactive" }
  ]

  const filteredStaff = mockStaff.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
  }

  const getRoleColor = (role: string) => {
    const colors = {
      "ADMIN": "bg-destructive text-destructive-foreground",
      "THERAPIST": "bg-success text-success-foreground", 
      "COORDINATOR": "bg-accent text-accent-foreground",
      "RECEPTIONIST": "bg-primary text-primary-foreground",
      "FINANCE": "bg-warning text-warning-foreground"
    }
    return colors[role as keyof typeof colors] || "bg-secondary text-secondary-foreground"
  }

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">OTWare Admin</h1>
            </Link>
            <div className="flex items-center gap-2">
              <Badge className="bg-destructive text-destructive-foreground">Administrator</Badge>
              <Button variant="outline" onClick={() => toast.success("Data exported!")}>
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" onClick={() => toast.success("Data imported!")}>
                <Upload className="w-4 h-4 mr-2" />
                Import Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStaff.length}</div>
              <p className="text-xs text-muted-foreground">
                {mockStaff.filter(s => s.status === "active").length} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Currently logged in</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">99.9%</div>
              <p className="text-xs text-muted-foreground">Uptime</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Usage</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4GB</div>
              <p className="text-xs text-muted-foreground">Storage used</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="staff" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="staff">Staff Management</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="system">System Settings</TabsTrigger>
          </TabsList>

          {/* Staff Management */}
          <TabsContent value="staff" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Staff Management</h2>
              <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Staff Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Staff Member</DialogTitle>
                    <DialogDescription>Create a new staff account with role-based permissions</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="staffName">Full Name</Label>
                      <Input id="staffName" placeholder="Dr. Jane Smith" />
                    </div>
                    <div>
                      <Label htmlFor="staffEmail">Email</Label>
                      <Input id="staffEmail" type="email" placeholder="jane@clinic.com" />
                    </div>
                    <div>
                      <Label htmlFor="staffRole">Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="THERAPIST">Therapist</SelectItem>
                          <SelectItem value="COORDINATOR">Coordinator</SelectItem>
                          <SelectItem value="RECEPTIONIST">Receptionist</SelectItem>
                          <SelectItem value="FINANCE">Finance</SelectItem>
                          <SelectItem value="ADMIN">Administrator</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => {
                        toast.success("Staff member added successfully!")
                        setIsAddStaffOpen(false)
                      }}
                    >
                      Create Account
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex items-center gap-4">
              <Input
                placeholder="Search staff by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>

            <div className="grid gap-4">
              {filteredStaff.map((staff) => (
                <Card key={staff.id}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{staff.name}</h3>
                        <p className="text-sm text-muted-foreground">{staff.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getRoleColor(staff.role)}>
                        {staff.role}
                      </Badge>
                      <Badge className={getStatusColor(staff.status)}>
                        {staff.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Permissions */}
          <TabsContent value="permissions" className="space-y-6">
            <h2 className="text-2xl font-bold">Role Permissions</h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Configure Role Permissions
                </CardTitle>
                <CardDescription>
                  Set access levels and capabilities for each role
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Role</Label>
                  <Select defaultValue="THERAPIST">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="THERAPIST">Therapist</SelectItem>
                      <SelectItem value="COORDINATOR">Coordinator</SelectItem>
                      <SelectItem value="RECEPTIONIST">Receptionist</SelectItem>
                      <SelectItem value="FINANCE">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Permissions</h4>
                  <div className="space-y-2">
                    {[
                      "View patient records",
                      "Edit patient records", 
                      "Access financial data",
                      "Manage schedules",
                      "Generate reports",
                      "Export data"
                    ].map((permission) => (
                      <div key={permission} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">{permission}</span>
                        <input type="checkbox" className="rounded" defaultChecked={Math.random() > 0.5} />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <h2 className="text-2xl font-bold">System Settings</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Database Management</CardTitle>
                  <CardDescription>Backup and restore system data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Database
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Database
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Database className="w-4 h-4 mr-2" />
                    Create Backup
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>General system settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Institution Name</Label>
                    <Input defaultValue="Wellness Health Center" />
                  </div>
                  <div>
                    <Label>Timezone</Label>
                    <Select defaultValue="UTC-5">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                        <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                        <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}