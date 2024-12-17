import { User, LoginResponse, UserRole } from '../types/user';

class AuthService {
  private mockUser: User = {
    id: '1',
    email: 'admin@msc.com',
    name: 'Admin User',
    role: UserRole.ADMIN,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  private token: string | null = null;

  async login(email: string, password: string): Promise<LoginResponse> {
    // Mock login validation
    if (email !== 'admin@msc.com' || password !== 'admin123') {
      throw new Error('Email ou mot de passe incorrect');
    }

    this.token = 'mock-jwt-token';
    localStorage.setItem('token', this.token);
    return { user: this.mockUser, token: this.token };
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('token');
    return token ? this.mockUser : null;
  }
}

export const authService = new AuthService();
