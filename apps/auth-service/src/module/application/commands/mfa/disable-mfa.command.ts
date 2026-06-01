/**
 * Disable MFA Command - Pure Command Data Structure
 * 
 * @module application/commands/mfa/disable-mfa.command
 * 
 * @description
 * Command for disabling Multi-Factor Authentication for a user.
 * Note: userId is NOT accepted from client - comes from JWT.
 * Requires verification (MFA code or password) for security.
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ Security: userId from JWT, verification required
 * ✅ Framework-free
 */

import { randomUUID } from 'crypto';

/**
 * Verification type for disabling MFA
 */
export enum DisableMfaVerificationType {
  MFA_CODE = 'MFA_CODE',
    PASSWORD = 'PASSWORD',
    BACKUP_CODE = 'BACKUP_CODE',
    ADMIN_OVERRIDE = 'ADMIN_OVERRIDE',
}

/**
 * Device information for security audit
 */
export interface DeviceInfo {
  ipAddress ? : string;
  userAgent ? : string;
  deviceId ? : string;
}

/**
 * Disable MFA Command
 * 
 * @example
 * // User disables MFA with MFA code
 * const command = new DisableMfaCommand(
 *   DisableMfaVerificationType.MFA_CODE,
 *   '123456',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456'
 *   },
 *   'Lost my phone',
 *   'corr_abc123'
 * );
 * 
 * @example
 * // User disables MFA with password
 * const command = new DisableMfaCommand(
 *   DisableMfaVerificationType.PASSWORD,
 *   'MyP@ssw0rd',
 *   deviceInfo,
 *   'Security precaution',
 *   'corr_abc123'
 * );
 * 
 * @example
 * // Admin disables MFA for a user (with special permission)
 * const command = new DisableMfaCommand(
 *   DisableMfaVerificationType.ADMIN_OVERRIDE,
 *   undefined,
 *   deviceInfo,
 *   'User lost access to authenticator',
 *   'corr_abc123',
 *   'target_user_123',
 *   'admin_456'
 * );
 */
export class DisableMfaCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** Type of verification being used */
    public readonly verificationType: DisableMfaVerificationType,
    /** Verification code (MFA code, password, or backup code) */
    public readonly verificationCode ? : string,
    /** Device context for security audit */
    public readonly deviceInfo ? : DeviceInfo,
    /** Reason for disabling MFA (for audit) */
    public readonly reason ? : string,
    /** Correlation ID for distributed tracing */
    public readonly correlationId ? : string,
    /** Target user ID (only for admin override) */
    public readonly targetUserId ? : string,
    /** Admin ID (only for admin override) */
    public readonly adminId ? : string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
  }
  
  /**
   * Check if this is an admin override operation
   */
  public isAdminOverride(): boolean {
    return this.verificationType === DisableMfaVerificationType.ADMIN_OVERRIDE;
  }
  
  /**
   * Get the effective user ID (target for admin, or from context)
   */
  public getEffectiveUserId(contextUserId: string): string {
    if (this.isAdminOverride() && this.targetUserId) {
      return this.targetUserId;
    }
    return contextUserId;
  }
  
  /**
   * Get IP address for audit
   */
  public getIpAddress(): string | undefined {
    return this.deviceInfo?.ipAddress;
  }
  
  /**
   * Get user agent for device fingerprinting
   */
  public getUserAgent(): string | undefined {
    return this.deviceInfo?.userAgent;
  }
  
  /**
   * Get device ID for tracking
   */
  public getDeviceId(): string | undefined {
    return this.deviceInfo?.deviceId;
  }
  
  /**
   * Check if verification code is provided
   */
  public hasVerificationCode(): boolean {
    return !!this.verificationCode;
  }
  
  /**
   * Get reason for disabling (or default)
   */
  public getReason(): string {
    return this.reason || (this.isAdminOverride() ? 'Admin override' : 'User requested');
  }
}
