
import React, { useState, useEffect } from 'react';
import { Command } from '@/types';
import {
  getAsciiArt,
  getHelpContent,
  getTheme
} from '@/services/dataService';
import useResumeConfig from './useResumeConfig';
import useCommandDefinitions from './useCommandDefinitions';
import { useNavigate } from 'react-router-dom';

const useTerminalCommands = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [asciiArt, setAsciiArt] = useState('');
  const [helpContent, setHelpContent] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [currentTheme, setCurrentTheme] = useState<string>('hacker');
  const { resumeUrl } = useResumeConfig();
  const navigate = useNavigate();

  // Function to apply theme to the document
  const applyTheme = (themeName: string) => {
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-hacker');
    document.documentElement.classList.add(`theme-${themeName}`);
    localStorage.setItem('portfolio-theme', themeName);
    console.log(`Theme applied: ${themeName}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const art = await getAsciiArt();
      const help = await getHelpContent();
      const theme = await getTheme();
      
      setAsciiArt(art);
      setHelpContent(help);
      
      // Apply the theme from local storage or default
      const savedTheme = localStorage.getItem('portfolio-theme') || theme.name;
      applyTheme(savedTheme);
      setCurrentTheme(savedTheme);
      
      setWelcomeMessage(`${art}\n\nWelcome to the terminal portfolio!\nType 'help' to see available commands.`);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!asciiArt || !helpContent) return;

    // Add global window function for resume download
    window.downloadResume = async () => {
      try {
        if (resumeUrl) {
          window.open(resumeUrl, '_blank');
        }
      } catch (error) {
        console.error("Error downloading resume:", error);
      }
    };

    // Get command definitions
    const commandsList = useCommandDefinitions(
      currentTheme, 
      setCurrentTheme,
      applyTheme,
      resumeUrl,
      navigate // Pass the navigate function to useCommandDefinitions
    );

    setCommands(commandsList);
  }, [asciiArt, helpContent, currentTheme, navigate, resumeUrl]);

  return { commands, welcomeMessage };
};

export default useTerminalCommands;
