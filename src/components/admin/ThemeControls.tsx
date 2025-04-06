
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { Moon, Sun, Terminal, Download } from 'lucide-react';
import { ThemeConfig } from '@/types';
import { Switch } from '@/components/ui/switch';
import { Toggle } from '@/components/ui/toggle';

interface ThemeControlsProps {
  onThemeChange: (themeName: string) => Promise<void>;
  onResumeDownload: () => Promise<void>;
  loading: boolean;
  currentTheme?: string;
}

const ThemeControls = ({ onThemeChange, onResumeDownload, loading, currentTheme = 'light' }: ThemeControlsProps) => {
  const { toast } = useToast();
  
  const handleThemeChange = async (themeName: string) => {
    try {
      await onThemeChange(themeName);
      toast({
        title: "Theme changed",
        description: `Theme switched to ${themeName} mode`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to change theme",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 ml-auto">
      <div className="flex space-x-1 rounded-md p-1 bg-gray-100 dark:bg-gray-800 shadow-inner">
        <Toggle 
          variant="outline" 
          size="sm"
          pressed={currentTheme === 'light'}
          onPressedChange={() => handleThemeChange('light')}
          className={`${currentTheme === 'light' ? 'bg-white text-blue-800 shadow-sm' : 'bg-transparent'} border border-gray-200`}
        >
          <Sun size={16} className="mr-1" />
          Light
        </Toggle>
        
        <Toggle 
          variant="outline"
          size="sm" 
          pressed={currentTheme === 'dark'}
          onPressedChange={() => handleThemeChange('dark')}
          className={`${currentTheme === 'dark' ? 'bg-gray-700 text-gray-100 shadow-sm' : 'bg-transparent'} border border-gray-700`}
        >
          <Moon size={16} className="mr-1" />
          Dark
        </Toggle>
        
        <Toggle 
          variant="outline"
          size="sm" 
          pressed={currentTheme === 'hacker'}
          onPressedChange={() => handleThemeChange('hacker')}
          className={`${currentTheme === 'hacker' ? 'bg-terminal-accent text-terminal-background shadow-sm' : 'bg-transparent'} border border-terminal-accent/70`}
        >
          <Terminal size={16} className="mr-1" />
          Terminal
        </Toggle>
      </div>
      
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
