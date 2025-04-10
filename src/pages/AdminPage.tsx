
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, AlertTriangle, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface UserInfo {
  userAgent: string;
  language: string;
  platform: string;
  screenWidth: number;
  screenHeight: number;
  timeZone: string;
  referrer: string;
  currentTime: string;
  ip?: string; // Make IP optional since it might not be available
}

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userAgent: '',
    language: '',
    platform: '',
    screenWidth: 0,
    screenHeight: 0,
    timeZone: '',
    referrer: '',
    currentTime: '',
  });
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [warningLevel, setWarningLevel] = useState(1);
  const [countdown, setCountdown] = useState(30);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  // Collect user information
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        // Get basic browser information
        const info: UserInfo = {
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          referrer: document.referrer,
          currentTime: new Date().toLocaleString(),
        };

        // Try to get IP using a free service (note: this might be blocked by some browsers)
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipResponse.json();
          info.ip = ipData.ip;
        } catch (error) {
          console.error('Failed to fetch IP:', error);
          info.ip = 'Unavailable (protected)';
        }

        setUserInfo(info);
      } catch (error) {
        console.error('Error getting user info:', error);
        setUserInfo({ 
          userAgent: 'Error', 
          language: 'Error', 
          platform: 'Error',
          screenWidth: 0,
          screenHeight: 0,
          timeZone: 'Error',
          referrer: 'Error',
          currentTime: 'Error',
          ip: 'Error'
        });
      }
    };

    getUserInfo();
  }, []);

  // Handle countdown timer
  useEffect(() => {
    let timer: number | undefined;
    
    if (isCountdownActive && countdown > 0) {
      timer = window.setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      // When countdown reaches zero, redirect to home
      navigate('/');
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isCountdownActive, countdown, navigate]);

  const startCountdown = () => {
    setIsCountdownActive(true);
  };

  const increaseWarningLevel = () => {
    if (warningLevel < 3) {
      setWarningLevel(prev => prev + 1);
    } else {
      // Start the countdown if user still tries to proceed
      startCountdown();
    }
  };

  const handleTerminalReturn = () => {
    navigate('/');
  };

  const renderWarningContent = () => {
    switch (warningLevel) {
      case 1:
        return (
          <div className="text-center">
            <AlertTitle className="text-2xl mb-4">UNAUTHORIZED ACCESS DETECTED</AlertTitle>
            <AlertDescription className="text-lg">
              You do not have permission to access the admin area. 
              <div className="my-4">Please leave immediately or face consequences.</div>
            </AlertDescription>
            <div className="mt-6 flex space-x-4 justify-center">
              <Button 
                variant="default" 
                className="bg-terminal-accent hover:bg-terminal-accent/80 text-terminal-background"
                onClick={handleTerminalReturn}
              >
                <Terminal className="mr-2 h-4 w-4" /> Return to Terminal
              </Button>
              <Button 
                variant="destructive" 
                onClick={increaseWarningLevel}
              >
                <Shield className="mr-2 h-4 w-4" /> Proceed Anyway
              </Button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="text-center">
            <AlertTitle className="text-2xl mb-4 text-red-500">FINAL WARNING</AlertTitle>
            <AlertDescription className="text-lg">
              Your access attempt has been logged.
              <div className="my-4">Security protocols have been activated.</div>
              <div className="font-mono text-red-400 bg-black/60 p-2 mt-4 rounded-md">
                {`>> Initiating trace on connection...`}
                <br />
                {`>> Logging activity...`}
              </div>
            </AlertDescription>
            <div className="mt-6 flex space-x-4 justify-center">
              <Button 
                variant="default" 
                className="bg-terminal-accent hover:bg-terminal-accent/80 text-terminal-background"
                onClick={handleTerminalReturn}
              >
                <Terminal className="mr-2 h-4 w-4" /> Return to Terminal
              </Button>
              <Button 
                variant="destructive" 
                onClick={increaseWarningLevel}
              >
                <AlertTriangle className="mr-2 h-4 w-4" /> Override Security
              </Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="text-center">
            <AlertTitle className="text-2xl mb-4 text-red-500 animate-pulse">SECURITY BREACH ALERT</AlertTitle>
            <AlertDescription className="text-lg">
              <div className="my-4">Your system has been compromised.</div>
              <div className="font-mono text-red-400 bg-black/60 p-4 mt-4 rounded-md text-left overflow-hidden">
                {`>> Harvesting system information...`}
                <br />
                {`>> We know who you are...`}
                <br />
                {isCountdownActive ? 
                  `>> Auto-redirect in ${countdown} seconds...` : 
                  `>> Click "Show My Data" if you want to see what we know...`
                }
              </div>
            </AlertDescription>
            <div className="mt-6 flex space-x-4 justify-center">
              <Button 
                variant="default" 
                className="bg-terminal-accent hover:bg-terminal-accent/80 text-terminal-background"
                onClick={handleTerminalReturn}
              >
                <Terminal className="mr-2 h-4 w-4" /> Escape to Terminal
              </Button>
              {!showUserInfo && !isCountdownActive && (
                <Button 
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-950"
                  onClick={() => {
                    setShowUserInfo(true);
                    // Start countdown when they view their data
                    startCountdown();
                  }}
                >
                  <User className="mr-2 h-4 w-4" /> Show My Data
                </Button>
              )}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-terminal-background overflow-hidden flex flex-col">
      {/* Matrix-like animation in background */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'matrix\' width=\'50\' height=\'50\' patternUnits=\'userSpaceOnUse\'%3E%3Ctext x=\'25\' y=\'25\' font-family=\'monospace\' font-size=\'20\' fill=\'%2300FF00\' text-anchor=\'middle\'%3E01%3C/text%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23matrix)\'/%3E%3C/svg%3E")',
          backgroundSize: '50px 50px',
          animation: 'slide 30s linear infinite'
        }}
      />
      
      <main className="flex-grow flex items-center justify-center p-4 z-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl bg-black/70 border-2 border-red-500 rounded-lg shadow-lg shadow-red-500/30 overflow-hidden"
        >
          <div className="p-1 bg-gradient-to-r from-red-800 to-red-600 text-white font-mono text-sm flex justify-between items-center">
            <span className="flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-yellow-300" />
              ADMIN ACCESS VIOLATION
            </span>
            <span className="text-xs animate-pulse">⚠️ SECURITY ALERT ⚠️</span>
          </div>
          
          <div className="p-6">
            <Alert variant="destructive" className="border-2 border-red-500 bg-black/60 text-white mb-6">
              {renderWarningContent()}
            </Alert>
            
            {showUserInfo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-6"
              >
                <div className="bg-black/80 border border-red-500 rounded-lg p-4">
                  <h3 className="text-red-400 font-mono text-lg mb-2">🔍 Collected Data:</h3>
                  <ScrollArea className="h-40 rounded border border-red-800 bg-black p-4">
                    <div className="font-mono text-green-400 text-sm">
                      {Object.entries(userInfo).map(([key, value]) => (
                        <div key={key} className="mb-1">
                          <span className="text-red-400">{key}: </span>
                          <span>{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="text-center mt-4 text-terminal-muted animate-pulse">
                    {`Redirecting to safety in ${countdown} seconds...`}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminPage;
