/**
 * Admin Types
 * Core admin entity and configuration types
 */

import { BaseEntity, ID, Timestamp, Nullable } from '../common/core-primitives.types';
import type { AdminStatus, AdminLevel, AdminType } from '@vubon/shared-constants';
import type { AdminRole } from './admin-role.types';
import type { AdminDepartment } from './admin-department.types';
import type { AdminPermission } from './admin-permission.types';

/**
 * Admin base configuration interface
 */
export interface AdminConfig {
  /** Default role for new admins */
  defaultRole: AdminRole;
  /** Default status for new admins */
  defaultStatus: AdminStatus;
  /** Maximum login attempts before account lock */
  maxLoginAttempts: number;
  /** Session timeout in seconds */
  sessionTimeout: number;
  /** Password reset token expiry in seconds */
  passwordResetExpiry: number;
  /** OTP expiry in seconds */
  otpExpiry: number;
  /** Whether MFA is enabled by default */
  mfaDefaultEnabled: boolean;
  /** Maximum concurrent sessions allowed */
  maxConcurrentSessions: number;
  /** Audit log retention in days */
  auditLogRetention: number;
  /** Activity log retention in days */
  activityLogRetention: number;
  /** Session log retention in days */
  sessionLogRetention: number;
}

/**
 * Admin entity interface
 * Represents an admin user in the system
 */
export interface Admin extends BaseEntity {
  /** Admin ID (same as user ID) */
  id: ID;
  /** Admin's email address */
  email: string;
  /** Admin's full name */
  name: string;
  /** Admin's role */
  role: AdminRole;
  /** Admin's status */
  status: AdminStatus;
  /** Admin's level/seniority */
  level: AdminLevel;
  /** Admin's type (specialization) */
  type: AdminType;
  /** Admin's department */
  department: AdminDepartment;
  /** Admin's permissions */
  permissions: AdminPermission[];
  /** Whether admin is verified */
  isVerified: boolean;
  /** Whether admin is locked */
  isLocked: boolean;
  /** Whether admin has MFA enabled */
  isMfaEnabled: boolean;
  /** Admin's profile image URL */
  avatar?: Nullable<string>;
  /** Admin's phone number */
  phone?: Nullable<string>;
  /** Last login timestamp */
  lastLoginAt?: Nullable<Timestamp>;
  /** Last password change timestamp */
  lastPasswordChangeAt?: Nullable<Timestamp>;
}

/**
 * Admin creation data
 * Data required to create a new admin
 */
export interface AdminCreateData {
  /** Admin email */
  email: string;
  /** Admin name */
  name: string;
  /** Admin role */
  role?: AdminRole;
  /** Admin type */
  type?: AdminType;
  /** Admin department */
  department?: AdminDepartment;
  /** Admin level */
  level?: AdminLevel;
  /** Admin password */
  password: string;
  /** Admin phone number */
  phone?: string;
  /** Admin avatar URL */
  avatar?: string;
}

/**
 * Admin update data
 * Data that can be updated for an admin
 */
export interface AdminUpdateData {
  /** Admin name */
  name?: string;
  /** Admin role */
  role?: AdminRole;
  /** Admin status */
  status?: AdminStatus;
  /** Admin level */
  level?: AdminLevel;
  /** Admin type */
  type?: AdminType;
  /** Admin department */
  department?: AdminDepartment;
  /** Admin phone number */
  phone?: string;
  /** Admin avatar URL */
  avatar?: string;
  /** Admin permissions (full replacement) */
  permissions?: AdminPermission[];
  /** Admin MFA status */
  isMfaEnabled?: boolean;
}

/**
 * Admin filter parameters
 * For filtering admin lists
 */
export interface AdminFilterParams {
  /** Filter by role */
  role?: AdminRole | AdminRole[];
  /** Filter by status */
  status?: AdminStatus | AdminStatus[];
  /** Filter by level */
  level?: AdminLevel | AdminLevel[];
  /** Filter by type */
  type?: AdminType | AdminType[];
  /** Filter by department */
  department?: AdminDepartment | AdminDepartment[];
  /** Filter by verification status */
  isVerified?: boolean;
  /** Filter by MFA status */
  isMfaEnabled?: boolean;
  /** Filter by lock status */
  isLocked?: boolean;
  /** Search term (name, email) */
  search?: string;
  /** Date range filter */
  dateRange?: {
    start?: Date;
    end?: Date;
  };
}

/**
 * Admin statistics
 * Aggregated admin statistics
 */
export interface AdminStatistics {
  /** Total number of admins */
  totalAdmins: number;
  /** Count by role */
  roleCounts: Record<string, number>;
  /** Count by status */
  statusCounts: Record<string, number>;
  /** Count by level */
  levelCounts: Record<string, number>;
  /** Count by department */
  departmentCounts: Record<string, number>;
  /** Count by type */
  typeCounts: Record<string, number>;
  /** Average admins created per month */
  averageMonthlyCreation: number;
  /** Most recent admin creation */
  latestAdmin: Admin | null;
}

/**
 * Admin login attempt result
 */
export interface AdminLoginResult {
  /** Whether login was successful */
  success: boolean;
  /** Admin data (if success) */
  admin?: Admin;
  /** Access token (if success) */
  accessToken?: string;
  /** Refresh token (if success) */
  refreshToken?: string;
  /** Error message (if failure) */
  error?: string;
  /** Whether MFA is required */
  mfaRequired?: boolean;
  /** MFA session ID (if MFA required) */
  mfaSessionId?: string;
}

/**
 * Create admin configuration from constants
 */
export function createAdminConfig(
  config: AdminConfig,
  overrides?: Partial<AdminConfig>
): AdminConfig {
  return {
    ...config,
    ...overrides,
  };
}

/**
 * Check if admin is active
 */
export function isAdminActive(admin: Admin): boolean {
  return admin.status === 'active' && !admin.isLocked && !admin.deletedAt;
}

/**
 * Check if admin has full access
 */
export function adminHasFullAccess(admin: Admin): boolean {
  return admin.role === 'super_admin' || admin.role === 'admin';
}

/**
 * Check if admin can manage other admins
 */
export function adminCanManageAdmins(admin: Admin): boolean {
  return admin.role === 'super_admin' || admin.role === 'admin';
}

/**
 * Get admin display name
 */
export function getAdminDisplayName(admin: Admin): string {
  return admin.name || admin.email;
}

/**
 * Create admin statistics
 */
export function createAdminStatistics(
  admins: Admin[],
  period: { start: Date; end: Date }
): AdminStatistics {
  const stats: AdminStatistics = {
    totalAdmins: admins.length,
    roleCounts: {},
    statusCounts: {},
    levelCounts: {},
    departmentCounts: {},
    typeCounts: {},
    averageMonthlyCreation: 0,
    latestAdmin: null,
  };

  // Count by role
  admins.forEach((admin) => {
    stats.roleCounts[admin.role] = (stats.roleCounts[admin.role] || 0) + 1;
    stats.statusCounts[admin.status] = (stats.statusCounts[admin.status] || 0) + 1;
    stats.levelCounts[admin.level] = (stats.levelCounts[admin.level] || 0) + 1;
    stats.departmentCounts[admin.department] = (stats.departmentCounts[admin.department] || 0) + 1;
    stats.typeCounts[admin.type] = (stats.typeCounts[admin.type] || 0) + 1;
  });

  // Find latest admin
  if (admins.length > 0) {
    stats.latestAdmin = admins.reduce((latest, current) => {
      return current.createdAt > latest.createdAt ? current : latest;
    }, admins[0]);
  }

  // Calculate average monthly creation
  const daysDiff = (period.end.getTime() - period.start.getTime()) / (1000 * 60 * 60 * 24);
  const months = daysDiff / 30;
  stats.averageMonthlyCreation = months > 0 ? admins.length / months : admins.length;

  return stats;
}
