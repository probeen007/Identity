
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataTable from './DataTable';
import { Project, Skill, Experience, Certificate, Recommendation, FunFact } from '@/types';

interface ContentTabsProps {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  certificates: Certificate[];
  recommendations: Recommendation[];
  funFacts: FunFact[];
  onAdd: (type: 'project' | 'skill' | 'experience' | 'certificate' | 'recommendation' | 'funfact') => void;
  onEdit: (type: 'project' | 'skill' | 'experience' | 'certificate' | 'recommendation' | 'funfact', id: string) => void;
  onDelete: (type: 'project' | 'skill' | 'experience' | 'certificate' | 'recommendation' | 'funfact', id: string) => void;
}

const ContentTabs = ({
  projects,
  skills,
  experiences,
  certificates,
  recommendations,
  funFacts,
  onAdd,
  onEdit,
  onDelete
}: ContentTabsProps) => {
  return (
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
        <DataTable 
          title="Projects"
          onAdd={() => onAdd('project')}
          onEdit={(id) => onEdit('project', id)}
          onDelete={(id) => onDelete('project', id)}
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'description', label: 'Description' },
            { key: 'technologies', label: 'Technologies' }
          ]}
          data={projects}
        />
      </TabsContent>
      
      <TabsContent value="skills">
        <DataTable 
          title="Skills"
          onAdd={() => onAdd('skill')}
          onEdit={(id) => onEdit('skill', id)}
          onDelete={(id) => onDelete('skill', id)}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'category', label: 'Category' },
            { 
              key: 'level', 
              label: 'Level',
              render: (value) => (
                <div className="w-full bg-hacker-dark rounded h-2">
                  <div 
                    className="bg-terminal-accent h-2 rounded"
                    style={{ width: `${value}%` }}
                  />
                </div>
              )
            }
          ]}
          data={skills}
        />
      </TabsContent>
      
      <TabsContent value="experience">
        <DataTable 
          title="Experiences"
          onAdd={() => onAdd('experience')}
          onEdit={(id) => onEdit('experience', id)}
          onDelete={(id) => onDelete('experience', id)}
          columns={[
            { key: 'company', label: 'Company' },
            { key: 'position', label: 'Position' },
            { key: 'duration', label: 'Duration' }
          ]}
          data={experiences}
        />
      </TabsContent>
      
      <TabsContent value="certificates">
        <DataTable 
          title="Certificates"
          onAdd={() => onAdd('certificate')}
          onEdit={(id) => onEdit('certificate', id)}
          onDelete={(id) => onDelete('certificate', id)}
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'issuer', label: 'Issuer' },
            { key: 'date', label: 'Date' }
          ]}
          data={certificates}
        />
      </TabsContent>
      
      <TabsContent value="recommendations">
        <DataTable 
          title="Recommendations"
          onAdd={() => onAdd('recommendation')}
          onEdit={(id) => onEdit('recommendation', id)}
          onDelete={(id) => onDelete('recommendation', id)}
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'position', label: 'Position' },
            { key: 'company', label: 'Company' }
          ]}
          data={recommendations}
        />
      </TabsContent>
      
      <TabsContent value="funfacts">
        <DataTable 
          title="Fun Facts"
          onAdd={() => onAdd('funfact')}
          onEdit={(id) => onEdit('funfact', id)}
          onDelete={(id) => onDelete('funfact', id)}
          columns={[
            { key: 'text', label: 'Text' }
          ]}
          data={funFacts}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ContentTabs;
