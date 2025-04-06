
import { 
  About, 
  Project, 
  Skill, 
  Experience, 
  Certificate, 
  Recommendation, 
  FunFact,
  ThemeConfig
} from '@/types';
import { supabase, handleSupabaseError, setupRealtimeListener } from '@/lib/supabase';
import { mockAbout, mockProjects, mockSkills, mockExperiences, mockCertificates, 
  mockRecommendations, mockFunFacts, asciiArt, helpContent, notFoundContent, welcomeMessage } from '@/utils/mockData';
import { toast } from 'sonner';

// Theme storage (stays in local storage for better performance)
let currentTheme: ThemeConfig = {
  name: 'hacker',
  backgroundColor: '#0d1117',
  foregroundColor: '#00FF00',
  accentColor: '#1C8CFF'
};

// Helper function to initialize DB with mock data if needed
export const initializeDatabase = async () => {
  try {
    // Check if we have any data in the About table
    const { count, error } = await supabase
      .from('about')
      .select('*', { count: 'exact', head: true });
    
    if (error) throw error;
    
    // If no data exists, seed the database with mock data
    if (count === 0) {
      console.log("Seeding database with initial data...");
      
      // Insert About data
      await supabase.from('about').insert([mockAbout]);
      
      // Insert Projects data
      await supabase.from('projects').insert(mockProjects);
      
      // Insert Skills data
      await supabase.from('skills').insert(mockSkills);
      
      // Insert Experiences data
      await supabase.from('experiences').insert(mockExperiences);
      
      // Insert Certificates data
      await supabase.from('certificates').insert(mockCertificates);
      
      // Insert Recommendations data
      await supabase.from('recommendations').insert(mockRecommendations);
      
      // Insert FunFacts data
      await supabase.from('funfacts').insert(mockFunFacts);
      
      console.log("Database seeded successfully");
    }
    
    return true;
  } catch (error) {
    console.error("Error initializing database:", error);
    // Continue with the app even if initialization fails
    return false;
  }
};

// About data operations
export const getAbout = async (): Promise<About> => {
  try {
    const { data, error } = await supabase
      .from('about')
      .select('*')
      .maybeSingle();
    
    if (error) throw error;
    return data as About || mockAbout;
  } catch (error) {
    console.error("Error fetching about data:", error);
    // Fallback to mock data if database fails
    return mockAbout;
  }
};

export const updateAbout = async (data: About): Promise<About> => {
  try {
    // First check if about data exists
    const existingData = await getAbout();
    
    if (existingData && existingData.id) {
      // Update existing record
      const { data: updatedData, error } = await supabase
        .from('about')
        .update({
          name: data.name,
          title: data.title, 
          bio: data.bio,
          location: data.location,
          email: data.email,
          profileimageurl: data.profileImageUrl,
          sociallinks: data.socialLinks
        })
        .eq('id', existingData.id)
        .select()
        .single();
      
      if (error) throw error;
      toast.success("About information updated");
      return updatedData as About;
    } else {
      // Insert new record
      const { data: newData, error } = await supabase
        .from('about')
        .insert([{
          name: data.name,
          title: data.title, 
          bio: data.bio,
          location: data.location,
          email: data.email,
          profileimageurl: data.profileImageUrl,
          sociallinks: data.socialLinks
        }])
        .select()
        .single();
      
      if (error) throw error;
      toast.success("About information created");
      return newData as About;
    }
  } catch (error) {
    return handleSupabaseError(error, "Failed to update about data") || mockAbout;
  }
};

// Projects data operations
export const getProjects = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id');
    
    if (error) throw error;
    return data as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return mockProjects;
  }
};

export const updateProject = async (id: string, data: Partial<Project>): Promise<Project> => {
  try {
    const { data: updatedData, error } = await supabase
      .from('projects')
      .update({
        title: data.title,
        description: data.description,
        technologies: data.technologies,
        githuburl: data.githubUrl,
        demourl: data.demoUrl,
        imageurl: data.imageUrl
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return updatedData as Project;
  } catch (error) {
    return handleSupabaseError(error, "Failed to update project") || mockProjects[0];
  }
};

export const addProject = async (data: Omit<Project, 'id'>): Promise<Project> => {
  try {
    const newProject = { 
      id: `project-${Date.now()}`,
      title: data.title,
      description: data.description,
      technologies: data.technologies,
      githuburl: data.githubUrl,
      demourl: data.demoUrl,
      imageurl: data.imageUrl
    };
    
    const { data: createdData, error } = await supabase
      .from('projects')
      .insert([newProject])
      .select()
      .single();
    
    if (error) throw error;
    return createdData as Project;
  } catch (error) {
    return handleSupabaseError(error, "Failed to add project") || mockProjects[0];
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    handleSupabaseError(error, "Failed to delete project");
  }
};

// Skills data operations
export const getSkills = async (): Promise<Skill[]> => {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data as Skill[];
  } catch (error) {
    console.error("Error fetching skills:", error);
    return mockSkills;
  }
};

export const updateSkill = async (id: string, data: Partial<Skill>): Promise<Skill> => {
  try {
    const { data: updatedData, error } = await supabase
      .from('skills')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return updatedData as Skill;
  } catch (error) {
    return handleSupabaseError(error, "Failed to update skill") || mockSkills[0];
  }
};

export const addSkill = async (data: Omit<Skill, 'id'>): Promise<Skill> => {
  try {
    const newSkill = { 
      ...data, 
      id: `skill-${Date.now()}` 
    };
    
    const { data: createdData, error } = await supabase
      .from('skills')
      .insert([newSkill])
      .select()
      .single();
    
    if (error) throw error;
    return createdData as Skill;
  } catch (error) {
    return handleSupabaseError(error, "Failed to add skill") || mockSkills[0];
  }
};

export const deleteSkill = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    handleSupabaseError(error, "Failed to delete skill");
  }
};

// Experience data operations
export const getExperiences = async (): Promise<Experience[]> => {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('id');
    
    if (error) throw error;
    return data as Experience[];
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return mockExperiences;
  }
};

export const updateExperience = async (id: string, data: Partial<Experience>): Promise<Experience> => {
  try {
    const { data: updatedData, error } = await supabase
      .from('experiences')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return updatedData as Experience;
  } catch (error) {
    return handleSupabaseError(error, "Failed to update experience") || mockExperiences[0];
  }
};

export const addExperience = async (data: Omit<Experience, 'id'>): Promise<Experience> => {
  try {
    const newExperience = { 
      ...data, 
      id: `exp-${Date.now()}` 
    };
    
    const { data: createdData, error } = await supabase
      .from('experiences')
      .insert([newExperience])
      .select()
      .single();
    
    if (error) throw error;
    return createdData as Experience;
  } catch (error) {
    return handleSupabaseError(error, "Failed to add experience") || mockExperiences[0];
  }
};

export const deleteExperience = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    handleSupabaseError(error, "Failed to delete experience");
  }
};

// Certificate data operations
export const getCertificates = async (): Promise<Certificate[]> => {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('id');
    
    if (error) throw error;
    return data as Certificate[];
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return mockCertificates;
  }
};

export const updateCertificate = async (id: string, data: Partial<Certificate>): Promise<Certificate> => {
  try {
    const { data: updatedData, error } = await supabase
      .from('certificates')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return updatedData as Certificate;
  } catch (error) {
    return handleSupabaseError(error, "Failed to update certificate") || mockCertificates[0];
  }
};

export const addCertificate = async (data: Omit<Certificate, 'id'>): Promise<Certificate> => {
  try {
    const newCertificate = { 
      ...data, 
      id: `cert-${Date.now()}` 
    };
    
    const { data: createdData, error } = await supabase
      .from('certificates')
      .insert([newCertificate])
      .select()
      .single();
    
    if (error) throw error;
    return createdData as Certificate;
  } catch (error) {
    return handleSupabaseError(error, "Failed to add certificate") || mockCertificates[0];
  }
};

export const deleteCertificate = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    handleSupabaseError(error, "Failed to delete certificate");
  }
};

// Recommendation data operations
export const getRecommendations = async (): Promise<Recommendation[]> => {
  try {
    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .order('id');
    
    if (error) throw error;
    return data as Recommendation[];
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return mockRecommendations;
  }
};

export const updateRecommendation = async (id: string, data: Partial<Recommendation>): Promise<Recommendation> => {
  try {
    const { data: updatedData, error } = await supabase
      .from('recommendations')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return updatedData as Recommendation;
  } catch (error) {
    return handleSupabaseError(error, "Failed to update recommendation") || mockRecommendations[0];
  }
};

export const addRecommendation = async (data: Omit<Recommendation, 'id'>): Promise<Recommendation> => {
  try {
    const newRecommendation = { 
      ...data, 
      id: `rec-${Date.now()}` 
    };
    
    const { data: createdData, error } = await supabase
      .from('recommendations')
      .insert([newRecommendation])
      .select()
      .single();
    
    if (error) throw error;
    return createdData as Recommendation;
  } catch (error) {
    return handleSupabaseError(error, "Failed to add recommendation") || mockRecommendations[0];
  }
};

export const deleteRecommendation = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('recommendations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    handleSupabaseError(error, "Failed to delete recommendation");
  }
};

// FunFact data operations
export const getFunFact = async (): Promise<FunFact> => {
  try {
    const { data, error } = await supabase
      .from('funfacts')
      .select('*')
      .order('id');
    
    if (error) throw error;
    
    // Get a random fun fact
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex] as FunFact;
  } catch (error) {
    console.error("Error fetching fun fact:", error);
    return mockFunFacts[0];
  }
};

export const getAllFunFacts = async (): Promise<FunFact[]> => {
  try {
    const { data, error } = await supabase
      .from('funfacts')
      .select('*')
      .order('id');
    
    if (error) throw error;
    return data as FunFact[];
  } catch (error) {
    console.error("Error fetching fun facts:", error);
    return mockFunFacts;
  }
};

export const updateFunFact = async (id: string, data: Partial<FunFact>): Promise<FunFact> => {
  try {
    const { data: updatedData, error } = await supabase
      .from('funfacts')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return updatedData as FunFact;
  } catch (error) {
    return handleSupabaseError(error, "Failed to update fun fact") || mockFunFacts[0];
  }
};

export const addFunFact = async (data: Omit<FunFact, 'id'>): Promise<FunFact> => {
  try {
    const newFunFact = { 
      ...data, 
      id: `fact-${Date.now()}` 
    };
    
    const { data: createdData, error } = await supabase
      .from('funfacts')
      .insert([newFunFact])
      .select()
      .single();
    
    if (error) throw error;
    return createdData as FunFact;
  } catch (error) {
    return handleSupabaseError(error, "Failed to add fun fact") || mockFunFacts[0];
  }
};

export const deleteFunFact = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('funfacts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    handleSupabaseError(error, "Failed to delete fun fact");
  }
};

// Static content (these don't change, so we keep them in the code)
export const getAsciiArt = async (): Promise<string> => asciiArt;
export const getHelpContent = async (): Promise<string> => helpContent;
export const getWelcomeMessage = async (): Promise<string> => welcomeMessage;
export const getNotFoundContent = async (): Promise<string> => notFoundContent;

// Theme management (kept in localStorage for better performance)
export const getTheme = async (): Promise<ThemeConfig> => {
  // Try to get from localStorage first
  const savedTheme = localStorage.getItem('terminal_theme');
  if (savedTheme) {
    currentTheme = JSON.parse(savedTheme);
  }
  return currentTheme;
};

export const setTheme = async (theme: string): Promise<ThemeConfig> => {
  switch (theme.toLowerCase()) {
    case 'light':
      currentTheme = {
        name: 'light',
        backgroundColor: '#f9fafb',
        foregroundColor: '#333333',
        accentColor: '#3b82f6'
      };
      break;
    case 'dark':
      currentTheme = {
        name: 'dark',
        backgroundColor: '#1e293b',
        foregroundColor: '#e2e8f0',
        accentColor: '#3b82f6'
      };
      break;
    case 'hacker':
    default:
      currentTheme = {
        name: 'hacker',
        backgroundColor: '#0d1117',
        foregroundColor: '#00FF00',
        accentColor: '#1C8CFF'
      };
      break;
  }
  
  // Save to localStorage for persistence
  localStorage.setItem('terminal_theme', JSON.stringify(currentTheme));
  return currentTheme;
};

// Resume download
export const downloadResume = async (): Promise<string> => {
  try {
    const about = await getAbout();
    const experiences = await getExperiences();
    const skills = await getSkills();
    const education = await getCertificates();
    
    // Generate resume content
    const resumeContent = `
# ${about.name} - ${about.title}

## Contact
Email: ${about.email}
Location: ${about.location}
${about.socialLinks.github ? `GitHub: ${about.socialLinks.github}` : ''}
${about.socialLinks.linkedin ? `LinkedIn: ${about.socialLinks.linkedin}` : ''}
${about.socialLinks.twitter ? `Twitter: ${about.socialLinks.twitter}` : ''}

## Professional Summary
${about.bio}

## Experience
${experiences.map(exp => `
### ${exp.position} at ${exp.company}
**${exp.duration}**
${exp.description}
`).join('\n')}

## Skills
${skills.map(skill => `- ${skill.name} (${skill.category})`).join('\n')}

## Education & Certifications
${education.map(cert => `- ${cert.title} (${cert.issuer}, ${cert.date})`).join('\n')}
`.trim();

    // In a real application, we might generate a PDF or save to Supabase storage
    // For now, let's create a downloadable text file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${about.name.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return "Resume download initiated successfully!";
  } catch (error) {
    console.error("Error generating resume:", error);
    throw new Error("Failed to generate resume");
  }
};
