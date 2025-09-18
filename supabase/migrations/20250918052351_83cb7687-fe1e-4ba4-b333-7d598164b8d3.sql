-- Fix remaining function search path issues

-- Update the verify_client_password function to have immutable search_path
CREATE OR REPLACE FUNCTION public.verify_client_password(input_username text, input_password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  stored_hash TEXT;
BEGIN
  -- Get the stored password hash for the username
  SELECT password_hash INTO stored_hash 
  FROM public.clients 
  WHERE username = input_username;
  
  -- If no user found, return false
  IF stored_hash IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Verify the password using crypt
  RETURN stored_hash = crypt(input_password, stored_hash);
END;
$$;