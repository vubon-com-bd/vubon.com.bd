/**
 * Vendor Permission Constants
 * Permission definitions for vendors
 */

// Permission Modules
export const VENDOR_PERMISSION_MODULES = {
  PRODUCT: 'product',
  ORDER: 'order',
  PAYMENT: 'payment',
  SETTLEMENT: 'settlement',
  PROFILE: 'profile',
  TEAM: 'team',
  REPORT: 'report',
  ANALYTICS: 'analytics',
  SUPPORT: 'support',
  SETTINGS: 'settings',
  NOTIFICATION: 'notification',
  FEATURE: 'feature',
} as const;

export type VendorPermissionModule =
  (typeof VENDOR_PERMISSION_MODULES)[keyof typeof VENDOR_PERMISSION_MODULES];

// Permission Actions
export const VENDOR_PERMISSION_ACTIONS = {
  VIEW: 'view',
  CREATE: 'create',
  EDIT: 'edit',
  UPDATE: 'update',
  DELETE: 'delete',
  APPROVE: 'approve',
  REJECT: 'reject',
  EXPORT: 'export',
  MANAGE: 'manage',
  ADMIN: 'admin',
} as const;

export type VendorPermissionAction =
  (typeof VENDOR_PERMISSION_ACTIONS)[keyof typeof VENDOR_PERMISSION_ACTIONS];

// Permission Roles
export const VENDOR_PERMISSION_ROLES = {
  MEMBER: 'member',
  SENIOR: 'senior',
  MANAGER: 'manager',
  ADMIN: 'admin',
} as const;

export type VendorPermissionRole =
  (typeof VENDOR_PERMISSION_ROLES)[keyof typeof VENDOR_PERMISSION_ROLES];

// Permission Levels
export const VENDOR_PERMISSION_LEVELS = {
  NONE: 0,
  READ: 1,
  WRITE: 2,
  MODIFY: 3,
  DELETE: 4,
  ADMIN: 5,
} as const;

export type VendorPermissionLevel =
  (typeof VENDOR_PERMISSION_LEVELS)[keyof typeof VENDOR_PERMISSION_LEVELS];

// Default Permissions
export const VENDOR_PERMISSION_DEFAULTS: Record<VendorPermissionRole, Record<string, string[]>> = {
  [VENDOR_PERMISSION_ROLES.MEMBER]: {
    product: ['view', 'create', 'edit'],
    order: ['view', 'create'],
    payment: ['view'],
    settlement: ['view'],
    profile: ['view', 'edit'],
    report: ['view'],
    support: ['view', 'create'],
    notification: ['view'],
  },
  [VENDOR_PERMISSION_ROLES.SENIOR]: {
    product: ['view', 'create', 'edit', 'delete'],
    order: ['view', 'create', 'edit', 'update'],
    payment: ['view', 'create'],
    settlement: ['view'],
    profile: ['view', 'edit', 'update'],
    report: ['view', 'export'],
    support: ['view', 'create', 'edit'],
    notification: ['view', 'create'],
    team: ['view'],
  },
  [VENDOR_PERMISSION_ROLES.MANAGER]: {
    product: ['view', 'create', 'edit', 'delete', 'approve', 'reject'],
    order: ['view', 'create', 'edit', 'update', 'delete'],
    payment: ['view', 'create', 'edit'],
    settlement: ['view', 'create'],
    profile: ['view', 'edit', 'update'],
    report: ['view', 'export', 'create'],
    support: ['view', 'create', 'edit', 'delete'],
    notification: ['view', 'create', 'edit', 'delete'],
    team: ['view', 'create', 'edit', 'delete', 'manage'],
    settings: ['view', 'edit'],
    analytics: ['view', 'export'],
  },
  [VENDOR_PERMISSION_ROLES.ADMIN]: {
    product: ['view', 'create', 'edit', 'delete', 'approve', 'reject', 'manage'],
    order: ['view', 'create', 'edit', 'update', 'delete', 'manage'],
    payment: ['view', 'create', 'edit', 'delete', 'manage'],
    settlement: ['view', 'create', 'edit', 'delete', 'manage'],
    profile: ['view', 'edit', 'update', 'delete', 'manage'],
    report: ['view', 'export', 'create', 'delete', 'manage'],
    support: ['view', 'create', 'edit', 'delete', 'manage'],
    notification: ['view', 'create', 'edit', 'delete', 'manage'],
    team: ['view', 'create', 'edit', 'delete', 'manage', 'admin'],
    settings: ['view', 'edit', 'manage', 'admin'],
    analytics: ['view', 'export', 'manage'],
    feature: ['view', 'manage', 'admin'],
  },
};

// Utility Functions
export function vendorPermissionGetModuleLabel(module: VendorPermissionModule): string {
  const labels: Record<VendorPermissionModule, string> = {
    [VENDOR_PERMISSION_MODULES.PRODUCT]: 'Product Management',
    [VENDOR_PERMISSION_MODULES.ORDER]: 'Order Management',
    [VENDOR_PERMISSION_MODULES.PAYMENT]: 'Payment Management',
    [VENDOR_PERMISSION_MODULES.SETTLEMENT]: 'Settlement Management',
    [VENDOR_PERMISSION_MODULES.PROFILE]: 'Profile Management',
    [VENDOR_PERMISSION_MODULES.TEAM]: 'Team Management',
    [VENDOR_PERMISSION_MODULES.REPORT]: 'Report Management',
    [VENDOR_PERMISSION_MODULES.ANALYTICS]: 'Analytics',
    [VENDOR_PERMISSION_MODULES.SUPPORT]: 'Support',
    [VENDOR_PERMISSION_MODULES.SETTINGS]: 'Settings',
    [VENDOR_PERMISSION_MODULES.NOTIFICATION]: 'Notification',
    [VENDOR_PERMISSION_MODULES.FEATURE]: 'Feature Management',
  };
  return labels[module] || 'Unknown';
}

export function vendorPermissionGetActionLabel(action: VendorPermissionAction): string {
  const labels: Record<VendorPermissionAction, string> = {
    [VENDOR_PERMISSION_ACTIONS.VIEW]: 'View',
    [VENDOR_PERMISSION_ACTIONS.CREATE]: 'Create',
    [VENDOR_PERMISSION_ACTIONS.EDIT]: 'Edit',
    [VENDOR_PERMISSION_ACTIONS.UPDATE]: 'Update',
    [VENDOR_PERMISSION_ACTIONS.DELETE]: 'Delete',
    [VENDOR_PERMISSION_ACTIONS.APPROVE]: 'Approve',
    [VENDOR_PERMISSION_ACTIONS.REJECT]: 'Reject',
    [VENDOR_PERMISSION_ACTIONS.EXPORT]: 'Export',
    [VENDOR_PERMISSION_ACTIONS.MANAGE]: 'Manage',
    [VENDOR_PERMISSION_ACTIONS.ADMIN]: 'Admin',
  };
  return labels[action] || 'Unknown';
}

export function vendorPermissionGetRoleLabel(role: VendorPermissionRole): string {
  const labels: Record<VendorPermissionRole, string> = {
    [VENDOR_PERMISSION_ROLES.MEMBER]: 'Member',
    [VENDOR_PERMISSION_ROLES.SENIOR]: 'Senior',
    [VENDOR_PERMISSION_ROLES.MANAGER]: 'Manager',
    [VENDOR_PERMISSION_ROLES.ADMIN]: 'Admin',
  };
  return labels[role] || 'Unknown';
}

export function vendorPermissionGetLevelLabel(level: VendorPermissionLevel): string {
  const labels: Record<VendorPermissionLevel, string> = {
    [VENDOR_PERMISSION_LEVELS.NONE]: 'None',
    [VENDOR_PERMISSION_LEVELS.READ]: 'Read',
    [VENDOR_PERMISSION_LEVELS.WRITE]: 'Write',
    [VENDOR_PERMISSION_LEVELS.MODIFY]: 'Modify',
    [VENDOR_PERMISSION_LEVELS.DELETE]: 'Delete',
    [VENDOR_PERMISSION_LEVELS.ADMIN]: 'Admin',
  };
  return labels[level] || 'Unknown';
}

export function vendorPermissionHasPermission(
  role: VendorPermissionRole,
  module: VendorPermissionModule,
  action: VendorPermissionAction
): boolean {
  const permissions = VENDOR_PERMISSION_DEFAULTS[role];
  if (!permissions) return false;

  const modulePermissions = permissions[module as keyof typeof permissions];
  if (!modulePermissions) return false;

  return modulePermissions.includes(action);
}

export function vendorPermissionGetRolePermissions(
  role: VendorPermissionRole,
  module: VendorPermissionModule
): string[] {
  const permissions = VENDOR_PERMISSION_DEFAULTS[role];
  if (!permissions) return [];

  return permissions[module as keyof typeof permissions] || [];
}
