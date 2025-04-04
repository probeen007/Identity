
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Index } from './pages/Index';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';
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
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
