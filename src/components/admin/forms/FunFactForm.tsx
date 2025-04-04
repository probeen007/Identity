
import React from 'react';

interface FunFactFormProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
  isEditing: boolean;
}

const FunFactForm = ({
  formData,
  onInputChange,
  onSave,
  onCancel,
  loading,
  isEditing
}: FunFactFormProps) => {
  return (
    <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
      <h3 className="text-lg font-bold mb-4">
        {isEditing ? 'Edit Fun Fact' : 'Add New Fun Fact'}
      </h3>
      <div className="space-y-4">
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

export default FunFactForm;
