
import React, { useState, useRef, useEffect } from 'react';
import { CommandOutput, Command as CommandType } from '@/types';
import TerminalOutput from './TerminalOutput';
import TerminalPrompt from './TerminalPrompt';
import { motion } from 'framer-motion';
import { 
  Activity, Briefcase, Code, Command as CommandIcon, FileText, 
  Info, Mail, Home, User, Monitor, 
  Award, BookOpen, Download, Coffee
} from 'lucide-react';

interface TerminalProps {
  welcomeMessage: string;
  availableCommands: CommandType[];
}

interface CommandHistoryItem {
  command: string;
  output: CommandOutput;
}

const Terminal: React.FC<TerminalProps> = ({ welcomeMessage, availableCommands }) => {
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
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
        // Update active section based on command
        setActiveSection(commandName);
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

  // Sidebar items with commands and icons
  const sidebarItems = [
    { id: 'home', label: 'Home', command: 'home', icon: <Home size={16} /> },
    { id: 'about', label: 'About', command: 'about', icon: <User size={16} /> },
    { id: 'projects', label: 'Projects', command: 'projects', icon: <Code size={16} /> },
    { id: 'skills', label: 'Skills', command: 'skills', icon: <Activity size={16} /> },
    { id: 'experience', label: 'Experience', command: 'experience', icon: <Briefcase size={16} /> },
    { id: 'certificates', label: 'Certificates', command: 'certificates', icon: <Award size={16} /> },
    { id: 'blog', label: 'Blog', command: 'blog', icon: <BookOpen size={16} /> },
    { id: 'resume', label: 'Resume', command: 'resume', icon: <FileText size={16} /> },
    { id: 'contact', label: 'Contact', command: 'contact', icon: <Mail size={16} /> },
    { id: 'theme', label: 'Theme', command: 'theme', icon: <Monitor size={16} /> },
    { id: 'funfact', label: 'Fun Facts', command: 'funfact', icon: <Coffee size={16} /> },
    { id: 'help', label: 'Help', command: 'help', icon: <Info size={16} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full bg-terminal-background text-terminal-foreground rounded-md overflow-hidden flex"
    >
      {/* Terminal Sidebar */}
      <div className="terminal-sidebar w-40 hidden sm:block">
        <div className="p-2 border-b border-terminal-accent/30 flex items-center justify-center">
          <CommandIcon size={16} className="mr-2 text-terminal-accent" />
          <span className="font-bold text-terminal-accent">Commands</span>
        </div>
        <div className="p-2 space-y-1">
          {sidebarItems.map((item) => (
            <div 
              key={item.id}
              className={`terminal-sidebar-item ${activeSection === item.command ? 'active' : ''}`}
              onClick={() => handleCommand(item.command)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-2 border-b border-terminal-accent/30 font-mono text-sm text-terminal-muted">
          {activeSection ? `terminal@portfolio:~/${activeSection}` : 'terminal@portfolio:~'}
        </div>
        
        <div className="flex-1 flex flex-col p-4">
          <div 
            ref={terminalRef}
            className="flex-grow overflow-y-auto overflow-x-hidden pb-4 scrollbar-none"
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
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;
