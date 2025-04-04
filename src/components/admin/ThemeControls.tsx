
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Moon, Sun, Terminal, Download } from 'lucide-react';
import { ThemeConfig } from '@/types';

interface ThemeControlsProps {
  onThemeChange: (themeName: string) => Promise<void>;
  onResumeDownload: () => Promise<void>;
  loading: boolean;
}

const ThemeControls = ({ onThemeChange, onResumeDownload, loading }: ThemeControlsProps) => {
  return (
    <div className="flex space-x-2 ml-auto">
      <button
        onClick={() => onThemeChange('light')}
        className="p-2 bg-hacker-light text-terminal-foreground rounded hover:bg-opacity-90 transition flex items-center"
      >
        <Sun size={16} className="mr-1" />
        Light
      </button>
      <button
        onClick={() => onThemeChange('dark')}
        className="p-2 bg-hacker-dark text-terminal-foreground rounded hover:bg-opacity-90 transition flex items-center"
      >
        <Moon size={16} className="mr-1" />
        Dark
      </button>
      <button
        onClick={() => onThemeChange('hacker')}
        className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition flex items-center"
      >
        <Terminal size={16} className="mr-1" />
        Terminal
      </button>
      <button
        onClick={onResumeDownload}
        disabled={loading}
        className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition flex items-center"
      >
        <Download size={16} className="mr-1" />
        Generate Resume
      </button>
    </div>
  );
};

export default ThemeControls;
