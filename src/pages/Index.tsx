
import React, { useState, useEffect, memo, useRef } from 'react';
import Terminal from '@/components/Terminal';
import MatrixBackground from '@/components/MatrixBackground';
import useTerminalCommands, { matrixEffectEvent } from '@/hooks/useTerminalCommands';
import WelcomeSection from '@/components/WelcomeSection';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Helmet } from 'react-helmet-async';

// Memoize components to prevent unnecessary re-renders
const MemoizedMatrixBackground = memo(MatrixBackground);

const Index = () => {
  const { commands, welcomeMessage } = useTerminalCommands();
  const [loading, setLoading] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [matrixSpeed, setMatrixSpeed] = useState(60);
  const [matrixDensity, setMatrixDensity] = useState(20);
  const [matrixVisible, setMatrixVisible] = useState(true);
  const [matrixFullscreen, setMatrixFullscreen] = useState(false);
  const [hackeryAnimation, setHackeryAnimation] = useState(false);
  const matrixFullscreenTimer = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  // Set up listeners for matrix effect events
  useEffect(() => {
    const handleMatrixActivate = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setMatrixVisible(true);
      
      if (detail?.fullscreen) {
        setMatrixFullscreen(true);
        
        // If duration is specified, go back to normal after that time
        if (detail.duration) {
          if (matrixFullscreenTimer.current) {
            clearTimeout(matrixFullscreenTimer.current);
          }
          
          matrixFullscreenTimer.current = setTimeout(() => {
            setMatrixFullscreen(false);
          }, detail.duration);
        }
      }
    };
    
    const handleMatrixSpeed = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.speed) {
        setMatrixSpeed(detail.speed);
      }
    };
    
    const handleMatrixDensity = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.density) {
        setMatrixDensity(detail.density);
      }
    };
    
    const handleMatrixToggle = () => {
      setMatrixVisible(prev => !prev);
    };
    
    matrixEffectEvent.addEventListener('matrixActivate', handleMatrixActivate);
    matrixEffectEvent.addEventListener('matrixSpeed', handleMatrixSpeed);
    matrixEffectEvent.addEventListener('matrixDensity', handleMatrixDensity);
    matrixEffectEvent.addEventListener('matrixToggle', handleMatrixToggle);
    
    return () => {
      matrixEffectEvent.removeEventListener('matrixActivate', handleMatrixActivate);
      matrixEffectEvent.removeEventListener('matrixSpeed', handleMatrixSpeed);
      matrixEffectEvent.removeEventListener('matrixDensity', handleMatrixDensity);
      matrixEffectEvent.removeEventListener('matrixToggle', handleMatrixToggle);
      
      if (matrixFullscreenTimer.current) {
        clearTimeout(matrixFullscreenTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    // Simulate loading time - reduced for faster startup
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Reduced from 800ms for faster startup

    return () => clearTimeout(timer);
  }, []);

  const handleOpenTerminal = () => {
    // Show hackery animation before terminal
    setHackeryAnimation(true);
    
    // Briefly increase matrix speed for effect
    setMatrixSpeed(120);
    setMatrixDensity(40);
    
    // Reset matrix settings after animation
    setTimeout(() => {
      setMatrixSpeed(60);
      setMatrixDensity(20);
      setHackeryAnimation(false);
      setShowTerminal(true);
    }, 1500);
  };

  const handleCloseTerminal = () => {
    // Show closing animation
    setHackeryAnimation(true);
    
    // Slightly different matrix effect for closing
    setMatrixSpeed(100);
    setMatrixDensity(30);
    
    // Reset and close terminal after animation
    setTimeout(() => {
      setMatrixSpeed(60);
      setMatrixDensity(20);
      setHackeryAnimation(false);
      setShowTerminal(false);
    }, 1200);
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
      <Helmet>
        <title>Terminal Portfolio | Interactive Developer Resume</title>
        <meta name="description" content="Interactive developer portfolio in a terminal format. Showcasing projects, skills, and experience." />
        <meta name="keywords" content="developer, portfolio, terminal, interactive, coding, projects, skills" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta property="og:title" content="Terminal Portfolio | Interactive Developer Resume" />
        <meta property="og:description" content="Check out my interactive terminal-style portfolio showcasing my development skills and projects." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Terminal Portfolio | Interactive Developer Resume" />
        <meta name="twitter:description" content="Interactive developer portfolio in a terminal format." />
        <link rel="canonical" href="https://your-portfolio-domain.com" />
      </Helmet>
      
      {matrixVisible && (
        <div 
          className={`${matrixFullscreen ? 'fixed inset-0 z-40' : 'fixed inset-0 z-0'}`}
          style={{ pointerEvents: matrixFullscreen ? 'all' : 'none' }}
        >
          <MemoizedMatrixBackground 
            speed={matrixSpeed} 
            density={matrixDensity}
            interactionEnabled={true}
          />
        </div>
      )}
      
      <main className="flex-grow flex items-center justify-center p-4 z-10 relative">
        <AnimatePresence mode="wait">
          {hackeryAnimation && (
            <motion.div
              key="hackery-animation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none"
            >
              <div className="hack-animation p-4 w-full max-w-2xl">
                <div className="overflow-hidden">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div 
                      key={index} 
                      className="hack-line monospace text-xs"
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        opacity: 0
                      }}
                    >
                      &gt; {showTerminal ? 'Shutting down secure connection...' : 'Establishing secure connection...'} {Array.from({ length: Math.floor(Math.random() * 30) + 10 }).map(() => Math.floor(Math.random() * 2)).join('')}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        
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
