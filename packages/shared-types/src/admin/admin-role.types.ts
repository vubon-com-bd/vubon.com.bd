/**
 * Admin Role Types
 * Type definitions for admin roles based on shared-constants
 * @module AdminRoleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin index (role section)
// ============================================================
import {
  // Constants
  ADMIN_ROLE,
  ADMIN_ROLE_PRIORITY,
  ADMIN_ROLE_LABELS,
  ADMIN_ROLE_DESCRIPTIONS,
  ADMIN_ROLE_PERMISSIONS,
  // Types
  AdminRoleType,
  AdminRolePriority,
  AdminRoleLabel,
  AdminRoleDescription,
  // Functions
  getAdminRoleLabel,
  getAdminRoleDescription,
  getAdminRolePriority,
  hasAdminRolePermission,
  isAdminSuperAdmin,
  isAdminAdmin,
  isAdminManager,
  isAdminModerator,
  getAdminRoles,
  getAdminRoleByLabel,
} from '@vubon/shared-constants';

// ============================================================
// Admin Role Permission Mapping
// ============================================================

/**
 * Role permission mapping interface
 */
export interface AdminRolePermissionMap {
  role: AdminRoleType;
  permissions: string[];
  priority: AdminRolePriority;
  label: AdminRoleLabel;
  description: AdminRoleDescription;
}

/**
 * Role permission matrix
 */
export interface AdminRolePermissionMatrix {
  roles: AdminRoleType[];
  permissions: Record<AdminRoleType, string[]>;
  priority: Record<AdminRoleType, AdminRolePriority>;
}

// ============================================================
// Admin Role Assignment & Management
// ============================================================

/**
 * Admin role assignment interface
 */
export interface AdminRoleAssignment extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  role: AdminRoleType;
  assignedBy: ID;
  assignedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Admin role change history
 */
export interface AdminRoleChangeHistory extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  previousRole: AdminRoleType;
  newRole: AdminRoleType;
  changedBy: ID;
  reason?: string;
  metadata?: Metadata;
}

/**
 * Admin role capabilities
 */
export interface AdminRoleCapabilities {
  role: AdminRoleType;
  canManageUsers: boolean;
  canManageContent: boolean;
  canManageSettings: boolean;
  canViewReports: boolean;
  canManageRoles: boolean;
  canAccessAdminPanel: boolean;
  canManagePayments: boolean;
  canManageAnalytics: boolean;
  canManageSupport: boolean;
  canManageLogistics: boolean;
  customCapabilities?: Record<string, boolean>;
}

// ============================================================
// Admin Role Validation & Utilities
// ============================================================

/**
 * Role validation result
 */
export interface AdminRoleValidationResult {
  isValid: boolean;
  role: AdminRoleType;
  errors?: string[];
  warnings?: string[];
}

/**
 * Role permission check result
 */
export interface AdminRolePermissionCheck {
  hasPermission: boolean;
  role: AdminRoleType;
  permission: string;
  reason?: string;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Constants
  ADMIN_ROLE,
  ADMIN_ROLE_PRIORITY,
  ADMIN_ROLE_LABELS,
  ADMIN_ROLE_DESCRIPTIONS,
  ADMIN_ROLE_PERMISSIONS,
  // Types
  AdminRoleType,
  AdminRolePriority,
  AdminRoleLabel,
  AdminRoleDescription,
  // Functions
  getAdminRoleLabel,
  getAdminRoleDescription,
  getAdminRolePriority,
  hasAdminRolePermission,
  isAdminSuperAdmin,
  isAdminAdmin,
  isAdminManager,
  isAdminModerator,
  getAdminRoles,
  getAdminRoleByLabel,
};
