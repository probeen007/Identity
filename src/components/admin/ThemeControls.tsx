
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
    <div className="flex flex-wrap gap-2 ml-auto">
      <button
        onClick={() => onThemeChange('light')}
        className="p-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition flex items-center shadow-sm border border-blue-200"
      >
        <Sun size={16} className="mr-1" />
        Light
      </button>
      <button
        onClick={() => onThemeChange('dark')}
        className="p-2 bg-gray-800 text-gray-100 rounded hover:bg-gray-700 transition flex items-center shadow-sm border border-gray-700"
      >
        <Moon size={16} className="mr-1" />
        Dark
      </button>
      <button
        onClick={() => onThemeChange('hacker')}
        className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition flex items-center shadow-sm border border-terminal-accent/70"
      >
        <Terminal size={16} className="mr-1" />
        Terminal
      </button>
      <button
        onClick={onResumeDownload}
        disabled={loading}
        className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition flex items-center shadow-sm border border-green-700"
      >
        <Download size={16} className="mr-1" />
        Generate Resume
      </button>
    </div>
  );
};

export default ThemeControls;
