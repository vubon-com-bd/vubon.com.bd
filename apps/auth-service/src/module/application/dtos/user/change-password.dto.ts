/**
 * Change Password DTOs - Pure Data Transport Objects
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/dtos/user/change-password.dto
 * 
 * @description
 * Data transfer objects for changing user password.
 * NO business logic, NO database queries, NO infrastructure imports.
 * 
 * Security Rules:
 * ✅ Current password required for verification
 * ✅ New password must meet complexity requirements
 * ✅ Option to logout from all other devices after password change
 * ✅ Rate limiting for password change attempts
 * 
 * IMPORTANT: confirmPassword is NOT included - this is a UI concern.
 * API layer should not validate password confirmation.
 * Client should ensure passwords match before sending to API.
 * 
 * Flow:
 * 1. User enters current password and new password in UI
 * 2. UI validates that new password matches confirmation
 * 3. UI sends currentPassword and newPassword to API
 * 4. API validates current password and updates to new password
 */

import { 
  IsString, 
  IsNotEmpty, 
  IsOptional,
  IsBoolean,
  IsUUID,
  MinLength, 
  MaxLength,
  Matches,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট - সেন্ট্রালাইজড কনফিগারেশন
import { PASSWORD_POLICY, ACCOUNT_LOCKOUT } from '@vubon/shared-constants';
// ✅ Phase-1 (shared-types) থেকে টাইপ ইম্পোর্ট
import type { PasswordStrength } from '@vubon/shared-types';

// ============================================================
// Enums
// ============================================================

/**
 * Password change flow type
 */
export enum PasswordChangeFlow {
  USER_INITIATED = 'USER_INITIATED',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  FORCE_CHANGE = 'FORCE_CHANGE',
  BREACH_DETECTED = 'BREACH_DETECTED',
}

/**
 * Password strength level for change
 */
export enum PasswordStrengthLevel {
  STANDARD = 'STANDARD',
  STRONG = 'STRONG',
  VERY_STRONG = 'VERY_STRONG',
}

// ============================================================
// Request DTOs
// ============================================================

/**
 * Change Password Request DTO
 * 
 * Note: confirmPassword is NOT included - UI responsibility
 * 
 * @example
 * {
 *   "currentPassword": "MyOldP@ssw0rd",
 *   "newPassword": "MyNewStr0ng!P@ssw0rd",
 *   "logoutOtherDevices": true,
 *   "deviceId": "device_123",
 *   "strengthLevel": "STRONG"
 * }
 */
export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password for verification',
    example: 'MyOldP@ssw0rd',
    required: true,
    format: 'password',
    writeOnly: true,
    minLength: PASSWORD_POLICY.MIN_LENGTH,
    maxLength: PASSWORD_POLICY.MAX_LENGTH,
  })
  @IsString({ message: 'Current password must be a string' })
  @IsNotEmpty({ message: 'Current password is required' })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, { 
    message: `Current password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters long` 
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, { 
    message: `Current password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters` 
  })
  currentPassword: string;

  @ApiProperty({
    description: 'New password (must meet complexity requirements)',
    example: 'MyNewStr0ng!P@ssw0rd',
    required: true,
    format: 'password',
    writeOnly: true,
    minLength: PASSWORD_POLICY.MIN_LENGTH,
    maxLength: PASSWORD_POLICY.MAX_LENGTH,
    pattern: PASSWORD_POLICY.REGEX_PATTERN,
  })
  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, { 
    message: `New password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters long` 
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, { 
    message: `New password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters` 
  })
  @Matches(PASSWORD_POLICY.REGEX_PATTERN, {
    message: PASSWORD_POLICY.ERROR_MESSAGES.COMPLEXITY,
  })
  newPassword: string;

  @ApiPropertyOptional({
    description: 'Logout from all other devices after password change',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Logout other devices must be a boolean' })
  logoutOtherDevices?: boolean = true;

  @ApiPropertyOptional({
    description: 'Device ID (for audit)',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: 'Device ID cannot exceed 255 characters' })
  deviceId?: string;

  @ApiPropertyOptional({
    description: 'Skip current password validation (for password reset flow)',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Skip validation must be a boolean' })
  skipCurrentPasswordValidation?: boolean = false;

  @ApiPropertyOptional({
    description: 'Password change flow type',
    enum: PasswordChangeFlow,
    example: PasswordChangeFlow.USER_INITIATED,
    default: PasswordChangeFlow.USER_INITIATED,
  })
  @IsOptional()
  @IsEnum(PasswordChangeFlow, { message: 'Invalid change flow type' })
  flow?: PasswordChangeFlow = PasswordChangeFlow.USER_INITIATED;

  @ApiPropertyOptional({
    description: 'Password strength level required',
    enum: PasswordStrengthLevel,
    example: PasswordStrengthLevel.STRONG,
    default: PasswordStrengthLevel.STANDARD,
  })
  @IsOptional()
  @IsEnum(PasswordStrengthLevel, { message: 'Invalid strength level' })
  strengthLevel?: PasswordStrengthLevel = PasswordStrengthLevel.STANDARD;

  constructor(
    currentPassword: string, 
    newPassword: string, 
    logoutOtherDevices?: boolean,
    deviceId?: string,
    skipCurrentPasswordValidation?: boolean,
    flow?: PasswordChangeFlow,
    strengthLevel?: PasswordStrengthLevel
  ) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.logoutOtherDevices = logoutOtherDevices ?? true;
    this.deviceId = deviceId;
    this.skipCurrentPasswordValidation = skipCurrentPasswordValidation ?? false;
    this.flow = flow ?? PasswordChangeFlow.USER_INITIATED;
    this.strengthLevel = strengthLevel ?? PasswordStrengthLevel.STANDARD;
  }
}

/**
 * Strong Password Change Request DTO (for enhanced security)
 * Uses VERY_STRONG level from policy
 */
export class StrongChangePasswordDto extends ChangePasswordDto {
  @ApiProperty({
    description: 'New password (must be extra strong)',
    example: 'MyVeryStr0ng!P@ssw0rd123',
    required: true,
    format: 'password',
    writeOnly: true,
    minLength: PASSWORD_POLICY.STRONG_MIN_LENGTH,
    maxLength: PASSWORD_POLICY.MAX_LENGTH,
    pattern: PASSWORD_POLICY.STRONG_REGEX_PATTERN,
  })
  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(PASSWORD_POLICY.STRONG_MIN_LENGTH, { 
    message: `New password must be at least ${PASSWORD_POLICY.STRONG_MIN_LENGTH} characters long` 
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, { 
    message: `New password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters` 
  })
  @Matches(PASSWORD_POLICY.STRONG_REGEX_PATTERN, {
    message: PASSWORD_POLICY.ERROR_MESSAGES.STRONG_COMPLEXITY,
  })
  newPassword: string;

  constructor(
    currentPassword: string, 
    newPassword: string, 
    logoutOtherDevices?: boolean,
    deviceId?: string,
    skipCurrentPasswordValidation?: boolean,
    flow?: PasswordChangeFlow
  ) {
    super(currentPassword, newPassword, logoutOtherDevices, deviceId, skipCurrentPasswordValidation, flow, PasswordStrengthLevel.VERY_STRONG);
  }
}

/**
 * Admin Force Password Change Request DTO
 * For administrators to force a password change for a user
 */
export class AdminForceChangePasswordDto {
  @ApiProperty({
    description: 'User ID to force password change',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
    required: true,
  })
  @IsUUID(4, { message: 'User ID must be a valid UUID' })
  @IsNotEmpty({ message: 'User ID is required' })
  targetUserId: string;

  @ApiProperty({
    description: 'New temporary password (will require change on next login)',
    example: 'TempP@ssw0rd123',
    required: true,
    format: 'password',
    writeOnly: true,
    minLength: PASSWORD_POLICY.MIN_LENGTH,
    maxLength: PASSWORD_POLICY.MAX_LENGTH,
  })
  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, { 
    message: `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters long` 
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, { 
    message: `Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters` 
  })
  @Matches(PASSWORD_POLICY.REGEX_PATTERN, {
    message: PASSWORD_POLICY.ERROR_MESSAGES.COMPLEXITY,
  })
  newPassword: string;

  @ApiPropertyOptional({
    description: 'Require password change on next login',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Require change on next login must be a boolean' })
  requireChangeOnNextLogin?: boolean = true;

  @ApiPropertyOptional({
    description: 'Reason for force change (for audit)',
    example: 'Security incident - password compromised',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string;

  @ApiPropertyOptional({
    description: 'Notify user via email',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Notify user must be a boolean' })
  notifyUser?: boolean = true;

  @ApiPropertyOptional({
    description: 'Notify user via SMS (Bangladesh specific)',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Notify via SMS must be a boolean' })
  notifySms?: boolean = false;

  @ApiPropertyOptional({
    description: 'Revoke all existing sessions',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Revoke sessions must be a boolean' })
  revokeSessions?: boolean = true;

  @ApiPropertyOptional({
    description: 'Force user to set a new password immediately',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Force immediate change must be a boolean' })
  forceImmediateChange?: boolean = false;

  constructor(
    targetUserId: string,
    newPassword: string,
    requireChangeOnNextLogin?: boolean,
    reason?: string,
    notifyUser?: boolean,
    revokeSessions?: boolean,
    notifySms?: boolean,
    forceImmediateChange?: boolean
  ) {
    this.targetUserId = targetUserId;
    this.newPassword = newPassword;
    this.requireChangeOnNextLogin = requireChangeOnNextLogin ?? true;
    this.reason = reason;
    this.notifyUser = notifyUser ?? true;
    this.revokeSessions = revokeSessions ?? true;
    this.notifySms = notifySms ?? false;
    this.forceImmediateChange = forceImmediateChange ?? false;
  }
}

// ============================================================
// Response DTOs
// ============================================================

/**
 * Change Password Response DTO
 */
export class ChangePasswordResponseDto {
  @ApiProperty({
    description: 'Whether the operation was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Password changed successfully',
  })
  message: string;

  @ApiPropertyOptional({
    description: 'Bengali response message',
    example: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে',
  })
  messageBn?: string;

  @ApiPropertyOptional({
    description: 'Number of sessions revoked (if logoutOtherDevices was true)',
    example: 3,
  })
  sessionsRevoked?: number;

  @ApiProperty({
    description: 'Timestamp when password was changed',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  changedAt: string;

  @ApiPropertyOptional({
    description: 'Whether password requires change on next login',
    example: false,
  })
  requiresChangeOnNextLogin?: boolean;

  @ApiPropertyOptional({
    description: 'New session ID (if current session was rotated)',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  newSessionId?: string;

  @ApiPropertyOptional({
    description: 'Notification sent (email/SMS)',
    example: true,
  })
  notificationSent?: boolean;

  constructor(
    success: boolean, 
    message: string, 
    sessionsRevoked?: number,
    requiresChangeOnNextLogin?: boolean,
    messageBn?: string,
    newSessionId?: string,
    notificationSent?: boolean
  ) {
    this.success = success;
    this.message = message;
    this.messageBn = messageBn;
    this.sessionsRevoked = sessionsRevoked;
    this.changedAt = new Date().toISOString();
    this.requiresChangeOnNextLogin = requiresChangeOnNextLogin;
    this.newSessionId = newSessionId;
    this.notificationSent = notificationSent;
  }

  /**
   * Create success response
   */
  static success(
    sessionsRevoked?: number,
    requiresChangeOnNextLogin?: boolean,
    messageBn?: string,
    newSessionId?: string,
    notificationSent?: boolean
  ): ChangePasswordResponseDto {
    return new ChangePasswordResponseDto(
      true,
      'Password changed successfully',
      sessionsRevoked,
      requiresChangeOnNextLogin,
      messageBn,
      newSessionId,
      notificationSent
    );
  }

  /**
   * Create error response
   */
  static error(message: string, messageBn?: string): ChangePasswordResponseDto {
    return new ChangePasswordResponseDto(false, message, undefined, undefined, messageBn);
  }
}

/**
 * Validate Current Password Response DTO
 */
export class ValidateCurrentPasswordResponseDto {
  @ApiProperty({
    description: 'Whether current password is valid',
    example: true,
  })
  isValid: boolean;

  @ApiPropertyOptional({
    description: 'Bengali message',
    example: 'পাসওয়ার্ড বৈধ',
  })
  messageBn?: string;

  @ApiPropertyOptional({
    description: 'Remaining attempts before account lockout',
    example: 3,
    minimum: 0,
  })
  remainingAttempts?: number;

  @ApiPropertyOptional({
    description: 'Maximum attempts before lockout',
    example: 5,
  })
  maxAttempts?: number;

  @ApiPropertyOptional({
    description: 'Whether account is locked',
    example: false,
  })
  isLocked?: boolean;

  @ApiPropertyOptional({
    description: 'Lockout expiry time',
    example: '2024-01-01T00:15:00.000Z',
    format: 'date-time',
  })
  lockoutExpiresAt?: string;

  @ApiPropertyOptional({
    description: 'Lockout duration in minutes',
    example: 15,
  })
  lockoutDurationMinutes?: number;

  constructor(
    isValid: boolean, 
    remainingAttempts?: number, 
    isLocked?: boolean, 
    lockoutExpiresAt?: Date,
    messageBn?: string,
    maxAttempts?: number,
    lockoutDurationMinutes?: number
  ) {
    this.isValid = isValid;
    this.remainingAttempts = remainingAttempts;
    this.isLocked = isLocked;
    this.lockoutExpiresAt = lockoutExpiresAt?.toISOString();
    this.messageBn = messageBn;
    this.maxAttempts = maxAttempts ?? ACCOUNT_LOCKOUT.MAX_FAILED_ATTEMPTS;
    this.lockoutDurationMinutes = lockoutDurationMinutes ?? Math.floor(ACCOUNT_LOCKOUT.LOCKOUT_DURATION_SECONDS / 60);
  }
}

/**
 * Password Validation Rules Response DTO
 */
export class PasswordRulesResponseDto {
  @ApiProperty({
    description: 'Minimum password length',
    example: 8,
  })
  minLength: number;

  @ApiProperty({
    description: 'Standard password minimum length',
    example: 8,
  })
  standardMinLength: number;

  @ApiProperty({
    description: 'Strong password minimum length',
    example: 12,
  })
  strongMinLength: number;

  @ApiProperty({
    description: 'Very strong password minimum length',
    example: 16,
  })
  veryStrongMinLength: number;

  @ApiProperty({
    description: 'Maximum password length',
    example: 128,
  })
  maxLength: number;

  @ApiProperty({
    description: 'Require uppercase letters',
    example: true,
  })
  requireUppercase: boolean;

  @ApiProperty({
    description: 'Require lowercase letters',
    example: true,
  })
  requireLowercase: boolean;

  @ApiProperty({
    description: 'Require numbers',
    example: true,
  })
  requireNumbers: boolean;

  @ApiProperty({
    description: 'Require special characters',
    example: true,
  })
  requireSpecial: boolean;

  @ApiProperty({
    description: 'Allowed special characters',
    example: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  })
  specialChars: string;

  @ApiProperty({
    description: 'Password regex pattern',
    example: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
  })
  pattern: string;

  @ApiProperty({
    description: 'Strong password regex pattern',
    example: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{12,}$',
  })
  strongPattern: string;

  @ApiProperty({
    description: 'Very strong password regex pattern',
    example: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{16,}$',
  })
  veryStrongPattern: string;

  @ApiPropertyOptional({
    description: 'Bengali version of password rules',
    example: 'পাসওয়ার্ডে কমপক্ষে ৮টি অক্ষর থাকতে হবে...',
  })
  rulesBn?: string;

  constructor() {
    this.minLength = PASSWORD_POLICY.MIN_LENGTH;
    this.standardMinLength = PASSWORD_POLICY.MIN_LENGTH;
    this.strongMinLength = PASSWORD_POLICY.STRONG_MIN_LENGTH;
    this.veryStrongMinLength = PASSWORD_POLICY.VERY_STRONG_MIN_LENGTH;
    this.maxLength = PASSWORD_POLICY.MAX_LENGTH;
    this.requireUppercase = PASSWORD_POLICY.REQUIRE_UPPERCASE;
    this.requireLowercase = PASSWORD_POLICY.REQUIRE_LOWERCASE;
    this.requireNumbers = PASSWORD_POLICY.REQUIRE_NUMBERS;
    this.requireSpecial = PASSWORD_POLICY.REQUIRE_SPECIAL;
    this.specialChars = PASSWORD_POLICY.SPECIAL_CHARS;
    this.pattern = PASSWORD_POLICY.REGEX_PATTERN;
    this.strongPattern = PASSWORD_POLICY.STRONG_REGEX_PATTERN;
    this.veryStrongPattern = PASSWORD_POLICY.VERY_STRONG_REGEX_PATTERN;
  }
}

/**
 * Password Change Audit Response DTO
 */
export class PasswordChangeAuditDto {
  @ApiProperty({
    description: 'User ID',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  userId: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@vubon.com.bd',
  })
  userEmail: string;

  @ApiProperty({
    description: 'User phone (masked for privacy)',
    example: '+88017******78',
  })
  userPhoneMasked?: string;

  @ApiProperty({
    description: 'Changed by (user ID or admin ID)',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  changedBy: string;

  @ApiProperty({
    description: 'Changed by type',
    example: 'user',
    enum: ['user', 'admin', 'system', 'reset', 'breach'],
  })
  changedByType: 'user' | 'admin' | 'system' | 'reset' | 'breach';

  @ApiProperty({
    description: 'IP address of the request',
    example: '192.168.1.100',
  })
  ipAddress: string;

  @ApiProperty({
    description: 'User agent of the request',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  userAgent: string;

  @ApiProperty({
    description: 'Device ID of the request',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
  })
  deviceId: string;

  @ApiProperty({
    description: 'Password strength score after change',
    example: 85,
    minimum: 0,
    maximum: 100,
  })
  newPasswordStrength: number;

  @ApiProperty({
    description: 'Timestamp of change',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  changedAt: string;

  constructor(
    userId: string,
    userEmail: string,
    changedBy: string,
    changedByType: 'user' | 'admin' | 'system' | 'reset' | 'breach',
    ipAddress: string,
    userAgent: string,
    deviceId: string,
    changedAt: Date,
    newPasswordStrength?: number,
    userPhoneMasked?: string
  ) {
    this.userId = userId;
    this.userEmail = userEmail;
    this.userPhoneMasked = userPhoneMasked;
    this.changedBy = changedBy;
    this.changedByType = changedByType;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.deviceId = deviceId;
    this.newPasswordStrength = newPasswordStrength ?? 0;
    this.changedAt = changedAt.toISOString();
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { PasswordStrengthLevel as PasswordStrengthLevelType };
export { PasswordChangeFlow as PasswordChangeFlowType };
