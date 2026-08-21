/**
 * User Role Types Module
 * User role management types for the e-commerce platform
 * Handles role definitions, assignments, and hierarchy
 */

import { authentication } from '@vubon/shared-constants';
import { UserId, Timestamp } from '../auth/core-primitives.types';

// Import role constants from shared-constants
const { AUTH_ROLE, AUTH_PERMISSION } = authentication;

/**
 * Auth Role
 * System role types (re-exported from shared-constants)
 */
export type AuthRole = (typeof AUTH_ROLE)[keyof typeof AUTH_ROLE];

/**
 * Auth Permission
 * System permission types (re-exported from shared-constants)
 */
export type AuthPermission = (typeof AUTH_PERMISSION)[keyof typeof AUTH_PERMISSION];

/**
 * Role Level
 * Level of role in hierarchy
 */
export type RoleLevel = 1 | 2 | 3 | 4 | 5;

/**
 * Role Status
 * Status of a role
 */
export type RoleStatus = 'active' | 'inactive' | 'archived';

/**
 * Role
 * Role definition
 */
export interface Role {
  id: string;
  name: AuthRole;
  displayName: string;
  description: string;
  level: RoleLevel;
  permissions: AuthPermission[];
  parentRoleId?: string;
  isSystemRole: boolean;
  status: RoleStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy?: UserId;
  updatedBy?: UserId;
  metadata?: Record<string, unknown>;
}

/**
 * Role Assignment
 * User role assignment
 */
export interface RoleAssignment {
  id: string;
  userId: UserId;
  roleId: string;
  roleName: AuthRole;
  assignedAt: Timestamp;
  assignedBy: UserId;
  expiresAt?: Timestamp;
  isActive: boolean;
  reason?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Role Hierarchy
 * Role hierarchy information
 */
export interface RoleHierarchy {
  roleId: string;
  roleName: AuthRole;
  level: RoleLevel;
  parentRoleId?: string;
  childRoles: string[];
  permissions: AuthPermission[];
  inheritedPermissions: AuthPermission[];
}

/**
 * Role Create Request
 * Request to create role
 */
export interface RoleCreateRequest {
  name: AuthRole;
  displayName: string;
  description: string;
  level: RoleLevel;
  permissions: AuthPermission[];
  parentRoleId?: string;
  createdBy: UserId;
  metadata?: Record<string, unknown>;
}

/**
 * Role Create Response
 * Response after role creation
 */
export interface RoleCreateResponse {
  success: boolean;
  data?: {
    role: Role;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Role Update Request
 * Request to update role
 */
export interface RoleUpdateRequest {
  roleId: string;
  displayName?: string;
  description?: string;
  permissions?: AuthPermission[];
  parentRoleId?: string;
  status?: RoleStatus;
  updatedBy: UserId;
  metadata?: Record<string, unknown>;
}

/**
 * Role Update Response
 * Response after role update
 */
export interface RoleUpdateResponse {
  success: boolean;
  data?: {
    role: Role;
    updatedFields: string[];
    updatedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Role Delete Request
 * Request to delete role
 */
export interface RoleDeleteRequest {
  roleId: string;
  reason?: string;
  force?: boolean;
}

/**
 * Role Delete Response
 * Response after role deletion
 */
export interface RoleDeleteResponse {
  success: boolean;
  data?: {
    roleId: string;
    deletedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Role Assign Request
 * Request to assign role to user
 */
export interface RoleAssignRequest {
  userId: UserId;
  roleId: string;
  assignedBy: UserId;
  expiresAt?: Timestamp;
  reason?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Role Assign Response
 * Response after role assignment
 */
export interface RoleAssignResponse {
  success: boolean;
  data?: {
    assignmentId: string;
    userId: UserId;
    roleName: AuthRole;
    assignedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Role Unassign Request
 * Request to unassign role from user
 */
export interface RoleUnassignRequest {
  assignmentId: string;
  userId: UserId;
  revokedBy: UserId;
  reason?: string;
}

/**
 * Role Unassign Response
 * Response after role unassignment
 */
export interface RoleUnassignResponse {
  success: boolean;
  data?: {
    unassigned: boolean;
    assignmentId: string;
    revokedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Role List Request
 * Request to list roles
 */
export interface RoleListRequest {
  status?: RoleStatus[];
  level?: RoleLevel[];
  includeSystemRoles?: boolean;
  limit?: number;
  offset?: number;
  search?: string;
}

/**
 * Role List Response
 * Response after listing roles
 */
export interface RoleListResponse {
  success: boolean;
  data?: {
    roles: Role[];
    total: number;
    limit: number;
    offset: number;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Role Filter
 * Filter criteria for role queries
 */
export interface RoleFilter {
  name?: AuthRole[];
  status?: RoleStatus[];
  level?: RoleLevel[];
  isSystemRole?: boolean;
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
}

/**
 * Role Response Builder
 * Helper for building role responses
 */
export interface RoleResponseBuilder {
  createSuccess(response: RoleCreateResponse): RoleCreateResponse;
  updateSuccess(response: RoleUpdateResponse): RoleUpdateResponse;
  deleteSuccess(response: RoleDeleteResponse): RoleDeleteResponse;
  assignSuccess(response: RoleAssignResponse): RoleAssignResponse;
  unassignSuccess(response: RoleUnassignResponse): RoleUnassignResponse;
  listSuccess(response: RoleListResponse): RoleListResponse;
  error(code: string, message: string, details?: Record<string, unknown>): RoleErrorResponse;
}

/**
 * Role Error Response
 * Error response for role operations
 */
export interface RoleErrorResponse {
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
 * Role Constants
 * Role-related constants (re-exported from shared-constants)
 */
export const AUTH_ROLES = AUTH_ROLE;
export const AUTH_PERMISSIONS = AUTH_PERMISSION;

export const ROLE_LEVELS = {
  SUPER_ADMIN: 5,
  ADMIN: 4,
  MANAGER: 3,
  MODERATOR: 2,
  USER: 1,
} as const;

export const ROLE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
} as const;

/**
 * Default Role Configuration
 */
export const DEFAULT_ROLE_CONFIG = {
  defaultRole: 'CUSTOMER' as AuthRole,
  allowMultipleRoles: true,
  maxRolesPerUser: 5,
  enableRoleHierarchy: true,
  enablePermissionInheritance: true,
  requireAdminAssignment: false,
  enableAuditLog: true,
  cascadeRoleDeletion: true,
} as const;

/**
 * Role Audit Log
 * Audit log for role operations
 */
export interface RoleAuditLog {
  id: string;
  userId: UserId;
  operation: 'create' | 'update' | 'delete' | 'assign' | 'unassign' | 'modify_permissions';
  roleId: string;
  roleName: AuthRole;
  success: boolean;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
  timestamp: Timestamp;
}

/**
 * Role Statistics
 * Statistical data about roles
 */
export interface RoleStatistics {
  totalRoles: number;
  byLevel: Record<RoleLevel, number>;
  byStatus: Record<RoleStatus, number>;
  assignedRoles: number;
  unassignedRoles: number;
  assignments: number;
  activeAssignments: number;
  expiredAssignments: number;
  averageUsersPerRole: number;
  mostAssignedRole: AuthRole;
  leastAssignedRole: AuthRole;
  timestamp: Timestamp;
}
