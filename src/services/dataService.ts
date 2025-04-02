
import {
  mockAbout,
  mockProjects,
  mockSkills,
  mockExperiences,
  mockCertificates,
  mockRecommendations,
  mockFunFacts,
  asciiArt,
  helpContent,
  notFoundContent,
  welcomeMessage
} from '@/utils/mockData';

import { 
  About, 
  Project, 
  Skill, 
  Experience, 
  Certificate, 
  Recommendation, 
  FunFact 
} from '@/types';

// In a real app, these would be API calls to your backend
export const getAbout = async (): Promise<About> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockAbout;
};

export const getProjects = async (): Promise<Project[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProjects;
};

export const getSkills = async (): Promise<Skill[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockSkills;
};

export const getExperiences = async (): Promise<Experience[]> => {
  await new Promise(resolve => setTimeout(resolve, 450));
  return mockExperiences;
};

export const getCertificates = async (): Promise<Certificate[]> => {
  await new Promise(resolve => setTimeout(resolve, 350));
  return mockCertificates;
};

export const getRecommendations = async (): Promise<Recommendation[]> => {
  await new Promise(resolve => setTimeout(resolve, 550));
  return mockRecommendations;
};

export const getFunFact = async (): Promise<FunFact> => {
  await new Promise(resolve => setTimeout(resolve, 250));
  const randomIndex = Math.floor(Math.random() * mockFunFacts.length);
  return mockFunFacts[randomIndex];
};

export const getAsciiArt = async (): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return asciiArt;
};

export const getHelpContent = async (): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 150));
  return helpContent;
};

export const getWelcomeMessage = async (): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return welcomeMessage;
};

export const getNotFoundContent = async (): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return notFoundContent;
};

export const downloadResume = async (): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  // In a real app, this would return a URL to download the resume
  return "Resume download initiated...";
};
