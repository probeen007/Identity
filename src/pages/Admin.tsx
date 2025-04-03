
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
import { Edit, Trash, Download, Terminal, Sun, Moon } from 'lucide-react';

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
  
  // Save edited item
  const saveEdit = async () => {
    if (!editMode) return;
    
    try {
      setLoading(true);
      
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

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-terminal-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-6 bg-hacker-light rounded-lg border border-terminal-accent"
        >
          <h1 className="text-2xl font-bold text-terminal-foreground mb-6 text-center">Admin Access</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-terminal-foreground mb-1">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded focus:outline-none focus:ring-1 focus:ring-terminal-accent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-terminal-foreground mb-1">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-hacker-dark text-terminal-foreground border border-terminal-accent rounded focus:outline-none focus:ring-1 focus:ring-terminal-accent"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 transition"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>
          
          <div className="mt-4 text-center text-terminal-accent text-sm">
            <p>Hint: For demo, use admin/password</p>
          </div>
        </motion.div>
      </div>
    );
  }

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
                <label className="block text-terminal-foreground mb-1">Testimonial</label>
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
                <label className="block text-terminal-foreground mb-1">Fun Fact Text</label>
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
        return (
          <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
            <h3 className="text-lg font-bold mb-4">Edit About Information</h3>
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
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-hacker-dark text-terminal-foreground">
      <header className="bg-hacker-light p-4 border-b border-terminal-accent">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Portfolio Admin</h1>
          <div className="flex items-center space-x-4">
            <a 
              href="/"
              className="px-3 py-1 bg-hacker-dark border border-terminal-accent text-terminal-foreground rounded hover:bg-opacity-90 flex items-center space-x-1"
            >
              <Terminal size={16} />
              <span>Terminal</span>
            </a>
            <button 
              onClick={() => setAuthenticated(false)}
              className="px-3 py-1 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        
        {/* Theme selector */}
        <div className="bg-hacker-light p-4 rounded border border-terminal-accent mb-6">
          <h3 className="text-lg font-bold mb-4">Terminal Theme</h3>
          <div className="flex space-x-4">
            <button 
              onClick={() => changeTheme('light')}
              className={`p-3 rounded flex items-center space-x-2 ${theme?.name === 'light' ? 'bg-terminal-accent text-terminal-background' : 'bg-hacker-dark text-terminal-foreground'}`}
            >
              <Sun size={18} />
              <span>Light</span>
            </button>
            <button 
              onClick={() => changeTheme('dark')}
              className={`p-3 rounded flex items-center space-x-2 ${theme?.name === 'dark' ? 'bg-terminal-accent text-terminal-background' : 'bg-hacker-dark text-terminal-foreground'}`}
            >
              <Moon size={18} />
              <span>Dark</span>
            </button>
            <button 
              onClick={() => changeTheme('hacker')}
              className={`p-3 rounded flex items-center space-x-2 ${theme?.name === 'hacker' ? 'bg-terminal-accent text-terminal-background' : 'bg-hacker-dark text-terminal-foreground'}`}
            >
              <Terminal size={18} />
              <span>Hacker</span>
            </button>
          </div>
        </div>
        
        {/* Resume generator */}
        <div className="bg-hacker-light p-4 rounded border border-terminal-accent mb-6">
          <h3 className="text-lg font-bold mb-4">Resume Generator</h3>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleResumeDownload}
              disabled={loading}
              className="px-4 py-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90 flex items-center space-x-2"
            >
              <Download size={18} />
              <span>{loading ? 'Generating...' : 'Generate & Download Resume'}</span>
            </button>
            <p className="text-sm text-terminal-muted">Generate a resume based on the portfolio data</p>
          </div>
        </div>
        
        {/* About information */}
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
              <div>
                <p className="text-terminal-muted">Name:</p>
                <p>{about.name}</p>
              </div>
              <div>
                <p className="text-terminal-muted">Title:</p>
                <p>{about.title}</p>
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
        
        {/* Content tabs */}
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="w-full bg-hacker-light mb-4 grid grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="funfacts">Fun Facts</TabsTrigger>
          </TabsList>
          
          {/* Projects tab */}
          <TabsContent value="projects">
            <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Projects</h3>
                <button 
                  onClick={() => startAdd('project')}
                  className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90"
                >
                  Add Project
                </button>
              </div>
              
              {editMode?.type === 'project' ? (
                renderEditForm()
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Technologies</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map(project => (
                      <TableRow key={project.id}>
                        <TableCell className="font-bold">{project.title}</TableCell>
                        <TableCell>{project.technologies.join(', ')}</TableCell>
                        <TableCell className="flex space-x-2">
                          <button 
                            onClick={() => startEdit('project', project.id)}
                            className="p-1 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => deleteItem('project', project.id)}
                            className="p-1 bg-terminal-error text-terminal-background rounded hover:bg-opacity-90"
                          >
                            <Trash size={16} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
          
          {/* Skills tab */}
          <TabsContent value="skills">
            <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Skills</h3>
                <button 
                  onClick={() => startAdd('skill')}
                  className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90"
                >
                  Add Skill
                </button>
              </div>
              
              {editMode?.type === 'skill' ? (
                renderEditForm()
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {skills.map(skill => (
                      <TableRow key={skill.id}>
                        <TableCell className="font-bold">{skill.name}</TableCell>
                        <TableCell>{skill.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-32 bg-hacker-dark rounded-full h-2 overflow-hidden">
                              <div className="bg-terminal-accent h-full" style={{ width: `${skill.level}%` }}></div>
                            </div>
                            <span className="text-xs">{skill.level}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="flex space-x-2">
                          <button 
                            onClick={() => startEdit('skill', skill.id)}
                            className="p-1 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => deleteItem('skill', skill.id)}
                            className="p-1 bg-terminal-error text-terminal-background rounded hover:bg-opacity-90"
                          >
                            <Trash size={16} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
          
          {/* Experience tab */}
          <TabsContent value="experience">
            <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Experience</h3>
                <button 
                  onClick={() => startAdd('experience')}
                  className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90"
                >
                  Add Experience
                </button>
              </div>
              
              {editMode?.type === 'experience' ? (
                renderEditForm()
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Position</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {experiences.map(exp => (
                      <TableRow key={exp.id}>
                        <TableCell className="font-bold">{exp.position}</TableCell>
                        <TableCell>{exp.company}</TableCell>
                        <TableCell>{exp.duration}</TableCell>
                        <TableCell className="flex space-x-2">
                          <button 
                            onClick={() => startEdit('experience', exp.id)}
                            className="p-1 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => deleteItem('experience', exp.id)}
                            className="p-1 bg-terminal-error text-terminal-background rounded hover:bg-opacity-90"
                          >
                            <Trash size={16} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
          
          {/* Certificates tab */}
          <TabsContent value="certificates">
            <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Certificates</h3>
                <button 
                  onClick={() => startAdd('certificate')}
                  className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90"
                >
                  Add Certificate
                </button>
              </div>
              
              {editMode?.type === 'certificate' ? (
                renderEditForm()
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Issuer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {certificates.map(cert => (
                      <TableRow key={cert.id}>
                        <TableCell className="font-bold">{cert.title}</TableCell>
                        <TableCell>{cert.issuer}</TableCell>
                        <TableCell>{cert.date}</TableCell>
                        <TableCell className="flex space-x-2">
                          <button 
                            onClick={() => startEdit('certificate', cert.id)}
                            className="p-1 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => deleteItem('certificate', cert.id)}
                            className="p-1 bg-terminal-error text-terminal-background rounded hover:bg-opacity-90"
                          >
                            <Trash size={16} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
          
          {/* Recommendations tab */}
          <TabsContent value="recommendations">
            <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Recommendations</h3>
                <button 
                  onClick={() => startAdd('recommendation')}
                  className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90"
                >
                  Add Recommendation
                </button>
              </div>
              
              {editMode?.type === 'recommendation' ? (
                renderEditForm()
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recommendations.map(rec => (
                      <TableRow key={rec.id}>
                        <TableCell className="font-bold">{rec.name}</TableCell>
                        <TableCell>{rec.position}</TableCell>
                        <TableCell>{rec.company}</TableCell>
                        <TableCell className="flex space-x-2">
                          <button 
                            onClick={() => startEdit('recommendation', rec.id)}
                            className="p-1 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => deleteItem('recommendation', rec.id)}
                            className="p-1 bg-terminal-error text-terminal-background rounded hover:bg-opacity-90"
                          >
                            <Trash size={16} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
          
          {/* Fun Facts tab */}
          <TabsContent value="funfacts">
            <div className="bg-hacker-light p-4 rounded border border-terminal-accent">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Fun Facts</h3>
                <button 
                  onClick={() => startAdd('funfact')}
                  className="p-2 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90"
                >
                  Add Fun Fact
                </button>
              </div>
              
              {editMode?.type === 'funfact' ? (
                renderEditForm()
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fun Fact</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {funFacts.map(fact => (
                      <TableRow key={fact.id}>
                        <TableCell>{fact.text}</TableCell>
                        <TableCell className="flex space-x-2">
                          <button 
                            onClick={() => startEdit('funfact', fact.id)}
                            className="p-1 bg-terminal-accent text-terminal-background rounded hover:bg-opacity-90"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => deleteItem('funfact', fact.id)}
                            className="p-1 bg-terminal-error text-terminal-background rounded hover:bg-opacity-90"
                          >
                            <Trash size={16} />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
