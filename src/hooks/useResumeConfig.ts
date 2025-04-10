
import { useState, useEffect } from 'react';

interface ResumeConfig {
  resumeUrl: string;
  setResumeUrl: (url: string) => void;
}

/**
 * Custom hook for managing the resume URL
 * This allows the resume URL to be set from anywhere in the application
 */
const useResumeConfig = (): ResumeConfig => {
  // Get the URL from localStorage or use a default
  const [resumeUrl, setResumeUrlState] = useState<string>(
    localStorage.getItem('resumeUrl') || 'https://drive.google.com/your-resume-link-here'
  );

  // Update localStorage when the URL changes
  const setResumeUrl = (url: string) => {
    localStorage.setItem('resumeUrl', url);
    setResumeUrlState(url);
  };

  return { resumeUrl, setResumeUrl };
};

export default useResumeConfig;
