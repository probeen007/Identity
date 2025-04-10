
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Terminal from '@/components/Terminal';
import MatrixBackground from '@/components/MatrixBackground';
import useTerminalCommands from '@/hooks/useTerminalCommands';
import WelcomeSection from '@/components/WelcomeSection';
import { motion, AnimatePresence } from 'framer-motion';
import useMobile from '@/hooks/use-mobile';

// Use lazy loading for non-critical components
const Index = () => {
  const { commands, welcomeMessage } = useTerminalCommands();
  const [loading, setLoading] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    // Add meta tags for SEO
    document.title = 'Terminal Portfolio | Interactive Developer Resume';
    
    // Simulate loading time - reduced for faster startup
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenTerminal = () => {
    setShowTerminal(true);
  };

  const handleCloseTerminal = () => {
    setShowTerminal(false);
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
              transition={{ duration: 0.3 }}
              className={`w-full ${isMobile ? 'h-[85vh]' : 'max-w-5xl h-[80vh]'} rounded-lg border border-terminal-accent shadow-lg overflow-hidden`}
            >
              <Terminal 
                welcomeMessage={welcomeMessage} 
                availableCommands={commands} 
                onClose={handleCloseTerminal}
              />
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
