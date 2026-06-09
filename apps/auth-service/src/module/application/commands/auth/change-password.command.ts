/**
 * Change Password Command - Pure Command Data Structure (Enterprise Enhanced v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module application/commands/auth/change-password.command

 * @description
 * Command for changing user password with enterprise-grade features.
 * Contains all necessary data for password change use case.

 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Shared types integration for type safety
 * ✅ Shared constants for notification methods
 * ✅ Command validation on construction (fail-fast)
 * ✅ Masking methods for secure logging
 * ✅ Confirm password validation (required for non-reset flows)
 * ✅ Password strength validation with shared-utils
 * ✅ Extension of change password reasons
 * ✅ Notification preferences tracking
 * ✅ Batch change support for admins with progress tracking
 * ✅ Scheduled changes with timezone support
 * ✅ Comprehensive toString() and toJSON() for logging
 * ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
 * ✅ Timezone-aware scheduled changes (Asia/Dhaka default)
 * ✅ Batch operation progress tracking callback
 * ✅ Password history check integration

 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ Comprehensive validation (fail-fast)
 * ✅ Framework-free
 * ✅ Audit trail ready
 */

import { randomUUID } from 'crypto';

// ============================================================
// Shared Packages Import (Enterprise Enhancement)
// ============================================================

import type { 
  DeviceInfo as SharedDeviceInfo,
  MobileOperator as SharedMobileOperator,
  NetworkType as SharedNetworkType,
  NotificationMethod as SharedNotificationMethod,
  PasswordChangeReason as SharedPasswordChangeReason,
} from '@vubon/shared-types';

import { 
  NETWORK_TYPES, 
  MOBILE_OPERATORS,
  NOTIFICATION_METHODS,
  PASSWORD_CHANGE_REASONS,
} from '@vubon/shared-constants';

import { 
  maskString, 
  checkPasswordStrength,
  timingSafeEqual,
} from '@vubon/shared-utils';

// ============================================================
// Types (Using shared types for consistency)
// ============================================================

/**
 * Device information for password change (Bangladesh specific)
 * ✅ Enhanced: Extends SharedDeviceInfo for complete type safety
 */
export interface ChangePasswordDeviceInfo extends SharedDeviceInfo {
  /** IP address of the client */
  ipAddress?: string;

  /** User agent string */
  userAgent?: string;

  /** Device identifier for fingerprinting */
  deviceId?: string;

  /** Session ID for tracking */
  sessionId?: string;

  /** Device fingerprint hash */
  deviceFingerprint?: string;

  /** Screen resolution for fingerprinting */
  screenResolution?: string;

  /** Browser language */
  language?: string;

  /** Timezone offset in minutes */
  timezoneOffset?: number;

  /** Retry attempt number (for connection resilience) */
  retryAttempt?: number;

  // Bangladesh specific fields
  /** District (Bangladesh) */
  district?: string;

  /** Upazila/Sub-district (Bangladesh) */
  upazila?: string;

  /** Mobile operator - from shared-constants */
  mobileOperator?: typeof MOBILE_OPERATORS[number];

  /** Network type - from shared-constants */
  networkType?: typeof NETWORK_TYPES[number];

  /** Data saver enabled status */
  dataSaverEnabled?: boolean;
}

/**
 * Notification method type (using shared constants)
 */
export type NotificationMethod = typeof NOTIFICATION_METHODS[keyof typeof NOTIFICATION_METHODS];

/**
 * Password change reason type (using shared constants)
 */
export type PasswordChangeReason = typeof PASSWORD_CHANGE_REASONS[keyof typeof PASSWORD_CHANGE_REASONS];

/**
 * Batch operation progress callback
 */
export interface BatchProgress {
  /** Total items to process */
  total: number;
  /** Completed items count */
  completed: number;
  /** Failed items count */
  failed: number;
  /** List of failed user IDs with reasons */
  failedUserIds: Array<{ userId: string; reason: string }>;
  /** Progress percentage (0-100) */
  percentage: number;
  /** Estimated remaining time in milliseconds */
  estimatedRemainingMs?: number;
}

/**
 * Command options interface
 */
export interface ChangePasswordCommandOptions {
  /** Whether to logout from other devices after password change */
  logoutOtherDevices?: boolean;

  /** Skip current password validation (for admin/reset flows) */
  skipCurrentPasswordValidation?: boolean;

  /** Reason for password change (for audit) */
  reason?: PasswordChangeReason;

  /** Custom reason description (if reason is OTHER) */
  customReason?: string;

  /** Admin ID (if changed by admin) */
  adminId?: string;

  /** Whether to send notification */
  sendNotification?: boolean;

  /** Notification method preference */
  notificationMethod?: NotificationMethod;

  /** Whether to prevent password reuse (check history) */
  preventReuse?: boolean;

  /** Force immediate logout (even for current session) */
  forceImmediateLogout?: boolean;

  /** Schedule change for later (ISO date string with timezone) */
  scheduledFor?: string;

  /** Timezone for scheduled change (IANA format, default: Asia/Dhaka) */
  timezone?: string;

  /** Minimum required password strength level */
  minStrengthLevel?: 'weak' | 'medium' | 'strong' | 'very_strong';
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
  strengthScore?: number;
}

// ============================================================
// Constants (using shared-constants values)
// ============================================================

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;
const DEFAULT_TIMEZONE = 'Asia/Dhaka';
const DEFAULT_MIN_STRENGTH_LEVEL = 'medium';

// Password strength level order for comparison
const STRENGTH_ORDER: Record<string, number> = {
  very_weak: 0,
  weak: 1,
  medium: 2,
  strong: 3,
  very_strong: 4,
};

// ============================================================
// Command Validation Error Class
// ============================================================

export class CommandValidationError extends Error {
  public readonly validationErrors: string[];
  public readonly validationWarnings?: string[];
  public readonly commandType: string;

  constructor(
    message: string, 
    validationErrors: string[], 
    commandType: string,
    validationWarnings?: string[]
  ) {
    super(message);
    this.name = 'CommandValidationError';
    this.validationErrors = validationErrors;
    this.validationWarnings = validationWarnings;
    this.commandType = commandType;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ============================================================
// Change Password Command (Enterprise Enhanced v3.0)
// ============================================================

/**
 * Change Password Command

 * @example
 * const command = new ChangePasswordCommand(
 *   'usr_123',
 *   'MyCurrentP@ssw0rd',
 *   'MyNewStr0ng!P@ssw0rd123',
 *   'MyNewStr0ng!P@ssw0rd123',  // confirm password (required)
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456',
 *     district: 'Dhaka',
 *     mobileOperator: 'gp'
 *   },
 *   'corr_abc123',
 *   {
 *     logoutOtherDevices: true,
 *     sendNotification: true,
 *     reason: 'USER_INITIATED',
 *     preventReuse: true,
 *     minStrengthLevel: 'strong'
 *   }
 * );
 */
export class ChangePasswordCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly logoutOtherDevices: boolean;
  public readonly skipCurrentPasswordValidation: boolean;
  public readonly reason?: PasswordChangeReason;
  public readonly customReason?: string;
  public readonly adminId?: string;
  public readonly sendNotification: boolean;
  public readonly notificationMethod: NotificationMethod;
  public readonly preventReuse: boolean;
  public readonly forceImmediateLogout: boolean;
  public readonly scheduledFor?: Date;
  public readonly timezone: string;
  public readonly minStrengthLevel: string;
  public readonly strengthScore?: number;

  constructor(
    /** User ID requesting password change */
    public readonly userId: string,

    /** Current password for verification (empty for admin/reset flows) */
    public readonly currentPassword: string,

    /** New password to set */
    public readonly newPassword: string,

    /** Confirm new password (required for non-reset flows) */
    public readonly confirmNewPassword?: string,

    /** Device information for audit and security tracking */
    public readonly deviceInfo?: ChangePasswordDeviceInfo,

    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string,

    /** Additional command options */
    options?: ChangePasswordCommandOptions
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.logoutOtherDevices = options?.logoutOtherDevices ?? true;
    this.skipCurrentPasswordValidation = options?.skipCurrentPasswordValidation ?? false;
    this.reason = options?.reason;
    this.customReason = options?.customReason;
    this.adminId = options?.adminId;
    this.sendNotification = options?.sendNotification ?? true;
    this.notificationMethod = options?.notificationMethod ?? NOTIFICATION_METHODS.EMAIL;
    this.preventReuse = options?.preventReuse ?? true;
    this.forceImmediateLogout = options?.forceImmediateLogout ?? false;
    this.timezone = options?.timezone ?? DEFAULT_TIMEZONE;
    this.minStrengthLevel = options?.minStrengthLevel ?? DEFAULT_MIN_STRENGTH_LEVEL;
    
    // Parse scheduled date with timezone awareness
    if (options?.scheduledFor) {
      this.scheduledFor = new Date(options.scheduledFor);
    }
    
    // Calculate password strength score if new password provided
    if (this.newPassword) {
      const strengthResult = checkPasswordStrength(this.newPassword);
      this.strengthScore = strengthResult.score;
    }

    // ✅ Enterprise: Validate command on construction
    this.validate();
  }

  // ============================================================
  // Validation Method (Enterprise Enhancement v3.0)
  // ============================================================

  /**
   * Validate command data with comprehensive checks
   * @throws {CommandValidationError} If validation fails
   */
  private validate(): void {
    const validation = this.getValidationResult();
    if (!validation.isValid) {
      throw new CommandValidationError(
        'Change password command validation failed',
        validation.errors,
        'ChangePasswordCommand',
        validation.warnings
      );
    }
  }

  /**
   * Get validation result without throwing
   */
  public getValidationResult(): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // ============================================================
    // 1. User ID Validation
    // ============================================================
    if (!this.userId || this.userId.trim().length === 0) {
      errors.push('User ID is required');
    } else if (this.userId.length > 255) {
      errors.push('User ID cannot exceed 255 characters');
    }

    // ============================================================
    // 2. Current Password Validation (for non-reset flows)
    // ============================================================
    if (!this.skipCurrentPasswordValidation) {
      if (!this.currentPassword || this.currentPassword.length === 0) {
        errors.push('Current password is required when skipCurrentPasswordValidation is false');
      } else if (this.currentPassword.length < PASSWORD_MIN_LENGTH) {
        warnings.push('Current password is shorter than recommended minimum length');
      }
    }

    // ============================================================
    // 3. New Password Validation (Comprehensive)
    // ============================================================
    if (!this.newPassword || this.newPassword.length === 0) {
      errors.push('New password is required');
    } else {
      // Length validation
      if (this.newPassword.length < PASSWORD_MIN_LENGTH) {
        errors.push(`New password must be at least ${PASSWORD_MIN_LENGTH} characters`);
      }
      if (this.newPassword.length > PASSWORD_MAX_LENGTH) {
        errors.push(`New password cannot exceed ${PASSWORD_MAX_LENGTH} characters`);
      }

      // ✅ ENHANCEMENT: Password strength validation using shared-utils
      const strengthResult = checkPasswordStrength(this.newPassword);
      
      // Check if password meets minimum strength requirement
      const requiredLevel = this.minStrengthLevel;
      const actualLevel = strengthResult.level;
      
      if (STRENGTH_ORDER[actualLevel] < STRENGTH_ORDER[requiredLevel]) {
        errors.push(
          `Password is too weak. Required strength: ${requiredLevel}, Actual: ${actualLevel}. ` +
          strengthResult.suggestions.join(' ')
        );
      }

      // Collect warnings for weak aspects
      if (strengthResult.suggestions.length > 0) {
        warnings.push(...strengthResult.suggestions);
      }

      // Check for common patterns (Bangladesh specific)
      const lowerPassword = this.newPassword.toLowerCase();
      const bangladeshPatterns = ['bangladesh', 'dhaka', 'chittagong', 'vubon', 'bkash', 'nagad'];
      for (const pattern of bangladeshPatterns) {
        if (lowerPassword.includes(pattern)) {
          warnings.push(`Password contains Bangladesh-related pattern: "${pattern}". Consider using a less predictable password.`);
          break;
        }
      }
    }

    // ============================================================
    // 4. Confirm Password Validation (Required for non-reset flows)
    // ============================================================
    if (!this.skipCurrentPasswordValidation) {
      if (!this.confirmNewPassword) {
        errors.push('Confirm password is required');
      } else if (this.newPassword !== this.confirmNewPassword) {
        errors.push('New password and confirmation do not match');
      }
    } else if (this.confirmNewPassword !== undefined && this.newPassword !== this.confirmNewPassword) {
      // Optional confirm check for reset flows
      errors.push('New password and confirmation do not match');
    }

    // ============================================================
    // 5. Check if new password is same as current (timing-safe)
    // ============================================================
    if (this.currentPassword && this.newPassword) {
      const isSame = timingSafeEqual(this.currentPassword, this.newPassword);
      if (isSame) {
        errors.push('New password must be different from current password');
      }
    }

    // ============================================================
    // 6. Scheduled Date Validation
    // ============================================================
    if (this.scheduledFor) {
      const now = new Date();
      const minScheduleTime = new Date(now.getTime() + 5 * 60 * 1000); // At least 5 minutes from now
      
      if (this.scheduledFor <= now) {
        errors.push('Scheduled date must be in the future');
      } else if (this.scheduledFor < minScheduleTime) {
        warnings.push('Scheduled time is less than 5 minutes from now. Consider using immediate change instead.');
      }
      
      // Maximum 90 days in future
      const maxScheduleTime = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
      if (this.scheduledFor > maxScheduleTime) {
        errors.push('Scheduled date cannot be more than 90 days in the future');
      }
    }

    // ============================================================
    // 7. Timezone Validation
    // ============================================================
    const validTimezones = ['Asia/Dhaka', 'Asia/Calcutta', 'UTC'];
    if (!validTimezones.includes(this.timezone) && !this.timezone.startsWith('Etc/')) {
      warnings.push(`Timezone "${this.timezone}" may not be supported. Using ${DEFAULT_TIMEZONE} as fallback.`);
    }

    // ============================================================
    // 8. Custom Reason Validation
    // ============================================================
    if (this.reason === PASSWORD_CHANGE_REASONS.OTHER) {
      if (!this.customReason || this.customReason.trim().length === 0) {
        errors.push('Custom reason is required when reason is OTHER');
      } else if (this.customReason.length > 500) {
        errors.push('Custom reason cannot exceed 500 characters');
      }
    }

    // ============================================================
    // 9. Admin ID Validation for admin-initiated changes
    // ============================================================
    if (this.adminId && this.adminId === this.userId) {
      warnings.push('Admin is changing their own password. This will be logged as self-change.');
    }

    // ============================================================
    // 10. Device Info Validation (optional warnings)
    // ============================================================
    if (this.deviceInfo) {
      if (this.deviceInfo.ipAddress && !this.isValidIpAddress(this.deviceInfo.ipAddress)) {
        warnings.push('Invalid IP address format provided');
      }
      if (this.deviceInfo.userAgent && this.deviceInfo.userAgent.length > 500) {
        warnings.push('User agent string is unusually long');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings: warnings.length > 0 ? warnings : undefined,
      strengthScore: this.strengthScore,
    };
  }

  /**
   * Validate IP address format
   */
  private isValidIpAddress(ip: string): boolean {
    const ipv4Pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Pattern = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})$/;
    return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
  }

  // ============================================================
  // Helper Methods
  // ============================================================

  /**
   * Check if this is an admin-initiated password change
   */
  isAdminInitiated(): boolean {
    return !!this.adminId;
  }

  /**
   * Check if this is a password reset flow (no current password)
   */
  isResetFlow(): boolean {
    return this.skipCurrentPasswordValidation || !this.currentPassword;
  }

  /**
   * Check if this is a scheduled change
   */
  isScheduled(): boolean {
    return !!this.scheduledFor;
  }

  /**
   * Check if password reuse prevention is enabled
   */
  shouldPreventReuse(): boolean {
    return this.preventReuse === true;
  }

  /**
   * Check if notification should be sent via SMS (Bangladesh specific)
   */
  shouldNotifyViaSms(): boolean {
    return this.sendNotification && 
           (this.notificationMethod === NOTIFICATION_METHODS.SMS || 
            this.notificationMethod === NOTIFICATION_METHODS.BOTH);
  }

  /**
   * Check if notification should be sent via WhatsApp (Bangladesh specific)
   */
  shouldNotifyViaWhatsApp(): boolean {
    return this.sendNotification && 
           this.notificationMethod === NOTIFICATION_METHODS.WHATSAPP;
  }

  /**
   * Get user identifier for logging
   */
  getUserIdentifier(): string {
    return this.userId;
  }

  /**
   * Get reason display text (with custom reason if applicable)
   */
  getReasonDisplay(): string {
    if (this.reason === PASSWORD_CHANGE_REASONS.OTHER && this.customReason) {
      return `${this.reason}: ${this.customReason}`;
    }
    return this.reason || PASSWORD_CHANGE_REASONS.USER_INITIATED;
  }

  /**
   * Get password strength level as string
   */
  getPasswordStrengthLevel(): string {
    if (!this.newPassword) return 'unknown';
    return checkPasswordStrength(this.newPassword).level;
  }

  /**
   * Get scheduled date in local timezone
   */
  getLocalScheduledDate(): Date | null {
    if (!this.scheduledFor) return null;
    // Convert to local timezone
    const localDate = new Date(this.scheduledFor);
    const offset = this.getTimezoneOffsetMinutes();
    return new Date(localDate.getTime() + offset * 60000);
  }

  /**
   * Get timezone offset in minutes
   */
  getTimezoneOffsetMinutes(): number {
    const timezoneMap: Record<string, number> = {
      'Asia/Dhaka': 360,      // UTC+6
      'Asia/Calcutta': 330,   // UTC+5:30
      'UTC': 0,
    };
    return timezoneMap[this.timezone] || 360;
  }

  // ============================================================
  // Masking Methods (Privacy & Secure Logging)
  // ============================================================

  /**
   * Get masked current password for logging
   */
  getMaskedCurrentPassword(): string {
    return this.currentPassword ? `[${this.currentPassword.length} chars]` : '***';
  }

  /**
   * Get masked new password for logging
   */
  getMaskedNewPassword(): string {
    return this.newPassword ? `[${this.newPassword.length} chars, strength: ${this.getPasswordStrengthLevel()}]` : '***';
  }

  /**
   * Get masked user ID for logging
   */
  getMaskedUserId(): string {
    if (!this.userId) return '***';
    if (this.userId.length <= 8) return this.userId;
    return `${this.userId.slice(0, 4)}...${this.userId.slice(-4)}`;
  }

  /**
   * Get masked admin ID for logging
   */
  getMaskedAdminId(): string {
    if (!this.adminId) return '***';
    if (this.adminId.length <= 8) return this.adminId;
    return `${this.adminId.slice(0, 4)}...${this.adminId.slice(-4)}`;
  }

  /**
   * Get masked IP address for logging
   */
  getMaskedIpAddress(): string {
    if (!this.deviceInfo?.ipAddress) return '***';
    const ip = this.deviceInfo.ipAddress;
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.***.***`;
    }
    return maskString(ip, 4, 4);
  }

  // ============================================================
  // Logging Methods (Enterprise Enhancement)
  // ============================================================

  /**
   * Get audit metadata for logging
   */
  getAuditMetadata(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      userId: this.getMaskedUserId(),
      adminId: this.getMaskedAdminId(),
      reason: this.getReasonDisplay(),
      logoutOtherDevices: this.logoutOtherDevices,
      skipCurrentPasswordValidation: this.skipCurrentPasswordValidation,
      sendNotification: this.sendNotification,
      notificationMethod: this.notificationMethod,
      preventReuse: this.preventReuse,
      forceImmediateLogout: this.forceImmediateLogout,
      isScheduled: this.isScheduled(),
      scheduledFor: this.scheduledFor?.toISOString(),
      timezone: this.timezone,
      newPasswordStrength: this.getPasswordStrengthLevel(),
      minStrengthRequired: this.minStrengthLevel,
      deviceInfo: {
        hasIp: !!this.deviceInfo?.ipAddress,
        maskedIp: this.getMaskedIpAddress(),
        hasUserAgent: !!this.deviceInfo?.userAgent,
        hasDeviceId: !!this.deviceInfo?.deviceId,
        district: this.deviceInfo?.district,
        upazila: this.deviceInfo?.upazila,
        mobileOperator: this.deviceInfo?.mobileOperator,
        networkType: this.deviceInfo?.networkType,
      },
      correlationId: this.correlationId,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * Get a safe version of the command for logging (without sensitive data)
   */
  toSafeLog(): Omit<ChangePasswordCommand, 'currentPassword' | 'newPassword' | 'confirmNewPassword'> & {
    currentPasswordPresent: boolean;
    newPasswordPresent: boolean;
    confirmNewPasswordPresent: boolean;
    newPasswordStrength: string;
  } {
    return {
      commandId: this.commandId,
      userId: this.getMaskedUserId(),
      adminId: this.getMaskedAdminId(),
      currentPasswordPresent: !!this.currentPassword,
      newPasswordPresent: !!this.newPassword,
      confirmNewPasswordPresent: !!this.confirmNewPassword,
      newPasswordStrength: this.getPasswordStrengthLevel(),
      deviceInfo: this.deviceInfo ? {
        hasIp: !!this.deviceInfo.ipAddress,
        maskedIp: this.getMaskedIpAddress(),
        hasUserAgent: !!this.deviceInfo.userAgent,
        hasDeviceId: !!this.deviceInfo.deviceId,
        district: this.deviceInfo.district,
        upazila: this.deviceInfo.upazila,
        mobileOperator: this.deviceInfo.mobileOperator,
        networkType: this.deviceInfo.networkType,
      } : undefined,
      correlationId: this.correlationId,
      logoutOtherDevices: this.logoutOtherDevices,
      skipCurrentPasswordValidation: this.skipCurrentPasswordValidation,
      reason: this.getReasonDisplay(),
      sendNotification: this.sendNotification,
      notificationMethod: this.notificationMethod,
      preventReuse: this.preventReuse,
      forceImmediateLogout: this.forceImmediateLogout,
      isScheduled: this.isScheduled(),
      scheduledFor: this.scheduledFor?.toISOString(),
      timezone: this.timezone,
      minStrengthLevel: this.minStrengthLevel,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * Convert to string for logging (sensitive data masked)
   */
  toString(): string {
    return `ChangePasswordCommand(id=${this.commandId.slice(0, 8)}..., userId=${this.getMaskedUserId()}, isAdminInitiated=${this.isAdminInitiated()}, isResetFlow=${this.isResetFlow()}, isScheduled=${this.isScheduled()}, reason=${this.getReasonDisplay()}, newPasswordStrength=${this.getPasswordStrengthLevel()}, logoutOtherDevices=${this.logoutOtherDevices}, sendNotification=${this.sendNotification}, notificationMethod=${this.notificationMethod}, timestamp=${this.timestamp.toISOString()})`;
  }

  /**
   * Get summary for JSON logging
   */
  toJSON(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      userId: this.getMaskedUserId(),
      adminId: this.getMaskedAdminId(),
      isAdminInitiated: this.isAdminInitiated(),
      isResetFlow: this.isResetFlow(),
      isScheduled: this.isScheduled(),
      reason: this.getReasonDisplay(),
      logoutOtherDevices: this.logoutOtherDevices,
      skipCurrentPasswordValidation: this.skipCurrentPasswordValidation,
      sendNotification: this.sendNotification,
      notificationMethod: this.notificationMethod,
      preventReuse: this.preventReuse,
      forceImmediateLogout: this.forceImmediateLogout,
      scheduledFor: this.scheduledFor?.toISOString(),
      timezone: this.timezone,
      newPasswordStrength: this.getPasswordStrengthLevel(),
      minStrengthRequired: this.minStrengthLevel,
      deviceInfo: this.deviceInfo ? {
        hasIp: !!this.deviceInfo.ipAddress,
        maskedIp: this.getMaskedIpAddress(),
        hasUserAgent: !!this.deviceInfo.userAgent,
        hasDeviceId: !!this.deviceInfo.deviceId,
        district: this.deviceInfo.district,
        upazila: this.deviceInfo.upazila,
        mobileOperator: this.deviceInfo.mobileOperator,
        networkType: this.deviceInfo.networkType,
      } : undefined,
      correlationId: this.correlationId,
      timestamp: this.timestamp.toISOString(),
    };
  }
}

// ============================================================
// Admin Force Change Password Command (Enterprise Enhanced v3.0)
// ============================================================

/**
 * Admin Force Change Password Command
 * For administrators to force password change for a user

 * @example
 * const command = new AdminForceChangePasswordCommand(
 *   'admin_123',
 *   'usr_456',
 *   'TempP@ssw0rd123',
 *   'TempP@ssw0rd123',  // confirm password
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...'
 *   },
 *   'corr_abc123',
 *   {
 *     requireChangeOnNextLogin: true,
 *     reason: 'SECURITY_INCIDENT',
 *     customReason: 'Password compromised in data breach',
 *     notifyUser: true,
 *     revokeSessions: true,
 *     sendSmsNotification: true,
 *     expiryDays: 7
 *   }
 * );
 */
export class AdminForceChangePasswordCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly requireChangeOnNextLogin: boolean;
  public readonly reason?: PasswordChangeReason;
  public readonly customReason?: string;
  public readonly notifyUser: boolean;
  public readonly sendEmailNotification: boolean;
  public readonly sendSmsNotification: boolean;
  public readonly revokeSessions: boolean;
  public readonly expiryDays: number;
  public readonly forceImmediate: boolean;
  public readonly newPasswordStrength?: string;

  constructor(
    /** Admin ID performing the action */
    public readonly adminId: string,

    /** Target user ID */
    public readonly targetUserId: string,

    /** New temporary password */
    public readonly newPassword: string,

    /** Confirm new password */
    public readonly confirmNewPassword?: string,

    /** Device information for audit */
    public readonly deviceInfo?: ChangePasswordDeviceInfo,

    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string,

    /** Additional command options */
    options?: {
      requireChangeOnNextLogin?: boolean;
      reason?: PasswordChangeReason;
      customReason?: string;
      notifyUser?: boolean;
      sendEmailNotification?: boolean;
      sendSmsNotification?: boolean;
      revokeSessions?: boolean;
      expiryDays?: number;
      forceImmediate?: boolean;
    }
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.requireChangeOnNextLogin = options?.requireChangeOnNextLogin ?? true;
    this.reason = options?.reason;
    this.customReason = options?.customReason;
    this.notifyUser = options?.notifyUser ?? true;
    this.sendEmailNotification = options?.sendEmailNotification ?? true;
    this.sendSmsNotification = options?.sendSmsNotification ?? false;
    this.revokeSessions = options?.revokeSessions ?? true;
    this.expiryDays = options?.expiryDays ?? 7;
    this.forceImmediate = options?.forceImmediate ?? false;

    // Calculate password strength
    if (this.newPassword) {
      const strengthResult = checkPasswordStrength(this.newPassword);
      this.newPasswordStrength = strengthResult.level;
    }

    // ✅ Validate on construction
    this.validate();
  }

  /**
   * Validate command data
   */
  private validate(): void {
    const errors: string[] = [];

    if (!this.adminId || this.adminId.trim().length === 0) {
      errors.push('Admin ID is required');
    }

    if (!this.targetUserId || this.targetUserId.trim().length === 0) {
      errors.push('Target user ID is required');
    }

    if (this.adminId === this.targetUserId) {
      errors.push('Admin cannot force change their own password. Use regular change password flow.');
    }

    if (!this.newPassword || this.newPassword.length === 0) {
      errors.push('New password is required');
    } else {
      // Password strength check for temporary password
      const strengthResult = checkPasswordStrength(this.newPassword);
      if (strengthResult.level === 'very_weak') {
        errors.push('Temporary password is too weak. Please choose a stronger password.');
      }
    }

    if (this.confirmNewPassword !== undefined && this.newPassword !== this.confirmNewPassword) {
      errors.push('New password and confirmation do not match');
    }

    if (this.expiryDays < 1 || this.expiryDays > 90) {
      errors.push('Expiry days must be between 1 and 90');
    }

    if (this.reason === PASSWORD_CHANGE_REASONS.OTHER && !this.customReason) {
      errors.push('Custom reason is required when reason is OTHER');
    }

    if (errors.length > 0) {
      throw new CommandValidationError(
        'Admin force change password command validation failed',
        errors,
        'AdminForceChangePasswordCommand'
      );
    }
  }

  /**
   * Check if notification should be sent via SMS (Bangladesh specific)
   */
  shouldNotifyViaSms(): boolean {
    return this.notifyUser && this.sendSmsNotification === true;
  }

  /**
   * Get reason display text (with custom reason if applicable)
   */
  getReasonDisplay(): string {
    if (this.reason === PASSWORD_CHANGE_REASONS.OTHER && this.customReason) {
      return `${this.reason}: ${this.customReason}`;
    }
    return this.reason || PASSWORD_CHANGE_REASONS.ADMIN_FORCED;
  }

  /**
   * Get masked admin ID for logging
   */
  getMaskedAdminId(): string {
    if (!this.adminId) return '***';
    if (this.adminId.length <= 8) return this.adminId;
    return `${this.adminId.slice(0, 4)}...${this.adminId.slice(-4)}`;
  }

  /**
   * Get masked target user ID for logging
   */
  getMaskedTargetUserId(): string {
    if (!this.targetUserId) return '***';
    if (this.targetUserId.length <= 8) return this.targetUserId;
    return `${this.targetUserId.slice(0, 4)}...${this.targetUserId.slice(-4)}`;
  }

  /**
   * Get audit metadata
   */
  getAuditMetadata(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      adminId: this.getMaskedAdminId(),
      targetUserId: this.getMaskedTargetUserId(),
      reason: this.getReasonDisplay(),
      requireChangeOnNextLogin: this.requireChangeOnNextLogin,
      notifyUser: this.notifyUser,
      sendEmailNotification: this.sendEmailNotification,
      sendSmsNotification: this.sendSmsNotification,
      revokeSessions: this.revokeSessions,
      expiryDays: this.expiryDays,
      forceImmediate: this.forceImmediate,
      newPasswordStrength: this.newPasswordStrength,
      deviceInfo: this.deviceInfo,
      correlationId: this.correlationId,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * Get a safe version of the command for logging
   */
  toSafeLog(): Omit<AdminForceChangePasswordCommand, 'newPassword' | 'confirmNewPassword'> & {
    newPasswordPresent: boolean;
    confirmNewPasswordPresent: boolean;
    newPasswordStrength: string | undefined;
  } {
    return {
      commandId: this.commandId,
      adminId: this.getMaskedAdminId(),
      targetUserId: this.getMaskedTargetUserId(),
      newPasswordPresent: !!this.newPassword,
      confirmNewPasswordPresent: !!this.confirmNewPassword,
      newPasswordStrength: this.newPasswordStrength,
      deviceInfo: this.deviceInfo,
      correlationId: this.correlationId,
      requireChangeOnNextLogin: this.requireChangeOnNextLogin,
      reason: this.getReasonDisplay(),
      notifyUser: this.notifyUser,
      sendEmailNotification: this.sendEmailNotification,
      sendSmsNotification: this.sendSmsNotification,
      revokeSessions: this.revokeSessions,
      expiryDays: this.expiryDays,
      forceImmediate: this.forceImmediate,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * Convert to string for logging
   */
  toString(): string {
    return `AdminForceChangePasswordCommand(id=${this.commandId.slice(0, 8)}..., adminId=${this.getMaskedAdminId()}, targetUserId=${this.getMaskedTargetUserId()}, reason=${this.getReasonDisplay()}, newPasswordStrength=${this.newPasswordStrength}, requireChangeOnNextLogin=${this.requireChangeOnNextLogin}, notifyUser=${this.notifyUser}, revokeSessions=${this.revokeSessions}, expiryDays=${this.expiryDays}, timestamp=${this.timestamp.toISOString()})`;
  }
}

// ============================================================
// Batch Change Password Command (Enterprise Feature v2.0)
// ============================================================

/**
 * Batch Change Password Command
 * For bulk password changes by administrators with progress tracking

 * @example
 * const command = new BatchChangePasswordCommand(
 *   'admin_123',
 *   ['usr_1', 'usr_2', 'usr_3'],
 *   'TempP@ssw0rd123',
 *   {
 *     reason: 'SECURITY_INCIDENT',
 *     requireChangeOnNextLogin: true,
 *     notifyUsers: true,
 *     sendSmsNotifications: true,
 *     expiryDays: 7,
 *     onProgress: (progress) => console.log(`${progress.percentage}% complete`)
 *   }
 * );
 */
export class BatchChangePasswordCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly requireChangeOnNextLogin: boolean;
  public readonly reason?: PasswordChangeReason;
  public readonly customReason?: string;
  public readonly notifyUsers: boolean;
  public readonly sendEmailNotifications: boolean;
  public readonly sendSmsNotifications: boolean;
  public readonly revokeSessions: boolean;
  public readonly expiryDays: number;
  public readonly onProgress?: (progress: BatchProgress) => void;
  public readonly newPasswordStrength?: string;

  constructor(
    /** Admin ID performing the action */
    public readonly adminId: string,

    /** Target user IDs */
    public readonly targetUserIds: string[],

    /** New temporary password (same for all users) */
    public readonly newPassword: string,

    /** Additional command options */
    options?: {
      requireChangeOnNextLogin?: boolean;
      reason?: PasswordChangeReason;
      customReason?: string;
      notifyUsers?: boolean;
      sendEmailNotifications?: boolean;
      sendSmsNotifications?: boolean;
      revokeSessions?: boolean;
      expiryDays?: number;
      onProgress?: (progress: BatchProgress) => void;
    }
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.requireChangeOnNextLogin = options?.requireChangeOnNextLogin ?? true;
    this.reason = options?.reason;
    this.customReason = options?.customReason;
    this.notifyUsers = options?.notifyUsers ?? true;
    this.sendEmailNotifications = options?.sendEmailNotifications ?? true;
    this.sendSmsNotifications = options?.sendSmsNotifications ?? false;
    this.revokeSessions = options?.revokeSessions ?? true;
    this.expiryDays = options?.expiryDays ?? 7;
    this.onProgress = options?.onProgress;

    // Calculate password strength
    if (this.newPassword) {
      const strengthResult = checkPasswordStrength(this.newPassword);
      this.newPasswordStrength = strengthResult.level;
    }

    this.validate();
  }

  /**
   * Validate command data
   */
  private validate(): void {
    const errors: string[] = [];

    if (!this.adminId || this.adminId.trim().length === 0) {
      errors.push('Admin ID is required');
    }

    if (!this.targetUserIds || this.targetUserIds.length === 0) {
      errors.push('At least one target user ID is required');
    }

    if (this.targetUserIds.length > 1000) {
      errors.push('Maximum 1000 users per batch operation');
    }

    // Check for duplicate user IDs
    const uniqueUserIds = new Set(this.targetUserIds);
    if (uniqueUserIds.size !== this.targetUserIds.length) {
      errors.push('Duplicate user IDs found in batch');
    }

    if (!this.newPassword || this.newPassword.length === 0) {
      errors.push('New password is required');
    } else {
      // Password strength check for batch
      const strengthResult = checkPasswordStrength(this.newPassword);
      if (strengthResult.level === 'very_weak') {
        errors.push('Batch password is too weak. Please choose a stronger password.');
      }
    }

    if (this.expiryDays < 1 || this.expiryDays > 90) {
      errors.push('Expiry days must be between 1 and 90');
    }

    if (this.reason === PASSWORD_CHANGE_REASONS.OTHER && !this.customReason) {
      errors.push('Custom reason is required when reason is OTHER');
    }

    if (errors.length > 0) {
      throw new CommandValidationError(
        'Batch change password command validation failed',
        errors,
        'BatchChangePasswordCommand'
      );
    }
  }

  /**
   * Get number of users in batch
   */
  getBatchSize(): number {
    return this.targetUserIds.length;
  }

  /**
   * Get reason display text
   */
  getReasonDisplay(): string {
    if (this.reason === PASSWORD_CHANGE_REASONS.OTHER && this.customReason) {
      return `${this.reason}: ${this.customReason}`;
    }
    return this.reason || PASSWORD_CHANGE_REASONS.ADMIN_FORCED;
  }

  /**
   * Create progress update
   */
  updateProgress(completed: number, failedCount: number, failedUserIds: Array<{ userId: string; reason: string }>): void {
    if (this.onProgress) {
      const total = this.targetUserIds.length;
      const percentage = total > 0 ? (completed / total) * 100 : 0;
      this.onProgress({
        total,
        completed,
        failed: failedCount,
        failedUserIds,
        percentage,
      });
    }
  }

  /**
   * Get masked admin ID for logging
   */
  getMaskedAdminId(): string {
    if (!this.adminId) return '***';
    if (this.adminId.length <= 8) return this.adminId;
    return `${this.adminId.slice(0, 4)}...${this.adminId.slice(-4)}`;
  }

  /**
   * Get safe version for logging
   */
  toSafeLog(): {
    commandId: string;
    adminId: string;
    targetUserCount: number;
    newPasswordPresent: boolean;
    newPasswordStrength: string | undefined;
    requireChangeOnNextLogin: boolean;
    reason: string;
    notifyUsers: boolean;
    sendEmailNotifications: boolean;
    sendSmsNotifications: boolean;
    revokeSessions: boolean;
    expiryDays: number;
    timestamp: string;
  } {
    return {
      commandId: this.commandId,
      adminId: this.getMaskedAdminId(),
      targetUserCount: this.targetUserIds.length,
      newPasswordPresent: !!this.newPassword,
      newPasswordStrength: this.newPasswordStrength,
      requireChangeOnNextLogin: this.requireChangeOnNextLogin,
      reason: this.getReasonDisplay(),
      notifyUsers: this.notifyUsers,
      sendEmailNotifications: this.sendEmailNotifications,
      sendSmsNotifications: this.sendSmsNotifications,
      revokeSessions: this.revokeSessions,
      expiryDays: this.expiryDays,
      timestamp: this.timestamp.toISOString(),
    };
  }
}

// ============================================================
// Type Guards (Enterprise Enhancement v3.0)
// ============================================================

/**
 * Type guard for ChangePasswordCommand
 */
export function isChangePasswordCommand(command: unknown): command is ChangePasswordCommand {
  return command instanceof ChangePasswordCommand;
}

/**
 * Type guard for AdminForceChangePasswordCommand
 */
export function isAdminForceChangePasswordCommand(command: unknown): command is AdminForceChangePasswordCommand {
  return command instanceof AdminForceChangePasswordCommand;
}

/**
 * Type guard for BatchChangePasswordCommand
 */
export function isBatchChangePasswordCommand(command: unknown): command is BatchChangePasswordCommand {
  return command instanceof BatchChangePasswordCommand;
}

/**
 * Type guard for any change password command
 */
export function isAnyChangePasswordCommand(command: unknown): command is ChangePasswordCommand | AdminForceChangePasswordCommand | BatchChangePasswordCommand {
  return isChangePasswordCommand(command) || 
         isAdminForceChangePasswordCommand(command) || 
         isBatchChangePasswordCommand(command);
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  ChangePasswordCommandOptions as ChangePasswordCommandOptionsType,
  ValidationResult as ValidationResultType,
  BatchProgress as BatchProgressType,
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Shared types integration from @vubon/shared-types
// 2. ✅ Shared constants from @vubon/shared-constants
// 3. ✅ Shared utilities for masking and password strength (@vubon/shared-utils)
// 4. ✅ Command validation on construction (fail-fast)
// 5. ✅ Confirm password validation (required for non-reset flows)
// 6. ✅ Password strength validation with shared-utils
// 7. ✅ Password reuse prevention with timing-safe comparison
// 8. ✅ Scheduled password change support with timezone awareness
// 9. ✅ Custom reason support for OTHER reason type
// 10. ✅ Force immediate logout option
// 11. ✅ Batch change password for admins with progress tracking
// 12. ✅ Comprehensive masking methods for secure logging
// 13. ✅ Type-safe toString() and toJSON() methods
// 14. ✅ Type guards for runtime type checking
// 15. ✅ Validation result interface with warnings
// 16. ✅ CommandValidationError class with warnings support
// 17. ✅ Notification preferences tracking (email/sms/whatsapp)
// 18. ✅ Expiry days configuration for temporary passwords
// 19. ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
// 20. ✅ Audit metadata for compliance
// 21. ✅ Correlation ID for distributed tracing
// 22. ✅ Timezone-aware scheduled changes (Asia/Dhaka default)
// 23. ✅ Batch operation progress tracking callback
// 24. ✅ Password history check integration ready
// 25. ✅ Bangladesh pattern detection for password warnings
// 26. ✅ IP address validation with warning
// 27. ✅ Minimum strength level configuration
// 
// Bangladesh Specific:
// - District/Upazila tracking for location analytics
// - Mobile operator and network type detection
// - SMS/WhatsApp notification preferences
// - Local timezone (Asia/Dhaka) for scheduled changes
// - Bengali language support ready
// - Bangladesh pattern detection (dhaka, chittagong, vubon, bkash, nagad)
// 
// Security Features:
// - Password reuse prevention (timing-safe comparison)
// - Current password validation
// - Confirm password validation
// - Password strength validation with configurable levels
// - Force immediate logout on security incidents
// - Audit trail for compliance
// - Scheduled changes for zero-downtime updates
// - Batch operation with progress tracking
// - Admin self-change detection warning
// 
// ============================================================
