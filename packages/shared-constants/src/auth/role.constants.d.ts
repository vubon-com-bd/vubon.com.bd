/**
 * Role and permission constants for the monorepo
 * All role-related constants are centralized here
 */
/**
 * Default roles for the application
 */
export declare const DEFAULT_ROLES: {
    readonly CUSTOMER: "customer";
    readonly GUEST: "guest";
    readonly USER: "user";
    readonly ADMIN: "admin";
    readonly SUPER_ADMIN: "super_admin";
    readonly MODERATOR: "moderator";
    readonly SUPPORT: "support";
    readonly MANAGER: "manager";
    readonly DEVELOPER: "developer";
};
export type DefaultRole = (typeof DEFAULT_ROLES)[keyof typeof DEFAULT_ROLES];
/**
 * Admin role hierarchy
 */
export declare const ADMIN_ROLES: {
    readonly SUPER_ADMIN: "super_admin";
    readonly ADMIN: "admin";
    readonly MODERATOR: "moderator";
    readonly MANAGER: "manager";
    readonly SUPPORT: "support";
};
export type AdminRole = (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES];
/**
 * User account status types
 */
export declare const USER_STATUS: {
    readonly ACTIVE: "active";
    readonly INACTIVE: "inactive";
    readonly SUSPENDED: "suspended";
    readonly BANNED: "banned";
    readonly PENDING: "pending";
    readonly DELETED: "deleted";
    readonly PENDING_VERIFICATION: "pending_verification";
};
export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
/**
 * User account status messages
 */
export declare const USER_STATUS_MESSAGES: {
    readonly ACTIVE: "Account is active and fully functional";
    readonly INACTIVE: "Account is inactive, please contact support";
    readonly SUSPENDED: "Account is temporarily suspended";
    readonly BANNED: "Account is permanently banned";
    readonly PENDING: "Account is pending approval";
    readonly DELETED: "Account has been deleted";
    readonly PENDING_VERIFICATION: "Please verify your email address";
};
export type UserStatusMessage = (typeof USER_STATUS_MESSAGES)[keyof typeof USER_STATUS_MESSAGES];
/**
 * Permission categories
 */
export declare const PERMISSION_CATEGORIES: {
    readonly AUTH: "auth";
    readonly USER: "user";
    readonly ROLE: "role";
    readonly PRODUCT: "product";
    readonly ORDER: "order";
    readonly PAYMENT: "payment";
    readonly ANALYTICS: "analytics";
    readonly SETTINGS: "settings";
    readonly CONTENT: "content";
    readonly NOTIFICATION: "notification";
    readonly SUPPORT: "support";
    readonly SYSTEM: "system";
};
export type PermissionCategory = (typeof PERMISSION_CATEGORIES)[keyof typeof PERMISSION_CATEGORIES];
/**
 * Permission operations
 */
export declare const PERMISSION_OPERATIONS: {
    readonly READ: "read";
    readonly WRITE: "write";
    readonly DELETE: "delete";
    readonly UPDATE: "update";
    readonly CREATE: "create";
    readonly MANAGE: "manage";
    readonly APPROVE: "approve";
    readonly REJECT: "reject";
    readonly EXPORT: "export";
    readonly IMPORT: "import";
};
export type PermissionOperation = (typeof PERMISSION_OPERATIONS)[keyof typeof PERMISSION_OPERATIONS];
/**
 * Complete permission system
 */
export declare const PERMISSIONS: {
    readonly AUTH_READ: "auth:read";
    readonly AUTH_WRITE: "auth:write";
    readonly AUTH_DELETE: "auth:delete";
    readonly AUTH_MANAGE: "auth:manage";
    readonly USER_READ: "user:read";
    readonly USER_WRITE: "user:write";
    readonly USER_DELETE: "user:delete";
    readonly USER_UPDATE: "user:update";
    readonly USER_CREATE: "user:create";
    readonly USER_MANAGE: "user:manage";
    readonly ROLE_READ: "role:read";
    readonly ROLE_WRITE: "role:write";
    readonly ROLE_DELETE: "role:delete";
    readonly ROLE_UPDATE: "role:update";
    readonly ROLE_CREATE: "role:create";
    readonly ROLE_MANAGE: "role:manage";
    readonly PRODUCT_READ: "product:read";
    readonly PRODUCT_WRITE: "product:write";
    readonly PRODUCT_DELETE: "product:delete";
    readonly PRODUCT_UPDATE: "product:update";
    readonly PRODUCT_CREATE: "product:create";
    readonly PRODUCT_MANAGE: "product:manage";
    readonly ORDER_READ: "order:read";
    readonly ORDER_WRITE: "order:write";
    readonly ORDER_DELETE: "order:delete";
    readonly ORDER_UPDATE: "order:update";
    readonly ORDER_CREATE: "order:create";
    readonly ORDER_MANAGE: "order:manage";
    readonly ORDER_APPROVE: "order:approve";
    readonly ORDER_REJECT: "order:reject";
    readonly PAYMENT_READ: "payment:read";
    readonly PAYMENT_WRITE: "payment:write";
    readonly PAYMENT_DELETE: "payment:delete";
    readonly PAYMENT_UPDATE: "payment:update";
    readonly PAYMENT_CREATE: "payment:create";
    readonly PAYMENT_MANAGE: "payment:manage";
    readonly PAYMENT_APPROVE: "payment:approve";
    readonly PAYMENT_REJECT: "payment:reject";
    readonly ANALYTICS_READ: "analytics:read";
    readonly ANALYTICS_WRITE: "analytics:write";
    readonly ANALYTICS_EXPORT: "analytics:export";
    readonly ANALYTICS_MANAGE: "analytics:manage";
    readonly SETTINGS_READ: "settings:read";
    readonly SETTINGS_WRITE: "settings:write";
    readonly SETTINGS_UPDATE: "settings:update";
    readonly SETTINGS_MANAGE: "settings:manage";
    readonly CONTENT_READ: "content:read";
    readonly CONTENT_WRITE: "content:write";
    readonly CONTENT_DELETE: "content:delete";
    readonly CONTENT_UPDATE: "content:update";
    readonly CONTENT_CREATE: "content:create";
    readonly CONTENT_MANAGE: "content:manage";
    readonly CONTENT_APPROVE: "content:approve";
    readonly CONTENT_REJECT: "content:reject";
    readonly NOTIFICATION_READ: "notification:read";
    readonly NOTIFICATION_WRITE: "notification:write";
    readonly NOTIFICATION_DELETE: "notification:delete";
    readonly NOTIFICATION_UPDATE: "notification:update";
    readonly NOTIFICATION_CREATE: "notification:create";
    readonly NOTIFICATION_MANAGE: "notification:manage";
    readonly SUPPORT_READ: "support:read";
    readonly SUPPORT_WRITE: "support:write";
    readonly SUPPORT_DELETE: "support:delete";
    readonly SUPPORT_UPDATE: "support:update";
    readonly SUPPORT_CREATE: "support:create";
    readonly SUPPORT_MANAGE: "support:manage";
    readonly SUPPORT_APPROVE: "support:approve";
    readonly SUPPORT_REJECT: "support:reject";
    readonly SYSTEM_READ: "system:read";
    readonly SYSTEM_WRITE: "system:write";
    readonly SYSTEM_DELETE: "system:delete";
    readonly SYSTEM_UPDATE: "system:update";
    readonly SYSTEM_MANAGE: "system:manage";
};
export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
/**
 * Role permission mappings
 */
export declare const ROLE_PERMISSIONS: Record<DefaultRole, Permission[]>;
/**
 * Role hierarchy for inheritance
 */
export declare const ROLE_HIERARCHY: Record<DefaultRole, DefaultRole[]>;
/**
 * Role descriptions
 */
export declare const ROLE_DESCRIPTIONS: {
    readonly guest: "Unauthenticated user with read-only access to public content";
    readonly customer: "Registered customer with basic shopping capabilities";
    readonly user: "Standard user with additional content access and interactions";
    readonly support: "Support staff with ticket management and customer assistance";
    readonly moderator: "Content moderator with moderation and approval capabilities";
    readonly manager: "Team manager with team management and operational control";
    readonly admin: "Administrator with full system management capabilities";
    readonly developer: "Developer with full system access and development capabilities";
    readonly super_admin: "Super administrator with unrestricted access to all system features";
};
export type RoleDescription = (typeof ROLE_DESCRIPTIONS)[keyof typeof ROLE_DESCRIPTIONS];
/**
 * Role color coding for UI
 */
export declare const ROLE_COLORS: {
    readonly guest: "#9E9E9E";
    readonly customer: "#4CAF50";
    readonly user: "#2196F3";
    readonly support: "#FF9800";
    readonly moderator: "#9C27B0";
    readonly manager: "#3F51B5";
    readonly admin: "#F44336";
    readonly developer: "#00BCD4";
    readonly super_admin: "#FFD700";
};
export type RoleColor = (typeof ROLE_COLORS)[keyof typeof ROLE_COLORS];
/**
 * Role priority for sorting
 */
export declare const ROLE_PRIORITY: {
    readonly guest: 0;
    readonly customer: 1;
    readonly user: 2;
    readonly support: 3;
    readonly moderator: 4;
    readonly manager: 5;
    readonly admin: 6;
    readonly developer: 7;
    readonly super_admin: 8;
};
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
export declare const ROLE_VALIDATION: {
    readonly MIN_ROLES_REQUIRED: 1;
    readonly MAX_ROLES_PER_USER: 5;
    readonly ALLOW_MULTIPLE_ROLES: true;
    readonly REQUIRE_DEFAULT_ROLE: true;
    readonly AUTO_ASSIGN_DEFAULT: true;
    readonly DEFAULT_ASSIGNED_ROLE: "customer";
};
/**
 * Role status types
 */
export declare const ROLE_STATUS: {
    readonly ACTIVE: "active";
    readonly INACTIVE: "inactive";
    readonly PENDING: "pending";
    readonly REVOKED: "revoked";
    readonly EXPIRED: "expired";
};
export type RoleStatus = (typeof ROLE_STATUS)[keyof typeof ROLE_STATUS];
/**
 * Permission validation rules
 */
export declare const PERMISSION_VALIDATION: {
    readonly MAX_PERMISSIONS_PER_ROLE: 50;
    readonly REQUIRE_EXPLICIT_GRANT: true;
    readonly DENY_BY_DEFAULT: true;
    readonly ENABLE_INHERITANCE: true;
};
/**
 * Role events for logging
 */
export declare const ROLE_EVENTS: {
    readonly ROLE_CREATED: "role.created";
    readonly ROLE_UPDATED: "role.updated";
    readonly ROLE_DELETED: "role.deleted";
    readonly ROLE_ASSIGNED: "role.assigned";
    readonly ROLE_REVOKED: "role.revoked";
    readonly PERMISSION_GRANTED: "permission.granted";
    readonly PERMISSION_REVOKED: "permission.revoked";
};
export type RoleEvent = (typeof ROLE_EVENTS)[keyof typeof ROLE_EVENTS];
/**
 * Error messages for role management
 */
export declare const ROLE_ERROR_MESSAGES: {
    readonly ROLE_NOT_FOUND: "Role not found";
    readonly PERMISSION_DENIED: "Permission denied";
    readonly INSUFFICIENT_ROLE: "Insufficient role privileges";
    readonly ROLE_ALREADY_ASSIGNED: "Role already assigned to user";
    readonly MAX_ROLES_EXCEEDED: "Maximum roles per user exceeded";
    readonly CANNOT_DELETE_SYSTEM_ROLE: "Cannot delete system role";
    readonly CANNOT_MODIFY_SYSTEM_ROLE: "Cannot modify system role";
    readonly INVALID_ROLE_NAME: "Invalid role name";
    readonly DUPLICATE_PERMISSION: "Duplicate permission not allowed";
    readonly PERMISSION_NOT_FOUND: "Permission not found";
    readonly ROLE_IN_USE: "Role is currently in use and cannot be deleted";
    readonly HIERARCHY_VIOLATION: "Role hierarchy violation detected";
};
export type RoleErrorMessage = (typeof ROLE_ERROR_MESSAGES)[keyof typeof ROLE_ERROR_MESSAGES];
//# sourceMappingURL=role.constants.d.ts.map