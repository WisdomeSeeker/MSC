export interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  department: string;
  joinDate: Date;
  skills: string[];
  projectIds: number[];
  status: 'active' | 'inactive';
}

export interface Team {
  id: number;
  name: string;
  description: string;
  leader: TeamMember;
  members: TeamMember[];
  projectIds: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  managerId: number;
  teamIds: number[];
}

export interface Skill {
  id: number;
  name: string;
  category: string;
}
