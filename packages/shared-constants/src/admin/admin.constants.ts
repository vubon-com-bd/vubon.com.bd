/**
 * Admin Constants
 * Core admin configuration and definitions
 */

export const ADMIN = {
  // Admin statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    BANNED: 'banned',
    PENDING: 'pending',
    DELETED: 'deleted',
  },

  // Admin levels
  LEVEL: {
    ENTRY: 'entry',
    JUNIOR: 'junior',
    SENIOR: 'senior',
    LEAD: 'lead',
    MANAGER: 'manager',
    DIRECTOR: 'director',
    EXECUTIVE: 'executive',
  },

  // Admin departments
  DEPARTMENT: {
    ADMINISTRATION: 'administration',
    FINANCE: 'finance',
    HR: 'hr',
    IT: 'it',
    MARKETING: 'marketing',
    OPERATIONS: 'operations',
    SALES: 'sales',
    SUPPORT: 'support',
    LEGAL: 'legal',
    COMPLIANCE: 'compliance',
  },

  // Admin teams
  TEAM: {
    MANAGEMENT: 'management',
    DEVELOPMENT: 'development',
    DESIGN: 'design',
    CONTENT: 'content',
    QA: 'qa',
    DEVOPS: 'devops',
    SECURITY: 'security',
    DATA: 'data',
  },

  // Admin roles
  ROLE: {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    MANAGER: 'manager',
    SUPERVISOR: 'supervisor',
    STAFF: 'staff',
    VIEWER: 'viewer',
  },

  // Admin permissions
  PERMISSION: {
    READ: 'read',
    WRITE: 'write',
    UPDATE: 'update',
    DELETE: 'delete',
    MANAGE: 'manage',
    ADMIN: 'admin',
  },

  // Admin types
  TYPE: {
    SYSTEM: 'system',
    BUSINESS: 'business',
    SUPPORT: 'support',
    TECHNICAL: 'technical',
    CONTENT: 'content',
    FINANCE: 'finance',
    HR: 'hr',
    LEGAL: 'legal',
  },

  // Default values
  DEFAULTS: {
    STATUS: 'active',
    LEVEL: 'entry',
    DEPARTMENT: 'administration',
    TEAM: 'management',
    ROLE: 'staff',
    TYPE: 'system',
  },

  // Limits
  LIMITS: {
    MAX_LOGIN_ATTEMPTS: 5,
    SESSION_TIMEOUT: 3600,
    PASSWORD_EXPIRY_DAYS: 90,
    MAX_ACTIVE_SESSIONS: 3,
  },
} as const;

export type AdminStatus = (typeof ADMIN.STATUS)[keyof typeof ADMIN.STATUS];
export type AdminLevel = (typeof ADMIN.LEVEL)[keyof typeof ADMIN.LEVEL];
export type AdminDepartment = (typeof ADMIN.DEPARTMENT)[keyof typeof ADMIN.DEPARTMENT];
export type AdminTeam = (typeof ADMIN.TEAM)[keyof typeof ADMIN.TEAM];
export type AdminRole = (typeof ADMIN.ROLE)[keyof typeof ADMIN.ROLE];
export type AdminPermission = (typeof ADMIN.PERMISSION)[keyof typeof ADMIN.PERMISSION];
export type AdminType = (typeof ADMIN.TYPE)[keyof typeof ADMIN.TYPE];

export const ADMIN_STATUS_LABELS: Record<AdminStatus, string> = {
  [ADMIN.STATUS.ACTIVE]: 'Active',
  [ADMIN.STATUS.INACTIVE]: 'Inactive',
  [ADMIN.STATUS.SUSPENDED]: 'Suspended',
  [ADMIN.STATUS.BANNED]: 'Banned',
  [ADMIN.STATUS.PENDING]: 'Pending',
  [ADMIN.STATUS.DELETED]: 'Deleted',
};

export const ADMIN_LEVEL_NAMES: Record<AdminLevel, string> = {
  [ADMIN.LEVEL.ENTRY]: 'Entry Level',
  [ADMIN.LEVEL.JUNIOR]: 'Junior Level',
  [ADMIN.LEVEL.SENIOR]: 'Senior Level',
  [ADMIN.LEVEL.LEAD]: 'Lead Level',
  [ADMIN.LEVEL.MANAGER]: 'Manager Level',
  [ADMIN.LEVEL.DIRECTOR]: 'Director Level',
  [ADMIN.LEVEL.EXECUTIVE]: 'Executive Level',
};

export const ADMIN_DEPARTMENT_LABELS: Record<AdminDepartment, string> = {
  [ADMIN.DEPARTMENT.ADMINISTRATION]: 'Administration',
  [ADMIN.DEPARTMENT.FINANCE]: 'Finance',
  [ADMIN.DEPARTMENT.HR]: 'Human Resources',
  [ADMIN.DEPARTMENT.IT]: 'Information Technology',
  [ADMIN.DEPARTMENT.MARKETING]: 'Marketing',
  [ADMIN.DEPARTMENT.OPERATIONS]: 'Operations',
  [ADMIN.DEPARTMENT.SALES]: 'Sales',
  [ADMIN.DEPARTMENT.SUPPORT]: 'Support',
  [ADMIN.DEPARTMENT.LEGAL]: 'Legal',
  [ADMIN.DEPARTMENT.COMPLIANCE]: 'Compliance',
};

export const ADMIN_TEAM_LABELS: Record<AdminTeam, string> = {
  [ADMIN.TEAM.MANAGEMENT]: 'Management',
  [ADMIN.TEAM.DEVELOPMENT]: 'Development',
  [ADMIN.TEAM.DESIGN]: 'Design',
  [ADMIN.TEAM.CONTENT]: 'Content',
  [ADMIN.TEAM.QA]: 'Quality Assurance',
  [ADMIN.TEAM.DEVOPS]: 'DevOps',
  [ADMIN.TEAM.SECURITY]: 'Security',
  [ADMIN.TEAM.DATA]: 'Data',
};

export const ADMIN_ROLE_LABELS: Record<AdminRole, string> = {
  [ADMIN.ROLE.SUPER_ADMIN]: 'Super Administrator',
  [ADMIN.ROLE.ADMIN]: 'Administrator',
  [ADMIN.ROLE.MANAGER]: 'Manager',
  [ADMIN.ROLE.SUPERVISOR]: 'Supervisor',
  [ADMIN.ROLE.STAFF]: 'Staff',
  [ADMIN.ROLE.VIEWER]: 'Viewer',
};

export const ADMIN_PERMISSION_LABELS: Record<AdminPermission, string> = {
  [ADMIN.PERMISSION.READ]: 'Read',
  [ADMIN.PERMISSION.WRITE]: 'Write',
  [ADMIN.PERMISSION.UPDATE]: 'Update',
  [ADMIN.PERMISSION.DELETE]: 'Delete',
  [ADMIN.PERMISSION.MANAGE]: 'Manage',
  [ADMIN.PERMISSION.ADMIN]: 'Admin',
};

export const ADMIN_TYPE_LABELS: Record<AdminType, string> = {
  [ADMIN.TYPE.SYSTEM]: 'System Administrator',
  [ADMIN.TYPE.BUSINESS]: 'Business Administrator',
  [ADMIN.TYPE.SUPPORT]: 'Support Administrator',
  [ADMIN.TYPE.TECHNICAL]: 'Technical Administrator',
  [ADMIN.TYPE.CONTENT]: 'Content Administrator',
  [ADMIN.TYPE.FINANCE]: 'Finance Administrator',
  [ADMIN.TYPE.HR]: 'HR Administrator',
  [ADMIN.TYPE.LEGAL]: 'Legal Administrator',
};

// রিনেম করা ফাংশন (Admin প্রিফিক্স যোগ করা হয়েছে)
export function isAdminActive(status: AdminStatus): boolean {
  return status === ADMIN.STATUS.ACTIVE;
}

export function isAdminSuspended(status: AdminStatus): boolean {
  return status === ADMIN.STATUS.SUSPENDED;
}

export function isAdminBanned(status: AdminStatus): boolean {
  return status === ADMIN.STATUS.BANNED;
}

export function hasAdminPermission(permission: AdminPermission): boolean {
  return permission === ADMIN.PERMISSION.ADMIN || permission === ADMIN.PERMISSION.MANAGE;
}

export function getAdminRoleLabel(role: AdminRole): string {
  return ADMIN_ROLE_LABELS[role] || 'Unknown Role';
}

export function getAdminLevelName(level: AdminLevel): string {
  return ADMIN_LEVEL_NAMES[level] || 'Unknown Level';
}

export function getAdminDepartmentLabel(department: AdminDepartment): string {
  return ADMIN_DEPARTMENT_LABELS[department] || 'Unknown Department';
}

export function getAdminTeamLabel(team: AdminTeam): string {
  return ADMIN_TEAM_LABELS[team] || 'Unknown Team';
}

export function getAdminPermissionLabel(permission: AdminPermission): string {
  return ADMIN_PERMISSION_LABELS[permission] || 'Unknown Permission';
}

// isAdmin ফাংশনটি রিনেম করা হয়েছে
export function isAdminUser(role: AdminRole): boolean {
  return role === ADMIN.ROLE.ADMIN || role === ADMIN.ROLE.SUPER_ADMIN;
}
