/**
 * Support Agent Role Constants
 * Role definitions for support agents
 */

export const SUPPORT_AGENT_ROLE = {
  // Role Types
  TYPES: {
    JUNIOR: 'junior',
    SENIOR: 'senior',
    EXPERT: 'expert',
    LEAD: 'lead',
    SUPERVISOR: 'supervisor',
    MANAGER: 'manager',
  } as const,

  // Role Levels (numeric)
  LEVELS: {
    JUNIOR: 1,
    SENIOR: 2,
    EXPERT: 3,
    LEAD: 4,
    SUPERVISOR: 5,
    MANAGER: 6,
  } as const,

  // Role Permissions
  PERMISSIONS: {
    JUNIOR: ['view_tickets', 'create_tickets', 'update_own_tickets'] as string[],
    SENIOR: ['view_tickets', 'create_tickets', 'update_tickets', 'assign_tickets'] as string[],
    EXPERT: [
      'view_tickets',
      'create_tickets',
      'update_tickets',
      'assign_tickets',
      'escalate_tickets',
    ] as string[],
    LEAD: [
      'view_tickets',
      'create_tickets',
      'update_tickets',
      'assign_tickets',
      'escalate_tickets',
      'review_tickets',
    ] as string[],
    SUPERVISOR: [
      'view_tickets',
      'create_tickets',
      'update_tickets',
      'assign_tickets',
      'escalate_tickets',
      'review_tickets',
      'manage_team',
    ] as string[],
    MANAGER: [
      'view_tickets',
      'create_tickets',
      'update_tickets',
      'assign_tickets',
      'escalate_tickets',
      'review_tickets',
      'manage_team',
      'manage_agents',
      'manage_settings',
    ] as string[],
  },

  // Role Responsibilities
  RESPONSIBILITIES: {
    JUNIOR: [
      'Handle simple tickets',
      'Follow standard procedures',
      'Escalate complex issues',
    ] as string[],
    SENIOR: [
      'Handle complex tickets',
      'Mentor junior agents',
      'Handle escalated tickets',
    ] as string[],
    EXPERT: [
      'Handle expert-level issues',
      'Train other agents',
      'Create knowledge base articles',
    ] as string[],
    LEAD: ['Lead team of agents', 'Monitor team performance', 'Handle critical issues'] as string[],
    SUPERVISOR: [
      'Supervise multiple teams',
      'Manage escalations',
      'Ensure SLA compliance',
    ] as string[],
    MANAGER: [
      'Manage department',
      'Set strategies and goals',
      'Manage budgets and resources',
    ] as string[],
  },

  // Role Qualifications
  QUALIFICATIONS: {
    JUNIOR: [
      '0-2 years experience',
      'Basic product knowledge',
      'Basic communication skills',
    ] as string[],
    SENIOR: [
      '2-4 years experience',
      'Advanced product knowledge',
      'Excellent communication skills',
    ] as string[],
    EXPERT: [
      '4-6 years experience',
      'Expert product knowledge',
      'Advanced problem solving',
    ] as string[],
    LEAD: ['3-5 years experience', 'Leadership skills', 'Team management experience'] as string[],
    SUPERVISOR: [
      '5-7 years experience',
      'Supervisory skills',
      'Department management experience',
    ] as string[],
    MANAGER: [
      '7+ years experience',
      'Strategic thinking',
      'Business management experience',
    ] as string[],
  },

  // Role Colors (for UI)
  COLORS: {
    JUNIOR: '#blue-400',
    SENIOR: '#blue-500',
    EXPERT: '#purple-500',
    LEAD: '#orange-500',
    SUPERVISOR: '#red-500',
    MANAGER: '#red-600',
  } as const,

  // Role Icons (for UI)
  ICONS: {
    JUNIOR: '🌟',
    SENIOR: '⭐',
    EXPERT: '🏆',
    LEAD: '👥',
    SUPERVISOR: '👔',
    MANAGER: '💼',
  } as const,
} as const;

// Role Types
export type SupportAgentRoleType =
  (typeof SUPPORT_AGENT_ROLE.TYPES)[keyof typeof SUPPORT_AGENT_ROLE.TYPES];

// Role Levels
export type SupportAgentRoleLevel =
  (typeof SUPPORT_AGENT_ROLE.LEVELS)[keyof typeof SUPPORT_AGENT_ROLE.LEVELS];

// Role Permissions
export type SupportAgentRolePermission = string;

// Role Colors
export type SupportAgentRoleColor =
  (typeof SUPPORT_AGENT_ROLE.COLORS)[keyof typeof SUPPORT_AGENT_ROLE.COLORS];

// Role Icons
export type SupportAgentRoleIcon =
  (typeof SUPPORT_AGENT_ROLE.ICONS)[keyof typeof SUPPORT_AGENT_ROLE.ICONS];

// Utility Functions
export function supportAgentRoleGetLabel(role: SupportAgentRoleType): string {
  const labels: Record<SupportAgentRoleType, string> = {
    [SUPPORT_AGENT_ROLE.TYPES.JUNIOR]: 'Junior Agent',
    [SUPPORT_AGENT_ROLE.TYPES.SENIOR]: 'Senior Agent',
    [SUPPORT_AGENT_ROLE.TYPES.EXPERT]: 'Expert Agent',
    [SUPPORT_AGENT_ROLE.TYPES.LEAD]: 'Team Lead',
    [SUPPORT_AGENT_ROLE.TYPES.SUPERVISOR]: 'Supervisor',
    [SUPPORT_AGENT_ROLE.TYPES.MANAGER]: 'Manager',
  };
  return labels[role] || 'Unknown';
}

export function supportAgentRoleGetLevel(role: SupportAgentRoleType): number {
  const levels: Record<SupportAgentRoleType, number> = {
    [SUPPORT_AGENT_ROLE.TYPES.JUNIOR]: SUPPORT_AGENT_ROLE.LEVELS.JUNIOR,
    [SUPPORT_AGENT_ROLE.TYPES.SENIOR]: SUPPORT_AGENT_ROLE.LEVELS.SENIOR,
    [SUPPORT_AGENT_ROLE.TYPES.EXPERT]: SUPPORT_AGENT_ROLE.LEVELS.EXPERT,
    [SUPPORT_AGENT_ROLE.TYPES.LEAD]: SUPPORT_AGENT_ROLE.LEVELS.LEAD,
    [SUPPORT_AGENT_ROLE.TYPES.SUPERVISOR]: SUPPORT_AGENT_ROLE.LEVELS.SUPERVISOR,
    [SUPPORT_AGENT_ROLE.TYPES.MANAGER]: SUPPORT_AGENT_ROLE.LEVELS.MANAGER,
  };
  return levels[role] || 1;
}

export function supportAgentRoleGetColor(role: SupportAgentRoleType): SupportAgentRoleColor {
  const colors: Record<SupportAgentRoleType, SupportAgentRoleColor> = {
    [SUPPORT_AGENT_ROLE.TYPES.JUNIOR]: SUPPORT_AGENT_ROLE.COLORS.JUNIOR,
    [SUPPORT_AGENT_ROLE.TYPES.SENIOR]: SUPPORT_AGENT_ROLE.COLORS.SENIOR,
    [SUPPORT_AGENT_ROLE.TYPES.EXPERT]: SUPPORT_AGENT_ROLE.COLORS.EXPERT,
    [SUPPORT_AGENT_ROLE.TYPES.LEAD]: SUPPORT_AGENT_ROLE.COLORS.LEAD,
    [SUPPORT_AGENT_ROLE.TYPES.SUPERVISOR]: SUPPORT_AGENT_ROLE.COLORS.SUPERVISOR,
    [SUPPORT_AGENT_ROLE.TYPES.MANAGER]: SUPPORT_AGENT_ROLE.COLORS.MANAGER,
  };
  return colors[role] || '#gray-400';
}

export function supportAgentRoleGetIcon(role: SupportAgentRoleType): SupportAgentRoleIcon {
  const icons: Record<SupportAgentRoleType, SupportAgentRoleIcon> = {
    [SUPPORT_AGENT_ROLE.TYPES.JUNIOR]: SUPPORT_AGENT_ROLE.ICONS.JUNIOR,
    [SUPPORT_AGENT_ROLE.TYPES.SENIOR]: SUPPORT_AGENT_ROLE.ICONS.SENIOR,
    [SUPPORT_AGENT_ROLE.TYPES.EXPERT]: SUPPORT_AGENT_ROLE.ICONS.EXPERT,
    [SUPPORT_AGENT_ROLE.TYPES.LEAD]: SUPPORT_AGENT_ROLE.ICONS.LEAD,
    [SUPPORT_AGENT_ROLE.TYPES.SUPERVISOR]: SUPPORT_AGENT_ROLE.ICONS.SUPERVISOR,
    [SUPPORT_AGENT_ROLE.TYPES.MANAGER]: SUPPORT_AGENT_ROLE.ICONS.MANAGER,
  };
  return icons[role] || '🌟';
}

export function supportAgentRoleGetResponsibilities(role: SupportAgentRoleType): string[] {
  const responsibilities: Record<SupportAgentRoleType, string[]> = {
    [SUPPORT_AGENT_ROLE.TYPES.JUNIOR]: SUPPORT_AGENT_ROLE.RESPONSIBILITIES.JUNIOR,
    [SUPPORT_AGENT_ROLE.TYPES.SENIOR]: SUPPORT_AGENT_ROLE.RESPONSIBILITIES.SENIOR,
    [SUPPORT_AGENT_ROLE.TYPES.EXPERT]: SUPPORT_AGENT_ROLE.RESPONSIBILITIES.EXPERT,
    [SUPPORT_AGENT_ROLE.TYPES.LEAD]: SUPPORT_AGENT_ROLE.RESPONSIBILITIES.LEAD,
    [SUPPORT_AGENT_ROLE.TYPES.SUPERVISOR]: SUPPORT_AGENT_ROLE.RESPONSIBILITIES.SUPERVISOR,
    [SUPPORT_AGENT_ROLE.TYPES.MANAGER]: SUPPORT_AGENT_ROLE.RESPONSIBILITIES.MANAGER,
  };
  return responsibilities[role] || [];
}

export function supportAgentRoleGetPermissions(role: SupportAgentRoleType): string[] {
  const permissions: Record<SupportAgentRoleType, string[]> = {
    [SUPPORT_AGENT_ROLE.TYPES.JUNIOR]: SUPPORT_AGENT_ROLE.PERMISSIONS.JUNIOR,
    [SUPPORT_AGENT_ROLE.TYPES.SENIOR]: SUPPORT_AGENT_ROLE.PERMISSIONS.SENIOR,
    [SUPPORT_AGENT_ROLE.TYPES.EXPERT]: SUPPORT_AGENT_ROLE.PERMISSIONS.EXPERT,
    [SUPPORT_AGENT_ROLE.TYPES.LEAD]: SUPPORT_AGENT_ROLE.PERMISSIONS.LEAD,
    [SUPPORT_AGENT_ROLE.TYPES.SUPERVISOR]: SUPPORT_AGENT_ROLE.PERMISSIONS.SUPERVISOR,
    [SUPPORT_AGENT_ROLE.TYPES.MANAGER]: SUPPORT_AGENT_ROLE.PERMISSIONS.MANAGER,
  };
  return permissions[role] || [];
}

export function supportAgentRoleHasPermission(
  role: SupportAgentRoleType,
  permission: string
): boolean {
  const permissions = supportAgentRoleGetPermissions(role);
  return permissions.includes(permission);
}
