
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { signIn } from '@/lib/supabase';
import { toast } from 'sonner';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast: uiToast } = useToast();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Special case for demo credentials
      if (email === 'admin' && password === 'password') {
        // For demo purposes, simulate successful login
        setTimeout(() => {
          toast.success("Demo login successful");
          onLoginSuccess();
        }, 500);
        return;
      }
      
      // For real authentication, use Supabase
      const data = await signIn(email, password);
      
      if (data) {
        uiToast({
          title: "Authentication successful",
          description: "Welcome to the admin dashboard.",
          variant: "default",
        });
        onLoginSuccess();
      } else {
        uiToast({
          title: "Authentication failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      uiToast({
        title: "Authentication failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg border border-terminal-accent">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-terminal-accent focus:outline-none"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-white text-gray-900 border border-gray-300 rounded focus:ring-2 focus:ring-terminal-accent focus:outline-none"
              placeholder="••••••••"
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
