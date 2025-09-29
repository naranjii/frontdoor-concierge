-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create organizations table for multi-tenant support
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  plan_type TEXT NOT NULL DEFAULT 'free' CHECK (plan_type IN ('free', 'basic', 'professional', 'enterprise')),
  max_users INTEGER DEFAULT 1,
  subscription_status TEXT DEFAULT 'active' CHECK (subscription_status IN ('active', 'suspended', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create profiles table linked to auth.users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  is_owner BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create staff permissions table (separate from roles as requested)
CREATE TABLE public.staff_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  permission TEXT NOT NULL CHECK (permission IN ('admin', 'finance', 'coordination', 'therapy', 'reception')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, organization_id, permission)
);

-- Create patients table
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  date_of_birth DATE,
  address TEXT,
  emergency_contact TEXT,
  medical_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create guests table
CREATE TABLE public.guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  purpose TEXT NOT NULL,
  company TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create logbook entries table
CREATE TABLE public.logbook_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('check-in', 'check-out')),
  person_type TEXT NOT NULL CHECK (person_type IN ('patient', 'guest')),
  person_id UUID NOT NULL,
  person_name TEXT NOT NULL,
  purpose TEXT,
  notes TEXT,
  staff_id UUID REFERENCES public.profiles(id),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed'))
);

-- Create schedules table
CREATE TABLE public.schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  therapist_id UUID REFERENCES public.profiles(id),
  coordinator_id UUID REFERENCES public.profiles(id),
  appointment_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in-progress', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create session notes table
CREATE TABLE public.session_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
  therapist_id UUID REFERENCES public.profiles(id),
  session_date DATE NOT NULL,
  notes TEXT NOT NULL,
  treatment_plan TEXT,
  next_appointment TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create invoices table
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES public.patients(id),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'overdue')),
  due_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create expenses table
CREATE TABLE public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  staff_id UUID REFERENCES public.profiles(id),
  expense_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logbook_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_guests_updated_at BEFORE UPDATE ON public.guests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Helper function to get user's organization
CREATE OR REPLACE FUNCTION public.get_user_organization_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT organization_id FROM public.profiles WHERE id = auth.uid();
$$;

-- Helper function to check if user has permission
CREATE OR REPLACE FUNCTION public.user_has_permission(permission_name TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.staff_permissions sp
    JOIN public.profiles p ON sp.user_id = p.id
    WHERE p.id = auth.uid() 
    AND sp.permission = permission_name
  );
$$;

-- Helper function to check if user is organization owner
CREATE OR REPLACE FUNCTION public.user_is_org_owner()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT is_owner FROM public.profiles WHERE id = auth.uid();
$$;

-- RLS Policies for organizations
CREATE POLICY "Users can view their organization" ON public.organizations
  FOR SELECT USING (id = public.get_user_organization_id());

CREATE POLICY "Organization owners can update their organization" ON public.organizations
  FOR UPDATE USING (id = public.get_user_organization_id() AND public.user_is_org_owner());

-- RLS Policies for profiles
CREATE POLICY "Users can view profiles in their organization" ON public.profiles
  FOR SELECT USING (organization_id = public.get_user_organization_id());

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Organization owners can insert new profiles" ON public.profiles
  FOR INSERT WITH CHECK (organization_id = public.get_user_organization_id() AND public.user_is_org_owner());

-- RLS Policies for staff permissions
CREATE POLICY "Users can view permissions in their organization" ON public.staff_permissions
  FOR SELECT USING (organization_id = public.get_user_organization_id());

CREATE POLICY "Admins and owners can manage permissions" ON public.staff_permissions
  FOR ALL USING (
    organization_id = public.get_user_organization_id() 
    AND (public.user_has_permission('admin') OR public.user_is_org_owner())
  );

-- RLS Policies for patients
CREATE POLICY "Users can access patients in their organization" ON public.patients
  FOR ALL USING (organization_id = public.get_user_organization_id());

-- RLS Policies for guests
CREATE POLICY "Users can access guests in their organization" ON public.guests
  FOR ALL USING (organization_id = public.get_user_organization_id());

-- RLS Policies for logbook entries
CREATE POLICY "Users can access logbook entries in their organization" ON public.logbook_entries
  FOR ALL USING (organization_id = public.get_user_organization_id());

-- RLS Policies for schedules
CREATE POLICY "Users can access schedules in their organization" ON public.schedules
  FOR ALL USING (organization_id = public.get_user_organization_id());

-- RLS Policies for session notes
CREATE POLICY "Users can access session notes in their organization" ON public.session_notes
  FOR ALL USING (organization_id = public.get_user_organization_id());

-- RLS Policies for invoices
CREATE POLICY "Finance users can access invoices in their organization" ON public.invoices
  FOR ALL USING (
    organization_id = public.get_user_organization_id() 
    AND (public.user_has_permission('finance') OR public.user_has_permission('admin') OR public.user_is_org_owner())
  );

-- RLS Policies for expenses
CREATE POLICY "Finance users can access expenses in their organization" ON public.expenses
  FOR ALL USING (
    organization_id = public.get_user_organization_id() 
    AND (public.user_has_permission('finance') OR public.user_has_permission('admin') OR public.user_is_org_owner())
  );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_org_id UUID;
BEGIN
  -- Create a new organization for the user
  INSERT INTO public.organizations (name, plan_type, max_users)
  VALUES (NEW.raw_user_meta_data->>'full_name' || '''s Organization', 'free', 1)
  RETURNING id INTO new_org_id;
  
  -- Create the user profile
  INSERT INTO public.profiles (id, organization_id, email, name, is_owner)
  VALUES (
    NEW.id,
    new_org_id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    true
  );
  
  -- Give the user admin permissions
  INSERT INTO public.staff_permissions (user_id, organization_id, permission)
  VALUES (NEW.id, new_org_id, 'admin');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();