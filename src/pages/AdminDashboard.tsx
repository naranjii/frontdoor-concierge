import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SearchWithFilters } from "@/components/SearchWithFilters"
import { 
  Users, 
  Shield, 
  Settings, 
  Download, 
  Upload, 
  Plus, 
  Edit, 
  Trash2, 
  UserPlus,
  Database,
  Key,
  Eye,
  Activity
} from "lucide-react"
import { toast } from "sonner"

const mockStaff = [
  { id: 1, name: "Dr. Sarah Johnson", email: "sarah@clinic.com", role: "THERAPIST", status: "active", department: "Physical Therapy", joinDate: "2023-01-15" },
  { id: 2, name: "Mike Chen", email: "mike@clinic.com", role: "COORDINATOR", status: "active", department: "Administration", joinDate: "2023-03-10" },
  { id: 3, name: "Lisa Roberts", email: "lisa@clinic.com", role: "RECEPTIONIST", status: "active", department: "Front Desk", joinDate: "2023-02-20" },
  { id: 4, name: "John Finance", email: "john@clinic.com", role: "FINANCE", status: "inactive", department: "Finance", joinDate: "2022-11-05" },
  { id: 5, name: "Dr. Emily Davis", email: "emily@clinic.com", role: "THERAPIST", status: "active", department: "Speech Therapy", joinDate: "2023-04-12" }
]

export default function AdminDashboard() {
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false)
  const [filteredStaff, setFilteredStaff] = useState(mockStaff)

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

  const handleSearch = (query: string, filters: any[]) => {
    let filtered = mockStaff
    
    if (query) {
      filtered = filtered.filter(staff => 
        staff.name.toLowerCase().includes(query.toLowerCase()) ||
        staff.email.toLowerCase().includes(query.toLowerCase()) ||
        staff.department.toLowerCase().includes(query.toLowerCase())
      )
    }
    
    filters.forEach(filter => {
      if (filter.id === 'role' && filter.value) {
        filtered = filtered.filter(staff => staff.role === filter.value)
      }
      if (filter.id === 'status' && filter.value) {
        filtered = filtered.filter(staff => staff.status === filter.value)
      }
      if (filter.id === 'department' && filter.value) {
        filtered = filtered.filter(staff => staff.department === filter.value)
      }
    })
    
    setFilteredStaff(filtered)
  }

  const staffFilterOptions = [
    {
      id: 'role',
      label: 'Role',
      type: 'select' as const,
      options: [
        { value: 'ADMIN', label: 'Administrator' },
        { value: 'THERAPIST', label: 'Therapist' },
        { value: 'RECEPTIONIST', label: 'Receptionist' },
        { value: 'COORDINATOR', label: 'Coordinator' },
        { value: 'FINANCE', label: 'Finance' }
      ]
    },
    {
      id: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
      ]
    },
    {
      id: 'department',
      label: 'Department',
      type: 'select' as const,
      options: [
        { value: 'Physical Therapy', label: 'Physical Therapy' },
        { value: 'Speech Therapy', label: 'Speech Therapy' },
        { value: 'Administration', label: 'Administration' },
        { value: 'Front Desk', label: 'Front Desk' },
        { value: 'Finance', label: 'Finance' }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Staff Management</h2>
          <p className="text-muted-foreground">Manage your healthcare team and system settings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => toast.success("Data exported!")} className="shadow-soft">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
            <DialogTrigger asChild>
              <Button className="shadow-soft">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card shadow-medium">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
                <DialogDescription>Create a new staff account with role-based permissions</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="staffName">Full Name</Label>
                  <Input id="staffName" placeholder="Dr. Jane Smith" className="shadow-soft" />
                </div>
                <div>
                  <Label htmlFor="staffEmail">Email</Label>
                  <Input id="staffEmail" type="email" placeholder="jane@clinic.com" className="shadow-soft" />
                </div>
                <div>
                  <Label htmlFor="staffRole">Role</Label>
                  <Select>
                    <SelectTrigger className="shadow-soft">
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
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="shadow-soft hover:shadow-medium transition-shadow">
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

        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Currently logged in</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">99.9%</div>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow">
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
        <TabsList className="grid w-full grid-cols-3 bg-card shadow-soft">
          <TabsTrigger value="staff" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">Staff Management</TabsTrigger>
          <TabsTrigger value="permissions" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">Permissions</TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">System Settings</TabsTrigger>
        </TabsList>

        {/* Staff Management */}
        <TabsContent value="staff" className="space-y-6">
          <SearchWithFilters
            placeholder="Search staff by name, email, or department..."
            onSearch={handleSearch}
            filterOptions={staffFilterOptions}
            className="mb-6"
          />

          <div className="grid gap-4">
            {filteredStaff.map((staff) => (
              <Card key={staff.id} className="shadow-soft hover:shadow-medium transition-shadow">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                      <Users className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{staff.name}</h3>
                      <p className="text-sm text-muted-foreground">{staff.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{staff.department}</Badge>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">Joined {staff.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getRoleColor(staff.role)}>
                      {staff.role}
                    </Badge>
                    <Badge className={getStatusColor(staff.status)}>
                      {staff.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-accent hover:text-accent-foreground">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-destructive hover:text-destructive-foreground">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Permissions */}
        <TabsContent value="permissions" className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Role Permissions</h2>
          
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
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
                  <SelectTrigger className="shadow-soft">
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
                    <div key={permission} className="flex items-center justify-between p-3 border rounded-lg bg-card shadow-soft">
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
          <h2 className="text-2xl font-bold text-foreground">System Settings</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  Database Management
                </CardTitle>
                <CardDescription>Backup and restore system data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full shadow-soft hover:shadow-medium">
                  <Download className="w-4 h-4 mr-2" />
                  Export Database
                </Button>
                <Button variant="outline" className="w-full shadow-soft hover:shadow-medium">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Database
                </Button>
                <Button variant="outline" className="w-full shadow-soft hover:shadow-medium">
                  <Database className="w-4 h-4 mr-2" />
                  Create Backup
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  System Configuration
                </CardTitle>
                <CardDescription>General system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Institution Name</Label>
                  <Input defaultValue="Wellness Health Center" className="shadow-soft" />
                </div>
                <div>
                  <Label>Timezone</Label>
                  <Select defaultValue="UTC-5">
                    <SelectTrigger className="shadow-soft">
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
                <Button className="w-full shadow-soft">Save Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}