
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import useResumeConfig from '@/hooks/useResumeConfig';

interface ResumeSettingsProps {
  isVisible: boolean;
}

const ResumeSettings: React.FC<ResumeSettingsProps> = ({ isVisible }) => {
  const { resumeUrl, setResumeUrl } = useResumeConfig();
  const [inputUrl, setInputUrl] = useState(resumeUrl);

  const handleSave = () => {
    if (inputUrl.trim() === '') {
      toast.error('Please enter a valid URL');
      return;
    }

    setResumeUrl(inputUrl);
    toast.success('Resume URL has been updated');
  };

  if (!isVisible) return null;

  return (
    <div className="p-4 bg-hacker-light border border-terminal-accent rounded-md mt-4">
      <h2 className="text-terminal-accent font-bold mb-2 flex items-center">
        <Link className="w-4 h-4 mr-2" /> Resume Settings
      </h2>
      <p className="text-terminal-muted text-sm mb-3">
        Set the URL to your resume (Google Drive, Dropbox, etc.)
      </p>
      
      <div className="flex space-x-2">
        <Input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter resume URL"
          className="flex-1 bg-hacker-dark border-terminal-accent text-terminal-foreground"
        />
        <Button 
          onClick={handleSave}
          variant="default"
          className="bg-terminal-accent text-terminal-background hover:bg-terminal-accent/80"
        >
          Save
        </Button>
      </div>
      
      <div className="mt-2 text-xs">
        <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-terminal-accent hover:underline flex items-center">
          <ExternalLink className="w-3 h-3 mr-1" /> Current resume link
        </a>
      </div>
    </div>
  );
};

export default ResumeSettings;
