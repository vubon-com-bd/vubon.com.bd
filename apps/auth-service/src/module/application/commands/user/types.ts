/**
 * User Command Types - Pure DTOs
 * 
 * @module application/commands/user/types
 * 
 * @description
 * Type definitions for user command handlers.
 */

import { UserRole, UserStatus } from '../../../domain/entities/user.entity';

// ============================================================
// Update Profile
// ============================================================

export interface UpdateProfileCommand {
  userId: string;
  fullName ? : string;
  phone ? : string;
  profilePicture ? : string;
  timezone ? : string;
  language ? : string;
  deviceId ? : string;
  correlationId ? : string;
}

export interface UpdateProfileResult {
  id: string;
  email: string;
  fullName: string;
  phone ? : string;
  role: UserRole;
  status: UserStatus;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isMfaEnabled: boolean;
  profilePicture ? : string;
  timezone ? : string;
  language ? : string;
  updatedAt: Date;
}

// ============================================================
// Change Password
// ============================================================

export interface ChangePasswordCommand {
  userId: string;
  currentPassword: string;
  newPassword: string;
  logoutOtherDevices: boolean;
  deviceId ? : string;
  ipAddress ? : string;
  userAgent ? : string;
  correlationId ? : string;
}

export interface ChangePasswordResult {
  success: boolean;
  message: string;
  sessionsRevoked: number;
}

// ============================================================
// Delete Account
// ============================================================

export interface DeleteAccountCommand {
  userId: string;
  confirm: boolean;
  reason ? : string;
  deviceId ? : string;
  ipAddress ? : string;
  userAgent ? : string;
  correlationId ? : string;
}

export interface DeleteAccountResult {
  success: boolean;
  message: string;
  userId: string;
  deletedAt: Date;
  dataRetentionDays: number;
}

// ============================================================
// Update Email
// ============================================================

export interface UpdateEmailCommand {
  userId: string;
  newEmail: string;
  currentPassword: string;
  deviceId ? : string;
  ipAddress ? : string;
  userAgent ? : string;
  correlationId ? : string;
}

export interface UpdateEmailResult {
  success: boolean;
  message: string;
  requiresVerification: boolean;
  maskedEmail: string;
}

// ============================================================
// Update Phone
// ============================================================

export interface UpdatePhoneCommand {
  userId: string;
  newPhone: string;
  currentPassword: string;
  deviceId ? : string;
  ipAddress ? : string;
  userAgent ? : string;
  correlationId ? : string;
}

export interface UpdatePhoneResult {
  success: boolean;
  message: string;
  requiresVerification: boolean;
  maskedPhone: string;
}

// ============================================================
// Verify Phone
// ============================================================

export interface VerifyPhoneCommand {
  userId: string;
  otp: string;
  deviceId ? : string;
  ipAddress ? : string;
  userAgent ? : string;
  correlationId ? : string;
}

export interface VerifyPhoneResult {
  success: boolean;
  message: string;
  phone: string;
  verifiedAt: Date;
}
