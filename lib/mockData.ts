export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  managerId?: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'planning';
  description: string;
  teamMembers: string[]; // user IDs
}

export const mockUsers: Record<string, User> = {
  'evan-park': {
    id: 'evan-park',
    firstName: 'Evan',
    lastName: 'Park',
    email: 'evan.park@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Evan',
    role: 'Senior Product Designer',
    department: 'Design',
    managerId: 'jane-smith',
  },
  'jane-smith': {
    id: 'jane-smith',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    role: 'Design Director',
    department: 'Design',
    managerId: 'sarah-chen',
  },
  'sarah-chen': {
    id: 'sarah-chen',
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    role: 'VP of Design',
    department: 'Design',
  },
  'mike-johnson': {
    id: 'mike-johnson',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    role: 'Senior Engineer',
    department: 'Engineering',
    managerId: 'jane-smith',
  },
};

export const mockProjects: Record<string, Project> = {
  'ai-features': {
    id: 'ai-features',
    name: 'AI Features Demo',
    status: 'active',
    description: 'Building conversational AI interface with custom components',
    teamMembers: ['evan-park', 'mike-johnson', 'jane-smith'],
  },
  'design-system': {
    id: 'design-system',
    name: 'Design System 2.0',
    status: 'planning',
    description: 'Refreshing the component library with new tokens',
    teamMembers: ['evan-park', 'jane-smith'],
  },
};

// Helper functions
export function getUserById(id: string): User | undefined {
  return mockUsers[id];
}

export function getProjectById(id: string): Project | undefined {
  return mockProjects[id];
}

export function getUserManager(userId: string): User | undefined {
  const user = getUserById(userId);
  if (!user?.managerId) return undefined;
  return getUserById(user.managerId);
}

export function getProjectsByUserId(userId: string): Project[] {
  return Object.values(mockProjects).filter(project =>
    project.teamMembers.includes(userId)
  );
}