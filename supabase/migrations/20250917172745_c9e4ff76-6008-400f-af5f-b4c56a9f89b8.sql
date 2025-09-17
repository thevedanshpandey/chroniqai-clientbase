-- Fix the search_path security issue by making it immutable
CREATE OR REPLACE FUNCTION public.authenticate_client(input_username text, input_password text)
RETURNS TABLE(
  success boolean,
  client_id uuid,
  client_name text,
  sheet_url text
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = 'public'
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