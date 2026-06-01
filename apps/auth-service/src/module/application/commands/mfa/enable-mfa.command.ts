/**
 * Enable MFA Command - Pure Command Data Structure
 * 
 * @module application/commands/mfa/enable-mfa.command
 * 
 * @description
 * Command for enabling Multi-Factor Authentication for a user.
 * Note: userId is NOT accepted from client - comes from JWT.
 * Supports TOTP, SMS, and EMAIL MFA types.
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ Security: userId from JWT
 * ✅ Framework-free
 */

import { randomUUID } from 'crypto';

/**
 * MFA Type Enum
 */
export enum MfaType {
  TOTP = 'TOTP', // Time-based One-Time Password (Google Authenticator)
    SMS = 'SMS', // SMS OTP
    EMAIL = 'EMAIL', // Email OTP
    WEBAUTHN = 'WEBAUTHN', // Biometric/Passkey
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
 * Enable MFA Command
 * 
 * @example
 * // Enable TOTP MFA (Google Authenticator)
 * const command = new EnableMfaCommand(
 *   MfaType.TOTP,
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456'
 *   },
 *   'My Phone',
 *   'corr_abc123'
 * );
 * 
 * @example
 * // Enable SMS MFA
 * const command = new EnableMfaCommand(
 *   MfaType.SMS,
 *   deviceInfo,
 *   undefined,
 *   'corr_abc123',
 *   '+8801712345678'
 * );
 * 
 * @example
 * // Enable Email MFA
 * const command = new EnableMfaCommand(
 *   MfaType.EMAIL,
 *   deviceInfo,
 *   undefined,
 *   'corr_abc123'
 * );
 */
export class EnableMfaCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** Type of MFA to enable */
    public readonly type: MfaType,
    /** Device context for security audit */
    public readonly deviceInfo ? : DeviceInfo,
    /** Device name for TOTP (user-friendly identifier) */
    public readonly deviceName ? : string,
    /** Correlation ID for distributed tracing */
    public readonly correlationId ? : string,
    /** Phone number for SMS MFA (required if type is SMS) */
    public readonly phoneNumber ? : string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
  }
  
  /**
   * Check if this is TOTP MFA
   */
  public isTotp(): boolean {
    return this.type === MfaType.TOTP;
  }
  
  /**
   * Check if this is SMS MFA
   */
  public isSms(): boolean {
    return this.type === MfaType.SMS;
  }
  
  /**
   * Check if this is Email MFA
   */
  public isEmail(): boolean {
    return this.type === MfaType.EMAIL;
  }
  
  /**
   * Check if this is WebAuthn MFA
   */
  public isWebAuthn(): boolean {
    return this.type === MfaType.WEBAUTHN;
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
   * Validate SMS MFA has phone number
   */
  public validateSmsPhone(): boolean {
    if (this.isSms() && !this.phoneNumber) {
      return false;
    }
    return true;
  }
  
  /**
   * Get masked phone number for logging
   */
  public getMaskedPhone(): string | undefined {
    if (!this.phoneNumber) return undefined;
    const phone = this.phoneNumber;
    if (phone.length <= 6) return '***';
    return phone.substring(0, phone.length - 4) + '****';
  }
}
