
import { 
  About, Project, Skill, Experience, Certificate, 
  Recommendation, FunFact, ThemeConfig 
} from '@/types';
import { 
  mockAbout, mockProjects, mockSkills, mockExperiences, 
  mockCertificates, mockRecommendations, mockFunFacts,
  asciiArt, helpContent, notFoundContent 
} from '@/utils/mockData';

// Mock data service functions
export const getAbout = async (): Promise<About> => {
  return mockAbout;
};

export const getProjects = async (): Promise<Project[]> => {
  return mockProjects;
};

export const getSkills = async (): Promise<Skill[]> => {
  return mockSkills;
};

export const getExperiences = async (): Promise<Experience[]> => {
  return mockExperiences;
};

export const getCertificates = async (): Promise<Certificate[]> => {
  return mockCertificates;
};

export const getRecommendations = async (): Promise<Recommendation[]> => {
  return mockRecommendations;
};

export const getFunFact = async (): Promise<FunFact> => {
  const randomIndex = Math.floor(Math.random() * mockFunFacts.length);
  return mockFunFacts[randomIndex];
};

export const getHelpContent = async (): Promise<string> => {
  return helpContent;
};

export const getNotFoundContent = async (): Promise<string> => {
  return notFoundContent;
};

export const downloadResume = async (): Promise<string> => {
  return "Resume download started. Check your downloads folder.";
};

export const getAsciiArt = async (): Promise<string> => {
  return asciiArt;
};

export const getTheme = async (): Promise<ThemeConfig> => {
  return {
    name: 'hacker',
    backgroundColor: '#0a0a0a',
    foregroundColor: '#33ff33',
    accentColor: '#00ff00'
  };
};

export const setTheme = async (themeName: string): Promise<ThemeConfig> => {
  // Just return the theme object based on the name
  const themes: Record<string, ThemeConfig> = {
    light: {
      name: 'light',
      backgroundColor: '#ffffff',
      foregroundColor: '#000000',
      accentColor: '#0077ff'
    },
    dark: {
      name: 'dark',
      backgroundColor: '#1a1a1a',
      foregroundColor: '#ffffff',
      accentColor: '#00aaff'
    },
    hacker: {
      name: 'hacker',
      backgroundColor: '#0a0a0a',
      foregroundColor: '#33ff33',
      accentColor: '#00ff00'
    }
  };
  
  return themes[themeName] || themes.hacker;
};
