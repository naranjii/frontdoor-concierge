-- Add support_level and healthcare_id to patients table
ALTER TABLE public.patients 
ADD COLUMN IF NOT EXISTS support_level TEXT,
ADD COLUMN IF NOT EXISTS healthcare_id TEXT;

-- Add comment for clarity
COMMENT ON COLUMN public.patients.support_level IS 'Level of support needed by the patient';
COMMENT ON COLUMN public.patients.healthcare_id IS 'Healthcare/Insurance identification number';