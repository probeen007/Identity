
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
    localStorage.getItem('resumeUrl') || 'https://docs.google.com/document/d/12t-eR2v7yJVQYiiL45JYx5_WG_ugjooze4JXllhZTOs/edit?usp=sharing'
  );

  // Update localStorage when the URL changes
  const setResumeUrl = (url: string) => {
    localStorage.setItem('resumeUrl', url);
    setResumeUrlState(url);
  };

  return { resumeUrl, setResumeUrl };
};

export default useResumeConfig;
