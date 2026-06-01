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
  Max,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// ============================================================
// Password Validation Constants
// ============================================================

/**
 * Password validation rules (for documentation)
 */
export const PASSWORD_RULES = {
  minLength: 8,
  maxLength: 128,
  strongMinLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecial: true,
  specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

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
 *   "deviceId": "device_123"
 * }
 */
export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password for verification',
    example: 'MyOldP@ssw0rd',
    required: true,
    format: 'password',
    writeOnly: true,
    minLength: PASSWORD_RULES.minLength,
    maxLength: PASSWORD_RULES.maxLength,
  })
  @IsString({ message: 'Current password must be a string' })
  @IsNotEmpty({ message: 'Current password is required' })
  @MinLength(PASSWORD_RULES.minLength, { 
    message: `Current password must be at least ${PASSWORD_RULES.minLength} characters long` 
  })
  @MaxLength(PASSWORD_RULES.maxLength, { 
    message: `Current password cannot exceed ${PASSWORD_RULES.maxLength} characters` 
  })
  currentPassword: string;

  @ApiProperty({
    description: 'New password (must meet complexity requirements)',
    example: 'MyNewStr0ng!P@ssw0rd',
    required: true,
    format: 'password',
    writeOnly: true,
    minLength: PASSWORD_RULES.minLength,
    maxLength: PASSWORD_RULES.maxLength,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
  })
  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(PASSWORD_RULES.minLength, { 
    message: `New password must be at least ${PASSWORD_RULES.minLength} characters long` 
  })
  @MaxLength(PASSWORD_RULES.maxLength, { 
    message: `New password cannot exceed ${PASSWORD_RULES.maxLength} characters` 
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
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

  constructor(
    currentPassword: string, 
    newPassword: string, 
    logoutOtherDevices?: boolean,
    deviceId?: string,
    skipCurrentPasswordValidation?: boolean
  ) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.logoutOtherDevices = logoutOtherDevices ?? true;
    this.deviceId = deviceId;
    this.skipCurrentPasswordValidation = skipCurrentPasswordValidation ?? false;
  }
}

/**
 * Strong Password Change Request DTO (for enhanced security)
 * Requires stronger password validation
 */
export class StrongChangePasswordDto extends ChangePasswordDto {
  @ApiProperty({
    description: 'New password (must be extra strong)',
    example: 'MyVeryStr0ng!P@ssw0rd123',
    required: true,
    format: 'password',
    writeOnly: true,
    minLength: PASSWORD_RULES.strongMinLength,
    maxLength: PASSWORD_RULES.maxLength,
  })
  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(PASSWORD_RULES.strongMinLength, { 
    message: `New password must be at least ${PASSWORD_RULES.strongMinLength} characters long` 
  })
  @MaxLength(PASSWORD_RULES.maxLength, { 
    message: `New password cannot exceed ${PASSWORD_RULES.maxLength} characters` 
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/, {
    message: 'New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (minimum 12 characters)',
  })
  newPassword: string;

  constructor(
    currentPassword: string, 
    newPassword: string, 
    logoutOtherDevices?: boolean,
    deviceId?: string,
    skipCurrentPasswordValidation?: boolean
  ) {
    super(currentPassword, newPassword, logoutOtherDevices, deviceId, skipCurrentPasswordValidation);
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
  })
  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(PASSWORD_RULES.minLength, { 
    message: `Password must be at least ${PASSWORD_RULES.minLength} characters long` 
  })
  @MaxLength(PASSWORD_RULES.maxLength, { 
    message: `Password cannot exceed ${PASSWORD_RULES.maxLength} characters` 
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
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
    description: 'Revoke all existing sessions',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Revoke sessions must be a boolean' })
  revokeSessions?: boolean = true;

  constructor(
    targetUserId: string,
    newPassword: string,
    requireChangeOnNextLogin?: boolean,
    reason?: string,
    notifyUser?: boolean,
    revokeSessions?: boolean
  ) {
    this.targetUserId = targetUserId;
    this.newPassword = newPassword;
    this.requireChangeOnNextLogin = requireChangeOnNextLogin ?? true;
    this.reason = reason;
    this.notifyUser = notifyUser ?? true;
    this.revokeSessions = revokeSessions ?? true;
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

  constructor(
    success: boolean, 
    message: string, 
    sessionsRevoked?: number,
    requiresChangeOnNextLogin?: boolean,
    messageBn?: string,
    newSessionId?: string
  ) {
    this.success = success;
    this.message = message;
    this.messageBn = messageBn;
    this.sessionsRevoked = sessionsRevoked;
    this.changedAt = new Date().toISOString();
    this.requiresChangeOnNextLogin = requiresChangeOnNextLogin;
    this.newSessionId = newSessionId;
  }

  /**
   * Create success response
   */
  static success(
    sessionsRevoked?: number,
    requiresChangeOnNextLogin?: boolean,
    messageBn?: string,
    newSessionId?: string
  ): ChangePasswordResponseDto {
    return new ChangePasswordResponseDto(
      true,
      'Password changed successfully',
      sessionsRevoked,
      requiresChangeOnNextLogin,
      messageBn,
      newSessionId
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
    description: 'Remaining attempts before account lockout',
    example: 3,
  })
  remainingAttempts?: number;

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

  constructor(isValid: boolean, remainingAttempts?: number, isLocked?: boolean, lockoutExpiresAt?: Date) {
    this.isValid = isValid;
    this.remainingAttempts = remainingAttempts;
    this.isLocked = isLocked;
    this.lockoutExpiresAt = lockoutExpiresAt?.toISOString();
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
    description: 'Strong password minimum length',
    example: 12,
  })
  strongMinLength: number;

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

  constructor() {
    this.minLength = PASSWORD_RULES.minLength;
    this.strongMinLength = PASSWORD_RULES.strongMinLength;
    this.maxLength = PASSWORD_RULES.maxLength;
    this.requireUppercase = PASSWORD_RULES.requireUppercase;
    this.requireLowercase = PASSWORD_RULES.requireLowercase;
    this.requireNumbers = PASSWORD_RULES.requireNumbers;
    this.requireSpecial = PASSWORD_RULES.requireSpecial;
    this.specialChars = PASSWORD_RULES.specialChars;
    this.pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';
    this.strongPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{12,}$';
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
    description: 'Changed by (user ID or admin ID)',
    example: 'usr_550e8400-e29b-41d4-a716-446655440000',
  })
  changedBy: string;

  @ApiProperty({
    description: 'Changed by type',
    example: 'user',
    enum: ['user', 'admin', 'system', 'reset'],
  })
  changedByType: 'user' | 'admin' | 'system' | 'reset';

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
    description: 'Timestamp of change',
    example: '2024-01-01T00:00:00.000Z',
    format: 'date-time',
  })
  changedAt: string;

  constructor(
    userId: string,
    userEmail: string,
    changedBy: string,
    changedByType: 'user' | 'admin' | 'system' | 'reset',
    ipAddress: string,
    userAgent: string,
    deviceId: string,
    changedAt: Date
  ) {
    this.userId = userId;
    this.userEmail = userEmail;
    this.changedBy = changedBy;
    this.changedByType = changedByType;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.deviceId = deviceId;
    this.changedAt = changedAt.toISOString();
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { PASSWORD_RULES as PasswordRules };
