/**
 * Notification Permission Constants
 * Permission definitions for notification system
 */

export const NOTIFICATION_PERMISSION = {
  // Permission Types
  TYPES: {
    SEND: 'send',
    RECEIVE: 'receive',
    MANAGE: 'manage',
    CONFIGURE: 'configure',
    VIEW: 'view',
    ANALYZE: 'analyze',
    EXPORT: 'export',
    DELETE: 'delete',
    ARCHIVE: 'archive',
    CUSTOM: 'custom',
  } as const,

  // Permission Resources
  RESOURCES: {
    NOTIFICATIONS: 'notifications',
    CHANNELS: 'channels',
    TEMPLATES: 'templates',
    SCHEDULES: 'schedules',
    ANALYTICS: 'analytics',
    REPORTS: 'reports',
    PREFERENCES: 'preferences',
    RULES: 'rules',
    DEVICES: 'devices',
    BROADCASTS: 'broadcasts',
    DIGESTS: 'digests',
    ALL: 'all',
  } as const,

  // Permission Actions
  ACTIONS: {
    CREATE: 'create',
    READ: 'read',
    UPDATE: 'update',
    DELETE: 'delete',
    EXECUTE: 'execute',
    MANAGE: 'manage',
    VIEW: 'view',
    EXPORT: 'export',
    IMPORT: 'import',
    APPROVE: 'approve',
    REJECT: 'reject',
    ALL: 'all',
  } as const,

  // Permission Levels
  LEVELS: {
    NONE: 0,
    READ: 1,
    WRITE: 2,
    EXECUTE: 3,
    MANAGE: 4,
    ADMIN: 5,
  } as const,

  // Permission Scopes
  SCOPES: {
    GLOBAL: 'global',
    USER: 'user',
    ROLE: 'role',
    DEPARTMENT: 'department',
    TEAM: 'team',
    INDIVIDUAL: 'individual',
  } as const,

  // Permission Statuses
  STATUSES: {
    GRANTED: 'granted',
    DENIED: 'denied',
    PENDING: 'pending',
    REVOKED: 'revoked',
    EXPIRED: 'expired',
  } as const,

  // Permission Defaults
  DEFAULTS: {
    DEFAULT_LEVEL: 'read',
    DEFAULT_STATUS: 'pending',
    DEFAULT_SCOPE: 'user',
    DEFAULT_RESOURCE: 'notifications',
    DEFAULT_ACTION: 'read',
  } as const,

  // Permission Limits
  LIMITS: {
    MAX_PERMISSIONS_PER_USER: 100,
    MAX_ROLES_PER_USER: 10,
    MAX_PERMISSIONS_PER_ROLE: 50,
    MAX_SCOPES_PER_PERMISSION: 5,
  } as const,
} as const;

// Permission Types
export type NotificationPermissionType =
  (typeof NOTIFICATION_PERMISSION.TYPES)[keyof typeof NOTIFICATION_PERMISSION.TYPES];

// Permission Resources
export type NotificationPermissionResource =
  (typeof NOTIFICATION_PERMISSION.RESOURCES)[keyof typeof NOTIFICATION_PERMISSION.RESOURCES];

// Permission Actions
export type NotificationPermissionAction =
  (typeof NOTIFICATION_PERMISSION.ACTIONS)[keyof typeof NOTIFICATION_PERMISSION.ACTIONS];

// Permission Levels
export type NotificationPermissionLevel =
  (typeof NOTIFICATION_PERMISSION.LEVELS)[keyof typeof NOTIFICATION_PERMISSION.LEVELS];

// Permission Scopes
export type NotificationPermissionScope =
  (typeof NOTIFICATION_PERMISSION.SCOPES)[keyof typeof NOTIFICATION_PERMISSION.SCOPES];

// Permission Statuses
export type NotificationPermissionStatus =
  (typeof NOTIFICATION_PERMISSION.STATUSES)[keyof typeof NOTIFICATION_PERMISSION.STATUSES];

// Permission Defaults
export type NotificationPermissionDefault =
  (typeof NOTIFICATION_PERMISSION.DEFAULTS)[keyof typeof NOTIFICATION_PERMISSION.DEFAULTS];

// Permission Limits
export type NotificationPermissionLimit =
  (typeof NOTIFICATION_PERMISSION.LIMITS)[keyof typeof NOTIFICATION_PERMISSION.LIMITS];

// Utility Functions
export function notificationpermissionGetTypeLabel(type: NotificationPermissionType): string {
  const labels: Record<NotificationPermissionType, string> = {
    [NOTIFICATION_PERMISSION.TYPES.SEND]: 'Send',
    [NOTIFICATION_PERMISSION.TYPES.RECEIVE]: 'Receive',
    [NOTIFICATION_PERMISSION.TYPES.MANAGE]: 'Manage',
    [NOTIFICATION_PERMISSION.TYPES.CONFIGURE]: 'Configure',
    [NOTIFICATION_PERMISSION.TYPES.VIEW]: 'View',
    [NOTIFICATION_PERMISSION.TYPES.ANALYZE]: 'Analyze',
    [NOTIFICATION_PERMISSION.TYPES.EXPORT]: 'Export',
    [NOTIFICATION_PERMISSION.TYPES.DELETE]: 'Delete',
    [NOTIFICATION_PERMISSION.TYPES.ARCHIVE]: 'Archive',
    [NOTIFICATION_PERMISSION.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Permission Type';
}

export function notificationpermissionGetResourceLabel(
  resource: NotificationPermissionResource
): string {
  const labels: Record<NotificationPermissionResource, string> = {
    [NOTIFICATION_PERMISSION.RESOURCES.NOTIFICATIONS]: 'Notifications',
    [NOTIFICATION_PERMISSION.RESOURCES.CHANNELS]: 'Channels',
    [NOTIFICATION_PERMISSION.RESOURCES.TEMPLATES]: 'Templates',
    [NOTIFICATION_PERMISSION.RESOURCES.SCHEDULES]: 'Schedules',
    [NOTIFICATION_PERMISSION.RESOURCES.ANALYTICS]: 'Analytics',
    [NOTIFICATION_PERMISSION.RESOURCES.REPORTS]: 'Reports',
    [NOTIFICATION_PERMISSION.RESOURCES.PREFERENCES]: 'Preferences',
    [NOTIFICATION_PERMISSION.RESOURCES.RULES]: 'Rules',
    [NOTIFICATION_PERMISSION.RESOURCES.DEVICES]: 'Devices',
    [NOTIFICATION_PERMISSION.RESOURCES.BROADCASTS]: 'Broadcasts',
    [NOTIFICATION_PERMISSION.RESOURCES.DIGESTS]: 'Digests',
    [NOTIFICATION_PERMISSION.RESOURCES.ALL]: 'All Resources',
  };
  return labels[resource] || 'Unknown Resource';
}

export function notificationpermissionGetActionLabel(action: NotificationPermissionAction): string {
  const labels: Record<NotificationPermissionAction, string> = {
    [NOTIFICATION_PERMISSION.ACTIONS.CREATE]: 'Create',
    [NOTIFICATION_PERMISSION.ACTIONS.READ]: 'Read',
    [NOTIFICATION_PERMISSION.ACTIONS.UPDATE]: 'Update',
    [NOTIFICATION_PERMISSION.ACTIONS.DELETE]: 'Delete',
    [NOTIFICATION_PERMISSION.ACTIONS.EXECUTE]: 'Execute',
    [NOTIFICATION_PERMISSION.ACTIONS.MANAGE]: 'Manage',
    [NOTIFICATION_PERMISSION.ACTIONS.VIEW]: 'View',
    [NOTIFICATION_PERMISSION.ACTIONS.EXPORT]: 'Export',
    [NOTIFICATION_PERMISSION.ACTIONS.IMPORT]: 'Import',
    [NOTIFICATION_PERMISSION.ACTIONS.APPROVE]: 'Approve',
    [NOTIFICATION_PERMISSION.ACTIONS.REJECT]: 'Reject',
    [NOTIFICATION_PERMISSION.ACTIONS.ALL]: 'All Actions',
  };
  return labels[action] || 'Unknown Action';
}

export function notificationpermissionGetLevelLabel(level: NotificationPermissionLevel): string {
  const labels: Record<NotificationPermissionLevel, string> = {
    [NOTIFICATION_PERMISSION.LEVELS.NONE]: 'None',
    [NOTIFICATION_PERMISSION.LEVELS.READ]: 'Read',
    [NOTIFICATION_PERMISSION.LEVELS.WRITE]: 'Write',
    [NOTIFICATION_PERMISSION.LEVELS.EXECUTE]: 'Execute',
    [NOTIFICATION_PERMISSION.LEVELS.MANAGE]: 'Manage',
    [NOTIFICATION_PERMISSION.LEVELS.ADMIN]: 'Admin',
  };
  return labels[level] || 'Unknown Level';
}

export function notificationpermissionGetScopeLabel(scope: NotificationPermissionScope): string {
  const labels: Record<NotificationPermissionScope, string> = {
    [NOTIFICATION_PERMISSION.SCOPES.GLOBAL]: 'Global',
    [NOTIFICATION_PERMISSION.SCOPES.USER]: 'User',
    [NOTIFICATION_PERMISSION.SCOPES.ROLE]: 'Role',
    [NOTIFICATION_PERMISSION.SCOPES.DEPARTMENT]: 'Department',
    [NOTIFICATION_PERMISSION.SCOPES.TEAM]: 'Team',
    [NOTIFICATION_PERMISSION.SCOPES.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown Scope';
}

export function notificationpermissionGetStatusLabel(status: NotificationPermissionStatus): string {
  const labels: Record<NotificationPermissionStatus, string> = {
    [NOTIFICATION_PERMISSION.STATUSES.GRANTED]: 'Granted',
    [NOTIFICATION_PERMISSION.STATUSES.DENIED]: 'Denied',
    [NOTIFICATION_PERMISSION.STATUSES.PENDING]: 'Pending',
    [NOTIFICATION_PERMISSION.STATUSES.REVOKED]: 'Revoked',
    [NOTIFICATION_PERMISSION.STATUSES.EXPIRED]: 'Expired',
  };
  return labels[status] || 'Unknown Status';
}

export function notificationpermissionIsAdmin(level: NotificationPermissionLevel): boolean {
  return level === NOTIFICATION_PERMISSION.LEVELS.ADMIN;
}

export function notificationpermissionIsManage(level: NotificationPermissionLevel): boolean {
  return level >= NOTIFICATION_PERMISSION.LEVELS.MANAGE;
}

export function notificationpermissionIsWrite(level: NotificationPermissionLevel): boolean {
  return level >= NOTIFICATION_PERMISSION.LEVELS.WRITE;
}

export function notificationpermissionIsRead(level: NotificationPermissionLevel): boolean {
  return level >= NOTIFICATION_PERMISSION.LEVELS.READ;
}

export function notificationpermissionIsGranted(status: NotificationPermissionStatus): boolean {
  return status === NOTIFICATION_PERMISSION.STATUSES.GRANTED;
}

export function notificationpermissionIsPending(status: NotificationPermissionStatus): boolean {
  return status === NOTIFICATION_PERMISSION.STATUSES.PENDING;
}

export function notificationpermissionGetDefaultLevel(): NotificationPermissionLevel {
  const defaultLevel = NOTIFICATION_PERMISSION.DEFAULTS.DEFAULT_LEVEL;
  const levelMap: Record<string, NotificationPermissionLevel> = {
    none: NOTIFICATION_PERMISSION.LEVELS.NONE,
    read: NOTIFICATION_PERMISSION.LEVELS.READ,
    write: NOTIFICATION_PERMISSION.LEVELS.WRITE,
    execute: NOTIFICATION_PERMISSION.LEVELS.EXECUTE,
    manage: NOTIFICATION_PERMISSION.LEVELS.MANAGE,
    admin: NOTIFICATION_PERMISSION.LEVELS.ADMIN,
  };
  return levelMap[defaultLevel] || NOTIFICATION_PERMISSION.LEVELS.READ;
}

export function notificationpermissionGetDefaultResource(): NotificationPermissionResource {
  const defaultResource = NOTIFICATION_PERMISSION.DEFAULTS.DEFAULT_RESOURCE;
  const resourceMap: Record<string, NotificationPermissionResource> = {
    notifications: NOTIFICATION_PERMISSION.RESOURCES.NOTIFICATIONS,
    channels: NOTIFICATION_PERMISSION.RESOURCES.CHANNELS,
    templates: NOTIFICATION_PERMISSION.RESOURCES.TEMPLATES,
    schedules: NOTIFICATION_PERMISSION.RESOURCES.SCHEDULES,
    analytics: NOTIFICATION_PERMISSION.RESOURCES.ANALYTICS,
    reports: NOTIFICATION_PERMISSION.RESOURCES.REPORTS,
    preferences: NOTIFICATION_PERMISSION.RESOURCES.PREFERENCES,
    rules: NOTIFICATION_PERMISSION.RESOURCES.RULES,
    devices: NOTIFICATION_PERMISSION.RESOURCES.DEVICES,
    broadcasts: NOTIFICATION_PERMISSION.RESOURCES.BROADCASTS,
    digests: NOTIFICATION_PERMISSION.RESOURCES.DIGESTS,
    all: NOTIFICATION_PERMISSION.RESOURCES.ALL,
  };
  return resourceMap[defaultResource] || NOTIFICATION_PERMISSION.RESOURCES.NOTIFICATIONS;
}

export function notificationpermissionGetDefaultAction(): NotificationPermissionAction {
  const defaultAction = NOTIFICATION_PERMISSION.DEFAULTS.DEFAULT_ACTION;
  const actionMap: Record<string, NotificationPermissionAction> = {
    create: NOTIFICATION_PERMISSION.ACTIONS.CREATE,
    read: NOTIFICATION_PERMISSION.ACTIONS.READ,
    update: NOTIFICATION_PERMISSION.ACTIONS.UPDATE,
    delete: NOTIFICATION_PERMISSION.ACTIONS.DELETE,
    execute: NOTIFICATION_PERMISSION.ACTIONS.EXECUTE,
    manage: NOTIFICATION_PERMISSION.ACTIONS.MANAGE,
    view: NOTIFICATION_PERMISSION.ACTIONS.VIEW,
    export: NOTIFICATION_PERMISSION.ACTIONS.EXPORT,
    import: NOTIFICATION_PERMISSION.ACTIONS.IMPORT,
    approve: NOTIFICATION_PERMISSION.ACTIONS.APPROVE,
    reject: NOTIFICATION_PERMISSION.ACTIONS.REJECT,
    all: NOTIFICATION_PERMISSION.ACTIONS.ALL,
  };
  return actionMap[defaultAction] || NOTIFICATION_PERMISSION.ACTIONS.READ;
}
