/**
 * Reset Password Command - Pure Command Data Structure
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/reset-password.command
 * 
 * @description
 * Command for resetting a forgotten password using a valid reset token.
 * Contains token and new password with device context for security audit.
 * Supports both email token and phone OTP methods.
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ No validation (handled by handler)
 * ✅ Framework-free
 * ✅ Bangladesh specific - Phone OTP support
 */

import { randomUUID } from 'crypto';

// ============================================================
// Types
// ============================================================

/**
 * Device information for reset password audit (Bangladesh specific)
 */
export interface DeviceInfo {
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  // Bangladesh specific fields
  district?: string;
  upazila?: string;
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
}

/**
 * Reset method type
 */
export type ResetMethod = 'token' | 'otp';

// ============================================================
// Reset Password Command
// ============================================================

/**
 * Reset Password Command (Token-based)
 * 
 * @example
 * const command = new ResetPasswordCommand(
 *   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   'MyNewStr0ng!P@ssw0rd123',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456'
 *   },
 *   'corr_abc123'
 * );
 */
export class ResetPasswordCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly method: ResetMethod = 'token';
  
  constructor(
    /** Password reset token from email */
    public readonly token: string,
    /** New password (plain text, will be hashed) */
    public readonly newPassword: string,
    /** Confirm password (must match newPassword) */
    public readonly confirmPassword: string,
    /** Device context for security audit */
    public readonly deviceInfo?: DeviceInfo,
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
  }
  
  /**
   * Validate that passwords match (basic check)
   * Full validation handled by handler
   */
  public doPasswordsMatch(): boolean {
    return this.newPassword === this.confirmPassword;
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
   * Get district for location tracking (Bangladesh specific)
   */
  public getDistrict(): string | undefined {
    return this.deviceInfo?.district;
  }
  
  /**
   * Get mobile operator for network tracking (Bangladesh specific)
   */
  public getMobileOperator(): string | undefined {
    return this.deviceInfo?.mobileOperator;
  }
}

// ============================================================
// Reset Password with OTP Command (Bangladesh specific)
// ============================================================

/**
 * Reset Password with OTP Command (Phone-based)
 * 
 * @example
 * const command = new ResetPasswordWithOtpCommand(
 *   '+8801712345678',
 *   '123456',
 *   'MyNewStr0ng!P@ssw0rd123',
 *   'MyNewStr0ng!P@ssw0rd123',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456'
 *   },
 *   'sess_abc123',
 *   'corr_abc123'
 * );
 */
export class ResetPasswordWithOtpCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly method: ResetMethod = 'otp';
  
  constructor(
    /** Phone number (E.164 format) */
    public readonly phoneNumber: string,
    /** OTP code received via SMS/WhatsApp */
    public readonly otpCode: string,
    /** New password (plain text, will be hashed) */
    public readonly newPassword: string,
    /** Confirm password (must match newPassword) */
    public readonly confirmPassword: string,
    /** Device context for security audit */
    public readonly deviceInfo?: DeviceInfo,
    /** Session ID from OTP request */
    public readonly sessionId?: string,
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
  }
  
  /**
   * Validate that passwords match (basic check)
   */
  public doPasswordsMatch(): boolean {
    return this.newPassword === this.confirmPassword;
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
}

// ============================================================
// Validate Reset Token Command
// ============================================================

/**
 * Validate Reset Token Command
 * 
 * @example
 * const command = new ValidateResetTokenCommand(
 *   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   'corr_abc123'
 * );
 */
export class ValidateResetTokenCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** Password reset token to validate */
    public readonly token: string,
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
  }
}

// ============================================================
// Verify Reset OTP Command (Bangladesh specific)
// ============================================================

/**
 * Verify Reset OTP Command
 * 
 * @example
 * const command = new VerifyResetOtpCommand(
 *   '+8801712345678',
 *   '123456',
 *   'sess_abc123',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...'
 *   },
 *   'corr_abc123'
 * );
 */
export class VerifyResetOtpCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** Phone number (E.164 format) */
    public readonly phoneNumber: string,
    /** OTP code to verify */
    public readonly otpCode: string,
    /** Session ID from OTP request */
    public readonly sessionId?: string,
    /** Device context for security audit */
    public readonly deviceInfo?: DeviceInfo,
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
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
}

// ============================================================
// Resend Reset OTP Command (Bangladesh specific)
// ============================================================

/**
 * Resend Reset OTP Command
 * 
 * @example
 * const command = new ResendResetOtpCommand(
 *   '+8801712345678',
 *   'sms',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...'
 *   },
 *   'corr_abc123'
 * );
 */
export class ResendResetOtpCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** Phone number (E.164 format) */
    public readonly phoneNumber: string,
    /** Method to resend OTP ('sms' or 'whatsapp') */
    public readonly method: 'sms' | 'whatsapp',
    /** Device context for security audit */
    public readonly deviceInfo?: DeviceInfo,
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
  }
  
  /**
   * Get IP address for audit
   */
  public getIpAddress(): string | undefined {
    return this.deviceInfo?.ipAddress;
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { ResetMethod as ResetMethodType };
