
import React from 'react';

interface CertificateFormProps {
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
  isEditing: boolean;
}

const CertificateForm = ({
  formData,
  onInputChange,
  onSave,
  onCancel,
  loading,
  isEditing
}: CertificateFormProps) => {
  return (
    <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
      <h3 className="text-lg font-bold mb-4">
        {isEditing ? 'Edit Certificate' : 'Add New Certificate'}
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
          <label className="block text-terminal-foreground mb-1">Issuer</label>
          <input
            type="text"
            name="issuer"
            value={formData.issuer || ''}
            onChange={onInputChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
          />
        </div>
        <div>
          <label className="block text-terminal-foreground mb-1">Date</label>
          <input
            type="text"
            name="date"
            value={formData.date || ''}
            onChange={onInputChange}
            className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
          />
        </div>
        <div>
          <label className="block text-terminal-foreground mb-1">URL</label>
          <input
            type="text"
            name="url"
            value={formData.url || ''}
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

export default CertificateForm;
