
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { initializeDatabase } from './services/dataService';
import { toast } from 'sonner';

function App() {
  useEffect(() => {
    // Initialize database on app start
    const initDb = async () => {
      try {
        await initializeDatabase();
      } catch (error) {
        console.error("Failed to initialize database:", error);
        toast.error("Failed to connect to database. Some features may not work correctly.");
      }
    };
    
    initDb();
  }, []);

  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}

export default App;
