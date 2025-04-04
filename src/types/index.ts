
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface FunFact {
  id: string;
  text: string;
}

export interface Recommendation {
  id: string;
  name: string;
  position: string;
  company: string;
  text: string;
}

export interface CommandOutput {
  type: 'text' | 'error' | 'success' | 'warning' | 'info' | 'ascii' | 'json' | 'html' | 'profile' | 'projects' | 'skills' | 'experience' | 'certificates' | 'recommendations' | 'contact' | 'funfact';
  content: string | React.ReactNode;
}

export interface Command {
  command: string;
  description: string;
  usage?: string;
  handler: (args?: string[]) => CommandOutput | Promise<CommandOutput>;
}

export interface About {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
}

export interface ThemeConfig {
  name: 'dark' | 'light' | 'hacker';
  backgroundColor: string;
  foregroundColor: string;
  accentColor: string;
}
