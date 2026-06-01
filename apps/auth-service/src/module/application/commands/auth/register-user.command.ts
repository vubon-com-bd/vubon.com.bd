/**
 * Register User Command - Pure Command Data Structure
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/register-user.command
 * 
 * @description
 * Command for registering a new user account.
 * Contains all necessary data for user registration.
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ No validation (handled by handler)
 * ✅ Framework-free
 * ✅ Bangladesh specific - Phone number support, preferred language
 */

import { randomUUID } from 'crypto';

// ============================================================
// Types
// ============================================================

/**
 * Device information for registration tracking (Bangladesh specific)
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
 * User preferences
 */
export interface UserPreferences {
  language ? : 'en' | 'bn';
  timezone ? : string;
  preferredDeliveryTime ? : 'morning' | 'afternoon' | 'evening' | 'any';
  emailNotifications ? : boolean;
  smsNotifications ? : boolean;
  marketingEmails ? : boolean;
}

// ============================================================
// Command
// ============================================================

/**
 * Register User Command
 * 
 * @example
 * const command = new RegisterUserCommand(
 *   'user@vubon.com.bd',
 *   'MyStr0ng!P@ssw0rd123',
 *   'John Doe',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456'
 *   },
 *   {
 *     language: 'bn',
 *     preferredDistrict: 'Dhaka',
 *     marketingConsent: false
 *   },
 *   'captcha_token_123',
 *   true,
 *   '+8801712345678',
 *   'corr_abc123'
 * );
 */
export class RegisterUserCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  constructor(
    /** User email address */
    public readonly email: string,
    /** User password (plain text, will be hashed) */
    public readonly password: string,
    /** Confirm password (must match password) */
    public readonly confirmPassword: string,
    /** User full name */
    public readonly fullName: string,
    /** Device context for registration tracking */
    public readonly deviceInfo ? : DeviceInfo,
    /** User preferences */
    public readonly preferences ? : UserPreferences & {
      preferredDistrict ? : string;
      preferredUpazila ? : string;
      marketingConsent ? : boolean;
      referralCode ? : string;
    },
    /** CAPTCHA token for bot prevention */
    public readonly captchaToken ? : string,
    /** Accept terms and conditions */
    public readonly acceptTerms ? : boolean,
    /** Accept privacy policy */
    public readonly acceptPrivacy ? : boolean,
    /** Optional phone number */
    public readonly phone ? : string,
    /** Optional display name */
    public readonly displayName ? : string,
    /** Preferred language (en or bn) */
    public readonly preferredLanguage ? : 'en' | 'bn',
    /** Correlation ID for distributed tracing */
    public readonly correlationId ? : string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
  }
  
  // ============================================================
  // Helper Methods
  // ============================================================
  
  /**
   * Check if terms are accepted
   */
  public hasAcceptedTerms(): boolean {
    return this.acceptTerms === true;
  }
  
  /**
   * Check if privacy policy is accepted
   */
  public hasAcceptedPrivacy(): boolean {
    return this.acceptPrivacy === true;
  }
  
  /**
   * Check if passwords match
   */
  public doPasswordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
  
  /**
   * Check if phone number is provided
   */
  public hasPhone(): boolean {
    return !!this.phone;
  }
  
  /**
   * Check if referral code is provided
   */
  public hasReferralCode(): boolean {
    return !!this.preferences?.referralCode;
  }
  
  /**
   * Get referral code (if any)
   */
  public getReferralCode(): string | undefined {
    return this.preferences?.referralCode;
  }
  
  /**
   * Check if marketing consent is given
   */
  public hasMarketingConsent(): boolean {
    return this.preferences?.marketingConsent === true;
  }
  
  /**
   * Get preferred language
   */
  public getPreferredLanguage(): 'en' | 'bn' {
    return this.preferredLanguage || 'en';
  }
  
  /**
   * Get device ID for fingerprinting
   */
  public getDeviceId(): string | undefined {
    return this.deviceInfo?.deviceId;
  }
  
  /**
   * Get IP address for registration audit
   */
  public getIpAddress(): string | undefined {
    return this.deviceInfo?.ipAddress;
  }
  
  /**
   * Get user agent for browser/device detection
   */
  public getUserAgent(): string | undefined {
    return this.deviceInfo?.userAgent;
  }
  
  /**
   * Get preferred district (Bangladesh specific)
   */
  public getPreferredDistrict(): string | undefined {
    return this.preferences?.preferredDistrict;
  }
  
  /**
   * Get preferred upazila (Bangladesh specific)
   */
  public getPreferredUpazila(): string | undefined {
    return this.preferences?.preferredUpazila;
  }
  
  /**
   * Get mobile operator (Bangladesh specific)
   */
  public getMobileOperator(): string | undefined {
    return this.deviceInfo?.mobileOperator;
  }
  
  /**
   * Get network type (Bangladesh specific)
   */
  public getNetworkType(): string | undefined {
    return this.deviceInfo?.networkType;
  }
  
  /**
   * Get registration source for analytics
   */
  public getRegistrationSource(): 'web' | 'mobile_web' | 'mobile_app' | 'unknown' {
    const userAgent = this.getUserAgent();
    if (!userAgent) return 'unknown';
    
    if (userAgent.includes('Mobile')) {
      return 'mobile_web';
    }
    if (userAgent.includes('VubonApp')) {
      return 'mobile_app';
    }
    return 'web';
  }
  
  /**
   * Validate command data (basic checks)
   * Full validation handled by handler with domain VOs
   */
  public isValid(): boolean {
    return !!(
      this.email &&
      this.password &&
      this.confirmPassword &&
      this.doPasswordsMatch() &&
      this.fullName &&
      this.hasAcceptedTerms()
    );
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { DeviceInfo as DeviceInfoType, UserPreferences as UserPreferencesType };
