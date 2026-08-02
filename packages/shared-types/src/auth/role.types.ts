/**
 * Role-related type definitions for the monorepo
 * All role types are centralized here for consistent usage across packages
 */

/**
 * Base role types
 * Represents the core roles available in the system
 */
export type BaseRole =
  'super_admin' | 'admin' | 'manager' | 'moderator' | 'support' | 'user' | 'customer' | 'guest';

/**
 * Role interface
 * Represents a role definition in the system
 */
export interface Role {
  /** Unique identifier for the role */
  id: string;
  /** Role name (must be unique) */
  name: BaseRole;
  /** Display name for the role */
  displayName: string;
  /** Description of the role */
  description: string;
  /** Permissions assigned to this role */
  permissions: string[];
  /** Roles that this role inherits from */
  inheritsFrom: BaseRole[];
  /** Whether this role is a system role (cannot be deleted) */
  isSystem: boolean;
  /** Whether this role is active */
  isActive: boolean;
  /** Priority level (higher number = higher priority) */
  priority: number;
  /** Color code for UI representation */
  color: string;
  /** Icon for UI representation */
  icon?: string;
  /** Timestamp when the role was created */
  createdAt: Date;
  /** Timestamp when the role was last updated */
  updatedAt: Date;
}

/**
 * Role assignment interface
 * Represents a role assigned to a user
 */
export interface RoleAssignment {
  /** Unique identifier for the assignment */
  id: string;
  /** User ID */
  userId: string;
  /** Role ID */
  roleId: string;
  /** Role name (denormalized for quick access) */
  roleName: BaseRole;
  /** Timestamp when the role was assigned */
  assignedAt: Date;
  /** Timestamp when the role expires (null if never) */
  expiresAt: Date | null;
  /** Who assigned the role (user ID) */
  assignedBy: string;
  /** Whether the assignment is active */
  isActive: boolean;
  /** Reason for the assignment */
  reason?: string;
}

/**
 * Create role request interface
 * Used when creating a new role
 */
export interface CreateRoleRequest {
  /** Role name */
  name: BaseRole;
  /** Display name */
  displayName: string;
  /** Description */
  description: string;
  /** Permissions to assign */
  permissions: string[];
  /** Roles to inherit from */
  inheritsFrom?: BaseRole[];
  /** Priority level */
  priority?: number;
  /** Color code */
  color?: string;
  /** Icon */
  icon?: string;
}

/**
 * Update role request interface
 * Used when updating an existing role
 */
export interface UpdateRoleRequest {
  /** Display name */
  displayName?: string;
  /** Description */
  description?: string;
  /** Permissions to assign */
  permissions?: string[];
  /** Roles to inherit from */
  inheritsFrom?: BaseRole[];
  /** Priority level */
  priority?: number;
  /** Color code */
  color?: string;
  /** Icon */
  icon?: string;
  /** Whether the role is active */
  isActive?: boolean;
}

/**
 * Assign role request interface
 * Used when assigning a role to a user
 */
export interface AssignRoleRequest {
  /** User ID */
  userId: string;
  /** Role name or ID */
  role: BaseRole | string;
  /** Expiry date (optional) */
  expiresAt?: Date;
  /** Reason for assignment */
  reason?: string;
}

/**
 * Assign role response interface
 * Response after assigning a role
 */
export interface AssignRoleResponse {
  /** Whether assignment was successful */
  success: boolean;
  /** Role assignment record */
  assignment?: RoleAssignment;
  /** Response message */
  message: string;
  /** Error code if assignment failed */
  errorCode?: string;
}

/**
 * Remove role request interface
 * Used when removing a role from a user
 */
export interface RemoveRoleRequest {
  /** User ID */
  userId: string;
  /** Role name or ID to remove */
  role: BaseRole | string;
  /** Reason for removal */
  reason?: string;
}

/**
 * Remove role response interface
 * Response after removing a role
 */
export interface RemoveRoleResponse {
  /** Whether removal was successful */
  success: boolean;
  /** Response message */
  message: string;
  /** Error code if removal failed */
  errorCode?: string;
}

/**
 * Role list response interface
 * Paginated list of roles
 */
export interface RoleListResponse {
  /** Array of roles */
  roles: Role[];
  /** Total number of roles */
  total: number;
  /** Current page number */
  page: number;
  /** Number of roles per page */
  limit: number;
  /** Total number of pages */
  totalPages: number;
}

/**
 * User role response interface
 * Roles assigned to a user
 */
export interface UserRoleResponse {
  /** User ID */
  userId: string;
  /** Array of role assignments */
  assignments: RoleAssignment[];
  /** Array of role names */
  roles: BaseRole[];
  /** Array of permissions derived from all roles */
  permissions: string[];
}

/**
 * Role hierarchy interface
 * Represents the inheritance hierarchy of roles
 */
export interface RoleHierarchy {
  /** Role name */
  role: BaseRole;
  /** Direct children roles */
  children: BaseRole[];
  /** All inherited roles */
  inheritedRoles: BaseRole[];
  /** All permissions inherited */
  inheritedPermissions: string[];
  /** Priority level */
  priority: number;
}

/**
 * Permission check interface
 * Used for checking permissions
 */
export interface PermissionCheck {
  /** Permission to check */
  permission: string;
  /** Whether the permission is granted */
  granted: boolean;
  /** Which role(s) provide this permission */
  grantedBy: BaseRole[];
}

/**
 * Role filter interface
 * Used for filtering roles in lists
 */
export interface RoleFilter {
  /** Filter by role name */
  name?: BaseRole;
  /** Filter by active status */
  isActive?: boolean;
  /** Filter by system role */
  isSystem?: boolean;
  /** Filter by permission */
  hasPermission?: string;
  /** Search term for display name or description */
  search?: string;
}

/**
 * Role validation result interface
 * Result of validating a role
 */
export interface RoleValidationResult {
  /** Whether the role is valid */
  isValid: boolean;
  /** Error message if invalid */
  error?: string;
  /** Error code for client-side handling */
  errorCode?: string;
}

/**
 * Role statistics interface
 * Statistical data about roles
 */
export interface RoleStatistics {
  /** Total number of roles */
  totalRoles: number;
  /** Number of system roles */
  systemRoles: number;
  /** Number of custom roles */
  customRoles: number;
  /** Number of active roles */
  activeRoles: number;
  /** Number of inactive roles */
  inactiveRoles: number;
  /** Number of users with each role */
  usersByRole: Record<BaseRole, number>;
  /** Most assigned roles */
  topAssignedRoles: Array<{
    role: BaseRole;
    count: number;
  }>;
  /** Timestamp when statistics were calculated */
  calculatedAt: Date;
}

/**
 * Role event interface
 * Used for role-related events
 */
export interface RoleEvent {
  /** Type of role event */
  type: 'CREATED' | 'UPDATED' | 'DELETED' | 'ASSIGNED' | 'REMOVED' | 'INHERITANCE_CHANGED';
  /** Role name */
  role: BaseRole;
  /** User ID (for assignment/removal events) */
  userId?: string;
  /** Additional data */
  data: {
    success: boolean;
    error?: string;
    oldPermissions?: string[];
    newPermissions?: string[];
    oldInheritsFrom?: BaseRole[];
    newInheritsFrom?: BaseRole[];
    metadata?: Record<string, unknown>;
  };
  /** Timestamp of the event */
  timestamp: Date;
}

/**
 * Role inheritance tree interface
 * Complete inheritance tree for a role
 */
export interface RoleInheritanceTree {
  /** Root role */
  role: BaseRole;
  /** Direct children */
  children: RoleInheritanceTree[];
  /** All permissions including inherited */
  allPermissions: string[];
  /** Depth in the inheritance tree */
  depth: number;
}

/**
 * Role permissions response interface
 * Permissions for a role
 */
export interface RolePermissionsResponse {
  /** Role name */
  role: BaseRole;
  /** Direct permissions assigned to the role */
  directPermissions: string[];
  /** Inherited permissions from parent roles */
  inheritedPermissions: string[];
  /** All permissions (direct + inherited) */
  allPermissions: string[];
  /** Permissions categorized by resource */
  permissionsByResource: Record<string, string[]>;
}

/**
 * Bulk role assignment request interface
 * Used when assigning roles to multiple users
 */
export interface BulkRoleAssignmentRequest {
  /** Array of user IDs */
  userIds: string[];
  /** Role name or ID to assign */
  role: BaseRole | string;
  /** Expiry date (optional) */
  expiresAt?: Date;
  /** Reason for assignment */
  reason?: string;
}

/**
 * Bulk role assignment response interface
 * Response after bulk role assignment
 */
export interface BulkRoleAssignmentResponse {
  /** Number of successful assignments */
  successful: number;
  /** Number of failed assignments */
  failed: number;
  /** List of errors for failed assignments */
  errors: Array<{
    userId: string;
    error: string;
  }>;
  /** Response message */
  message: string;
}

/**
 * Role permissions check request interface
 * Used when checking multiple permissions at once
 */
export interface RolePermissionsCheckRequest {
  /** Role name or ID */
  role: BaseRole | string;
  /** Permissions to check */
  permissions: string[];
}

/**
 * Role permissions check response interface
 * Response after checking multiple permissions
 */
export interface RolePermissionsCheckResponse {
  /** Role name */
  role: BaseRole;
  /** Overall has all required permissions */
  hasAllPermissions: boolean;
  /** Has any of the required permissions */
  hasAnyPermission: boolean;
  /** Individual permission checks */
  checks: Array<{
    permission: string;
    granted: boolean;
  }>;
}

/**
 * Role configuration interface
 * Configuration for role system
 */
export interface RoleConfig {
  /** Whether role system is enabled */
  enabled: boolean;
  /** Whether role inheritance is enabled */
  enableInheritance: boolean;
  /** Whether role permissions are cached */
  cachePermissions: boolean;
  /** Cache TTL for permissions in seconds */
  cacheTtlSeconds: number;
  /** Default role for new users */
  defaultRole: BaseRole;
  /** Maximum number of roles per user */
  maxRolesPerUser: number;
  /** Whether to enforce role hierarchy */
  enforceHierarchy: boolean;
}
