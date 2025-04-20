import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl) throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
if (!supabaseAnonKey) throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
if (!supabaseServiceRoleKey) throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY');

// Create a Supabase client with the anonymous key for public operations
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Create a Supabase client with the service role key for admin operations
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceRoleKey); 