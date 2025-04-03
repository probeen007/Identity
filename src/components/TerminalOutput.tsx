
import React from 'react';
import { motion } from 'framer-motion';
import { CommandOutput } from '@/types';
import { ExternalLink } from 'lucide-react';

interface TerminalOutputProps {
  output: CommandOutput;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  const getOutputClassName = () => {
    switch (output.type) {
      case 'error':
        return 'text-terminal-error font-bold';
      case 'success':
        return 'text-terminal-success';
      case 'warning':
        return 'text-terminal-warning';
      case 'info':
        return 'text-terminal-info';
      case 'ascii':
        return 'text-terminal-accent whitespace-pre font-mono';
      default:
        return 'text-terminal-foreground';
    }
  };

  // Function to detect and make URLs clickable
  const makeLinksClickable = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    const parts = text.split(urlRegex);
    const matches = text.match(urlRegex) || [];
    
    return parts.reduce((arr, part, i) => {
      arr.push(part);
      if (matches[i]) {
        arr.push(
          <a 
            key={`link-${i}`}
            href={matches[i]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-terminal-accent underline hover:text-terminal-accent/80 inline-flex items-center gap-1"
          >
            {matches[i]}
            <ExternalLink size={12} />
          </a>
        );
      }
      return arr;
    }, [] as React.ReactNode[]);
  };

  // Function to detect if content contains project, certificate or other structured data
  const renderStructuredContent = (content: string) => {
    // Check if this is a project listing
    if (content.includes('# ') && content.includes('Technologies:')) {
      const projects = content.split('\n\n').filter(p => p.trim().startsWith('#'));
      
      return (
        <div className="grid grid-cols-1 gap-4 mt-2">
          {projects.map((project, index) => {
            const lines = project.split('\n');
            const title = lines[0].replace('# ', '');
            const description = lines[1];
            const technologies = lines.find(l => l.includes('Technologies:'))?.replace('Technologies: ', '') || '';
            const githubUrl = lines.find(l => l.includes('GitHub:'))?.replace('GitHub: ', '') || '';
            const demoUrl = lines.find(l => l.includes('Demo:'))?.replace('Demo: ', '') || '';
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-terminal-accent/30 rounded-md p-3 bg-terminal-accent/5 hover:bg-terminal-accent/10 transition-colors"
              >
                <h3 className="text-terminal-accent font-bold text-lg">{title}</h3>
                <p className="my-2">{description}</p>
                <div className="flex flex-wrap gap-2 my-2">
                  {technologies.split(', ').map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-terminal-accent/20 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-3">
                  {githubUrl && (
                    <a 
                      href={githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-terminal-accent underline hover:text-terminal-accent/80 inline-flex items-center gap-1 text-sm"
                    >
                      GitHub <ExternalLink size={12} />
                    </a>
                  )}
                  {demoUrl && (
                    <a 
                      href={demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-terminal-accent underline hover:text-terminal-accent/80 inline-flex items-center gap-1 text-sm"
                    >
                      Live Demo <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      );
    }
    
    // Check if this is a certificates listing
    if (content.includes('- ') && content.includes('URL:')) {
      const certificates = content.split('\n\n').filter(c => c.trim().startsWith('-'));
      
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {certificates.map((cert, index) => {
            const lines = cert.split('\n');
            const titleLine = lines[0].replace('- ', '');
            const title = titleLine.split(' (')[0];
            const issuerAndDate = titleLine.split(' (')[1]?.replace(')', '') || '';
            const [issuer, date] = issuerAndDate.split(', ');
            const url = lines[1]?.trim().replace('URL: ', '') || '';
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-terminal-accent/30 rounded-md p-3 bg-terminal-accent/5 hover:bg-terminal-accent/10 transition-colors"
              >
                <div className="flex items-center mb-2">
                  <div className="h-10 w-10 rounded-full bg-terminal-accent/20 flex items-center justify-center text-terminal-accent mr-3">
                    🎓
                  </div>
                  <div>
                    <h3 className="text-terminal-accent font-bold">{title}</h3>
                    <div className="text-sm opacity-80">{issuer}, {date}</div>
                  </div>
                </div>
                {url && (
                  <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-terminal-accent underline hover:text-terminal-accent/80 inline-flex items-center gap-1 text-sm mt-2"
                  >
                    View Certificate <ExternalLink size={12} />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      );
    }
    
    // Check if this is a skill listing
    if (content.includes('## ') && content.includes('█')) {
      const categories = content.split('\n\n').filter(s => s.trim().startsWith('##'));
      
      return (
        <div className="grid grid-cols-1 gap-4 mt-2">
          {categories.map((category, index) => {
            const lines = category.split('\n');
            const categoryName = lines[0].replace('## ', '');
            const skills = lines.slice(1).filter(s => s.trim().startsWith('-'));
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-terminal-accent/30 rounded-md p-3 bg-terminal-accent/5"
              >
                <h3 className="text-terminal-accent font-bold mb-2">{categoryName}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {skills.map((skill, i) => {
                    const [name, level] = skill.replace('- ', '').split(' ');
                    const levelCount = level.length;
                    
                    return (
                      <div key={i} className="mb-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{name}</span>
                          <span>{Math.floor(levelCount * 10)}%</span>
                        </div>
                        <div className="w-full bg-terminal-accent/10 rounded-full h-2">
                          <div 
                            className="bg-terminal-accent h-2 rounded-full" 
                            style={{ width: `${levelCount * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      );
    }
    
    // Check if this is an experience listing
    if (content.includes('## ') && content.includes('Duration:')) {
      const experiences = content.split('\n\n').filter(e => e.trim().startsWith('##'));
      
      return (
        <div className="mt-2 space-y-4">
          {experiences.map((exp, index) => {
            const lines = exp.split('\n');
            const titleLine = lines[0].replace('## ', '');
            const [position, company] = titleLine.split(' at ');
            const duration = lines[1].replace('Duration: ', '');
            const description = lines.slice(3).join('\n');
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative pl-4 border-l-2 border-terminal-accent/50 hover:border-terminal-accent transition-colors"
              >
                <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-terminal-accent"></div>
                <h3 className="text-terminal-accent font-bold">{position}</h3>
                <div className="flex justify-between my-1 text-sm">
                  <span className="opacity-80">{company}</span>
                  <span className="opacity-70">{duration}</span>
                </div>
                <p className="mt-2 text-sm">{description}</p>
              </motion.div>
            );
          })}
        </div>
      );
    }
    
    // For recommendations
    if (content.includes('"') && content.includes('—')) {
      const recommendations = content.split('\n\n').filter(r => r.trim().startsWith('"'));
      
      return (
        <div className="grid grid-cols-1 gap-4 mt-2">
          {recommendations.map((rec, index) => {
            const parts = rec.split('\n');
            const quote = parts[0].replace(/^"|"$/g, '').trim();
            const attribution = parts[1].substring(2).trim(); // Remove the "— " prefix
            const [name, position] = attribution.split(', ');
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-terminal-accent/30 rounded-md p-4 bg-terminal-accent/5 relative"
              >
                <div className="text-4xl absolute -top-2 left-2 text-terminal-accent/40">"</div>
                <p className="italic text-sm mt-2 mb-3">{quote}</p>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-terminal-accent/20 flex items-center justify-center text-terminal-accent mr-3">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-terminal-accent">{name}</div>
                    <div className="text-xs opacity-80">{position}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      );
    }
    
    // If it's contact info with URLs
    if (content.includes('Email:') && (content.includes('GitHub:') || content.includes('LinkedIn:'))) {
      const lines = content.trim().split('\n').filter(line => line.trim());
      
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {lines.map((line, index) => {
            if (!line.includes(':')) return null;
            
            const [platform, value] = line.split(':').map(s => s.trim());
            let icon = '💬';
            
            if (platform.toLowerCase().includes('email')) icon = '📧';
            if (platform.toLowerCase().includes('github')) icon = '💻';
            if (platform.toLowerCase().includes('linkedin')) icon = '🔗';
            if (platform.toLowerCase().includes('twitter')) icon = '🐦';
            if (platform.toLowerCase().includes('website')) icon = '🌐';
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="flex items-center gap-3 p-2 rounded hover:bg-terminal-accent/10"
              >
                <div className="h-8 w-8 rounded-full bg-terminal-accent/20 flex items-center justify-center">
                  {icon}
                </div>
                <div>
                  <div className="text-xs opacity-70">{platform}</div>
                  {value.startsWith('http') ? (
                    <a 
                      href={value} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-terminal-accent hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    platform.toLowerCase() === 'email' ? (
                      <a 
                        href={`mailto:${value}`}
                        className="text-terminal-accent hover:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <span>{value}</span>
                    )
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      );
    }
    
    // For regular text content with potential links
    const lines = content.split('\n');
    return lines.map((line, index) => (
      <motion.div 
        key={index}
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: index * 0.03 }}
        className="line py-0.5"
      >
        {line ? makeLinksClickable(line) : ' '}
      </motion.div>
    ));
  };

  const renderContent = () => {
    if (typeof output.content === 'string') {
      if (output.type === 'ascii') {
        return <pre className="overflow-x-auto">{output.content}</pre>;
      }
      
      // Process and render the structured content
      return renderStructuredContent(output.content);
    }
    return output.content;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`my-2 px-1 rounded ${getOutputClassName()} ${output.type === 'error' ? 'bg-red-900/20' : ''} ${output.type === 'success' ? 'bg-green-900/10' : ''} ${output.type === 'warning' ? 'bg-yellow-900/10' : ''}`}
    >
      <div className="terminal-output-content">
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default TerminalOutput;
