
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

/**
 * Custom hook for data management (no real-time updates)
 * @param tableName The name of the table (for logging only)
 * @param initialData The initial data
 * @param fetchFunction The function to fetch data (not actually used)
 * @returns The current data and loading state
 */
export const useRealTimeData = <T>(
  tableName: string,
  initialData: T[],
  fetchFunction: () => Promise<T[]>
) => {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);

  // No real database operations, just return the initial data
  useEffect(() => {
    console.log(`Using mock data for ${tableName}`);
  }, [tableName]);

  return { data, setData, loading };
};

export default useRealTimeData;
