import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { Loader2 } from "lucide-react"

const staffSchema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type StaffFormData = z.infer<typeof staffSchema>

interface StaffCreationFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

const AVAILABLE_PERMISSIONS = [
  { id: "admin", label: "Admin - Full system access" },
  { id: "finance", label: "Finance - Billing & expenses" },
  { id: "coordination", label: "Coordination - Scheduling & management" },
  { id: "reception", label: "Reception - Check-in & logbook" },
  { id: "therapy", label: "Therapy - Patient sessions" },
]

export function StaffCreationForm({ onSuccess, onCancel }: StaffCreationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema),
  })

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(p => p !== permissionId)
        : [...prev, permissionId]
    )
  }

  const onSubmit = async (data: StaffFormData) => {
    if (selectedPermissions.length === 0) {
      toast.error("Please select at least one permission")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Create auth user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
          },
        },
      })

      if (authError) throw authError
      if (!authData.user) throw new Error("Failed to create user")

      // The profile will be created automatically by the trigger
      // Now we just need to add the permissions
      const { data: orgData } = await supabase
        .from("profiles")
        .select("organization_id")
        .eq("id", (await supabase.auth.getUser()).data.user?.id)
        .single()

      if (!orgData) throw new Error("Could not get organization")

      // Insert permissions
      const permissionInserts = selectedPermissions.map(permission => ({
        user_id: authData.user.id,
        organization_id: orgData.organization_id,
        permission,
      }))

      const { error: permError } = await supabase
        .from("staff_permissions")
        .insert(permissionInserts)

      if (permError) throw permError

      toast.success("Staff member created successfully!")
      onSuccess?.()
    } catch (error: any) {
      console.error("Error creating staff:", error)
      toast.error(error.message || "Failed to create staff member")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Dr. Jane Smith"
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="jane@clinic.com"
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Temporary Password *</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Minimum 6 characters"
          className={errors.password ? "border-destructive" : ""}
        />
        {errors.password && (
          <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          User will be prompted to change password on first login
        </p>
      </div>

      <div>
        <Label className="mb-3 block">Permissions *</Label>
        <div className="space-y-3">
          {AVAILABLE_PERMISSIONS.map((permission) => (
            <div key={permission.id} className="flex items-center space-x-2">
              <Checkbox
                id={permission.id}
                checked={selectedPermissions.includes(permission.id)}
                onCheckedChange={() => togglePermission(permission.id)}
              />
              <Label
                htmlFor={permission.id}
                className="text-sm font-normal cursor-pointer"
              >
                {permission.label}
              </Label>
            </div>
          ))}
        </div>
        {selectedPermissions.length === 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            Select at least one permission
          </p>
        )}
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Create Staff Account
        </Button>
      </div>
    </form>
  )
}