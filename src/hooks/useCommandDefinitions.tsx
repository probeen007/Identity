import React from 'react';
import { Command } from '@/types';
import { NavigateFunction } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import {
  getAbout,
  getProjects,
  getSkills,
  getExperiences,
  getCertificates,
  getRecommendations,
  getFunFact,
  getHelpContent,
  downloadResume,
  setTheme
} from '@/services/dataService';
import { matrixEffectEvent } from './useMatrixEffect';

const useCommandDefinitions = (
  currentTheme: string, 
  setCurrentTheme: (theme: string) => void, 
  applyTheme: (theme: string) => void, 
  resumeUrl: string,
  navigate: NavigateFunction
) => {
  const commandsList: Command[] = [
    {
      command: 'about',
      description: 'Display information about me',
      handler: async () => {
        const about = await getAbout();
        return {
          type: 'profile',
          content: (
            <div className="bg-hacker-light p-4 rounded-md border border-terminal-accent mb-2">
              <h2 className="text-lg font-bold text-terminal-accent mb-2">{about.name}</h2>
              <p className="text-terminal-foreground mb-2">
                <span className="text-terminal-info">{about.title}</span> • {about.location}
              </p>
              <p className="mb-4">{about.bio}</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-terminal-muted">Email:</p>
                  <p>
                    <a href={`mailto:${about.email}`} className="text-terminal-accent hover:underline">
                      {about.email}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="text-terminal-muted">Connect:</p>
                  <div className="flex space-x-2">
                    {about.socialLinks.github && (
                      <a href={about.socialLinks.github} target="_blank" className="text-terminal-accent hover:underline">
                        GitHub
                      </a>
                    )}
                    {about.socialLinks.linkedin && (
                      <a href={about.socialLinks.linkedin} target="_blank" className="text-terminal-accent hover:underline">
                        LinkedIn
                      </a>
                    )}
                    {about.socialLinks.twitter && (
                      <a href={about.socialLinks.twitter} target="_blank" className="text-terminal-accent hover:underline">
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
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
          content: (
            <div>
              {projects.map((project, index) => (
                <div key={index} className="bg-hacker-light p-4 rounded-md border border-terminal-accent mb-2">
                  <h2 className="text-lg font-bold text-terminal-accent">{project.title}</h2>
                  <p className="mb-2">{project.description}</p>
                  <div className="mb-2">
                    <span className="text-terminal-muted">Technologies: </span>
                    <span className="text-terminal-info">{project.technologies.join(', ')}</span>
                  </div>
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" className="text-terminal-accent hover:underline">GitHub</a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" className="text-terminal-accent hover:underline">Demo</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )
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
          content: (
            <div>
              {categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-4">
                  <h2 className="text-lg font-bold text-terminal-accent mb-2">{category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {skills
                      .filter(s => s.category === category)
                      .map((skill, skillIndex) => (
                        <div key={skillIndex} className="bg-hacker-light p-2 rounded-md border border-terminal-accent">
                          <div className="flex justify-between items-center mb-1">
                            <span>{skill.name}</span>
                            <span className="text-xs text-terminal-muted">{skill.level}/100</span>
                          </div>
                          <div className="w-full bg-hacker-dark rounded-full h-2 overflow-hidden">
                            <div className="bg-terminal-accent h-full" style={{ width: `${skill.level}%` }}></div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )
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
          content: (
            <div>
              {experiences.map((exp, index) => (
                <div key={index} className="bg-hacker-light p-4 rounded-md border border-terminal-accent mb-2">
                  <h2 className="text-lg font-bold text-terminal-accent">{exp.position}</h2>
                  <p className="text-terminal-info mb-1">{exp.company}</p>
                  <p className="text-terminal-muted mb-2">{exp.duration}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          )
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
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {certificates.map((cert, index) => (
                <div key={index} className="bg-hacker-light p-4 rounded-md border border-terminal-accent">
                  <h3 className="font-bold text-terminal-accent">{cert.title}</h3>
                  <p className="text-terminal-muted">{cert.issuer}, {cert.date}</p>
                  {cert.url && (
                    <a href={cert.url} target="_blank" className="text-terminal-accent hover:underline mt-1 inline-block">
                      View Certificate
                    </a>
                  )}
                </div>
              ))}
            </div>
          )
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
          content: (
            <div>
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-hacker-light p-4 rounded-md border border-terminal-accent mb-2">
                  <p className="italic mb-2">"{rec.text}"</p>
                  <div className="text-right">
                    <p className="font-bold text-terminal-accent">{rec.name}</p>
                    <p className="text-terminal-muted text-sm">{rec.position} at {rec.company}</p>
                  </div>
                </div>
              ))}
            </div>
          )
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
          content: (
            <div className="bg-hacker-light p-4 rounded-md border border-terminal-accent">
              <div className="font-mono text-xs mb-4">
                <p className="text-terminal-accent">$ wget resume.pdf</p>
                <p className="text-terminal-info">Connecting to server...</p>
                <p className="text-terminal-info">Downloading resume.pdf...</p>
                <p className="text-terminal-success">Download complete!</p>
              </div>
              <p className="text-terminal-success mb-2">{message}</p>
              <p>Your browser should start downloading the resume file shortly.</p>
              <p className="text-terminal-muted text-sm mt-2">
                If the download doesn't start automatically, 
                <a href={resumeUrl} className="text-terminal-accent hover:underline ml-1" target="_blank" onClick={(e) => {
                  e.preventDefault();
                  window.downloadResume();
                }}>
                  click here
                </a>.
              </p>
            </div>
          )
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
          content: (
            <div className="bg-hacker-light p-4 rounded-md border border-terminal-accent">
              <h2 className="text-lg font-bold text-terminal-accent mb-2">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-terminal-muted">Email:</p>
                  <p>
                    <a href={`mailto:${about.email}`} className="text-terminal-accent hover:underline">
                      {about.email}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="text-terminal-muted">Connect:</p>
                  <div className="flex flex-col space-y-1">
                    {about.socialLinks.github && (
                      <a href={about.socialLinks.github} target="_blank" className="text-terminal-accent hover:underline">
                        GitHub
                      </a>
                    )}
                    {about.socialLinks.linkedin && (
                      <a href={about.socialLinks.linkedin} target="_blank" className="text-terminal-accent hover:underline">
                        LinkedIn
                      </a>
                    )}
                    {about.socialLinks.twitter && (
                      <a href={about.socialLinks.twitter} target="_blank" className="text-terminal-accent hover:underline">
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
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
          content: (
            <div className="bg-hacker-light p-4 rounded-md border border-terminal-accent">
              <p className="text-terminal-accent font-bold mb-1">Did you know?</p>
              <p>{fact.text}</p>
          </div>
        )
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
          content: (
            <div className="bg-hacker-light p-4 rounded-md border border-terminal-accent">
              <p className="mb-2">Current theme: <span className="text-terminal-accent font-bold">{currentTheme}</span></p>
              <p className="mb-1">Usage: <span className="text-terminal-info">theme [light|dark|hacker]</span></p>
              <p>Available themes:</p>
              <ul className="list-disc pl-5 mt-1">
                <li><span className="text-terminal-accent">light</span> - Light theme with dark text</li>
                <li><span className="text-terminal-accent">dark</span> - Dark theme with light text</li>
                <li><span className="text-terminal-accent">hacker</span> - Hacker theme with green text</li>
              </ul>
            </div>
          )
        };
      }
      
      const theme = args[0].toLowerCase();
      if (!['light', 'dark', 'hacker'].includes(theme)) {
        return {
          type: 'error',
          content: (
            <div className="bg-hacker-light p-4 rounded-md border border-terminal-error">
              <p className="text-terminal-error">Invalid theme: {theme}</p>
              <p className="mt-1">Available themes: light, dark, hacker</p>
            </div>
          )
        };
      }
      
      try {
        // Update the theme
        const newTheme = await setTheme(theme);
        setCurrentTheme(newTheme.name);
        
        // Apply the theme to the document
        applyTheme(newTheme.name);
        
        return {
          type: 'success',
          content: (
            <div className="bg-hacker-light p-4 rounded-md border border-terminal-accent">
              <p className="text-terminal-success mb-1">Theme changed to <span className="font-bold">{newTheme.name}</span></p>
              <p>The new theme has been applied to your terminal.</p>
            </div>
          )
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
        content: (
          <div className="bg-hacker-light p-4 rounded-md border border-terminal-accent">
            <h2 className="text-lg font-bold text-terminal-accent mb-3">Available Commands</h2>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {commandsList.map((cmd, index) => (
                <div key={index} className="p-2 hover:bg-hacker-dark transition-colors rounded">
                  <p className="font-bold text-terminal-accent">{cmd.command}</p>
                  <p className="text-sm">{cmd.description}</p>
                  {cmd.usage && <p className="text-xs text-terminal-muted">Usage: {cmd.usage}</p>}
                </div>
              ))}
            </div>
          </div>
        )
      };
    }
  },
  {
    command: 'sudo',
    description: 'Run command with admin privileges',
    handler: async (args) => {
      return {
        type: 'error',
        content: (
          <div className="bg-hacker-light p-4 rounded-md border border-terminal-error">
            <p className="text-terminal-error mb-2 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" /> You are not my admin!
            </p>
            <p className="text-terminal-warning">
              Don't dare to type this command again. This incident will be reported.
            </p>
          </div>
        )
      };
    }
  },
  {
    command: 'matrix',
    description: 'Activate interactive matrix mode',
    usage: 'matrix [speed|density|toggle]',
    handler: async (args) => {
      if (!args || args.length === 0) {
        // Trigger matrix effect
        matrixEffectEvent.dispatchEvent(new CustomEvent('matrixActivate', { 
          detail: { fullscreen: true }
        }));
        
        return {
          type: 'success',
          content: (
            <div className="bg-hacker-light p-4 rounded-md border border-terminal-accent">
              <p className="text-terminal-success mb-3">Matrix mode activated. There is no spoon.</p>
              <div className="mt-2 flex flex-col gap-2">
                <p className="text-terminal-info">Available subcommands:</p>
                <ul className="list-disc pl-5">
                  <li><span className="text-terminal-accent">matrix speed [number]</span> - Set animation speed (lower = faster)</li>
                  <li><span className="text-terminal-accent">matrix density [number]</span> - Set character density</li>
                  <li><span className="text-terminal-accent">matrix toggle</span> - Toggle matrix background on/off</li>
                </ul>
                <p className="text-terminal-muted mt-2">Try moving your mouse over the matrix background!</p>
              </div>
            </div>
          )
        };
      }
      
      const subCommand = args[0].toLowerCase();
      
      if (subCommand === 'speed' && args.length > 1) {
        const speedValue = parseInt(args[1]);
        if (!isNaN(speedValue) && speedValue > 0) {
          matrixEffectEvent.dispatchEvent(new CustomEvent('matrixSpeed', { 
            detail: { speed: speedValue }
          }));
          return {
            type: 'success',
            content: `Matrix animation speed set to ${speedValue}ms`
          };
        }
        return {
          type: 'error',
          content: 'Invalid speed value. Please use a positive number.'
        };
      }
      
      if (subCommand === 'density' && args.length > 1) {
        const densityValue = parseInt(args[1]);
        if (!isNaN(densityValue) && densityValue > 0) {
          matrixEffectEvent.dispatchEvent(new CustomEvent('matrixDensity', { 
            detail: { density: densityValue }
          }));
          return {
            type: 'success',
            content: `Matrix character density set to ${densityValue}`
          };
        }
        return {
          type: 'error',
          content: 'Invalid density value. Please use a positive number.'
        };
      }
      
      if (subCommand === 'toggle') {
        matrixEffectEvent.dispatchEvent(new CustomEvent('matrixToggle'));
        return {
          type: 'success',
          content: 'Matrix background toggled'
        };
      }
      
      return {
        type: 'error',
        content: `Unknown matrix subcommand: ${subCommand}. Try 'matrix' without arguments for help.`
      };
    }
  },
  {
    command: 'hack',
    description: 'Hack the mainframe',
    usage: 'hack [target]',
    handler: async (args) => {
      const target = args?.length > 0 ? args[0].toLowerCase() : 'mainframe';
      const hackMessages: Record<string, string[]> = {
        'mainframe': [
          'Initializing hack sequence...',
          'Bypassing firewall protocols...',
          'Searching for vulnerabilities in the mainframe...',
          'Planting backdoor access...',
          'WARNING: Intrusion detected!',
          'Deploying countermeasures...',
          'Security protocols engaged',
          'Trace initiated',
          'Connection terminated'
        ],
        'pentagon': [
          'Targeting Pentagon systems...',
          'Bypassing military-grade encryption...',
          'Accessing classified documents...',
          'WARNING: ADVANCED SECURITY DETECTED',
          'Multiple firewalls activated',
          'Deploying stealth protocols...',
          'Evading detection algorithms...',
          'CRITICAL: Access denied',
          'Emergency shutdown initiated',
          'System lockdown. Exiting.'
        ],
        'nasa': [
          'Targeting NASA network...',
          'Bypassing satellite security...',
          'Accessing space station controls...',
          'Downloading cosmic data...',
          'WARNING: Alien signatures detected',
          'Unknown encryption encountered',
          'Unusual patterns detected',
          'ALERT: NASA security alerted',
          'System locked. Connection lost.'
        ],
        'matrix': [
          'Initializing redpill sequence...',
          'Searching for glitches in the Matrix...',
          'Contacting Morpheus...',
          'WARNING: Agents detected',
          'Running from Agent Smith...',
          'Dodging bullets in slow motion...',
          'Finding the nearest exit...',
          'Connection terminated. Wake up, Neo.'
        ]
      };
      
      // Set default messages if target isn't recognized
      const messages = hackMessages[target] || hackMessages.mainframe;
      
      // Add some visual effects during the hack
      setTimeout(() => {
        matrixEffectEvent.dispatchEvent(new CustomEvent('matrixActivate', { 
          detail: { fullscreen: true, duration: 5000 }
        }));
      }, 1000);

      return {
        type: 'warning',
        content: (
          <div className="bg-hacker-light p-4 rounded-md border border-terminal-warning">
            <p className="text-terminal-warning mb-2">ALERT: Unauthorized access detected for target: {target}</p>
            <div className="hack-animation p-2 font-mono text-xs overflow-hidden h-28">
              <div className="hack-text-interactive">
                {messages.map((msg, index) => (
                  <div key={index} className="hack-line" style={{ animationDelay: `${index * 0.7}s` }}>
                    $ {msg}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-terminal-muted mt-2 text-xs">Try hacking other targets: pentagon, nasa, matrix</p>
          </div>
        )
      };
    }
  },
  {
    command: 'admin',
    description: 'Go to admin dashboard',
    handler: async () => {
      // Use setTimeout to show message before redirecting
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
      
      return {
        type: 'warning',
        content: (
          <div className="bg-hacker-light p-4 rounded-md border border-terminal-warning">
            <p className="mb-2 text-terminal-warning">WARNING: Unauthorized access attempt detected!</p>
            <p className="text-terminal-info">Redirecting to admin portal...</p>
            <div className="loading-bar mt-2 h-1 bg-terminal-muted overflow-hidden">
              <div className="h-full bg-terminal-warning animate-pulse"></div>
            </div>
          </div>
        )
      };
    }
  }
];

  return commandsList;
};

export default useCommandDefinitions;
