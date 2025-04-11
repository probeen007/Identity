
import React from 'react';
import { motion } from 'framer-motion';

type AnimationType = 'booting' | 'shutting-down' | null;

interface TerminalAnimationProps {
  type: AnimationType;
}

const TerminalAnimation: React.FC<TerminalAnimationProps> = ({ type }) => {
  if (!type) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none"
    >
      <div className="linux-terminal-animation p-4 w-full max-w-2xl">
        {type === 'booting' ? (
          <div className="bg-black/80 p-4 rounded-md font-mono text-xs overflow-hidden">
            <div className="linux-boot-sequence overflow-hidden">
              {[
                { text: "Starting terminal service...", delay: 0 },
                { text: "Initializing system resources...", delay: 0.3 },
                { text: "Loading user profile...", delay: 0.6 },
                { text: "Mounting filesystem...", delay: 0.9 },
                { text: "Starting secure shell... ", delay: 1.2 },
                { text: "Establishing connection...", delay: 1.5 },
                { text: "Connection established. Welcome!", delay: 1.8 }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="linux-line text-terminal-success"
                  style={{ 
                    animationDelay: `${item.delay}s`,
                    opacity: 0
                  }}
                >
                  <span className="text-terminal-accent">[OK]</span> {item.text}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-black/80 p-4 rounded-md font-mono text-xs overflow-hidden">
            <div className="linux-shutdown-sequence overflow-hidden">
              {[
                { text: "Saving session state...", delay: 0 },
                { text: "Closing active processes...", delay: 0.3 },
                { text: "Unmounting filesystem...", delay: 0.6 },
                { text: "Stopping secure shell...", delay: 0.9 },
                { text: "Disconnecting from server...", delay: 1.2 },
                { text: "Connection terminated. Goodbye!", delay: 1.5 }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="linux-line text-terminal-info"
                  style={{ 
                    animationDelay: `${item.delay}s`,
                    opacity: 0
                  }}
                >
                  <span className="text-terminal-accent">[SYS]</span> {item.text}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TerminalAnimation;
