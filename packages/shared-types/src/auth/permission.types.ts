/**
 * Permission-related type definitions for the monorepo
 * All permission types are centralized here for consistent usage across packages
 */

/**
 * Resource types for permissions
 * Represents the main resources in the system
 */
export type PermissionResource =
  | 'auth'
  | 'user'
  | 'role'
  | 'permission'
  | 'product'
  | 'order'
  | 'payment'
  | 'content'
  | 'settings'
  | 'analytics'
  | 'notification'
  | 'support'
  | 'system'
  | 'file'
  | 'report'
  | 'integration';

/**
 * Action types for permissions
 * Represents the possible actions on a resource
 */
export type PermissionAction =
  | 'read'
  | 'write'
  | 'create'
  | 'update'
  | 'delete'
  | 'manage'
  | 'approve'
  | 'reject'
  | 'export'
  | 'import'
  | 'publish'
  | 'archive'
  | 'restore'
  | 'assign';

/**
 * Permission type
 * Represents a single permission in the system
 */
export type Permission = `${PermissionResource}:${PermissionAction}`;

/**
 * Permission interface
 * Represents a permission definition
 */
export interface PermissionDefinition {
  /** Permission key (e.g., 'user:create') */
  key: Permission;
  /** Display name for the permission */
  name: string;
  /** Description of what the permission allows */
  description: string;
  /** Resource this permission applies to */
  resource: PermissionResource;
  /** Action this permission allows */
  action: PermissionAction;
  /** Category for grouping permissions */
  category: string;
  /** Whether this is a system permission (cannot be deleted) */
  isSystem: boolean;
  /** Whether this permission is enabled by default */
  enabledByDefault: boolean;
  /** Dependencies on other permissions */
  dependsOn?: Permission[];
  /** Timestamp when the permission was created */
  createdAt: Date;
  /** Timestamp when the permission was last updated */
  updatedAt: Date;
}

/**
 * Permission check request interface
 * Used when checking if a user has permissions
 */
export interface PermissionCheckRequest {
  /** User ID to check */
  userId: string;
  /** Permissions to check */
  permissions: Permission[];
  /** Whether all permissions are required */
  requireAll?: boolean;
}

/**
 * Permission check response interface
 * Response after checking permissions
 */
export interface PermissionCheckResponse {
  /** Whether the user has the required permissions */
  hasPermission: boolean;
  /** Detailed checks for each permission */
  checks: Array<{
    permission: Permission;
    granted: boolean;
    grantedBy?: string; // Role or direct assignment
  }>;
  /** User's current permissions (cached) */
  userPermissions?: Permission[];
}

/**
 * Bulk permission check request interface
 * Used when checking permissions for multiple users
 */
export interface BulkPermissionCheckRequest {
  /** Array of user IDs to check */
  userIds: string[];
  /** Permission to check */
  permission: Permission;
}

/**
 * Bulk permission check response interface
 * Response after checking permissions for multiple users
 */
export interface BulkPermissionCheckResponse {
  /** Results for each user */
  results: Array<{
    userId: string;
    hasPermission: boolean;
  }>;
}

/**
 * Grant permission request interface
 * Used when granting a permission to a role
 */
export interface GrantPermissionRequest {
  /** Role name or ID */
  role: string;
  /** Permission to grant */
  permission: Permission;
  /** Reason for granting */
  reason?: string;
}

/**
 * Grant permission response interface
 * Response after granting a permission
 */
export interface GrantPermissionResponse {
  /** Whether granting was successful */
  success: boolean;
  /** Response message */
  message: string;
  /** Error code if granting failed */
  errorCode?: string;
}

/**
 * Revoke permission request interface
 * Used when revoking a permission from a role
 */
export interface RevokePermissionRequest {
  /** Role name or ID */
  role: string;
  /** Permission to revoke */
  permission: Permission;
  /** Reason for revoking */
  reason?: string;
}

/**
 * Revoke permission response interface
 * Response after revoking a permission
 */
export interface RevokePermissionResponse {
  /** Whether revoking was successful */
  success: boolean;
  /** Response message */
  message: string;
  /** Error code if revoking failed */
  errorCode?: string;
}

/**
 * Permission list response interface
 * Paginated list of permissions
 */
export interface PermissionListResponse {
  /** Array of permissions */
  permissions: PermissionDefinition[];
  /** Total number of permissions */
  total: number;
  /** Current page number */
  page: number;
  /** Number of permissions per page */
  limit: number;
  /** Total number of pages */
  totalPages: number;
}

/**
 * Permission filter interface
 * Used for filtering permissions in lists
 */
export interface PermissionFilter {
  /** Filter by resource */
  resource?: PermissionResource;
  /** Filter by action */
  action?: PermissionAction;
  /** Filter by category */
  category?: string;
  /** Filter by system permission */
  isSystem?: boolean;
  /** Search term for name or description */
  search?: string;
}

/**
 * User permission response interface
 * Permissions for a specific user
 */
export interface UserPermissionResponse {
  /** User ID */
  userId: string;
  /** All permissions derived from roles */
  permissions: Permission[];
  /** Permissions grouped by resource */
  permissionsByResource: Record<PermissionResource, Permission[]>;
  /** Which roles grant which permissions */
  permissionsByRole: Record<string, Permission[]>;
  /** Timestamp when permissions were calculated */
  calculatedAt: Date;
}

/**
 * Permission statistics interface
 * Statistical data about permissions
 */
export interface PermissionStatistics {
  /** Total number of permissions */
  totalPermissions: number;
  /** Number of system permissions */
  systemPermissions: number;
  /** Number of custom permissions */
  customPermissions: number;
  /** Permissions by resource */
  permissionsByResource: Record<PermissionResource, number>;
  /** Permissions by action */
  permissionsByAction: Record<PermissionAction, number>;
  /** Most used permissions (by role assignments) */
  topUsedPermissions: Array<{
    permission: Permission;
    count: number;
  }>;
  /** Timestamp when statistics were calculated */
  calculatedAt: Date;
}

/**
 * Permission validation result interface
 * Result of validating a permission
 */
export interface PermissionValidationResult {
  /** Whether the permission is valid */
  isValid: boolean;
  /** Error message if invalid */
  error?: string;
  /** Error code for client-side handling */
  errorCode?: string;
}

/**
 * Permission event interface
 * Used for permission-related events
 */
export interface PermissionEvent {
  /** Type of permission event */
  type: 'GRANTED' | 'REVOKED' | 'UPDATED' | 'DELETED' | 'CREATED';
  /** Permission key */
  permission: Permission;
  /** Role name or ID */
  role?: string;
  /** Additional data */
  data: {
    success: boolean;
    error?: string;
    oldPermissions?: Permission[];
    newPermissions?: Permission[];
    metadata?: Record<string, unknown>;
  };
  /** Timestamp of the event */
  timestamp: Date;
}

/**
 * Permission configuration interface
 * Configuration for permission system
 */
export interface PermissionConfig {
  /** Whether permission system is enabled */
  enabled: boolean;
  /** Whether permissions are cached */
  cachePermissions: boolean;
  /** Cache TTL for permissions in seconds */
  cacheTtlSeconds: number;
  /** Whether to allow custom permissions */
  allowCustomPermissions: boolean;
  /** Maximum number of permissions per role */
  maxPermissionsPerRole: number;
  /** Whether to validate permission dependencies */
  validateDependencies: boolean;
}

/**
 * Permission hierarchy interface
 * Represents the relationship between permissions
 */
export interface PermissionHierarchy {
  /** Root permission */
  permission: Permission;
  /** Child permissions that depend on this */
  children: Permission[];
  /** Parent permissions that this depends on */
  parents: Permission[];
  /** All dependent permissions (recursive) */
  allDependencies: Permission[];
}

/**
 * Permission assignment interface
 * Represents a permission assigned to a role
 */
export interface PermissionAssignment {
  /** Unique identifier */
  id: string;
  /** Role ID */
  roleId: string;
  /** Permission key */
  permission: Permission;
  /** Timestamp when assigned */
  assignedAt: Date;
  /** Who assigned it */
  assignedBy: string;
  /** Whether the assignment is active */
  isActive: boolean;
  /** Reason for assignment */
  reason?: string;
}

/**
 * Permission check options interface
 * Options for permission checks
 */
export interface PermissionCheckOptions {
  /** Whether to check inherited permissions */
  checkInherited?: boolean;
  /** Whether to use cached results */
  useCache?: boolean;
  /** Custom context for permission evaluation */
  context?: Record<string, unknown>;
}

/**
 * Permission set interface
 * A set of permissions
 */
export interface PermissionSet {
  /** Name of the permission set */
  name: string;
  /** Description of the permission set */
  description: string;
  /** Permissions in this set */
  permissions: Permission[];
  /** Whether this is a system set */
  isSystem: boolean;
  /** Timestamp when created */
  createdAt: Date;
  /** Timestamp when updated */
  updatedAt: Date;
}

/**
 * Permission set request interface
 * Used when creating or updating a permission set
 */
export interface PermissionSetRequest {
  /** Name of the permission set */
  name: string;
  /** Description of the permission set */
  description: string;
  /** Permissions in this set */
  permissions: Permission[];
}
