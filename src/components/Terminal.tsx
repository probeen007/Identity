
import React, { useState, useRef, useEffect } from 'react';
import { CommandOutput, Command } from '@/types';
import TerminalOutput from './TerminalOutput';
import TerminalPrompt from './TerminalPrompt';
import { motion } from 'framer-motion';

interface TerminalProps {
  welcomeMessage: string;
  availableCommands: Command[];
}

interface CommandHistoryItem {
  command: string;
  output: CommandOutput;
}

const Terminal: React.FC<TerminalProps> = ({ welcomeMessage, availableCommands }) => {
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Add welcome message to command history on mount
  useEffect(() => {
    setCommandHistory([
      { 
        command: '', 
        output: { 
          type: 'ascii', 
          content: welcomeMessage 
        } 
      }
    ]);
  }, [welcomeMessage]);

  // Auto-scroll to bottom on new commands
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const handleCommand = async (command: string) => {
    setIsLoading(true);
    
    // Add command to history immediately
    setCommandHistory(prev => [
      ...prev,
      { command, output: { type: 'text', content: 'Processing...' } }
    ]);

    // Process command
    const commandParts = command.trim().split(' ');
    const commandName = commandParts[0].toLowerCase();
    const args = commandParts.slice(1);

    // Find command handler
    const commandObj = availableCommands.find(
      cmd => cmd.command === commandName
    );

    let output: CommandOutput;

    try {
      if (commandName === 'clear') {
        // Special case for clear command
        setCommandHistory([]);
        setIsLoading(false);
        return;
      } else if (commandObj) {
        // Execute command handler
        output = await commandObj.handler(args);
      } else {
        // Command not found
        output = { 
          type: 'error', 
          content: `Command not found: ${commandName}. Type 'help' for available commands.` 
        };
      }
    } catch (error) {
      // Handle errors
      output = { 
        type: 'error', 
        content: `Error executing command: ${error instanceof Error ? error.message : String(error)}` 
      };
    }

    // Update command history with result
    setCommandHistory(prev => 
      prev.map((item, index) => 
        index === prev.length - 1 ? { command, output } : item
      )
    );
    
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-terminal-background text-terminal-foreground p-4 rounded-md overflow-hidden flex flex-col"
    >
      <div 
        ref={terminalRef}
        className="flex-grow overflow-y-auto overflow-x-hidden pb-4"
        style={{ maxHeight: 'calc(100vh - 8rem)' }}
      >
        {commandHistory.map((item, index) => (
          <div key={index}>
            {item.command && (
              <div className="flex items-center">
                <span className="terminal-prompt mr-2">visitor@portfolio:~$</span>
                <span className="terminal-command">{item.command}</span>
              </div>
            )}
            <TerminalOutput output={item.output} />
          </div>
        ))}
      </div>
      
      <TerminalPrompt 
        onCommand={handleCommand} 
        commands={availableCommands.map(cmd => cmd.command)}
        isLoading={isLoading}
      />
    </motion.div>
  );
};

export default Terminal;
