// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ecboarkgvybmdyaalgpy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjYm9hcmtndnlibWR5YWFsZ3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIxMzIzNjMsImV4cCI6MjA1NzcwODM2M30.sLci-Kwu29XY4NKu3YgAM1odHoc98oh7g04RnEzn6FE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);