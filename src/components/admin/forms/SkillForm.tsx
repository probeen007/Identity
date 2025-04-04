
import React from 'react';

interface SkillFormProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
  isEditing: boolean;
}

const SkillForm = ({
  formData,
  onInputChange,
  onSave,
  onCancel,
  loading,
  isEditing
}: SkillFormProps) => {
  return (
    <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
      <h3 className="text-lg font-bold mb-4">
        {isEditing ? 'Edit Skill' : 'Add New Skill'}
      </h3>
      <div className="space-y-4">
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
          <label className="block text-terminal-foreground mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category || ''}
            onChange={onInputChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
          />
        </div>
        <div>
          <label className="block text-terminal-foreground mb-1">Level (0-100): {formData.level || 0}</label>
          <input
            type="range"
            name="level"
            min="0"
            max="100"
            value={formData.level || 0}
            onChange={onInputChange}
            className="w-full"
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

export default SkillForm;
