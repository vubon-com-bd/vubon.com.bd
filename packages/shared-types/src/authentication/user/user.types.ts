/**
 * User Types Module
 * Core user-related type definitions for the e-commerce platform
 * All types are derived from core primitives and shared constants
 */

import { authentication } from '@vubon/shared-constants';
import {
  UserId,
  Email,
  PhoneNumber,
  Timestamp,
  UserRole,
  AuthStatus,
} from '../auth/core-primitives.types';

/**
 * User
 * Core user entity
 */
export interface User {
  id: UserId;
  email: Email;
  phoneNumber?: PhoneNumber;
  firstName: string;
  lastName: string;
  fullName: string;
  displayName?: string;
  roles: UserRole[];
  status: AuthStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  avatar?: string;
  preferredLanguage: string;
  preferredCurrency: string;
  timezone: string;
  lastLoginAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * User Create Request
 * Request to create a new user
 */
export interface UserCreateRequest {
  email: Email;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  roles?: UserRole[];
  metadata?: Record<string, unknown>;
}

/**
 * User Create Response
 * Response after user creation
 */
export interface UserCreateResponse {
  success: boolean;
  data?: {
    user: User;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * User Update Request
 * Request to update user
 */
export interface UserUpdateRequest {
  userId: UserId;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phoneNumber?: string;
  preferredLanguage?: string;
  preferredCurrency?: string;
  timezone?: string;
  metadata?: Record<string, unknown>;
}

/**
 * User Update Response
 * Response after user update
 */
export interface UserUpdateResponse {
  success: boolean;
  data?: {
    user: User;
    updatedFields: string[];
    updatedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * User Delete Request
 * Request to delete user
 */
export interface UserDeleteRequest {
  userId: UserId;
  reason?: string;
  permanent?: boolean;
}

/**
 * User Delete Response
 * Response after user deletion
 */
export interface UserDeleteResponse {
  success: boolean;
  data?: {
    userId: UserId;
    deletedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * User Restore Request
 * Request to restore deleted user
 */
export interface UserRestoreRequest {
  userId: UserId;
  reason?: string;
}

/**
 * User Restore Response
 * Response after user restoration
 */
export interface UserRestoreResponse {
  success: boolean;
  data?: {
    userId: UserId;
    restoredAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * User Filter
 * Filter criteria for user queries
 */
export interface UserFilter {
  ids?: UserId[];
  email?: Email[];
  phoneNumber?: string[];
  roles?: UserRole[];
  status?: AuthStatus[];
  search?: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  lastLoginRange?: {
    start: Timestamp;
    end: Timestamp;
  };
}

/**
 * User Statistics
 * Statistical data about users
 */
export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  lockedUsers: number;
  byRole: Record<UserRole, number>;
  byStatus: Record<AuthStatus, number>;
  newUsersToday: number;
  newUsersWeek: number;
  newUsersMonth: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  twoFactorEnabled: number;
  averageUsersPerDay: number;
  timestamp: Timestamp;
}

/**
 * User Response Builder
 * Helper for building user responses
 */
export interface UserResponseBuilder {
  createSuccess(response: UserCreateResponse): UserCreateResponse;
  updateSuccess(response: UserUpdateResponse): UserUpdateResponse;
  deleteSuccess(response: UserDeleteResponse): UserDeleteResponse;
  restoreSuccess(response: UserRestoreResponse): UserRestoreResponse;
  error(code: string, message: string, details?: Record<string, unknown>): UserErrorResponse;
}

/**
 * User Error Response
 * Error response for user operations
 */
export interface UserErrorResponse {
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
 * User Constants
 * User-related constants (re-exported from shared-constants)
 */
export const USER_STATUS = authentication.AUTH_STATUS;
export const USER_ROLES = authentication.AUTH_ROLE;

/**
 * Default User Configuration
 */
export const DEFAULT_USER_CONFIG = {
  defaultRole: 'CUSTOMER',
  allowMultipleRoles: true,
  requireEmailVerification: true,
  requirePhoneVerification: false,
  enableTwoFactor: false,
  enableProfileVisibility: true,
  maxLoginAttempts: 5,
  lockoutDuration: 900, // 15 minutes
} as const;

/**
 * User Audit Log
 * Audit log for user operations
 */
export interface UserAuditLog {
  id: string;
  userId: UserId;
  operation: 'create' | 'update' | 'delete' | 'restore' | 'suspend' | 'activate' | 'role_change';
  details: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Timestamp;
  performedBy: UserId;
}
