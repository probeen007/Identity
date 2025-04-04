
import React from 'react';

interface ProjectFormProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onArrayInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
  isEditing: boolean;
}

const ProjectForm = ({
  formData,
  onInputChange,
  onArrayInputChange,
  onSave,
  onCancel,
  loading,
  isEditing
}: ProjectFormProps) => {
  return (
    <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
      <h3 className="text-lg font-bold mb-4">
        {isEditing ? 'Edit Project' : 'Add New Project'}
      </h3>
      <div className="space-y-4">
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
          <label className="block text-terminal-foreground mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={onInputChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-terminal-foreground mb-1">Technologies (comma-separated)</label>
          <input
            type="text"
            value={(formData.technologies || []).join(', ')}
            onChange={(e) => onArrayInputChange(e, 'technologies')}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
          />
        </div>
        <div>
          <label className="block text-terminal-foreground mb-1">GitHub URL</label>
          <input
            type="text"
            name="githubUrl"
            value={formData.githubUrl || ''}
            onChange={onInputChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
          />
        </div>
        <div>
          <label className="block text-terminal-foreground mb-1">Demo URL</label>
          <input
            type="text"
            name="demoUrl"
            value={formData.demoUrl || ''}
            onChange={onInputChange}
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

export default ProjectForm;
