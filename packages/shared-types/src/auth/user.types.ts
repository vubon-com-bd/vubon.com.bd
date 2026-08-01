/**
 * User-related TypeScript types for the monorope
 * All user types are centralized here for consistent usage across packages
 */

import type { DefultRole, UserStatus as ConstUserStatus } from '@vubon/shared-constants';

/**
/**
 * User status types
 */
export type UserStatus =
  'active' | 'inactive' | 'suspended' | 'banned' | 'pending' | 'deleted' | 'pending_verification';

/**
 * User role types
 */
export type UserRole =
  | 'guest'
  | 'customer'
  | 'user'
  | 'support'
  | 'moderator'
  | 'manager'
  | 'admin'
  | 'developer'
  | 'super_admin';

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
 * Base user interface
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  status: UserStatus;
  role: UserRole;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  preferences: UserPreferences;
  metadata: Record<string, unknown>;
}

/**
 * Request to create a new user
 */
export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
  phone?: string;
  avatar?: string;
  preferences?: Partial<UserPreferences>;
}

/**
 * Request to update user profile
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
 * Request to delete user account
 */
export interface DeleteAccountRequest {
  password?: string;
  confirm?: boolean;
  reason?: string;
}

/**
 * Admin user list response
 */
export interface AdminUserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Admin user filters
 */
export interface AdminUserFilters {
  status?: UserStatus;
  role?: UserRole;
  search?: string;
  fromDate?: Date;
  toDate?: Date;
}

/**
 * Admin user update request
 */
export interface AdminUserUpdateRequest {
  status?: UserStatus;
  role?: UserRole;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
}

/**
 * Admin create user request
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
 * User authentication context
 */
export interface UserAuthContext {
  userId: string;
  email: string;
  roles: UserRole[];
  permissions: string[];
  sessionId: string;
  deviceId?: string;
}

/**
 * User session information
 */
export interface UserSession {
  id: string;
  userId: string;
  deviceInfo: {
    type: string;
    os: string;
    browser: string;
    ipAddress: string;
  };
  createdAt: Date;
  lastActivityAt: Date;
  expiresAt: Date;
  isActive: boolean;
}

/**
 * User activity log
 */
export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  resource: string;
  metadata: Record<string, unknown>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

/**
 * User notification settings
 */
export interface UserNotificationSettings {
  email: {
    marketing: boolean;
    transactional: boolean;
    newsletter: boolean;
  };
  sms: {
    otp: boolean;
    alerts: boolean;
    promotional: boolean;
  };
  push: {
    enabled: boolean;
    browser: boolean;
    mobile: boolean;
  };
  inApp: {
    enabled: boolean;
    sound: boolean;
    desktop: boolean;
  };
}

/**
 * User security settings
 */
export interface UserSecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod?: 'authenticator' | 'sms' | 'email';
  backupCodesCount: number;
  lastPasswordChange: Date;
  passwordExpiryDays: number;
  trustedDevices: Array<{
    id: string;
    name: string;
    type: string;
    lastUsedAt: Date;
  }>;
}

/**
 * User API key
 */
export interface UserApiKey {
  id: string;
  userId: string;
  name: string;
  key: string;
  permissions: string[];
  expiresAt?: Date;
  lastUsedAt?: Date;
  createdAt: Date;
  isActive: boolean;
}

/**
 * User search parameters
 */
export interface UserSearchParams {
  query?: string;
  status?: UserStatus[];
  role?: UserRole[];
  fromDate?: Date;
  toDate?: Date;
  sortBy?: 'createdAt' | 'lastLoginAt' | 'email';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

/**
 * User bulk operation
 */
export interface UserBulkOperation {
  userIds: string[];
  action: 'activate' | 'suspend' | 'delete' | 'role_update';
  data?: Record<string, unknown>;
  reason?: string;
}

/**
 * User export options
 */
export interface UserExportOptions {
  format: 'csv' | 'json' | 'excel';
  fields: Array<keyof User>;
  filters?: AdminUserFilters;
  includeMetadata?: boolean;
}

/**
 * User import result
 */
export interface UserImportResult {
  total: number;
  success: number;
  failed: number;
  errors: Array<{
    row: number;
    email: string;
    error: string;
  }>;
  importedUsers: User[];
}

/**
 * Helper type for user ID
 */
export type UserId = string;

/**
 * Helper type for user email
 */
export type UserEmail = string;

/**
 * Helper type for user phone number
 */
export type UserPhone = string;

/**
 * User update data (partial user)
 */
export type UserUpdateData = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>;

/**
 * User registration data
 */
export type UserRegistrationData = CreateUserRequest & {
  acceptTerms: boolean;
  acceptPrivacyPolicy: boolean;
};

/**
 * User login data
 */
export interface UserLoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
  deviceInfo?: {
    type: string;
    name?: string;
  };
}

/**
 * User password reset data
 */
export interface UserPasswordResetData {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * User email verification data
 */
export interface UserEmailVerificationData {
  userId: string;
  email: string;
  token: string;
  expiresAt: Date;
}

/**
 * User response without sensitive data
 */
export type UserPublicData = Omit<
  User,
  'isDeleted' | 'deletedAt' | 'metadata' | 'preferences' | 'isPhoneVerified' | 'isEmailVerified'
>;

/**
 * Type guard to check if user is active
 */
export function isUserActive(user: User): boolean {
  return user.isActive && user.status === 'active' && !user.isDeleted;
}

/**
 * Type guard to check if user is admin
 */
export function isUserAdmin(user: User): boolean {
  return user.role === 'admin' || user.role === 'super_admin';
}

/**
 * Type guard to check if user has specific role
 */
export function hasUserRole(user: User, role: UserRole): boolean {
  return user.role === role;
}

/**
 * Type guard to check if user has any of the specified roles
 */
export function hasAnyUserRole(user: User, roles: UserRole[]): boolean {
  return roles.includes(user.role);
}
