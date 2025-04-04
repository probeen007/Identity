
import { 
  About, 
  Project, 
  Skill, 
  Experience, 
  Certificate, 
  Recommendation, 
  FunFact 
} from '@/types';

export const mockAbout: About = {
  name: "John Doe",
  title: "Full Stack Developer",
  bio: "I'm a passionate developer with expertise in building robust web applications. I specialize in React, Node.js, and modern web technologies. When I'm not coding, I enjoy hiking and playing chess.",
  location: "San Francisco, CA",
  email: "john.doe@example.com",
  profileImageUrl: "/placeholder.svg", // Added profileImageUrl property
  socialLinks: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
    portfolio: "https://johndoe.com"
  }
};

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with payment processing, inventory management, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/johndoe/ecommerce",
    demoUrl: "https://ecommerce-demo.johndoe.com"
  },
  {
    id: "2",
    title: "AI Content Generator",
    description: "An AI-powered tool that generates blog posts, social media content, and marketing copy.",
    technologies: ["Python", "TensorFlow", "React", "Flask"],
    githubUrl: "https://github.com/johndoe/ai-content-generator"
  },
  {
    id: "3",
    title: "Task Management App",
    description: "A kanban-style task management application with team collaboration features.",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
    githubUrl: "https://github.com/johndoe/task-manager",
    demoUrl: "https://task-app.johndoe.com"
  }
];

export const mockSkills: Skill[] = [
  { id: "1", name: "JavaScript", category: "Frontend", level: 90 },
  { id: "2", name: "React", category: "Frontend", level: 85 },
  { id: "3", name: "Node.js", category: "Backend", level: 80 },
  { id: "4", name: "TypeScript", category: "Language", level: 75 },
  { id: "5", name: "Python", category: "Language", level: 70 },
  { id: "6", name: "MongoDB", category: "Database", level: 75 },
  { id: "7", name: "PostgreSQL", category: "Database", level: 70 },
  { id: "8", name: "Docker", category: "DevOps", level: 65 },
  { id: "9", name: "AWS", category: "Cloud", level: 60 },
  { id: "10", name: "GraphQL", category: "API", level: 80 }
];

export const mockExperiences: Experience[] = [
  {
    id: "1",
    company: "Tech Innovations Inc.",
    position: "Senior Frontend Developer",
    duration: "2020 - Present",
    description: "Lead the development of the company's main SaaS product, improving performance by 40% and implementing new features that increased user engagement by 25%."
  },
  {
    id: "2",
    company: "WebSolutions Co.",
    position: "Full Stack Developer",
    duration: "2018 - 2020",
    description: "Developed and maintained multiple client projects using React, Node.js, and MongoDB. Implemented CI/CD pipelines that reduced deployment time by 60%."
  },
  {
    id: "3",
    company: "StartupXYZ",
    position: "Junior Developer",
    duration: "2016 - 2018",
    description: "Worked on the company's mobile-responsive website and contributed to the development of internal tools."
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: "1",
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2022",
    url: "https://aws.amazon.com/certification/"
  },
  {
    id: "2",
    title: "Professional Full-Stack Engineer",
    issuer: "Codecademy",
    date: "2021",
    url: "https://www.codecademy.com/"
  },
  {
    id: "3",
    title: "MongoDB Certified Developer",
    issuer: "MongoDB University",
    date: "2020",
    url: "https://university.mongodb.com/"
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    id: "1",
    name: "Jane Smith",
    position: "CTO",
    company: "Tech Innovations Inc.",
    text: "John is an exceptional developer with a keen eye for detail. His ability to solve complex problems and deliver high-quality code consistently made him an invaluable asset to our team."
  },
  {
    id: "2",
    name: "Mike Johnson",
    position: "Product Manager",
    company: "WebSolutions Co.",
    text: "Working with John was a pleasure. His technical expertise combined with great communication skills helped us deliver projects on time and exceed client expectations."
  }
];

export const mockFunFacts: FunFact[] = [
  { id: "1", text: "I once debugged code for 16 hours straight, fueled only by coffee and determination." },
  { id: "2", text: "My first computer was a Commodore 64, which sparked my interest in programming." },
  { id: "3", text: "I can type at 110 WPM, which comes in handy during intense coding sessions." },
  { id: "4", text: "I've contributed to over 30 open-source projects in my free time." },
  { id: "5", text: "I taught myself to code by building a game when I was 12 years old." }
];

export const asciiArt = `
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░██╗░░██╗░█████╗░░█████╗░██╗░░██╗███████╗░
░░██║░░██║██╔══██╗██╔══██╗██║░██╔╝██╔════╝░
░░███████║███████║██║░░╚═╝█████═╝░█████╗░░░
░░██╔══██║██╔══██║██║░░██╗██╔═██╗░██╔══╝░░░
░░██║░░██║██║░░██║╚█████╔╝██║░╚██╗███████╗░
░░╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
`;

export const helpContent = `
Available commands:

about        - Display information about me
projects     - List my projects
skills       - Show my technical skills
experience   - Show my work experience
certificates - Display my certifications
recommendations - Show testimonials from colleagues
resume       - Download my resume
contact      - Show contact information
funfact      - Display a random fun fact
clear        - Clear the terminal screen
theme        - Change terminal theme
help         - Show this help message

Type a command and press Enter to execute.
`;

export const notFoundContent = `
Command not found. Type 'help' to see available commands.
`;

export const welcomeMessage = `
Welcome to John Doe's terminal portfolio!
Type 'help' to see available commands.
`;
