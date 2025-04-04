
import React, { useState } from 'react';
import { User, Upload } from 'lucide-react';
import { About } from '@/types';

interface AboutFormProps {
  formData: Partial<About>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSocialLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
  imagePreview: string | null;
}

const AboutForm = ({
  formData,
  onInputChange,
  onSocialLinkChange,
  onFileChange,
  onSave,
  onCancel,
  loading,
  imagePreview
}: AboutFormProps) => {
  return (
    <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
      <h3 className="text-lg font-bold mb-4">Edit About Information</h3>
      <div className="space-y-4">
        <div className="flex flex-col items-center mb-4">
          <div className="mb-2 w-32 h-32 rounded-full overflow-hidden border-2 border-terminal-accent bg-hacker-dark">
            {(imagePreview || formData.profileImageUrl) ? (
              <img 
                src={imagePreview || formData.profileImageUrl} 
                alt="Profile Preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User size={48} className="text-terminal-accent opacity-50" />
              </div>
            )}
          </div>
          <label className="cursor-pointer p-2 mt-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 flex items-center space-x-1">
            <Upload size={14} />
            <span>Upload Image</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={onFileChange}
            />
          </label>
        </div>

        <div>
          <label className="block text-terminal-foreground mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={onInputChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
          />
        </div>
        <div>
          <label className="block text-terminal-foreground mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title || ''}
            onChange={onInputChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
          />
        </div>
        
        <div>
          <label className="block text-terminal-foreground mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location || ''}
            onChange={onInputChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
          />
        </div>
        <div>
          <label className="block text-terminal-foreground mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={onInputChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
          />
        </div>
        <div>
          <label className="block text-terminal-foreground mb-1">Bio</label>
          <textarea
            name="bio"
            value={formData.bio || ''}
            onChange={onInputChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-terminal-foreground mb-1">GitHub URL</label>
          <input
            type="text"
            name="github"
            value={formData.socialLinks?.github || ''}
            onChange={onSocialLinkChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
          />
        </div>
        <div>
          <label className="block text-terminal-foreground mb-1">LinkedIn URL</label>
          <input
            type="text"
            name="linkedin"
            value={formData.socialLinks?.linkedin || ''}
            onChange={onSocialLinkChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
          />
        </div>
        <div>
          <label className="block text-terminal-foreground mb-1">Twitter URL</label>
          <input
            type="text"
            name="twitter"
            value={formData.socialLinks?.twitter || ''}
            onChange={onSocialLinkChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onSave}
            disabled={loading}
            className="flex-1 p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded hover:bg-opacity-90 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutForm;
