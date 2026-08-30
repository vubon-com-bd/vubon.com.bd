/**
 * Authentication Role Types
 * Role management, assignment, and permission data types
 */

import type { UserRole } from '@vubon/shared-constants';

import type { ID, Timestamp } from '../common/core-primitives.types';
import type { AuthUser } from './auth.types';
import type { Permission } from './auth-permission.types';

/**
 * Role Data
 * Complete role information
 */
export interface RoleData {
  /** Role unique identifier */
  id: ID;
  /** Role name (e.g., 'admin') */
  name: UserRole;
  /** Role display name */
  displayName: string;
  /** Role description */
  description?: string;
  /** Role hierarchy level (higher = more privileged) */
  hierarchyLevel: number;
  /** Role priority */
  priority: number;
  /** Is role active */
  isActive: boolean;
  /** Is role system-defined (cannot be deleted) */
  isSystem: boolean;
  /** Is role assignable to users */
  isAssignable: boolean;
  /** Default permissions for this role */
  defaultPermissions: Permission[];
  /** Role creation timestamp */
  createdAt: Timestamp;
  /** Role last update timestamp */
  updatedAt: Timestamp;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Role Assignment
 * User role assignment data
 */
export interface RoleAssignment {
  /** Assignment ID */
  id: ID;
  /** User ID */
  userId: ID;
  /** Role name */
  role: UserRole;
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
 * Role Assignment Request
 * Request to assign roles to a user
 */
export interface RoleAssignmentRequest {
  /** User ID */
  userId: ID;
  /** Roles to assign */
  roles: UserRole[];
  /** Expiry timestamp (optional) */
  expiresAt?: Timestamp;
  /** Metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Role Revoke Request
 * Request to revoke roles from a user
 */
export interface RoleRevokeRequest {
  /** User ID */
  userId: ID;
  /** Roles to revoke */
  roles: UserRole[];
  /** Revoke all roles */
  revokeAll?: boolean;
  /** Reason for revocation */
  reason?: string;
}

/**
 * Role Check Result
 * Result of role check
 */
export interface RoleCheckResult {
  /** Has role */
  hasRole: boolean;
  /** User ID */
  userId: ID;
  /** Role checked */
  role: UserRole;
  /** User's effective role (highest priority) */
  effectiveRole?: UserRole;
  /** Reason (if denied) */
  reason?: string;
  /** Timestamp of check */
  checkedAt: Timestamp;
}

/**
 * User Role List
 * List of user's roles
 */
export interface UserRoleList {
  /** User ID */
  userId: ID;
  /** User data */
  user?: AuthUser;
  /** Direct roles */
  directRoles: UserRole[];
  /** Inherited roles (from groups, etc.) */
  inheritedRoles: UserRole[];
  /** All roles combined */
  allRoles: UserRole[];
  /** Effective role (highest priority) */
  effectiveRole: UserRole;
  /** Permissions from all roles */
  permissionsFromRoles: Permission[];
  /** Last updated */
  updatedAt: Timestamp;
}

/**
 * Role Statistics
 * Role usage statistics
 */
export interface RoleStatistics {
  /** Total roles */
  totalRoles: number;
  /** System roles */
  systemRoles: number;
  /** Custom roles */
  customRoles: number;
  /** Active roles */
  activeRoles: number;
  /** Total assignments */
  totalAssignments: number;
  /** Active assignments */
  activeAssignments: number;
  /** Expired assignments */
  expiredAssignments: number;
  /** Role hierarchy distribution */
  hierarchyDistribution: Record<number, number>;
  /** Most assigned roles */
  mostAssigned: Array<{
    role: UserRole;
    count: number;
  }>;
  /** Timestamp of statistics */
  timestamp: Timestamp;
}

/**
 * Role Audit Log
 * Role-related audit log entry
 */
export interface RoleAuditLog {
  /** Log ID */
  id: ID;
  /** User ID */
  userId: ID;
  /** Action performed */
  action: 'assign' | 'revoke' | 'create' | 'update' | 'delete';
  /** Role involved */
  role?: UserRole;
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
 * Role Validation Request
 * Request to validate role access
 */
export interface RoleValidationRequest {
  /** User ID */
  userId: ID;
  /** Required role */
  requiredRole: UserRole;
  /** Minimum hierarchy level required */
  minHierarchyLevel?: number;
  /** Context data for validation */
  context?: Record<string, unknown>;
}

/**
 * Role Validation Result
 * Result of role validation
 */
export interface RoleValidationResult {
  /** Is valid */
  isValid: boolean;
  /** User ID */
  userId: ID;
  /** Required role */
  requiredRole: UserRole;
  /** User's current role */
  currentRole?: UserRole;
  /** User's hierarchy level */
  hierarchyLevel?: number;
  /** Reason (if invalid) */
  reason?: string;
  /** Timestamp */
  validatedAt: Timestamp;
}

/**
 * Role Creation Request
 * Request to create a custom role
 */
export interface RoleCreationRequest {
  /** Role name (must be unique) */
  name: string;
  /** Display name */
  displayName: string;
  /** Description */
  description?: string;
  /** Hierarchy level */
  hierarchyLevel: number;
  /** Default permissions */
  defaultPermissions: Permission[];
  /** Is assignable */
  isAssignable?: boolean;
}

/**
 * Role Update Request
 * Request to update a role
 */
export interface RoleUpdateRequest {
  /** Role ID */
  roleId: ID;
  /** New display name */
  displayName?: string;
  /** New description */
  description?: string;
  /** New hierarchy level */
  hierarchyLevel?: number;
  /** New default permissions */
  defaultPermissions?: Permission[];
  /** Is active */
  isActive?: boolean;
  /** Is assignable */
  isAssignable?: boolean;
}

/**
 * Role Hierarchy Map
 * Complete role hierarchy information
 */
export interface RoleHierarchyMap {
  /** All roles with their hierarchy levels */
  roles: Array<{
    role: UserRole;
    level: number;
    priority: number;
    isAdmin: boolean;
    isStaff: boolean;
    isManagement: boolean;
    isBusiness: boolean;
  }>;
  /** Highest level */
  maxLevel: number;
  /** Lowest level */
  minLevel: number;
  /** Role count by level */
  countByLevel: Record<number, number>;
}

/**
 * Role Default Permission Map
 * Default permissions for each role
 */
export interface RoleDefaultPermissionMap {
  /** Role */
  role: UserRole;
  /** Default permissions */
  permissions: Permission[];
  /** Is wildcard (all permissions) */
  isWildcard: boolean;
}
