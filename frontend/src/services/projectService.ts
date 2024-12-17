import { Project } from '../types/project';

// Simule une API backend
const mockProjects: Project[] = [
  {
    id: 1,
    name: 'Installation Panneaux Solaires - Site A',
    description: 'Installation de 100 panneaux solaires sur le site industriel A',
    status: 'En cours',
    progress: 75,
    budget: 150000,
    deadline: new Date('2024-03-15'),
    team: [
      { id: 1, name: 'Jean Martin', avatar: '' },
      { id: 2, name: 'Marie Dubois', avatar: '' },
    ],
    completedTasks: 15,
    totalTasks: 20,
  },
  {
    id: 2,
    name: 'Maintenance Éolienne - Parc Nord',
    description: 'Maintenance préventive des éoliennes du parc Nord',
    status: 'En pause',
    progress: 30,
    budget: 75000,
    deadline: new Date('2024-02-28'),
    team: [
      { id: 3, name: 'Pierre Durand', avatar: '' },
      { id: 4, name: 'Sophie Leroy', avatar: '' },
    ],
    completedTasks: 6,
    totalTasks: 12,
  },
  {
    id: 3,
    name: 'Audit Énergétique - Client XYZ',
    description: 'Audit complet des installations énergétiques',
    status: 'Terminé',
    progress: 100,
    budget: 45000,
    deadline: new Date('2024-01-30'),
    team: [
      { id: 5, name: 'Luc Bernard', avatar: '' },
    ],
    completedTasks: 8,
    totalTasks: 8,
  },
];

class ProjectService {
  async getProjects(): Promise<Project[]> {
    // Simule un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProjects);
      }, 500);
    });
  }

  async getProject(id: number): Promise<Project | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProjects.find(p => p.id === id));
      }, 300);
    });
  }

  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    return new Promise((resolve) => {
      const newProject = {
        ...project,
        id: Math.max(...mockProjects.map(p => p.id)) + 1,
      };
      mockProjects.push(newProject);
      setTimeout(() => {
        resolve(newProject);
      }, 500);
    });
  }

  async updateProject(id: number, project: Partial<Project>): Promise<Project> {
    return new Promise((resolve, reject) => {
      const index = mockProjects.findIndex(p => p.id === id);
      if (index === -1) {
        reject(new Error('Project not found'));
        return;
      }
      
      mockProjects[index] = {
        ...mockProjects[index],
        ...project,
      };
      
      setTimeout(() => {
        resolve(mockProjects[index]);
      }, 500);
    });
  }

  async deleteProject(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = mockProjects.findIndex(p => p.id === id);
      if (index === -1) {
        reject(new Error('Project not found'));
        return;
      }
      
      mockProjects.splice(index, 1);
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
}

export const projectService = new ProjectService();
