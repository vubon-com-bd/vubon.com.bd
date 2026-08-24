/**
 * Vendor Team Constants
 * Configuration for vendor teams
 */

export const VENDOR_TEAM = {
  // Team Types
  TYPES: {
    SALES: 'sales',
    SUPPORT: 'support',
    TECHNICAL: 'technical',
    MARKETING: 'marketing',
    OPERATIONS: 'operations',
    MANAGEMENT: 'management',
  } as const,

  // Team Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    ARCHIVED: 'archived',
  } as const,

  // Team Roles
  ROLES: {
    MEMBER: 'member',
    SENIOR: 'senior',
    LEAD: 'lead',
    MANAGER: 'manager',
    DIRECTOR: 'director',
  } as const,

  // Team Sizes
  SIZES: {
    SMALL: 3,
    MEDIUM: 7,
    LARGE: 15,
    XLARGE: 25,
  } as const,

  // Team Permissions
  PERMISSIONS: {
    VIEW: 'view',
    CREATE: 'create',
    EDIT: 'edit',
    DELETE: 'delete',
    MANAGE: 'manage',
    ADMIN: 'admin',
  } as const,

  // Team Limits
  LIMITS: {
    MIN_MEMBERS: 2,
    MAX_MEMBERS: 30,
    MAX_TEAMS_PER_VENDOR: 5,
  } as const,
} as const;

// Team Types
export type VendorTeamType = (typeof VENDOR_TEAM.TYPES)[keyof typeof VENDOR_TEAM.TYPES];

// Team Statuses
export type VendorTeamStatus = (typeof VENDOR_TEAM.STATUS)[keyof typeof VENDOR_TEAM.STATUS];

// Team Roles
export type VendorTeamRole = (typeof VENDOR_TEAM.ROLES)[keyof typeof VENDOR_TEAM.ROLES];

// Team Permissions
export type VendorTeamPermission =
  (typeof VENDOR_TEAM.PERMISSIONS)[keyof typeof VENDOR_TEAM.PERMISSIONS];

// Utility Functions
export function vendorTeamGetTypeLabel(type: VendorTeamType): string {
  const labels: Record<VendorTeamType, string> = {
    [VENDOR_TEAM.TYPES.SALES]: 'Sales Team',
    [VENDOR_TEAM.TYPES.SUPPORT]: 'Support Team',
    [VENDOR_TEAM.TYPES.TECHNICAL]: 'Technical Team',
    [VENDOR_TEAM.TYPES.MARKETING]: 'Marketing Team',
    [VENDOR_TEAM.TYPES.OPERATIONS]: 'Operations Team',
    [VENDOR_TEAM.TYPES.MANAGEMENT]: 'Management Team',
  };
  return labels[type] || 'Unknown';
}

export function vendorTeamGetStatusLabel(status: VendorTeamStatus): string {
  const labels: Record<VendorTeamStatus, string> = {
    [VENDOR_TEAM.STATUS.ACTIVE]: 'Active',
    [VENDOR_TEAM.STATUS.INACTIVE]: 'Inactive',
    [VENDOR_TEAM.STATUS.PAUSED]: 'Paused',
    [VENDOR_TEAM.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function vendorTeamGetRoleLabel(role: VendorTeamRole): string {
  const labels: Record<VendorTeamRole, string> = {
    [VENDOR_TEAM.ROLES.MEMBER]: 'Member',
    [VENDOR_TEAM.ROLES.SENIOR]: 'Senior',
    [VENDOR_TEAM.ROLES.LEAD]: 'Team Lead',
    [VENDOR_TEAM.ROLES.MANAGER]: 'Manager',
    [VENDOR_TEAM.ROLES.DIRECTOR]: 'Director',
  };
  return labels[role] || 'Unknown';
}

export function vendorTeamIsActive(status: VendorTeamStatus): boolean {
  return status === VENDOR_TEAM.STATUS.ACTIVE;
}

export function vendorTeamGetPermissionLabel(permission: VendorTeamPermission): string {
  const labels: Record<VendorTeamPermission, string> = {
    [VENDOR_TEAM.PERMISSIONS.VIEW]: 'View',
    [VENDOR_TEAM.PERMISSIONS.CREATE]: 'Create',
    [VENDOR_TEAM.PERMISSIONS.EDIT]: 'Edit',
    [VENDOR_TEAM.PERMISSIONS.DELETE]: 'Delete',
    [VENDOR_TEAM.PERMISSIONS.MANAGE]: 'Manage',
    [VENDOR_TEAM.PERMISSIONS.ADMIN]: 'Admin',
  };
  return labels[permission] || 'Unknown';
}

export function vendorTeamGetOptimalSize(teamType: VendorTeamType): number {
  const sizes: Record<VendorTeamType, number> = {
    [VENDOR_TEAM.TYPES.SALES]: VENDOR_TEAM.SIZES.MEDIUM,
    [VENDOR_TEAM.TYPES.SUPPORT]: VENDOR_TEAM.SIZES.MEDIUM,
    [VENDOR_TEAM.TYPES.TECHNICAL]: VENDOR_TEAM.SIZES.SMALL,
    [VENDOR_TEAM.TYPES.MARKETING]: VENDOR_TEAM.SIZES.SMALL,
    [VENDOR_TEAM.TYPES.OPERATIONS]: VENDOR_TEAM.SIZES.MEDIUM,
    [VENDOR_TEAM.TYPES.MANAGEMENT]: VENDOR_TEAM.SIZES.SMALL,
  };
  return sizes[teamType] || VENDOR_TEAM.SIZES.MEDIUM;
}
