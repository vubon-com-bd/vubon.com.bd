/**
 * Logistics Permission Constants
 * Permission definitions for logistics system
 */

export const LOGISTICS_PERMISSION = {
  // Permission Modules
  MODULES: {
    SHIPMENT: 'shipment',
    DELIVERY: 'delivery',
    COURIER: 'courier',
    VEHICLE: 'vehicle',
    DRIVER: 'driver',
    WAREHOUSE: 'warehouse',
    TRACKING: 'tracking',
    ROUTE: 'route',
    ZONE: 'zone',
    RETURN: 'return',
    INSURANCE: 'insurance',
    PACKAGING: 'packaging',
    REPORT: 'report',
    ANALYTICS: 'analytics',
    SETTINGS: 'settings',
    PERMISSION: 'permission',
  } as const,

  // Permission Actions
  ACTIONS: {
    VIEW: 'view',
    CREATE: 'create',
    EDIT: 'edit',
    UPDATE: 'update',
    DELETE: 'delete',
    ASSIGN: 'assign',
    REASSIGN: 'reassign',
    CANCEL: 'cancel',
    COMPLETE: 'complete',
    APPROVE: 'approve',
    REJECT: 'reject',
    EXPORT: 'export',
    IMPORT: 'import',
    MANAGE: 'manage',
    ADMIN: 'admin',
  } as const,

  // Permission Roles
  ROLES: {
    VIEWER: 'viewer',
    OPERATOR: 'operator',
    SUPERVISOR: 'supervisor',
    MANAGER: 'manager',
    ADMIN: 'admin',
  } as const,

  // Permission Levels
  LEVELS: {
    NONE: 0,
    READ: 1,
    WRITE: 2,
    MODIFY: 3,
    DELETE: 4,
    ADMIN: 5,
  } as const,

  // Permission Scopes
  SCOPES: {
    GLOBAL: 'global',
    REGION: 'region',
    WAREHOUSE: 'warehouse',
    OWN: 'own',
  } as const,

  // Default Permissions (using functions to return mutable arrays)
  get DEFAULTS() {
    return {
      VIEWER: {
        shipment: ['view'],
        delivery: ['view'],
        tracking: ['view'],
        report: ['view'],
        analytics: ['view'],
      },
      OPERATOR: {
        shipment: ['view', 'create', 'edit', 'update', 'cancel'],
        delivery: ['view', 'create', 'edit', 'update', 'cancel', 'complete'],
        courier: ['view', 'create', 'edit'],
        vehicle: ['view', 'create', 'edit'],
        driver: ['view', 'create', 'edit'],
        warehouse: ['view', 'create', 'edit'],
        tracking: ['view', 'create', 'update'],
        route: ['view', 'create', 'edit'],
        zone: ['view', 'create', 'edit'],
        return: ['view', 'create', 'edit', 'cancel'],
        packaging: ['view', 'create', 'edit'],
        report: ['view', 'export'],
        analytics: ['view', 'export'],
      },
      SUPERVISOR: {
        shipment: [
          'view',
          'create',
          'edit',
          'update',
          'delete',
          'cancel',
          'assign',
          'reassign',
          'approve',
          'reject',
        ],
        delivery: [
          'view',
          'create',
          'edit',
          'update',
          'delete',
          'cancel',
          'complete',
          'approve',
          'reject',
        ],
        courier: ['view', 'create', 'edit', 'delete', 'manage'],
        vehicle: ['view', 'create', 'edit', 'delete', 'manage'],
        driver: ['view', 'create', 'edit', 'delete', 'manage'],
        warehouse: ['view', 'create', 'edit', 'delete', 'manage'],
        tracking: ['view', 'create', 'update', 'delete'],
        route: ['view', 'create', 'edit', 'delete', 'manage'],
        zone: ['view', 'create', 'edit', 'delete', 'manage'],
        return: ['view', 'create', 'edit', 'delete', 'cancel', 'approve', 'reject'],
        insurance: ['view', 'create', 'edit', 'delete'],
        packaging: ['view', 'create', 'edit', 'delete'],
        report: ['view', 'export', 'create', 'delete'],
        analytics: ['view', 'export', 'create', 'delete'],
      },
      MANAGER: {
        shipment: [
          'view',
          'create',
          'edit',
          'update',
          'delete',
          'cancel',
          'assign',
          'reassign',
          'approve',
          'reject',
        ],
        delivery: [
          'view',
          'create',
          'edit',
          'update',
          'delete',
          'cancel',
          'complete',
          'approve',
          'reject',
        ],
        courier: ['view', 'create', 'edit', 'delete', 'manage', 'admin'],
        vehicle: ['view', 'create', 'edit', 'delete', 'manage', 'admin'],
        driver: ['view', 'create', 'edit', 'delete', 'manage', 'admin'],
        warehouse: ['view', 'create', 'edit', 'delete', 'manage', 'admin'],
        tracking: ['view', 'create', 'update', 'delete', 'admin'],
        route: ['view', 'create', 'edit', 'delete', 'manage', 'admin'],
        zone: ['view', 'create', 'edit', 'delete', 'manage', 'admin'],
        return: ['view', 'create', 'edit', 'delete', 'cancel', 'approve', 'reject', 'admin'],
        insurance: ['view', 'create', 'edit', 'delete', 'approve', 'reject'],
        packaging: ['view', 'create', 'edit', 'delete', 'manage'],
        report: ['view', 'export', 'create', 'delete', 'manage'],
        analytics: ['view', 'export', 'create', 'delete', 'manage'],
        settings: ['view', 'manage'],
        permission: ['view'],
      },
      ADMIN: {
        shipment: [
          'view',
          'create',
          'edit',
          'update',
          'delete',
          'cancel',
          'assign',
          'reassign',
          'approve',
          'reject',
          'admin',
        ],
        delivery: [
          'view',
          'create',
          'edit',
          'update',
          'delete',
          'cancel',
          'complete',
          'approve',
          'reject',
          'admin',
        ],
        courier: ['view', 'create', 'edit', 'delete', 'manage', 'admin'],
        vehicle: ['view', 'create', 'edit', 'delete', 'manage', 'admin'],
        driver: ['view', 'create', 'edit', 'delete', 'manage', 'admin'],
        warehouse: ['view', 'create', 'edit', 'delete', 'manage', 'admin'],
        tracking: ['view', 'create', 'update', 'delete', 'admin'],
        route: ['view', 'create', 'edit', 'delete', 'manage', 'admin'],
        zone: ['view', 'create', 'edit', 'delete', 'manage', 'admin'],
        return: ['view', 'create', 'edit', 'delete', 'cancel', 'approve', 'reject', 'admin'],
        insurance: ['view', 'create', 'edit', 'delete', 'approve', 'reject', 'admin'],
        packaging: ['view', 'create', 'edit', 'delete', 'manage', 'admin'],
        report: ['view', 'export', 'create', 'delete', 'manage', 'admin'],
        analytics: ['view', 'export', 'create', 'delete', 'manage', 'admin'],
        settings: ['view', 'manage', 'admin'],
        permission: ['view', 'manage', 'admin'],
      },
    };
  },
} as const;

// Permission Modules
export type LogisticsPermissionModule =
  (typeof LOGISTICS_PERMISSION.MODULES)[keyof typeof LOGISTICS_PERMISSION.MODULES];

// Permission Actions
export type LogisticsPermissionAction =
  (typeof LOGISTICS_PERMISSION.ACTIONS)[keyof typeof LOGISTICS_PERMISSION.ACTIONS];

// Permission Roles
export type LogisticsPermissionRole =
  (typeof LOGISTICS_PERMISSION.ROLES)[keyof typeof LOGISTICS_PERMISSION.ROLES];

// Permission Levels
export type LogisticsPermissionLevel =
  (typeof LOGISTICS_PERMISSION.LEVELS)[keyof typeof LOGISTICS_PERMISSION.LEVELS];

// Permission Scopes
export type LogisticsPermissionScope =
  (typeof LOGISTICS_PERMISSION.SCOPES)[keyof typeof LOGISTICS_PERMISSION.SCOPES];

// Utility Functions
export function logisticsPermissionGetRoleLabel(role: LogisticsPermissionRole): string {
  const labels: Record<LogisticsPermissionRole, string> = {
    [LOGISTICS_PERMISSION.ROLES.VIEWER]: 'Viewer',
    [LOGISTICS_PERMISSION.ROLES.OPERATOR]: 'Operator',
    [LOGISTICS_PERMISSION.ROLES.SUPERVISOR]: 'Supervisor',
    [LOGISTICS_PERMISSION.ROLES.MANAGER]: 'Manager',
    [LOGISTICS_PERMISSION.ROLES.ADMIN]: 'Admin',
  };
  return labels[role] || 'Unknown';
}

export function logisticsPermissionGetActionLabel(action: LogisticsPermissionAction): string {
  const labels: Record<LogisticsPermissionAction, string> = {
    [LOGISTICS_PERMISSION.ACTIONS.VIEW]: 'View',
    [LOGISTICS_PERMISSION.ACTIONS.CREATE]: 'Create',
    [LOGISTICS_PERMISSION.ACTIONS.EDIT]: 'Edit',
    [LOGISTICS_PERMISSION.ACTIONS.UPDATE]: 'Update',
    [LOGISTICS_PERMISSION.ACTIONS.DELETE]: 'Delete',
    [LOGISTICS_PERMISSION.ACTIONS.ASSIGN]: 'Assign',
    [LOGISTICS_PERMISSION.ACTIONS.REASSIGN]: 'Reassign',
    [LOGISTICS_PERMISSION.ACTIONS.CANCEL]: 'Cancel',
    [LOGISTICS_PERMISSION.ACTIONS.COMPLETE]: 'Complete',
    [LOGISTICS_PERMISSION.ACTIONS.APPROVE]: 'Approve',
    [LOGISTICS_PERMISSION.ACTIONS.REJECT]: 'Reject',
    [LOGISTICS_PERMISSION.ACTIONS.EXPORT]: 'Export',
    [LOGISTICS_PERMISSION.ACTIONS.IMPORT]: 'Import',
    [LOGISTICS_PERMISSION.ACTIONS.MANAGE]: 'Manage',
    [LOGISTICS_PERMISSION.ACTIONS.ADMIN]: 'Admin',
  };
  return labels[action] || 'Unknown';
}

export function logisticsPermissionGetLevelLabel(level: LogisticsPermissionLevel): string {
  const labels: Record<LogisticsPermissionLevel, string> = {
    [LOGISTICS_PERMISSION.LEVELS.NONE]: 'None',
    [LOGISTICS_PERMISSION.LEVELS.READ]: 'Read',
    [LOGISTICS_PERMISSION.LEVELS.WRITE]: 'Write',
    [LOGISTICS_PERMISSION.LEVELS.MODIFY]: 'Modify',
    [LOGISTICS_PERMISSION.LEVELS.DELETE]: 'Delete',
    [LOGISTICS_PERMISSION.LEVELS.ADMIN]: 'Admin',
  };
  return labels[level] || 'Unknown';
}

export function logisticsPermissionGetScopeLabel(scope: LogisticsPermissionScope): string {
  const labels: Record<LogisticsPermissionScope, string> = {
    [LOGISTICS_PERMISSION.SCOPES.GLOBAL]: 'Global',
    [LOGISTICS_PERMISSION.SCOPES.REGION]: 'Region',
    [LOGISTICS_PERMISSION.SCOPES.WAREHOUSE]: 'Warehouse',
    [LOGISTICS_PERMISSION.SCOPES.OWN]: 'Own',
  };
  return labels[scope] || 'Unknown';
}

export function logisticsPermissionHasPermission(
  role: LogisticsPermissionRole,
  module: LogisticsPermissionModule,
  action: LogisticsPermissionAction
): boolean {
  const roleKey = Object.keys(LOGISTICS_PERMISSION.ROLES).find(
    (key) => LOGISTICS_PERMISSION.ROLES[key as keyof typeof LOGISTICS_PERMISSION.ROLES] === role
  ) as keyof typeof LOGISTICS_PERMISSION.DEFAULTS | undefined;

  if (!roleKey) return false;

  const permissions = LOGISTICS_PERMISSION.DEFAULTS[roleKey];
  if (!permissions) return false;

  const modulePermissions = permissions[module as keyof typeof permissions];
  if (!modulePermissions) return false;

  return modulePermissions.includes(action);
}

export function logisticsPermissionGetRolePermissions(
  role: LogisticsPermissionRole,
  module: LogisticsPermissionModule
): string[] {
  const roleKey = Object.keys(LOGISTICS_PERMISSION.ROLES).find(
    (key) => LOGISTICS_PERMISSION.ROLES[key as keyof typeof LOGISTICS_PERMISSION.ROLES] === role
  ) as keyof typeof LOGISTICS_PERMISSION.DEFAULTS | undefined;

  if (!roleKey) return [];

  const permissions = LOGISTICS_PERMISSION.DEFAULTS[roleKey];
  if (!permissions) return [];

  const modulePermissions = permissions[module as keyof typeof permissions];
  return modulePermissions || [];
}

export function logisticsPermissionGetAllRolePermissions(
  role: LogisticsPermissionRole
): Record<string, string[]> {
  const roleKey = Object.keys(LOGISTICS_PERMISSION.ROLES).find(
    (key) => LOGISTICS_PERMISSION.ROLES[key as keyof typeof LOGISTICS_PERMISSION.ROLES] === role
  ) as keyof typeof LOGISTICS_PERMISSION.DEFAULTS | undefined;

  if (!roleKey) return {};

  return LOGISTICS_PERMISSION.DEFAULTS[roleKey];
}
