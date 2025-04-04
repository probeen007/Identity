
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
  FunFact,
  ThemeConfig
} from '@/types';

// Mock database for demo purposes
let aboutData = { 
  ...mockAbout, 
  profileImageUrl: '/placeholder.svg' // Set a default value instead of empty string
};
let projectsData = [...mockProjects];
let skillsData = [...mockSkills];
let experiencesData = [...mockExperiences];
let certificatesData = [...mockCertificates];
let recommendationsData = [...mockRecommendations];
let funFactsData = [...mockFunFacts];

// Theme storage
let currentTheme: ThemeConfig = {
  name: 'hacker',
  backgroundColor: '#0d1117',
  foregroundColor: '#00FF00',
  accentColor: '#1C8CFF'
};

// In a real app, these would be API calls to your backend
export const getAbout = async (): Promise<About> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return aboutData;
};

export const updateAbout = async (data: About): Promise<About> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  aboutData = { ...data };
  return aboutData;
};

export const getProjects = async (): Promise<Project[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return projectsData;
};

export const updateProject = async (id: string, data: Partial<Project>): Promise<Project> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = projectsData.findIndex(project => project.id === id);
  if (index === -1) throw new Error('Project not found');
  
  projectsData[index] = { ...projectsData[index], ...data };
  return projectsData[index];
};

export const addProject = async (data: Omit<Project, 'id'>): Promise<Project> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const newProject = { 
    ...data, 
    id: `project-${Date.now()}` 
  };
  projectsData.push(newProject);
  return newProject;
};

export const deleteProject = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = projectsData.findIndex(project => project.id === id);
  if (index === -1) throw new Error('Project not found');
  
  projectsData.splice(index, 1);
};

export const getSkills = async (): Promise<Skill[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return skillsData;
};

export const updateSkill = async (id: string, data: Partial<Skill>): Promise<Skill> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = skillsData.findIndex(skill => skill.id === id);
  if (index === -1) throw new Error('Skill not found');
  
  skillsData[index] = { ...skillsData[index], ...data };
  return skillsData[index];
};

export const addSkill = async (data: Omit<Skill, 'id'>): Promise<Skill> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const newSkill = { 
    ...data, 
    id: `skill-${Date.now()}` 
  };
  skillsData.push(newSkill);
  return newSkill;
};

export const deleteSkill = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = skillsData.findIndex(skill => skill.id === id);
  if (index === -1) throw new Error('Skill not found');
  
  skillsData.splice(index, 1);
};

export const getExperiences = async (): Promise<Experience[]> => {
  await new Promise(resolve => setTimeout(resolve, 450));
  return experiencesData;
};

export const updateExperience = async (id: string, data: Partial<Experience>): Promise<Experience> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = experiencesData.findIndex(exp => exp.id === id);
  if (index === -1) throw new Error('Experience not found');
  
  experiencesData[index] = { ...experiencesData[index], ...data };
  return experiencesData[index];
};

export const addExperience = async (data: Omit<Experience, 'id'>): Promise<Experience> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const newExperience = { 
    ...data, 
    id: `exp-${Date.now()}` 
  };
  experiencesData.push(newExperience);
  return newExperience;
};

export const deleteExperience = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = experiencesData.findIndex(exp => exp.id === id);
  if (index === -1) throw new Error('Experience not found');
  
  experiencesData.splice(index, 1);
};

export const getCertificates = async (): Promise<Certificate[]> => {
  await new Promise(resolve => setTimeout(resolve, 350));
  return certificatesData;
};

export const updateCertificate = async (id: string, data: Partial<Certificate>): Promise<Certificate> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = certificatesData.findIndex(cert => cert.id === id);
  if (index === -1) throw new Error('Certificate not found');
  
  certificatesData[index] = { ...certificatesData[index], ...data };
  return certificatesData[index];
};

export const addCertificate = async (data: Omit<Certificate, 'id'>): Promise<Certificate> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const newCertificate = { 
    ...data, 
    id: `cert-${Date.now()}` 
  };
  certificatesData.push(newCertificate);
  return newCertificate;
};

export const deleteCertificate = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = certificatesData.findIndex(cert => cert.id === id);
  if (index === -1) throw new Error('Certificate not found');
  
  certificatesData.splice(index, 1);
};

export const getRecommendations = async (): Promise<Recommendation[]> => {
  await new Promise(resolve => setTimeout(resolve, 550));
  return recommendationsData;
};

export const updateRecommendation = async (id: string, data: Partial<Recommendation>): Promise<Recommendation> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = recommendationsData.findIndex(rec => rec.id === id);
  if (index === -1) throw new Error('Recommendation not found');
  
  recommendationsData[index] = { ...recommendationsData[index], ...data };
  return recommendationsData[index];
};

export const addRecommendation = async (data: Omit<Recommendation, 'id'>): Promise<Recommendation> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const newRecommendation = { 
    ...data, 
    id: `rec-${Date.now()}` 
  };
  recommendationsData.push(newRecommendation);
  return newRecommendation;
};

export const deleteRecommendation = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = recommendationsData.findIndex(rec => rec.id === id);
  if (index === -1) throw new Error('Recommendation not found');
  
  recommendationsData.splice(index, 1);
};

export const getFunFact = async (): Promise<FunFact> => {
  await new Promise(resolve => setTimeout(resolve, 250));
  const randomIndex = Math.floor(Math.random() * funFactsData.length);
  return funFactsData[randomIndex];
};

export const getAllFunFacts = async (): Promise<FunFact[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return funFactsData;
};

export const updateFunFact = async (id: string, data: Partial<FunFact>): Promise<FunFact> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = funFactsData.findIndex(fact => fact.id === id);
  if (index === -1) throw new Error('Fun fact not found');
  
  funFactsData[index] = { ...funFactsData[index], ...data };
  return funFactsData[index];
};

export const addFunFact = async (data: Omit<FunFact, 'id'>): Promise<FunFact> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const newFunFact = { 
    ...data, 
    id: `fact-${Date.now()}` 
  };
  funFactsData.push(newFunFact);
  return newFunFact;
};

export const deleteFunFact = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const index = funFactsData.findIndex(fact => fact.id === id);
  if (index === -1) throw new Error('Fun fact not found');
  
  funFactsData.splice(index, 1);
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
  
  // In a real app, this would generate and return a URL to download the resume
  // For demo purposes, we'll simulate creating a downloadable file using Blob and URL.createObjectURL
  
  try {
    const about = await getAbout();
    const experiences = await getExperiences();
    const skills = await getSkills();
    const education = await getCertificates();
    
    // Generate resume content
    const resumeContent = `
# ${about.name} - ${about.title}

## Contact
Email: ${about.email}
Location: ${about.location}
${about.socialLinks.github ? `GitHub: ${about.socialLinks.github}` : ''}
${about.socialLinks.linkedin ? `LinkedIn: ${about.socialLinks.linkedin}` : ''}
${about.socialLinks.twitter ? `Twitter: ${about.socialLinks.twitter}` : ''}

## Professional Summary
${about.bio}

## Experience
${experiences.map(exp => `
### ${exp.position} at ${exp.company}
**${exp.duration}**
${exp.description}
`).join('\n')}

## Skills
${skills.map(skill => `- ${skill.name} (${skill.category})`).join('\n')}

## Education & Certifications
${education.map(cert => `- ${cert.title} (${cert.issuer}, ${cert.date})`).join('\n')}
`.trim();

    return "Resume download initiated successfully!";
  } catch (error) {
    console.error("Error generating resume:", error);
    throw new Error("Failed to generate resume");
  }
};

// Theme management
export const getTheme = async (): Promise<ThemeConfig> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return currentTheme;
};

export const setTheme = async (theme: string): Promise<ThemeConfig> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  switch (theme.toLowerCase()) {
    case 'light':
      currentTheme = {
        name: 'light',
        backgroundColor: '#f9fafb',
        foregroundColor: '#333333',
        accentColor: '#3b82f6'
      };
      break;
    case 'dark':
      currentTheme = {
        name: 'dark',
        backgroundColor: '#1e293b',
        foregroundColor: '#e2e8f0',
        accentColor: '#3b82f6'
      };
      break;
    case 'hacker':
    default:
      currentTheme = {
        name: 'hacker',
        backgroundColor: '#0d1117',
        foregroundColor: '#00FF00',
        accentColor: '#1C8CFF'
      };
      break;
  }
  
  return currentTheme;
};
