import { Team, TeamMember } from '../types/team';

// Données de démonstration
const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Jean Martin',
    email: 'jean.martin@example.com',
    role: 'Chef de projet',
    avatar: '',
    department: 'Ingénierie',
    joinDate: new Date('2023-01-15'),
    skills: ['Gestion de projet', 'Énergie solaire', 'Audit énergétique'],
    projectIds: [1, 2],
    status: 'active',
  },
  {
    id: 2,
    name: 'Marie Dubois',
    email: 'marie.dubois@example.com',
    role: 'Ingénieur énergétique',
    avatar: '',
    department: 'Ingénierie',
    joinDate: new Date('2023-03-01'),
    skills: ['Énergie éolienne', 'Simulation énergétique'],
    projectIds: [1],
    status: 'active',
  },
  {
    id: 3,
    name: 'Pierre Durand',
    email: 'pierre.durand@example.com',
    role: 'Technicien',
    avatar: '',
    department: 'Maintenance',
    joinDate: new Date('2023-02-15'),
    skills: ['Maintenance préventive', 'Installation solaire'],
    projectIds: [2],
    status: 'active',
  },
];

const mockTeams: Team[] = [
  {
    id: 1,
    name: 'Équipe Énergie Solaire',
    description: 'Spécialisée dans les projets d\'installation solaire et photovoltaïque',
    leader: mockTeamMembers[0],
    members: [mockTeamMembers[0], mockTeamMembers[1]],
    projectIds: [1],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 2,
    name: 'Équipe Maintenance',
    description: 'Responsable de la maintenance des installations énergétiques',
    leader: mockTeamMembers[2],
    members: [mockTeamMembers[2]],
    projectIds: [2],
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

class TeamService {
  async getTeams(): Promise<Team[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTeams);
      }, 500);
    });
  }

  async getTeam(id: number): Promise<Team | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTeams.find(t => t.id === id));
      }, 300);
    });
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTeamMembers);
      }, 300);
    });
  }

  async getTeamMember(id: number): Promise<TeamMember | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockTeamMembers.find(m => m.id === id));
      }, 200);
    });
  }

  async createTeam(team: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>): Promise<Team> {
    return new Promise((resolve) => {
      const newTeam: Team = {
        ...team,
        id: Math.max(...mockTeams.map(t => t.id)) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockTeams.push(newTeam);
      setTimeout(() => {
        resolve(newTeam);
      }, 500);
    });
  }

  async updateTeam(id: number, updates: Partial<Team>): Promise<Team> {
    return new Promise((resolve, reject) => {
      const index = mockTeams.findIndex(t => t.id === id);
      if (index === -1) {
        reject(new Error('Team not found'));
        return;
      }

      mockTeams[index] = {
        ...mockTeams[index],
        ...updates,
        updatedAt: new Date(),
      };

      setTimeout(() => {
        resolve(mockTeams[index]);
      }, 500);
    });
  }

  async deleteTeam(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = mockTeams.findIndex(t => t.id === id);
      if (index === -1) {
        reject(new Error('Team not found'));
        return;
      }

      mockTeams.splice(index, 1);
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }

  async addTeamMember(teamId: number, member: Omit<TeamMember, 'id'>): Promise<TeamMember> {
    return new Promise((resolve, reject) => {
      const team = mockTeams.find(t => t.id === teamId);
      if (!team) {
        reject(new Error('Team not found'));
        return;
      }

      const newMember: TeamMember = {
        ...member,
        id: Math.max(...mockTeamMembers.map(m => m.id)) + 1,
      };
      mockTeamMembers.push(newMember);
      team.members.push(newMember);

      setTimeout(() => {
        resolve(newMember);
      }, 500);
    });
  }

  async removeTeamMember(teamId: number, memberId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const team = mockTeams.find(t => t.id === teamId);
      if (!team) {
        reject(new Error('Team not found'));
        return;
      }

      const memberIndex = team.members.findIndex(m => m.id === memberId);
      if (memberIndex === -1) {
        reject(new Error('Member not found in team'));
        return;
      }

      team.members.splice(memberIndex, 1);
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }
}

export const teamService = new TeamService();
