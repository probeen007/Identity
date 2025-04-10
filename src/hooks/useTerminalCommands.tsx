import React, { useState, useEffect } from 'react';
import { Command } from '@/types';
import { useNavigate } from 'react-router-dom';
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

  // Function to apply theme to the document
  const applyTheme = (themeName: string) => {
    document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-hacker');
    document.documentElement.classList.add(`theme-${themeName}`);
    localStorage.setItem('portfolio-theme', themeName);
    console.log(`Theme applied: ${themeName}`);
  };

  // Helper function to create React elements from HTML strings
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };
  
  // Add the navigate hook
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const art = await getAsciiArt();
      const help = await getHelpContent();
      const theme = await getTheme();
      
      setAsciiArt(art);
      setHelpContent(help);
      
      // Apply the theme from local storage or default
      const savedTheme = localStorage.getItem('portfolio-theme') || theme.name;
      applyTheme(savedTheme);
      setCurrentTheme(savedTheme);
      
      setWelcomeMessage(`${art}\n\nWelcome to the terminal portfolio!\nType 'help' to see available commands.`);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!asciiArt || !helpContent) return;

    // Add global window function for resume download
    window.downloadResume = async (resumeUrl) => {
      try {
        // If a URL is provided, open it in a new tab
        if (resumeUrl) {
          window.open(resumeUrl, '_blank');
        }
        const message = await downloadResume();
        console.log("Resume download initiated:", message);
      } catch (error) {
        console.error("Error downloading resume:", error);
      }
    };

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
          // You can replace this URL with your actual Google Drive resume link
          const resumeUrl = "https://drive.google.com/your-resume-link-here";
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
                    window.downloadResume(resumeUrl);
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
            ) as React.ReactNode
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
                <h2 className="text-lg font-bold text-terminal-accent mb-2">Available Commands</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {commands.map((cmd, index) => (
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
        description: 'Activate matrix mode',
        handler: async () => {
          return {
            type: 'success',
            content: (
              <div className="bg-hacker-light p-4 rounded-md border border-terminal-accent">
                <p className="text-terminal-success">Matrix mode activated. There is no spoon.</p>
                <div className="mt-2 flex justify-center">
                  <div className="terminal-matrix-animation h-20 w-full overflow-hidden relative">
                    <div className="absolute inset-0 matrix-code-rain"></div>
                  </div>
                </div>
              </div>
            )
          };
        }
      },
      {
        command: 'hack',
        description: 'Hack the mainframe',
        handler: async () => {
          return {
            type: 'warning',
            content: (
              <div className="bg-hacker-light p-4 rounded-md border border-terminal-warning">
                <p className="text-terminal-warning mb-2">ALERT: Unauthorized access detected. Initiating countermeasures...</p>
                <div className="hack-animation p-2 font-mono text-xs overflow-hidden h-20">
                  <div className="hack-text">
                    $ initiating hack sequence...<br />
                    $ bypassing firewall...<br />
                    $ searching for vulnerabilities...<br />
                    $ accessing mainframe...<br />
                    $ WARNING: intrusion detected!<br />
                    $ security protocols engaged<br />
                    $ trace initiated<br />
                    $ connection terminated
                  </div>
                </div>
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

    setCommands(commandsList);
  }, [asciiArt, helpContent, currentTheme, navigate]);

  return { commands, welcomeMessage };
};

export default useTerminalCommands;
