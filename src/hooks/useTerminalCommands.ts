
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
  getAsciiArt,
  setTheme,
  getTheme
} from '@/services/dataService';

const useTerminalCommands = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [asciiArt, setAsciiArt] = useState('');
  const [helpContent, setHelpContent] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [currentTheme, setCurrentTheme] = useState<string>('hacker');

  useEffect(() => {
    const fetchData = async () => {
      const art = await getAsciiArt();
      const help = await getHelpContent();
      const theme = await getTheme();
      
      setAsciiArt(art);
      setHelpContent(help);
      setCurrentTheme(theme.name);
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
            type: 'profile',
            content: `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-accent mb-2">
  <h2 class="text-lg font-bold text-terminal-accent mb-2">${about.name}</h2>
  <p class="text-terminal-foreground mb-2"><span class="text-terminal-info">${about.title}</span> • ${about.location}</p>
  <p class="mb-4">${about.bio}</p>
  <div class="grid grid-cols-2 gap-2">
    <div>
      <p class="text-terminal-muted">Email:</p>
      <p><a href="mailto:${about.email}" class="text-terminal-accent hover:underline">${about.email}</a></p>
    </div>
    <div>
      <p class="text-terminal-muted">Connect:</p>
      <div class="flex space-x-2">
        ${about.socialLinks.github ? `<a href="${about.socialLinks.github}" target="_blank" class="text-terminal-accent hover:underline">GitHub</a>` : ''}
        ${about.socialLinks.linkedin ? `<a href="${about.socialLinks.linkedin}" target="_blank" class="text-terminal-accent hover:underline">LinkedIn</a>` : ''}
        ${about.socialLinks.twitter ? `<a href="${about.socialLinks.twitter}" target="_blank" class="text-terminal-accent hover:underline">Twitter</a>` : ''}
      </div>
    </div>
  </div>
</div>
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
            type: 'projects',
            content: projects.map(project => `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-accent mb-2">
  <h2 class="text-lg font-bold text-terminal-accent">${project.title}</h2>
  <p class="mb-2">${project.description}</p>
  <div class="mb-2">
    <span class="text-terminal-muted">Technologies: </span>
    <span class="text-terminal-info">${project.technologies.join(', ')}</span>
  </div>
  <div class="flex space-x-2">
    ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="text-terminal-accent hover:underline">GitHub</a>` : ''}
    ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="text-terminal-accent hover:underline">Demo</a>` : ''}
  </div>
</div>
`).join('')
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
            type: 'skills',
            content: categories.map(category => `
<div class="mb-4">
  <h2 class="text-lg font-bold text-terminal-accent mb-2">${category}</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    ${skills.filter(s => s.category === category).map(skill => `
      <div class="bg-hacker-light p-2 rounded-md border border-terminal-accent">
        <div class="flex justify-between items-center mb-1">
          <span>${skill.name}</span>
          <span class="text-xs text-terminal-muted">${skill.level}/100</span>
        </div>
        <div class="w-full bg-hacker-dark rounded-full h-2 overflow-hidden">
          <div class="bg-terminal-accent h-full" style="width: ${skill.level}%"></div>
        </div>
      </div>
    `).join('')}
  </div>
</div>
`).join('')
          };
        }
      },
      {
        command: 'experience',
        description: 'Show my work experience',
        handler: async () => {
          const experiences = await getExperiences();
          return {
            type: 'experience',
            content: experiences.map(exp => `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-accent mb-2">
  <h2 class="text-lg font-bold text-terminal-accent">${exp.position}</h2>
  <p class="text-terminal-info mb-1">${exp.company}</p>
  <p class="text-terminal-muted mb-2">${exp.duration}</p>
  <p>${exp.description}</p>
</div>
`).join('')
          };
        }
      },
      {
        command: 'certificates',
        description: 'Display my certifications',
        handler: async () => {
          const certificates = await getCertificates();
          return {
            type: 'certificates',
            content: `
<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
  ${certificates.map(cert => `
    <div class="bg-hacker-light p-4 rounded-md border border-terminal-accent">
      <h3 class="font-bold text-terminal-accent">${cert.title}</h3>
      <p class="text-terminal-muted">${cert.issuer}, ${cert.date}</p>
      ${cert.url ? `<a href="${cert.url}" target="_blank" class="text-terminal-accent hover:underline mt-1 inline-block">View Certificate</a>` : ''}
    </div>
  `).join('')}
</div>
`
          };
        }
      },
      {
        command: 'recommendations',
        description: 'Show testimonials from colleagues',
        handler: async () => {
          const recommendations = await getRecommendations();
          return {
            type: 'recommendations',
            content: recommendations.map(rec => `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-accent mb-2">
  <p class="italic mb-2">"${rec.text}"</p>
  <div class="text-right">
    <p class="font-bold text-terminal-accent">${rec.name}</p>
    <p class="text-terminal-muted text-sm">${rec.position} at ${rec.company}</p>
  </div>
</div>
`).join('')
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
            content: `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-accent text-center">
  <p class="text-terminal-success mb-2">${message}</p>
  <p>Your browser should start downloading the resume file shortly.</p>
  <p class="text-terminal-muted text-sm mt-2">If the download doesn't start automatically, <a href="#" class="text-terminal-accent hover:underline" onclick="window.downloadResume()">click here</a>.</p>
</div>
`
          };
        }
      },
      {
        command: 'contact',
        description: 'Show contact information',
        handler: async () => {
          const about = await getAbout();
          return {
            type: 'contact',
            content: `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-accent">
  <h2 class="text-lg font-bold text-terminal-accent mb-2">Contact Information</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <p class="text-terminal-muted">Email:</p>
      <p><a href="mailto:${about.email}" class="text-terminal-accent hover:underline">${about.email}</a></p>
    </div>
    <div>
      <p class="text-terminal-muted">Connect:</p>
      <div class="flex flex-col space-y-1">
        ${about.socialLinks.github ? `<a href="${about.socialLinks.github}" target="_blank" class="text-terminal-accent hover:underline">GitHub</a>` : ''}
        ${about.socialLinks.linkedin ? `<a href="${about.socialLinks.linkedin}" target="_blank" class="text-terminal-accent hover:underline">LinkedIn</a>` : ''}
        ${about.socialLinks.twitter ? `<a href="${about.socialLinks.twitter}" target="_blank" class="text-terminal-accent hover:underline">Twitter</a>` : ''}
      </div>
    </div>
  </div>
</div>
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
            type: 'funfact',
            content: `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-accent">
  <p class="text-terminal-accent font-bold mb-1">Did you know?</p>
  <p>${fact.text}</p>
</div>
`
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
              content: `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-accent">
  <p class="mb-2">Current theme: <span class="text-terminal-accent font-bold">${currentTheme}</span></p>
  <p class="mb-1">Usage: <span class="text-terminal-info">theme [light|dark|hacker]</span></p>
  <p>Available themes:</p>
  <ul class="list-disc pl-5 mt-1">
    <li><span class="text-terminal-accent">light</span> - Light theme with dark text</li>
    <li><span class="text-terminal-accent">dark</span> - Dark theme with light text</li>
    <li><span class="text-terminal-accent">hacker</span> - Hacker theme with green text</li>
  </ul>
</div>
`
            };
          }
          
          const theme = args[0].toLowerCase();
          if (!['light', 'dark', 'hacker'].includes(theme)) {
            return {
              type: 'error',
              content: `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-error">
  <p class="text-terminal-error">Invalid theme: ${theme}</p>
  <p class="mt-1">Available themes: light, dark, hacker</p>
</div>
`
            };
          }
          
          try {
            // Update the theme
            const newTheme = await setTheme(theme);
            setCurrentTheme(newTheme.name);
            
            // In a real implementation, we would apply the theme here
            // For this demo, we'll just return a success message
            return {
              type: 'success',
              content: `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-accent">
  <p class="text-terminal-success mb-1">Theme changed to <span class="font-bold">${newTheme.name}</span></p>
  <p>The new theme has been applied to your terminal.</p>
</div>
`
            };
          } catch (error) {
            return {
              type: 'error',
              content: `Error changing theme: ${error instanceof Error ? error.message : String(error)}`
            };
          }
        }
      },
      {
        command: 'help',
        description: 'Show this help message',
        handler: async () => {
          return {
            type: 'info',
            content: `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-accent">
  <h2 class="text-lg font-bold text-terminal-accent mb-2">Available Commands</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
    ${commands.map(cmd => `
      <div class="p-2 hover:bg-hacker-dark transition-colors rounded">
        <p class="font-bold text-terminal-accent">${cmd.command}</p>
        <p class="text-sm">${cmd.description}</p>
        ${cmd.usage ? `<p class="text-xs text-terminal-muted">Usage: ${cmd.usage}</p>` : ''}
      </div>
    `).join('')}
  </div>
</div>
`
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
              content: `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-error">
  <p class="text-terminal-error">Permission denied: Nice try!</p>
</div>
`
            };
          }
          
          return {
            type: 'warning',
            content: `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-warning">
  <p class="text-terminal-warning">sudo: This incident will be reported.</p>
</div>
`
          };
        }
      },
      {
        command: 'matrix',
        description: 'Activate matrix mode',
        handler: async () => {
          return {
            type: 'success',
            content: `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-accent">
  <p class="text-terminal-success">Matrix mode activated. There is no spoon.</p>
  <div class="mt-2 flex justify-center">
    <div class="terminal-matrix-animation h-20 w-full overflow-hidden relative">
      <div class="absolute inset-0 matrix-code-rain"></div>
    </div>
  </div>
</div>
`
          };
        }
      },
      {
        command: 'hack',
        description: 'Hack the mainframe',
        handler: async () => {
          return {
            type: 'warning',
            content: `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-warning">
  <p class="text-terminal-warning mb-2">ALERT: Unauthorized access detected. Initiating countermeasures...</p>
  <div class="hack-animation p-2 font-mono text-xs overflow-hidden h-20">
    <div class="hack-text">
      $ initiating hack sequence...<br>
      $ bypassing firewall...<br>
      $ searching for vulnerabilities...<br>
      $ accessing mainframe...<br>
      $ WARNING: intrusion detected!<br>
      $ security protocols engaged<br>
      $ trace initiated<br>
      $ connection terminated
    </div>
  </div>
</div>
`
          };
        }
      },
      {
        command: 'admin',
        description: 'Go to admin dashboard',
        handler: async () => {
          return {
            type: 'info',
            content: `
<div class="bg-hacker-light p-4 rounded-md border border-terminal-accent">
  <p class="mb-2">Redirecting to admin dashboard...</p>
  <p>Visit <a href="/admin" class="text-terminal-accent hover:underline">/admin</a> to access the administration panel.</p>
</div>
`
          };
        }
      }
    ];

    setCommands(commandsList);
  }, [asciiArt, helpContent, currentTheme]);

  return { commands, welcomeMessage };
};

export default useTerminalCommands;
