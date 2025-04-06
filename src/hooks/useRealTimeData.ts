
import { useState, useEffect } from 'react';
import { setupRealtimeListener } from '@/lib/supabase';
import { toast } from 'sonner';

/**
 * Custom hook for real-time data updates
 * @param tableName The name of the table to listen for changes
 * @param initialData The initial data
 * @param fetchFunction The function to fetch updated data
 * @returns The current data and loading state
 */
export const useRealTimeData = <T>(
  tableName: string,
  initialData: T[],
  fetchFunction: () => Promise<T[]>
) => {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);

  // Setup real-time listener
  useEffect(() => {
    // Initial fetch
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log(`Fetching ${tableName} data...`);
        const freshData = await fetchFunction();
        console.log(`${tableName} data fetched:`, freshData);
        setData(freshData);
      } catch (error) {
        console.error(`Error fetching ${tableName}:`, error);
        toast.error(`Failed to load ${tableName}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Setup real-time listener
    const cleanup = setupRealtimeListener(tableName, '*', async (payload) => {
      console.log(`Real-time update for ${tableName}:`, payload);
      
      // Optimistically update the UI based on the change type
      if (payload.eventType === 'INSERT') {
        setData(prev => [...prev, payload.new as T]);
      } else if (payload.eventType === 'UPDATE') {
        setData(prev => prev.map(item => 
          // @ts-ignore - We know id exists on our data types
          item.id === payload.new.id ? payload.new as T : item
        ));
      } else if (payload.eventType === 'DELETE') {
        setData(prev => prev.filter(item => 
          // @ts-ignore - We know id exists on our data types
          item.id !== payload.old.id
        ));
      } else {
        // If we can't handle it optimistically, re-fetch the data
        const freshData = await fetchFunction();
        setData(freshData);
      }
    });

    return cleanup;
  }, [tableName, fetchFunction]);

  return { data, setData, loading };
};

export default useRealTimeData;
