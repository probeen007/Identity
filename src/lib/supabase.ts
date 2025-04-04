
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Check your .env file.");
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Helper for handling errors
export const handleSupabaseError = (error: any, message = "An error occurred") => {
  console.error(error);
  toast.error(message);
  return null;
};

// Authentication helpers
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    return handleSupabaseError(error, "Failed to sign in");
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    return handleSupabaseError(error, "Failed to sign out");
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error) {
    return handleSupabaseError(error, "Failed to get user");
  }
};
