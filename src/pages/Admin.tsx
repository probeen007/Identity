
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be a proper authentication check
      if (username === 'admin' && password === 'password') {
        setAuthenticated(true);
        toast({
          title: "Authentication successful",
          description: "Welcome to the admin dashboard.",
          variant: "default",
        });
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

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-terminal-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-6 bg-hacker-light rounded-lg border border-terminal-accent"
        >
          <h1 className="text-2xl font-bold text-terminal-foreground mb-6 text-center">Admin Access</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-terminal-foreground mb-1">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded focus:outline-none focus:ring-1 focus:ring-terminal-accent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-terminal-foreground mb-1">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded focus:outline-none focus:ring-1 focus:ring-terminal-accent"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-4 text-center text-terminal-accent text-sm">
            <p>Hint: For demo, use admin/password</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hacker-dark text-terminal-foreground">
      <header className="bg-hacker-light p-4 border-b border-terminal-accent">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Portfolio Admin</h1>
          <button 
            onClick={() => setAuthenticated(false)}
            className="px-3 py-1 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90"
          >
            Logout
          </button>
        </div>
      </header>
      
      <main className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
            <h3 className="text-lg font-bold mb-4">Content Sections</h3>
            <ul className="space-y-2">
              <li className="p-2 hover:bg-hacker-dark cursor-pointer rounded transition">About</li>
              <li className="p-2 hover:bg-hacker-dark cursor-pointer rounded transition">Projects</li>
              <li className="p-2 hover:bg-hacker-dark cursor-pointer rounded transition">Skills</li>
              <li className="p-2 hover:bg-hacker-dark cursor-pointer rounded transition">Experience</li>
              <li className="p-2 hover:bg-hacker-dark cursor-pointer rounded transition">Certificates</li>
              <li className="p-2 hover:bg-hacker-dark cursor-pointer rounded transition">Recommendations</li>
              <li className="p-2 hover:bg-hacker-dark cursor-pointer rounded transition">Fun Facts</li>
            </ul>
          </div>
          
          <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90">
                Upload Resume
              </button>
              <button className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded hover:bg-opacity-90">
                Update Profile Picture
              </button>
              <button className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded hover:bg-opacity-90">
                Change Theme Settings
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-hacker-light p-4 rounded border border-terminal-accent">
          <h3 className="text-lg font-bold mb-4">Terminal Preview</h3>
          <div className="bg-terminal-background p-4 rounded border border-terminal-accent h-64 overflow-y-auto font-mono">
            <div className="text-terminal-accent">visitor@portfolio:~$ about</div>
            <div className="mt-1 text-terminal-foreground">
              Name: John Doe<br />
              Title: Full Stack Developer<br />
              Location: San Francisco, CA<br />
              <br />
              I'm a passionate developer with expertise in building robust web applications...<br />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
