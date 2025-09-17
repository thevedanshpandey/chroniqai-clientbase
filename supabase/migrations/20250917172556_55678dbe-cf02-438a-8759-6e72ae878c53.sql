-- Remove the overly permissive RLS policies
DROP POLICY IF EXISTS "Clients can view their own data" ON public.clients;
DROP POLICY IF EXISTS "No insert/update/delete for clients" ON public.clients;

-- Create a secure authentication function that doesn't expose sensitive data
CREATE OR REPLACE FUNCTION public.authenticate_client(input_username text, input_password text)
RETURNS TABLE(
  success boolean,
  client_id uuid,
  client_name text,
  sheet_url text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  client_record RECORD;
  expected_password TEXT;
BEGIN
  -- Get client record
  SELECT id, username, client_name, sheet_url INTO client_record
  FROM public.clients 
  WHERE username = input_username;
  
  -- If no client found, return failure
  IF client_record.id IS NULL THEN
    RETURN QUERY SELECT false, NULL::uuid, NULL::text, NULL::text;
    RETURN;
  END IF;
  
  -- Check password (simple validation - in production use proper hashing)
  expected_password := input_username || '@22';
  
  IF input_password = expected_password THEN
    -- Return success with safe client data (no password hash)
    RETURN QUERY SELECT true, client_record.id, client_record.client_name, client_record.sheet_url;
  ELSE
    -- Return failure
    RETURN QUERY SELECT false, NULL::uuid, NULL::text, NULL::text;
  END IF;
END;
$$;

-- Create restrictive RLS policies
-- Prevent all direct access to the clients table
CREATE POLICY "No direct access to clients table" 
ON public.clients 
FOR ALL 
USING (false);

-- Grant execute permission on the authentication function to anon users
GRANT EXECUTE ON FUNCTION public.authenticate_client TO anon;