-- Create a function to create test table if it doesn't exist
CREATE OR REPLACE FUNCTION create_test_table(table_name text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = table_name) THEN
    EXECUTE format('CREATE TABLE IF NOT EXISTS public.%I (id serial PRIMARY KEY, created_at timestamptz DEFAULT now())', table_name);
  END IF;
END;
$$;

-- Grant execute permission to authenticated and anon users
GRANT EXECUTE ON FUNCTION create_test_table TO authenticated, anon; 