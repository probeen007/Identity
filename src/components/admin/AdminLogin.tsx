
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be a proper authentication check
      if (username === 'admin' && password === 'password') {
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
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-hacker-light rounded shadow-lg border border-terminal-accent">
      <h1 className="text-2xl font-bold text-center mb-6 text-terminal-accent">Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-terminal-foreground">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded focus:ring-2 focus:ring-terminal-accent/50 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-terminal-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded focus:ring-2 focus:ring-terminal-accent/50 focus:outline-none"
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
          <div className="text-xs text-center text-terminal-foreground bg-hacker-dark p-2 rounded">
            <p>Demo credentials:</p>
            <p className="font-bold">Username: admin / Password: password</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
