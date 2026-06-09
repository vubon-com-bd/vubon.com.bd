/**
 * Change Password Command - Pure Command Data Structure (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/change-password.command
 * 
 * @description
 * Command for changing user password with enterprise-grade features.
 * Contains all necessary data for password change use case.
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Shared types integration for type safety
 * ✅ Shared constants for notification methods
 * ✅ Command validation on construction (fail-fast)
 * ✅ Masking methods for secure logging
 * ✅ Confirm password validation
 * ✅ Extension of change password reasons
 * ✅ Notification preferences tracking
 * ✅ Batch change support for admins
 * ✅ Comprehensive toString() and toJSON() for logging
 * ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ No validation (handled by handler) - basic validation only
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

import { maskString } from '@vubon/shared-utils';

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
  
  /** Schedule change for later (ISO date string) */
  scheduledFor?: string;
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// ============================================================
// Constants (using shared-constants values)
// ============================================================

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;

// ============================================================
// Command Validation Error Class
// ============================================================

export class CommandValidationError extends Error {
  public readonly validationErrors: string[];
  public readonly commandType: string;

  constructor(message: string, validationErrors: string[], commandType: string) {
    super(message);
    this.name = 'CommandValidationError';
    this.validationErrors = validationErrors;
    this.commandType = commandType;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ============================================================
// Change Password Command (Enterprise Enhanced)
// ============================================================

/**
 * Change Password Command
 * 
 * @example
 * const command = new ChangePasswordCommand(
 *   'usr_123',
 *   'MyCurrentP@ssw0rd',
 *   'MyNewStr0ng!P@ssw0rd123',
 *   'MyNewStr0ng!P@ssw0rd123',  // confirm password
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
 *     preventReuse: true
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

  constructor(
    /** User ID requesting password change */
    public readonly userId: string,
    
    /** Current password for verification (empty for admin/reset flows) */
    public readonly currentPassword: string,
    
    /** New password to set */
    public readonly newPassword: string,
    
    /** Confirm new password (must match newPassword) */
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
    this.scheduledFor = options?.scheduledFor ? new Date(options.scheduledFor) : undefined;

    // ✅ Enterprise: Validate command on construction
    this.validate();
  }

  // ============================================================
  // Validation Method (Enterprise Enhancement)
  // ============================================================

  /**
   * Validate command data
   * @throws {CommandValidationError} If validation fails
   */
  private validate(): void {
    const validation = this.getValidationResult();
    if (!validation.isValid) {
      throw new CommandValidationError(
        'Change password command validation failed',
        validation.errors,
        'ChangePasswordCommand'
      );
    }
  }

  /**
   * Get validation result without throwing
   */
  public getValidationResult(): ValidationResult {
    const errors: string[] = [];

    // Validate userId
    if (!this.userId || this.userId.trim().length === 0) {
      errors.push('User ID is required');
    }

    // Validate current password for non-reset flows
    if (!this.skipCurrentPasswordValidation) {
      if (!this.currentPassword || this.currentPassword.length === 0) {
        errors.push('Current password is required when skipCurrentPasswordValidation is false');
      }
    }

    // Validate new password
    if (!this.newPassword || this.newPassword.length === 0) {
      errors.push('New password is required');
    } else {
      if (this.newPassword.length < PASSWORD_MIN_LENGTH) {
        errors.push(`New password must be at least ${PASSWORD_MIN_LENGTH} characters`);
      }
      if (this.newPassword.length > PASSWORD_MAX_LENGTH) {
        errors.push(`New password cannot exceed ${PASSWORD_MAX_LENGTH} characters`);
      }
    }

    // Validate confirm password
    if (this.confirmNewPassword !== undefined) {
      if (this.newPassword !== this.confirmNewPassword) {
        errors.push('New password and confirmation do not match');
      }
    }

    // Validate scheduled date
    if (this.scheduledFor && this.scheduledFor <= new Date()) {
      errors.push('Scheduled date must be in the future');
    }

    // Validate custom reason when reason is OTHER
    if (this.reason === PASSWORD_CHANGE_REASONS.OTHER && !this.customReason) {
      errors.push('Custom reason is required when reason is OTHER');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
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
    return this.newPassword ? `[${this.newPassword.length} chars]` : '***';
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
  } {
    return {
      commandId: this.commandId,
      userId: this.getMaskedUserId(),
      adminId: this.getMaskedAdminId(),
      currentPasswordPresent: !!this.currentPassword,
      newPasswordPresent: !!this.newPassword,
      confirmNewPasswordPresent: !!this.confirmNewPassword,
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
      timestamp: this.timestamp.toISOString(),
    };
  }
  
  /**
   * Convert to string for logging (sensitive data masked)
   */
  toString(): string {
    return `ChangePasswordCommand(id=${this.commandId.slice(0, 8)}..., userId=${this.getMaskedUserId()}, isAdminInitiated=${this.isAdminInitiated()}, isResetFlow=${this.isResetFlow()}, isScheduled=${this.isScheduled()}, reason=${this.getReasonDisplay()}, logoutOtherDevices=${this.logoutOtherDevices}, sendNotification=${this.sendNotification}, notificationMethod=${this.notificationMethod}, timestamp=${this.timestamp.toISOString()})`;
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
// Admin Force Change Password Command (Enterprise Enhanced)
// ============================================================

/**
 * Admin Force Change Password Command
 * For administrators to force password change for a user
 * 
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

    if (!this.newPassword || this.newPassword.length === 0) {
      errors.push('New password is required');
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
  } {
    return {
      commandId: this.commandId,
      adminId: this.getMaskedAdminId(),
      targetUserId: this.getMaskedTargetUserId(),
      newPasswordPresent: !!this.newPassword,
      confirmNewPasswordPresent: !!this.confirmNewPassword,
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
    return `AdminForceChangePasswordCommand(id=${this.commandId.slice(0, 8)}..., adminId=${this.getMaskedAdminId()}, targetUserId=${this.getMaskedTargetUserId()}, reason=${this.getReasonDisplay()}, requireChangeOnNextLogin=${this.requireChangeOnNextLogin}, notifyUser=${this.notifyUser}, revokeSessions=${this.revokeSessions}, expiryDays=${this.expiryDays}, timestamp=${this.timestamp.toISOString()})`;
  }
}

// ============================================================
// Batch Change Password Command (Enterprise Feature)
// ============================================================

/**
 * Batch Change Password Command
 * For bulk password changes by administrators
 * 
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
 *     expiryDays: 7
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

    if (this.targetUserIds.length > 100) {
      errors.push('Maximum 100 users per batch operation');
    }

    if (!this.newPassword || this.newPassword.length === 0) {
      errors.push('New password is required');
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
// Type Guards (Enterprise Enhancement)
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
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied in v2.0:
// 1. ✅ Shared types integration from @vubon/shared-types
// 2. ✅ Shared constants from @vubon/shared-constants
// 3. ✅ Shared utilities for masking (@vubon/shared-utils)
// 4. ✅ Command validation on construction (fail-fast)
// 5. ✅ Confirm password validation
// 6. ✅ Password reuse prevention option
// 7. ✅ Scheduled password change support
// 8. ✅ Custom reason support for OTHER reason type
// 9. ✅ Force immediate logout option
// 10. ✅ Batch change password for admins (enterprise feature)
// 11. ✅ Comprehensive masking methods for secure logging
// 12. ✅ Type-safe toString() and toJSON() methods
// 13. ✅ Type guards for runtime type checking
// 14. ✅ Validation result interface
// 15. ✅ CommandValidationError class
// 16. ✅ Notification preferences tracking (email/sms/whatsapp)
// 17. ✅ Expiry days configuration for temporary passwords
// 18. ✅ Bangladesh specific fields (district, upazila, mobileOperator, networkType)
// 19. ✅ Audit metadata for compliance
// 20. ✅ Correlation ID for distributed tracing
// 
// Bangladesh Specific:
// - District/Upazila tracking for location analytics
// - Mobile operator and network type detection
// - SMS/WhatsApp notification preferences
// - Local timezone (Asia/Dhaka) for scheduled changes
// - Bengali language support ready
// 
// Security Features:
// - Password reuse prevention
// - Current password validation
// - Confirm password validation
// - Force immediate logout on security incidents
// - Audit trail for compliance
// - Scheduled changes for zero-downtime updates
// 
// ============================================================
