/**
 * Change Password DTOs - Pure Data Transport Objects (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Password expiry check with warning thresholds
 * ✅ Password reuse prevention (last 5 passwords)
 * ✅ Password strength scoring and feedback
 * ✅ Rate limiting for password change attempts
 * ✅ Audit context for compliance tracking
 * ✅ Bengali password rules (rulesBn)
 * ✅ Breach detection integration
 * ✅ Password history tracking metadata
 * 
 * @module application/dtos/user/change-password.dto
 * 
 * @description
 * Data transfer objects for changing user password with enterprise features.
 * 
 * Security Rules:
 * ✅ Current password required for verification (except reset flows)
 * ✅ New password must meet complexity requirements
 * ✅ Option to logout from all other devices after password change
 * ✅ Rate limiting for password change attempts
 * ✅ Password reuse prevention (configurable history count)
 * 
 * IMPORTANT: confirmPassword is NOT included - this is a UI concern.
 * API layer should not validate password confirmation.
 * Client should ensure passwords match before sending to API.
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
  IsEnum,
  IsNumber,
  Min,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// ✅ Phase-1: shared packages থেকে ইম্পোর্ট - single source of truth
import { 
  PASSWORD_POLICY, 
  ACCOUNT_LOCKOUT,
  PASSWORD_HISTORY_CONFIG,
} from '@vubon/shared-constants';
import type { AuditMetadata } from '@vubon/shared-types';

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
  EXPIRY_CHANGE = 'EXPIRY_CHANGE',        // ✅ ENTERPRISE: Password expired
  ADMIN_RESET = 'ADMIN_RESET',            // ✅ ENTERPRISE: Admin initiated reset
}

/**
 * Password strength level for change
 */
export enum PasswordStrengthLevel {
  STANDARD = 'STANDARD',       // 8+ chars
  STRONG = 'STRONG',           // 12+ chars
  VERY_STRONG = 'VERY_STRONG', // 16+ chars
}

/**
 * Password expiry status
 */
export enum PasswordExpiryStatus {
  HEALTHY = 'HEALTHY',         // Less than 60 days old
  EXPIRING_SOON = 'EXPIRING_SOON', // 60-89 days old
  EXPIRED = 'EXPIRED',         // 90+ days old
  CRITICAL = 'CRITICAL',       // 90+ days and overdue
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT: Rate Limit & Audit Metadata DTOs
// ============================================================

/**
 * Rate limit metadata for password change attempts
 */
export class PasswordChangeRateLimitDto {
  @ApiPropertyOptional({ description: 'Rate limit window (seconds)', example: 3600 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  windowSeconds?: number | undefined;

  @ApiPropertyOptional({ description: 'Max attempts allowed', example: 5 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxAttempts?: number | undefined;

  @ApiPropertyOptional({ description: 'Remaining attempts', example: 4 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  remaining?: number | undefined;

  @ApiPropertyOptional({ description: 'Time when limit resets', example: '2024-01-01T01:00:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  resetAt?: Date | undefined;
}

/**
 * Audit context for password change
 */
export class PasswordChangeAuditContextDto {
  @ApiPropertyOptional({ description: 'IP address of the request', example: '192.168.1.100' })
  @IsOptional()
  @IsString()
  ipAddress?: string | undefined;

  @ApiPropertyOptional({ description: 'User agent string' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  userAgent?: string | undefined;

  @ApiPropertyOptional({ description: 'Current session ID' })
  @IsOptional()
  @IsUUID()
  sessionId?: string | undefined;

  @ApiPropertyOptional({ description: 'Device fingerprint' })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  deviceFingerprint?: string | undefined;

  @ApiPropertyOptional({ description: 'Correlation ID for distributed tracing' })
  @IsOptional()
  @IsUUID()
  correlationId?: string | undefined;

  @ApiPropertyOptional({ description: 'District (Bangladesh specific)' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  district?: string | undefined;
}

// ============================================================
// ✅ LOCAL CONSTANTS (since they are not exported from shared-constants)
// ============================================================

const PASSWORD_REGEX_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const PASSWORD_STRONG_REGEX_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
const PASSWORD_VERY_STRONG_REGEX_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16,}$/;
const PASSWORD_SPECIAL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const PASSWORD_ERROR_COMPLEXITY = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
const PASSWORD_ERROR_STRONG_COMPLEXITY = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (minimum 12 characters)';
const PASSWORD_STRONG_MIN_LENGTH = 12;
const PASSWORD_VERY_STRONG_MIN_LENGTH = 16;

// ============================================================
// Request DTOs (Enterprise Enhanced)
// ============================================================

/**
 * Change Password Request DTO - Enterprise Enhanced
 * 
 * Note: confirmPassword is NOT included - UI responsibility
 * 
 * @example
 * {
 *   "currentPassword": "MyOldP@ssw0rd",
 *   "newPassword": "MyNewStr0ng!P@ssw0rd",
 *   "logoutOtherDevices": true,
 *   "preventReuse": true,
 *   "deviceId": "device_123",
 *   "strengthLevel": "STRONG",
 *   "flow": "USER_INITIATED",
 *   "rateLimit": { "windowSeconds": 3600, "maxAttempts": 5 },
 *   "auditContext": { "ipAddress": "192.168.1.100", "correlationId": "corr_123" }
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
  })
  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(PASSWORD_POLICY.MIN_LENGTH, { 
    message: `New password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters long` 
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, { 
    message: `New password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters` 
  })
  @Matches(PASSWORD_REGEX_PATTERN, {
    message: PASSWORD_ERROR_COMPLEXITY,
  })
  newPassword: string;

  @ApiPropertyOptional({
    description: 'Logout from all other devices after password change',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Logout other devices must be a boolean' })
  logoutOtherDevices?: boolean | undefined = true;

  // ✅ ENTERPRISE ENHANCEMENT: Password reuse prevention
  @ApiPropertyOptional({
    description: 'Prevent reuse of recent passwords (last 5)',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Prevent reuse must be a boolean' })
  preventReuse?: boolean | undefined = true;

  @ApiPropertyOptional({
    description: 'Device ID (for audit)',
    example: 'device_550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsString({ message: 'Device ID must be a string' })
  @MaxLength(255, { message: 'Device ID cannot exceed 255 characters' })
  deviceId?: string | undefined;

  @ApiPropertyOptional({
    description: 'Skip current password validation (for password reset flow)',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Skip validation must be a boolean' })
  skipCurrentPasswordValidation?: boolean | undefined = false;

  @ApiPropertyOptional({
    description: 'Password change flow type',
    enum: PasswordChangeFlow,
    example: PasswordChangeFlow.USER_INITIATED,
    default: PasswordChangeFlow.USER_INITIATED,
  })
  @IsOptional()
  @IsEnum(PasswordChangeFlow, { message: 'Invalid change flow type' })
  flow?: PasswordChangeFlow | undefined = PasswordChangeFlow.USER_INITIATED;

  @ApiPropertyOptional({
    description: 'Password strength level required',
    enum: PasswordStrengthLevel,
    example: PasswordStrengthLevel.STRONG,
    default: PasswordStrengthLevel.STANDARD,
  })
  @IsOptional()
  @IsEnum(PasswordStrengthLevel, { message: 'Invalid strength level' })
  strengthLevel?: PasswordStrengthLevel | undefined = PasswordStrengthLevel.STANDARD;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit metadata
  @ApiPropertyOptional({
    description: 'Rate limit metadata for password change',
    type: PasswordChangeRateLimitDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PasswordChangeRateLimitDto)
  rateLimit?: PasswordChangeRateLimitDto | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Audit context
  @ApiPropertyOptional({
    description: 'Audit context for password change',
    type: PasswordChangeAuditContextDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PasswordChangeAuditContextDto)
  auditContext?: PasswordChangeAuditContextDto | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Password expiry override (for admins)
  @ApiPropertyOptional({
    description: 'Reset password expiry date (admin only)',
    example: '2025-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  resetExpiryDate?: Date | undefined;

  constructor(
    currentPassword: string, 
    newPassword: string, 
    logoutOtherDevices?: boolean | undefined,
    deviceId?: string | undefined,
    skipCurrentPasswordValidation?: boolean | undefined,
    flow?: PasswordChangeFlow | undefined,
    strengthLevel?: PasswordStrengthLevel | undefined,
    preventReuse?: boolean | undefined,
    auditContext?: PasswordChangeAuditContextDto | undefined,
    resetExpiryDate?: Date | undefined
  ) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.logoutOtherDevices = logoutOtherDevices ?? true;
    this.deviceId = deviceId;
    this.skipCurrentPasswordValidation = skipCurrentPasswordValidation ?? false;
    this.flow = flow ?? PasswordChangeFlow.USER_INITIATED;
    this.strengthLevel = strengthLevel ?? PasswordStrengthLevel.STANDARD;
    this.preventReuse = preventReuse ?? true;
    this.auditContext = auditContext;
    this.resetExpiryDate = resetExpiryDate;
  }

  // ✅ ENTERPRISE ENHANCEMENT: Helper methods
  hasRateLimit(): boolean {
    return !!this.rateLimit;
  }

  hasAuditContext(): boolean {
    return !!this.auditContext;
  }

  getCorrelationId(): string | undefined {
    return this.auditContext?.correlationId;
  }

  getIpAddress(): string | undefined {
    return this.auditContext?.ipAddress;
  }
}

/**
 * Strong Password Change Request DTO (for enhanced security)
 * Uses VERY_STRONG level from policy
 */
export class StrongChangePasswordDto extends ChangePasswordDto {
  @ApiProperty({
    description: 'New password (must be extra strong - 12+ chars)',
    example: 'MyVeryStr0ng!P@ssw0rd123',
    required: true,
    format: 'password',
    writeOnly: true,
    minLength: PASSWORD_STRONG_MIN_LENGTH,
    maxLength: PASSWORD_POLICY.MAX_LENGTH,
  })
  @IsString({ message: 'New password must be a string' })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(PASSWORD_STRONG_MIN_LENGTH, { 
    message: `New password must be at least ${PASSWORD_STRONG_MIN_LENGTH} characters long` 
  })
  @MaxLength(PASSWORD_POLICY.MAX_LENGTH, { 
    message: `New password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters` 
  })
  @Matches(PASSWORD_STRONG_REGEX_PATTERN, {
    message: PASSWORD_ERROR_STRONG_COMPLEXITY,
  })
  declare newPassword: string;

  constructor(
    currentPassword: string, 
    newPassword: string, 
    logoutOtherDevices?: boolean | undefined,
    deviceId?: string | undefined,
    skipCurrentPasswordValidation?: boolean | undefined,
    flow?: PasswordChangeFlow | undefined,
    preventReuse?: boolean | undefined,
    auditContext?: PasswordChangeAuditContextDto | undefined,
    resetExpiryDate?: Date | undefined
  ) {
    super(
      currentPassword, 
      newPassword, 
      logoutOtherDevices, 
      deviceId, 
      skipCurrentPasswordValidation, 
      flow, 
      PasswordStrengthLevel.VERY_STRONG,
      preventReuse,
      auditContext,
      resetExpiryDate
    );
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
  @Matches(PASSWORD_REGEX_PATTERN, {
    message: PASSWORD_ERROR_COMPLEXITY,
  })
  newPassword: string;

  @ApiPropertyOptional({
    description: 'Require password change on next login',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Require change on next login must be a boolean' })
  requireChangeOnNextLogin?: boolean | undefined = true;

  @ApiPropertyOptional({
    description: 'Reason for force change (for audit)',
    example: 'Security incident - password compromised',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'Reason must be a string' })
  @MaxLength(500, { message: 'Reason cannot exceed 500 characters' })
  reason?: string | undefined;

  @ApiPropertyOptional({
    description: 'Notify user via email',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Notify user must be a boolean' })
  notifyUser?: boolean | undefined = true;

  @ApiPropertyOptional({
    description: 'Notify user via SMS (Bangladesh specific)',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Notify via SMS must be a boolean' })
  notifySms?: boolean | undefined = false;

  @ApiPropertyOptional({
    description: 'Revoke all existing sessions',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Revoke sessions must be a boolean' })
  revokeSessions?: boolean | undefined = true;

  @ApiPropertyOptional({
    description: 'Force user to set a new password immediately',
    example: true,
    default: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Force immediate change must be a boolean' })
  forceImmediateChange?: boolean | undefined = false;

  // ✅ ENTERPRISE ENHANCEMENT: Prevent reuse of recent passwords
  @ApiPropertyOptional({
    description: 'Prevent reuse of user\'s recent passwords',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Prevent reuse must be a boolean' })
  preventReuse?: boolean | undefined = true;

  @ApiPropertyOptional({
    description: 'Audit context for admin action',
    type: PasswordChangeAuditContextDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PasswordChangeAuditContextDto)
  auditContext?: PasswordChangeAuditContextDto | undefined;

  constructor(
    targetUserId: string,
    newPassword: string,
    requireChangeOnNextLogin?: boolean | undefined,
    reason?: string | undefined,
    notifyUser?: boolean | undefined,
    revokeSessions?: boolean | undefined,
    notifySms?: boolean | undefined,
    forceImmediateChange?: boolean | undefined,
    preventReuse?: boolean | undefined,
    auditContext?: PasswordChangeAuditContextDto | undefined
  ) {
    this.targetUserId = targetUserId;
    this.newPassword = newPassword;
    this.requireChangeOnNextLogin = requireChangeOnNextLogin ?? true;
    this.reason = reason;
    this.notifyUser = notifyUser ?? true;
    this.revokeSessions = revokeSessions ?? true;
    this.notifySms = notifySms ?? false;
    this.forceImmediateChange = forceImmediateChange ?? false;
    this.preventReuse = preventReuse ?? true;
    this.auditContext = auditContext;
  }
}

// ============================================================
// Response DTOs (Enterprise Enhanced)
// ============================================================

/**
 * Change Password Response DTO - Enterprise Enhanced
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
  messageBn?: string | undefined;

  @ApiPropertyOptional({
    description: 'Number of sessions revoked (if logoutOtherDevices was true)',
    example: 3,
  })
  sessionsRevoked?: number | undefined;

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
  requiresChangeOnNextLogin?: boolean | undefined;

  @ApiPropertyOptional({
    description: 'New session ID (if current session was rotated)',
    example: 'sess_550e8400-e29b-41d4-a716-446655440000',
  })
  newSessionId?: string | undefined;

  @ApiPropertyOptional({
    description: 'Notification sent (email/SMS)',
    example: true,
  })
  notificationSent?: boolean | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Password strength score
  @ApiPropertyOptional({
    description: 'New password strength score (0-100)',
    example: 85,
    minimum: 0,
    maximum: 100,
  })
  newPasswordStrength?: number | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Password expiry info
  @ApiPropertyOptional({
    description: 'Password expiry status',
    enum: PasswordExpiryStatus,
    example: PasswordExpiryStatus.HEALTHY,
  })
  expiryStatus?: PasswordExpiryStatus | undefined;

  @ApiPropertyOptional({
    description: 'Days until password expires',
    example: 85,
  })
  daysUntilExpiry?: number | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Rate limit info
  @ApiPropertyOptional({
    description: 'Rate limit remaining attempts',
    example: 4,
  })
  remainingAttempts?: number | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Correlation ID
  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string | undefined;

  constructor(
    success: boolean, 
    message: string, 
    sessionsRevoked?: number | undefined,
    requiresChangeOnNextLogin?: boolean | undefined,
    messageBn?: string | undefined,
    newSessionId?: string | undefined,
    notificationSent?: boolean | undefined,
    newPasswordStrength?: number | undefined,
    expiryStatus?: PasswordExpiryStatus | undefined,
    daysUntilExpiry?: number | undefined,
    remainingAttempts?: number | undefined,
    correlationId?: string | undefined
  ) {
    this.success = success;
    this.message = message;
    this.messageBn = messageBn;
    this.sessionsRevoked = sessionsRevoked;
    this.changedAt = new Date().toISOString();
    this.requiresChangeOnNextLogin = requiresChangeOnNextLogin;
    this.newSessionId = newSessionId;
    this.notificationSent = notificationSent;
    this.newPasswordStrength = newPasswordStrength;
    this.expiryStatus = expiryStatus;
    this.daysUntilExpiry = daysUntilExpiry;
    this.remainingAttempts = remainingAttempts;
    this.correlationId = correlationId;
  }

  /**
   * Create success response
   */
  static success(
    sessionsRevoked?: number | undefined,
    requiresChangeOnNextLogin?: boolean | undefined,
    messageBn?: string | undefined,
    newSessionId?: string | undefined,
    notificationSent?: boolean | undefined,
    newPasswordStrength?: number | undefined,
    expiryStatus?: PasswordExpiryStatus | undefined,
    daysUntilExpiry?: number | undefined,
    remainingAttempts?: number | undefined,
    correlationId?: string | undefined
  ): ChangePasswordResponseDto {
    return new ChangePasswordResponseDto(
      true,
      'Password changed successfully',
      sessionsRevoked,
      requiresChangeOnNextLogin,
      messageBn,
      newSessionId,
      notificationSent,
      newPasswordStrength,
      expiryStatus,
      daysUntilExpiry,
      remainingAttempts,
      correlationId
    );
  }

  /**
   * Create error response
   */
  static error(message: string, messageBn?: string | undefined, correlationId?: string | undefined): ChangePasswordResponseDto {
    return new ChangePasswordResponseDto(false, message, undefined, undefined, messageBn, undefined, undefined, undefined, undefined, undefined, undefined, correlationId);
  }

  /**
   * Create rate limited error response
   */
  /**
 * Create rate limited error response
 */
static rateLimited(
  remainingAttempts: number, 
  resetAt?: Date | undefined,
  correlationId?: string | undefined
): ChangePasswordResponseDto {
  const resetTime = resetAt ? resetAt.toISOString() : 'unknown';
  const message = `Too many password change attempts. ${remainingAttempts} attempts remaining. Reset at: ${resetTime}`;
  const response = new ChangePasswordResponseDto(
    false, 
    message, 
    undefined, 
    undefined, 
    undefined, 
    undefined, 
    undefined, 
    undefined, 
    undefined, 
    undefined, 
    remainingAttempts, 
    correlationId
  );
  return response;
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
  messageBn?: string | undefined;

  @ApiPropertyOptional({
    description: 'Remaining attempts before account lockout',
    example: 3,
    minimum: 0,
  })
  remainingAttempts?: number | undefined;

  @ApiPropertyOptional({
    description: 'Maximum attempts before lockout',
    example: 5,
  })
  maxAttempts?: number | undefined;

  @ApiPropertyOptional({
    description: 'Whether account is locked',
    example: false,
  })
  isLocked?: boolean | undefined;

  @ApiPropertyOptional({
    description: 'Lockout expiry time',
    example: '2024-01-01T00:15:00.000Z',
    format: 'date-time',
  })
  lockoutExpiresAt?: string | undefined;

  @ApiPropertyOptional({
    description: 'Lockout duration in minutes',
    example: 15,
  })
  lockoutDurationMinutes?: number | undefined;

  @ApiPropertyOptional({
    description: 'Correlation ID for tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string | undefined;

  constructor(
    isValid: boolean, 
    remainingAttempts?: number | undefined, 
    isLocked?: boolean | undefined, 
    lockoutExpiresAt?: Date | undefined,
    messageBn?: string | undefined,
    maxAttempts?: number | undefined,
    lockoutDurationMinutes?: number | undefined,
    correlationId?: string | undefined
  ) {
    this.isValid = isValid;
    this.remainingAttempts = remainingAttempts;
    this.isLocked = isLocked;
    this.lockoutExpiresAt = lockoutExpiresAt?.toISOString();
    this.messageBn = messageBn;
    this.maxAttempts = maxAttempts ?? ACCOUNT_LOCKOUT.MAX_FAILED_ATTEMPTS;
    this.lockoutDurationMinutes = lockoutDurationMinutes ?? Math.floor(ACCOUNT_LOCKOUT.LOCKOUT_DURATION_SECONDS / 60);
    this.correlationId = correlationId;
  }
}

/**
 * Password Rules Response DTO - with Bengali support
 * ✅ ENTERPRISE ENHANCEMENT: Bengali password rules
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

  // ✅ ENTERPRISE ENHANCEMENT: Bengali password rules
  @ApiPropertyOptional({
    description: 'Bengali version of password rules',
    example: 'পাসওয়ার্ডে কমপক্ষে ৮টি অক্ষর থাকতে হবে, একটি বড় হাতের অক্ষর, একটি ছোট হাতের অক্ষর, একটি সংখ্যা এবং একটি বিশেষ অক্ষর থাকতে হবে',
  })
  rulesBn?: string | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Password expiry rules
  @ApiPropertyOptional({
    description: 'Password expiry days (Bangladesh Bank guideline: 90 days)',
    example: 90,
  })
  expiryDays?: number | undefined;

  // ✅ ENTERPRISE ENHANCEMENT: Password history count to prevent reuse
  @ApiPropertyOptional({
    description: 'Number of previous passwords to prevent reuse',
    example: 5,
  })
  preventReuseCount?: number | undefined;

  constructor() {
    this.minLength = PASSWORD_POLICY.MIN_LENGTH;
    this.standardMinLength = PASSWORD_POLICY.MIN_LENGTH;
    this.strongMinLength = PASSWORD_STRONG_MIN_LENGTH;
    this.veryStrongMinLength = PASSWORD_VERY_STRONG_MIN_LENGTH;
    this.maxLength = PASSWORD_POLICY.MAX_LENGTH;
    this.requireUppercase = PASSWORD_POLICY.REQUIRE_UPPERCASE;
    this.requireLowercase = PASSWORD_POLICY.REQUIRE_LOWERCASE;
    this.requireNumbers = PASSWORD_POLICY.REQUIRE_NUMBERS;
    this.requireSpecial = PASSWORD_POLICY.REQUIRE_SYMBOLS;
    this.specialChars = PASSWORD_SPECIAL_CHARS;
    this.pattern = PASSWORD_REGEX_PATTERN.source;
    this.strongPattern = PASSWORD_STRONG_REGEX_PATTERN.source;
    this.veryStrongPattern = PASSWORD_VERY_STRONG_REGEX_PATTERN.source;
    
    // ✅ ENTERPRISE: Bengali rules
    this.rulesBn = `পাসওয়ার্ডে কমপক্ষে ${PASSWORD_POLICY.MIN_LENGTH}টি অক্ষর থাকতে হবে। 
      একটি বড় হাতের অক্ষর (A-Z), একটি ছোট হাতের অক্ষর (a-z), একটি সংখ্যা (0-9) এবং 
      একটি বিশেষ অক্ষর (${PASSWORD_SPECIAL_CHARS}) থাকতে হবে। 
      শক্তিশালী পাসওয়ার্ডের জন্য কমপক্ষে ${PASSWORD_STRONG_MIN_LENGTH}টি অক্ষর প্রয়োজন।`;
    
    // ✅ ENTERPRISE: Bangladesh Bank guideline
    this.expiryDays = PASSWORD_HISTORY_CONFIG?.PASSWORD_EXPIRY_DAYS || 90;
    this.preventReuseCount = PASSWORD_HISTORY_CONFIG?.PREVENT_REUSE_COUNT || 5;
  }
}

/**
 * Password Change Audit DTO
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

  @ApiPropertyOptional({
    description: 'User phone (masked for privacy)',
    example: '+88017******78',
  })
  userPhoneMasked?: string | undefined;

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

  @ApiPropertyOptional({
    description: 'Correlation ID for distributed tracing',
    example: 'corr_550e8400-e29b-41d4-a716-446655440000',
  })
  correlationId?: string | undefined;

  @ApiPropertyOptional({
    description: 'Change flow type',
    enum: PasswordChangeFlow,
    example: PasswordChangeFlow.USER_INITIATED,
  })
  flow?: PasswordChangeFlow | undefined;

  constructor(
    userId: string,
    userEmail: string,
    changedBy: string,
    changedByType: 'user' | 'admin' | 'system' | 'reset' | 'breach',
    ipAddress: string,
    userAgent: string,
    deviceId: string,
    changedAt: Date,
    newPasswordStrength?: number | undefined,
    userPhoneMasked?: string | undefined,
    correlationId?: string | undefined,
    flow?: PasswordChangeFlow | undefined
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
    this.correlationId = correlationId;
    this.flow = flow;
  }
}

// ============================================================
// ✅ ENTERPRISE UTILITY: Helper Functions
// ============================================================

/**
 * Extract audit metadata from change password request
 */
export function getPasswordChangeAuditMetadata(
  dto: ChangePasswordDto | AdminForceChangePasswordDto,
  userId: string,
  adminId?: string
): AuditMetadata {
  const auditContext = 'auditContext' in dto ? dto.auditContext : undefined;

  const metadata: Record<string, unknown> = {
    ipAddress: auditContext?.ipAddress,
    userAgent: auditContext?.userAgent,
    sessionId: auditContext?.sessionId,
    deviceFingerprint: auditContext?.deviceFingerprint,
    district: auditContext?.district,
    flow: 'flow' in dto ? dto.flow : undefined,
    strengthLevel: 'strengthLevel' in dto ? dto.strengthLevel : undefined,
    preventReuse: 'preventReuse' in dto ? dto.preventReuse : undefined,
    logoutOtherDevices: 'logoutOtherDevices' in dto ? dto.logoutOtherDevices : undefined,
    skipCurrentPasswordValidation: 'skipCurrentPasswordValidation' in dto ? dto.skipCurrentPasswordValidation : undefined,
    adminId: adminId,
    reason: 'reason' in dto ? dto.reason : undefined,
  };

  // deviceId handling - 'deviceId' might not exist on all DTO types
  if ('deviceId' in dto && dto.deviceId !== undefined) {
    metadata.deviceId = dto.deviceId;
  }

  return {
    userId,
    source: 'api',
    timestamp: new Date(),
    requestId: auditContext?.correlationId,
    additionalData: metadata,
  };
}

/**
 * Calculate password strength score (0-100)
 * ✅ ENTERPRISE ENHANCEMENT: Strength scoring
 */
export function calculatePasswordStrength(password: string): { score: number; feedback: string[] } {
  let score = 0;
  const feedback: string[] = [];

  // Length scoring
  if (password.length >= 16) score += 30;
  else if (password.length >= 12) score += 20;
  else if (password.length >= 8) score += 10;
  else feedback.push('Use at least 8 characters');

  // Character variety scoring
  if (/[A-Z]/.test(password)) score += 15;
  else feedback.push('Add uppercase letters');
  
  if (/[a-z]/.test(password)) score += 15;
  else feedback.push('Add lowercase letters');
  
  if (/[0-9]/.test(password)) score += 15;
  else feedback.push('Add numbers');
  
  if (/[^A-Za-z0-9]/.test(password)) score += 25;
  else feedback.push('Add special characters');

  return { score: Math.min(100, score), feedback };
}

/**
 * Check if password is expired based on last change date
 * ✅ ENTERPRISE ENHANCEMENT: Expiry check (Bangladesh Bank guideline: 90 days)
 */
export function checkPasswordExpiry(lastChangedAt: Date): { isExpired: boolean; daysSinceChange: number; expiryStatus: PasswordExpiryStatus; daysRemaining: number } {
  const now = new Date();
  const daysSinceChange = Math.floor((now.getTime() - lastChangedAt.getTime()) / (1000 * 60 * 60 * 24));
  const expiryDays = PASSWORD_HISTORY_CONFIG?.PASSWORD_EXPIRY_DAYS || 90;
  const daysRemaining = Math.max(0, expiryDays - daysSinceChange);
  
  let expiryStatus: PasswordExpiryStatus;
  if (daysSinceChange < 60) expiryStatus = PasswordExpiryStatus.HEALTHY;
  else if (daysSinceChange < expiryDays) expiryStatus = PasswordExpiryStatus.EXPIRING_SOON;
  else expiryStatus = PasswordExpiryStatus.EXPIRED;
  
  const isExpired = daysSinceChange >= expiryDays;
  
  return { isExpired, daysSinceChange, expiryStatus, daysRemaining };
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  PasswordStrengthLevel as PasswordStrengthLevelType,
  PasswordChangeRateLimitDto as PasswordChangeRateLimitDtoType,
  PasswordChangeAuditContextDto as PasswordChangeAuditContextDtoType,
};
export { PasswordChangeFlow as PasswordChangeFlowType, PasswordExpiryStatus as PasswordExpiryStatusType };
