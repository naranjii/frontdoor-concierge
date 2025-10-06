import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { Loader2 } from "lucide-react"

const patientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(20).optional().or(z.literal("")),
  date_of_birth: z.string().optional(),
  address: z.string().max(500).optional().or(z.literal("")),
  emergency_contact: z.string().max(200).optional().or(z.literal("")),
  medical_notes: z.string().max(2000).optional().or(z.literal("")),
  support_level: z.string().optional().or(z.literal("")),
  healthcare_id: z.string().max(100).optional().or(z.literal("")),
})

type PatientFormData = z.infer<typeof patientSchema>

interface PatientRegistrationFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function PatientRegistrationForm({ onSuccess, onCancel }: PatientRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  })

  const supportLevel = watch("support_level")

  const onSubmit = async (data: PatientFormData) => {
    setIsSubmitting(true)
    
    try {
      const { data: result, error } = await supabase
        .from("patients")
        .insert([{
          name: data.name,
          email: data.email || null,
          phone: data.phone || null,
          date_of_birth: data.date_of_birth || null,
          address: data.address || null,
          emergency_contact: data.emergency_contact || null,
          medical_notes: data.medical_notes || null,
          support_level: data.support_level || null,
          healthcare_id: data.healthcare_id || null,
        }])
        .select()

      if (error) throw error

      toast.success("Patient registered successfully!")
      onSuccess?.()
    } catch (error: any) {
      console.error("Error registering patient:", error)
      toast.error(error.message || "Failed to register patient")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="John Doe"
            className={errors.name ? "border-destructive" : ""}
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="healthcare_id">Healthcare ID</Label>
          <Input
            id="healthcare_id"
            {...register("healthcare_id")}
            placeholder="HC-123456"
          />
          {errors.healthcare_id && (
            <p className="text-sm text-destructive mt-1">{errors.healthcare_id.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="john@example.com"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            {...register("phone")}
            placeholder="+1234567890"
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && (
            <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date_of_birth">Date of Birth</Label>
          <Input
            id="date_of_birth"
            type="date"
            {...register("date_of_birth")}
          />
        </div>

        <div>
          <Label htmlFor="support_level">Support Level</Label>
          <Select
            value={supportLevel}
            onValueChange={(value) => setValue("support_level", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select support level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="minimal">Minimal Support</SelectItem>
              <SelectItem value="moderate">Moderate Support</SelectItem>
              <SelectItem value="extensive">Extensive Support</SelectItem>
              <SelectItem value="intensive">Intensive Support</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          {...register("address")}
          placeholder="123 Main St, City, State, ZIP"
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="emergency_contact">Emergency Contact</Label>
        <Input
          id="emergency_contact"
          {...register("emergency_contact")}
          placeholder="Jane Doe - +1234567890"
        />
      </div>

      <div>
        <Label htmlFor="medical_notes">Medical Notes</Label>
        <Textarea
          id="medical_notes"
          {...register("medical_notes")}
          placeholder="Any relevant medical information..."
          rows={3}
          className={errors.medical_notes ? "border-destructive" : ""}
        />
        {errors.medical_notes && (
          <p className="text-sm text-destructive mt-1">{errors.medical_notes.message}</p>
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
          Register Patient
        </Button>
      </div>
    </form>
  )
}