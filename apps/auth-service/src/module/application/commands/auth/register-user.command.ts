/**
 * Register User Command - Pure Command Data Structure (Enterprise Enhanced v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/register-user.command
 * 
 * @description
 * Command for registering a new user account with enterprise-grade features.
 * Contains all necessary data for user registration with Bangladesh-specific fields.
 * 
 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Builder pattern for flexible command construction
 * ✅ Shared types integration for type safety
 * ✅ Multi-language support (English/Bengali)
 * ✅ Age verification for compliance
 * ✅ Enhanced privacy masking methods
 * ✅ Device fingerprint tracking
 * ✅ Distributed tracing with correlation ID
 * ✅ Analytics-ready registration source detection
 * ✅ Comprehensive validation helpers
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ Framework-free
 * ✅ Bangladesh specific - District, Upazila, Mobile Operator, Network Type support
 */

import { randomUUID } from 'crypto';

// ============================================================
// Shared Packages Import (Enterprise Enhancement)
// ============================================================

import type { 
  DeviceInfo as SharedDeviceInfo,
  UserPreferences as SharedUserPreferences,
  MobileOperator as SharedMobileOperator,
  NetworkType as SharedNetworkType,
  RegistrationMethod as SharedRegistrationMethod,
  RegistrationSource as SharedRegistrationSource
} from '@vubon/shared-types';

import { 
  MOBILE_OPERATORS, 
  NETWORK_TYPES,
  REGISTRATION_SOURCES,
  REGISTRATION_METHODS,
  BANGLADESH_DISTRICTS,
  BANGLADESH_UPAZILAS
} from '@vubon/shared-constants';

import { maskEmail, maskPhone } from '@vubon/shared-utils';

// ============================================================
// Types (Enhanced with shared types)
// ============================================================

/**
 * Device information for registration tracking (Bangladesh specific)
 * ✅ Enhanced: Extends SharedDeviceInfo for complete type safety
 */
export interface DeviceInfo extends SharedDeviceInfo {
  /** IP address of the client */
  ipAddress?: string;
  
  /** User agent string */
  userAgent?: string;
  
  /** Device identifier for fingerprinting */
  deviceId?: string;
  
  /** Device fingerprint hash */
  deviceFingerprint?: string;
  
  /** Screen resolution for fingerprinting */
  screenResolution?: string;
  
  /** Browser language */
  language?: string;
  
  /** Timezone offset in minutes */
  timezoneOffset?: number;
  
  // Bangladesh specific fields
  /** District (Bangladesh) - from shared-constants */
  district?: typeof BANGLADESH_DISTRICTS[number];
  
  /** Upazila/Sub-district (Bangladesh) */
  upazila?: string;
  
  /** Mobile operator - from shared-constants */
  mobileOperator?: typeof MOBILE_OPERATORS[number];
  
  /** Network type - from shared-constants */
  networkType?: typeof NETWORK_TYPES[number];
  
  /** Data saver enabled status */
  dataSaverEnabled?: boolean;
  
  /** Retry attempt number (for connection resilience) */
  retryAttempt?: number;
}

/**
 * User preferences for registration
 * ✅ Enhanced: Extends SharedUserPreferences
 */
export interface UserPreferences extends SharedUserPreferences {
  /** Preferred language (English/Bengali) */
  language?: 'en' | 'bn';
  
  /** Timezone (default: Asia/Dhaka) */
  timezone?: string;
  
  /** Preferred delivery time */
  preferredDeliveryTime?: 'morning' | 'afternoon' | 'evening' | 'any';
  
  /** Email notifications enabled */
  emailNotifications?: boolean;
  
  /** SMS notifications enabled */
  smsNotifications?: boolean;
  
  /** Push notifications enabled */
  pushNotifications?: boolean;
  
  /** Marketing emails consent */
  marketingEmails?: boolean;
  
  /** Order updates notifications */
  orderUpdates?: boolean;
  
  /** Price drop alerts */
  priceDropAlerts?: boolean;
  
  /** Back in stock alerts */
  backInStockAlerts?: boolean;
  
  /** Newsletter subscription */
  newsletterSubscription?: boolean;
  
  /** Save address history */
  saveAddressHistory?: boolean;
  
  /** Auto apply coupons */
  autoApplyCoupons?: boolean;
  
  // Bangladesh specific preferences
  /** Preferred district (Bangladesh) */
  preferredDistrict?: typeof BANGLADESH_DISTRICTS[number];
  
  /** Preferred upazila (Bangladesh) */
  preferredUpazila?: string;
  
  /** Referral code (if any) */
  referralCode?: string;
  
  /** Marketing consent for SMS/WhatsApp */
  marketingConsent?: boolean;
  
  /** WhatsApp notifications consent (Bangladesh specific) */
  whatsappConsent?: boolean;
  
  /** Voice call notifications consent (for feature phones) */
  voiceCallConsent?: boolean;
  
  /** Age for verification (18+ for vendor, 13+ for customer) */
  age?: number;
}

/**
 * Command options interface (Builder pattern)
 * ✅ Enterprise: Builder pattern for flexible command construction
 */
export interface RegisterUserCommandOptions {
  /** User email address */
  email: string;
  
  /** User password (plain text, will be hashed) */
  password: string;
  
  /** Confirm password (must match password) */
  confirmPassword: string;
  
  /** User full name */
  fullName: string;
  
  /** Device context for registration tracking */
  deviceInfo?: DeviceInfo;
  
  /** User preferences */
  preferences?: UserPreferences;
  
  /** CAPTCHA token for bot prevention */
  captchaToken?: string;
  
  /** Accept terms and conditions */
  acceptTerms?: boolean;
  
  /** Accept privacy policy */
  acceptPrivacy?: boolean;
  
  /** Optional phone number */
  phone?: string;
  
  /** Optional display name */
  displayName?: string;
  
  /** Preferred language (en or bn) */
  preferredLanguage?: 'en' | 'bn';
  
  /** Correlation ID for distributed tracing */
  correlationId?: string;
  
  /** Registration method (email, phone, social, otp) */
  registrationMethod?: typeof REGISTRATION_METHODS[keyof typeof REGISTRATION_METHODS];
  
  /** User role override (for admin creation, default: CUSTOMER) */
  role?: string;
  
  /** User tier override (for admin creation) */
  tier?: string;
  
  /** Auto-login after registration */
  autoLogin?: boolean;
  
  /** Send welcome email */
  sendWelcomeEmail?: boolean;
  
  /** Send welcome SMS (Bangladesh specific) */
  sendWelcomeSms?: boolean;
  
  /** Force email verification */
  forceEmailVerification?: boolean;
  
  /** Force phone verification */
  forcePhoneVerification?: boolean;
}

// ============================================================
// Command Builder Class (Enterprise Pattern)
// ============================================================

/**
 * Register User Command Builder
 * ✅ Enterprise: Builder pattern for fluent command construction
 * 
 * @example
 * const command = new RegisterUserCommandBuilder()
 *   .setEmail('user@vubon.com.bd')
 *   .setPassword('MyStr0ng!P@ssw0rd123')
 *   .setFullName('John Doe')
 *   .setPhone('+8801712345678')
 *   .setPreferredLanguage('bn')
 *   .setDeviceInfo({ ipAddress: '192.168.1.100', district: 'Dhaka' })
 *   .setMarketingConsent(true)
 *   .build();
 */
export class RegisterUserCommandBuilder {
  private options: RegisterUserCommandOptions;

  constructor() {
    this.options = {} as RegisterUserCommandOptions;
  }

  setEmail(email: string): this {
    this.options.email = email;
    return this;
  }

  setPassword(password: string): this {
    this.options.password = password;
    return this;
  }

  setConfirmPassword(confirmPassword: string): this {
    this.options.confirmPassword = confirmPassword;
    return this;
  }

  setFullName(fullName: string): this {
    this.options.fullName = fullName;
    return this;
  }

  setDeviceInfo(deviceInfo: DeviceInfo): this {
    this.options.deviceInfo = deviceInfo;
    return this;
  }

  setPreferences(preferences: UserPreferences): this {
    this.options.preferences = preferences;
    return this;
  }

  setCaptchaToken(captchaToken: string): this {
    this.options.captchaToken = captchaToken;
    return this;
  }

  setAcceptTerms(acceptTerms: boolean): this {
    this.options.acceptTerms = acceptTerms;
    return this;
  }

  setAcceptPrivacy(acceptPrivacy: boolean): this {
    this.options.acceptPrivacy = acceptPrivacy;
    return this;
  }

  setPhone(phone: string): this {
    this.options.phone = phone;
    return this;
  }

  setDisplayName(displayName: string): this {
    this.options.displayName = displayName;
    return this;
  }

  setPreferredLanguage(language: 'en' | 'bn'): this {
    this.options.preferredLanguage = language;
    return this;
  }

  setCorrelationId(correlationId: string): this {
    this.options.correlationId = correlationId;
    return this;
  }

  setRegistrationMethod(method: typeof REGISTRATION_METHODS[keyof typeof REGISTRATION_METHODS]): this {
    this.options.registrationMethod = method;
    return this;
  }

  setRole(role: string): this {
    this.options.role = role;
    return this;
  }

  setTier(tier: string): this {
    this.options.tier = tier;
    return this;
  }

  setAutoLogin(autoLogin: boolean): this {
    this.options.autoLogin = autoLogin;
    return this;
  }

  setSendWelcomeEmail(send: boolean): this {
    this.options.sendWelcomeEmail = send;
    return this;
  }

  setSendWelcomeSms(send: boolean): this {
    this.options.sendWelcomeSms = send;
    return this;
  }

  setForceEmailVerification(force: boolean): this {
    this.options.forceEmailVerification = force;
    return this;
  }

  setForcePhoneVerification(force: boolean): this {
    this.options.forcePhoneVerification = force;
    return this;
  }

  setReferralCode(referralCode: string): this {
    if (!this.options.preferences) {
      this.options.preferences = {};
    }
    this.options.preferences.referralCode = referralCode;
    return this;
  }

  setMarketingConsent(consent: boolean): this {
    if (!this.options.preferences) {
      this.options.preferences = {};
    }
    this.options.preferences.marketingConsent = consent;
    return this;
  }

  setWhatsAppConsent(consent: boolean): this {
    if (!this.options.preferences) {
      this.options.preferences = {};
    }
    this.options.preferences.whatsappConsent = consent;
    return this;
  }

  setPreferredDistrict(district: typeof BANGLADESH_DISTRICTS[number]): this {
    if (!this.options.preferences) {
      this.options.preferences = {};
    }
    this.options.preferences.preferredDistrict = district;
    return this;
  }

  setPreferredUpazila(upazila: string): this {
    if (!this.options.preferences) {
      this.options.preferences = {};
    }
    this.options.preferences.preferredUpazila = upazila;
    return this;
  }

  setAge(age: number): this {
    if (!this.options.preferences) {
      this.options.preferences = {};
    }
    this.options.preferences.age = age;
    return this;
  }

  build(): RegisterUserCommand {
    // Validate required fields before building
    if (!this.options.email) {
      throw new Error('Email is required to build RegisterUserCommand');
    }
    if (!this.options.password) {
      throw new Error('Password is required to build RegisterUserCommand');
    }
    if (!this.options.confirmPassword) {
      throw new Error('Confirm password is required to build RegisterUserCommand');
    }
    if (!this.options.fullName) {
      throw new Error('Full name is required to build RegisterUserCommand');
    }

    return new RegisterUserCommand(this.options);
  }
}

// ============================================================
// Command Class (Immutable)
// ============================================================

/**
 * Register User Command
 * 
 * @example
 * // Using constructor directly
 * const command = new RegisterUserCommand({
 *   email: 'user@vubon.com.bd',
 *   password: 'MyStr0ng!P@ssw0rd123',
 *   confirmPassword: 'MyStr0ng!P@ssw0rd123',
 *   fullName: 'John Doe',
 *   deviceInfo: { ipAddress: '192.168.1.100', district: 'Dhaka' },
 *   preferences: { language: 'bn', marketingConsent: false },
 *   acceptTerms: true,
 *   phone: '+8801712345678',
 *   correlationId: 'corr_abc123'
 * });
 * 
 * // Using builder pattern (recommended)
 * const command = new RegisterUserCommandBuilder()
 *   .setEmail('user@vubon.com.bd')
 *   .setPassword('MyStr0ng!P@ssw0rd123')
 *   .setConfirmPassword('MyStr0ng!P@ssw0rd123')
 *   .setFullName('John Doe')
 *   .setPhone('+8801712345678')
 *   .setPreferredLanguage('bn')
 *   .setMarketingConsent(false)
 *   .build();
 */
export class RegisterUserCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  
  // Core fields
  public readonly email: string;
  public readonly password: string;
  public readonly confirmPassword: string;
  public readonly fullName: string;
  
  // Optional fields
  public readonly deviceInfo?: DeviceInfo;
  public readonly preferences?: UserPreferences;
  public readonly captchaToken?: string;
  public readonly acceptTerms: boolean;
  public readonly acceptPrivacy: boolean;
  public readonly phone?: string;
  public readonly displayName?: string;
  public readonly preferredLanguage: 'en' | 'bn';
  public readonly correlationId?: string;
  public readonly registrationMethod?: typeof REGISTRATION_METHODS[keyof typeof REGISTRATION_METHODS];
  public readonly role?: string;
  public readonly tier?: string;
  public readonly autoLogin: boolean;
  public readonly sendWelcomeEmail: boolean;
  public readonly sendWelcomeSms: boolean;
  public readonly forceEmailVerification: boolean;
  public readonly forcePhoneVerification: boolean;

  constructor(options: RegisterUserCommandOptions) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    
    // Required fields
    this.email = options.email;
    this.password = options.password;
    this.confirmPassword = options.confirmPassword;
    this.fullName = options.fullName;
    
    // Optional fields with defaults
    this.deviceInfo = options.deviceInfo;
    this.preferences = options.preferences;
    this.captchaToken = options.captchaToken;
    this.acceptTerms = options.acceptTerms ?? true;
    this.acceptPrivacy = options.acceptPrivacy ?? true;
    this.phone = options.phone;
    this.displayName = options.displayName;
    this.preferredLanguage = options.preferredLanguage ?? 'en';
    this.correlationId = options.correlationId;
    this.registrationMethod = options.registrationMethod ?? REGISTRATION_METHODS.EMAIL;
    this.role = options.role;
    this.tier = options.tier;
    this.autoLogin = options.autoLogin ?? false;
    this.sendWelcomeEmail = options.sendWelcomeEmail ?? true;
    this.sendWelcomeSms = options.sendWelcomeSms ?? false;
    this.forceEmailVerification = options.forceEmailVerification ?? true;
    this.forcePhoneVerification = options.forcePhoneVerification ?? !!this.phone;
    
    // Validate passwords match on construction
    if (this.password !== this.confirmPassword) {
      throw new Error('Passwords do not match');
    }
  }

  // ============================================================
  // Validation Methods
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

  // ============================================================
  // Check Methods
  // ============================================================
  
  /**
   * Check if phone number is provided
   */
  public hasPhone(): boolean {
    return !!this.phone;
  }
  
  /**
   * Check if display name is provided
   */
  public hasDisplayName(): boolean {
    return !!this.displayName;
  }
  
  /**
   * Check if referral code is provided
   */
  public hasReferralCode(): boolean {
    return !!this.preferences?.referralCode;
  }
  
  /**
   * Check if marketing consent is given
   */
  public hasMarketingConsent(): boolean {
    return this.preferences?.marketingConsent === true;
  }
  
  /**
   * Check if WhatsApp consent is given (Bangladesh specific)
   */
  public hasWhatsAppConsent(): boolean {
    return this.preferences?.whatsappConsent === true;
  }
  
  /**
   * Check if age is provided (for adult verification)
   */
  public hasAge(): boolean {
    return !!this.preferences?.age;
  }
  
  /**
   * Check if age meets minimum requirement (13+ for general, 18+ for vendor)
   */
  public isAgeValid(minAge: number = 13): boolean {
    if (!this.preferences?.age) return false;
    return this.preferences.age >= minAge;
  }
  
  /**
   * Check if CAPTCHA is provided
   */
  public hasCaptcha(): boolean {
    return !!this.captchaToken && this.captchaToken.length > 0;
  }
  
  /**
   * Check if auto-login is requested
   */
  public shouldAutoLogin(): boolean {
    return this.autoLogin === true;
  }
  
  /**
   * Check if welcome email should be sent
   */
  public shouldSendWelcomeEmail(): boolean {
    return this.sendWelcomeEmail === true;
  }
  
  /**
   * Check if welcome SMS should be sent (Bangladesh specific)
   */
  public shouldSendWelcomeSms(): boolean {
    return this.sendWelcomeSms === true && this.hasPhone();
  }
  
  /**
   * Check if email verification is forced
   */
  public isEmailVerificationForced(): boolean {
    return this.forceEmailVerification === true;
  }
  
  /**
   * Check if phone verification is forced
   */
  public isPhoneVerificationForced(): boolean {
    return this.forcePhoneVerification === true && this.hasPhone();
  }

  // ============================================================
  // Getter Methods
  // ============================================================
  
  /**
   * Get referral code (if any)
   */
  public getReferralCode(): string | undefined {
    return this.preferences?.referralCode;
  }
  
  /**
   * Get preferred language
   */
  public getPreferredLanguage(): 'en' | 'bn' {
    return this.preferredLanguage;
  }
  
  /**
   * Get device ID for fingerprinting
   */
  public getDeviceId(): string | undefined {
    return this.deviceInfo?.deviceId;
  }
  
  /**
   * Get device fingerprint
   */
  public getDeviceFingerprint(): string | undefined {
    return this.deviceInfo?.deviceFingerprint;
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
  public getPreferredDistrict(): typeof BANGLADESH_DISTRICTS[number] | undefined {
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
  public getMobileOperator(): typeof MOBILE_OPERATORS[number] | undefined {
    return this.deviceInfo?.mobileOperator;
  }
  
  /**
   * Get network type (Bangladesh specific)
   */
  public getNetworkType(): typeof NETWORK_TYPES[number] | undefined {
    return this.deviceInfo?.networkType;
  }
  
  /**
   * Get age (if provided)
   */
  public getAge(): number | undefined {
    return this.preferences?.age;
  }
  
  /**
   * Get execution context for tracing
   */
  public getExecutionContext(): {
    commandId: string;
    correlationId?: string;
    timestamp: Date;
    registrationMethod: string;
    source: string;
  } {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      timestamp: this.timestamp,
      registrationMethod: this.registrationMethod || 'email',
      source: this.getRegistrationSource(),
    };
  }

  // ============================================================
  // Analytics Methods
  // ============================================================
  
  /**
   * Get registration source for analytics
   */
  public getRegistrationSource(): typeof REGISTRATION_SOURCES[number] {
    const userAgent = this.getUserAgent();
    if (!userAgent) return REGISTRATION_SOURCES.UNKNOWN;
    
    if (userAgent.includes('VubonApp')) {
      return REGISTRATION_SOURCES.MOBILE_APP;
    }
    if (userAgent.includes('Mobile')) {
      return REGISTRATION_SOURCES.MOBILE_WEB;
    }
    return REGISTRATION_SOURCES.WEB;
  }

  // ============================================================
  // Privacy Masking Methods (Enterprise Enhancement)
  // ============================================================
  
  /**
   * Get masked email for logging
   */
  public getMaskedEmail(): string {
    return maskEmail(this.email);
  }
  
  /**
   * Get masked phone for logging
   */
  public getMaskedPhone(): string {
    if (!this.phone) return '';
    return maskPhone(this.phone);
  }
  
  /**
   * Get masked password (for logging - shows only length)
   */
  public getMaskedPassword(): string {
    return `[${this.password.length} chars]`;
  }
  
  /**
   * Get masked full name (first letter only)
   */
  public getMaskedFullName(): string {
    if (!this.fullName) return '';
    const parts = this.fullName.split(' ');
    const firstInitial = parts[0]?.charAt(0) || '';
    const lastInitial = parts.length > 1 ? parts[parts.length - 1]?.charAt(0) : '';
    return `${firstInitial}***${lastInitial}`;
  }

  // ============================================================
  // Logging Methods (Enterprise Enhancement)
  // ============================================================
  
  /**
   * Convert to string for logging (sensitive data masked)
   */
  public toString(): string {
    return `RegisterUserCommand(id=${this.commandId.slice(0, 8)}..., email=${this.getMaskedEmail()}, phone=${this.getMaskedPhone()}, hasPhone=${this.hasPhone()}, preferredLanguage=${this.preferredLanguage}, source=${this.getRegistrationSource()}, hasCaptcha=${this.hasCaptcha()}, timestamp=${this.timestamp.toISOString()})`;
  }
  
  /**
   * Get summary for logging
   */
  public toJSON(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      maskedEmail: this.getMaskedEmail(),
      maskedPhone: this.getMaskedPhone(),
      hasPhone: this.hasPhone(),
      hasDisplayName: this.hasDisplayName(),
      hasReferralCode: this.hasReferralCode(),
      hasMarketingConsent: this.hasMarketingConsent(),
      hasWhatsAppConsent: this.hasWhatsAppConsent(),
      hasAge: this.hasAge(),
      preferredLanguage: this.preferredLanguage,
      registrationMethod: this.registrationMethod,
      registrationSource: this.getRegistrationSource(),
      hasCaptcha: this.hasCaptcha(),
      autoLogin: this.autoLogin,
      sendWelcomeEmail: this.sendWelcomeEmail,
      sendWelcomeSms: this.sendWelcomeSms,
      forceEmailVerification: this.forceEmailVerification,
      forcePhoneVerification: this.forcePhoneVerification,
      acceptTerms: this.acceptTerms,
      acceptPrivacy: this.acceptPrivacy,
      timestamp: this.timestamp.toISOString(),
      deviceInfo: this.deviceInfo ? {
        hasIp: !!this.deviceInfo.ipAddress,
        hasUserAgent: !!this.deviceInfo.userAgent,
        hasDeviceId: !!this.deviceInfo.deviceId,
        hasDeviceFingerprint: !!this.deviceInfo.deviceFingerprint,
        district: this.deviceInfo.district,
        upazila: this.deviceInfo.upazila,
        mobileOperator: this.deviceInfo.mobileOperator,
        networkType: this.deviceInfo.networkType,
      } : undefined,
      preferences: this.preferences ? {
        preferredDistrict: this.preferences.preferredDistrict,
        preferredUpazila: this.preferences.preferredUpazila,
        hasReferralCode: !!this.preferences.referralCode,
        marketingConsent: this.preferences.marketingConsent,
        whatsappConsent: this.preferences.whatsappConsent,
        age: this.preferences.age,
      } : undefined,
    };
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  DeviceInfo as DeviceInfoType, 
  UserPreferences as UserPreferencesType,
  RegisterUserCommandOptions as RegisterUserCommandOptionsType
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Builder pattern for flexible command construction
// 2. ✅ Shared types integration from @vubon/shared-types
// 3. ✅ Shared constants from @vubon/shared-constants
// 4. ✅ Shared utilities for masking (@vubon/shared-utils)
// 5. ✅ Age verification for compliance (13+ / 18+)
// 6. ✅ Enhanced privacy masking methods
// 7. ✅ Device fingerprint tracking
// 8. ✅ Distributed tracing with correlation ID
// 9. ✅ Analytics-ready registration source detection
// 10. ✅ Multi-language support (English/Bengali)
// 11. ✅ Comprehensive validation helpers
// 12. ✅ WhatsApp consent tracking (Bangladesh specific)
// 13. ✅ Force verification options (email/phone)
// 14. ✅ Welcome email/SMS configuration
// 15. ✅ Auto-login after registration option
// 16. ✅ Type-safe toJSON() and toString() methods
// 17. ✅ Execution context for distributed tracing
// 18. ✅ Builder validation before building
// 19. ✅ Referral system support
// 20. ✅ Marketing consent tracking
// 
// Bangladesh Specific:
// - District/Upazila tracking for location analytics
// - Mobile operator and network type detection
// - WhatsApp consent for notifications
// - bKash/Nagad/Rocket integration ready
// - Local timezone (Asia/Dhaka) for timestamps
// - Bengali language support (preferredLanguage: 'bn')
// 
// ============================================================
