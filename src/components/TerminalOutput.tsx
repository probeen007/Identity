
import React from 'react';
import { motion } from 'framer-motion';
import { CommandOutput } from '@/types';

interface TerminalOutputProps {
  output: CommandOutput;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  const getOutputClassName = () => {
    switch (output.type) {
      case 'error':
        return 'text-terminal-error font-bold';
      case 'success':
        return 'text-terminal-success';
      case 'warning':
        return 'text-terminal-warning';
      case 'info':
        return 'text-terminal-info';
      case 'ascii':
        return 'text-terminal-accent whitespace-pre font-mono';
      default:
        return 'text-terminal-foreground';
    }
  };

  const renderContent = () => {
    if (typeof output.content === 'string') {
      if (output.type === 'ascii') {
        return <pre className="overflow-x-auto">{output.content}</pre>;
      }
      
      // Split content by lines and add animation to each line
      return output.content.split('\n').map((line, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: index * 0.03 }}
          className="line py-0.5"
        >
          {line || ' '}
        </motion.div>
      ));
    }
    return output.content;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`my-2 px-1 rounded ${getOutputClassName()} ${output.type === 'error' ? 'bg-red-900/20' : ''} ${output.type === 'success' ? 'bg-green-900/10' : ''} ${output.type === 'warning' ? 'bg-yellow-900/10' : ''}`}
    >
      <div className="terminal-output-content">
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default TerminalOutput;
