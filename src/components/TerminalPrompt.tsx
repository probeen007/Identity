import React, { useState, useRef, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Send } from 'lucide-react';

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
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  // Focus input on mount for desktop devices
  useEffect(() => {
    if (inputRef.current && !isMobile) {
      inputRef.current.focus();
    }
  }, [isMobile]);

  // Re-focus on input when clicking terminal area (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isMobile]);

  const handleSubmit = () => {
    if (input.trim() && !isLoading) {
      onCommand(input.trim());
      setCommandHistory(prev => [...prev, input.trim()]);
      setHistoryIndex(-1);
      setInput('');
      setSuggestions([]);
    }
  };

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
      handleSubmit();
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
    <div className={`mt-1 group relative text-xs ${isFocused ? 'bg-terminal-accent/10 rounded p-1' : ''}`}>
      <div className="flex items-center">
        <span className="terminal-prompt mr-2 whitespace-nowrap text-xs">visitor@portfolio:~$</span>
        <div className="relative flex-grow flex">
          <div className="flex-grow">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-transparent outline-none terminal-command text-xs"
              disabled={isLoading}
              aria-label="Terminal command input"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck="false"
              autoCorrect="off"
              autoFocus={!isMobile}
              style={{ caretColor: 'transparent' }}
            />
            {/* Inline suggestion */}
            {suggestions.length > 0 && (
              <div className="absolute left-0 top-0">
                <span className="text-terminal-accent/40 pointer-events-none">
                  {input}{getSuggestionCompletion()}
                </span>
              </div>
            )}

            {/* Cursor positioning */}
            {!input && (
              <span className="terminal-cursor absolute left-0 top-0.5"></span>
            )}
            {input && (
              <span className="terminal-cursor absolute top-0.5" style={{ left: `${input.length}ch` }}></span>
            )}
          </div>

          {/* Mobile send button */}
          {isMobile && (
            <button
              onClick={handleSubmit}
              className="ml-2 p-1 text-terminal-accent rounded-md flex items-center justify-center text-xs"
              disabled={isLoading || !input.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile suggestions */}
      {isMobile && suggestions.length > 0 && (
        <div className="absolute bottom-full left-0 w-full bg-terminal-background border border-terminal-accent/20 rounded-md mt-1 max-h-24 overflow-y-auto z-10 text-xs">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`px-2 py-1 cursor-pointer text-xs ${index === selectedSuggestion ? 'bg-terminal-accent/20' : ''}`}
              onClick={() => {
                setInput(suggestion);
                setSuggestions([]);
                if (inputRef.current) inputRef.current.focus();
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
