/**
 * Report Permission Constants
 * Permission definitions for report access and management
 */

// Define ACTIONS first to avoid circular reference
export const REPORT_PERMISSION_ACTIONS = {
  // Report actions
  REPORT_VIEW: 'report:view',
  REPORT_CREATE: 'report:create',
  REPORT_EDIT: 'report:edit',
  REPORT_DELETE: 'report:delete',
  REPORT_EXPORT: 'report:export',
  REPORT_SHARE: 'report:share',
  REPORT_SCHEDULE: 'report:schedule',
  REPORT_APPROVE: 'report:approve',
  REPORT_PUBLISH: 'report:publish',

  // Dashboard actions
  DASHBOARD_VIEW: 'dashboard:view',
  DASHBOARD_CREATE: 'dashboard:create',
  DASHBOARD_EDIT: 'dashboard:edit',
  DASHBOARD_DELETE: 'dashboard:delete',
  DASHBOARD_SHARE: 'dashboard:share',

  // Widget actions
  WIDGET_VIEW: 'widget:view',
  WIDGET_CREATE: 'widget:create',
  WIDGET_EDIT: 'widget:edit',
  WIDGET_DELETE: 'widget:delete',

  // Template actions
  TEMPLATE_VIEW: 'template:view',
  TEMPLATE_CREATE: 'template:create',
  TEMPLATE_EDIT: 'template:edit',
  TEMPLATE_DELETE: 'template:delete',

  // Schedule actions
  SCHEDULE_VIEW: 'schedule:view',
  SCHEDULE_CREATE: 'schedule:create',
  SCHEDULE_EDIT: 'schedule:edit',
  SCHEDULE_DELETE: 'schedule:delete',

  // Export actions
  EXPORT_VIEW: 'export:view',
  EXPORT_CREATE: 'export:create',
  EXPORT_DOWNLOAD: 'export:download',
  EXPORT_DELETE: 'export:delete',

  // Admin actions
  ADMIN_ALL: 'admin:all',
  ADMIN_USERS: 'admin:users',
  ADMIN_ROLES: 'admin:roles',
  ADMIN_SETTINGS: 'admin:settings',
  ADMIN_AUDIT: 'admin:audit',
} as const;

export type ReportPermissionAction =
  (typeof REPORT_PERMISSION_ACTIONS)[keyof typeof REPORT_PERMISSION_ACTIONS];

// Define ROLES
export const REPORT_PERMISSION_ROLES = {
  VIEWER: 'viewer',
  ANALYST: 'analyst',
  MANAGER: 'manager',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
} as const;

export type ReportPermissionRole =
  (typeof REPORT_PERMISSION_ROLES)[keyof typeof REPORT_PERMISSION_ROLES];

// Permission Categories
export const REPORT_PERMISSION_CATEGORIES = {
  VIEW: 'view',
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
  EXPORT: 'export',
  SHARE: 'share',
  SCHEDULE: 'schedule',
  APPROVE: 'approve',
  PUBLISH: 'publish',
  ADMIN: 'admin',
} as const;

export type ReportPermissionCategory =
  (typeof REPORT_PERMISSION_CATEGORIES)[keyof typeof REPORT_PERMISSION_CATEGORIES];

// Permission Levels
export const REPORT_PERMISSION_LEVELS = {
  NONE: 0,
  READ: 1,
  WRITE: 2,
  EXECUTE: 3,
  FULL: 4,
} as const;

export type ReportPermissionLevel =
  (typeof REPORT_PERMISSION_LEVELS)[keyof typeof REPORT_PERMISSION_LEVELS];

// Permission Scopes
export const REPORT_PERMISSION_SCOPES = {
  OWN: 'own',
  TEAM: 'team',
  DEPARTMENT: 'department',
  ORGANIZATION: 'organization',
  ALL: 'all',
} as const;

export type ReportPermissionScope =
  (typeof REPORT_PERMISSION_SCOPES)[keyof typeof REPORT_PERMISSION_SCOPES];

// Permission Resources
export const REPORT_PERMISSION_RESOURCES = {
  REPORTS: 'reports',
  DASHBOARDS: 'dashboards',
  WIDGETS: 'widgets',
  TEMPLATES: 'templates',
  SCHEDULES: 'schedules',
  EXPORTS: 'exports',
  EMAILS: 'emails',
  FILTERS: 'filters',
  SETTINGS: 'settings',
  USERS: 'users',
  ROLES: 'roles',
  AUDIT: 'audit',
} as const;

export type ReportPermissionResource =
  (typeof REPORT_PERMISSION_RESOURCES)[keyof typeof REPORT_PERMISSION_RESOURCES];

// Permission Defaults
export const REPORT_PERMISSION_DEFAULTS = {
  VIEWER: {
    permissions: [
      REPORT_PERMISSION_ACTIONS.REPORT_VIEW,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_VIEW,
      REPORT_PERMISSION_ACTIONS.WIDGET_VIEW,
      REPORT_PERMISSION_ACTIONS.EXPORT_VIEW,
    ],
    level: REPORT_PERMISSION_LEVELS.READ,
  },
  ANALYST: {
    permissions: [
      REPORT_PERMISSION_ACTIONS.REPORT_VIEW,
      REPORT_PERMISSION_ACTIONS.REPORT_CREATE,
      REPORT_PERMISSION_ACTIONS.REPORT_EDIT,
      REPORT_PERMISSION_ACTIONS.REPORT_EXPORT,
      REPORT_PERMISSION_ACTIONS.REPORT_SHARE,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_VIEW,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_CREATE,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_EDIT,
      REPORT_PERMISSION_ACTIONS.WIDGET_VIEW,
      REPORT_PERMISSION_ACTIONS.WIDGET_CREATE,
      REPORT_PERMISSION_ACTIONS.WIDGET_EDIT,
      REPORT_PERMISSION_ACTIONS.TEMPLATE_VIEW,
      REPORT_PERMISSION_ACTIONS.EXPORT_VIEW,
      REPORT_PERMISSION_ACTIONS.EXPORT_CREATE,
      REPORT_PERMISSION_ACTIONS.EXPORT_DOWNLOAD,
    ],
    level: REPORT_PERMISSION_LEVELS.WRITE,
  },
  MANAGER: {
    permissions: [
      REPORT_PERMISSION_ACTIONS.REPORT_VIEW,
      REPORT_PERMISSION_ACTIONS.REPORT_CREATE,
      REPORT_PERMISSION_ACTIONS.REPORT_EDIT,
      REPORT_PERMISSION_ACTIONS.REPORT_DELETE,
      REPORT_PERMISSION_ACTIONS.REPORT_EXPORT,
      REPORT_PERMISSION_ACTIONS.REPORT_SHARE,
      REPORT_PERMISSION_ACTIONS.REPORT_SCHEDULE,
      REPORT_PERMISSION_ACTIONS.REPORT_APPROVE,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_VIEW,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_CREATE,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_EDIT,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_DELETE,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_SHARE,
      REPORT_PERMISSION_ACTIONS.WIDGET_VIEW,
      REPORT_PERMISSION_ACTIONS.WIDGET_CREATE,
      REPORT_PERMISSION_ACTIONS.WIDGET_EDIT,
      REPORT_PERMISSION_ACTIONS.WIDGET_DELETE,
      REPORT_PERMISSION_ACTIONS.TEMPLATE_VIEW,
      REPORT_PERMISSION_ACTIONS.TEMPLATE_CREATE,
      REPORT_PERMISSION_ACTIONS.TEMPLATE_EDIT,
      REPORT_PERMISSION_ACTIONS.TEMPLATE_DELETE,
      REPORT_PERMISSION_ACTIONS.SCHEDULE_VIEW,
      REPORT_PERMISSION_ACTIONS.SCHEDULE_CREATE,
      REPORT_PERMISSION_ACTIONS.SCHEDULE_EDIT,
      REPORT_PERMISSION_ACTIONS.SCHEDULE_DELETE,
      REPORT_PERMISSION_ACTIONS.EXPORT_VIEW,
      REPORT_PERMISSION_ACTIONS.EXPORT_CREATE,
      REPORT_PERMISSION_ACTIONS.EXPORT_DOWNLOAD,
      REPORT_PERMISSION_ACTIONS.EXPORT_DELETE,
    ],
    level: REPORT_PERMISSION_LEVELS.EXECUTE,
  },
  ADMIN: {
    permissions: [
      REPORT_PERMISSION_ACTIONS.REPORT_VIEW,
      REPORT_PERMISSION_ACTIONS.REPORT_CREATE,
      REPORT_PERMISSION_ACTIONS.REPORT_EDIT,
      REPORT_PERMISSION_ACTIONS.REPORT_DELETE,
      REPORT_PERMISSION_ACTIONS.REPORT_EXPORT,
      REPORT_PERMISSION_ACTIONS.REPORT_SHARE,
      REPORT_PERMISSION_ACTIONS.REPORT_SCHEDULE,
      REPORT_PERMISSION_ACTIONS.REPORT_APPROVE,
      REPORT_PERMISSION_ACTIONS.REPORT_PUBLISH,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_VIEW,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_CREATE,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_EDIT,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_DELETE,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_SHARE,
      REPORT_PERMISSION_ACTIONS.WIDGET_VIEW,
      REPORT_PERMISSION_ACTIONS.WIDGET_CREATE,
      REPORT_PERMISSION_ACTIONS.WIDGET_EDIT,
      REPORT_PERMISSION_ACTIONS.WIDGET_DELETE,
      REPORT_PERMISSION_ACTIONS.TEMPLATE_VIEW,
      REPORT_PERMISSION_ACTIONS.TEMPLATE_CREATE,
      REPORT_PERMISSION_ACTIONS.TEMPLATE_EDIT,
      REPORT_PERMISSION_ACTIONS.TEMPLATE_DELETE,
      REPORT_PERMISSION_ACTIONS.SCHEDULE_VIEW,
      REPORT_PERMISSION_ACTIONS.SCHEDULE_CREATE,
      REPORT_PERMISSION_ACTIONS.SCHEDULE_EDIT,
      REPORT_PERMISSION_ACTIONS.SCHEDULE_DELETE,
      REPORT_PERMISSION_ACTIONS.EXPORT_VIEW,
      REPORT_PERMISSION_ACTIONS.EXPORT_CREATE,
      REPORT_PERMISSION_ACTIONS.EXPORT_DOWNLOAD,
      REPORT_PERMISSION_ACTIONS.EXPORT_DELETE,
      REPORT_PERMISSION_ACTIONS.ADMIN_USERS,
      REPORT_PERMISSION_ACTIONS.ADMIN_ROLES,
      REPORT_PERMISSION_ACTIONS.ADMIN_SETTINGS,
      REPORT_PERMISSION_ACTIONS.ADMIN_AUDIT,
    ],
    level: REPORT_PERMISSION_LEVELS.FULL,
  },
  SUPER_ADMIN: {
    permissions: [
      REPORT_PERMISSION_ACTIONS.ADMIN_ALL,
      REPORT_PERMISSION_ACTIONS.REPORT_VIEW,
      REPORT_PERMISSION_ACTIONS.REPORT_CREATE,
      REPORT_PERMISSION_ACTIONS.REPORT_EDIT,
      REPORT_PERMISSION_ACTIONS.REPORT_DELETE,
      REPORT_PERMISSION_ACTIONS.REPORT_EXPORT,
      REPORT_PERMISSION_ACTIONS.REPORT_SHARE,
      REPORT_PERMISSION_ACTIONS.REPORT_SCHEDULE,
      REPORT_PERMISSION_ACTIONS.REPORT_APPROVE,
      REPORT_PERMISSION_ACTIONS.REPORT_PUBLISH,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_VIEW,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_CREATE,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_EDIT,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_DELETE,
      REPORT_PERMISSION_ACTIONS.DASHBOARD_SHARE,
      REPORT_PERMISSION_ACTIONS.WIDGET_VIEW,
      REPORT_PERMISSION_ACTIONS.WIDGET_CREATE,
      REPORT_PERMISSION_ACTIONS.WIDGET_EDIT,
      REPORT_PERMISSION_ACTIONS.WIDGET_DELETE,
      REPORT_PERMISSION_ACTIONS.TEMPLATE_VIEW,
      REPORT_PERMISSION_ACTIONS.TEMPLATE_CREATE,
      REPORT_PERMISSION_ACTIONS.TEMPLATE_EDIT,
      REPORT_PERMISSION_ACTIONS.TEMPLATE_DELETE,
      REPORT_PERMISSION_ACTIONS.SCHEDULE_VIEW,
      REPORT_PERMISSION_ACTIONS.SCHEDULE_CREATE,
      REPORT_PERMISSION_ACTIONS.SCHEDULE_EDIT,
      REPORT_PERMISSION_ACTIONS.SCHEDULE_DELETE,
      REPORT_PERMISSION_ACTIONS.EXPORT_VIEW,
      REPORT_PERMISSION_ACTIONS.EXPORT_CREATE,
      REPORT_PERMISSION_ACTIONS.EXPORT_DOWNLOAD,
      REPORT_PERMISSION_ACTIONS.EXPORT_DELETE,
      REPORT_PERMISSION_ACTIONS.ADMIN_USERS,
      REPORT_PERMISSION_ACTIONS.ADMIN_ROLES,
      REPORT_PERMISSION_ACTIONS.ADMIN_SETTINGS,
      REPORT_PERMISSION_ACTIONS.ADMIN_AUDIT,
    ],
    level: REPORT_PERMISSION_LEVELS.FULL,
  },
} as const;

// Permission Messages
export const REPORT_PERMISSION_MESSAGES = {
  PERMISSION_DENIED: 'You do not have permission to perform this action',
  PERMISSION_REQUIRED: 'Permission required to access this resource',
  PERMISSION_GRANTED: 'Access granted',
  PERMISSION_REVOKED: 'Access revoked',
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions to perform this action',
  INVALID_PERMISSIONS: 'Invalid permission configuration',
} as const;

// Utility Functions
export function reportPermissionGetCategoryLabel(category: ReportPermissionCategory): string {
  const labels: Record<ReportPermissionCategory, string> = {
    [REPORT_PERMISSION_CATEGORIES.VIEW]: 'View',
    [REPORT_PERMISSION_CATEGORIES.CREATE]: 'Create',
    [REPORT_PERMISSION_CATEGORIES.EDIT]: 'Edit',
    [REPORT_PERMISSION_CATEGORIES.DELETE]: 'Delete',
    [REPORT_PERMISSION_CATEGORIES.EXPORT]: 'Export',
    [REPORT_PERMISSION_CATEGORIES.SHARE]: 'Share',
    [REPORT_PERMISSION_CATEGORIES.SCHEDULE]: 'Schedule',
    [REPORT_PERMISSION_CATEGORIES.APPROVE]: 'Approve',
    [REPORT_PERMISSION_CATEGORIES.PUBLISH]: 'Publish',
    [REPORT_PERMISSION_CATEGORIES.ADMIN]: 'Administrator',
  };
  return labels[category] || 'Unknown Category';
}

export function reportPermissionGetLevelLabel(level: ReportPermissionLevel): string {
  const labels: Record<ReportPermissionLevel, string> = {
    [REPORT_PERMISSION_LEVELS.NONE]: 'None',
    [REPORT_PERMISSION_LEVELS.READ]: 'Read Only',
    [REPORT_PERMISSION_LEVELS.WRITE]: 'Read & Write',
    [REPORT_PERMISSION_LEVELS.EXECUTE]: 'Execute',
    [REPORT_PERMISSION_LEVELS.FULL]: 'Full Access',
  };
  return labels[level] || 'Unknown Level';
}

export function reportPermissionGetScopeLabel(scope: ReportPermissionScope): string {
  const labels: Record<ReportPermissionScope, string> = {
    [REPORT_PERMISSION_SCOPES.OWN]: 'Own',
    [REPORT_PERMISSION_SCOPES.TEAM]: 'Team',
    [REPORT_PERMISSION_SCOPES.DEPARTMENT]: 'Department',
    [REPORT_PERMISSION_SCOPES.ORGANIZATION]: 'Organization',
    [REPORT_PERMISSION_SCOPES.ALL]: 'All',
  };
  return labels[scope] || 'Unknown Scope';
}

export function reportPermissionGetResourceLabel(resource: ReportPermissionResource): string {
  const labels: Record<ReportPermissionResource, string> = {
    [REPORT_PERMISSION_RESOURCES.REPORTS]: 'Reports',
    [REPORT_PERMISSION_RESOURCES.DASHBOARDS]: 'Dashboards',
    [REPORT_PERMISSION_RESOURCES.WIDGETS]: 'Widgets',
    [REPORT_PERMISSION_RESOURCES.TEMPLATES]: 'Templates',
    [REPORT_PERMISSION_RESOURCES.SCHEDULES]: 'Schedules',
    [REPORT_PERMISSION_RESOURCES.EXPORTS]: 'Exports',
    [REPORT_PERMISSION_RESOURCES.EMAILS]: 'Emails',
    [REPORT_PERMISSION_RESOURCES.FILTERS]: 'Filters',
    [REPORT_PERMISSION_RESOURCES.SETTINGS]: 'Settings',
    [REPORT_PERMISSION_RESOURCES.USERS]: 'Users',
    [REPORT_PERMISSION_RESOURCES.ROLES]: 'Roles',
    [REPORT_PERMISSION_RESOURCES.AUDIT]: 'Audit Logs',
  };
  return labels[resource] || 'Unknown Resource';
}

export function reportPermissionGetRoleLabel(role: ReportPermissionRole): string {
  const labels: Record<ReportPermissionRole, string> = {
    [REPORT_PERMISSION_ROLES.VIEWER]: 'Viewer',
    [REPORT_PERMISSION_ROLES.ANALYST]: 'Analyst',
    [REPORT_PERMISSION_ROLES.MANAGER]: 'Manager',
    [REPORT_PERMISSION_ROLES.ADMIN]: 'Administrator',
    [REPORT_PERMISSION_ROLES.SUPER_ADMIN]: 'Super Administrator',
  };
  return labels[role] || 'Unknown Role';
}

export function reportPermissionGetDefaultPermissions(role: ReportPermissionRole): string[] {
  const permissions = REPORT_PERMISSION_DEFAULTS[role as keyof typeof REPORT_PERMISSION_DEFAULTS];
  return permissions ? [...permissions.permissions] : [];
}

export function reportPermissionGetDefaultLevel(role: ReportPermissionRole): ReportPermissionLevel {
  const permissions = REPORT_PERMISSION_DEFAULTS[role as keyof typeof REPORT_PERMISSION_DEFAULTS];
  return permissions ? permissions.level : REPORT_PERMISSION_LEVELS.NONE;
}

export function reportPermissionIsValidRole(role: string): role is ReportPermissionRole {
  return Object.values(REPORT_PERMISSION_ROLES).includes(role as ReportPermissionRole);
}

export function reportPermissionIsValidAction(action: string): action is ReportPermissionAction {
  return Object.values(REPORT_PERMISSION_ACTIONS).includes(action as ReportPermissionAction);
}

export function reportPermissionIsValidResource(
  resource: string
): resource is ReportPermissionResource {
  return Object.values(REPORT_PERMISSION_RESOURCES).includes(resource as ReportPermissionResource);
}

export function reportPermissionHasAction(
  permissions: string[],
  action: ReportPermissionAction
): boolean {
  return permissions.includes(action);
}

export function reportPermissionHasAnyAction(
  permissions: string[],
  actions: ReportPermissionAction[]
): boolean {
  return actions.some((action) => permissions.includes(action));
}

export function reportPermissionHasAllActions(
  permissions: string[],
  actions: ReportPermissionAction[]
): boolean {
  return actions.every((action) => permissions.includes(action));
}

export function reportPermissionGetRoleFromLevel(
  level: ReportPermissionLevel
): ReportPermissionRole {
  const roleMap: Record<ReportPermissionLevel, ReportPermissionRole> = {
    [REPORT_PERMISSION_LEVELS.NONE]: REPORT_PERMISSION_ROLES.VIEWER,
    [REPORT_PERMISSION_LEVELS.READ]: REPORT_PERMISSION_ROLES.VIEWER,
    [REPORT_PERMISSION_LEVELS.WRITE]: REPORT_PERMISSION_ROLES.ANALYST,
    [REPORT_PERMISSION_LEVELS.EXECUTE]: REPORT_PERMISSION_ROLES.MANAGER,
    [REPORT_PERMISSION_LEVELS.FULL]: REPORT_PERMISSION_ROLES.ADMIN,
  };
  return roleMap[level] || REPORT_PERMISSION_ROLES.VIEWER;
}

export function reportPermissionGetLevelFromRole(
  role: ReportPermissionRole
): ReportPermissionLevel {
  const levelMap: Record<ReportPermissionRole, ReportPermissionLevel> = {
    [REPORT_PERMISSION_ROLES.VIEWER]: REPORT_PERMISSION_LEVELS.READ,
    [REPORT_PERMISSION_ROLES.ANALYST]: REPORT_PERMISSION_LEVELS.WRITE,
    [REPORT_PERMISSION_ROLES.MANAGER]: REPORT_PERMISSION_LEVELS.EXECUTE,
    [REPORT_PERMISSION_ROLES.ADMIN]: REPORT_PERMISSION_LEVELS.FULL,
    [REPORT_PERMISSION_ROLES.SUPER_ADMIN]: REPORT_PERMISSION_LEVELS.FULL,
  };
  return levelMap[role] || REPORT_PERMISSION_LEVELS.NONE;
}

export function reportPermissionGetMessage(
  messageKey: keyof typeof REPORT_PERMISSION_MESSAGES
): string {
  return REPORT_PERMISSION_MESSAGES[messageKey] || 'Unknown permission message';
}

export function reportPermissionIsAdmin(role: ReportPermissionRole): boolean {
  const adminRoles: ReportPermissionRole[] = [
    REPORT_PERMISSION_ROLES.ADMIN,
    REPORT_PERMISSION_ROLES.SUPER_ADMIN,
  ];
  return adminRoles.includes(role);
}

export function reportPermissionCanManageUsers(role: ReportPermissionRole): boolean {
  const manageRoles: ReportPermissionRole[] = [
    REPORT_PERMISSION_ROLES.ADMIN,
    REPORT_PERMISSION_ROLES.SUPER_ADMIN,
  ];
  return manageRoles.includes(role);
}

export function reportPermissionCanManageSettings(role: ReportPermissionRole): boolean {
  const manageRoles: ReportPermissionRole[] = [
    REPORT_PERMISSION_ROLES.ADMIN,
    REPORT_PERMISSION_ROLES.SUPER_ADMIN,
  ];
  return manageRoles.includes(role);
}
