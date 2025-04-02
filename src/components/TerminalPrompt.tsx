
import React, { useState, useRef, useEffect } from 'react';

interface TerminalPromptProps {
  onCommand: (command: string) => void;
  commands: string[];
  isLoading?: boolean;
}

const TerminalPrompt: React.FC<TerminalPromptProps> = ({ 
  onCommand, 
  commands,
  isLoading = false
}) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input element when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    // Show command suggestions
    if (value) {
      const filtered = commands.filter(cmd => 
        cmd.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      e.preventDefault();
      if (input.trim()) {
        onCommand(input.trim());
        setCommandHistory(prev => [...prev, input.trim()]);
        setHistoryIndex(-1);
        setInput('');
        setSuggestions([]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 
          ? historyIndex + 1 
          : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
        setSuggestions([]);
      }
    }
  };

  return (
    <div className="flex items-center mt-2 group">
      <span className="terminal-prompt mr-2">visitor@portfolio:~$</span>
      <div className="relative flex-grow">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent outline-none terminal-command caret-transparent"
          disabled={isLoading}
          aria-label="Terminal command input"
          autoComplete="off"
          autoFocus
        />
        {!input && (
          <span className="terminal-cursor absolute left-0 top-0.5"></span>
        )}
        {input && (
          <span className="terminal-cursor absolute top-0.5" style={{ left: `${input.length}ch` }}></span>
        )}
      </div>
      {suggestions.length > 0 && (
        <div className="absolute mt-1 py-1 bg-terminal-background border border-terminal-accent rounded-md shadow-lg z-10" style={{ top: '100%' }}>
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className="px-3 py-1 hover:bg-terminal-accent hover:text-terminal-background cursor-pointer"
              onClick={() => {
                setInput(suggestion);
                setSuggestions([]);
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TerminalPrompt;
