
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
    <div className="bg-white/90 dark:bg-gray-800 p-4 rounded-lg shadow-md border border-terminal-accent">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
        {isEditing ? 'Edit Fun Fact' : 'Add New Fun Fact'}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-800 dark:text-gray-200 mb-1 font-medium">Text</label>
          <textarea
            name="text"
            value={formData.text || ''}
            onChange={onInputChange}
            className="w-full p-2 bg-gray-100 text-gray-900 border border-terminal-accent/70 rounded focus:ring-2 focus:ring-terminal-accent focus:outline-none"
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
            className="flex-1 p-2 bg-gray-200 text-gray-800 border border-gray-300 rounded hover:bg-opacity-90 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FunFactForm;
