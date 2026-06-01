/**
 * Verify MFA Command - Pure Command Data Structure
 * 
 * @module application/commands/mfa/verify-mfa.command
 * 
 * @description
 * Command for verifying Multi-Factor Authentication code during login.
 * Note: userId is NOT accepted from client - comes from MFA session.
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ Security: userId from MFA session, not from client
 * ✅ Framework-free
 */

import { randomUUID } from 'crypto';

/**
 * Device information for security audit
 */
export interface DeviceInfo {
  ipAddress ? : string;
  userAgent ? : string;
  deviceId ? : string;
}

/**
 * Verify MFA Command
 * 
 * @example
 * // Verify with TOTP code
 * const command = new VerifyMfaCommand(
 *   'mfa_sess_550e8400-e29b-41d4-a716-446655440000',
 *   { code: '123456' },
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456'
 *   },
 *   true,
 *   'corr_abc123'
 * );
 * 
 * @example
 * // Verify with backup code
 * const command = new VerifyMfaCommand(
 *   'mfa_sess_550e8400-e29b-41d4-a716-446655440000',
 *   { backupCode: 'AB3F-9K2M' },
 *   deviceInfo,
 *   false,
 *   'corr_abc123'
 * );
 */
export class VerifyMfaCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** MFA session ID from login response */
    public readonly mfaSessionId: string,
    /** Verification data (either code or backupCode) */
    public readonly verification: {
      code ? : string;
      backupCode ? : string;
    },
    /** Device context for security audit */
    public readonly deviceInfo ? : DeviceInfo,
    /** Trust this device for future logins (skip MFA) */
    public readonly trustDevice ? : boolean,
    /** Correlation ID for distributed tracing */
    public readonly correlationId ? : string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.trustDevice = trustDevice ?? false;
  }
  
  /**
   * Get the verification code (if provided)
   */
  public getCode(): string | undefined {
    return this.verification.code;
  }
  
  /**
   * Get the backup code (if provided)
   */
  public getBackupCode(): string | undefined {
    return this.verification.backupCode;
  }
  
  /**
   * Check if verification code is provided
   */
  public hasCode(): boolean {
    return !!this.verification.code;
  }
  
  /**
   * Check if backup code is provided
   */
  public hasBackupCode(): boolean {
    return !!this.verification.backupCode;
  }
  
  /**
   * Validate that either code or backupCode is provided (not both)
   */
  public isValid(): boolean {
    const hasCode = this.hasCode();
    const hasBackup = this.hasBackupCode();
    
    // XOR - exactly one should be provided
    return (hasCode || hasBackup) && !(hasCode && hasBackup);
  }
  
  /**
   * Get error message for invalid verification
   */
  public getValidationError(): string {
    if (!this.hasCode() && !this.hasBackupCode()) {
      return 'Either verification code or backup code is required';
    }
    if (this.hasCode() && this.hasBackupCode()) {
      return 'Cannot provide both verification code and backup code';
    }
    return '';
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
   * Check if device should be trusted
   */
  public shouldTrustDevice(): boolean {
    return this.trustDevice === true && !!this.deviceInfo?.deviceId;
  }
}
