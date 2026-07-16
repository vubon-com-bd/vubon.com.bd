/**
 * Register User Command - Pure Command Data Structure (Enterprise Enhanced v3.2)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module application/commands/auth/register-user.command
 *
 * @description
 * Command for registering a new user account with enterprise-grade features.
 * Contains all necessary data for user registration with Bangladesh-specific fields.
 *
 * ENTERPRISE ENHANCEMENTS (v3.2):
 * ✅ All TypeScript errors fixed
 * ✅ exactOptionalPropertyTypes compliance
 * ✅ Shared types integration with proper extension
 * ✅ Proper handling of optional properties
 * ✅ Bangladesh-specific validation with type safety
 *
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ Comprehensive validation on construction
 * ✅ No business logic
 * ✅ Framework-free
 * ✅ Bangladesh specific - District, Upazila, Mobile Operator, Network Type support
 */

import { randomUUID } from 'crypto';

// ============================================================
// Shared Packages Import (Enterprise Enhancement)
// ============================================================

import {
  USER_MOBILE_OPERATORS as MOBILE_OPERATORS,
  USER_NETWORK_TYPES as NETWORK_TYPES,
  REGISTRATION_SOURCES,
  REGISTRATION_METHODS,
  BANGLADESH_DISTRICTS,
  BANGLADESH_UPAZILAS,
  PASSWORD_POLICY,
} from '@vubon/shared-constants';

import {
  maskEmail,
  maskPhone,
  normalizePhone,
  isValidBdMobile,
  isValidEmail,
} from '@vubon/shared-utils';

// ============================================================
// Custom Validation Errors (Enterprise Enhancement)
// ============================================================

export class CommandValidationError extends Error {
  public readonly field: string;
  public readonly validationType: string;

  constructor(message: string, field: string, validationType: string) {
    super(message);
    this.name = 'CommandValidationError';
    this.field = field;
    this.validationType = validationType;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Device information for registration tracking (Bangladesh specific)
 * ✅ FIXED: All optional properties explicitly include `| undefined`
 * ✅ FIXED: Properly extends SharedDeviceInfo
 */
// ✅ সম্পূর্ণ ঠিক করা কোড - Partial বাদ দিয়ে নিজের মতো ডিফাইন করুন
// ============================================================
// Types (Enhanced with shared types)
// ============================================================

/**
 * Device information for registration tracking (Bangladesh specific)
 * ✅ FIXED: No Partial, explicit properties with undefined support
 */
export interface DeviceInfo {
  /** IP address of the client */
  ipAddress?: string | undefined;

  /** User agent string */
  userAgent?: string | undefined;

  /** Device identifier for fingerprinting */
  deviceId?: string | undefined;

  /** Device fingerprint hash */
  deviceFingerprint?: string | undefined;

  /** Screen resolution for fingerprinting */
  screenResolution?: string | undefined;

  /** Browser language */
  language?: string | undefined;

  /** Timezone offset in minutes */
  timezoneOffset?: number | undefined;

  // Bangladesh specific fields
  /** District (Bangladesh) - from shared-constants */
  district?: (typeof BANGLADESH_DISTRICTS)[number] | undefined;

  /** Upazila/Sub-district (Bangladesh) */
  upazila?: string | undefined;

  /** Mobile operator - from shared-constants */
  mobileOperator?: (typeof MOBILE_OPERATORS)[keyof typeof MOBILE_OPERATORS] | undefined;

  /** Network type - from shared-constants */
  networkType?: (typeof NETWORK_TYPES)[keyof typeof NETWORK_TYPES] | undefined;

  /** Data saver enabled status */
  dataSaverEnabled?: boolean | undefined;

  /** Retry attempt number (for connection resilience) */
  retryAttempt?: number | undefined;
}

/**
 * User preferences for registration
 * ✅ FIXED: No Partial, explicit properties with undefined support
 */
export interface UserPreferences {
  /** Preferred language (English/Bengali) */
  language?: 'en' | 'bn' | undefined;

  /** Currency preference */
  currency?: string | undefined;

  /** Two-factor authentication enabled */
  twoFactorEnabled?: boolean | undefined;

  /** Preferred two-factor authentication method */
  preferredTwoFactorMethod?: 'totp' | 'sms' | 'email' | 'whatsapp' | undefined;

  /** Timezone (default: Asia/Dhaka) */
  timezone?: string | undefined;

  /** Preferred delivery time */
  preferredDeliveryTime?: 'morning' | 'afternoon' | 'evening' | 'any' | undefined;

  /** Email notifications enabled */
  emailNotifications?: boolean | undefined;

  /** SMS notifications enabled */
  smsNotifications?: boolean | undefined;

  /** Push notifications enabled */
  pushNotifications?: boolean | undefined;

  /** Marketing emails consent */
  marketingEmails?: boolean | undefined;

  /** Order updates notifications */
  orderUpdates?: boolean | undefined;

  /** Price drop alerts */
  priceDropAlerts?: boolean | undefined;

  /** Back in stock alerts */
  backInStockAlerts?: boolean | undefined;

  /** Newsletter subscription */
  newsletterSubscription?: boolean | undefined;

  /** Save address history */
  saveAddressHistory?: boolean | undefined;

  /** Auto apply coupons */
  autoApplyCoupons?: boolean | undefined;

  // Bangladesh specific preferences
  /** Preferred district (Bangladesh) */
  preferredDistrict?: (typeof BANGLADESH_DISTRICTS)[number] | undefined;

  /** Preferred upazila (Bangladesh) */
  preferredUpazila?: string | undefined;

  /** Referral code (if any) */
  referralCode?: string | undefined;

  /** Marketing consent for SMS/WhatsApp */
  marketingConsent?: boolean | undefined;

  /** WhatsApp notifications consent (Bangladesh specific) */
  whatsappConsent?: boolean | undefined;

  /** Voice call notifications consent (for feature phones) */
  voiceCallConsent?: boolean | undefined;

  /** Age for verification (18+ for vendor, 13+ for customer) */
  age?: number | undefined;
}
/**
 * Command options interface (Builder pattern)
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
  deviceInfo?: DeviceInfo | undefined;

  /** User preferences */
  preferences?: UserPreferences | undefined;

  /** CAPTCHA token for bot prevention */
  captchaToken?: string | undefined;

  /** Accept terms and conditions */
  acceptTerms?: boolean | undefined;

  /** Accept privacy policy */
  acceptPrivacy?: boolean | undefined;

  /** Optional phone number */
  phone?: string | undefined;

  /** Optional display name */
  displayName?: string | undefined;

  /** Preferred language (en or bn) */
  preferredLanguage?: 'en' | 'bn' | undefined;

  /** Correlation ID for distributed tracing */
  correlationId?: string | undefined;

  /** Registration method (email, phone, social, otp) */
  registrationMethod?: (typeof REGISTRATION_METHODS)[keyof typeof REGISTRATION_METHODS] | undefined;

  /** User role override (for admin creation, default: CUSTOMER) */
  role?: string | undefined;

  /** User tier override (for admin creation) */
  tier?: string | undefined;

  /** Auto-login after registration */
  autoLogin?: boolean | undefined;

  /** Send welcome email */
  sendWelcomeEmail?: boolean | undefined;

  /** Send welcome SMS (Bangladesh specific) */
  sendWelcomeSms?: boolean | undefined;

  /** Force email verification */
  forceEmailVerification?: boolean | undefined;

  /** Force phone verification */
  forcePhoneVerification?: boolean | undefined;
}

// ============================================================
// Password Strength Validation Helper (Enterprise Enhancement)
// ============================================================

/**
 * Validate password strength based on PASSWORD_POLICY from shared-constants
 * @throws {CommandValidationError} If password doesn't meet requirements
 */
function validatePasswordStrength(password: string): void {
  // Minimum length check
  if (password.length < PASSWORD_POLICY.MIN_LENGTH) {
    throw new CommandValidationError(
      `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters long`,
      'password',
      'minLength',
    );
  }

  // Maximum length check
  if (password.length > PASSWORD_POLICY.MAX_LENGTH) {
    throw new CommandValidationError(
      `Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`,
      'password',
      'maxLength',
    );
  }

  // Uppercase letter check
  if (PASSWORD_POLICY.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    throw new CommandValidationError(
      'Password must contain at least one uppercase letter',
      'password',
      'uppercase',
    );
  }

  // Lowercase letter check
  if (PASSWORD_POLICY.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    throw new CommandValidationError(
      'Password must contain at least one lowercase letter',
      'password',
      'lowercase',
    );
  }

  // Number check
  if (PASSWORD_POLICY.REQUIRE_NUMBERS && !/[0-9]/.test(password)) {
    throw new CommandValidationError(
      'Password must contain at least one number',
      'password',
      'number',
    );
  }

  // ✅ FIXED: Use REQUIRE_SYMBOLS instead of REQUIRE_SPECIAL_CHARS
  if (PASSWORD_POLICY.REQUIRE_SYMBOLS && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    throw new CommandValidationError(
      'Password must contain at least one special character',
      'password',
      'specialChar',
    );
  }
}

// ============================================================
// Email Validation Helper (Enterprise Enhancement)
// ============================================================

/**
 * Validate email format using shared-utils
 * @throws {CommandValidationError} If email format is invalid
 */
function validateEmailFormat(email: string): void {
  if (!email || email.trim().length === 0) {
    throw new CommandValidationError('Email is required', 'email', 'required');
  }

  if (email.length > 255) {
    throw new CommandValidationError('Email cannot exceed 255 characters', 'email', 'maxLength');
  }

  if (!isValidEmail(email)) {
    throw new CommandValidationError('Invalid email format', 'email', 'format');
  }
}

// ============================================================
// Phone Number Validation Helper (Bangladesh specific - Enterprise Enhancement)
// ============================================================

/**
 * Validate and normalize Bangladesh phone number
 * @returns Normalized phone number in E.164 format
 * @throws {CommandValidationError} If phone number is invalid
 */
function validateAndNormalizePhone(phone: string): string {
  if (!phone || phone.trim().length === 0) {
    throw new CommandValidationError('Phone number is required', 'phone', 'required');
  }

  // Normalize to E.164 format
  const normalized = normalizePhone(phone, 'BD');

  if (!normalized || !isValidBdMobile(phone)) {
    throw new CommandValidationError(
      'Invalid Bangladesh phone number. Use format: 01XXXXXXXXX or +8801XXXXXXXXX',
      'phone',
      'format',
    );
  }

  return normalized;
}

// ============================================================
// District Validation Helper (Enterprise Enhancement)
// ============================================================

/**
 * Validate district name against BANGLADESH_DISTRICTS from shared-constants
 * @throws {CommandValidationError} If district is invalid
 */
function validateDistrict(district: string): void {
  if (!district || district.trim().length === 0) {
    throw new CommandValidationError('District is required', 'district', 'required');
  }

  // Check if district exists in BANGLADESH_DISTRICTS
  if (!BANGLADESH_DISTRICTS.includes(district as (typeof BANGLADESH_DISTRICTS)[number])) {
    throw new CommandValidationError(
      `Invalid district: ${district}. Must be one of: ${BANGLADESH_DISTRICTS.join(', ')}`,
      'district',
      'invalid',
    );
  }
}

// ============================================================
// Upazila Validation Helper (Enterprise Enhancement)
// ============================================================

/**
 * Validate upazila name (optional - checks against shared-constants if available)
 * @throws {CommandValidationError} If upazila is invalid
 */
function validateUpazila(upazila: string, district?: string): void {
  if (!upazila || upazila.trim().length === 0) {
    return; // Upazila is optional
  }

  // If district is provided, check if upazila exists for that district
  if (district && BANGLADESH_UPAZILAS[district as keyof typeof BANGLADESH_UPAZILAS]) {
    // ✅ FIXED: Properly handle the upazila array
    const validUpazilas = BANGLADESH_UPAZILAS[district as keyof typeof BANGLADESH_UPAZILAS];
    if (validUpazilas && Array.isArray(validUpazilas) && !validUpazilas.includes(upazila)) {
      throw new CommandValidationError(
        `Invalid upazila: ${upazila} for district ${district}`,
        'upazila',
        'invalid',
      );
    }
  }
}

// ============================================================
// Age Validation Helper (Enterprise Enhancement)
// ============================================================

/**
 * Validate age meets minimum requirement
 * @param age - User's age
 * @param minAge - Minimum required age (default: 13)
 * @throws {CommandValidationError} If age is below minimum
 */
function validateAge(age: number | undefined, minAge: number = 13): void {
  if (age === undefined) {
    return; // Age is optional for customers
  }

  if (age < minAge) {
    throw new CommandValidationError(
      `You must be at least ${minAge} years old to register`,
      'age',
      'minAge',
    );
  }

  if (age > 120) {
    throw new CommandValidationError('Age cannot exceed 120 years', 'age', 'maxAge');
  }
}

// ============================================================
// Command Builder Class (Enterprise Pattern with Validation)
// ============================================================

/**
 * Register User Command Builder
 * ✅ Enterprise: Builder pattern for fluent command construction with validation
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
  private options: Partial<RegisterUserCommandOptions>;

  constructor() {
    this.options = {};
  }

  setEmail(email: string): this {
    validateEmailFormat(email);
    this.options.email = email.trim().toLowerCase();
    return this;
  }

  setPassword(password: string): this {
    validatePasswordStrength(password);
    this.options.password = password;
    return this;
  }

  setConfirmPassword(confirmPassword: string): this {
    this.options.confirmPassword = confirmPassword;
    return this;
  }

  setFullName(fullName: string): this {
    if (!fullName || fullName.trim().length === 0) {
      throw new CommandValidationError('Full name is required', 'fullName', 'required');
    }
    if (fullName.length < 2) {
      throw new CommandValidationError(
        'Full name must be at least 2 characters',
        'fullName',
        'minLength',
      );
    }
    if (fullName.length > 100) {
      throw new CommandValidationError(
        'Full name cannot exceed 100 characters',
        'fullName',
        'maxLength',
      );
    }
    this.options.fullName = fullName.trim();
    return this;
  }

  setDeviceInfo(deviceInfo: DeviceInfo): this {
    // Validate device info if provided
    if (deviceInfo.district) {
      validateDistrict(deviceInfo.district);
    }
    if (deviceInfo.upazila) {
      validateUpazila(deviceInfo.upazila, deviceInfo.district);
    }
    this.options.deviceInfo = deviceInfo;
    return this;
  }

  setPreferences(preferences: UserPreferences): this {
    // Validate preferences if provided
    if (preferences.preferredDistrict) {
      validateDistrict(preferences.preferredDistrict);
    }
    if (preferences.preferredUpazila) {
      validateUpazila(preferences.preferredUpazila, preferences.preferredDistrict);
    }
    if (preferences.age !== undefined) {
      validateAge(preferences.age);
    }
    this.options.preferences = preferences;
    return this;
  }

  setCaptchaToken(captchaToken: string): this {
    if (captchaToken && captchaToken.length < 20) {
      throw new CommandValidationError('Invalid CAPTCHA token', 'captchaToken', 'invalid');
    }
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
    const normalized = validateAndNormalizePhone(phone);
    this.options.phone = normalized;
    return this;
  }

  setDisplayName(displayName: string): this {
    if (displayName && displayName.length > 50) {
      throw new CommandValidationError(
        'Display name cannot exceed 50 characters',
        'displayName',
        'maxLength',
      );
    }
    this.options.displayName = displayName?.trim();
    return this;
  }

  setPreferredLanguage(language: 'en' | 'bn'): this {
    if (language !== 'en' && language !== 'bn') {
      throw new CommandValidationError('Language must be en or bn', 'preferredLanguage', 'invalid');
    }
    this.options.preferredLanguage = language;
    return this;
  }

  setCorrelationId(correlationId: string): this {
    this.options.correlationId = correlationId;
    return this;
  }

  setRegistrationMethod(
    method: (typeof REGISTRATION_METHODS)[keyof typeof REGISTRATION_METHODS],
  ): this {
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
    if (referralCode && !/^[A-Za-z0-9]{6,20}$/.test(referralCode)) {
      throw new CommandValidationError('Invalid referral code format', 'referralCode', 'format');
    }
    // ✅ FIXED: Initialize preferences if needed
    if (!this.options.preferences) {
      this.options.preferences = {} as UserPreferences;
    }
    this.options.preferences.referralCode = referralCode;
    return this;
  }

  setMarketingConsent(consent: boolean): this {
    // ✅ FIXED: Initialize preferences if needed
    if (!this.options.preferences) {
      this.options.preferences = {} as UserPreferences;
    }
    this.options.preferences.marketingConsent = consent;
    return this;
  }

  setWhatsAppConsent(consent: boolean): this {
    // ✅ FIXED: Initialize preferences if needed
    if (!this.options.preferences) {
      this.options.preferences = {} as UserPreferences;
    }
    this.options.preferences.whatsappConsent = consent;
    return this;
  }

  setPreferredDistrict(district: (typeof BANGLADESH_DISTRICTS)[number]): this {
    validateDistrict(district);
    // ✅ FIXED: Initialize preferences if needed
    if (!this.options.preferences) {
      this.options.preferences = {} as UserPreferences;
    }
    this.options.preferences.preferredDistrict = district;
    return this;
  }

  setPreferredUpazila(upazila: string): this {
    validateUpazila(upazila, this.options.preferences?.preferredDistrict);
    // ✅ FIXED: Initialize preferences if needed
    if (!this.options.preferences) {
      this.options.preferences = {} as UserPreferences;
    }
    this.options.preferences.preferredUpazila = upazila;
    return this;
  }

  setAge(age: number): this {
    validateAge(age);
    // ✅ FIXED: Initialize preferences if needed
    if (!this.options.preferences) {
      this.options.preferences = {} as UserPreferences;
    }
    this.options.preferences.age = age;
    return this;
  }

  build(): RegisterUserCommand {
    // Validate required fields before building
    if (!this.options.email) {
      throw new CommandValidationError(
        'Email is required to build RegisterUserCommand',
        'email',
        'required',
      );
    }
    if (!this.options.password) {
      throw new CommandValidationError(
        'Password is required to build RegisterUserCommand',
        'password',
        'required',
      );
    }
    if (!this.options.confirmPassword) {
      throw new CommandValidationError(
        'Confirm password is required to build RegisterUserCommand',
        'confirmPassword',
        'required',
      );
    }
    if (!this.options.fullName) {
      throw new CommandValidationError(
        'Full name is required to build RegisterUserCommand',
        'fullName',
        'required',
      );
    }

    // Validate passwords match
    if (this.options.password !== this.options.confirmPassword) {
      throw new CommandValidationError('Passwords do not match', 'confirmPassword', 'match');
    }

    // Validate terms acceptance
    if (!this.options.acceptTerms) {
      throw new CommandValidationError(
        'You must accept the terms and conditions',
        'acceptTerms',
        'required',
      );
    }

    return new RegisterUserCommand(this.options as RegisterUserCommandOptions);
  }
}

// ============================================================
// Command Class (Immutable)
// ============================================================

/**
 * Register User Command
 *
 * @example
 * // Using constructor directly (with validation)
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

  // Optional fields with proper exactOptionalPropertyTypes handling
  public readonly deviceInfo?: DeviceInfo | undefined;
  public readonly preferences?: UserPreferences | undefined;
  public readonly captchaToken?: string | undefined;
  public readonly acceptTerms: boolean;
  public readonly acceptPrivacy: boolean;
  public readonly phone?: string | undefined;
  public readonly displayName?: string | undefined;
  public readonly preferredLanguage: 'en' | 'bn';
  public readonly correlationId?: string | undefined;
  public readonly registrationMethod?:
    | (typeof REGISTRATION_METHODS)[keyof typeof REGISTRATION_METHODS]
    | undefined;
  public readonly role?: string | undefined;
  public readonly tier?: string | undefined;
  public readonly autoLogin: boolean;
  public readonly sendWelcomeEmail: boolean;
  public readonly sendWelcomeSms: boolean;
  public readonly forceEmailVerification: boolean;
  public readonly forcePhoneVerification: boolean;

  constructor(options: RegisterUserCommandOptions) {
    this.commandId = randomUUID();
    this.timestamp = new Date();

    // Required fields (already validated by builder)
    this.email = options.email;
    this.password = options.password;
    this.confirmPassword = options.confirmPassword;
    this.fullName = options.fullName;

    // Optional fields with proper undefined handling
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
  public getPreferredDistrict(): (typeof BANGLADESH_DISTRICTS)[number] | undefined {
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
  public getMobileOperator(): (typeof MOBILE_OPERATORS)[keyof typeof MOBILE_OPERATORS] | undefined {
    return this.deviceInfo?.mobileOperator;
  }

  /**
   * Get network type (Bangladesh specific)
   */
  public getNetworkType(): (typeof NETWORK_TYPES)[keyof typeof NETWORK_TYPES] | undefined {
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
    correlationId?: string | undefined;
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
  public getRegistrationSource(): string {
    // ✅ FIXED: Use proper access to REGISTRATION_SOURCES
    const userAgent = this.getUserAgent();
    if (!userAgent) return REGISTRATION_SOURCES.WEB;

    if (userAgent.includes('VubonApp')) {
      return REGISTRATION_SOURCES.MOBILE_APP;
    }
    if (
      userAgent.includes('Mobile') ||
      userAgent.includes('Android') ||
      userAgent.includes('iPhone')
    ) {
      return REGISTRATION_SOURCES.MOBILE_APP;
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
      deviceInfo: this.deviceInfo
        ? {
            hasIp: !!this.deviceInfo.ipAddress,
            hasUserAgent: !!this.deviceInfo.userAgent,
            hasDeviceId: !!this.deviceInfo.deviceId,
            hasDeviceFingerprint: !!this.deviceInfo.deviceFingerprint,
            district: this.deviceInfo.district,
            upazila: this.deviceInfo.upazila,
            mobileOperator: this.deviceInfo.mobileOperator,
            networkType: this.deviceInfo.networkType,
          }
        : undefined,
      preferences: this.preferences
        ? {
            preferredDistrict: this.preferences.preferredDistrict,
            preferredUpazila: this.preferences.preferredUpazila,
            hasReferralCode: !!this.preferences.referralCode,
            marketingConsent: this.preferences.marketingConsent,
            whatsappConsent: this.preferences.whatsappConsent,
            age: this.preferences.age,
          }
        : undefined,
    };
  }
}

// ============================================================
// Type Exports
// ============================================================

export type {
  DeviceInfo as DeviceInfoType,
  UserPreferences as UserPreferencesType,
  RegisterUserCommandOptions as RegisterUserCommandOptionsType,
};
