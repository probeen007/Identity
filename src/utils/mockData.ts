import { About, Project, Skill, Experience, Certificate, Recommendation, FunFact } from '@/types';

// Mock About data
export const mockAbout: About = {
  id: 'about-1', // Added the id property
  name: 'Jane Doe',
  title: 'Full Stack Developer & UI/UX Designer',
  bio: 'Passionate developer with expertise in React, Node.js, and design systems. I love creating elegant solutions to complex problems.',
  location: 'San Francisco, CA',
  email: 'jane.doe@example.com',
  profileImageUrl: '/placeholder.svg',
  socialLinks: {
    github: 'https://github.com/janedoe',
    linkedin: 'https://linkedin.com/in/janedoe',
    twitter: 'https://twitter.com/janedoe',
    portfolio: 'https://janedoe.dev',
  },
};

// Mock Projects data
export const mockProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Terminal Portfolio',
    description: 'A personal portfolio website built as a terminal application using React and TypeScript.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/example/terminal-portfolio',
    demoUrl: 'https://terminal-portfolio.example.com',
    imageUrl: '/project1.png',
  },
  {
    id: 'project-2',
    title: 'E-commerce Dashboard',
    description: 'A comprehensive dashboard for managing an e-commerce platform, including sales analytics and inventory management.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/example/ecommerce-dashboard',
    demoUrl: 'https://ecommerce-dashboard.example.com',
    imageUrl: '/project2.png',
  },
  {
    id: 'project-3',
    title: 'Mobile Task Manager',
    description: 'A mobile application for managing tasks and projects on the go, built with React Native.',
    technologies: ['React Native', 'Firebase', 'Redux'],
    githubUrl: 'https://github.com/example/mobile-task-manager',
    imageUrl: '/project3.png',
  },
];

// Mock Skills data
export const mockSkills: Skill[] = [
  {
    id: 'skill-1',
    name: 'React',
    category: 'Frontend',
    level: 90,
  },
  {
    id: 'skill-2',
    name: 'Node.js',
    category: 'Backend',
    level: 80,
  },
  {
    id: 'skill-3',
    name: 'UI/UX Design',
    category: 'Design',
    level: 75,
  },
  {
    id: 'skill-4',
    name: 'TypeScript',
    category: 'Programming',
    level: 85,
  },
];

// Mock Experiences data
export const mockExperiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Tech Innovations Inc.',
    position: 'Senior Frontend Developer',
    duration: '2018 - Present',
    description: 'Led the development of multiple React-based web applications, focusing on performance optimization and UI/UX improvements.',
  },
  {
    id: 'exp-2',
    company: 'Global Solutions Ltd.',
    position: 'UI/UX Designer',
    duration: '2016 - 2018',
    description: 'Designed and implemented user interfaces for web and mobile applications, collaborating with developers to ensure seamless integration.',
  },
];

// Mock Certificates data
export const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Certified React Developer',
    issuer: 'React University',
    date: '2019',
    url: 'https://example.com/react-certificate',
  },
  {
    id: 'cert-2',
    title: 'UI/UX Design Professional',
    issuer: 'Design Institute',
    date: '2017',
    url: 'https://example.com/uiux-certificate',
  },
];

// Mock Recommendations data
export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    name: 'John Smith',
    position: 'CTO',
    company: 'Tech Innovations Inc.',
    text: 'Jane is a highly skilled developer with a keen eye for design. She consistently delivers high-quality work and is a valuable asset to our team.',
  },
  {
    id: 'rec-2',
    name: 'Alice Johnson',
    position: 'Project Manager',
    company: 'Global Solutions Ltd.',
    text: 'Jane is a talented UI/UX designer who is always willing to go the extra mile to ensure the success of our projects. Her creativity and attention to detail are truly impressive.',
  },
];

// Mock FunFacts data
export const mockFunFacts: FunFact[] = [
  {
    id: 'funfact-1',
    text: 'I can type over 80 words per minute.',
  },
  {
    id: 'funfact-2',
    text: 'I have contributed to over 20 open-source projects.',
  },
  {
    id: 'funfact-3',
    text: 'I love hiking and exploring new trails.',
  },
];

// Static content
export const asciiArt = `
  _____           _     _         ____  _                      
 |  __ \\         | |   (_)       |  _ \\(_)                     
 | |__) | __ __ _| |__  _ _ __   | |_) |_  ___  _ __ ___   ___ 
 |  ___/ '__/ _\` | '_ \\| | '_ \\  |  _ <| |/ _ \\| '_ \` _ \\ / _ \\
 | |   | | | (_| | |_) | | | | | | |_) | | (_) | | | | | |  __/
 |_|   |_|  \\__,_|_.__/|_|_| |_| |____/|_|\\___/|_| |_| |_|\\___|
                                                              
`;

export const helpContent = `
Available commands:
  - about: Display information about me
  - projects: List my projects
  - skills: List my skills
  - experience: List my work experience
  - certificates: List my certificates
  - recommendations: List recommendations
  - funfact: Display a fun fact about me
  - clear: Clear the terminal
  - help: Display this help message
`;

export const notFoundContent = `
Command not found. Type 'help' for a list of available commands.
`;

export const welcomeMessage = `
Welcome to my terminal portfolio! Type 'help' for a list of available commands.
`;
