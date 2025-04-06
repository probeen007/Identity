
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { signIn } from '@/lib/supabase';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Use supabase signIn method
      const data = await signIn(username, password);
      
      if (data) {
        toast({
          title: "Authentication successful",
          description: "Welcome to the admin dashboard.",
          variant: "default",
        });
        onLoginSuccess();
      } else {
        toast({
          title: "Authentication failed",
          description: "Invalid username or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Authentication failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white/90 dark:bg-gray-800 rounded-lg shadow-lg border border-terminal-accent">
      <h1 className="text-2xl font-bold text-center mb-6 text-terminal-accent">Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-800 dark:text-gray-200 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 bg-gray-100 text-gray-900 border border-terminal-accent/70 rounded focus:ring-2 focus:ring-terminal-accent focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-800 dark:text-gray-200 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-100 text-gray-900 border border-terminal-accent/70 rounded focus:ring-2 focus:ring-terminal-accent focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition font-bold"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="text-xs text-center p-2 rounded bg-gray-100 text-gray-800 border border-gray-200">
            <p>Demo credentials:</p>
            <p className="font-bold">Username: admin / Password: password</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
