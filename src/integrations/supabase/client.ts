// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vymhcofvwccvpiguuljz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5bWhjb2Z2d2NjdnBpZ3V1bGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3Mzk4NTMsImV4cCI6MjA1OTMxNTg1M30.szlur3_54B-uKf6KlcVAm03Pw4_47tsm9j0w1_STu9I";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);