import { About, Project, Skill, Experience, Certificate, Recommendation, FunFact } from '@/types';

// Mock About data
export const mockAbout: About = {
  id: 'about-1', // Added the id property
  name: 'Prabin Bhattarai',
  title: 'Full Stack Developer & Ai Developer',
  bio: 'Passionate developer with expertise in React, Node.js, Ai integrations, Python, and more. I love creating elegant solutions to complex problems.',
  location: 'Lumbini, Nepal',
  email: 'pro.victus07@gmail.com',
  profileImageUrl: '/pp.png',
  socialLinks: {
    github: 'https://github.com/probeen007',
    linkedin: 'https://www.linkedin.com/in/prabin-bhattarai-78127b257/',
    twitter: '#',
    portfolio: 'https://prabin-bhattarai.com.np',
  },
};

// Mock Projects data
export const mockProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Mero-Link',
    description: 'An open source link in bio website builder that allows you to create a professional and customizable link in bio website in minutes.',
    technologies: ['React', 'aws', 'Tailwind CSS', 'MongoDB', 'Node.js', 'Express'],
    githubUrl: 'https://github.com/probeen007/Mero-Link',
    demoUrl: 'https://merolink.me',
    imageUrl: '/logo.png',
  },
  {
    id: 'project-2',
    title: 'Bhattaarai E-commerce',
    description: 'A dyamic fully e-commerce website with listing products, admin dashboard for managing products, orders, and customers tailored for real offline shop',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB','firebase'],
    githubUrl: 'https://github.com/probeen007/Bhattarai-Ecommerce-Nepal',
    demoUrl: 'https://bhattaraibhada.com.np',
    imageUrl: '/logo.png',
  },
  {
    id: 'project-3',
    title: 'Rent Nepal',
    description: 'A small startup rental webapp for renting rooms and houses in Nepal',
    technologies: ['React', 'cloudinary', 'Tailwind CSS', 'MongoDB', 'Node.js', 'Express'],
    githubUrl: 'https://github.com/probeen007/Rent-Nepal',
    demoUrl: '#',
    imageUrl: '/logo.png',
  },
];

// Mock Skills data
export const mockSkills: Skill[] = [
  {
    id: 'skill-1',
    name: 'React',
    category: 'Frontend',
    level: 80,
  },
  {
    id: 'skill-2',
    name: 'Node.js',
    category: 'Backend',
    level: 80,
  },
  {
    id: 'skill-3',
    name: 'Database: MongoDB,Supabase',
    category: 'Database',
    level: 75,
  },
  {
    id: 'skill-4',
    name: 'Python',
    category: 'Programming',
    level: 75,
  },
  {
    id: 'skill-5',
    name: 'Ai integrations & Chatbots',
    category: 'Ai',
    level: 65,
  },
  {
    id: 'skill-6',
    name: 'Model Training',
    category: 'Ai',
    level: 55,
  },
];

// Mock Experiences data
export const mockExperiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Mero-Link',
    position: 'co-founder',
    duration: '2020 - Present',
    description: 'Led the development of the Mero-Link website, a link in bio website builder that allows you to create a professional and customizable link in bio website in minutes.',
  },
  {
    id: 'exp-2',
    company: 'Nepal Graphics startup',
    position: 'full stack developer',
    duration: '2022-2024',
    description: 'Worked on the development of the Nepal Graphics startup website, a institution for providing graphic design services to clients.',
  },
  {
    id: 'exp-3',
    company: 'New Horizon school',
    position: 'Robotics intern',
    duration: '2022-2024',
    description: 'Worked on the development of the medical drone ai project with python and open cv',
  },
];

// Mock Certificates data
export const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Certified Full Stack Engineer',
    issuer: 'Frontend masters',
    date: '2024',
    url: 'https://static.frontendmasters.com/ud/c/ac7f75ba70/pApqiQbIWA/fullstack-v3.pdf',
  },
  {
    id: 'cert-2',
    title: 'Neural Network & Deep Learning',
    issuer: 'Frontend masters',
    date: '2025',
    url: 'https://static.frontendmasters.com/ud/c/ac7f75ba70/ASgTLkgjgF/hard-parts-ai.pdf',
  },
  {
    id: 'cert-3',
    title: 'Harvard CS50',
    issuer: 'Harvard University',
    date: '2024',
    url: 'https://certificates.cs50.io/b1823c88-0c96-47e8-aded-ea23c1bb5318.pdf?size=letter',
  },
  {
    id: 'cert-4',
    title: 'Introduction to llms',
    issuer: 'Google',
    date: '2024',
    url: 'https://www.cloudskillsboost.google/public_profiles/0a9e2f35-a577-4600-86d4-fbb6ea16eed8/badges/6168392?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share',
  },
];

// Mock Recommendations data
export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    name: 'Dipesh Pokhrel',
    position: 'CEO',
    company: 'Nepal Graphics',
    text: 'Prabin is a great developer and a good person. He is always willing to help and is a valuable asset to our team.',
  },
  {
    id: 'rec-2',
    name: 'Ashok aryal',
    position: 'It Head and Cs Lecturer',
    company: 'New Horizon school',
    text: 'Prabin is a curious student and a great developer with out of the box problem solving skills.',
  },
];

// Mock FunFacts data
export const mockFunFacts: FunFact[] = [
  {
    id: 'funfact-1',
    text: 'I can code 10 hours a day without getting bored.',
  },
  {
    id: 'funfact-2',
    text: 'I cant sleep without learning new things.',
  },
  {
    id: 'funfact-3',
    text: 'I love to play Cricket and hittng gym.',
  },
  {
    id: 'funfact-4',
    text: 'Love startups and want to build my own one day.',
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
