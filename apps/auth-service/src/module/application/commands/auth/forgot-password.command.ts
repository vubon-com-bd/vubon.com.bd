/**
 * Forgot Password Command - Pure Command Data Structure
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/forgot-password.command
 * 
 * @description
 * Command for initiating password reset flow.
 * Contains email address and device context for rate limiting and audit.
 * Supports both email and phone-based password reset (Bangladesh specific).
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ No validation (handled by handler)
 * ✅ Framework-free
 */

import { randomUUID } from 'crypto';

// ============================================================
// Types
// ============================================================

/**
 * Reset method type
 */
export type ResetMethod = 'email' | 'sms' | 'whatsapp';

/**
 * Device info interface
 */
export interface DeviceInfo {
  ipAddress ? : string;
  userAgent ? : string;
  deviceId ? : string;
  // Bangladesh specific
  district ? : string;
  upazila ? : string;
  mobileOperator ? : 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  networkType ? : '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
}

// ============================================================
// Forgot Password Command (Email based)
// ============================================================

/**
 * Forgot Password Command
 * 
 * @example
 * const command = new ForgotPasswordCommand(
 *   'user@example.com',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456',
 *     district: 'Dhaka',
 *     mobileOperator: 'gp'
 *   },
 *   'https://vubon.com.bd/reset-password',
 *   'corr_abc123'
 * );
 */
export class ForgotPasswordCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly method: ResetMethod = 'email';
  
  constructor(
    public readonly email: string,
    public readonly deviceInfo ? : DeviceInfo,
    public readonly resetUrl ? : string,
    public readonly correlationId ? : string,
    public readonly captchaToken ? : string,
    public readonly locale ? : 'en' | 'bn'
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
  }
}

// ============================================================
// Forgot Password Phone Command (Bangladesh specific)
// ============================================================

/**
 * Forgot Password Phone Command
 * For phone-based password reset (SMS/WhatsApp)
 * 
 * @example
 * const command = new ForgotPasswordPhoneCommand(
 *   '+8801712345678',
 *   'sms',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456',
 *     mobileOperator: 'gp'
 *   },
 *   'corr_abc123',
 *   'bn'
 * );
 */
export class ForgotPasswordPhoneCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly method: ResetMethod;
  
  constructor(
    public readonly phoneNumber: string,
    method: ResetMethod = 'sms',
    public readonly deviceInfo ? : DeviceInfo,
    public readonly correlationId ? : string,
    public readonly captchaToken ? : string,
    public readonly locale ? : 'en' | 'bn'
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.method = method;
  }
}

// ============================================================
// Forgot Password Username Command (Alternative)
// ============================================================

/**
 * Forgot Password Username Command
 * For username-based password reset
 * 
 * @example
 * const command = new ForgotPasswordUsernameCommand(
 *   'john_doe',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456'
 *   },
 *   'corr_abc123'
 * );
 */
export class ForgotPasswordUsernameCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly method: ResetMethod = 'email';
  
  constructor(
    public readonly username: string,
    public readonly deviceInfo ? : DeviceInfo,
    public readonly correlationId ? : string,
    public readonly captchaToken ? : string,
    public readonly locale ? : 'en' | 'bn'
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
  }
}

// ============================================================
// Resend Reset OTP Command (Bangladesh specific)
// ============================================================

/**
 * Resend Reset OTP Command
 * For resending OTP during password reset flow
 * 
 * @example
 * const command = new ResendResetOtpCommand(
 *   '+8801712345678',
 *   'sms',
 *   'sess_abc123',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...'
 *   }
 * );
 */
export class ResendResetOtpCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  constructor(
    public readonly phoneNumber: string,
    public readonly method: 'sms' | 'whatsapp' = 'sms',
    public readonly sessionId ? : string,
    public readonly deviceInfo ? : DeviceInfo,
    public readonly correlationId ? : string,
    public readonly locale ? : 'en' | 'bn'
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
  }
}

// ============================================================
// Type Guards
// ============================================================

export function isForgotPasswordCommand(command: unknown): command is ForgotPasswordCommand {
  return command instanceof ForgotPasswordCommand;
}

export function isForgotPasswordPhoneCommand(command: unknown): command is ForgotPasswordPhoneCommand {
  return command instanceof ForgotPasswordPhoneCommand;
}

export function isForgotPasswordUsernameCommand(command: unknown): command is ForgotPasswordUsernameCommand {
  return command instanceof ForgotPasswordUsernameCommand;
}

export function isResendResetOtpCommand(command: unknown): command is ResendResetOtpCommand {
  return command instanceof ResendResetOtpCommand;
}

// ============================================================
// Type Exports
// ============================================================

export type { DeviceInfo as DeviceInfoType };
