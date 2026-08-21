/**
 * Authentication Types Module
 * Core authentication-related type definitions for the e-commerce platform
 * All types are derived from core primitives and shared constants
 */

import { authentication } from '@vubon/shared-constants';
import {
  Email,
  Password,
  UserId,
  SessionId,
  Timestamp,
  Token,
  RefreshToken,
  UserRole,
  AuthStatus,
  AuthProvider,
  MfaMethod,
  Permission,
  DeviceInfo,
} from './core-primitives.types';

/**
 * User Authentication Credentials
 * Used for login and authentication requests
 */
export interface AuthCredentials {
  email: Email;
  password: Password;
  rememberMe?: boolean;
  provider?: AuthProvider;
}

/**
 * Authentication Response
 * Returned after successful authentication
 */
export interface AuthResponse {
  user: AuthenticatedUser;
  tokens: AuthTokens;
  session: SessionInfo;
  status: AuthStatus;
}

/**
 * Authenticated User Information
 * Complete user data after authentication
 */
export interface AuthenticatedUser {
  id: UserId;
  email: Email;
  firstName: string;
  lastName: string;
  fullName: string;
  roles: UserRole[];
  permissions: Permission[];
  avatar?: string;
  phoneNumber?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  twoFactorEnabled: boolean;
  preferredLanguage: string;
  preferredCurrency: string;
  timezone: string;
  lastLoginAt: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  status: AuthStatus;
}

/**
 * Authentication Tokens
 * JWT and refresh tokens for session management
 */
export interface AuthTokens {
  accessToken: Token;
  refreshToken: RefreshToken;
  expiresIn: number;
  tokenType: string;
  refreshExpiresIn: number;
}

/**
 * Session Information
 * Current user session details
 */
export interface SessionInfo {
  id: SessionId;
  deviceId: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  startedAt: Timestamp;
  lastActivityAt: Timestamp;
  expiresAt: Timestamp;
  isActive: boolean;
  deviceInfo?: DeviceInfo;
}

/**
 * Registration Request
 * New user registration data
 */
export interface RegistrationRequest {
  email: Email;
  password: Password;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  acceptTerms: boolean;
  acceptMarketing?: boolean;
  referralCode?: string;
}

/**
 * Registration Response
 * Response after user registration
 */
export interface RegistrationResponse {
  user: AuthenticatedUser;
  requiresVerification: boolean;
  verificationMethod: VerificationMethod;
  message: string;
}

/**
 * Password Reset Request
 * Initiate password reset process
 */
export interface PasswordResetRequest {
  email: Email;
  resetMethod: ResetMethod;
}

/**
 * Password Reset Confirmation
 * Confirm password reset with token
 */
export interface PasswordResetConfirmation {
  token: string;
  newPassword: Password;
  confirmPassword: Password;
}

/**
 * Email Verification Request
 * Verify user email address
 */
export interface EmailVerificationRequest {
  email: Email;
  token: string;
}

/**
 * Two-Factor Authentication Setup
 * Enable/disable 2FA for user account
 */
export interface TwoFactorSetup {
  enabled: boolean;
  method: MfaMethod;
  secret?: string;
  backupCodes?: string[];
}

/**
 * Two-Factor Verification
 * Verify 2FA code during login
 */
export interface TwoFactorVerification {
  userId: UserId;
  code: string;
  method: MfaMethod;
  backupCode?: string;
}

/**
 * Session Management
 * Session operations and queries
 */
export interface SessionManagement {
  currentSession: SessionInfo;
  activeSessions: SessionInfo[];
  deviceSessions: DeviceSession[];
}

/**
 * Device Session Information
 * Session details by device
 */
export interface DeviceSession {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  os: string;
  browser: string;
  lastUsed: Timestamp;
  isCurrent: boolean;
}

/**
 * Authentication State
 * Current authentication state for frontend
 */
export interface AuthState {
  isAuthenticated: boolean;
  user: AuthenticatedUser | null;
  tokens: AuthTokens | null;
  session: SessionInfo | null;
  loading: boolean;
  error: string | null;
  twoFactorRequired: boolean;
  verificationRequired: boolean;
}

/**
 * Login History
 * User login history records
 */
export interface LoginHistory {
  id: string;
  userId: UserId;
  timestamp: Timestamp;
  ipAddress: string;
  userAgent: string;
  location?: string;
  success: boolean;
  failureReason?: string;
  deviceId: string;
}

/**
 * Account Lockout Status
 * Account security and lockout information
 */
export interface AccountLockoutStatus {
  isLocked: boolean;
  lockoutReason?: string;
  lockoutExpiresAt?: Timestamp;
  failedAttempts: number;
  maxAttempts: number;
  remainingAttempts: number;
  lastFailedAttemptAt?: Timestamp;
}

/**
 * MFA Setup Response
 * Response for MFA setup process
 */
export interface MfaSetupResponse {
  enabled: boolean;
  method: MfaMethod;
  secret?: string;
  qrCode?: string;
  backupCodes?: string[];
  setupCompleted: boolean;
}

/**
 * Verification Methods
 * Available verification methods
 */
export type VerificationMethod = 'email' | 'sms' | 'authenticator' | 'backup-codes';

/**
 * Reset Methods
 * Password reset delivery methods
 */
export type ResetMethod = 'email' | 'sms' | 'security-questions';

/**
 * Authentication Events
 * Auth-related event types
 */
export interface AuthEvent {
  type: AuthEventType;
  userId: UserId;
  timestamp: Timestamp;
  metadata: Record<string, unknown>;
}

/**
 * Authentication Event Types
 * All possible authentication events
 */
export type AuthEventType =
  | 'login_success'
  | 'login_failure'
  | 'logout'
  | 'registration'
  | 'password_reset'
  | 'email_verified'
  | 'phone_verified'
  | 'mfa_enabled'
  | 'mfa_disabled'
  | 'session_created'
  | 'session_terminated'
  | 'account_locked'
  | 'account_unlocked'
  | 'role_updated';

/**
 * Authentication Validation Result
 * Result of credential validation
 */
export interface AuthValidationResult {
  valid: boolean;
  errors: AuthValidationError[];
  warnings: AuthValidationWarning[];
}

/**
 * Authentication Validation Error
 * Validation error details
 */
export interface AuthValidationError {
  field: string;
  code: string;
  message: string;
  value?: unknown;
}

/**
 * Authentication Validation Warning
 * Non-critical validation warnings
 */
export interface AuthValidationWarning {
  code: string;
  message: string;
  suggestion?: string;
}

/**
 * Password Validation Options
 * Password policy configuration
 */
export interface PasswordValidationOptions {
  minLength: number;
  maxLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  disallowCommonPasswords: boolean;
  disallowPasswordInBreaches: boolean;
}

/**
 * Password Validation Result
 * Password strength and policy compliance
 */
export interface PasswordValidationResult {
  isStrong: boolean;
  score: number;
  feedback: string[];
  isValid: boolean;
  errors: string[];
}

/**
 * Authentication Configuration
 * System-wide authentication settings
 */
export interface AuthConfiguration {
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  mfaRequiredForRoles: UserRole[];
  tokenExpiryMinutes: number;
  refreshTokenExpiryDays: number;
  allowedAuthProviders: AuthProvider[];
  passwordPolicy: PasswordValidationOptions;
  verificationRequired: boolean;
  requireEmailVerification: boolean;
  requirePhoneVerification: boolean;
}

/**
 * OAuth Provider Configuration
 * Social login provider settings
 */
export interface OAuthProviderConfig {
  provider: AuthProvider;
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scope: string[];
  responseType: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  userInfoEndpoint: string;
}

/**
 * OAuth Authentication Response
 * Response from OAuth providers
 */
export interface OAuthAuthResponse {
  provider: AuthProvider;
  providerUserId: string;
  email: Email;
  name: string;
  avatar?: string;
  rawData: Record<string, unknown>;
  tokens: {
    accessToken: Token;
    refreshToken?: RefreshToken;
    expiresIn: number;
  };
}

/**
 * Authentication Status Constants
 * Re-exporting from shared constants for convenience
 */
export const AUTH_STATUS = authentication.AUTH_STATUS;
export const USER_ROLE = authentication.AUTH_ROLE;
export const AUTH_PROVIDER = authentication.AUTH_PROVIDER;

/**
 * Authentication Error Codes
 * Standardized error codes for auth operations
 */
export enum AuthErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  ACCOUNT_LOCKED = 'ACCOUNT_LOCKED',
  ACCOUNT_DISABLED = 'ACCOUNT_DISABLED',
  ACCOUNT_EXPIRED = 'ACCOUNT_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  MFA_REQUIRED = 'MFA_REQUIRED',
  MFA_INVALID = 'MFA_INVALID',
  EMAIL_NOT_VERIFIED = 'EMAIL_NOT_VERIFIED',
  PHONE_NOT_VERIFIED = 'PHONE_NOT_VERIFIED',
  PASSWORD_WEAK = 'PASSWORD_WEAK',
  PASSWORD_MISMATCH = 'PASSWORD_MISMATCH',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_EXISTS = 'USER_EXISTS',
  INVALID_EMAIL = 'INVALID_EMAIL',
  INVALID_PHONE = 'INVALID_PHONE',
  INVALID_PROVIDER = 'INVALID_PROVIDER',
  PROVIDER_ERROR = 'PROVIDER_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
}

/**
 * Authentication Error
 * Standardized authentication error structure
 */
export interface AuthError {
  code: AuthErrorCode;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Timestamp;
  path?: string;
}

/**
 * Auth Module Configuration
 * Feature flags and module settings
 */
export interface AuthModuleConfig {
  enableOAuth: boolean;
  enableMFA: boolean;
  enableRegistration: boolean;
  enablePasswordReset: boolean;
  enableSocialLogin: boolean;
  enableRememberMe: boolean;
  sessionPersistent: boolean;
  requireStrongPassword: boolean;
  requireEmailVerification: boolean;
  enableAccountLockout: boolean;
  maxConcurrentSessions: number;
  enableActivityLogging: boolean;
  enableDeviceTracking: boolean;
}
