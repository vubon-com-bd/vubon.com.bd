/**
 * User-related type definitions
 * These types define the structure of user data across the application
 */
import type { DEFAULT_ROLES, USER_STATUS } from '@vubon/auth-shared-constants';

export type UserRole = (typeof DEFAULT_ROLES)[keyof typeof DEFAULT_ROLES];

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  status: UserStatus;
  isVerified: boolean;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface UserProfile {
  id: string;
  userId: string;
  avatar: string | null;
  bio: string | null;
  phoneNumber: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postalCode: string | null;
  timezone: string;
  language: string;
  notificationPreferences: NotificationPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
  systemUpdates: boolean;
  securityAlerts: boolean;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: UserRole;
  metadata?: Record<string, unknown>;
}

export interface UpdateUserRequest {
  email?: string;
  username?: string;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  role?: UserRole;
  isActive?: boolean;
  metadata?: Record<string, unknown>;
}

export interface UpdateUserProfileRequest {
  avatar?: string | null;
  bio?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postalCode?: string | null;
  timezone?: string;
  language?: string;
  notificationPreferences?: Partial<NotificationPreferences>;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface UserSession {
  id: string;
  userId: string;
  sessionId: string;
  ipAddress: string | null;
  userAgent: string | null;
  deviceType: string | null;
  browser: string | null;
  operatingSystem: string | null;
  isActive: boolean;
  lastActivityAt: Date;
  expiresAt: Date;
  createdAt: Date;
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string | null;
  metadata: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
}

export interface UserMetadata {
  registrationSource: string | null;
  registrationIp: string | null;
  verificationAttempts: number;
  lastVerificationAttempt: Date | null;
  passwordResetAttempts: number;
  lastPasswordResetAttempt: Date | null;
  loginAttempts: number;
  lastLoginAttempt: Date | null;
  lockedUntil: Date | null;
  customFields: Record<string, unknown>;
}

export interface UserWithProfile extends User {
  profile: UserProfile;
  metadata: UserMetadata;
}

export interface UserWithSessions extends User {
  sessions: UserSession[];
}

export interface UserWithActivity extends User {
  recentActivity: UserActivity[];
}

export interface UserWithAll extends UserWithProfile, UserWithSessions, UserWithActivity {}

export type UserListResponse = {
  users: User[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};

export type UserSearchFilters = {
  query?: string;
  role?: UserRole | UserRole[];
  status?: UserStatus | UserStatus[];
  isVerified?: boolean;
  isActive?: boolean;
  createdAfter?: Date;
  createdBefore?: Date;
  lastLoginAfter?: Date;
  lastLoginBefore?: Date;
};

export type UserSortOptions = {
  field: keyof User;
  order: 'asc' | 'desc';
};

export interface UserListOptions {
  filters?: UserSearchFilters;
  sort?: UserSortOptions[];
  page?: number;
  limit?: number;
  includeProfile?: boolean;
  includeMetadata?: boolean;
  includeSessions?: boolean;
  includeActivity?: boolean;
}

export interface UserRegistrationResponse {
  user: User;
  verificationToken: string;
  requiresVerification: boolean;
}

export interface UserLoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  expiresIn: number;
}

export interface UserRefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

export interface UserLogoutResponse {
  success: boolean;
  message: string;
}

export interface UserVerificationResponse {
  success: boolean;
  message: string;
}

export interface UserPasswordResetResponse {
  success: boolean;
  message: string;
}

export interface UserBulkActionRequest {
  userIds: string[];
  action: 'activate' | 'deactivate' | 'suspend' | 'delete' | 'verify';
  reason?: string;
}

export interface UserBulkActionResponse {
  success: boolean;
  processed: number;
  failed: number;
  errors?: Array<{
    userId: string;
    error: string;
  }>;
}
