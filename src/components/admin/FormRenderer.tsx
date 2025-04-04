
import React from 'react';
import ProjectForm from './forms/ProjectForm';
import SkillForm from './forms/SkillForm';
import ExperienceForm from './forms/ExperienceForm';
import CertificateForm from './forms/CertificateForm';
import RecommendationForm from './forms/RecommendationForm';
import FunFactForm from './forms/FunFactForm';
import AboutForm from './forms/AboutForm';

interface FormRendererProps {
  editMode: {
    type: 'project' | 'skill' | 'experience' | 'certificate' | 'recommendation' | 'funfact' | 'about';
    id: string | null;
  } | null;
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onArrayInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
  onSocialLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
  imagePreview: string | null;
}

const FormRenderer = ({
  editMode,
  formData,
  onInputChange,
  onArrayInputChange,
  onSocialLinkChange,
  onFileChange,
  onSave,
  onCancel,
  loading,
  imagePreview
}: FormRendererProps) => {
  if (!editMode) return null;
  
  const isEditing = Boolean(editMode.id);
  
  switch (editMode.type) {
    case 'project':
      return (
        <ProjectForm 
          formData={formData}
          onInputChange={onInputChange}
          onArrayInputChange={onArrayInputChange}
          onSave={onSave}
          onCancel={onCancel}
          loading={loading}
          isEditing={isEditing}
        />
      );
      
    case 'skill':
      return (
        <SkillForm 
          formData={formData}
          onInputChange={onInputChange}
          onSave={onSave}
          onCancel={onCancel}
          loading={loading}
          isEditing={isEditing}
        />
      );
      
    case 'experience':
      return (
        <ExperienceForm 
          formData={formData}
          onInputChange={onInputChange}
          onSave={onSave}
          onCancel={onCancel}
          loading={loading}
          isEditing={isEditing}
        />
      );
      
    case 'certificate':
      return (
        <CertificateForm 
          formData={formData}
          onInputChange={onInputChange}
          onSave={onSave}
          onCancel={onCancel}
          loading={loading}
          isEditing={isEditing}
        />
      );
      
    case 'recommendation':
      return (
        <RecommendationForm 
          formData={formData}
          onInputChange={onInputChange}
          onSave={onSave}
          onCancel={onCancel}
          loading={loading}
          isEditing={isEditing}
        />
      );
      
    case 'funfact':
      return (
        <FunFactForm 
          formData={formData}
          onInputChange={onInputChange}
          onSave={onSave}
          onCancel={onCancel}
          loading={loading}
          isEditing={isEditing}
        />
      );
      
    case 'about':
      return (
        <AboutForm 
          formData={formData}
          onInputChange={onInputChange}
          onSocialLinkChange={onSocialLinkChange}
          onFileChange={onFileChange}
          onSave={onSave}
          onCancel={onCancel}
          loading={loading}
          imagePreview={imagePreview}
        />
      );
      
    default:
      return null;
  }
};

export default FormRenderer;
