
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import AdminLogin from '@/components/admin/AdminLogin';
import ThemeControls from '@/components/admin/ThemeControls';
import AboutSection from '@/components/admin/AboutSection';
import ContentTabs from '@/components/admin/ContentTabs';
import FormRenderer from '@/components/admin/FormRenderer';
import useRealTimeData from '@/hooks/useRealTimeData';
import {
  getProjects,
  updateProject,
  addProject,
  deleteProject,
  getSkills,
  updateSkill,
  addSkill,
  deleteSkill,
  getExperiences,
  updateExperience,
  addExperience,
  deleteExperience,
  getCertificates,
  updateCertificate,
  addCertificate,
  deleteCertificate,
  getRecommendations,
  updateRecommendation,
  addRecommendation,
  deleteRecommendation,
  getAllFunFacts,
  updateFunFact,
  addFunFact,
  deleteFunFact,
  getAbout,
  updateAbout,
  getTheme,
  setTheme
} from '@/services/dataService';
import { 
  Project, 
  Skill, 
  Experience, 
  Certificate, 
  Recommendation,
  FunFact,
  About,
  ThemeConfig
} from '@/types';

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // Content states
  const [about, setAbout] = useState<About | null>(null);
  const [theme, setThemeState] = useState<ThemeConfig | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>('light');
  
  // Use real-time data hooks for collections
  const { data: projects, setData: setProjects, loading: projectsLoading } = 
    useRealTimeData<Project>('projects', [], getProjects);
  
  const { data: skills, setData: setSkills, loading: skillsLoading } = 
    useRealTimeData<Skill>('skills', [], getSkills);
    
  const { data: experiences, setData: setExperiences, loading: experiencesLoading } = 
    useRealTimeData<Experience>('experiences', [], getExperiences);
    
  const { data: certificates, setData: setCertificates, loading: certificatesLoading } = 
    useRealTimeData<Certificate>('certificates', [], getCertificates);
    
  const { data: recommendations, setData: setRecommendations, loading: recommendationsLoading } = 
    useRealTimeData<Recommendation>('recommendations', [], getRecommendations);
    
  const { data: funFacts, setData: setFunFacts, loading: funFactsLoading } = 
    useRealTimeData<FunFact>('funfacts', [], getAllFunFacts);
  
  // Edit states
  const [editMode, setEditMode] = useState<{
    type: 'project' | 'skill' | 'experience' | 'certificate' | 'recommendation' | 'funfact' | 'about';
    id: string | null;
  } | null>(null);
  
  // Form data for editing
  const [formData, setFormData] = useState<any>({});
  
  // Load about data and theme
  useEffect(() => {
    const loadAboutAndTheme = async () => {
      try {
        setLoading(true);
        
        const [aboutData, themeData] = await Promise.all([
          getAbout(),
          getTheme()
        ]);
        
        setAbout(aboutData);
        setThemeState(themeData);
        setCurrentTheme(themeData?.name || 'light');
        
        // Apply theme to document
        document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-hacker');
        document.documentElement.classList.add(`theme-${themeData?.name || 'light'}`);
        
      } catch (error) {
        toast({
          title: "Error loading data",
          description: "There was an error loading the about data.",
          variant: "destructive",
        });
        console.error("Error loading about data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (authenticated) {
      loadAboutAndTheme();
    }
  }, [authenticated, toast]);
  
  // Handle field changes in forms
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle array field changes (like technologies in projects)
  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [field]: value.split(',').map(item => item.trim()) 
    }));
  };
  
  // Handle social links changes in about
  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };
  
  // Set up edit mode for an item
  const startEdit = (type: 'project' | 'skill' | 'experience' | 'certificate' | 'recommendation' | 'funfact' | 'about', id: string) => {
    let itemToEdit;
    
    switch (type) {
      case 'project':
        itemToEdit = projects.find(p => p.id === id);
        break;
      case 'skill':
        itemToEdit = skills.find(s => s.id === id);
        break;
      case 'experience':
        itemToEdit = experiences.find(e => e.id === id);
        break;
      case 'certificate':
        itemToEdit = certificates.find(c => c.id === id);
        break;
      case 'recommendation':
        itemToEdit = recommendations.find(r => r.id === id);
        break;
      case 'funfact':
        itemToEdit = funFacts.find(f => f.id === id);
        break;
      case 'about':
        itemToEdit = about;
        break;
    }
    
    if (itemToEdit) {
      setFormData(itemToEdit);
      setEditMode({ type, id });
    }
  };
  
  // Cancel editing
  const cancelEdit = () => {
    setEditMode(null);
    setFormData({});
  };
  
  // Add profile image handling
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        
        // Update form data with the new image preview
        setFormData(prev => ({
          ...prev,
          profileImageUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save edited item
  const saveEdit = async () => {
    if (!editMode) return;
    
    try {
      setLoading(true);
      
      // Process image if it exists (in a real app, this would upload to cloud storage)
      if (editMode.type === 'about' && imageFile) {
        // In a real app with backend, you would upload the file to a storage service
        // For now, we'll just use the Data URL from the preview
        formData.profileImageUrl = imagePreview;
      }

      switch (editMode.type) {
        case 'project':
          if (editMode.id) {
            await updateProject(editMode.id, formData);
          } else {
            await addProject(formData);
          }
          break;
        case 'skill':
          if (editMode.id) {
            await updateSkill(editMode.id, formData);
          } else {
            await addSkill(formData);
          }
          break;
        case 'experience':
          if (editMode.id) {
            await updateExperience(editMode.id, formData);
          } else {
            await addExperience(formData);
          }
          break;
        case 'certificate':
          if (editMode.id) {
            await updateCertificate(editMode.id, formData);
          } else {
            await addCertificate(formData);
          }
          break;
        case 'recommendation':
          if (editMode.id) {
            await updateRecommendation(editMode.id, formData);
          } else {
            await addRecommendation(formData);
          }
          break;
        case 'funfact':
          if (editMode.id) {
            await updateFunFact(editMode.id, formData);
          } else {
            await addFunFact(formData);
          }
          break;
        case 'about':
          const updatedAbout = await updateAbout(formData);
          setAbout(updatedAbout);
          break;
      }
      
      toast({
        title: "Changes saved",
        description: "Your changes have been saved successfully.",
        variant: "default",
      });
      
      // Reset image states after saving
      if (editMode.type === 'about') {
        setImageFile(null);
      }
      
      cancelEdit();
    } catch (error) {
      toast({
        title: "Error saving changes",
        description: "There was an error saving your changes.",
        variant: "destructive",
      });
      console.error("Error saving changes:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Delete an item
  const deleteItem = async (type: 'project' | 'skill' | 'experience' | 'certificate' | 'recommendation' | 'funfact', id: string) => {
    try {
      setLoading(true);
      
      switch (type) {
        case 'project':
          await deleteProject(id);
          break;
        case 'skill':
          await deleteSkill(id);
          break;
        case 'experience':
          await deleteExperience(id);
          break;
        case 'certificate':
          await deleteCertificate(id);
          break;
        case 'recommendation':
          await deleteRecommendation(id);
          break;
        case 'funfact':
          await deleteFunFact(id);
          break;
      }
      
      toast({
        title: "Item deleted",
        description: "The item has been deleted successfully.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error deleting item",
        description: "There was an error deleting the item.",
        variant: "destructive",
      });
      console.error("Error deleting item:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Start adding a new item
  const startAdd = (type: 'project' | 'skill' | 'experience' | 'certificate' | 'recommendation' | 'funfact') => {
    // Set default values based on type
    let defaultValues = {};
    
    switch (type) {
      case 'project':
        defaultValues = {
          title: '',
          description: '',
          technologies: [],
          githubUrl: '',
          demoUrl: '',
          imageUrl: ''
        };
        break;
      case 'skill':
        defaultValues = {
          name: '',
          category: '',
          level: 50
        };
        break;
      case 'experience':
        defaultValues = {
          company: '',
          position: '',
          duration: '',
          description: ''
        };
        break;
      case 'certificate':
        defaultValues = {
          title: '',
          issuer: '',
          date: '',
          url: ''
        };
        break;
      case 'recommendation':
        defaultValues = {
          name: '',
          position: '',
          company: '',
          text: ''
        };
        break;
      case 'funfact':
        defaultValues = {
          text: ''
        };
        break;
    }
    
    setFormData(defaultValues);
    setEditMode({ type, id: null });
  };
  
  // Change theme
  const changeTheme = async (themeName: string) => {
    try {
      setLoading(true);
      const newTheme = await setTheme(themeName);
      setThemeState(newTheme);
      setCurrentTheme(themeName);
      
      // Apply theme to document
      document.documentElement.classList.remove('theme-light', 'theme-dark', 'theme-hacker');
      document.documentElement.classList.add(`theme-${themeName}`);
      
      toast({
        title: "Theme changed",
        description: `Theme has been set to ${themeName}.`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error changing theme",
        description: "There was an error changing the theme.",
        variant: "destructive",
      });
      console.error("Error changing theme:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Generate fake resume download
  const handleResumeDownload = async () => {
    try {
      setLoading(true);
      
      // In a real app, this would call an API to generate the resume
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Resume generated",
        description: "The resume has been generated and downloaded.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error generating resume",
        description: "There was an error generating the resume.",
        variant: "destructive",
      });
      console.error("Error generating resume:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle successful login
  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-hacker-background text-hacker-foreground p-4">
      {!authenticated ? (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
              <h1 className="text-2xl font-bold">Terminal Portfolio Admin</h1>
              <ThemeControls 
                onThemeChange={changeTheme}
                onResumeDownload={handleResumeDownload}
                loading={loading}
                currentTheme={currentTheme}
              />
            </div>
            
            {/* About Section */}
            <AboutSection about={about} onEdit={startEdit} />
            
            {/* Edit Form */}
            <FormRenderer 
              editMode={editMode}
              formData={formData}
              onInputChange={handleInputChange}
              onArrayInputChange={handleArrayInputChange}
              onSocialLinkChange={handleSocialLinkChange}
              onFileChange={handleFileChange}
              onSave={saveEdit}
              onCancel={cancelEdit}
              loading={loading}
              imagePreview={imagePreview}
            />
            
            {/* Content Tabs */}
            <ContentTabs 
              projects={projects}
              skills={skills}
              experiences={experiences}
              certificates={certificates}
              recommendations={recommendations}
              funFacts={funFacts}
              onAdd={startAdd}
              onEdit={startEdit}
              onDelete={deleteItem}
              loading={loading || projectsLoading || skillsLoading || 
                experiencesLoading || certificatesLoading || 
                recommendationsLoading || funFactsLoading}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Admin;
