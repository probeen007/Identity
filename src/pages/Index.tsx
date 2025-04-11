
import React, { useState, useEffect, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import MatrixBackground from '@/components/MatrixBackground';
import useTerminalCommands from '@/hooks/useTerminalCommands';
import { useMatrixEffect } from '@/hooks/useMatrixEffect';
import TerminalHandler from '@/components/TerminalHandler';
import PortfolioFooter from '@/components/PortfolioFooter';
import { motion } from 'framer-motion';

// Memoize components to prevent unnecessary re-renders
const MemoizedMatrixBackground = memo(MatrixBackground);

const Index = () => {
  const { commands, welcomeMessage } = useTerminalCommands();
  const [loading, setLoading] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const { 
    matrixSpeed, setMatrixSpeed,
    matrixDensity, setMatrixDensity,
    matrixVisible, matrixFullscreen
  } = useMatrixEffect();

  useEffect(() => {
    // Simulate loading time - reduced for faster startup
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Reduced from 800ms for faster startup

    return () => clearTimeout(timer);
  }, []);

  const handleOpenTerminal = () => {
    // Subtle matrix effect
    setMatrixSpeed(80);
    setMatrixDensity(25);
    
    // Show terminal
    setTimeout(() => {
      setMatrixSpeed(60);
      setMatrixDensity(20);
      setShowTerminal(true);
    }, 200);
  };

  const handleCloseTerminal = () => {
    // Subtle matrix effect for closing
    setMatrixSpeed(70);
    setMatrixDensity(22);
    
    // Hide terminal
    setTimeout(() => {
      setMatrixSpeed(60);
      setMatrixDensity(20);
      setShowTerminal(false);
    }, 200);
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
        <TerminalHandler
          showTerminal={showTerminal}
          commands={commands}
          welcomeMessage={welcomeMessage}
          onCloseTerminal={handleCloseTerminal}
          onOpenTerminal={handleOpenTerminal}
        />
      </main>
      
      <PortfolioFooter showTerminal={showTerminal} />
    </div>
  );
};

export default Index;
