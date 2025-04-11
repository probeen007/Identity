
import { useState, useEffect } from 'react';

/**
 * Custom hook for data management with optimized performance
 * @param tableName The name of the table (for logging only)
 * @param initialData The initial data
 * @param fetchFunction The function to fetch data
 * @returns The current data and loading state
 */
export const useRealTimeData = <T>(
  tableName: string,
  initialData: T[],
  fetchFunction: () => Promise<T[]>
) => {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);

  // Log on mount only to reduce console noise
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Using mock data for ${tableName}`);
    }
  }, [tableName]);

  return { data, setData, loading };
};

export default useRealTimeData;
