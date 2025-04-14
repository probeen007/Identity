import React, { useState, useRef, useEffect } from 'react';
import { CommandOutput, Command as CommandType } from '@/types';
import TerminalOutput from './TerminalOutput';
import TerminalPrompt from './TerminalPrompt';
import { motion } from 'framer-motion';
import { X, Maximize, Minimize, ChevronDown, ChevronUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface TerminalProps {
  welcomeMessage: string;
  availableCommands: CommandType[];
  onClose?: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: CommandOutput;
}

const Terminal: React.FC<TerminalProps> = ({ welcomeMessage, availableCommands, onClose }) => {
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [commandHistory]);

  // Adjust terminal height on mobile when keyboard is visible
  useEffect(() => {
    if (!isMobile) return;

    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

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

    // Expand output if it was collapsed
    if (isOutputCollapsed) {
      setIsOutputCollapsed(false);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const toggleOutputCollapse = () => {
    setIsOutputCollapsed(!isOutputCollapsed);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`w-full h-full bg-terminal-background text-terminal-foreground overflow-hidden flex flex-col rounded-none sm:rounded-md
                  ${isFullScreen ? 'fixed top-0 left-0 z-50 w-screen h-screen' : ''}`}
    >
      {/* Terminal Header */}
      <div className="sticky top-0 z-20 p-2 border-b border-terminal-accent/30 font-mono text-xs bg-black/40 backdrop-blur-sm flex justify-between items-center">
        <div className="w-20 flex items-center space-x-2 pl-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-grow text-center text-terminal-muted truncate px-2">
          <span className="hidden sm:inline">Terminal Portfolio</span>
          <span className="sm:hidden">Terminal</span>
        </div>
        <div className="flex items-center space-x-2 w-20 justify-end">
          {isMobile && (
            <button
              onClick={toggleOutputCollapse}
              className="p-1 hover:bg-terminal-accent/20 rounded-md"
              aria-label={isOutputCollapsed ? "Expand Output" : "Collapse Output"}
            >
              {isOutputCollapsed ? (
                <ChevronDown className="w-4 h-4 text-terminal-accent" />
              ) : (
                <ChevronUp className="w-4 h-4 text-terminal-accent" />
              )}
            </button>
          )}
          {isFullScreen ? (
            <button
              onClick={toggleFullScreen}
              className="p-1 hover:bg-terminal-accent/20 rounded-md"
              aria-label="Exit Full Screen"
            >
              <Minimize className="w-4 h-4 text-terminal-accent" />
            </button>
          ) : (
            <button
              onClick={toggleFullScreen}
              className="p-1 hover:bg-terminal-accent/20 rounded-md"
              aria-label="Full Screen"
            >
              <Maximize className="w-4 h-4 text-terminal-accent" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 hover:bg-terminal-accent/20 rounded-md"
            aria-label="Close Terminal"
          >
            <X className="w-4 h-4 text-terminal-accent" />
          </button>
        </div>
      </div>

      {/* Terminal Content - Scrollable area */}
      <div
        className={`flex-1 flex flex-col p-2 sm:p-4 overflow-hidden ${isOutputCollapsed ? 'h-16' : ''}`}
      >
        <div
          ref={terminalRef}
          className={`flex-grow overflow-y-auto overflow-x-hidden pb-4 scrollbar-none text-xs transition-all duration-300 
            ${isOutputCollapsed ? 'max-h-0' : 'max-h-[calc(var(--vh,1vh)*80)]'} 
            break-words whitespace-pre-wrap`}
        >
          {commandHistory.map((item, index) => (
            <div key={index} className="mb-1">
              {item.command && (
                <div className="flex items-center text-xs">
                  <span className="terminal-prompt mr-2">visitor@portfolio:~$</span>
                  <span className="terminal-command">{item.command}</span>
                </div>
              )}
              <TerminalOutput output={item.output} />
            </div>
          ))}
          <div ref={bottomRef} /> {/* Empty div for auto-scrolling */}
        </div>

        <TerminalPrompt
          onCommand={handleCommand}
          commands={availableCommands.map(cmd => cmd.command)}
          isLoading={isLoading}
        />
      </div>
    </motion.div>
  );
};

export default Terminal;