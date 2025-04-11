
import React, { useState } from 'react';
import Terminal from '@/components/Terminal';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import TerminalAnimation from '@/components/TerminalAnimation';
import { Command } from '@/types';

interface TerminalHandlerProps {
  showTerminal: boolean;
  commands: Command[];
  welcomeMessage: string;
  onCloseTerminal: () => void;
  onOpenTerminal: () => void;
}

const TerminalHandler: React.FC<TerminalHandlerProps> = ({ 
  showTerminal, 
  commands, 
  welcomeMessage, 
  onCloseTerminal,
  onOpenTerminal
}) => {
  const [terminalAnimation, setTerminalAnimation] = useState<'booting' | 'shutting-down' | null>(null);
  const isMobile = useIsMobile();

  const handleOpenTerminal = () => {
    // Show Linux-like terminal boot animation
    setTerminalAnimation('booting');
    
    // Show terminal after animation
    setTimeout(() => {
      setTerminalAnimation(null);
      onOpenTerminal();
    }, 2200);
  };

  const handleCloseTerminal = () => {
    // Show shutdown animation
    setTerminalAnimation('shutting-down');
    
    // Hide terminal after animation
    setTimeout(() => {
      setTerminalAnimation(null);
      onCloseTerminal();
    }, 1800);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {terminalAnimation && <TerminalAnimation type={terminalAnimation} />}
        
        {!showTerminal ? (
          <motion.div 
            key="welcome"
            className="w-full"
          >
            <WelcomeSection onOpenTerminal={handleOpenTerminal} />
          </motion.div>
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
    </>
  );
};

// We need to import this after the component definition to avoid circular dependency
import WelcomeSection from '@/components/WelcomeSection';

export default TerminalHandler;
