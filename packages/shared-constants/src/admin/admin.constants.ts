/**
 * Admin Constants
 * Core admin configuration and settings
 */

export const ADMIN = {
  // Admin roles
  ROLES: {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    MANAGER: 'manager',
    MODERATOR: 'moderator',
    SUPPORT: 'support',
    VIEWER: 'viewer',
  },

  // Admin types
  TYPES: {
    SYSTEM: 'system',
    USER: 'user',
    VENDOR: 'vendor',
    PARTNER: 'partner',
  },

  // Admin statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    SUSPENDED: 'suspended',
    BANNED: 'banned',
    DELETED: 'deleted',
  },

  // Admin levels
  LEVELS: {
    LEVEL_1: 1,
    LEVEL_2: 2,
    LEVEL_3: 3,
    LEVEL_4: 4,
    LEVEL_5: 5,
    LEVEL_6: 6,
    LEVEL_7: 7,
    LEVEL_8: 8,
    LEVEL_9: 9,
    LEVEL_10: 10,
  },

  // Admin departments
  DEPARTMENTS: {
    IT: 'it',
    HR: 'hr',
    FINANCE: 'finance',
    MARKETING: 'marketing',
    SALES: 'sales',
    SUPPORT: 'support',
    OPERATIONS: 'operations',
    LOGISTICS: 'logistics',
    PRODUCT: 'product',
    CONTENT: 'content',
    LEGAL: 'legal',
    COMPLIANCE: 'compliance',
  },

  // Admin teams
  TEAMS: {
    CORE: 'core',
    FRONTEND: 'frontend',
    BACKEND: 'backend',
    DEVOPS: 'devops',
    QA: 'qa',
    DESIGN: 'design',
    PRODUCT: 'product',
    DATA: 'data',
    SECURITY: 'security',
    INFRASTRUCTURE: 'infrastructure',
  },

  // Admin permissions
  PERMISSIONS: {
    // User management
    USER_VIEW: 'user:view',
    USER_CREATE: 'user:create',
    USER_UPDATE: 'user:update',
    USER_DELETE: 'user:delete',
    USER_BAN: 'user:ban',
    USER_UNBAN: 'user:unban',
    USER_VERIFY: 'user:verify',

    // Admin management
    ADMIN_VIEW: 'admin:view',
    ADMIN_CREATE: 'admin:create',
    ADMIN_UPDATE: 'admin:update',
    ADMIN_DELETE: 'admin:delete',
    ADMIN_ROLE: 'admin:role',

    // Content management
    CONTENT_VIEW: 'content:view',
    CONTENT_CREATE: 'content:create',
    CONTENT_UPDATE: 'content:update',
    CONTENT_DELETE: 'content:delete',
    CONTENT_PUBLISH: 'content:publish',

    // Product management
    PRODUCT_VIEW: 'product:view',
    PRODUCT_CREATE: 'product:create',
    PRODUCT_UPDATE: 'product:update',
    PRODUCT_DELETE: 'product:delete',
    PRODUCT_APPROVE: 'product:approve',

    // Order management
    ORDER_VIEW: 'order:view',
    ORDER_UPDATE: 'order:update',
    ORDER_CANCEL: 'order:cancel',
    ORDER_REFUND: 'order:refund',

    // Payment management
    PAYMENT_VIEW: 'payment:view',
    PAYMENT_PROCESS: 'payment:process',
    PAYMENT_REFUND: 'payment:refund',

    // Analytics
    ANALYTICS_VIEW: 'analytics:view',
    ANALYTICS_EXPORT: 'analytics:export',

    // Settings
    SETTINGS_VIEW: 'settings:view',
    SETTINGS_UPDATE: 'settings:update',
    SETTINGS_OVERRIDE: 'settings:override',

    // System
    SYSTEM_VIEW: 'system:view',
    SYSTEM_UPDATE: 'system:update',
    SYSTEM_MAINTENANCE: 'system:maintenance',
    SYSTEM_BACKUP: 'system:backup',

    // Logs
    LOGS_VIEW: 'logs:view',
    LOGS_EXPORT: 'logs:export',
    LOGS_DELETE: 'logs:delete',
  },
} as const;

export type AdminRole = (typeof ADMIN.ROLES)[keyof typeof ADMIN.ROLES];
export type AdminType = (typeof ADMIN.TYPES)[keyof typeof ADMIN.TYPES];
export type AdminStatus = (typeof ADMIN.STATUSES)[keyof typeof ADMIN.STATUSES];
export type AdminLevel = (typeof ADMIN.LEVELS)[keyof typeof ADMIN.LEVELS];
export type AdminDepartment = (typeof ADMIN.DEPARTMENTS)[keyof typeof ADMIN.DEPARTMENTS];
export type AdminTeam = (typeof ADMIN.TEAMS)[keyof typeof ADMIN.TEAMS];
export type AdminPermission = (typeof ADMIN.PERMISSIONS)[keyof typeof ADMIN.PERMISSIONS];

export function isAdminActive(status: AdminStatus): boolean {
  return status === ADMIN.STATUSES.ACTIVE;
}

export function isAdminSuspended(status: AdminStatus): boolean {
  return status === ADMIN.STATUSES.SUSPENDED;
}

export function isAdminBanned(status: AdminStatus): boolean {
  return status === ADMIN.STATUSES.BANNED;
}

export function hasAdminPermission(
  permissions: AdminPermission[],
  requiredPermission: AdminPermission
): boolean {
  return permissions.includes(requiredPermission);
}

export function getAdminRoleLabel(role: AdminRole): string {
  const labels: Record<AdminRole, string> = {
    [ADMIN.ROLES.SUPER_ADMIN]: 'Super Admin',
    [ADMIN.ROLES.ADMIN]: 'Admin',
    [ADMIN.ROLES.MANAGER]: 'Manager',
    [ADMIN.ROLES.MODERATOR]: 'Moderator',
    [ADMIN.ROLES.SUPPORT]: 'Support',
    [ADMIN.ROLES.VIEWER]: 'Viewer',
  };
  return labels[role] || 'Unknown Role';
}

export function getAdminLevelName(level: AdminLevel): string {
  const names: Record<AdminLevel, string> = {
    [ADMIN.LEVELS.LEVEL_1]: 'Junior',
    [ADMIN.LEVELS.LEVEL_2]: 'Mid-Level',
    [ADMIN.LEVELS.LEVEL_3]: 'Senior',
    [ADMIN.LEVELS.LEVEL_4]: 'Lead',
    [ADMIN.LEVELS.LEVEL_5]: 'Principal',
    [ADMIN.LEVELS.LEVEL_6]: 'Staff',
    [ADMIN.LEVELS.LEVEL_7]: 'Senior Staff',
    [ADMIN.LEVELS.LEVEL_8]: 'Manager',
    [ADMIN.LEVELS.LEVEL_9]: 'Director',
    [ADMIN.LEVELS.LEVEL_10]: 'Executive',
  };
  return names[level] || 'Unknown Level';
}

export function getAdminDepartmentLabel(department: AdminDepartment): string {
  const labels: Record<AdminDepartment, string> = {
    [ADMIN.DEPARTMENTS.IT]: 'Information Technology',
    [ADMIN.DEPARTMENTS.HR]: 'Human Resources',
    [ADMIN.DEPARTMENTS.FINANCE]: 'Finance',
    [ADMIN.DEPARTMENTS.MARKETING]: 'Marketing',
    [ADMIN.DEPARTMENTS.SALES]: 'Sales',
    [ADMIN.DEPARTMENTS.SUPPORT]: 'Support',
    [ADMIN.DEPARTMENTS.OPERATIONS]: 'Operations',
    [ADMIN.DEPARTMENTS.LOGISTICS]: 'Logistics',
    [ADMIN.DEPARTMENTS.PRODUCT]: 'Product',
    [ADMIN.DEPARTMENTS.CONTENT]: 'Content',
    [ADMIN.DEPARTMENTS.LEGAL]: 'Legal',
    [ADMIN.DEPARTMENTS.COMPLIANCE]: 'Compliance',
  };
  return labels[department] || 'Unknown Department';
}

export function getAdminTeamLabel(team: AdminTeam): string {
  const labels: Record<AdminTeam, string> = {
    [ADMIN.TEAMS.CORE]: 'Core Team',
    [ADMIN.TEAMS.FRONTEND]: 'Frontend Team',
    [ADMIN.TEAMS.BACKEND]: 'Backend Team',
    [ADMIN.TEAMS.DEVOPS]: 'DevOps Team',
    [ADMIN.TEAMS.QA]: 'Quality Assurance',
    [ADMIN.TEAMS.DESIGN]: 'Design Team',
    [ADMIN.TEAMS.PRODUCT]: 'Product Team',
    [ADMIN.TEAMS.DATA]: 'Data Team',
    [ADMIN.TEAMS.SECURITY]: 'Security Team',
    [ADMIN.TEAMS.INFRASTRUCTURE]: 'Infrastructure Team',
  };
  return labels[team] || 'Unknown Team';
}

export function getAdminPermissionLabel(permission: AdminPermission): string {
  const labels: Record<AdminPermission, string> = {
    [ADMIN.PERMISSIONS.USER_VIEW]: 'View Users',
    [ADMIN.PERMISSIONS.USER_CREATE]: 'Create Users',
    [ADMIN.PERMISSIONS.USER_UPDATE]: 'Update Users',
    [ADMIN.PERMISSIONS.USER_DELETE]: 'Delete Users',
    [ADMIN.PERMISSIONS.USER_BAN]: 'Ban Users',
    [ADMIN.PERMISSIONS.USER_UNBAN]: 'Unban Users',
    [ADMIN.PERMISSIONS.USER_VERIFY]: 'Verify Users',
    [ADMIN.PERMISSIONS.ADMIN_VIEW]: 'View Admins',
    [ADMIN.PERMISSIONS.ADMIN_CREATE]: 'Create Admins',
    [ADMIN.PERMISSIONS.ADMIN_UPDATE]: 'Update Admins',
    [ADMIN.PERMISSIONS.ADMIN_DELETE]: 'Delete Admins',
    [ADMIN.PERMISSIONS.ADMIN_ROLE]: 'Manage Admin Roles',
    [ADMIN.PERMISSIONS.CONTENT_VIEW]: 'View Content',
    [ADMIN.PERMISSIONS.CONTENT_CREATE]: 'Create Content',
    [ADMIN.PERMISSIONS.CONTENT_UPDATE]: 'Update Content',
    [ADMIN.PERMISSIONS.CONTENT_DELETE]: 'Delete Content',
    [ADMIN.PERMISSIONS.CONTENT_PUBLISH]: 'Publish Content',
    [ADMIN.PERMISSIONS.PRODUCT_VIEW]: 'View Products',
    [ADMIN.PERMISSIONS.PRODUCT_CREATE]: 'Create Products',
    [ADMIN.PERMISSIONS.PRODUCT_UPDATE]: 'Update Products',
    [ADMIN.PERMISSIONS.PRODUCT_DELETE]: 'Delete Products',
    [ADMIN.PERMISSIONS.PRODUCT_APPROVE]: 'Approve Products',
    [ADMIN.PERMISSIONS.ORDER_VIEW]: 'View Orders',
    [ADMIN.PERMISSIONS.ORDER_UPDATE]: 'Update Orders',
    [ADMIN.PERMISSIONS.ORDER_CANCEL]: 'Cancel Orders',
    [ADMIN.PERMISSIONS.ORDER_REFUND]: 'Refund Orders',
    [ADMIN.PERMISSIONS.PAYMENT_VIEW]: 'View Payments',
    [ADMIN.PERMISSIONS.PAYMENT_PROCESS]: 'Process Payments',
    [ADMIN.PERMISSIONS.PAYMENT_REFUND]: 'Refund Payments',
    [ADMIN.PERMISSIONS.ANALYTICS_VIEW]: 'View Analytics',
    [ADMIN.PERMISSIONS.ANALYTICS_EXPORT]: 'Export Analytics',
    [ADMIN.PERMISSIONS.SETTINGS_VIEW]: 'View Settings',
    [ADMIN.PERMISSIONS.SETTINGS_UPDATE]: 'Update Settings',
    [ADMIN.PERMISSIONS.SETTINGS_OVERRIDE]: 'Override Settings',
    [ADMIN.PERMISSIONS.SYSTEM_VIEW]: 'View System',
    [ADMIN.PERMISSIONS.SYSTEM_UPDATE]: 'Update System',
    [ADMIN.PERMISSIONS.SYSTEM_MAINTENANCE]: 'Maintenance Mode',
    [ADMIN.PERMISSIONS.SYSTEM_BACKUP]: 'System Backup',
    [ADMIN.PERMISSIONS.LOGS_VIEW]: 'View Logs',
    [ADMIN.PERMISSIONS.LOGS_EXPORT]: 'Export Logs',
    [ADMIN.PERMISSIONS.LOGS_DELETE]: 'Delete Logs',
  };
  return labels[permission] || 'Unknown Permission';
}
