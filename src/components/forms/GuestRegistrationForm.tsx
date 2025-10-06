import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { Loader2 } from "lucide-react"

const guestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(20).optional().or(z.literal("")),
  purpose: z.string().min(3, "Purpose is required").max(200),
  company: z.string().max(100).optional().or(z.literal("")),
})

type GuestFormData = z.infer<typeof guestSchema>

interface GuestRegistrationFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function GuestRegistrationForm({ onSuccess, onCancel }: GuestRegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
  })

  const onSubmit = async (data: GuestFormData) => {
    setIsSubmitting(true)
    
    try {
      const { error } = await supabase
        .from("guests")
        .insert([{
          name: data.name,
          email: data.email || null,
          phone: data.phone || null,
          purpose: data.purpose,
          company: data.company || null,
        }])

      if (error) throw error

      toast.success("Guest registered successfully!")
      onSuccess?.()
    } catch (error: any) {
      console.error("Error registering guest:", error)
      toast.error(error.message || "Failed to register guest")
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
          placeholder="John Doe"
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
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

      <div>
        <Label htmlFor="purpose">Purpose of Visit *</Label>
        <Input
          id="purpose"
          {...register("purpose")}
          placeholder="Meeting, Consultation, etc."
          className={errors.purpose ? "border-destructive" : ""}
        />
        {errors.purpose && (
          <p className="text-sm text-destructive mt-1">{errors.purpose.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          {...register("company")}
          placeholder="Company Name"
        />
      </div>

      <div className="flex gap-2 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Register Guest
        </Button>
      </div>
    </form>
  )
}