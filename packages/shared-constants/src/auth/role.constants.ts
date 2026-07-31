/**
 * Role and permission constants for the monorepo
 * All role-related constants are centralized here
 */

/**
 * Default roles for the application
 */
export const DEFAULT_ROLES = {
  CUSTOMER: 'customer',
  GUEST: 'guest',
  USER: 'user',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
  MODERATOR: 'moderator',
  SUPPORT: 'support',
  MANAGER: 'manager',
  DEVELOPER: 'developer',
} as const;

export type DefaultRole = (typeof DEFAULT_ROLES)[keyof typeof DEFAULT_ROLES];

/**
 * Admin role hierarchy
 */
export const ADMIN_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  MANAGER: 'manager',
  SUPPORT: 'support',
} as const;

export type AdminRole = (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES];

/**
 * User account status types
 */
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  BANNED: 'banned',
  PENDING: 'pending',
  DELETED: 'deleted',
  PENDING_VERIFICATION: 'pending_verification',
} as const;

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

/**
 * User account status messages
 */
export const USER_STATUS_MESSAGES = {
  ACTIVE: 'Account is active and fully functional',
  INACTIVE: 'Account is inactive, please contact support',
  SUSPENDED: 'Account is temporarily suspended',
  BANNED: 'Account is permanently banned',
  PENDING: 'Account is pending approval',
  DELETED: 'Account has been deleted',
  PENDING_VERIFICATION: 'Please verify your email address',
} as const;

export type UserStatusMessage = (typeof USER_STATUS_MESSAGES)[keyof typeof USER_STATUS_MESSAGES];

/**
 * Permission categories
 */
export const PERMISSION_CATEGORIES = {
  AUTH: 'auth',
  USER: 'user',
  ROLE: 'role',
  PRODUCT: 'product',
  ORDER: 'order',
  PAYMENT: 'payment',
  ANALYTICS: 'analytics',
  SETTINGS: 'settings',
  CONTENT: 'content',
  NOTIFICATION: 'notification',
  SUPPORT: 'support',
  SYSTEM: 'system',
} as const;

export type PermissionCategory = (typeof PERMISSION_CATEGORIES)[keyof typeof PERMISSION_CATEGORIES];

/**
 * Permission operations
 */
export const PERMISSION_OPERATIONS = {
  READ: 'read',
  WRITE: 'write',
  DELETE: 'delete',
  UPDATE: 'update',
  CREATE: 'create',
  MANAGE: 'manage',
  APPROVE: 'approve',
  REJECT: 'reject',
  EXPORT: 'export',
  IMPORT: 'import',
} as const;

export type PermissionOperation =
  (typeof PERMISSION_OPERATIONS)[keyof typeof PERMISSION_OPERATIONS];

/**
 * Complete permission system
 */
export const PERMISSIONS = {
  // Auth permissions
  AUTH_READ: 'auth:read',
  AUTH_WRITE: 'auth:write',
  AUTH_DELETE: 'auth:delete',
  AUTH_MANAGE: 'auth:manage',

  // User permissions
  USER_READ: 'user:read',
  USER_WRITE: 'user:write',
  USER_DELETE: 'user:delete',
  USER_UPDATE: 'user:update',
  USER_CREATE: 'user:create',
  USER_MANAGE: 'user:manage',

  // Role permissions
  ROLE_READ: 'role:read',
  ROLE_WRITE: 'role:write',
  ROLE_DELETE: 'role:delete',
  ROLE_UPDATE: 'role:update',
  ROLE_CREATE: 'role:create',
  ROLE_MANAGE: 'role:manage',

  // Product permissions
  PRODUCT_READ: 'product:read',
  PRODUCT_WRITE: 'product:write',
  PRODUCT_DELETE: 'product:delete',
  PRODUCT_UPDATE: 'product:update',
  PRODUCT_CREATE: 'product:create',
  PRODUCT_MANAGE: 'product:manage',

  // Order permissions
  ORDER_READ: 'order:read',
  ORDER_WRITE: 'order:write',
  ORDER_DELETE: 'order:delete',
  ORDER_UPDATE: 'order:update',
  ORDER_CREATE: 'order:create',
  ORDER_MANAGE: 'order:manage',
  ORDER_APPROVE: 'order:approve',
  ORDER_REJECT: 'order:reject',

  // Payment permissions
  PAYMENT_READ: 'payment:read',
  PAYMENT_WRITE: 'payment:write',
  PAYMENT_DELETE: 'payment:delete',
  PAYMENT_UPDATE: 'payment:update',
  PAYMENT_CREATE: 'payment:create',
  PAYMENT_MANAGE: 'payment:manage',
  PAYMENT_APPROVE: 'payment:approve',
  PAYMENT_REJECT: 'payment:reject',

  // Analytics permissions
  ANALYTICS_READ: 'analytics:read',
  ANALYTICS_WRITE: 'analytics:write',
  ANALYTICS_EXPORT: 'analytics:export',
  ANALYTICS_MANAGE: 'analytics:manage',

  // Settings permissions
  SETTINGS_READ: 'settings:read',
  SETTINGS_WRITE: 'settings:write',
  SETTINGS_UPDATE: 'settings:update',
  SETTINGS_MANAGE: 'settings:manage',

  // Content permissions
  CONTENT_READ: 'content:read',
  CONTENT_WRITE: 'content:write',
  CONTENT_DELETE: 'content:delete',
  CONTENT_UPDATE: 'content:update',
  CONTENT_CREATE: 'content:create',
  CONTENT_MANAGE: 'content:manage',
  CONTENT_APPROVE: 'content:approve',
  CONTENT_REJECT: 'content:reject',

  // Notification permissions
  NOTIFICATION_READ: 'notification:read',
  NOTIFICATION_WRITE: 'notification:write',
  NOTIFICATION_DELETE: 'notification:delete',
  NOTIFICATION_UPDATE: 'notification:update',
  NOTIFICATION_CREATE: 'notification:create',
  NOTIFICATION_MANAGE: 'notification:manage',

  // Support permissions
  SUPPORT_READ: 'support:read',
  SUPPORT_WRITE: 'support:write',
  SUPPORT_DELETE: 'support:delete',
  SUPPORT_UPDATE: 'support:update',
  SUPPORT_CREATE: 'support:create',
  SUPPORT_MANAGE: 'support:manage',
  SUPPORT_APPROVE: 'support:approve',
  SUPPORT_REJECT: 'support:reject',

  // System permissions
  SYSTEM_READ: 'system:read',
  SYSTEM_WRITE: 'system:write',
  SYSTEM_DELETE: 'system:delete',
  SYSTEM_UPDATE: 'system:update',
  SYSTEM_MANAGE: 'system:manage',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

/**
 * Role permission mappings
 */
export const ROLE_PERMISSIONS: Record<DefaultRole, Permission[]> = {
  guest: [PERMISSIONS.AUTH_READ, PERMISSIONS.PRODUCT_READ],

  customer: [
    PERMISSIONS.AUTH_READ,
    PERMISSIONS.AUTH_WRITE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.PRODUCT_READ,
    PERMISSIONS.ORDER_READ,
    PERMISSIONS.ORDER_CREATE,
    PERMISSIONS.ORDER_UPDATE,
    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.PAYMENT_CREATE,
    PERMISSIONS.NOTIFICATION_READ,
    PERMISSIONS.SUPPORT_CREATE,
  ],

  user: [
    PERMISSIONS.AUTH_READ,
    PERMISSIONS.AUTH_WRITE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.PRODUCT_READ,
    PERMISSIONS.ORDER_READ,
    PERMISSIONS.ORDER_CREATE,
    PERMISSIONS.ORDER_UPDATE,
    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.PAYMENT_CREATE,
    PERMISSIONS.CONTENT_READ,
    PERMISSIONS.NOTIFICATION_READ,
    PERMISSIONS.SUPPORT_CREATE,
  ],

  support: [
    PERMISSIONS.AUTH_READ,
    PERMISSIONS.USER_READ,
    PERMISSIONS.ORDER_READ,
    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.SUPPORT_READ,
    PERMISSIONS.SUPPORT_WRITE,
    PERMISSIONS.SUPPORT_UPDATE,
    PERMISSIONS.SUPPORT_CREATE,
    PERMISSIONS.NOTIFICATION_READ,
    PERMISSIONS.NOTIFICATION_CREATE,
  ],

  moderator: [
    PERMISSIONS.AUTH_READ,
    PERMISSIONS.AUTH_WRITE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_WRITE,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.ROLE_READ,
    PERMISSIONS.PRODUCT_READ,
    PERMISSIONS.PRODUCT_WRITE,
    PERMISSIONS.PRODUCT_UPDATE,
    PERMISSIONS.ORDER_READ,
    PERMISSIONS.ORDER_WRITE,
    PERMISSIONS.ORDER_UPDATE,
    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.PAYMENT_WRITE,
    PERMISSIONS.CONTENT_READ,
    PERMISSIONS.CONTENT_WRITE,
    PERMISSIONS.CONTENT_UPDATE,
    PERMISSIONS.CONTENT_APPROVE,
    PERMISSIONS.CONTENT_REJECT,
    PERMISSIONS.NOTIFICATION_READ,
    PERMISSIONS.NOTIFICATION_WRITE,
    PERMISSIONS.SUPPORT_READ,
    PERMISSIONS.SUPPORT_WRITE,
    PERMISSIONS.SUPPORT_UPDATE,
    PERMISSIONS.ANALYTICS_READ,
  ],

  manager: [
    PERMISSIONS.AUTH_READ,
    PERMISSIONS.AUTH_WRITE,
    PERMISSIONS.AUTH_DELETE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_WRITE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.ROLE_READ,
    PERMISSIONS.ROLE_WRITE,
    PERMISSIONS.PRODUCT_READ,
    PERMISSIONS.PRODUCT_WRITE,
    PERMISSIONS.PRODUCT_DELETE,
    PERMISSIONS.PRODUCT_UPDATE,
    PERMISSIONS.PRODUCT_CREATE,
    PERMISSIONS.ORDER_READ,
    PERMISSIONS.ORDER_WRITE,
    PERMISSIONS.ORDER_DELETE,
    PERMISSIONS.ORDER_UPDATE,
    PERMISSIONS.ORDER_APPROVE,
    PERMISSIONS.ORDER_REJECT,
    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.PAYMENT_WRITE,
    PERMISSIONS.PAYMENT_DELETE,
    PERMISSIONS.PAYMENT_UPDATE,
    PERMISSIONS.PAYMENT_APPROVE,
    PERMISSIONS.PAYMENT_REJECT,
    PERMISSIONS.CONTENT_READ,
    PERMISSIONS.CONTENT_WRITE,
    PERMISSIONS.CONTENT_DELETE,
    PERMISSIONS.CONTENT_UPDATE,
    PERMISSIONS.CONTENT_APPROVE,
    PERMISSIONS.CONTENT_REJECT,
    PERMISSIONS.NOTIFICATION_READ,
    PERMISSIONS.NOTIFICATION_WRITE,
    PERMISSIONS.NOTIFICATION_DELETE,
    PERMISSIONS.SUPPORT_READ,
    PERMISSIONS.SUPPORT_WRITE,
    PERMISSIONS.SUPPORT_DELETE,
    PERMISSIONS.SUPPORT_UPDATE,
    PERMISSIONS.ANALYTICS_READ,
    PERMISSIONS.ANALYTICS_EXPORT,
    PERMISSIONS.SETTINGS_READ,
    PERMISSIONS.SETTINGS_WRITE,
  ],

  admin: [
    PERMISSIONS.AUTH_READ,
    PERMISSIONS.AUTH_WRITE,
    PERMISSIONS.AUTH_DELETE,
    PERMISSIONS.AUTH_MANAGE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_WRITE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_MANAGE,
    PERMISSIONS.ROLE_READ,
    PERMISSIONS.ROLE_WRITE,
    PERMISSIONS.ROLE_DELETE,
    PERMISSIONS.ROLE_UPDATE,
    PERMISSIONS.ROLE_CREATE,
    PERMISSIONS.ROLE_MANAGE,
    PERMISSIONS.PRODUCT_READ,
    PERMISSIONS.PRODUCT_WRITE,
    PERMISSIONS.PRODUCT_DELETE,
    PERMISSIONS.PRODUCT_UPDATE,
    PERMISSIONS.PRODUCT_CREATE,
    PERMISSIONS.PRODUCT_MANAGE,
    PERMISSIONS.ORDER_READ,
    PERMISSIONS.ORDER_WRITE,
    PERMISSIONS.ORDER_DELETE,
    PERMISSIONS.ORDER_UPDATE,
    PERMISSIONS.ORDER_APPROVE,
    PERMISSIONS.ORDER_REJECT,
    PERMISSIONS.ORDER_MANAGE,
    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.PAYMENT_WRITE,
    PERMISSIONS.PAYMENT_DELETE,
    PERMISSIONS.PAYMENT_UPDATE,
    PERMISSIONS.PAYMENT_APPROVE,
    PERMISSIONS.PAYMENT_REJECT,
    PERMISSIONS.PAYMENT_MANAGE,
    PERMISSIONS.CONTENT_READ,
    PERMISSIONS.CONTENT_WRITE,
    PERMISSIONS.CONTENT_DELETE,
    PERMISSIONS.CONTENT_UPDATE,
    PERMISSIONS.CONTENT_CREATE,
    PERMISSIONS.CONTENT_APPROVE,
    PERMISSIONS.CONTENT_REJECT,
    PERMISSIONS.CONTENT_MANAGE,
    PERMISSIONS.NOTIFICATION_READ,
    PERMISSIONS.NOTIFICATION_WRITE,
    PERMISSIONS.NOTIFICATION_DELETE,
    PERMISSIONS.NOTIFICATION_UPDATE,
    PERMISSIONS.NOTIFICATION_CREATE,
    PERMISSIONS.NOTIFICATION_MANAGE,
    PERMISSIONS.SUPPORT_READ,
    PERMISSIONS.SUPPORT_WRITE,
    PERMISSIONS.SUPPORT_DELETE,
    PERMISSIONS.SUPPORT_UPDATE,
    PERMISSIONS.SUPPORT_CREATE,
    PERMISSIONS.SUPPORT_MANAGE,
    PERMISSIONS.ANALYTICS_READ,
    PERMISSIONS.ANALYTICS_WRITE,
    PERMISSIONS.ANALYTICS_EXPORT,
    PERMISSIONS.ANALYTICS_MANAGE,
    PERMISSIONS.SETTINGS_READ,
    PERMISSIONS.SETTINGS_WRITE,
    PERMISSIONS.SETTINGS_UPDATE,
    PERMISSIONS.SETTINGS_MANAGE,
    PERMISSIONS.SYSTEM_READ,
    PERMISSIONS.SYSTEM_WRITE,
  ],

  developer: [
    PERMISSIONS.AUTH_READ,
    PERMISSIONS.AUTH_WRITE,
    PERMISSIONS.AUTH_DELETE,
    PERMISSIONS.AUTH_MANAGE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_WRITE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_MANAGE,
    PERMISSIONS.ROLE_READ,
    PERMISSIONS.ROLE_WRITE,
    PERMISSIONS.ROLE_DELETE,
    PERMISSIONS.ROLE_UPDATE,
    PERMISSIONS.ROLE_CREATE,
    PERMISSIONS.ROLE_MANAGE,
    PERMISSIONS.PRODUCT_READ,
    PERMISSIONS.PRODUCT_WRITE,
    PERMISSIONS.PRODUCT_DELETE,
    PERMISSIONS.PRODUCT_UPDATE,
    PERMISSIONS.PRODUCT_CREATE,
    PERMISSIONS.PRODUCT_MANAGE,
    PERMISSIONS.ORDER_READ,
    PERMISSIONS.ORDER_WRITE,
    PERMISSIONS.ORDER_DELETE,
    PERMISSIONS.ORDER_UPDATE,
    PERMISSIONS.ORDER_APPROVE,
    PERMISSIONS.ORDER_REJECT,
    PERMISSIONS.ORDER_MANAGE,
    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.PAYMENT_WRITE,
    PERMISSIONS.PAYMENT_DELETE,
    PERMISSIONS.PAYMENT_UPDATE,
    PERMISSIONS.PAYMENT_APPROVE,
    PERMISSIONS.PAYMENT_REJECT,
    PERMISSIONS.PAYMENT_MANAGE,
    PERMISSIONS.CONTENT_READ,
    PERMISSIONS.CONTENT_WRITE,
    PERMISSIONS.CONTENT_DELETE,
    PERMISSIONS.CONTENT_UPDATE,
    PERMISSIONS.CONTENT_CREATE,
    PERMISSIONS.CONTENT_APPROVE,
    PERMISSIONS.CONTENT_REJECT,
    PERMISSIONS.CONTENT_MANAGE,
    PERMISSIONS.NOTIFICATION_READ,
    PERMISSIONS.NOTIFICATION_WRITE,
    PERMISSIONS.NOTIFICATION_DELETE,
    PERMISSIONS.NOTIFICATION_UPDATE,
    PERMISSIONS.NOTIFICATION_CREATE,
    PERMISSIONS.NOTIFICATION_MANAGE,
    PERMISSIONS.SUPPORT_READ,
    PERMISSIONS.SUPPORT_WRITE,
    PERMISSIONS.SUPPORT_DELETE,
    PERMISSIONS.SUPPORT_UPDATE,
    PERMISSIONS.SUPPORT_CREATE,
    PERMISSIONS.SUPPORT_MANAGE,
    PERMISSIONS.ANALYTICS_READ,
    PERMISSIONS.ANALYTICS_WRITE,
    PERMISSIONS.ANALYTICS_EXPORT,
    PERMISSIONS.ANALYTICS_MANAGE,
    PERMISSIONS.SETTINGS_READ,
    PERMISSIONS.SETTINGS_WRITE,
    PERMISSIONS.SETTINGS_UPDATE,
    PERMISSIONS.SETTINGS_MANAGE,
    PERMISSIONS.SYSTEM_READ,
    PERMISSIONS.SYSTEM_WRITE,
    PERMISSIONS.SYSTEM_DELETE,
    PERMISSIONS.SYSTEM_UPDATE,
    PERMISSIONS.SYSTEM_MANAGE,
  ],

  super_admin: Object.values(PERMISSIONS),
};

/**
 * Role hierarchy for inheritance
 */
export const ROLE_HIERARCHY: Record<DefaultRole, DefaultRole[]> = {
  super_admin: [
    'super_admin',
    'admin',
    'manager',
    'moderator',
    'support',
    'user',
    'customer',
    'guest',
  ],
  admin: ['admin', 'manager', 'moderator', 'support', 'user', 'customer', 'guest'],
  manager: ['manager', 'moderator', 'support', 'user', 'customer', 'guest'],
  moderator: ['moderator', 'support', 'user', 'customer', 'guest'],
  support: ['support', 'user', 'customer', 'guest'],
  user: ['user', 'customer', 'guest'],
  customer: ['customer', 'guest'],
  guest: ['guest'],
  developer: [
    'developer',
    'super_admin',
    'admin',
    'manager',
    'moderator',
    'support',
    'user',
    'customer',
    'guest',
  ],
};

/**
 * Role descriptions
 */
export const ROLE_DESCRIPTIONS = {
  guest: 'Unauthenticated user with read-only access to public content',
  customer: 'Registered customer with basic shopping capabilities',
  user: 'Standard user with additional content access and interactions',
  support: 'Support staff with ticket management and customer assistance',
  moderator: 'Content moderator with moderation and approval capabilities',
  manager: 'Team manager with team management and operational control',
  admin: 'Administrator with full system management capabilities',
  developer: 'Developer with full system access and development capabilities',
  super_admin: 'Super administrator with unrestricted access to all system features',
} as const;

export type RoleDescription = (typeof ROLE_DESCRIPTIONS)[keyof typeof ROLE_DESCRIPTIONS];

/**
 * Role color coding for UI
 */
export const ROLE_COLORS = {
  guest: '#9E9E9E',
  customer: '#4CAF50',
  user: '#2196F3',
  support: '#FF9800',
  moderator: '#9C27B0',
  manager: '#3F51B5',
  admin: '#F44336',
  developer: '#00BCD4',
  super_admin: '#FFD700',
} as const;

export type RoleColor = (typeof ROLE_COLORS)[keyof typeof ROLE_COLORS];

/**
 * Role priority for sorting
 */
export const ROLE_PRIORITY = {
  guest: 0,
  customer: 1,
  user: 2,
  support: 3,
  moderator: 4,
  manager: 5,
  admin: 6,
  developer: 7,
  super_admin: 8,
} as const;

export type RolePriority = (typeof ROLE_PRIORITY)[keyof typeof ROLE_PRIORITY];

/**
 * Role interface
 */
export interface Role {
  id: string;
  name: DefaultRole;
  description: string;
  permissions: Permission[];
  inheritsFrom: DefaultRole[];
  createdAt: Date;
  updatedAt: Date;
  isDefault: boolean;
  isSystem: boolean;
  priority: number;
}

/**
 * User role assignment interface
 */
export interface UserRoleAssignment {
  userId: string;
  roleId: string;
  roleName: DefaultRole;
  assignedAt: Date;
  expiresAt?: Date;
  assignedBy: string;
  isActive: boolean;
  notes?: string;
}

/**
 * Permission check result
 */
export interface PermissionCheck {
  hasPermission: boolean;
  permission: Permission;
  role: DefaultRole;
  reason?: string;
}

/**
 * Role validation rules
 */
export const ROLE_VALIDATION = {
  MIN_ROLES_REQUIRED: 1,
  MAX_ROLES_PER_USER: 5,
  ALLOW_MULTIPLE_ROLES: true,
  REQUIRE_DEFAULT_ROLE: true,
  AUTO_ASSIGN_DEFAULT: true,
  DEFAULT_ASSIGNED_ROLE: DEFAULT_ROLES.CUSTOMER,
} as const;

/**
 * Role status types
 */
export const ROLE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  REVOKED: 'revoked',
  EXPIRED: 'expired',
} as const;

export type RoleStatus = (typeof ROLE_STATUS)[keyof typeof ROLE_STATUS];

/**
 * Permission validation rules
 */
export const PERMISSION_VALIDATION = {
  MAX_PERMISSIONS_PER_ROLE: 50,
  REQUIRE_EXPLICIT_GRANT: true,
  DENY_BY_DEFAULT: true,
  ENABLE_INHERITANCE: true,
} as const;

/**
 * Role events for logging
 */
export const ROLE_EVENTS = {
  ROLE_CREATED: 'role.created',
  ROLE_UPDATED: 'role.updated',
  ROLE_DELETED: 'role.deleted',
  ROLE_ASSIGNED: 'role.assigned',
  ROLE_REVOKED: 'role.revoked',
  PERMISSION_GRANTED: 'permission.granted',
  PERMISSION_REVOKED: 'permission.revoked',
} as const;

export type RoleEvent = (typeof ROLE_EVENTS)[keyof typeof ROLE_EVENTS];

/**
 * Error messages for role management
 */
export const ROLE_ERROR_MESSAGES = {
  ROLE_NOT_FOUND: 'Role not found',
  PERMISSION_DENIED: 'Permission denied',
  INSUFFICIENT_ROLE: 'Insufficient role privileges',
  ROLE_ALREADY_ASSIGNED: 'Role already assigned to user',
  MAX_ROLES_EXCEEDED: 'Maximum roles per user exceeded',
  CANNOT_DELETE_SYSTEM_ROLE: 'Cannot delete system role',
  CANNOT_MODIFY_SYSTEM_ROLE: 'Cannot modify system role',
  INVALID_ROLE_NAME: 'Invalid role name',
  DUPLICATE_PERMISSION: 'Duplicate permission not allowed',
  PERMISSION_NOT_FOUND: 'Permission not found',
  ROLE_IN_USE: 'Role is currently in use and cannot be deleted',
  HIERARCHY_VIOLATION: 'Role hierarchy violation detected',
} as const;

export type RoleErrorMessage = (typeof ROLE_ERROR_MESSAGES)[keyof typeof ROLE_ERROR_MESSAGES];
