
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Terminal } from 'lucide-react';

interface WelcomeSectionProps {
  onOpenTerminal: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onOpenTerminal }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center min-h-[80vh] z-10 relative w-full"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-6"
      >
        <Avatar className="h-32 w-32 border-2 border-terminal-accent shadow-lg">
          <AvatarImage src="/pp.png" alt="Prabin Bhattarai" />
          <AvatarFallback className="bg-terminal-background text-4xl text-terminal-accent">
            YN
          </AvatarFallback>
        </Avatar>
      </motion.div>
      
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-terminal-foreground mb-4 glitch-effect text-center"
      >
        Prabin Bhattarai
      </motion.h1>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-lg text-terminal-accent mb-8 max-w-md text-center"
      >
        Full Stack Developer | AI Developer | Creative Coder
      </motion.p>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={onOpenTerminal}
          className="bg-terminal-accent hover:bg-terminal-accent/80 text-terminal-background px-6 py-3 rounded-md text-lg font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(28,140,255,0.5)]"
        >
          <Terminal className="w-5 h-5" />
          Open Terminal
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeSection;
