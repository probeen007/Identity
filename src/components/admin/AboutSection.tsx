
import React, { useState } from 'react';
import { Edit, User, Upload } from 'lucide-react';
import { About } from '@/types';

interface AboutSectionProps {
  about: About | null;
  onEdit: (type: 'about', id: string) => void;
}

const AboutSection = ({ about, onEdit }: AboutSectionProps) => {
  return (
    <div className="bg-hacker-light p-4 rounded border border-terminal-accent mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">About Information</h3>
        {about && (
          <button 
            onClick={() => onEdit('about', 'about')}
            className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 flex items-center space-x-1"
          >
            <Edit size={14} />
            <span>Edit</span>
          </button>
        )}
      </div>
      
      {about ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center md:items-start">
            {about.profileImageUrl ? (
              <div className="mb-3 w-32 h-32 rounded-full overflow-hidden border-2 border-terminal-accent">
                <img 
                  src={about.profileImageUrl} 
                  alt={about.name}
                  className="w-full h-full object-cover" 
                />
              </div>
            ) : (
              <div className="mb-3 w-32 h-32 rounded-full flex items-center justify-center bg-hacker-dark border-2 border-terminal-accent">
                <User size={48} className="text-terminal-accent opacity-50" />
              </div>
            )}
          </div>
          <div>
            <div>
              <p className="text-terminal-muted">Name:</p>
              <p className="text-lg font-bold">{about.name}</p>
            </div>
            <div className="mt-2">
              <p className="text-terminal-muted">Title:</p>
              <p>{about.title}</p>
            </div>
          </div>
          <div>
            <p className="text-terminal-muted">Location:</p>
            <p>{about.location}</p>
          </div>
          <div>
            <p className="text-terminal-muted">Email:</p>
            <p>{about.email}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-terminal-muted">Bio:</p>
            <p>{about.bio}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-terminal-muted">Social Links:</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {about.socialLinks.github && (
                <a href={about.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-terminal-accent hover:underline">GitHub</a>
              )}
              {about.socialLinks.linkedin && (
                <a href={about.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-terminal-accent hover:underline">LinkedIn</a>
              )}
              {about.socialLinks.twitter && (
                <a href={about.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-terminal-accent hover:underline">Twitter</a>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-terminal-muted">Loading about information...</p>
      )}
    </div>
  );
};

export default AboutSection;
