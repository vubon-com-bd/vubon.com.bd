/**
 * Change Password Command - Pure Command Data Structure
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/change-password.command
 * 
 * @description
 * Command for changing user password.
 * Contains all necessary data for password change use case.
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ No validation (handled by handler)
 * ✅ Framework-free
 * ✅ Audit trail ready
 */

import { randomUUID } from 'crypto';

// ============================================================
// Device Info Interface (Bangladesh specific)
// ============================================================

export interface ChangePasswordDeviceInfo {
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  sessionId?: string;
  // Bangladesh specific
  district?: string;
  upazila?: string;
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
}

// ============================================================
// Command Options
// ============================================================

export interface ChangePasswordCommandOptions {
  /** Whether to logout from other devices after password change */
  logoutOtherDevices?: boolean;
  
  /** Skip current password validation (for admin/reset flows) */
  skipCurrentPasswordValidation?: boolean;
  
  /** Reason for password change (for audit) */
  reason?: string;
  
  /** Admin ID (if changed by admin) */
  adminId?: string;
  
  /** Whether to send notification email/SMS */
  sendNotification?: boolean;
  
  /** Notification method preference */
  notificationMethod?: 'email' | 'sms' | 'both';
}

// ============================================================
// Change Password Command
// ============================================================

/**
 * Change Password Command
 * 
 * @example
 * const command = new ChangePasswordCommand(
 *   'usr_123',
 *   'MyCurrentP@ssw0rd',
 *   'MyNewStr0ng!P@ssw0rd123',
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
 *     reason: 'User initiated'
 *   }
 * );
 */
export class ChangePasswordCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly logoutOtherDevices: boolean;
  public readonly skipCurrentPasswordValidation: boolean;
  public readonly reason?: string;
  public readonly adminId?: string;
  public readonly sendNotification: boolean;
  public readonly notificationMethod: 'email' | 'sms' | 'both';

  constructor(
    /** User ID requesting password change */
    public readonly userId: string,
    
    /** Current password for verification (empty for admin/reset flows) */
    public readonly currentPassword: string,
    
    /** New password to set */
    public readonly newPassword: string,
    
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
    this.adminId = options?.adminId;
    this.sendNotification = options?.sendNotification ?? true;
    this.notificationMethod = options?.notificationMethod ?? 'email';
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
   * Get user identifier for logging
   */
  getUserIdentifier(): string {
    return this.userId;
  }
  
  /**
   * Get audit metadata
   */
  getAuditMetadata(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      userId: this.userId,
      adminId: this.adminId,
      reason: this.reason,
      logoutOtherDevices: this.logoutOtherDevices,
      skipCurrentPasswordValidation: this.skipCurrentPasswordValidation,
      sendNotification: this.sendNotification,
      notificationMethod: this.notificationMethod,
      deviceInfo: this.deviceInfo,
      correlationId: this.correlationId,
      timestamp: this.timestamp,
    };
  }
  
  /**
   * Get a safe version of the command for logging (without sensitive data)
   */
  toSafeLog(): Omit<ChangePasswordCommand, 'currentPassword' | 'newPassword'> & {
    currentPasswordPresent: boolean;
    newPasswordPresent: boolean;
  } {
    return {
      commandId: this.commandId,
      userId: this.userId,
      currentPasswordPresent: !!this.currentPassword,
      newPasswordPresent: !!this.newPassword,
      deviceInfo: this.deviceInfo,
      correlationId: this.correlationId,
      logoutOtherDevices: this.logoutOtherDevices,
      skipCurrentPasswordValidation: this.skipCurrentPasswordValidation,
      reason: this.reason,
      adminId: this.adminId,
      sendNotification: this.sendNotification,
      notificationMethod: this.notificationMethod,
      timestamp: this.timestamp,
    };
  }
}

// ============================================================
// Admin Force Change Password Command
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
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...'
 *   },
 *   'corr_abc123',
 *   {
 *     requireChangeOnNextLogin: true,
 *     reason: 'Security incident - password compromised',
 *     notifyUser: true,
 *     revokeSessions: true
 *   }
 * );
 */
export class AdminForceChangePasswordCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly requireChangeOnNextLogin: boolean;
  public readonly reason?: string;
  public readonly notifyUser: boolean;
  public readonly revokeSessions: boolean;

  constructor(
    /** Admin ID performing the action */
    public readonly adminId: string,
    
    /** Target user ID */
    public readonly targetUserId: string,
    
    /** New temporary password */
    public readonly newPassword: string,
    
    /** Device information for audit */
    public readonly deviceInfo?: ChangePasswordDeviceInfo,
    
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string,
    
    /** Additional command options */
    options?: {
      requireChangeOnNextLogin?: boolean;
      reason?: string;
      notifyUser?: boolean;
      revokeSessions?: boolean;
    }
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.requireChangeOnNextLogin = options?.requireChangeOnNextLogin ?? true;
    this.reason = options?.reason;
    this.notifyUser = options?.notifyUser ?? true;
    this.revokeSessions = options?.revokeSessions ?? true;
  }

  /**
   * Get audit metadata
   */
  getAuditMetadata(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      adminId: this.adminId,
      targetUserId: this.targetUserId,
      reason: this.reason,
      requireChangeOnNextLogin: this.requireChangeOnNextLogin,
      notifyUser: this.notifyUser,
      revokeSessions: this.revokeSessions,
      deviceInfo: this.deviceInfo,
      correlationId: this.correlationId,
      timestamp: this.timestamp,
    };
  }
  
  /**
   * Get a safe version of the command for logging
   */
  toSafeLog(): Omit<AdminForceChangePasswordCommand, 'newPassword'> & {
    newPasswordPresent: boolean;
  } {
    return {
      commandId: this.commandId,
      adminId: this.adminId,
      targetUserId: this.targetUserId,
      newPasswordPresent: !!this.newPassword,
      deviceInfo: this.deviceInfo,
      correlationId: this.correlationId,
      requireChangeOnNextLogin: this.requireChangeOnNextLogin,
      reason: this.reason,
      notifyUser: this.notifyUser,
      revokeSessions: this.revokeSessions,
      timestamp: this.timestamp,
    };
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { ChangePasswordCommandOptions as ChangePasswordCommandOptionsType };
