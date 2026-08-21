/**
 * Authentication Permission Types Module
 * Permission and role-based access control types for authentication system
 * Handles permissions, roles, RBAC policies, and access control
 */

import { authentication } from '@vubon/shared-constants';
import { UserId, Timestamp } from './core-primitives.types';

// Import permission constants from shared-constants
const { AUTH_PERMISSION, AUTH_ROLE } = authentication;

/**
 * Auth Permission
 * System permission types (re-exported from shared-constants)
 */
export type AuthPermission = (typeof AUTH_PERMISSION)[keyof typeof AUTH_PERMISSION];

/**
 * Auth Role
 * System role types (re-exported from shared-constants)
 */
export type AuthRole = (typeof AUTH_ROLE)[keyof typeof AUTH_ROLE];

/**
 * Permission
 * Permission definition
 */
export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage' | 'execute';
  scope: 'global' | 'organization' | 'team' | 'user';
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Role
 * Role definition
 */
export interface Role {
  id: string;
  name: AuthRole;
  displayName: string;
  description: string;
  permissions: AuthPermission[];
  isActive: boolean;
  isSystemRole: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * User Role Assignment
 * User role assignment
 */
export interface UserRoleAssignment {
  id: string;
  userId: UserId;
  roleId: string;
  roleName: AuthRole;
  assignedAt: Timestamp;
  assignedBy: UserId;
  expiresAt?: Timestamp;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * User Permission
 * User permission override
 */
export interface UserPermission {
  id: string;
  userId: UserId;
  permission: AuthPermission;
  granted: boolean;
  grantedAt: Timestamp;
  grantedBy: UserId;
  expiresAt?: Timestamp;
  reason?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Permission Policy
 * Permission policy definition
 */
export interface PermissionPolicy {
  id: string;
  name: string;
  description: string;
  rules: PermissionRule[];
  isActive: boolean;
  priority: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Permission Rule
 * Individual permission rule
 */
export interface PermissionRule {
  id: string;
  resource: string;
  actions: string[];
  effect: 'allow' | 'deny';
  conditions?: PermissionCondition[];
  metadata?: Record<string, unknown>;
}

/**
 * Permission Condition
 * Permission condition for fine-grained access
 */
export interface PermissionCondition {
  field: string;
  operator:
    | 'equals'
    | 'not_equals'
    | 'contains'
    | 'starts_with'
    | 'ends_with'
    | 'in'
    | 'not_in'
    | 'greater_than'
    | 'less_than'
    | 'between';
  value: unknown;
  metadata?: Record<string, unknown>;
}

/**
 * Access Control Entry
 * Access control entry
 */
export interface AccessControlEntry {
  id: string;
  userId: UserId;
  resource: string;
  action: string;
  effect: 'allow' | 'deny';
  condition?: PermissionCondition;
  grantedAt: Timestamp;
  grantedBy: UserId;
  expiresAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Permission Check Request
 * Request to check permission
 */
export interface PermissionCheckRequest {
  userId: UserId;
  resource: string;
  action: string;
  context?: Record<string, unknown>;
}

/**
 * Permission Check Response
 * Response after permission check
 */
export interface PermissionCheckResponse {
  allowed: boolean;
  reason?: string;
  matchedRules?: string[];
  timestamp: Timestamp;
}

/**
 * Role Assignment Request
 * Request to assign role
 */
export interface RoleAssignmentRequest {
  userId: UserId;
  roleName: AuthRole;
  assignedBy: UserId;
  expiresAt?: Timestamp;
  reason?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Role Assignment Response
 * Response after role assignment
 */
export interface RoleAssignmentResponse {
  success: boolean;
  data?: {
    assignmentId: string;
    userId: UserId;
    roleName: AuthRole;
    assignedAt: Timestamp;
    expiresAt?: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Permission Grant Request
 * Request to grant permission
 */
export interface PermissionGrantRequest {
  userId: UserId;
  permission: AuthPermission;
  grantedBy: UserId;
  expiresAt?: Timestamp;
  reason?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Permission Grant Response
 * Response after permission grant
 */
export interface PermissionGrantResponse {
  success: boolean;
  data?: {
    grantId: string;
    userId: UserId;
    permission: AuthPermission;
    grantedAt: Timestamp;
    expiresAt?: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Permission Revoke Request
 * Request to revoke permission
 */
export interface PermissionRevokeRequest {
  userId: UserId;
  permission: AuthPermission;
  revokedBy: UserId;
  reason?: string;
}

/**
 * Permission Revoke Response
 * Response after permission revoke
 */
export interface PermissionRevokeResponse {
  success: boolean;
  data?: {
    revoked: boolean;
    userId: UserId;
    permission: AuthPermission;
    revokedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Permission Filter
 * Filter criteria for permission queries
 */
export interface PermissionFilter {
  userId?: UserId[];
  roleName?: AuthRole[];
  permission?: AuthPermission[];
  isActive?: boolean;
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
}

/**
 * Permission Response Builder
 * Helper for building permission responses
 */
export interface PermissionResponseBuilder {
  checkSuccess(response: PermissionCheckResponse): PermissionCheckResponse;
  assignSuccess(response: RoleAssignmentResponse): RoleAssignmentResponse;
  grantSuccess(response: PermissionGrantResponse): PermissionGrantResponse;
  revokeSuccess(response: PermissionRevokeResponse): PermissionRevokeResponse;
  error(code: string, message: string, details?: Record<string, unknown>): PermissionErrorResponse;
}

/**
 * Permission Error Response
 * Error response for permission operations
 */
export interface PermissionErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Permission Constants
 * Permission-related constants (re-exported from shared-constants)
 */
export const AUTH_PERMISSIONS = AUTH_PERMISSION;
export const AUTH_ROLES = AUTH_ROLE;

/**
 * Default Permission Configuration
 */
export const DEFAULT_PERMISSION_CONFIG = {
  defaultRole: 'GUEST',
  adminRole: 'ADMIN',
  superAdminRole: 'SUPER_ADMIN',
  enablePermissionCache: true,
  cacheDuration: 300, // 5 minutes
  enableAuditLog: true,
} as const;

/**
 * Permission Audit Log
 * Audit log for permission operations
 */
export interface PermissionAuditLog {
  id: string;
  userId: UserId;
  operation: 'assign' | 'revoke' | 'grant' | 'check' | 'create' | 'update' | 'delete';
  resource: string;
  action: string;
  success: boolean;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
  timestamp: Timestamp;
}

/**
 * Permission Statistics
 * Statistical data about permissions
 */
export interface PermissionStatistics {
  totalUsers: number;
  totalRoles: number;
  totalPermissions: number;
  byRole: Record<AuthRole, number>;
  byPermission: Record<AuthPermission, number>;
  assignedRoles: number;
  grantedPermissions: number;
  permissionChecks: number;
  allowedChecks: number;
  deniedChecks: number;
  timestamp: Timestamp;
}
