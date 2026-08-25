/**
 * User Role Types
 * Type definitions for user roles based on shared-constants
 * @module UserRoleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants user role
// ============================================================
import {
  // Core Role Constants
  USER_ROLE,
  USER_ROLE_LABELS,
  USER_ROLE_PRIORITY,
  CUSTOMER_ROLES,
  STAFF_ROLES,
  ADMIN_ROLES,
  VENDOR_ROLES,
  MANAGEMENT_ROLES,
  UserRole,
  isCustomer,
  isStaff,
  isAdminRole,
  isVendor,
  isManagement,
  getRolePriority,
  hasHigherPriority,
  getUserRoleLabel,
} from '@vubon/shared-constants';

// ============================================================
// User Role Extended Types
// ============================================================

/**
 * User role with additional metadata
 */
export interface UserRoleExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  role: UserRole;
  priority: number;
  label: string;
  isCustomer: boolean;
  isStaff: boolean;
  isAdmin: boolean;
  isVendor: boolean;
  isManagement: boolean;
  grantedBy: ID;
  grantedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * User role filter
 */
export interface UserRoleFilter {
  userIds?: ID[];
  roles?: UserRole[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isCustomer?: boolean;
  isStaff?: boolean;
  isAdmin?: boolean;
  isVendor?: boolean;
  isManagement?: boolean;
  isActive?: boolean;
  searchTerm?: string;
}

/**
 * User role statistics
 */
export interface UserRoleStatistics {
  userId: ID;
  totalRoles: number;
  activeRoles: number;
  expiredRoles: number;
  customerRoles: number;
  staffRoles: number;
  adminRoles: number;
  vendorRoles: number;
  managementRoles: number;
  byRole: Record<UserRole, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentRole: UserRole;
  highestPriorityRole: UserRole;
}

/**
 * User role summary
 */
export interface UserRoleSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  expired: number;
  customer: number;
  staff: number;
  admin: number;
  vendor: number;
  management: number;
  byRole: Record<UserRole, number>;
  roleTrend: {
    date: Date;
    total: number;
    active: number;
    expired: number;
  }[];
  topRoles: {
    role: UserRole;
    count: number;
    label: string;
  }[];
}

/**
 * User role assignment
 */
export interface UserRoleAssignment extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  role: UserRole;
  grantedBy: ID;
  grantedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  reason?: string;
  metadata?: Metadata;
}

/**
 * User role change
 */
export interface UserRoleChange extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  previousRole: UserRole;
  newRole: UserRole;
  changedBy: ID;
  changedAt: Date;
  reason?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * User role validation
 */
export interface UserRoleValidation {
  isValid: boolean;
  role: UserRole;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * User role comparison
 */
export interface UserRoleComparison {
  role1: UserRole;
  role2: UserRole;
  priority1: number;
  priority2: number;
  hasHigherPriority: boolean;
  isSame: boolean;
  isHigher: boolean;
  isLower: boolean;
}

/**
 * User role export
 */
export interface UserRoleExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: UserRoleFilter;
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
  // Core Role Constants
  USER_ROLE,
  USER_ROLE_LABELS,
  USER_ROLE_PRIORITY,
  CUSTOMER_ROLES,
  STAFF_ROLES,
  ADMIN_ROLES,
  VENDOR_ROLES,
  MANAGEMENT_ROLES,
  UserRole,
  isCustomer,
  isStaff,
  isAdminRole,
  isVendor,
  isManagement,
  getRolePriority,
  hasHigherPriority,
  getUserRoleLabel,
};
