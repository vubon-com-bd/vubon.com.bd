/**
 * User Command Types - Pure DTOs (Enterprise Enhanced)
 * 
 * @module application/commands/user/types
 * 
 * @description
 * Type definitions for user command handlers with enterprise-grade features.
 * 
 * ENTERPRISE ENHANCEMENTS:
 * ✅ Shared-types integration (Single Source of Truth)
 * ✅ DeviceInfo reuse for consistency
 * ✅ Bengali message support
 * ✅ Grace period for account deletion
 * ✅ OTP method specification (SMS/WhatsApp/Voice)
 * ✅ Reason field for audit trail
 * ✅ Factory functions for command creation
 * ✅ Comprehensive JSDoc documentation
 * ✅ Bangladesh-specific fields support
 */

import type { 
  UserRole, 
  UserStatus, 
  DeviceInfo,
  SupportedLanguage
} from '@vubon/shared-types';

// ============================================================
// Update Profile
// ============================================================

/**
 * Update Profile Command
 * @example
 * const command: UpdateProfileCommand = {
 *   userId: 'usr_123',
 *   fullName: 'John Doe',
 *   language: 'bn',
 *   deviceInfo: { ipAddress: '192.168.1.100', district: 'Dhaka' },
 *   correlationId: 'corr_abc123'
 * };
 */
export interface UpdateProfileCommand {
  /** User ID from JWT */
  userId: string;
  
  /** User full name (optional) */
  fullName?: string;
  
  /** Display name (optional) */
  displayName?: string;
  
  /** Phone number (E.164 format for Bangladesh) */
  phone?: string;
  
  /** Profile picture URL */
  profilePicture?: string;
  
  /** User timezone (default: Asia/Dhaka) */
  timezone?: string;
  
  /** User language preference (en/bn) */
  language?: SupportedLanguage;
  
  /** Preferred district (Bangladesh) */
  preferredDistrict?: string;
  
  /** Preferred upazila (Bangladesh) */
  preferredUpazila?: string;
  
  /** Device context for audit */
  deviceInfo?: DeviceInfo;
  
  /** Correlation ID for distributed tracing */
  correlationId?: string;
  
  /** Reason for profile update (for audit) */
  reason?: string;
}

/**
 * Update Profile Result
 */
export interface UpdateProfileResult {
  /** User ID */
  id: string;
  
  /** User email */
  email: string;
  
  /** User full name */
  fullName: string;
  
  /** Phone number (masked) */
  phone?: string;
  
  /** User role */
  role: UserRole;
  
  /** User status */
  status: UserStatus;
  
  /** Whether email is verified */
  isEmailVerified: boolean;
  
  /** Whether phone is verified */
  isPhoneVerified: boolean;
  
  /** Whether MFA is enabled */
  isMfaEnabled: boolean;
  
  /** Profile picture URL */
  profilePicture?: string;
  
  /** User timezone */
  timezone?: string;
  
  /** User language preference */
  language?: SupportedLanguage;
  
  /** Preferred district (Bangladesh) */
  preferredDistrict?: string;
  
  /** Preferred upazila (Bangladesh) */
  preferredUpazila?: string;
  
  /** Last update timestamp */
  updatedAt: Date;
  
  /** Success message in English */
  message?: string;
  
  /** Success message in Bengali */
  messageBn?: string;
  
  /** Correlation ID for tracing */
  correlationId?: string;
}

// ============================================================
// Change Password
// ============================================================

/**
 * Change Password Command
 * @example
 * const command: ChangePasswordCommand = {
 *   userId: 'usr_123',
 *   currentPassword: 'MyOldP@ssw0rd',
 *   newPassword: 'MyNewStr0ng!P@ssw0rd',
 *   logoutOtherDevices: true,
 *   deviceInfo: { ipAddress: '192.168.1.100', deviceFingerprint: 'fp_abc123' },
 *   correlationId: 'corr_abc123'
 * };
 */
export interface ChangePasswordCommand {
  /** User ID from JWT */
  userId: string;
  
  /** Current password for verification */
  currentPassword: string;
  
  /** New password (must meet complexity requirements) */
  newPassword: string;
  
  /** Whether to logout from all other devices (default: true) */
  logoutOtherDevices: boolean;
  
  /** Prevent reuse of recent passwords (default: true) */
  preventReuse?: boolean;
  
  /** Device context for audit */
  deviceInfo?: DeviceInfo;
  
  /** Correlation ID for distributed tracing */
  correlationId?: string;
  
  /** Reason for password change (for audit) */
  reason?: string;
}

/**
 * Change Password Result
 */
export interface ChangePasswordResult {
  /** Whether the operation was successful */
  success: boolean;
  
  /** Success message in English */
  message: string;
  
  /** Success message in Bengali */
  messageBn?: string;
  
  /** Number of sessions revoked */
  sessionsRevoked: number;
  
  /** Whether password requires change on next login */
  requiresChangeOnNextLogin?: boolean;
  
  /** New session ID (if current session was rotated) */
  newSessionId?: string;
  
  /** Notification sent status */
  notificationSent?: boolean;
  
  /** Correlation ID for tracing */
  correlationId?: string;
}

// ============================================================
// Delete Account
// ============================================================

/**
 * Delete Account Command
 * @example
 * const command: DeleteAccountCommand = {
 *   userId: 'usr_123',
 *   confirm: true,
 *   reason: 'Privacy concerns',
 *   requestDataExport: true,
 *   deviceInfo: { ipAddress: '192.168.1.100', district: 'Dhaka' },
 *   correlationId: 'corr_abc123'
 * };
 */
export interface DeleteAccountCommand {
  /** User ID from JWT */
  userId: string;
  
  /** Confirmation for destructive operation (required) */
  confirm: boolean;
  
  /** Reason for account deletion (for audit) */
  reason?: string;
  
  /** Request data export before deletion */
  requestDataExport?: boolean;
  
  /** Grace period in days (default: 30) */
  gracePeriodDays?: number;
  
  /** Device context for audit */
  deviceInfo?: DeviceInfo;
  
  /** Correlation ID for distributed tracing */
  correlationId?: string;
}

/**
 * Delete Account Result
 */
export interface DeleteAccountResult {
  /** Whether the operation was successful */
  success: boolean;
  
  /** Success message in English */
  message: string;
  
  /** Success message in Bengali */
  messageBn?: string;
  
  /** User ID */
  userId: string;
  
  /** Deletion timestamp */
  deletedAt: Date;
  
  /** Grace period in days */
  gracePeriodDays: number;
  
  /** Permanent deletion date */
  permanentDeletionDate: Date;
  
  /** Data retention days */
  dataRetentionDays: number;
  
  /** Data export URL (if requested) */
  dataExportUrl?: string;
  
  /** Data export expiry */
  dataExportExpiresAt?: Date;
  
  /** Whether account can be reactivated */
  canReactivate: boolean;
  
  /** Reactivation deadline */
  reactivationDeadline: Date;
  
  /** Correlation ID for tracing */
  correlationId?: string;
}

// ============================================================
// Update Email
// ============================================================

/**
 * Update Email Command
 * @example
 * const command: UpdateEmailCommand = {
 *   userId: 'usr_123',
 *   newEmail: 'newemail@vubon.com.bd',
 *   currentPassword: 'MyP@ssw0rd',
 *   reason: 'Switching to primary email',
 *   deviceInfo: { ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0...' },
 *   correlationId: 'corr_abc123'
 * };
 */
export interface UpdateEmailCommand {
  /** User ID from JWT */
  userId: string;
  
  /** New email address */
  newEmail: string;
  
  /** Current password for verification */
  currentPassword: string;
  
  /** Reason for email change (for audit) */
  reason?: string;
  
  /** Device context for audit */
  deviceInfo?: DeviceInfo;
  
  /** Correlation ID for distributed tracing */
  correlationId?: string;
}

/**
 * Update Email Result
 */
export interface UpdateEmailResult {
  /** Whether the operation was successful */
  success: boolean;
  
  /** Success message in English */
  message: string;
  
  /** Success message in Bengali */
  messageBn?: string;
  
  /** Whether verification is required */
  requiresVerification: boolean;
  
  /** Masked email for display */
  maskedEmail: string;
  
  /** Session ID for verification tracking */
  sessionId?: string;
  
  /** Verification expiry in seconds */
  expiresInSeconds?: number;
  
  /** Resend cooldown in seconds */
  resendCooldownSeconds?: number;
  
  /** Remaining verification attempts */
  remainingAttempts?: number;
  
  /** Correlation ID for tracing */
  correlationId?: string;
}

// ============================================================
// Update Phone
// ============================================================

/**
 * Update Phone Command
 * @example
 * const command: UpdatePhoneCommand = {
 *   userId: 'usr_123',
 *   newPhone: '+8801712345678',
 *   currentPassword: 'MyP@ssw0rd',
 *   method: 'whatsapp',
 *   reason: 'Switched to new number',
 *   deviceInfo: { ipAddress: '192.168.1.100', networkType: '4g' },
 *   correlationId: 'corr_abc123'
 * };
 */
export interface UpdatePhoneCommand {
  /** User ID from JWT */
  userId: string;
  
  /** New phone number (E.164 format for Bangladesh) */
  newPhone: string;
  
  /** Current password for verification */
  currentPassword: string;
  
  /** OTP delivery method (default: 'sms') */
  method?: 'sms' | 'whatsapp' | 'voice';
  
  /** Preferred language for OTP message */
  language?: 'en' | 'bn';
  
  /** Reason for phone change (for audit) */
  reason?: string;
  
  /** Device context for audit */
  deviceInfo?: DeviceInfo;
  
  /** Correlation ID for distributed tracing */
  correlationId?: string;
}

/**
 * Update Phone Result
 */
export interface UpdatePhoneResult {
  /** Whether the operation was successful */
  success: boolean;
  
  /** Success message in English */
  message: string;
  
  /** Success message in Bengali */
  messageBn?: string;
  
  /** Whether verification is required */
  requiresVerification: boolean;
  
  /** Masked phone number for display */
  maskedPhone: string;
  
  /** Session ID for verification tracking */
  sessionId?: string;
  
  /** Verification method used */
  method?: 'sms' | 'whatsapp' | 'voice';
  
  /** Verification expiry in seconds */
  expiresInSeconds?: number;
  
  /** Resend cooldown in seconds */
  resendCooldownSeconds?: number;
  
  /** Remaining verification attempts */
  remainingAttempts?: number;
  
  /** Correlation ID for tracing */
  correlationId?: string;
}

// ============================================================
// Verify Phone
// ============================================================

/**
 * Verify Phone Command
 * @example
 * const command: VerifyPhoneCommand = {
 *   userId: 'usr_123',
 *   otp: '123456',
 *   method: 'whatsapp',
 *   sessionId: 'sess_550e8400...',
 *   deviceInfo: { ipAddress: '192.168.1.100', deviceId: 'device_456' },
 *   correlationId: 'corr_abc123'
 * };
 */
export interface VerifyPhoneCommand {
  /** User ID from JWT */
  userId: string;
  
  /** OTP code (6 digits) */
  otp: string;
  
  /** Session ID from update phone response */
  sessionId?: string;
  
  /** OTP delivery method */
  method?: 'sms' | 'whatsapp' | 'voice';
  
  /** Attempt number (for rate limiting) */
  attempt?: number;
  
  /** Device context for audit */
  deviceInfo?: DeviceInfo;
  
  /** Correlation ID for distributed tracing */
  correlationId?: string;
}

/**
 * Verify Phone Result
 */
export interface VerifyPhoneResult {
  /** Whether the operation was successful */
  success: boolean;
  
  /** Success message in English */
  message: string;
  
  /** Success message in Bengali */
  messageBn?: string;
  
  /** Verified phone number (masked) */
  phone: string;
  
  /** Verification timestamp */
  verifiedAt: Date;
  
  /** Remaining verification attempts (if failed) */
  remainingAttempts?: number;
  
  /** Whether account was locked */
  isLocked?: boolean;
  
  /** Lock expiry time (if locked) */
  lockExpiresAt?: Date;
  
  /** Correlation ID for tracing */
  correlationId?: string;
}

// ============================================================
// Factory Functions (Enterprise Enhancement)
// ============================================================

/**
 * Create UpdateProfileCommand with defaults
 */
export function createUpdateProfileCommand(
  userId: string,
  updates: {
    fullName?: string;
    displayName?: string;
    phone?: string;
    profilePicture?: string;
    timezone?: string;
    language?: SupportedLanguage;
    preferredDistrict?: string;
    preferredUpazila?: string;
  },
  deviceInfo?: DeviceInfo,
  correlationId?: string,
  reason?: string
): UpdateProfileCommand {
  return {
    userId,
    ...updates,
    deviceInfo,
    correlationId,
    reason,
  };
}

/**
 * Create ChangePasswordCommand with defaults
 */
export function createChangePasswordCommand(
  userId: string,
  currentPassword: string,
  newPassword: string,
  options?: {
    logoutOtherDevices?: boolean;
    preventReuse?: boolean;
    deviceInfo?: DeviceInfo;
    correlationId?: string;
    reason?: string;
  }
): ChangePasswordCommand {
  return {
    userId,
    currentPassword,
    newPassword,
    logoutOtherDevices: options?.logoutOtherDevices ?? true,
    preventReuse: options?.preventReuse ?? true,
    deviceInfo: options?.deviceInfo,
    correlationId: options?.correlationId,
    reason: options?.reason,
  };
}

/**
 * Create DeleteAccountCommand with defaults
 */
export function createDeleteAccountCommand(
  userId: string,
  confirm: boolean,
  options?: {
    reason?: string;
    requestDataExport?: boolean;
    gracePeriodDays?: number;
    deviceInfo?: DeviceInfo;
    correlationId?: string;
  }
): DeleteAccountCommand {
  return {
    userId,
    confirm,
    reason: options?.reason,
    requestDataExport: options?.requestDataExport ?? true,
    gracePeriodDays: options?.gracePeriodDays ?? 30,
    deviceInfo: options?.deviceInfo,
    correlationId: options?.correlationId,
  };
}

/**
 * Create UpdateEmailCommand
 */
export function createUpdateEmailCommand(
  userId: string,
  newEmail: string,
  currentPassword: string,
  deviceInfo?: DeviceInfo,
  correlationId?: string,
  reason?: string
): UpdateEmailCommand {
  return {
    userId,
    newEmail,
    currentPassword,
    reason,
    deviceInfo,
    correlationId,
  };
}

/**
 * Create UpdatePhoneCommand with defaults
 */
export function createUpdatePhoneCommand(
  userId: string,
  newPhone: string,
  currentPassword: string,
  options?: {
    method?: 'sms' | 'whatsapp' | 'voice';
    language?: 'en' | 'bn';
    reason?: string;
    deviceInfo?: DeviceInfo;
    correlationId?: string;
  }
): UpdatePhoneCommand {
  return {
    userId,
    newPhone,
    currentPassword,
    method: options?.method ?? 'sms',
    language: options?.language ?? 'en',
    reason: options?.reason,
    deviceInfo: options?.deviceInfo,
    correlationId: options?.correlationId,
  };
}

/**
 * Create VerifyPhoneCommand
 */
export function createVerifyPhoneCommand(
  userId: string,
  otp: string,
  options?: {
    sessionId?: string;
    method?: 'sms' | 'whatsapp' | 'voice';
    attempt?: number;
    deviceInfo?: DeviceInfo;
    correlationId?: string;
  }
): VerifyPhoneCommand {
  return {
    userId,
    otp,
    sessionId: options?.sessionId,
    method: options?.method ?? 'sms',
    attempt: options?.attempt,
    deviceInfo: options?.deviceInfo,
    correlationId: options?.correlationId,
  };
}

// ============================================================
// Type Guards
// ============================================================

/**
 * Type guard for UpdateProfileCommand
 */
export function isUpdateProfileCommand(command: unknown): command is UpdateProfileCommand {
  return (
    typeof command === 'object' &&
    command !== null &&
    'userId' in command &&
    typeof (command as UpdateProfileCommand).userId === 'string'
  );
}

/**
 * Type guard for ChangePasswordCommand
 */
export function isChangePasswordCommand(command: unknown): command is ChangePasswordCommand {
  return (
    typeof command === 'object' &&
    command !== null &&
    'userId' in command &&
    'currentPassword' in command &&
    'newPassword' in command
  );
}

/**
 * Type guard for DeleteAccountCommand
 */
export function isDeleteAccountCommand(command: unknown): command is DeleteAccountCommand {
  return (
    typeof command === 'object' &&
    command !== null &&
    'userId' in command &&
    'confirm' in command &&
    (command as DeleteAccountCommand).confirm === true
  );
}

// ============================================================
// Helper Functions
// ============================================================

/**
 * Get default success message in Bengali for operation type
 */
export function getDefaultSuccessMessageBn(
  operation: 'profile' | 'password' | 'email' | 'phone' | 'delete'
): string {
  const messages: Record<string, string> = {
    profile: 'প্রোফাইল সফলভাবে আপডেট করা হয়েছে',
    password: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে',
    email: 'ইমেইল সফলভাবে আপডেট করা হয়েছে',
    phone: 'ফোন নম্বর সফলভাবে আপডেট করা হয়েছে',
    delete: 'আপনার অ্যাকাউন্ট সফলভাবে মুছে ফেলা হয়েছে',
  };
  return messages[operation] || 'অপারেশন সফল হয়েছে';
}

// ============================================================
// Default Exports
// ============================================================

export type {
  SupportedLanguage,
  UserRole,
  UserStatus,
  DeviceInfo,
};
