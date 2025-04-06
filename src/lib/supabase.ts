
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables. Check your .env file.");
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
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
    console.error("Sign in error:", error);
    return handleSupabaseError(error, "Failed to sign in");
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    toast.success("Signed out successfully");
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

// Generic database operations
export const fetchData = async (table: string) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select('*');
    
    if (error) throw error;
    return data;
  } catch (error) {
    return handleSupabaseError(error, `Failed to fetch ${table}`);
  }
};

export const updateData = async (table: string, id: string, updates: any) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    toast.success("Data updated successfully");
    return data;
  } catch (error) {
    return handleSupabaseError(error, `Failed to update ${table}`);
  }
};

export const insertData = async (table: string, data: any) => {
  try {
    const { data: newData, error } = await supabase
      .from(table)
      .insert([data])
      .select()
      .single();
    
    if (error) throw error;
    toast.success("Data added successfully");
    return newData;
  } catch (error) {
    return handleSupabaseError(error, `Failed to add to ${table}`);
  }
};

export const deleteData = async (table: string, id: string) => {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    toast.success("Data deleted successfully");
    return true;
  } catch (error) {
    return handleSupabaseError(error, `Failed to delete from ${table}`);
  }
};
