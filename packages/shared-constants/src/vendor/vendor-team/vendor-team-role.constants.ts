/**
 * Vendor Team Role Constants
 * Role definitions for vendor teams
 */

// Role Types
export const VENDOR_TEAM_ROLE_TYPES = {
  MEMBER: 'member',
  SENIOR: 'senior',
  LEAD: 'lead',
  MANAGER: 'manager',
  DIRECTOR: 'director',
} as const;

export type VendorTeamRoleType =
  (typeof VENDOR_TEAM_ROLE_TYPES)[keyof typeof VENDOR_TEAM_ROLE_TYPES];

// Role Levels (numeric)
export const VENDOR_TEAM_ROLE_LEVELS = {
  MEMBER: 1,
  SENIOR: 2,
  LEAD: 3,
  MANAGER: 4,
  DIRECTOR: 5,
} as const;

export type VendorTeamRoleLevel =
  (typeof VENDOR_TEAM_ROLE_LEVELS)[keyof typeof VENDOR_TEAM_ROLE_LEVELS];

// Role Permissions
export const VENDOR_TEAM_ROLE_PERMISSIONS = {
  MEMBER: ['view', 'create', 'edit_own'],
  SENIOR: ['view', 'create', 'edit', 'delete_own'],
  LEAD: ['view', 'create', 'edit', 'delete', 'assign', 'review'],
  MANAGER: ['view', 'create', 'edit', 'delete', 'assign', 'review', 'manage_team'],
  DIRECTOR: [
    'view',
    'create',
    'edit',
    'delete',
    'assign',
    'review',
    'manage_team',
    'manage_budget',
  ],
};

export type VendorTeamRolePermission =
  (typeof VENDOR_TEAM_ROLE_PERMISSIONS)[keyof typeof VENDOR_TEAM_ROLE_PERMISSIONS][number];

// Role Responsibilities
export const VENDOR_TEAM_ROLE_RESPONSIBILITIES = {
  MEMBER: ['Execute tasks', 'Follow procedures', 'Report to lead'],
  SENIOR: ['Execute complex tasks', 'Mentor juniors', 'Lead projects'],
  LEAD: ['Lead team', 'Coordinate tasks', 'Report to manager'],
  MANAGER: ['Manage team', 'Strategic planning', 'Budget management'],
  DIRECTOR: ['Department leadership', 'Strategic direction', 'Stakeholder management'],
};

// Role Colors (for UI)
export const VENDOR_TEAM_ROLE_COLORS = {
  MEMBER: '#blue-400',
  SENIOR: '#blue-500',
  LEAD: '#orange-500',
  MANAGER: '#red-500',
  DIRECTOR: '#purple-600',
} as const;

export type VendorTeamRoleColor =
  (typeof VENDOR_TEAM_ROLE_COLORS)[keyof typeof VENDOR_TEAM_ROLE_COLORS];

// Role Icons (for UI)
export const VENDOR_TEAM_ROLE_ICONS = {
  MEMBER: '👤',
  SENIOR: '🌟',
  LEAD: '👥',
  MANAGER: '💼',
  DIRECTOR: '🏢',
} as const;

export type VendorTeamRoleIcon =
  (typeof VENDOR_TEAM_ROLE_ICONS)[keyof typeof VENDOR_TEAM_ROLE_ICONS];

// Utility Functions
export function vendorTeamRoleGetLabel(role: VendorTeamRoleType): string {
  const labels: Record<VendorTeamRoleType, string> = {
    [VENDOR_TEAM_ROLE_TYPES.MEMBER]: 'Member',
    [VENDOR_TEAM_ROLE_TYPES.SENIOR]: 'Senior',
    [VENDOR_TEAM_ROLE_TYPES.LEAD]: 'Team Lead',
    [VENDOR_TEAM_ROLE_TYPES.MANAGER]: 'Manager',
    [VENDOR_TEAM_ROLE_TYPES.DIRECTOR]: 'Director',
  };
  return labels[role] || 'Unknown';
}

export function vendorTeamRoleGetLevel(role: VendorTeamRoleType): number {
  const levels: Record<VendorTeamRoleType, number> = {
    [VENDOR_TEAM_ROLE_TYPES.MEMBER]: VENDOR_TEAM_ROLE_LEVELS.MEMBER,
    [VENDOR_TEAM_ROLE_TYPES.SENIOR]: VENDOR_TEAM_ROLE_LEVELS.SENIOR,
    [VENDOR_TEAM_ROLE_TYPES.LEAD]: VENDOR_TEAM_ROLE_LEVELS.LEAD,
    [VENDOR_TEAM_ROLE_TYPES.MANAGER]: VENDOR_TEAM_ROLE_LEVELS.MANAGER,
    [VENDOR_TEAM_ROLE_TYPES.DIRECTOR]: VENDOR_TEAM_ROLE_LEVELS.DIRECTOR,
  };
  return levels[role] || 1;
}

export function vendorTeamRoleGetColor(role: VendorTeamRoleType): VendorTeamRoleColor {
  const colors: Record<VendorTeamRoleType, VendorTeamRoleColor> = {
    [VENDOR_TEAM_ROLE_TYPES.MEMBER]: VENDOR_TEAM_ROLE_COLORS.MEMBER,
    [VENDOR_TEAM_ROLE_TYPES.SENIOR]: VENDOR_TEAM_ROLE_COLORS.SENIOR,
    [VENDOR_TEAM_ROLE_TYPES.LEAD]: VENDOR_TEAM_ROLE_COLORS.LEAD,
    [VENDOR_TEAM_ROLE_TYPES.MANAGER]: VENDOR_TEAM_ROLE_COLORS.MANAGER,
    [VENDOR_TEAM_ROLE_TYPES.DIRECTOR]: VENDOR_TEAM_ROLE_COLORS.DIRECTOR,
  };
  return colors[role] || '#gray-400';
}

export function vendorTeamRoleGetIcon(role: VendorTeamRoleType): VendorTeamRoleIcon {
  const icons: Record<VendorTeamRoleType, VendorTeamRoleIcon> = {
    [VENDOR_TEAM_ROLE_TYPES.MEMBER]: VENDOR_TEAM_ROLE_ICONS.MEMBER,
    [VENDOR_TEAM_ROLE_TYPES.SENIOR]: VENDOR_TEAM_ROLE_ICONS.SENIOR,
    [VENDOR_TEAM_ROLE_TYPES.LEAD]: VENDOR_TEAM_ROLE_ICONS.LEAD,
    [VENDOR_TEAM_ROLE_TYPES.MANAGER]: VENDOR_TEAM_ROLE_ICONS.MANAGER,
    [VENDOR_TEAM_ROLE_TYPES.DIRECTOR]: VENDOR_TEAM_ROLE_ICONS.DIRECTOR,
  };
  return icons[role] || '👤';
}

export function vendorTeamRoleGetPermissions(role: VendorTeamRoleType): string[] {
  const permissions: Record<VendorTeamRoleType, string[]> = {
    [VENDOR_TEAM_ROLE_TYPES.MEMBER]: VENDOR_TEAM_ROLE_PERMISSIONS.MEMBER,
    [VENDOR_TEAM_ROLE_TYPES.SENIOR]: VENDOR_TEAM_ROLE_PERMISSIONS.SENIOR,
    [VENDOR_TEAM_ROLE_TYPES.LEAD]: VENDOR_TEAM_ROLE_PERMISSIONS.LEAD,
    [VENDOR_TEAM_ROLE_TYPES.MANAGER]: VENDOR_TEAM_ROLE_PERMISSIONS.MANAGER,
    [VENDOR_TEAM_ROLE_TYPES.DIRECTOR]: VENDOR_TEAM_ROLE_PERMISSIONS.DIRECTOR,
  };
  return permissions[role] || [];
}

export function vendorTeamRoleGetResponsibilities(role: VendorTeamRoleType): string[] {
  const responsibilities: Record<VendorTeamRoleType, string[]> = {
    [VENDOR_TEAM_ROLE_TYPES.MEMBER]: VENDOR_TEAM_ROLE_RESPONSIBILITIES.MEMBER,
    [VENDOR_TEAM_ROLE_TYPES.SENIOR]: VENDOR_TEAM_ROLE_RESPONSIBILITIES.SENIOR,
    [VENDOR_TEAM_ROLE_TYPES.LEAD]: VENDOR_TEAM_ROLE_RESPONSIBILITIES.LEAD,
    [VENDOR_TEAM_ROLE_TYPES.MANAGER]: VENDOR_TEAM_ROLE_RESPONSIBILITIES.MANAGER,
    [VENDOR_TEAM_ROLE_TYPES.DIRECTOR]: VENDOR_TEAM_ROLE_RESPONSIBILITIES.DIRECTOR,
  };
  return responsibilities[role] || [];
}

export function vendorTeamRoleHasPermission(role: VendorTeamRoleType, permission: string): boolean {
  const permissions = vendorTeamRoleGetPermissions(role);
  return permissions.includes(permission);
}
