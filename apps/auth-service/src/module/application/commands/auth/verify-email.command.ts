/**
 * Verify Email Command - Pure Command Data Structure
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/verify-email.command
 * 
 * @description
 * Command for verifying a user's email address using a verification token.
 * Contains token and device context for security audit.
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ No validation (handled by handler)
 * ✅ Framework-free
 * ✅ Bangladesh specific - Mobile operator and district tracking
 */

import { randomUUID } from 'crypto';

/**
 * Device information for email verification audit (Bangladesh specific)
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

/**
 * Verify Email Command Result
 */
export interface VerifyEmailCommandResult {
  success: boolean;
  userId ? : string;
  email ? : string;
  wasAlreadyVerified ? : boolean;
  message ? : string;
  messageBn ? : string;
  verifiedAt ? : Date;
}

/**
 * Verify Email Command
 * 
 * @example
 * const command = new VerifyEmailCommand(
 *   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456',
 *     district: 'Dhaka',
 *     mobileOperator: 'gp'
 *   },
 *   'corr_abc123'
 * );
 */
export class VerifyEmailCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** Email verification token from email link */
    public readonly token: string,
    /** Device context for security audit */
    public readonly deviceInfo ? : DeviceInfo,
    /** Correlation ID for distributed tracing */
    public readonly correlationId ? : string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    
    // Validate token is not empty
    if (!token || token.trim().length === 0) {
      throw new Error('Verification token cannot be empty');
    }
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
   * Get upazila for location tracking (Bangladesh specific)
   */
  public getUpazila(): string | undefined {
    return this.deviceInfo?.upazila;
  }
  
  /**
   * Get mobile operator for network tracking (Bangladesh specific)
   */
  public getMobileOperator(): string | undefined {
    return this.deviceInfo?.mobileOperator;
  }
  
  /**
   * Get network type for connectivity tracking
   */
  public getNetworkType(): string | undefined {
    return this.deviceInfo?.networkType;
  }
  
  /**
   * Create a result object for successful verification
   */
  public static success(
    userId: string,
    email: string,
    verifiedAt: Date = new Date(),
    wasAlreadyVerified: boolean = false,
    message ? : string,
    messageBn ? : string
  ): VerifyEmailCommandResult {
    return {
      success: true,
      userId,
      email,
      wasAlreadyVerified,
      message: message || (wasAlreadyVerified ?
        'Email was already verified' :
        'Email verified successfully'),
      messageBn,
      verifiedAt,
    };
  }
  
  /**
   * Create a result object for failed verification
   */
  public static failure(
    message: string,
    messageBn ? : string
  ): VerifyEmailCommandResult {
    return {
      success: false,
      message,
      messageBn,
    };
  }
  
  /**
   * Create a result for expired token
   */
  public static expired(
    message ? : string,
    messageBn ? : string
  ): VerifyEmailCommandResult {
    return {
      success: false,
      message: message || 'Verification token has expired. Please request a new verification email.',
      messageBn: messageBn || 'ভেরিফিকেশন টোকেনের মেয়াদ শেষ হয়ে গেছে। অনুগ্রহ করে একটি নতুন ভেরিফিকেশন ইমেইল রিকোয়েস্ট করুন।',
    };
  }
  
  /**
   * Create a result for already verified
   */
  public static alreadyVerified(
    userId: string,
    email: string,
    message ? : string,
    messageBn ? : string
  ): VerifyEmailCommandResult {
    return {
      success: true,
      userId,
      email,
      wasAlreadyVerified: true,
      message: message || 'Email was already verified',
      messageBn: messageBn || 'ইমেইল ইতিমধ্যে ভেরিফাই করা হয়েছে',
      verifiedAt: new Date(),
    };
  }
  
  /**
   * Create a result for invalid token
   */
  public static invalidToken(
    message ? : string,
    messageBn ? : string
  ): VerifyEmailCommandResult {
    return {
      success: false,
      message: message || 'Invalid verification token.',
      messageBn: messageBn || 'অবৈধ ভেরিফিকেশন টোকেন।',
    };
  }
  
  /**
   * Create a result for user not found
   */
  public static userNotFound(
    message ? : string,
    messageBn ? : string
  ): VerifyEmailCommandResult {
    return {
      success: false,
      message: message || 'User associated with this token not found.',
      messageBn: messageBn || 'এই টোকেনের সাথে সম্পর্কিত ব্যবহারকারী পাওয়া যায়নি।',
    };
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { DeviceInfo as DeviceInfoType, VerifyEmailCommandResult as VerifyEmailCommandResultType };
