/**
 * Analytics Permission Constants
 * Permission definitions for analytics access control
 */

export const ANALYTICS_PERMISSION = {
  // Permission Types
  TYPES: {
    // View Permissions
    VIEW: 'view',
    VIEW_ALL: 'view_all',
    VIEW_PUBLIC: 'view_public',
    VIEW_PRIVATE: 'view_private',
    VIEW_OWN: 'view_own',

    // Create Permissions
    CREATE: 'create',
    CREATE_ALL: 'create_all',
    CREATE_PUBLIC: 'create_public',
    CREATE_PRIVATE: 'create_private',

    // Edit Permissions
    EDIT: 'edit',
    EDIT_ALL: 'edit_all',
    EDIT_PUBLIC: 'edit_public',
    EDIT_PRIVATE: 'edit_private',
    EDIT_OWN: 'edit_own',

    // Delete Permissions
    DELETE: 'delete',
    DELETE_ALL: 'delete_all',
    DELETE_PUBLIC: 'delete_public',
    DELETE_PRIVATE: 'delete_private',
    DELETE_OWN: 'delete_own',

    // Export Permissions
    EXPORT: 'export',
    EXPORT_ALL: 'export_all',
    EXPORT_PUBLIC: 'export_public',
    EXPORT_PRIVATE: 'export_private',

    // Share Permissions
    SHARE: 'share',
    SHARE_PUBLIC: 'share_public',
    SHARE_PRIVATE: 'share_private',
    SHARE_TEAM: 'share_team',

    // Admin Permissions
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
    SYSTEM_ADMIN: 'system_admin',

    // Special Permissions
    MANAGE_USERS: 'manage_users',
    MANAGE_ROLES: 'manage_roles',
    MANAGE_REPORTS: 'manage_reports',
    MANAGE_DASHBOARDS: 'manage_dashboards',
    MANAGE_DATASOURCES: 'manage_datasources',
    MANAGE_SETTINGS: 'manage_settings',
    MANAGE_INTEGRATIONS: 'manage_integrations',
  } as const,

  // Permission Resources
  RESOURCES: {
    // Analytics Resources
    ANALYTICS: 'analytics',
    REPORTS: 'reports',
    DASHBOARDS: 'dashboards',
    DATASOURCES: 'datasources',
    METRICS: 'metrics',
    DIMENSIONS: 'dimensions',

    // Data Resources
    USER_DATA: 'user_data',
    PRODUCT_DATA: 'product_data',
    ORDER_DATA: 'order_data',
    SALES_DATA: 'sales_data',
    MARKETING_DATA: 'marketing_data',

    // System Resources
    SYSTEM: 'system',
    SETTINGS: 'settings',
    INTEGRATIONS: 'integrations',
    USERS: 'users',
    ROLES: 'roles',
  } as const,

  // Permission Levels
  LEVELS: {
    NONE: 'none',
    READ: 'read',
    WRITE: 'write',
    EXECUTE: 'execute',
    ADMIN: 'admin',
    OWNER: 'owner',
  } as const,

  // Permission Scopes
  SCOPES: {
    GLOBAL: 'global',
    ORGANIZATION: 'organization',
    TEAM: 'team',
    USER: 'user',
  } as const,

  // Permission Actions
  ACTIONS: {
    ALLOW: 'allow',
    DENY: 'deny',
    INHERIT: 'inherit',
  } as const,

  // Permission Effects
  EFFECTS: {
    GRANT: 'grant',
    REVOKE: 'revoke',
    OVERRIDE: 'override',
  } as const,

  // Permission Conditions
  CONDITIONS: {
    ALWAYS: 'always',
    NEVER: 'never',
    IF_OWNER: 'if_owner',
    IF_TEAM: 'if_team',
    IF_ORGANIZATION: 'if_organization',
    IF_PUBLIC: 'if_public',
    IF_PRIVATE: 'if_private',
    IF_ACTIVE: 'if_active',
    IF_VERIFIED: 'if_verified',
    IF_PREMIUM: 'if_premium',
  } as const,
} as const;

// Analytics Permission Types
export type AnalyticsPermissionType =
  (typeof ANALYTICS_PERMISSION.TYPES)[keyof typeof ANALYTICS_PERMISSION.TYPES];

// Analytics Permission Resources
export type AnalyticsPermissionResource =
  (typeof ANALYTICS_PERMISSION.RESOURCES)[keyof typeof ANALYTICS_PERMISSION.RESOURCES];

// Analytics Permission Levels
export type AnalyticsPermissionLevel =
  (typeof ANALYTICS_PERMISSION.LEVELS)[keyof typeof ANALYTICS_PERMISSION.LEVELS];

// Analytics Permission Scopes
export type AnalyticsPermissionScope =
  (typeof ANALYTICS_PERMISSION.SCOPES)[keyof typeof ANALYTICS_PERMISSION.SCOPES];

// Analytics Permission Actions
export type AnalyticsPermissionAction =
  (typeof ANALYTICS_PERMISSION.ACTIONS)[keyof typeof ANALYTICS_PERMISSION.ACTIONS];

// Analytics Permission Effects
export type AnalyticsPermissionEffect =
  (typeof ANALYTICS_PERMISSION.EFFECTS)[keyof typeof ANALYTICS_PERMISSION.EFFECTS];

// Analytics Permission Conditions
export type AnalyticsPermissionCondition =
  (typeof ANALYTICS_PERMISSION.CONDITIONS)[keyof typeof ANALYTICS_PERMISSION.CONDITIONS];

// Analytics Permission Labels
export function getAnalyticsPermissionLabel(permission: AnalyticsPermissionType): string {
  const labels: Record<AnalyticsPermissionType, string> = {
    [ANALYTICS_PERMISSION.TYPES.VIEW]: 'View',
    [ANALYTICS_PERMISSION.TYPES.VIEW_ALL]: 'View All',
    [ANALYTICS_PERMISSION.TYPES.VIEW_PUBLIC]: 'View Public',
    [ANALYTICS_PERMISSION.TYPES.VIEW_PRIVATE]: 'View Private',
    [ANALYTICS_PERMISSION.TYPES.VIEW_OWN]: 'View Own',
    [ANALYTICS_PERMISSION.TYPES.CREATE]: 'Create',
    [ANALYTICS_PERMISSION.TYPES.CREATE_ALL]: 'Create All',
    [ANALYTICS_PERMISSION.TYPES.CREATE_PUBLIC]: 'Create Public',
    [ANALYTICS_PERMISSION.TYPES.CREATE_PRIVATE]: 'Create Private',
    [ANALYTICS_PERMISSION.TYPES.EDIT]: 'Edit',
    [ANALYTICS_PERMISSION.TYPES.EDIT_ALL]: 'Edit All',
    [ANALYTICS_PERMISSION.TYPES.EDIT_PUBLIC]: 'Edit Public',
    [ANALYTICS_PERMISSION.TYPES.EDIT_PRIVATE]: 'Edit Private',
    [ANALYTICS_PERMISSION.TYPES.EDIT_OWN]: 'Edit Own',
    [ANALYTICS_PERMISSION.TYPES.DELETE]: 'Delete',
    [ANALYTICS_PERMISSION.TYPES.DELETE_ALL]: 'Delete All',
    [ANALYTICS_PERMISSION.TYPES.DELETE_PUBLIC]: 'Delete Public',
    [ANALYTICS_PERMISSION.TYPES.DELETE_PRIVATE]: 'Delete Private',
    [ANALYTICS_PERMISSION.TYPES.DELETE_OWN]: 'Delete Own',
    [ANALYTICS_PERMISSION.TYPES.EXPORT]: 'Export',
    [ANALYTICS_PERMISSION.TYPES.EXPORT_ALL]: 'Export All',
    [ANALYTICS_PERMISSION.TYPES.EXPORT_PUBLIC]: 'Export Public',
    [ANALYTICS_PERMISSION.TYPES.EXPORT_PRIVATE]: 'Export Private',
    [ANALYTICS_PERMISSION.TYPES.SHARE]: 'Share',
    [ANALYTICS_PERMISSION.TYPES.SHARE_PUBLIC]: 'Share Public',
    [ANALYTICS_PERMISSION.TYPES.SHARE_PRIVATE]: 'Share Private',
    [ANALYTICS_PERMISSION.TYPES.SHARE_TEAM]: 'Share Team',
    [ANALYTICS_PERMISSION.TYPES.ADMIN]: 'Admin',
    [ANALYTICS_PERMISSION.TYPES.SUPER_ADMIN]: 'Super Admin',
    [ANALYTICS_PERMISSION.TYPES.SYSTEM_ADMIN]: 'System Admin',
    [ANALYTICS_PERMISSION.TYPES.MANAGE_USERS]: 'Manage Users',
    [ANALYTICS_PERMISSION.TYPES.MANAGE_ROLES]: 'Manage Roles',
    [ANALYTICS_PERMISSION.TYPES.MANAGE_REPORTS]: 'Manage Reports',
    [ANALYTICS_PERMISSION.TYPES.MANAGE_DASHBOARDS]: 'Manage Dashboards',
    [ANALYTICS_PERMISSION.TYPES.MANAGE_DATASOURCES]: 'Manage Datasources',
    [ANALYTICS_PERMISSION.TYPES.MANAGE_SETTINGS]: 'Manage Settings',
    [ANALYTICS_PERMISSION.TYPES.MANAGE_INTEGRATIONS]: 'Manage Integrations',
  };
  return labels[permission] || 'Unknown';
}

// Analytics Permission Resource Labels
export function getAnalyticsPermissionResourceLabel(resource: AnalyticsPermissionResource): string {
  const labels: Record<AnalyticsPermissionResource, string> = {
    [ANALYTICS_PERMISSION.RESOURCES.ANALYTICS]: 'Analytics',
    [ANALYTICS_PERMISSION.RESOURCES.REPORTS]: 'Reports',
    [ANALYTICS_PERMISSION.RESOURCES.DASHBOARDS]: 'Dashboards',
    [ANALYTICS_PERMISSION.RESOURCES.DATASOURCES]: 'Datasources',
    [ANALYTICS_PERMISSION.RESOURCES.METRICS]: 'Metrics',
    [ANALYTICS_PERMISSION.RESOURCES.DIMENSIONS]: 'Dimensions',
    [ANALYTICS_PERMISSION.RESOURCES.USER_DATA]: 'User Data',
    [ANALYTICS_PERMISSION.RESOURCES.PRODUCT_DATA]: 'Product Data',
    [ANALYTICS_PERMISSION.RESOURCES.ORDER_DATA]: 'Order Data',
    [ANALYTICS_PERMISSION.RESOURCES.SALES_DATA]: 'Sales Data',
    [ANALYTICS_PERMISSION.RESOURCES.MARKETING_DATA]: 'Marketing Data',
    [ANALYTICS_PERMISSION.RESOURCES.SYSTEM]: 'System',
    [ANALYTICS_PERMISSION.RESOURCES.SETTINGS]: 'Settings',
    [ANALYTICS_PERMISSION.RESOURCES.INTEGRATIONS]: 'Integrations',
    [ANALYTICS_PERMISSION.RESOURCES.USERS]: 'Users',
    [ANALYTICS_PERMISSION.RESOURCES.ROLES]: 'Roles',
  };
  return labels[resource] || 'Unknown';
}

// Analytics Permission Level Labels
export function getAnalyticsPermissionLevelLabel(level: AnalyticsPermissionLevel): string {
  const labels: Record<AnalyticsPermissionLevel, string> = {
    [ANALYTICS_PERMISSION.LEVELS.NONE]: 'None',
    [ANALYTICS_PERMISSION.LEVELS.READ]: 'Read',
    [ANALYTICS_PERMISSION.LEVELS.WRITE]: 'Write',
    [ANALYTICS_PERMISSION.LEVELS.EXECUTE]: 'Execute',
    [ANALYTICS_PERMISSION.LEVELS.ADMIN]: 'Admin',
    [ANALYTICS_PERMISSION.LEVELS.OWNER]: 'Owner',
  };
  return labels[level] || 'Unknown';
}

// Analytics Permission Scope Labels
export function getAnalyticsPermissionScopeLabel(scope: AnalyticsPermissionScope): string {
  const labels: Record<AnalyticsPermissionScope, string> = {
    [ANALYTICS_PERMISSION.SCOPES.GLOBAL]: 'Global',
    [ANALYTICS_PERMISSION.SCOPES.ORGANIZATION]: 'Organization',
    [ANALYTICS_PERMISSION.SCOPES.TEAM]: 'Team',
    [ANALYTICS_PERMISSION.SCOPES.USER]: 'User',
  };
  return labels[scope] || 'Unknown';
}

// Analytics Permission Action Labels
export function getAnalyticsPermissionActionLabel(action: AnalyticsPermissionAction): string {
  const labels: Record<AnalyticsPermissionAction, string> = {
    [ANALYTICS_PERMISSION.ACTIONS.ALLOW]: 'Allow',
    [ANALYTICS_PERMISSION.ACTIONS.DENY]: 'Deny',
    [ANALYTICS_PERMISSION.ACTIONS.INHERIT]: 'Inherit',
  };
  return labels[action] || 'Unknown';
}

// Analytics Permission Effect Labels
export function getAnalyticsPermissionEffectLabel(effect: AnalyticsPermissionEffect): string {
  const labels: Record<AnalyticsPermissionEffect, string> = {
    [ANALYTICS_PERMISSION.EFFECTS.GRANT]: 'Grant',
    [ANALYTICS_PERMISSION.EFFECTS.REVOKE]: 'Revoke',
    [ANALYTICS_PERMISSION.EFFECTS.OVERRIDE]: 'Override',
  };
  return labels[effect] || 'Unknown';
}

// Analytics Permission Condition Labels
export function getAnalyticsPermissionConditionLabel(
  condition: AnalyticsPermissionCondition
): string {
  const labels: Record<AnalyticsPermissionCondition, string> = {
    [ANALYTICS_PERMISSION.CONDITIONS.ALWAYS]: 'Always',
    [ANALYTICS_PERMISSION.CONDITIONS.NEVER]: 'Never',
    [ANALYTICS_PERMISSION.CONDITIONS.IF_OWNER]: 'If Owner',
    [ANALYTICS_PERMISSION.CONDITIONS.IF_TEAM]: 'If Team Member',
    [ANALYTICS_PERMISSION.CONDITIONS.IF_ORGANIZATION]: 'If Organization Member',
    [ANALYTICS_PERMISSION.CONDITIONS.IF_PUBLIC]: 'If Public',
    [ANALYTICS_PERMISSION.CONDITIONS.IF_PRIVATE]: 'If Private',
    [ANALYTICS_PERMISSION.CONDITIONS.IF_ACTIVE]: 'If Active',
    [ANALYTICS_PERMISSION.CONDITIONS.IF_VERIFIED]: 'If Verified',
    [ANALYTICS_PERMISSION.CONDITIONS.IF_PREMIUM]: 'If Premium',
  };
  return labels[condition] || 'Unknown';
}

// Check if permission is admin
export function isAnalyticsPermissionAdmin(permission: AnalyticsPermissionType): boolean {
  const adminPermissions: AnalyticsPermissionType[] = [
    ANALYTICS_PERMISSION.TYPES.ADMIN,
    ANALYTICS_PERMISSION.TYPES.SUPER_ADMIN,
    ANALYTICS_PERMISSION.TYPES.SYSTEM_ADMIN,
  ];
  return adminPermissions.includes(permission);
}

// Check if permission is management
export function isAnalyticsPermissionManagement(permission: AnalyticsPermissionType): boolean {
  const managementPermissions: AnalyticsPermissionType[] = [
    ANALYTICS_PERMISSION.TYPES.MANAGE_USERS,
    ANALYTICS_PERMISSION.TYPES.MANAGE_ROLES,
    ANALYTICS_PERMISSION.TYPES.MANAGE_REPORTS,
    ANALYTICS_PERMISSION.TYPES.MANAGE_DASHBOARDS,
    ANALYTICS_PERMISSION.TYPES.MANAGE_DATASOURCES,
    ANALYTICS_PERMISSION.TYPES.MANAGE_SETTINGS,
    ANALYTICS_PERMISSION.TYPES.MANAGE_INTEGRATIONS,
  ];
  return managementPermissions.includes(permission);
}

// Check if permission is view
export function isAnalyticsPermissionView(permission: AnalyticsPermissionType): boolean {
  const viewPermissions: AnalyticsPermissionType[] = [
    ANALYTICS_PERMISSION.TYPES.VIEW,
    ANALYTICS_PERMISSION.TYPES.VIEW_ALL,
    ANALYTICS_PERMISSION.TYPES.VIEW_PUBLIC,
    ANALYTICS_PERMISSION.TYPES.VIEW_PRIVATE,
    ANALYTICS_PERMISSION.TYPES.VIEW_OWN,
  ];
  return viewPermissions.includes(permission);
}

// Get permission level from permission type
export function getAnalyticsPermissionLevel(
  permission: AnalyticsPermissionType
): AnalyticsPermissionLevel {
  if (isAnalyticsPermissionAdmin(permission)) return ANALYTICS_PERMISSION.LEVELS.ADMIN;
  if (isAnalyticsPermissionManagement(permission)) return ANALYTICS_PERMISSION.LEVELS.WRITE;

  if (
    permission.includes('create') ||
    permission.includes('edit') ||
    permission.includes('delete') ||
    permission.includes('share')
  ) {
    return ANALYTICS_PERMISSION.LEVELS.WRITE;
  }

  if (permission.includes('view') || permission.includes('export')) {
    return ANALYTICS_PERMISSION.LEVELS.READ;
  }

  return ANALYTICS_PERMISSION.LEVELS.NONE;
}
