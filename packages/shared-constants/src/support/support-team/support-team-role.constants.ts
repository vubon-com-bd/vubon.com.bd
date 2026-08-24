/**
 * Support Team Role Constants
 * Role definitions for support teams
 */

// Role Types
export const SUPPORT_TEAM_ROLE_TYPES = {
  AGENT: 'agent',
  SENIOR_AGENT: 'senior_agent',
  TEAM_LEAD: 'team_lead',
  SUPERVISOR: 'supervisor',
  MANAGER: 'manager',
  DIRECTOR: 'director',
} as const;

export type SupportTeamRoleType =
  (typeof SUPPORT_TEAM_ROLE_TYPES)[keyof typeof SUPPORT_TEAM_ROLE_TYPES];

// Role Levels (numeric)
export const SUPPORT_TEAM_ROLE_LEVELS = {
  AGENT: 1,
  SENIOR_AGENT: 2,
  TEAM_LEAD: 3,
  SUPERVISOR: 4,
  MANAGER: 5,
  DIRECTOR: 6,
} as const;

export type SupportTeamRoleLevel =
  (typeof SUPPORT_TEAM_ROLE_LEVELS)[keyof typeof SUPPORT_TEAM_ROLE_LEVELS];

// Role Permissions
export const SUPPORT_TEAM_ROLE_PERMISSIONS = {
  AGENT: ['view_tickets', 'create_tickets', 'update_own_tickets', 'reply_tickets'],
  SENIOR_AGENT: [
    'view_tickets',
    'create_tickets',
    'update_tickets',
    'reply_tickets',
    'assign_tickets',
  ],
  TEAM_LEAD: [
    'view_tickets',
    'create_tickets',
    'update_tickets',
    'reply_tickets',
    'assign_tickets',
    'escalate_tickets',
    'review_tickets',
  ],
  SUPERVISOR: [
    'view_tickets',
    'create_tickets',
    'update_tickets',
    'reply_tickets',
    'assign_tickets',
    'escalate_tickets',
    'review_tickets',
    'manage_team',
  ],
  MANAGER: [
    'view_tickets',
    'create_tickets',
    'update_tickets',
    'reply_tickets',
    'assign_tickets',
    'escalate_tickets',
    'review_tickets',
    'manage_team',
    'manage_agents',
    'manage_settings',
  ],
  DIRECTOR: [
    'view_tickets',
    'create_tickets',
    'update_tickets',
    'reply_tickets',
    'assign_tickets',
    'escalate_tickets',
    'review_tickets',
    'manage_team',
    'manage_agents',
    'manage_settings',
    'manage_department',
    'manage_budget',
  ],
};

export type SupportTeamRolePermission =
  (typeof SUPPORT_TEAM_ROLE_PERMISSIONS)[keyof typeof SUPPORT_TEAM_ROLE_PERMISSIONS][number];

// Role Responsibilities
export const SUPPORT_TEAM_ROLE_RESPONSIBILITIES = {
  AGENT: ['Handle tickets', 'Follow procedures', 'Escalate complex issues', 'Maintain CSAT'],
  SENIOR_AGENT: [
    'Handle complex tickets',
    'Mentor junior agents',
    'Handle escalations',
    'Quality assurance',
  ],
  TEAM_LEAD: ['Lead team', 'Monitor performance', 'Handle escalations', 'Team coordination'],
  SUPERVISOR: [
    'Supervise teams',
    'Manage escalations',
    'Ensure SLA compliance',
    'Team development',
  ],
  MANAGER: ['Manage department', 'Set strategies', 'Manage resources', 'Performance management'],
  DIRECTOR: [
    'Strategic planning',
    'Budget management',
    'Department leadership',
    'Stakeholder management',
  ],
};

// Role Qualifications
export const SUPPORT_TEAM_ROLE_QUALIFICATIONS = {
  AGENT: ['0-2 years experience', 'Basic product knowledge', 'Communication skills'],
  SENIOR_AGENT: ['2-4 years experience', 'Advanced product knowledge', 'Problem solving'],
  TEAM_LEAD: ['3-5 years experience', 'Leadership skills', 'Team management'],
  SUPERVISOR: ['5-7 years experience', 'Supervisory skills', 'Department management'],
  MANAGER: ['7-10 years experience', 'Strategic thinking', 'Business management'],
  DIRECTOR: ['10+ years experience', 'Executive leadership', 'Strategic planning'],
};

// Role Colors (for UI)
export const SUPPORT_TEAM_ROLE_COLORS = {
  AGENT: '#blue-400',
  SENIOR_AGENT: '#blue-500',
  TEAM_LEAD: '#orange-500',
  SUPERVISOR: '#red-500',
  MANAGER: '#red-600',
  DIRECTOR: '#purple-600',
} as const;

export type SupportTeamRoleColor =
  (typeof SUPPORT_TEAM_ROLE_COLORS)[keyof typeof SUPPORT_TEAM_ROLE_COLORS];

// Role Icons (for UI)
export const SUPPORT_TEAM_ROLE_ICONS = {
  AGENT: '👤',
  SENIOR_AGENT: '🌟',
  TEAM_LEAD: '👥',
  SUPERVISOR: '👔',
  MANAGER: '💼',
  DIRECTOR: '🏢',
} as const;

export type SupportTeamRoleIcon =
  (typeof SUPPORT_TEAM_ROLE_ICONS)[keyof typeof SUPPORT_TEAM_ROLE_ICONS];

// Utility Functions
export function supportTeamRoleGetLabel(role: SupportTeamRoleType): string {
  const labels: Record<SupportTeamRoleType, string> = {
    [SUPPORT_TEAM_ROLE_TYPES.AGENT]: 'Agent',
    [SUPPORT_TEAM_ROLE_TYPES.SENIOR_AGENT]: 'Senior Agent',
    [SUPPORT_TEAM_ROLE_TYPES.TEAM_LEAD]: 'Team Lead',
    [SUPPORT_TEAM_ROLE_TYPES.SUPERVISOR]: 'Supervisor',
    [SUPPORT_TEAM_ROLE_TYPES.MANAGER]: 'Manager',
    [SUPPORT_TEAM_ROLE_TYPES.DIRECTOR]: 'Director',
  };
  return labels[role] || 'Unknown';
}

export function supportTeamRoleGetLevel(role: SupportTeamRoleType): number {
  const levels: Record<SupportTeamRoleType, number> = {
    [SUPPORT_TEAM_ROLE_TYPES.AGENT]: SUPPORT_TEAM_ROLE_LEVELS.AGENT,
    [SUPPORT_TEAM_ROLE_TYPES.SENIOR_AGENT]: SUPPORT_TEAM_ROLE_LEVELS.SENIOR_AGENT,
    [SUPPORT_TEAM_ROLE_TYPES.TEAM_LEAD]: SUPPORT_TEAM_ROLE_LEVELS.TEAM_LEAD,
    [SUPPORT_TEAM_ROLE_TYPES.SUPERVISOR]: SUPPORT_TEAM_ROLE_LEVELS.SUPERVISOR,
    [SUPPORT_TEAM_ROLE_TYPES.MANAGER]: SUPPORT_TEAM_ROLE_LEVELS.MANAGER,
    [SUPPORT_TEAM_ROLE_TYPES.DIRECTOR]: SUPPORT_TEAM_ROLE_LEVELS.DIRECTOR,
  };
  return levels[role] || 1;
}

export function supportTeamRoleGetColor(role: SupportTeamRoleType): SupportTeamRoleColor {
  const colors: Record<SupportTeamRoleType, SupportTeamRoleColor> = {
    [SUPPORT_TEAM_ROLE_TYPES.AGENT]: SUPPORT_TEAM_ROLE_COLORS.AGENT,
    [SUPPORT_TEAM_ROLE_TYPES.SENIOR_AGENT]: SUPPORT_TEAM_ROLE_COLORS.SENIOR_AGENT,
    [SUPPORT_TEAM_ROLE_TYPES.TEAM_LEAD]: SUPPORT_TEAM_ROLE_COLORS.TEAM_LEAD,
    [SUPPORT_TEAM_ROLE_TYPES.SUPERVISOR]: SUPPORT_TEAM_ROLE_COLORS.SUPERVISOR,
    [SUPPORT_TEAM_ROLE_TYPES.MANAGER]: SUPPORT_TEAM_ROLE_COLORS.MANAGER,
    [SUPPORT_TEAM_ROLE_TYPES.DIRECTOR]: SUPPORT_TEAM_ROLE_COLORS.DIRECTOR,
  };
  return colors[role] || '#gray-400';
}

export function supportTeamRoleGetIcon(role: SupportTeamRoleType): SupportTeamRoleIcon {
  const icons: Record<SupportTeamRoleType, SupportTeamRoleIcon> = {
    [SUPPORT_TEAM_ROLE_TYPES.AGENT]: SUPPORT_TEAM_ROLE_ICONS.AGENT,
    [SUPPORT_TEAM_ROLE_TYPES.SENIOR_AGENT]: SUPPORT_TEAM_ROLE_ICONS.SENIOR_AGENT,
    [SUPPORT_TEAM_ROLE_TYPES.TEAM_LEAD]: SUPPORT_TEAM_ROLE_ICONS.TEAM_LEAD,
    [SUPPORT_TEAM_ROLE_TYPES.SUPERVISOR]: SUPPORT_TEAM_ROLE_ICONS.SUPERVISOR,
    [SUPPORT_TEAM_ROLE_TYPES.MANAGER]: SUPPORT_TEAM_ROLE_ICONS.MANAGER,
    [SUPPORT_TEAM_ROLE_TYPES.DIRECTOR]: SUPPORT_TEAM_ROLE_ICONS.DIRECTOR,
  };
  return icons[role] || '👤';
}

export function supportTeamRoleGetResponsibilities(role: SupportTeamRoleType): string[] {
  const responsibilities: Record<SupportTeamRoleType, string[]> = {
    [SUPPORT_TEAM_ROLE_TYPES.AGENT]: SUPPORT_TEAM_ROLE_RESPONSIBILITIES.AGENT,
    [SUPPORT_TEAM_ROLE_TYPES.SENIOR_AGENT]: SUPPORT_TEAM_ROLE_RESPONSIBILITIES.SENIOR_AGENT,
    [SUPPORT_TEAM_ROLE_TYPES.TEAM_LEAD]: SUPPORT_TEAM_ROLE_RESPONSIBILITIES.TEAM_LEAD,
    [SUPPORT_TEAM_ROLE_TYPES.SUPERVISOR]: SUPPORT_TEAM_ROLE_RESPONSIBILITIES.SUPERVISOR,
    [SUPPORT_TEAM_ROLE_TYPES.MANAGER]: SUPPORT_TEAM_ROLE_RESPONSIBILITIES.MANAGER,
    [SUPPORT_TEAM_ROLE_TYPES.DIRECTOR]: SUPPORT_TEAM_ROLE_RESPONSIBILITIES.DIRECTOR,
  };
  return responsibilities[role] || [];
}

export function supportTeamRoleGetPermissions(role: SupportTeamRoleType): string[] {
  const permissions: Record<SupportTeamRoleType, string[]> = {
    [SUPPORT_TEAM_ROLE_TYPES.AGENT]: SUPPORT_TEAM_ROLE_PERMISSIONS.AGENT,
    [SUPPORT_TEAM_ROLE_TYPES.SENIOR_AGENT]: SUPPORT_TEAM_ROLE_PERMISSIONS.SENIOR_AGENT,
    [SUPPORT_TEAM_ROLE_TYPES.TEAM_LEAD]: SUPPORT_TEAM_ROLE_PERMISSIONS.TEAM_LEAD,
    [SUPPORT_TEAM_ROLE_TYPES.SUPERVISOR]: SUPPORT_TEAM_ROLE_PERMISSIONS.SUPERVISOR,
    [SUPPORT_TEAM_ROLE_TYPES.MANAGER]: SUPPORT_TEAM_ROLE_PERMISSIONS.MANAGER,
    [SUPPORT_TEAM_ROLE_TYPES.DIRECTOR]: SUPPORT_TEAM_ROLE_PERMISSIONS.DIRECTOR,
  };
  return permissions[role] || [];
}

export function supportTeamRoleHasPermission(
  role: SupportTeamRoleType,
  permission: string
): boolean {
  const permissions = supportTeamRoleGetPermissions(role);
  return permissions.includes(permission);
}
