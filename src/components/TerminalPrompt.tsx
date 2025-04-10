
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
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input element when the component mounts and when not on mobile
    if (inputRef.current && window.innerWidth > 768) {
      inputRef.current.focus();
    }
  }, []);

  // Re-focus on input when clicking anywhere in the terminal area
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current && window.innerWidth > 768) {
        inputRef.current.focus();
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
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
      setSelectedSuggestion(0);
    } else {
      setSuggestions([]);
    }
  };

  const handleTabCompletion = () => {
    if (suggestions.length > 0) {
      setInput(suggestions[selectedSuggestion]);
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
      handleTabCompletion();
    }
  };

  // Get the suggestion part that would be completed
  const getSuggestionCompletion = () => {
    if (suggestions.length > 0 && input) {
      return suggestions[selectedSuggestion].slice(input.length);
    }
    return '';
  };

  return (
    <div className="flex items-center mt-2 group relative">
      <span className="terminal-prompt mr-2">visitor@portfolio:~$</span>
      <div className="relative flex-grow">
        <div className="flex">
          <div className="flex-grow">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none terminal-command"
              disabled={isLoading}
              aria-label="Terminal command input"
              autoComplete="off"
              autoFocus={window.innerWidth > 768}
              style={{ caretColor: 'transparent' }}
            />
            {/* Inline suggestion */}
            {suggestions.length > 0 && (
              <span className="absolute left-0 top-0 text-terminal-accent/40 pointer-events-none">
                {input}{getSuggestionCompletion()}
              </span>
            )}
            
            {/* Cursor positioning */}
            {!input && (
              <span className="terminal-cursor absolute left-0 top-0.5"></span>
            )}
            {input && (
              <span className="terminal-cursor absolute top-0.5" style={{ left: `${input.length}ch` }}></span>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile send button */}
      {window.innerWidth <= 768 && (
        <button 
          onClick={() => {
            if (input.trim() && !isLoading) {
              onCommand(input.trim());
              setCommandHistory(prev => [...prev, input.trim()]);
              setHistoryIndex(-1);
              setInput('');
              setSuggestions([]);
            }
          }}
          className="ml-2 px-2 py-1 bg-terminal-accent/20 text-terminal-accent rounded-md"
          disabled={isLoading || !input.trim()}
        >
          Send
        </button>
      )}
    </div>
  );
};

export default TerminalPrompt;
