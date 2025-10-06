import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  UserPlus,
  Edit, 
  Trash2,
  Activity,
  DollarSign,
  Calendar,
  FileText,
  Shield
} from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/hooks/useAuth"
import { StaffCreationForm } from "@/components/forms/StaffCreationForm"
import FinanceDashboard from "@/pages/FinanceDashboard"
import CoordinatorDashboard from "@/pages/CoordinatorDashboard"
import TherapistDashboard from "@/pages/TherapistDashboard"
import ReceptionistDashboard from "@/pages/ReceptionistDashboard"

interface StaffMember {
  id: string
  name: string
  email: string
  permissions: string[]
  is_owner: boolean
  created_at: string
}

export default function AdminDashboard() {
  const { permissions: userPermissions } = useAuth()
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false)
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStaff()
  }, [])

  const loadStaff = async () => {
    try {
      // Get all profiles in the organization
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })

      if (profileError) throw profileError

      // Get permissions for each user
      const staffWithPermissions = await Promise.all(
        (profiles || []).map(async (profile) => {
          const { data: perms } = await supabase
            .from("staff_permissions")
            .select("permission")
            .eq("user_id", profile.id)

          return {
            id: profile.id,
            name: profile.name,
            email: profile.email,
            permissions: perms?.map(p => p.permission) || [],
            is_owner: profile.is_owner || false,
            created_at: profile.created_at,
          }
        })
      )

      setStaff(staffWithPermissions)
    } catch (error: any) {
      console.error("Error loading staff:", error)
      toast.error("Failed to load staff members")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteStaff = async (staffId: string) => {
    if (!confirm("Are you sure you want to delete this staff member?")) return

    try {
      // Delete permissions first
      const { error: permError } = await supabase
        .from("staff_permissions")
        .delete()
        .eq("user_id", staffId)

      if (permError) throw permError

      // Delete profile (this will cascade to auth.users due to FK)
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", staffId)

      if (profileError) throw profileError

      toast.success("Staff member deleted")
      loadStaff()
    } catch (error: any) {
      console.error("Error deleting staff:", error)
      toast.error("Failed to delete staff member")
    }
  }

  const getPermissionColor = (permission: string) => {
    const colors: Record<string, string> = {
      admin: "bg-destructive text-destructive-foreground",
      finance: "bg-warning text-warning-foreground",
      coordination: "bg-accent text-accent-foreground",
      reception: "bg-primary text-primary-foreground",
      therapy: "bg-success text-success-foreground",
    }
    return colors[permission] || "bg-secondary text-secondary-foreground"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage staff and view all system dashboards</p>
        </div>
        <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
          <Button onClick={() => setIsAddStaffOpen(true)} className="shadow-soft">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Staff
          </Button>
          <DialogContent className="bg-card shadow-medium max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Staff Member</DialogTitle>
              <DialogDescription>Create a new staff account with custom permissions</DialogDescription>
            </DialogHeader>
            <StaffCreationForm
              onSuccess={() => {
                setIsAddStaffOpen(false)
                loadStaff()
              }}
              onCancel={() => setIsAddStaffOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staff.length}</div>
            <p className="text-xs text-muted-foreground">
              {staff.filter(s => !s.is_owner).length} staff members
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permissions</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(staff.flatMap(s => s.permissions)).size}
            </div>
            <p className="text-xs text-muted-foreground">Unique permission types</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Dashboards</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userPermissions.length}</div>
            <p className="text-xs text-muted-foreground">Accessible modules</p>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organization</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">System status</p>
          </CardContent>
        </Card>
      </div>

      {/* Staff Management Section */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Staff Management
          </CardTitle>
          <CardDescription>Manage staff accounts and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <Activity className="w-8 h-8 animate-spin mx-auto text-primary" />
              <p className="text-muted-foreground mt-2">Loading staff...</p>
            </div>
          ) : staff.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No staff members found</p>
          ) : (
            <div className="space-y-4">
              {staff.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-card shadow-soft hover:shadow-medium transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                      <Users className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        {member.name}
                        {member.is_owner && (
                          <Badge className="bg-warning text-warning-foreground">Owner</Badge>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {member.permissions.map((perm) => (
                          <Badge key={perm} className={getPermissionColor(perm)}>
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  {!member.is_owner && (
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-accent hover:text-accent-foreground"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleDeleteStaff(member.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Dashboards Accordion */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>System Dashboards</CardTitle>
          <CardDescription>Access all system modules based on your permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            {userPermissions.includes("finance") && (
              <AccordionItem value="finance">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-warning" />
                    <span className="font-semibold">Finance Dashboard</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4">
                    <FinanceDashboard />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {userPermissions.includes("coordination") && (
              <AccordionItem value="coordination">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span className="font-semibold">Coordination Dashboard</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4">
                    <CoordinatorDashboard />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {userPermissions.includes("therapy") && (
              <AccordionItem value="therapy">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-success" />
                    <span className="font-semibold">Therapy Dashboard</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4">
                    <TherapistDashboard />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {userPermissions.includes("reception") && (
              <AccordionItem value="reception">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Reception Dashboard</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4">
                    <ReceptionistDashboard />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}