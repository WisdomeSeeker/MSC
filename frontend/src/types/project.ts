export enum ProjectStatus {
  ACTIVE = 'En cours',
  ON_HOLD = 'En pause',
  COMPLETED = 'Terminé',
  CANCELLED = 'Annulé'
}

export interface TeamMember {
  id: number;
  name: string;
  avatar: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  progress: number;
  budget: number;
  deadline: Date;
  team: TeamMember[];
  completedTasks: number;
  totalTasks: number;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  assignee?: string;
  dueDate?: string;
  createdAt: Date;
  updatedAt: Date;
}
