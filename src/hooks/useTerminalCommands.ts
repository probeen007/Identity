
import { useState, useEffect } from 'react';
import { Command } from '@/types';
import {
  getAbout,
  getProjects,
  getSkills,
  getExperiences,
  getCertificates,
  getRecommendations,
  getFunFact,
  getHelpContent,
  getNotFoundContent,
  downloadResume,
  getAsciiArt
} from '@/services/dataService';

const useTerminalCommands = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [asciiArt, setAsciiArt] = useState('');
  const [helpContent, setHelpContent] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const art = await getAsciiArt();
      const help = await getHelpContent();
      
      setAsciiArt(art);
      setHelpContent(help);
      setWelcomeMessage(`${art}\n\nWelcome to the terminal portfolio!\nType 'help' to see available commands.`);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!asciiArt || !helpContent) return;

    const commandsList: Command[] = [
      {
        command: 'about',
        description: 'Display information about me',
        handler: async () => {
          const about = await getAbout();
          return {
            type: 'text',
            content: `
Name: ${about.name}
Title: ${about.title}
Location: ${about.location}

${about.bio}

Email: ${about.email}
GitHub: ${about.socialLinks.github || 'N/A'}
LinkedIn: ${about.socialLinks.linkedin || 'N/A'}
Twitter: ${about.socialLinks.twitter || 'N/A'}
Website: ${about.socialLinks.portfolio || 'N/A'}
`
          };
        }
      },
      {
        command: 'projects',
        description: 'List my projects',
        handler: async () => {
          const projects = await getProjects();
          return {
            type: 'text',
            content: projects.map(project => `
# ${project.title}
${project.description}

Technologies: ${project.technologies.join(', ')}
${project.githubUrl ? `GitHub: ${project.githubUrl}` : ''}
${project.demoUrl ? `Demo: ${project.demoUrl}` : ''}
`).join('\n')
          };
        }
      },
      {
        command: 'skills',
        description: 'Show my technical skills',
        handler: async () => {
          const skills = await getSkills();
          const categories = Array.from(new Set(skills.map(s => s.category)));
          
          return {
            type: 'text',
            content: categories.map(category => {
              const categorySkills = skills.filter(s => s.category === category);
              return `
## ${category}
${categorySkills.map(skill => `- ${skill.name} ${'█'.repeat(Math.floor(skill.level/10))}`).join('\n')}
`;
            }).join('\n')
          };
        }
      },
      {
        command: 'experience',
        description: 'Show my work experience',
        handler: async () => {
          const experiences = await getExperiences();
          return {
            type: 'text',
            content: experiences.map(exp => `
## ${exp.position} at ${exp.company}
Duration: ${exp.duration}

${exp.description}
`).join('\n')
          };
        }
      },
      {
        command: 'certificates',
        description: 'Display my certifications',
        handler: async () => {
          const certificates = await getCertificates();
          return {
            type: 'text',
            content: certificates.map(cert => `
- ${cert.title} (${cert.issuer}, ${cert.date})
  ${cert.url ? `URL: ${cert.url}` : ''}
`).join('\n')
          };
        }
      },
      {
        command: 'recommendations',
        description: 'Show testimonials from colleagues',
        handler: async () => {
          const recommendations = await getRecommendations();
          return {
            type: 'text',
            content: recommendations.map(rec => `
"${rec.text}"
— ${rec.name}, ${rec.position} at ${rec.company}
`).join('\n')
          };
        }
      },
      {
        command: 'resume',
        description: 'Download my resume',
        handler: async () => {
          const message = await downloadResume();
          return {
            type: 'success',
            content: message
          };
        }
      },
      {
        command: 'contact',
        description: 'Show contact information',
        handler: async () => {
          const about = await getAbout();
          return {
            type: 'info',
            content: `
Email: ${about.email}
GitHub: ${about.socialLinks.github || 'N/A'}
LinkedIn: ${about.socialLinks.linkedin || 'N/A'}
Twitter: ${about.socialLinks.twitter || 'N/A'}
`
          };
        }
      },
      {
        command: 'funfact',
        description: 'Display a random fun fact',
        handler: async () => {
          const fact = await getFunFact();
          return {
            type: 'info',
            content: fact.text
          };
        }
      },
      {
        command: 'clear',
        description: 'Clear the terminal screen',
        handler: async () => {
          return {
            type: 'text',
            content: ''
          };
        }
      },
      {
        command: 'theme',
        description: 'Change terminal theme (light/dark/hacker)',
        usage: 'theme [light|dark|hacker]',
        handler: async (args) => {
          if (!args || args.length === 0) {
            return {
              type: 'info',
              content: 'Usage: theme [light|dark|hacker]'
            };
          }
          
          const theme = args[0].toLowerCase();
          if (!['light', 'dark', 'hacker'].includes(theme)) {
            return {
              type: 'error',
              content: 'Invalid theme. Available themes: light, dark, hacker'
            };
          }
          
          // In a real app, this would update the theme
          // For now we'll just return a message
          return {
            type: 'success',
            content: `Theme changed to ${theme}`
          };
        }
      },
      {
        command: 'help',
        description: 'Show this help message',
        handler: async () => {
          return {
            type: 'info',
            content: helpContent
          };
        }
      },
      {
        command: 'sudo',
        description: 'Run command with admin privileges',
        handler: async (args) => {
          if (args && args.length > 0 && args[0] === 'gimmeajob') {
            return {
              type: 'error',
              content: 'Permission denied: Nice try!'
            };
          }
          
          return {
            type: 'warning',
            content: 'sudo: This incident will be reported.'
          };
        }
      },
      {
        command: 'matrix',
        description: 'Activate matrix mode',
        handler: async () => {
          return {
            type: 'success',
            content: 'Matrix mode activated. There is no spoon.'
          };
        }
      },
      {
        command: 'hack',
        description: 'Hack the mainframe',
        handler: async () => {
          return {
            type: 'warning',
            content: 'ALERT: Unauthorized access detected. Initiating countermeasures...'
          };
        }
      }
    ];

    setCommands(commandsList);
  }, [asciiArt, helpContent]);

  return { commands, welcomeMessage };
};

export default useTerminalCommands;
