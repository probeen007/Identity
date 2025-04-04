
import React from 'react';

interface RecommendationFormProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
  isEditing: boolean;
}

const RecommendationForm = ({
  formData,
  onInputChange,
  onSave,
  onCancel,
  loading,
  isEditing
}: RecommendationFormProps) => {
  return (
    <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
      <h3 className="text-lg font-bold mb-4">
        {isEditing ? 'Edit Recommendation' : 'Add New Recommendation'}
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
          <label className="block text-terminal-foreground mb-1">Position</label>
          <input
            type="text"
            name="position"
            value={formData.position || ''}
            onChange={onInputChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
          />
        </div>
        <div>
          <label className="block text-terminal-foreground mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company || ''}
            onChange={onInputChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
          />
        </div>
        <div>
          <label className="block text-terminal-foreground mb-1">Text</label>
          <textarea
            name="text"
            value={formData.text || ''}
            onChange={onInputChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
            rows={3}
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

export default RecommendationForm;
