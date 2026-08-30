/**
 * Authentication Permission Types
 * Permission management, access control, and authorization data types
 */

import type { Permission, PermissionCategory } from '@vubon/shared-constants';

import type { ID, Timestamp } from '../common/core-primitives.types';
import type { AuthUser } from './auth.types';

// Re-export Permission and PermissionCategory for other files
export type { Permission, PermissionCategory };

/**
 * Permission Data
 * Complete permission information
 */
export interface PermissionData {
  /** Permission unique identifier */
  id: ID;
  /** Permission name (e.g., 'view:profile') */
  name: Permission;
  /** Permission display name */
  displayName: string;
  /** Permission description */
  description?: string;
  /** Permission category */
  category: PermissionCategory;
  /** Is permission active */
  isActive: boolean;
  /** Is permission system-defined (cannot be deleted) */
  isSystem: boolean;
  /** Permission creation timestamp */
  createdAt: Timestamp;
  /** Permission last update timestamp */
  updatedAt: Timestamp;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Permission Assignment
 * User permission assignment data
 */
export interface PermissionAssignment {
  /** Assignment ID */
  id: ID;
  /** User ID */
  userId: ID;
  /** Permission name */
  permission: Permission;
  /** Assigned by (user/admin ID) */
  assignedBy: ID;
  /** Assignment timestamp */
  assignedAt: Timestamp;
  /** Assignment expiry timestamp (optional) */
  expiresAt?: Timestamp;
  /** Is assignment active */
  isActive: boolean;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Permission Assignment Request
 * Request to assign permissions to a user
 */
export interface PermissionAssignmentRequest {
  /** User ID */
  userId: ID;
  /** Permissions to assign */
  permissions: Permission[];
  /** Expiry timestamp (optional) */
  expiresAt?: Timestamp;
  /** Metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Permission Revoke Request
 * Request to revoke permissions from a user
 */
export interface PermissionRevokeRequest {
  /** User ID */
  userId: ID;
  /** Permissions to revoke */
  permissions: Permission[];
  /** Revoke all permissions */
  revokeAll?: boolean;
  /** Reason for revocation */
  reason?: string;
}

/**
 * Permission Check Result
 * Result of permission check
 */
export interface PermissionCheckResult {
  /** Has permission */
  hasPermission: boolean;
  /** User ID */
  userId: ID;
  /** Permission checked */
  permission: Permission;
  /** Reason (if denied) */
  reason?: string;
  /** Permission source (direct, role, inherited) */
  source?: 'direct' | 'role' | 'inherited';
  /** Timestamp of check */
  checkedAt: Timestamp;
}

/**
 * Permission Group
 * Group of related permissions
 */
export interface PermissionGroup {
  /** Group ID */
  id: ID;
  /** Group name */
  name: string;
  /** Group description */
  description?: string;
  /** Permissions in this group */
  permissions: Permission[];
  /** Is group active */
  isActive: boolean;
  /** Is group system-defined */
  isSystem: boolean;
  /** Creation timestamp */
  createdAt: Timestamp;
  /** Last update timestamp */
  updatedAt: Timestamp;
}

/**
 * Permission Group Create Request
 * Request to create a permission group
 */
export interface PermissionGroupCreateRequest {
  /** Group name */
  name: string;
  /** Group description */
  description?: string;
  /** Permissions in this group */
  permissions: Permission[];
}

/**
 * Permission Group Update Request
 * Request to update a permission group
 */
export interface PermissionGroupUpdateRequest {
  /** Group ID */
  groupId: ID;
  /** New group name */
  name?: string;
  /** New description */
  description?: string;
  /** Updated permissions */
  permissions?: Permission[];
  /** Is active */
  isActive?: boolean;
}

/**
 * Permission Group List
 * List of permission groups
 */
export interface PermissionGroupList {
  /** Groups */
  groups: PermissionGroup[];
  /** Total count */
  total: number;
  /** Active count */
  activeCount: number;
}

/**
 * User Permission List
 * List of user's permissions
 */
export interface UserPermissionList {
  /** User ID */
  userId: ID;
  /** User data */
  user?: AuthUser;
  /** Direct permissions */
  directPermissions: Permission[];
  /** Permissions from roles */
  rolePermissions: Permission[];
  /** Inherited permissions */
  inheritedPermissions: Permission[];
  /** All permissions combined */
  allPermissions: Permission[];
  /** Permission groups */
  groups: PermissionGroup[];
  /** Last updated */
  updatedAt: Timestamp;
}

/**
 * Permission Statistics
 * Permission usage statistics
 */
export interface PermissionStatistics {
  /** Total permissions */
  totalPermissions: number;
  /** System permissions */
  systemPermissions: number;
  /** Custom permissions */
  customPermissions: number;
  /** Permissions by category */
  byCategory: Record<PermissionCategory, number>;
  /** Total assignments */
  totalAssignments: number;
  /** Active assignments */
  activeAssignments: number;
  /** Expired assignments */
  expiredAssignments: number;
  /** Most assigned permissions */
  mostAssigned: Array<{
    permission: Permission;
    count: number;
  }>;
  /** Timestamp of statistics */
  timestamp: Timestamp;
}

/**
 * Permission Audit Log
 * Permission-related audit log entry
 */
export interface PermissionAuditLog {
  /** Log ID */
  id: ID;
  /** User ID */
  userId: ID;
  /** Action performed */
  action: 'assign' | 'revoke' | 'create' | 'update' | 'delete';
  /** Permission involved */
  permission?: Permission;
  /** User affected */
  targetUserId?: ID;
  /** Changes made */
  changes?: Record<string, unknown>;
  /** Performed by (user/admin ID) */
  performedBy: ID;
  /** Timestamp */
  performedAt: Timestamp;
  /** IP address */
  ipAddress?: string;
  /** User agent */
  userAgent?: string;
}

/**
 * Permission Validation Request
 * Request to validate permissions
 */
export interface PermissionValidationRequest {
  /** User ID */
  userId: ID;
  /** Required permissions */
  requiredPermissions: Permission[];
  /** Require all permissions (AND) */
  requireAll?: boolean;
  /** Context data for validation */
  context?: Record<string, unknown>;
}

/**
 * Permission Validation Result
 * Result of permission validation
 */
export interface PermissionValidationResult {
  /** Is valid */
  isValid: boolean;
  /** User ID */
  userId: ID;
  /** Required permissions */
  requiredPermissions: Permission[];
  /** Granted permissions */
  grantedPermissions: Permission[];
  /** Missing permissions */
  missingPermissions: Permission[];
  /** Reason (if invalid) */
  reason?: string;
  /** Timestamp */
  validatedAt: Timestamp;
}
