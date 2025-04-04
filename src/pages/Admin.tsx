
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
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
import { Edit, Trash, Download, Terminal, Sun, Moon, Upload, User } from 'lucide-react';

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // Content states
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [funFacts, setFunFacts] = useState<FunFact[]>([]);
  const [about, setAbout] = useState<About | null>(null);
  const [theme, setThemeState] = useState<ThemeConfig | null>(null);
  
  // Edit states
  const [editMode, setEditMode] = useState<{
    type: 'project' | 'skill' | 'experience' | 'certificate' | 'recommendation' | 'funfact' | 'about';
    id: string | null;
  } | null>(null);
  
  // Form data for editing
  const [formData, setFormData] = useState<any>({});
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be a proper authentication check
      if (username === 'admin' && password === 'password') {
        setAuthenticated(true);
        toast({
          title: "Authentication successful",
          description: "Welcome to the admin dashboard.",
          variant: "default",
        });
        
        // Load data after authentication
        loadAllData();
      } else {
        toast({
          title: "Authentication failed",
          description: "Invalid username or password.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };
  
  // Load all data from services
  const loadAllData = async () => {
    try {
      setLoading(true);
      
      const [
        projectsData,
        skillsData,
        experiencesData,
        certificatesData,
        recommendationsData,
        funFactsData,
        aboutData,
        themeData
      ] = await Promise.all([
        getProjects(),
        getSkills(),
        getExperiences(),
        getCertificates(),
        getRecommendations(),
        getAllFunFacts(),
        getAbout(),
        getTheme()
      ]);
      
      setProjects(projectsData);
      setSkills(skillsData);
      setExperiences(experiencesData);
      setCertificates(certificatesData);
      setRecommendations(recommendationsData);
      setFunFacts(funFactsData);
      setAbout(aboutData);
      setThemeState(themeData);
      
    } catch (error) {
      toast({
        title: "Error loading data",
        description: "There was an error loading the content data.",
        variant: "destructive",
      });
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };
  
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
            setProjects(prev => prev.map(p => p.id === editMode.id ? { ...p, ...formData } : p));
          } else {
            const newProject = await addProject(formData);
            setProjects(prev => [...prev, newProject]);
          }
          break;
        case 'skill':
          if (editMode.id) {
            await updateSkill(editMode.id, formData);
            setSkills(prev => prev.map(s => s.id === editMode.id ? { ...s, ...formData } : s));
          } else {
            const newSkill = await addSkill(formData);
            setSkills(prev => [...prev, newSkill]);
          }
          break;
        case 'experience':
          if (editMode.id) {
            await updateExperience(editMode.id, formData);
            setExperiences(prev => prev.map(e => e.id === editMode.id ? { ...e, ...formData } : e));
          } else {
            const newExperience = await addExperience(formData);
            setExperiences(prev => [...prev, newExperience]);
          }
          break;
        case 'certificate':
          if (editMode.id) {
            await updateCertificate(editMode.id, formData);
            setCertificates(prev => prev.map(c => c.id === editMode.id ? { ...c, ...formData } : c));
          } else {
            const newCertificate = await addCertificate(formData);
            setCertificates(prev => [...prev, newCertificate]);
          }
          break;
        case 'recommendation':
          if (editMode.id) {
            await updateRecommendation(editMode.id, formData);
            setRecommendations(prev => prev.map(r => r.id === editMode.id ? { ...r, ...formData } : r));
          } else {
            const newRecommendation = await addRecommendation(formData);
            setRecommendations(prev => [...prev, newRecommendation]);
          }
          break;
        case 'funfact':
          if (editMode.id) {
            await updateFunFact(editMode.id, formData);
            setFunFacts(prev => prev.map(f => f.id === editMode.id ? { ...f, ...formData } : f));
          } else {
            const newFunFact = await addFunFact(formData);
            setFunFacts(prev => [...prev, newFunFact]);
          }
          break;
        case 'about':
          await updateAbout(formData);
          setAbout(formData);
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
          setProjects(prev => prev.filter(p => p.id !== id));
          break;
        case 'skill':
          await deleteSkill(id);
          setSkills(prev => prev.filter(s => s.id !== id));
          break;
        case 'experience':
          await deleteExperience(id);
          setExperiences(prev => prev.filter(e => e.id !== id));
          break;
        case 'certificate':
          await deleteCertificate(id);
          setCertificates(prev => prev.filter(c => c.id !== id));
          break;
        case 'recommendation':
          await deleteRecommendation(id);
          setRecommendations(prev => prev.filter(r => r.id !== id));
          break;
        case 'funfact':
          await deleteFunFact(id);
          setFunFacts(prev => prev.filter(f => f.id !== id));
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
      const newTheme = await setTheme(themeName);
      setThemeState(newTheme);
      
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

  // Enhanced about information display with profile image
  const renderAboutSection = () => {
    return (
      <div className="bg-hacker-light p-4 rounded border border-terminal-accent mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">About Information</h3>
          {about && (
            <button 
              onClick={() => startEdit('about', 'about')}
              className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 flex items-center space-x-1"
            >
              <Edit size={14} />
              <span>Edit</span>
            </button>
          )}
        </div>
        
        {about ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col items-center md:items-start">
              {about.profileImageUrl ? (
                <div className="mb-3 w-32 h-32 rounded-full overflow-hidden border-2 border-terminal-accent">
                  <img 
                    src={about.profileImageUrl} 
                    alt={about.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
              ) : (
                <div className="mb-3 w-32 h-32 rounded-full flex items-center justify-center bg-hacker-dark border-2 border-terminal-accent">
                  <User size={48} className="text-terminal-accent opacity-50" />
                </div>
              )}
            </div>
            <div>
              <div>
                <p className="text-terminal-muted">Name:</p>
                <p className="text-lg font-bold">{about.name}</p>
              </div>
              <div className="mt-2">
                <p className="text-terminal-muted">Title:</p>
                <p>{about.title}</p>
              </div>
            </div>
            <div>
              <p className="text-terminal-muted">Location:</p>
              <p>{about.location}</p>
            </div>
            <div>
              <p className="text-terminal-muted">Email:</p>
              <p>{about.email}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-terminal-muted">Bio:</p>
              <p>{about.bio}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-terminal-muted">Social Links:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {about.socialLinks.github && (
                  <a href={about.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-terminal-accent hover:underline">GitHub</a>
                )}
                {about.socialLinks.linkedin && (
                  <a href={about.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-terminal-accent hover:underline">LinkedIn</a>
                )}
                {about.socialLinks.twitter && (
                  <a href={about.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-terminal-accent hover:underline">Twitter</a>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-terminal-muted">Loading about information...</p>
        )}
      </div>
    );
  };

  // Enhanced about form with profile image upload
  const renderEditAboutForm = () => {
    return (
      <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
        <h3 className="text-lg font-bold mb-4">Edit About Information</h3>
        <div className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <div className="mb-2 w-32 h-32 rounded-full overflow-hidden border-2 border-terminal-accent bg-hacker-dark">
              {(imagePreview || formData.profileImageUrl) ? (
                <img 
                  src={imagePreview || formData.profileImageUrl} 
                  alt="Profile Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User size={48} className="text-terminal-accent opacity-50" />
                </div>
              )}
            </div>
            <label className="cursor-pointer p-2 mt-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 flex items-center space-x-1">
              <Upload size={14} />
              <span>Upload Image</span>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
          </div>

          <div>
            <label className="block text-terminal-foreground mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
            />
          </div>
          <div>
            <label className="block text-terminal-foreground mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleInputChange}
              className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
            />
          </div>
          
          <div>
            <label className="block text-terminal-foreground mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location || ''}
              onChange={handleInputChange}
              className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
            />
          </div>
          <div>
            <label className="block text-terminal-foreground mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
            />
          </div>
          <div>
            <label className="block text-terminal-foreground mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio || ''}
              onChange={handleInputChange}
              className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-terminal-foreground mb-1">GitHub URL</label>
            <input
              type="text"
              name="github"
              value={formData.socialLinks?.github || ''}
              onChange={handleSocialLinkChange}
              className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
            />
          </div>
          <div>
            <label className="block text-terminal-foreground mb-1">LinkedIn URL</label>
            <input
              type="text"
              name="linkedin"
              value={formData.socialLinks?.linkedin || ''}
              onChange={handleSocialLinkChange}
              className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
            />
          </div>
          <div>
            <label className="block text-terminal-foreground mb-1">Twitter URL</label>
            <input
              type="text"
              name="twitter"
              value={formData.socialLinks?.twitter || ''}
              onChange={handleSocialLinkChange}
              className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={saveEdit}
              disabled={loading}
              className="flex-1 p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={cancelEdit}
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

  // Edit form based on the current edit mode
  const renderEditForm = () => {
    if (!editMode) return null;
    
    switch (editMode.type) {
      case 'project':
        return (
          <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
            <h3 className="text-lg font-bold mb-4">
              {editMode.id ? 'Edit Project' : 'Add New Project'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-terminal-foreground mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                />
              </div>
              <div>
                <label className="block text-terminal-foreground mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-terminal-foreground mb-1">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={(formData.technologies || []).join(', ')}
                  onChange={(e) => handleArrayInputChange(e, 'technologies')}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                />
              </div>
              <div>
                <label className="block text-terminal-foreground mb-1">GitHub URL</label>
                <input
                  type="text"
                  name="githubUrl"
                  value={formData.githubUrl || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                />
              </div>
              <div>
                <label className="block text-terminal-foreground mb-1">Demo URL</label>
                <input
                  type="text"
                  name="demoUrl"
                  value={formData.demoUrl || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={saveEdit}
                  disabled={loading}
                  className="flex-1 p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={cancelEdit}
                  disabled={loading}
                  className="flex-1 p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded hover:bg-opacity-90 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'skill':
        return (
          <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
            <h3 className="text-lg font-bold mb-4">
              {editMode.id ? 'Edit Skill' : 'Add New Skill'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-terminal-foreground mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                />
              </div>
              <div>
                <label className="block text-terminal-foreground mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category || ''}
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={saveEdit}
                  disabled={loading}
                  className="flex-1 p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={cancelEdit}
                  disabled={loading}
                  className="flex-1 p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded hover:bg-opacity-90 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'experience':
        return (
          <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
            <h3 className="text-lg font-bold mb-4">
              {editMode.id ? 'Edit Experience' : 'Add New Experience'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-terminal-foreground mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                />
              </div>
              <div>
                <label className="block text-terminal-foreground mb-1">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                />
              </div>
              <div>
                <label className="block text-terminal-foreground mb-1">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                />
              </div>
              <div>
                <label className="block text-terminal-foreground mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={saveEdit}
                  disabled={loading}
                  className="flex-1 p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={cancelEdit}
                  disabled={loading}
                  className="flex-1 p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded hover:bg-opacity-90 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'certificate':
        return (
          <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
            <h3 className="text-lg font-bold mb-4">
              {editMode.id ? 'Edit Certificate' : 'Add New Certificate'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-terminal-foreground mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                />
              </div>
              <div>
                <label className="block text-terminal-foreground mb-1">Issuer</label>
                <input
                  type="text"
                  name="issuer"
                  value={formData.issuer || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                />
              </div>
              <div>
                <label className="block text-terminal-foreground mb-1">Date</label>
                <input
                  type="text"
                  name="date"
                  value={formData.date || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                />
              </div>
              <div>
                <label className="block text-terminal-foreground mb-1">URL</label>
                <input
                  type="text"
                  name="url"
                  value={formData.url || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={saveEdit}
                  disabled={loading}
                  className="flex-1 p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={cancelEdit}
                  disabled={loading}
                  className="flex-1 p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded hover:bg-opacity-90 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'recommendation':
        return (
          <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
            <h3 className="text-lg font-bold mb-4">
              {editMode.id ? 'Edit Recommendation' : 'Add New Recommendation'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-terminal-foreground mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                />
              </div>
              <div>
                <label className="block text-terminal-foreground mb-1">Position</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                />
              </div>
              <div>
                <label className="block text-terminal-foreground mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                />
              </div>
              <div>
                <label className="block text-terminal-foreground mb-1">Text</label>
                <textarea
                  name="text"
                  value={formData.text || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={saveEdit}
                  disabled={loading}
                  className="flex-1 p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={cancelEdit}
                  disabled={loading}
                  className="flex-1 p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded hover:bg-opacity-90 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'funfact':
        return (
          <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
            <h3 className="text-lg font-bold mb-4">
              {editMode.id ? 'Edit Fun Fact' : 'Add New Fun Fact'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-terminal-foreground mb-1">Text</label>
                <textarea
                  name="text"
                  value={formData.text || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={saveEdit}
                  disabled={loading}
                  className="flex-1 p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={cancelEdit}
                  disabled={loading}
                  className="flex-1 p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded hover:bg-opacity-90 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'about':
        return renderEditAboutForm();
        
      default:
        return null;
    }
  };
  
  // Main render
  return (
    <div className="min-h-screen bg-hacker-background text-hacker-foreground p-4">
      {!authenticated ? (
        <div className="max-w-md mx-auto mt-16 p-6 bg-hacker-light rounded shadow">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <div className="text-xs text-center text-terminal-muted">
                <p>Demo credentials:</p>
                <p>Username: admin / Password: password</p>
              </div>
            </div>
          </form>
        </div>
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
              <div className="flex space-x-2 ml-auto">
                <button
                  onClick={changeTheme.bind(null, 'light')}
                  className="p-2 bg-hacker-light text-terminal-foreground rounded hover:bg-opacity-90 transition flex items-center"
                >
                  <Sun size={16} className="mr-1" />
                  Light
                </button>
                <button
                  onClick={changeTheme.bind(null, 'dark')}
                  className="p-2 bg-hacker-dark text-terminal-foreground rounded hover:bg-opacity-90 transition flex items-center"
                >
                  <Moon size={16} className="mr-1" />
                  Dark
                </button>
                <button
                  onClick={changeTheme.bind(null, 'hacker')}
                  className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition flex items-center"
                >
                  <Terminal size={16} className="mr-1" />
                  Terminal
                </button>
                <button
                  onClick={handleResumeDownload}
                  className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition flex items-center"
                >
                  <Download size={16} className="mr-1" />
                  Generate Resume
                </button>
              </div>
            </div>
            
            {/* About Section */}
            {renderAboutSection()}
            
            {/* Edit Form */}
            {editMode && renderEditForm()}
            
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="grid grid-cols-6 mb-4">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="certificates">Certificates</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="funfacts">Fun Facts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="projects">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Projects</h2>
                  <button
                    onClick={() => startAdd('project')}
                    className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
                  >
                    Add Project
                  </button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Technologies</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>{project.title}</TableCell>
                        <TableCell>{project.description.substring(0, 50)}...</TableCell>
                        <TableCell>{project.technologies.join(', ')}</TableCell>
                        <TableCell className="text-right">
                          <button
                            onClick={() => startEdit('project', project.id)}
                            className="p-1 text-terminal-accent hover:text-terminal-foreground transition mr-2"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteItem('project', project.id)}
                            className="p-1 text-red-500 hover:text-red-700 transition"
                          >
                            <Trash size={16} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="skills">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Skills</h2>
                  <button
                    onClick={() => startAdd('skill')}
                    className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
                  >
                    Add Skill
                  </button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {skills.map((skill) => (
                      <TableRow key={skill.id}>
                        <TableCell>{skill.name}</TableCell>
                        <TableCell>{skill.category}</TableCell>
                        <TableCell>
                          <div className="w-full bg-hacker-dark rounded h-2">
                            <div 
                              className="bg-terminal-accent h-2 rounded"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <button
                            onClick={() => startEdit('skill', skill.id)}
                            className="p-1 text-terminal-accent hover:text-terminal-foreground transition mr-2"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteItem('skill', skill.id)}
                            className="p-1 text-red-500 hover:text-red-700 transition"
                          >
                            <Trash size={16} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="experience">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Experience</h2>
                  <button
                    onClick={() => startAdd('experience')}
                    className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
                  >
                    Add Experience
                  </button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {experiences.map((experience) => (
                      <TableRow key={experience.id}>
                        <TableCell>{experience.company}</TableCell>
                        <TableCell>{experience.position}</TableCell>
                        <TableCell>{experience.duration}</TableCell>
                        <TableCell className="text-right">
                          <button
                            onClick={() => startEdit('experience', experience.id)}
                            className="p-1 text-terminal-accent hover:text-terminal-foreground transition mr-2"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteItem('experience', experience.id)}
                            className="p-1 text-red-500 hover:text-red-700 transition"
                          >
                            <Trash size={16} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="certificates">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Certificates</h2>
                  <button
                    onClick={() => startAdd('certificate')}
                    className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
                  >
                    Add Certificate
                  </button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Issuer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {certificates.map((certificate) => (
                      <TableRow key={certificate.id}>
                        <TableCell>{certificate.title}</TableCell>
                        <TableCell>{certificate.issuer}</TableCell>
                        <TableCell>{certificate.date}</TableCell>
                        <TableCell className="text-right">
                          <button
                            onClick={() => startEdit('certificate', certificate.id)}
                            className="p-1 text-terminal-accent hover:text-terminal-foreground transition mr-2"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteItem('certificate', certificate.id)}
                            className="p-1 text-red-500 hover:text-red-700 transition"
                          >
                            <Trash size={16} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="recommendations">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Recommendations</h2>
                  <button
                    onClick={() => startAdd('recommendation')}
                    className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
                  >
                    Add Recommendation
                  </button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recommendations.map((recommendation) => (
                      <TableRow key={recommendation.id}>
                        <TableCell>{recommendation.name}</TableCell>
                        <TableCell>{recommendation.position}</TableCell>
                        <TableCell>{recommendation.company}</TableCell>
                        <TableCell className="text-right">
                          <button
                            onClick={() => startEdit('recommendation', recommendation.id)}
                            className="p-1 text-terminal-accent hover:text-terminal-foreground transition mr-2"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteItem('recommendation', recommendation.id)}
                            className="p-1 text-red-500 hover:text-red-700 transition"
                          >
                            <Trash size={16} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="funfacts">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Fun Facts</h2>
                  <button
                    onClick={() => startAdd('funfact')}
                    className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
                  >
                    Add Fun Fact
                  </button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Text</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {funFacts.map((funFact) => (
                      <TableRow key={funFact.id}>
                        <TableCell>{funFact.text}</TableCell>
                        <TableCell className="text-right">
                          <button
                            onClick={() => startEdit('funfact', funFact.id)}
                            className="p-1 text-terminal-accent hover:text-terminal-foreground transition mr-2"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => deleteItem('funfact', funFact.id)}
                            className="p-1 text-red-500 hover:text-red-700 transition"
                          >
                            <Trash size={16} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Admin;
