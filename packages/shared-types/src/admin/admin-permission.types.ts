/**
 * Admin Permission Types
 * Type definitions for admin permissions based on shared-constants
 * @module AdminPermissionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin index (permission section)
// ============================================================
import {
  // Constants
  ADMIN_PERMISSION,
  ADMIN_PERMISSION_GROUPS,
  ADMIN_PERMISSION_LABELS,
  // Types
  AdminPermissionType,
  AdminPermissionGroup,
  AdminPermissionLabel,
  // Functions
  getAdminPermissionLabel,
  getAdminPermissionsByGroup,
  getAllAdminPermissions,
  isAdminWildcardPermission,
  matchAdminPermission,
} from '@vubon/shared-constants';

// ============================================================
// Extended Permission Types
// ============================================================

/**
 * Permission with additional metadata
 * Using intersection type instead of extends
 */
export type AdminPermissionExtended = AdminPermissionType & {
  label: AdminPermissionLabel;
  group: AdminPermissionGroup;
  description?: string;
  category?: string;
  isWildcard?: boolean;
  dependsOn?: AdminPermissionType[];
  conflictsWith?: AdminPermissionType[];
};

/**
 * Permission group with its permissions
 */
export interface AdminPermissionGroupDetail {
  group: AdminPermissionGroup;
  label: string;
  permissions: AdminPermissionExtended[];
  description?: string;
  priority?: number;
}

/**
 * Permission check result
 */
export interface AdminPermissionCheckResult {
  hasPermission: boolean;
  permission: AdminPermissionType;
  isWildcard: boolean;
  matchedPermission?: AdminPermissionType;
  reason?: string;
}

/**
 * Permission validation result
 */
export interface AdminPermissionValidationResult {
  isValid: boolean;
  permission: AdminPermissionType;
  errors?: string[];
  warnings?: string[];
}

// ============================================================
// Permission Assignment & Management
// ============================================================

/**
 * Admin permission assignment
 */
export interface AdminPermissionAssignment extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  permission: AdminPermissionType;
  assignedBy: ID;
  assignedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Admin permission change history
 */
export interface AdminPermissionChangeHistory extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  previousPermissions: AdminPermissionType[];
  newPermissions: AdminPermissionType[];
  changedBy: ID;
  reason?: string;
  metadata?: Metadata;
}

/**
 * Permission set with metadata
 */
export interface AdminPermissionSet {
  permissions: AdminPermissionType[];
  count: number;
  groups: AdminPermissionGroup[];
  isWildcard: boolean;
  labels: AdminPermissionLabel[];
}

// ============================================================
// Permission Evaluation & Comparison
// ============================================================

/**
 * Permission comparison result
 */
export interface AdminPermissionComparisonResult {
  hasAll: boolean;
  hasAny: boolean;
  missing: AdminPermissionType[];
  extra: AdminPermissionType[];
  matchScore: number;
}

/**
 * Permission evaluation context
 */
export interface AdminPermissionEvaluationContext {
  adminId?: ID;
  role?: string;
  resource?: string;
  action?: string;
  metadata?: Metadata;
}

/**
 * Permission rule
 */
export interface AdminPermissionRule {
  id: string;
  name: string;
  permissions: AdminPermissionType[];
  condition?: (context: AdminPermissionEvaluationContext) => boolean;
  priority: number;
  isActive: boolean;
}

// ============================================================
// Permission Hierarchy & Dependencies
// ============================================================

/**
 * Permission hierarchy node
 */
export interface AdminPermissionHierarchyNode {
  permission: AdminPermissionType;
  children: AdminPermissionType[];
  parent?: AdminPermissionType;
  level: number;
}

/**
 * Permission dependency graph
 */
export interface AdminPermissionDependencyGraph {
  nodes: Map<AdminPermissionType, AdminPermissionHierarchyNode>;
  edges: Map<AdminPermissionType, AdminPermissionType[]>;
  wildcards: AdminPermissionType[];
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Constants
  ADMIN_PERMISSION,
  ADMIN_PERMISSION_GROUPS,
  ADMIN_PERMISSION_LABELS,
  // Types
  AdminPermissionType,
  AdminPermissionGroup,
  AdminPermissionLabel,
  // Functions
  getAdminPermissionLabel,
  getAdminPermissionsByGroup,
  getAllAdminPermissions,
  isAdminWildcardPermission,
  matchAdminPermission,
};
