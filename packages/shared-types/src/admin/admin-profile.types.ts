/**
 * Admin Profile Types
 * Type definitions for admin profile based on shared-constants
 * @module AdminProfileTypes
 */

import {
  BaseEntity,
  Timestamp,
  Metadata,
  ID,
  FullName,
  Email,
  PhoneNumber,
  Address,
  DeviceInfo,
} from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin core
// ============================================================
import {
  // Core types
  AdminStatus,
  AdminLevel,
  AdminDepartment,
  AdminTeam,
  AdminRole,
  AdminPermission,
  AdminType,
  // Core functions
  isAdminActive,
  isAdminSuspended,
  isAdminBanned,
  hasAdminPermission,
  getAdminCoreRoleLabel,
  getAdminCoreLevelName,
  getAdminCoreDepartmentLabel,
  getAdminCoreTeamLabel,
  getAdminCorePermissionLabel,
  isAdminUser,
} from '@vubon/shared-constants';

// ============================================================
// Admin Profile Types
// ============================================================

/**
 * Admin profile information
 */
export interface AdminProfile extends BaseEntity, Timestamp {
  /** Admin ID (UUID) */
  id: ID;
  /** Admin user ID reference */
  userId: ID;
  /** Full name */
  name: FullName;
  /** Email address */
  email: Email;
  /** Phone number */
  phone?: PhoneNumber;
  /** Profile picture URL */
  avatar?: string;
  /** Admin status */
  status: AdminStatus;
  /** Admin type */
  type: AdminType;
  /** Admin role */
  role: AdminRole;
  /** Admin level */
  level: AdminLevel;
  /** Admin department */
  department: AdminDepartment;
  /** Admin team */
  team: AdminTeam;
  /** Admin permissions */
  permissions: AdminPermission[];
  /** Profile metadata */
  metadata?: Metadata;
  /** Last login timestamp */
  lastLoginAt?: Date;
  /** Last activity timestamp */
  lastActivityAt?: Date;
  /** Profile completion percentage (0-100) */
  completionPercentage?: number;
  /** Is profile verified */
  isVerified: boolean;
  /** Is profile active */
  isActive: boolean;
  /** Is profile suspended */
  isSuspended: boolean;
  /** Is profile banned */
  isBanned: boolean;
}

/**
 * Admin contact information
 */
export interface AdminContactInfo {
  /** Email address */
  email: Email;
  /** Phone number */
  phone?: PhoneNumber;
  /** Alternative phone */
  alternativePhone?: PhoneNumber;
  /** Emergency contact */
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: PhoneNumber;
  };
  /** Address */
  address?: Address;
  /** Social media profiles */
  socialMedia?: AdminSocialMediaProfile[];
}

/**
 * Admin social media profile
 */
export interface AdminSocialMediaProfile {
  platform:
    | 'facebook'
    | 'twitter'
    | 'linkedin'
    | 'github'
    | 'instagram'
    | 'youtube'
    | 'whatsapp'
    | 'telegram'
    | 'other';
  url: string;
  username?: string;
  isPublic: boolean;
}

/**
 * Admin profile settings
 */
export interface AdminProfileSettings {
  /** Profile visibility */
  visibility: 'public' | 'private' | 'team-only';
  /** Show email */
  showEmail: boolean;
  /** Show phone */
  showPhone: boolean;
  /** Show department */
  showDepartment: boolean;
  /** Show team */
  showTeam: boolean;
  /** Show level */
  showLevel: boolean;
  /** Allow contact */
  allowContact: boolean;
  /** Notification preferences */
  notificationPreferences: AdminProfileNotificationPreferences;
}

/**
 * Admin profile notification preferences
 */
export interface AdminProfileNotificationPreferences {
  /** Email notifications */
  email: boolean;
  /** In-app notifications */
  inApp: boolean;
  /** SMS notifications */
  sms: boolean;
  /** Push notifications */
  push: boolean;
  /** Notification categories */
  categories: {
    system: boolean;
    security: boolean;
    team: boolean;
    task: boolean;
    report: boolean;
    marketing: boolean;
    other: boolean;
  };
}

/**
 * Admin profile activity
 */
export interface AdminProfileActivity extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  activityType:
    | 'login'
    | 'logout'
    | 'profile_update'
    | 'password_change'
    | 'settings_change'
    | 'permission_change'
    | 'role_change'
    | 'team_change'
    | 'department_change'
    | 'other';
  description: string;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  metadata?: Metadata;
}

/**
 * Admin profile verification
 */
export interface AdminProfileVerification extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  verificationType: 'email' | 'phone' | 'identity' | 'address' | 'employment' | 'other';
  status: 'pending' | 'verified' | 'rejected' | 'expired' | 'revoked';
  verificationDate?: Date;
  expiryDate?: Date;
  verifiedBy?: ID;
  documents?: AdminProfileDocument[];
  metadata?: Metadata;
}

/**
 * Admin profile document
 */
export interface AdminProfileDocument extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  documentType:
    | 'identity_card'
    | 'passport'
    | 'driving_license'
    | 'address_proof'
    | 'employment_letter'
    | 'degree_certificate'
    | 'other';
  documentName: string;
  documentUrl: string;
  fileSize: number;
  fileType: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  uploadedBy: ID;
  approvedBy?: ID;
  approvedAt?: Date;
  expiryDate?: Date;
  metadata?: Metadata;
}

/**
 * Admin profile statistics
 */
export interface AdminProfileStatistics {
  adminId: ID;
  totalLogins: number;
  lastLoginAt?: Date;
  totalActivities: number;
  totalVerifications: number;
  totalDocuments: number;
  profileCompleteness: number;
  roleChanges: number;
  permissionChanges: number;
  loginHistory: AdminProfileLoginHistory[];
}

/**
 * Admin profile login history
 */
export interface AdminProfileLoginHistory {
  id: ID;
  adminId: ID;
  loginAt: Date;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  location?: string;
  success: boolean;
  failureReason?: string;
}

// ============================================================
// Re-export Core Functions
// ============================================================

export {
  // Core functions
  isAdminActive,
  isAdminSuspended,
  isAdminBanned,
  hasAdminPermission,
  getAdminCoreRoleLabel,
  getAdminCoreLevelName,
  getAdminCoreDepartmentLabel,
  getAdminCoreTeamLabel,
  getAdminCorePermissionLabel,
  isAdminUser,
};
