
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Use the Supabase project URL and anon key from config
const supabaseUrl = "https://vymhcofvwccvpiguuljz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5bWhjb2Z2d2NjdnBpZ3V1bGp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3Mzk4NTMsImV4cCI6MjA1OTMxNTg1M30.szlur3_54B-uKf6KlcVAm03Pw4_47tsm9j0w1_STu9I";

// Create Supabase client with real-time enabled
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
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

// Generic database operations with real-time support
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

// Setup real-time listeners for a table - fixed type error with Supabase channel
export const setupRealtimeListener = (
  table: string, 
  eventType: 'INSERT' | 'UPDATE' | 'DELETE' | '*' = '*',
  callback: (payload: any) => void
) => {
  // Using the correct type for the channel event
  const channel = supabase
    .channel(`table-${table}-changes`)
    .on(
      'postgres_changes',
      {
        event: eventType,
        schema: 'public',
        table: table
      },
      (payload) => {
        console.log('Real-time update received:', payload);
        callback(payload);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
