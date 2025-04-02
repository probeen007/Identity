
import React, { useState, useEffect } from 'react';
import Terminal from '@/components/Terminal';
import MatrixBackground from '@/components/MatrixBackground';
import useTerminalCommands from '@/hooks/useTerminalCommands';
import WelcomeSection from '@/components/WelcomeSection';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  const { commands, welcomeMessage } = useTerminalCommands();
  const [loading, setLoading] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenTerminal = () => {
    setShowTerminal(true);
  };

  if (loading || !welcomeMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-terminal-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-terminal-foreground text-xl"
        >
          <span className="inline-block animate-cursor-blink mr-2">▋</span>
          <span>Initializing terminal...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-terminal-background flex flex-col">
      <MatrixBackground />
      
      <main className="flex-grow flex items-center justify-center p-4 z-10 relative">
        <AnimatePresence mode="wait">
          {!showTerminal ? (
            <WelcomeSection onOpenTerminal={handleOpenTerminal} key="welcome" />
          ) : (
            <motion.div 
              key="terminal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl h-[80vh] rounded-lg border border-terminal-accent shadow-lg overflow-hidden"
            >
              <div className="bg-terminal-accent px-4 py-2 flex items-center">
                <div className="flex gap-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-grow text-center text-terminal-background font-bold">
                  Terminal - Portfolio
                </div>
              </div>
              
              <div className="h-[calc(100%-2.5rem)]">
                <Terminal 
                  welcomeMessage={welcomeMessage} 
                  availableCommands={commands} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <footer className="p-4 text-center text-terminal-accent text-sm z-10 relative">
        <p className="glitch-effect">
          {showTerminal ? "Type 'help' for available commands" : "Click Open Terminal to begin"}
        </p>
      </footer>
    </div>
  );
};

export default Index;
