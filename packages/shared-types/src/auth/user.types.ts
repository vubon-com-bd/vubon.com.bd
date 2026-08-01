/**
 * User-related type definitions for the monorepo
 * All user types are centralized here for consistent usage across packages
 */

import type { DefaultRole } from '@vubon/shared-constants';

/**
 * User status types
 */
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'banned' | 'pending' | 'deleted';

/**
 * User role types (extending from shared-constants)
 */
export type UserRole = DefaultRole;

/**
 * Base User interface
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  preferences?: UserPreferences;
}

/**
 * User preferences interface
 */
export interface UserPreferences {
  language: 'en' | 'bn';
  timezone: string;
  currency: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

/**
 * Create user request interface
 */
export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: UserRole;
  preferences?: Partial<UserPreferences>;
}

/**
 * Update user profile request interface
 */
export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  preferredLanguage?: string;
  preferences?: Record<string, unknown>;
}

/**
 * Delete account request interface
 */
export interface DeleteAccountRequest {
  password?: string;
  confirm?: boolean;
  reason?: string;
}

/**
 * Admin user list response interface
 */
export interface AdminUserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Admin user filters interface
 */
export interface AdminUserFilters {
  status?: UserStatus;
  role?: UserRole;
  search?: string;
  fromDate?: Date;
  toDate?: Date;
}

/**
 * Admin user update request interface
 */
export interface AdminUserUpdateRequest {
  status?: UserStatus;
  role?: UserRole;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
}

/**
 * Admin create user request interface
 */
export interface AdminCreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
}

/**
 * User session interface
 */
export interface UserSession {
  id: string;
  userId: string;
  deviceInfo: {
    deviceId: string;
    deviceType: 'mobile' | 'tablet' | 'desktop' | 'other';
    osName: string;
    osVersion: string;
    browserName: string;
    browserVersion: string;
  };
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  expiresAt: Date;
  lastActivityAt: Date;
  isRevoked: boolean;
}

/**
 * User activity log interface
 */
export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

/**
 * User password reset interface
 */
export interface UserPasswordReset {
  userId: string;
  email: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  usedAt?: Date;
  revokedAt?: Date;
}

/**
 * User email verification interface
 */
export interface UserEmailVerification {
  userId: string;
  email: string;
  token: string;
  expiresAt: Date;
  attempts: number;
  lastResendAt?: Date;
  verifiedAt?: Date;
}

/**
 * User device interface
 */
export interface UserDevice {
  id: string;
  userId: string;
  deviceType: 'mobile' | 'tablet' | 'desktop' | 'other';
  deviceName?: string;
  deviceId: string;
  osName: string;
  osVersion: string;
  browserName: string;
  browserVersion: string;
  ipAddress: string;
  location?: {
    countryCode?: string;
    city?: string;
    region?: string;
  };
  isTrusted: boolean;
  isVerified: boolean;
  lastUsedAt: Date;
  createdAt: Date;
}

/**
 * User statistics interface
 */
export interface UserStatistics {
  userId: string;
  totalLogins: number;
  totalSessions: number;
  totalOrders: number;
  totalPayments: number;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User role assignment interface
 */
export interface UserRoleAssignment {
  userId: string;
  role: UserRole;
  assignedBy: string;
  assignedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
}

/**
 * User permissions interface
 */
export interface UserPermissions {
  userId: string;
  permissions: string[];
  roles: UserRole[];
  updatedAt: Date;
}

/**
 * User token interface (for JWT and other tokens)
 */
export interface UserToken {
  id: string;
  userId: string;
  type: 'access' | 'refresh' | 'email_verification' | 'password_reset' | 'api_key';
  token: string;
  expiresAt: Date;
  createdAt: Date;
  revokedAt?: Date;
  metadata?: Record<string, unknown>;
}
