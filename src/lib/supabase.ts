
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

// Create a simple mock client (not connecting to real backend)
export const supabase = createClient(
  "https://example.supabase.co", // Mock URL
  "mock-anon-key", // Mock key
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  }
);

// These functions now return mock data and don't try to connect to a real database
export const signIn = async (email: string, password: string) => {
  console.log("Mock sign in:", email);
  return { user: { email } };
};

export const signOut = async () => {
  console.log("Mock sign out");
  return true;
};

export const getCurrentUser = async () => {
  return null;
};

// Mock data operations - all of these return empty arrays or success messages
export const fetchData = async (table: string) => {
  console.log(`Mock fetch from ${table}`);
  return [];
};

export const updateData = async (table: string, id: string, updates: any) => {
  console.log(`Mock update ${table} with ID ${id}:`, updates);
  return { ...updates, id };
};

export const insertData = async (table: string, data: any) => {
  console.log(`Mock insert into ${table}:`, data);
  return { ...data, id: `mock-${Date.now()}` };
};

export const deleteData = async (table: string, id: string) => {
  console.log(`Mock delete from ${table} with ID ${id}`);
  return true;
};

// Mock real-time functionality
export const setupRealtimeListener = (
  table: string,
  eventType: 'INSERT' | 'UPDATE' | 'DELETE' | '*' = '*',
  callback: (payload: any) => void
) => {
  console.log(`Mock real-time listener set up for ${table}`);
  return () => {
    console.log(`Mock real-time listener cleaned up for ${table}`);
  };
};
