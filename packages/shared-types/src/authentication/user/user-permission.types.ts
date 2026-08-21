/**
 * User Permission Types Module
 * User-specific permission and access control types for the e-commerce platform
 * Handles granular permissions, feature access, and authorization rules
 */

import { authentication } from '@vubon/shared-constants';
import { UserId, Timestamp } from '../auth/core-primitives.types';

// Import permission constants from shared-constants
const { AUTH_PERMISSION } = authentication;

/**
 * Auth Permission
 * System permission types (re-exported from shared-constants)
 */
export type AuthPermission = (typeof AUTH_PERMISSION)[keyof typeof AUTH_PERMISSION];

/**
 * Permission Resource
 * Types of resources for permissions
 */
export type PermissionResource =
  | 'user'
  | 'profile'
  | 'order'
  | 'product'
  | 'category'
  | 'cart'
  | 'payment'
  | 'shipping'
  | 'review'
  | 'wishlist'
  | 'address'
  | 'contact'
  | 'settings'
  | 'admin'
  | 'report'
  | 'analytics';

/**
 * Permission Action
 * Types of actions for permissions
 */
export type PermissionAction =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'list'
  | 'search'
  | 'export'
  | 'import'
  | 'approve'
  | 'reject'
  | 'manage';

/**
 * Permission Scope
 * Scope of a permission
 */
export type PermissionScope = 'own' | 'team' | 'organization' | 'all' | 'custom';

/**
 * User Permission
 * User permission assignment
 */
export interface UserPermission {
  id: string;
  userId: UserId;
  resource: PermissionResource;
  action: PermissionAction;
  scope: PermissionScope;
  granted: boolean;
  grantedAt: Timestamp;
  grantedBy: UserId;
  expiresAt?: Timestamp;
  reason?: string;
  conditions?: PermissionCondition[];
  metadata?: Record<string, unknown>;
}

/**
 * Permission Condition
 * Conditional permission rule
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
 * Permission Check
 * Permission check request
 */
export interface PermissionCheck {
  userId: UserId;
  resource: PermissionResource;
  action: PermissionAction;
  scope?: PermissionScope;
  context?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

/**
 * Permission Check Result
 * Result of permission check
 */
export interface PermissionCheckResult {
  allowed: boolean;
  reason?: string;
  matchedPermission?: UserPermission;
  matchedRole?: string;
  timestamp: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Permission Grant Request
 * Request to grant permission
 */
export interface PermissionGrantRequest {
  userId: UserId;
  resource: PermissionResource;
  action: PermissionAction;
  scope: PermissionScope;
  grantedBy: UserId;
  expiresAt?: Timestamp;
  reason?: string;
  conditions?: PermissionCondition[];
  metadata?: Record<string, unknown>;
}

/**
 * Permission Grant Response
 * Response after permission grant
 */
export interface PermissionGrantResponse {
  success: boolean;
  data?: {
    permissionId: string;
    userId: UserId;
    resource: PermissionResource;
    action: PermissionAction;
    grantedAt: Timestamp;
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
  permissionId: string;
  userId: UserId;
  revokedBy: UserId;
  reason?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Permission Revoke Response
 * Response after permission revoke
 */
export interface PermissionRevokeResponse {
  success: boolean;
  data?: {
    revoked: boolean;
    permissionId: string;
    revokedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Permission List Request
 * Request to list permissions
 */
export interface PermissionListRequest {
  userId?: UserId;
  resource?: PermissionResource[];
  action?: PermissionAction[];
  scope?: PermissionScope[];
  granted?: boolean;
  limit?: number;
  offset?: number;
}

/**
 * Permission List Response
 * Response after listing permissions
 */
export interface PermissionListResponse {
  success: boolean;
  data?: {
    permissions: UserPermission[];
    total: number;
    limit: number;
    offset: number;
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
  resource?: PermissionResource[];
  action?: PermissionAction[];
  scope?: PermissionScope[];
  granted?: boolean;
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
  checkSuccess(response: PermissionCheckResult): PermissionCheckResult;
  grantSuccess(response: PermissionGrantResponse): PermissionGrantResponse;
  revokeSuccess(response: PermissionRevokeResponse): PermissionRevokeResponse;
  listSuccess(response: PermissionListResponse): PermissionListResponse;
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

export const PERMISSION_RESOURCES = {
  USER: 'user',
  PROFILE: 'profile',
  ORDER: 'order',
  PRODUCT: 'product',
  CATEGORY: 'category',
  CART: 'cart',
  PAYMENT: 'payment',
  SHIPPING: 'shipping',
  REVIEW: 'review',
  WISHLIST: 'wishlist',
  ADDRESS: 'address',
  CONTACT: 'contact',
  SETTINGS: 'settings',
  ADMIN: 'admin',
  REPORT: 'report',
  ANALYTICS: 'analytics',
} as const;

export const PERMISSION_ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  SEARCH: 'search',
  EXPORT: 'export',
  IMPORT: 'import',
  APPROVE: 'approve',
  REJECT: 'reject',
  MANAGE: 'manage',
} as const;

export const PERMISSION_SCOPES = {
  OWN: 'own',
  TEAM: 'team',
  ORGANIZATION: 'organization',
  ALL: 'all',
  CUSTOM: 'custom',
} as const;

/**
 * Default Permission Configuration
 */
export const DEFAULT_PERMISSION_CONFIG = {
  enableDefaultPermissions: true,
  defaultPermissions: [],
  enableConditionalPermissions: true,
  maxConditionsPerPermission: 5,
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
  operation: 'grant' | 'revoke' | 'check' | 'update';
  resource: PermissionResource;
  action: PermissionAction;
  scope: PermissionScope;
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
  totalPermissions: number;
  byResource: Record<PermissionResource, number>;
  byAction: Record<PermissionAction, number>;
  byScope: Record<PermissionScope, number>;
  grantedPermissions: number;
  revokedPermissions: number;
  activePermissions: number;
  expiredPermissions: number;
  averagePermissionsPerUser: number;
  permissionChecks: number;
  allowedChecks: number;
  deniedChecks: number;
  timestamp: Timestamp;
}
