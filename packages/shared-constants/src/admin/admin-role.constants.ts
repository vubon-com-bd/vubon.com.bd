/**
 * Admin Role Constants
 * Admin role definitions and configurations
 */

export const ADMIN_ROLE = {
  // Admin roles
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  MODERATOR: 'moderator',
  SUPPORT: 'support',
  VIEWER: 'viewer',
  ANALYST: 'analyst',
  AUDITOR: 'auditor',
  COMPLIANCE: 'compliance',
  OPERATOR: 'operator',
} as const;

export type AdminRoleType = (typeof ADMIN_ROLE)[keyof typeof ADMIN_ROLE];

export const ADMIN_ROLE_PRIORITY = {
  [ADMIN_ROLE.SUPER_ADMIN]: 100,
  [ADMIN_ROLE.ADMIN]: 90,
  [ADMIN_ROLE.MANAGER]: 80,
  [ADMIN_ROLE.MODERATOR]: 70,
  [ADMIN_ROLE.SUPPORT]: 60,
  [ADMIN_ROLE.ANALYST]: 50,
  [ADMIN_ROLE.AUDITOR]: 40,
  [ADMIN_ROLE.COMPLIANCE]: 30,
  [ADMIN_ROLE.OPERATOR]: 20,
  [ADMIN_ROLE.VIEWER]: 10,
} as const;

export type AdminRolePriority = (typeof ADMIN_ROLE_PRIORITY)[keyof typeof ADMIN_ROLE_PRIORITY];

export const ADMIN_ROLE_LABELS = {
  [ADMIN_ROLE.SUPER_ADMIN]: 'Super Administrator',
  [ADMIN_ROLE.ADMIN]: 'Administrator',
  [ADMIN_ROLE.MANAGER]: 'Manager',
  [ADMIN_ROLE.MODERATOR]: 'Moderator',
  [ADMIN_ROLE.SUPPORT]: 'Support Agent',
  [ADMIN_ROLE.ANALYST]: 'Analyst',
  [ADMIN_ROLE.AUDITOR]: 'Auditor',
  [ADMIN_ROLE.COMPLIANCE]: 'Compliance Officer',
  [ADMIN_ROLE.OPERATOR]: 'Operator',
  [ADMIN_ROLE.VIEWER]: 'Viewer',
} as const;

export type AdminRoleLabel = (typeof ADMIN_ROLE_LABELS)[keyof typeof ADMIN_ROLE_LABELS];

export const ADMIN_ROLE_DESCRIPTIONS = {
  [ADMIN_ROLE.SUPER_ADMIN]: 'Full system access with all permissions',
  [ADMIN_ROLE.ADMIN]: 'Complete administrative access',
  [ADMIN_ROLE.MANAGER]: 'Team management and oversight',
  [ADMIN_ROLE.MODERATOR]: 'Content and community moderation',
  [ADMIN_ROLE.SUPPORT]: 'Customer support and ticket handling',
  [ADMIN_ROLE.ANALYST]: 'Data analysis and reporting',
  [ADMIN_ROLE.AUDITOR]: 'System audit and compliance',
  [ADMIN_ROLE.COMPLIANCE]: 'Regulatory compliance management',
  [ADMIN_ROLE.OPERATOR]: 'Daily operations management',
  [ADMIN_ROLE.VIEWER]: 'Read-only access to system',
} as const;

export type AdminRoleDescription =
  (typeof ADMIN_ROLE_DESCRIPTIONS)[keyof typeof ADMIN_ROLE_DESCRIPTIONS];

export const ADMIN_ROLE_PERMISSIONS: Record<AdminRoleType, string[]> = {
  [ADMIN_ROLE.SUPER_ADMIN]: ['*'],
  [ADMIN_ROLE.ADMIN]: [
    'user:*',
    'admin:view',
    'admin:create',
    'admin:update',
    'content:*',
    'product:*',
    'order:*',
    'payment:*',
    'analytics:view',
    'settings:*',
    'logs:view',
    'logs:export',
  ],
  [ADMIN_ROLE.MANAGER]: [
    'user:view',
    'user:update',
    'content:view',
    'content:create',
    'content:update',
    'product:view',
    'product:update',
    'order:view',
    'order:update',
    'analytics:view',
    'settings:view',
  ],
  [ADMIN_ROLE.MODERATOR]: [
    'user:view',
    'user:ban',
    'user:unban',
    'content:view',
    'content:update',
    'content:delete',
    'product:view',
    'product:approve',
  ],
  [ADMIN_ROLE.SUPPORT]: ['user:view', 'order:view', 'order:update', 'payment:view', 'content:view'],
  [ADMIN_ROLE.ANALYST]: [
    'analytics:view',
    'analytics:export',
    'logs:view',
    'report:view',
    'report:export',
  ],
  [ADMIN_ROLE.AUDITOR]: ['logs:view', 'logs:export', 'audit:view', 'compliance:view'],
  [ADMIN_ROLE.COMPLIANCE]: ['compliance:view', 'compliance:update', 'legal:view', 'policy:view'],
  [ADMIN_ROLE.OPERATOR]: ['order:view', 'order:update', 'logistics:view', 'logistics:update'],
  [ADMIN_ROLE.VIEWER]: [
    'user:view',
    'content:view',
    'product:view',
    'order:view',
    'analytics:view',
  ],
};

export function getAdminRoleLabel(role: AdminRoleType): string {
  return ADMIN_ROLE_LABELS[role] || 'Unknown Role';
}

export function getAdminRoleDescription(role: AdminRoleType): string {
  return ADMIN_ROLE_DESCRIPTIONS[role] || 'No description available';
}

export function getAdminRolePriority(role: AdminRoleType): number {
  return ADMIN_ROLE_PRIORITY[role] || 0;
}

export function hasAdminRolePermission(role: AdminRoleType, permission: string): boolean {
  const permissions = ADMIN_ROLE_PERMISSIONS[role] || [];

  if (permissions.includes('*')) {
    return true;
  }

  return permissions.some((perm) => {
    if (perm.endsWith(':*')) {
      const prefix = perm.slice(0, -2);
      return permission.startsWith(prefix);
    }
    return perm === permission;
  });
}

export function isAdminSuperAdmin(role: AdminRoleType): boolean {
  return role === ADMIN_ROLE.SUPER_ADMIN;
}

export function isAdminAdmin(role: AdminRoleType): boolean {
  return role === ADMIN_ROLE.ADMIN;
}

export function isAdminManager(role: AdminRoleType): boolean {
  return role === ADMIN_ROLE.MANAGER;
}

export function isAdminModerator(role: AdminRoleType): boolean {
  return role === ADMIN_ROLE.MODERATOR;
}

export function getAdminRoles(): AdminRoleType[] {
  return Object.values(ADMIN_ROLE);
}

export function getAdminRoleByLabel(label: string): AdminRoleType | undefined {
  const entry = Object.entries(ADMIN_ROLE_LABELS).find(([, value]) => value === label);
  return entry ? (entry[0] as AdminRoleType) : undefined;
}
