
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
        return 'terminal-error';
      case 'success':
        return 'terminal-success';
      case 'warning':
        return 'terminal-warning';
      case 'info':
        return 'terminal-info';
      case 'ascii':
        return 'text-terminal-accent whitespace-pre font-mono';
      default:
        return 'terminal-text';
    }
  };

  const renderContent = () => {
    if (typeof output.content === 'string') {
      if (output.type === 'ascii') {
        return <pre className="overflow-x-auto">{output.content}</pre>;
      }
      return output.content.split('\n').map((line, index) => (
        <div key={index}>{line}</div>
      ));
    }
    return output.content;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`my-2 ${getOutputClassName()}`}
    >
      {renderContent()}
    </motion.div>
  );
};

export default TerminalOutput;
