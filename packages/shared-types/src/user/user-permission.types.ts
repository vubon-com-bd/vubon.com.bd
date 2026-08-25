/**
 * User Permission Types
 * Type definitions for user permissions based on shared-constants
 * @module UserPermissionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants user permission (via index)
// ============================================================
import {
  // Core Permission Constants
  USER_PERMISSION,
  USER_PERMISSION_CATEGORIES,
  UserPermission,
  UserPermissionCategory,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  getCategoryPermissions,
  isSystemPermission,
  isAdminPermission,
  getPermissionResource,
  getPermissionAction,
} from '@vubon/shared-constants';

// ============================================================
// User Permission Extended Types
// ============================================================

/**
 * User permission with additional metadata
 */
export interface UserPermissionExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  permission: UserPermission;
  category: UserPermissionCategory;
  resource: string;
  action: string;
  isSystem: boolean;
  isAdmin: boolean;
  grantedBy: ID;
  grantedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * User permission filter
 */
export interface UserPermissionFilter {
  userIds?: ID[];
  permissions?: UserPermission[];
  categories?: UserPermissionCategory[];
  resources?: string[];
  actions?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isSystem?: boolean;
  isAdmin?: boolean;
  isActive?: boolean;
  searchTerm?: string;
}

/**
 * User permission statistics
 */
export interface UserPermissionStatistics {
  userId: ID;
  totalPermissions: number;
  activePermissions: number;
  expiredPermissions: number;
  systemPermissions: number;
  adminPermissions: number;
  byCategory: Record<UserPermissionCategory, number>;
  byResource: Record<string, number>;
  byAction: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentCategory: UserPermissionCategory;
  mostFrequentResource: string;
  mostFrequentAction: string;
}

/**
 * User permission summary
 */
export interface UserPermissionSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  expired: number;
  system: number;
  admin: number;
  byCategory: Record<UserPermissionCategory, number>;
  byResource: Record<string, number>;
  byAction: Record<string, number>;
  permissionTrend: {
    date: Date;
    total: number;
    active: number;
    expired: number;
  }[];
  topCategories: {
    category: UserPermissionCategory;
    count: number;
    label: string;
  }[];
  topResources: {
    resource: string;
    count: number;
  }[];
}

/**
 * User permission check result
 */
export interface UserPermissionCheckResult {
  granted: boolean;
  permission: UserPermission;
  userId: ID;
  resource: string;
  action: string;
  reason?: string;
}

/**
 * User permission assignment
 */
export interface UserPermissionAssignment extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  permission: UserPermission;
  grantedBy: ID;
  grantedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  reason?: string;
  metadata?: Metadata;
}

/**
 * User permission group
 */
export interface UserPermissionGroup extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  description?: string;
  permissions: UserPermission[];
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * User permission role
 */
export interface UserPermissionRole extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  description?: string;
  permissions: UserPermission[];
  isDefault: boolean;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * User permission validation
 */
export interface UserPermissionValidation {
  isValid: boolean;
  permission: UserPermission;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * User permission history
 */
export interface UserPermissionHistory extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  permission: UserPermission;
  action: 'grant' | 'revoke' | 'expire' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  performedBy: ID;
  performedAt: Date;
  reason?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * User permission export
 */
export interface UserPermissionExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: UserPermissionFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Permission Constants
  USER_PERMISSION,
  USER_PERMISSION_CATEGORIES,
  UserPermission,
  UserPermissionCategory,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  getCategoryPermissions,
  isSystemPermission,
  isAdminPermission,
  getPermissionResource,
  getPermissionAction,
};
