import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Staff {
  id: string
  email: string
  name: string
  role: 'ADMIN' | 'RECEPTIONIST' | 'COORDINATOR' | 'THERAPIST' | 'FINANCE'
  privileges: string[]
  created_at: string
  updated_at: string
}

export interface Patient {
  id: string
  name: string
  email?: string
  phone?: string
  date_of_birth?: string
  address?: string
  emergency_contact?: string
  medical_notes?: string
  created_at: string
  updated_at: string
}

export interface Guest {
  id: string
  name: string
  email?: string
  phone?: string
  purpose: string
  company?: string
  created_at: string
  updated_at: string
}

export interface LogbookEntry {
  id: string
  type: 'check-in' | 'check-out'
  person_type: 'patient' | 'guest'
  person_id: string
  person_name: string
  purpose?: string
  notes?: string
  staff_id: string
  timestamp: string
  status: 'active' | 'completed'
}

export interface Schedule {
  id: string
  patient_id: string
  therapist_id: string
  coordinator_id?: string
  appointment_date: string
  start_time: string
  end_time: string
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
}

export interface SessionNote {
  id: string
  patient_id: string
  therapist_id: string
  session_date: string
  notes: string
  treatment_plan?: string
  next_appointment?: string
  created_at: string
}

export interface Invoice {
  id: string
  patient_id?: string
  amount: number
  description: string
  status: 'pending' | 'paid' | 'overdue'
  due_date: string
  created_at: string
}

export interface Expense {
  id: string
  description: string
  amount: number
  category: string
  staff_id: string
  date: string
  created_at: string
}