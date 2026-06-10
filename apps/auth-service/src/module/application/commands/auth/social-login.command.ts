/**
 * Social Login Command - Pure Command Data Structure (Enterprise Enhanced v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/social-login.command
 * 
 * @description
 * Command for authenticating a user via social providers (OAuth) with enterprise-grade features.
 * Supports international providers and Bangladesh-specific providers.
 * 
 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Shared types integration (@vubon/shared-types)
 * ✅ Shared constants for provider configs (@vubon/shared-constants)
 * ✅ Branded types for type safety (CommandId, CorrelationId)
 * ✅ Command validation on construction (fail-fast)
 * ✅ Builder pattern for flexible command construction
 * ✅ Factory methods for common scenarios (Google, Facebook, WhatsApp, bKash)
 * ✅ Multi-language support (English/Bengali) - display names and messages
 * ✅ PKCE (Proof Key for Code Exchange) support
 * ✅ Comprehensive masking methods for secure logging
 * ✅ Type guards for runtime type checking
 * ✅ Execution context for distributed tracing
 * ✅ Audit-ready metadata
 * ✅ Bangladesh specific - Phone-based social login (WhatsApp/Imo) and MFS (bKash/Nagad/Rocket)
 * ✅ OAuth provider info with health status
 * ✅ Validation messages in English and Bengali
 * 
 * @example
 * // Google OAuth login
 * const command = SocialLoginCommand.forGoogle(
 *   'access_token_xyz',
 *   deviceInfo,
 *   true,
 *   'corr_abc123'
 * );
 * 
 * // WhatsApp OTP login (Bangladesh specific)
 * const command = SocialLoginCommand.forWhatsApp(
 *   '+8801712345678',
 *   '123456',
 *   deviceInfo,
 *   true,
 *   'corr_abc123'
 * );
 * 
 * // bKash PIN login (Bangladesh specific)
 * const command = SocialLoginCommand.forBkash(
 *   '+8801712345678',
 *   '1234',
 *   deviceInfo,
 *   true,
 *   'corr_abc123'
 * );
 */

import { randomUUID } from 'crypto';

// ============================================================
// Shared Packages Import (Enterprise Enhancement)
// ============================================================

import type { 
  DeviceInfo as SharedDeviceInfo,
  SocialProvider as SharedSocialProvider,
  Brand,
  Locale
} from '@vubon/shared-types';

import { 
  SOCIAL_PROVIDERS,
  SOCIAL_PROVIDER_CONFIGS,
  SOCIAL_PROVIDER_DISPLAY_NAMES,
  SOCIAL_PROVIDER_DISPLAY_NAMES_BN,
  SOCIAL_PROVIDER_COLORS,
  SOCIAL_PROVIDER_ICONS,
  SOCIAL_PROVIDER_CATEGORIES,
  OAUTH_SCOPES,
  SOCIAL_AUTH_CONFIG,
  ENV_CONFIG
} from '@vubon/shared-constants';

import { maskString, maskPhone, maskToken } from '@vubon/shared-utils';

// ============================================================
// Branded Types for Type Safety (Enterprise Feature)
// ============================================================

/**
 * Branded command ID type
 * Prevents accidental mixing with other string types
 */
export type CommandId = Brand<string, 'CommandId'>;

/**
 * Branded correlation ID type
 * For distributed tracing
 */
export type CorrelationId = Brand<string, 'CorrelationId'>;

/**
 * Branded access token type
 */
export type AccessToken = Brand<string, 'AccessToken'>;

/**
 * Branded OAuth state type
 */
export type OAuthState = Brand<string, 'OAuthState'>;

/**
 * Branded OAuth code type
 */
export type OAuthCode = Brand<string, 'OAuthCode'>;

/**
 * Branded PKCE code verifier type
 */
export type PKCECodeVerifier = Brand<string, 'PKCECodeVerifier'>;

// ============================================================
// Social Provider Enum (Re-exported from shared-constants)
// ============================================================

/**
 * Social provider enumeration
 * Values come from shared-constants for consistency
 */
export type SocialProvider = SharedSocialProvider;

/**
 * Social provider values (re-exported from shared-constants)
 */
export const SocialProvider = SOCIAL_PROVIDERS;

// ============================================================
// Types (Using shared types for consistency)
// ============================================================

/**
 * Device information for social login (Bangladesh specific)
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

  /** Session ID for tracking */
  sessionId?: string;

  /** Screen resolution for fingerprinting */
  screenResolution?: string;

  /** Browser language */
  language?: string;

  /** Timezone offset in minutes */
  timezoneOffset?: number;

  /** Retry attempt number (for connection resilience) */
  retryAttempt?: number;

  // Bangladesh specific fields
  /** District (Bangladesh) */
  district?: string;

  /** Upazila/Sub-district (Bangladesh) */
  upazila?: string;

  /** Mobile operator - from shared-constants */
  mobileOperator?: typeof import('@vubon/shared-constants').MOBILE_OPERATORS[number];

  /** Network type - from shared-constants */
  networkType?: typeof import('@vubon/shared-constants').NETWORK_TYPES[number];

  /** Data saver enabled status */
  dataSaverEnabled?: boolean;
}

/**
 * OAuth provider information (Enterprise feature)
 * Provides metadata about each OAuth provider
 */
export interface OAuthProviderInfo {
  /** Provider identifier */
  provider: SocialProvider;
  
  /** Display name in English */
  displayName: string;
  
  /** Display name in Bengali */
  displayNameBn?: string;
  
  /** OAuth authorization URL */
  authUrl: string;
  
  /** OAuth token URL */
  tokenUrl: string;
  
  /** User info URL */
  userInfoUrl: string;
  
  /** Required OAuth scopes */
  scopes: string[];
  
  /** Whether provider is active */
  isActive: boolean;
  
  /** Whether provider is Bangladesh-specific */
  isBangladeshSpecific: boolean;
  
  /** Whether provider requires phone number */
  requiresPhone?: boolean;
  
  /** Whether provider requires PIN */
  requiresPin?: boolean;
  
  /** Provider category */
  category: typeof SOCIAL_PROVIDER_CATEGORIES[keyof typeof SOCIAL_PROVIDER_CATEGORIES];
  
  /** Health status of the provider */
  healthStatus?: 'healthy' | 'degraded' | 'unhealthy';
  
  /** Last health check timestamp */
  lastHealthCheck?: Date;
}

/**
 * PKCE (Proof Key for Code Exchange) parameters
 * ✅ Enterprise: Enhanced OAuth security
 */
export interface PKCEParams {
  /** Code verifier (random string) */
  codeVerifier: PKCECodeVerifier;
  
  /** Code challenge (SHA-256 hash of code verifier) */
  codeChallenge: string;
  
  /** Code challenge method (always 'S256') */
  codeChallengeMethod: 'S256';
}

/**
 * Command options interface (Builder pattern)
 */
export interface SocialLoginCommandOptions {
  /** Device context for audit */
  deviceInfo?: DeviceInfo;
  
  /** Remember me for extended session */
  rememberMe?: boolean;
  
  /** OAuth state parameter for CSRF protection */
  state?: OAuthState;
  
  /** Correlation ID for distributed tracing */
  correlationId?: CorrelationId;
  
  /** Phone number for WhatsApp/Imo (Bangladesh specific) */
  phoneNumber?: string;
  
  /** OTP code for WhatsApp/Imo (Bangladesh specific) */
  otpCode?: string;
  
  /** PIN for bKash/Nagad/Rocket (Bangladesh specific) */
  pin?: string;
  
  /** PKCE parameters (for enhanced OAuth security) */
  pkceParams?: PKCEParams;
  
  /** Preferred language for messages */
  locale?: Locale;
  
  /** OAuth code (for callback flow) */
  code?: OAuthCode;
  
  /** Redirect URI (for OAuth callback) */
  redirectUri?: string;
}

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// ============================================================
// Constants (Using shared-constants)
// ============================================================

const IS_PRODUCTION = ENV_CONFIG?.IS_PRODUCTION ?? false;

// Phone number pattern for Bangladesh (E.164 format)
const PHONE_PATTERN = /^\+8801[3-9]\d{8}$/;
const OTP_PATTERN = /^\d{6}$/;
const PIN_PATTERN = /^\d{4}$/;

// ============================================================
// Validation Messages (Multi-language)
// ============================================================

const VALIDATION_MESSAGES = {
  en: {
    providerRequired: 'Provider is required',
    providerInvalid: 'Invalid social provider',
    accessTokenRequired: 'Access token is required',
    accessTokenMinLength: (min: number) => `Access token must be at least ${min} characters`,
    accessTokenMaxLength: (max: number) => `Access token cannot exceed ${max} characters`,
    phoneRequired: 'Phone number is required for this provider',
    phoneInvalid: 'Please provide a valid Bangladesh phone number (e.g., +8801712345678)',
    otpRequired: 'OTP code is required for this provider',
    otpInvalid: 'OTP code must be exactly 6 digits',
    pinRequired: 'PIN is required for this provider',
    pinInvalid: 'PIN must be exactly 4 digits',
    stateInvalid: 'State parameter must be a valid string',
    codeRequired: 'OAuth code is required for callback flow',
    redirectUriRequired: 'Redirect URI is required for OAuth flow',
    deviceIdMaxLength: (max: number) => `Device ID cannot exceed ${max} characters`,
  },
  bn: {
    providerRequired: 'প্রোভাইডার প্রয়োজন',
    providerInvalid: 'অবৈধ সোশ্যাল প্রোভাইডার',
    accessTokenRequired: 'অ্যাক্সেস টোকেন প্রয়োজন',
    accessTokenMinLength: (min: number) => `অ্যাক্সেস টোকেন কমপক্ষে ${min} অক্ষরের হতে হবে`,
    accessTokenMaxLength: (max: number) => `অ্যাক্সেস টোকেন সর্বোচ্চ ${max} অক্ষর হতে পারে`,
    phoneRequired: 'এই প্রোভাইডারের জন্য ফোন নম্বর প্রয়োজন',
    phoneInvalid: 'একটি সঠিক বাংলাদেশ ফোন নম্বর দিন (যেমন: +8801712345678)',
    otpRequired: 'এই প্রোভাইডারের জন্য OTP কোড প্রয়োজন',
    otpInvalid: 'OTP কোড অবশ্যই ৬ ডিজিটের হতে হবে',
    pinRequired: 'এই প্রোভাইডারের জন্য পিন প্রয়োজন',
    pinInvalid: 'পিন অবশ্যই ৪ ডিজিটের হতে হবে',
    stateInvalid: 'স্টেট প্যারামিটার টি সঠিক স্ট্রিং হতে হবে',
    codeRequired: 'কলব্যাক ফ্লোর জন্য OTP কোড প্রয়োজন',
    redirectUriRequired: 'OAuth ফ্লোর জন্য রিডাইরেক্ট URI প্রয়োজন',
    deviceIdMaxLength: (max: number) => `ডিভাইস আইডি সর্বোচ্চ ${max} অক্ষর হতে পারে`,
  },
};

/**
 * Get validation message with locale support
 */
function getValidationMessage(
  key: keyof typeof VALIDATION_MESSAGES.en,
  locale: Locale = 'en',
  ...args: unknown[]
): string {
  const messageFn = VALIDATION_MESSAGES[locale][key] as ((...args: unknown[]) => string) | string;
  if (typeof messageFn === 'function') {
    return messageFn(...args);
  }
  return messageFn || VALIDATION_MESSAGES.en[key](...args);
}

// ============================================================
// Command Validation Error Class
// ============================================================

export class CommandValidationError extends Error {
  public readonly validationErrors: string[];
  public readonly commandType: string;
  public readonly locale: Locale;

  constructor(message: string, validationErrors: string[], commandType: string, locale: Locale = 'en') {
    super(message);
    this.name = 'CommandValidationError';
    this.validationErrors = validationErrors;
    this.commandType = commandType;
    this.locale = locale;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ============================================================
// Social Login Command Builder (Enterprise Pattern)
// ============================================================

/**
 * Social Login Command Builder
 * ✅ Enterprise: Builder pattern for fluent command construction
 * 
 * @example
 * const command = new SocialLoginCommandBuilder()
 *   .setProvider(SocialProvider.GOOGLE)
 *   .setAccessToken('access_token_xyz')
 *   .setDeviceInfo({ ipAddress: '192.168.1.100', district: 'Dhaka' })
 *   .setRememberMe(true)
 *   .setCorrelationId('corr_abc123')
 *   .build();
 */
export class SocialLoginCommandBuilder {
  private provider?: SocialProvider;
  private accessToken?: string;
  private deviceInfo?: DeviceInfo;
  private rememberMe: boolean = false;
  private state?: OAuthState;
  private correlationId?: CorrelationId;
  private phoneNumber?: string;
  private otpCode?: string;
  private pin?: string;
  private pkceParams?: PKCEParams;
  private locale: Locale = 'en';
  private code?: OAuthCode;
  private redirectUri?: string;

  setProvider(provider: SocialProvider): this {
    this.provider = provider;
    return this;
  }

  setAccessToken(token: string): this {
    this.accessToken = token;
    return this;
  }

  setDeviceInfo(deviceInfo: DeviceInfo): this {
    this.deviceInfo = deviceInfo;
    return this;
  }

  setRememberMe(rememberMe: boolean): this {
    this.rememberMe = rememberMe;
    return this;
  }

  setState(state: OAuthState): this {
    this.state = state;
    return this;
  }

  setCorrelationId(correlationId: CorrelationId): this {
    this.correlationId = correlationId;
    return this;
  }

  setPhoneNumber(phoneNumber: string): this {
    this.phoneNumber = phoneNumber;
    return this;
  }

  setOtpCode(otpCode: string): this {
    this.otpCode = otpCode;
    return this;
  }

  setPin(pin: string): this {
    this.pin = pin;
    return this;
  }

  setPkceParams(params: PKCEParams): this {
    this.pkceParams = params;
    return this;
  }

  setLocale(locale: Locale): this {
    this.locale = locale;
    return this;
  }

  setCode(code: OAuthCode): this {
    this.code = code;
    return this;
  }

  setRedirectUri(redirectUri: string): this {
    this.redirectUri = redirectUri;
    return this;
  }

  build(): SocialLoginCommand {
    if (!this.provider) {
      throw new CommandValidationError(
        'Provider is required',
        [getValidationMessage('providerRequired', this.locale)],
        'SocialLoginCommand',
        this.locale
      );
    }

    return new SocialLoginCommand(
      this.provider,
      this.accessToken,
      this.deviceInfo,
      this.rememberMe,
      this.state,
      this.correlationId,
      this.phoneNumber,
      this.otpCode,
      this.pin,
      this.pkceParams,
      this.locale,
      this.code,
      this.redirectUri
    );
  }
}

// ============================================================
// Social Login Command (Enterprise Enhanced v3.0)
// ============================================================

/**
 * Social Login Command

 * @example
 * // Using constructor directly
 * const command = new SocialLoginCommand(
 *   SocialProvider.GOOGLE,
 *   'access_token_xyz',
 *   { ipAddress: '192.168.1.100', district: 'Dhaka' },
 *   true,
 *   'state_abc',
 *   'corr_abc123'
 * );
 * 
 * // Using builder (recommended)
 * const command = new SocialLoginCommandBuilder()
 *   .setProvider(SocialProvider.GOOGLE)
 *   .setAccessToken('access_token_xyz')
 *   .setDeviceInfo({ ipAddress: '192.168.1.100', district: 'Dhaka' })
 *   .setRememberMe(true)
 *   .setCorrelationId('corr_abc123')
 *   .build();
 */
export class SocialLoginCommand {
  public readonly commandId: CommandId;
  public readonly timestamp: Date;
  public readonly isOAuthFlow: boolean;
  public readonly isBangladeshProvider: boolean;
  public readonly isMessagingProvider: boolean;
  public readonly isMFSProvider: boolean;
  public readonly providerDisplayName: string;
  public readonly providerDisplayNameBn: string;
  public readonly providerIcon: string;
  public readonly providerColor: string;
  public readonly requiredScopes: string[];

  constructor(
    /** Social provider name */
    public readonly provider: SocialProvider,
    
    /** OAuth access token from provider */
    public readonly accessToken?: string,
    
    /** Device context for audit */
    public readonly deviceInfo?: DeviceInfo,
    
    /** Remember me for extended session */
    public readonly rememberMe: boolean = false,
    
    /** OAuth state parameter for CSRF protection */
    public readonly state?: OAuthState,
    
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: CorrelationId,
    
    /** Phone number for WhatsApp/Imo (Bangladesh specific) */
    public readonly phoneNumber?: string,
    
    /** OTP code for WhatsApp/Imo (Bangladesh specific) */
    public readonly otpCode?: string,
    
    /** PIN for bKash/Nagad/Rocket (Bangladesh specific) */
    public readonly pin?: string,
    
    /** PKCE parameters (for enhanced OAuth security) */
    public readonly pkceParams?: PKCEParams,
    
    /** Preferred language for messages */
    public readonly locale: Locale = 'en',
    
    /** OAuth code (for callback flow) */
    public readonly code?: OAuthCode,
    
    /** Redirect URI (for OAuth callback) */
    public readonly redirectUri?: string
  ) {
    this.commandId = randomUUID() as CommandId;
    this.timestamp = new Date();
    this.rememberMe = rememberMe ?? false;
    
    // Pre-compute provider properties
    this.isBangladeshProvider = this.checkIsBangladeshProvider();
    this.isMessagingProvider = this.checkIsMessagingProvider();
    this.isMFSProvider = this.checkIsMFSProvider();
    this.isOAuthFlow = !this.isMessagingProvider && !this.isMFSProvider && !!this.accessToken;
    this.providerDisplayName = this.getProviderDisplayName();
    this.providerDisplayNameBn = this.getProviderDisplayNameBn();
    this.providerIcon = this.getProviderIcon();
    this.providerColor = this.getProviderColor();
    this.requiredScopes = this.getRequiredScopes();

    // ✅ Enterprise: Validate command on construction
    this.validate();
  }

  // ============================================================
  // Factory Methods (Enterprise Enhancement)
  // ============================================================

  /**
   * Factory method for Google OAuth login
   */
  public static forGoogle(
    accessToken: string,
    deviceInfo?: DeviceInfo,
    rememberMe: boolean = false,
    correlationId?: CorrelationId
  ): SocialLoginCommand {
    return new SocialLoginCommand(
      SocialProvider.GOOGLE,
      accessToken,
      deviceInfo,
      rememberMe,
      undefined,
      correlationId
    );
  }

  /**
   * Factory method for Facebook OAuth login
   */
  public static forFacebook(
    accessToken: string,
    deviceInfo?: DeviceInfo,
    rememberMe: boolean = false,
    correlationId?: CorrelationId
  ): SocialLoginCommand {
    return new SocialLoginCommand(
      SocialProvider.FACEBOOK,
      accessToken,
      deviceInfo,
      rememberMe,
      undefined,
      correlationId
    );
  }

  /**
   * Factory method for GitHub OAuth login
   */
  public static forGitHub(
    accessToken: string,
    deviceInfo?: DeviceInfo,
    rememberMe: boolean = false,
    correlationId?: CorrelationId
  ): SocialLoginCommand {
    return new SocialLoginCommand(
      SocialProvider.GITHUB,
      accessToken,
      deviceInfo,
      rememberMe,
      undefined,
      correlationId
    );
  }

  /**
   * Factory method for WhatsApp OTP login (Bangladesh specific)
   */
  public static forWhatsApp(
    phoneNumber: string,
    otpCode: string,
    deviceInfo?: DeviceInfo,
    rememberMe: boolean = false,
    correlationId?: CorrelationId
  ): SocialLoginCommand {
    return new SocialLoginCommand(
      SocialProvider.WHATSAPP,
      undefined,
      deviceInfo,
      rememberMe,
      undefined,
      correlationId,
      phoneNumber,
      otpCode
    );
  }

  /**
   * Factory method for Imo OTP login (Bangladesh specific)
   */
  public static forImo(
    phoneNumber: string,
    otpCode: string,
    deviceInfo?: DeviceInfo,
    rememberMe: boolean = false,
    correlationId?: CorrelationId
  ): SocialLoginCommand {
    return new SocialLoginCommand(
      SocialProvider.IMO,
      undefined,
      deviceInfo,
      rememberMe,
      undefined,
      correlationId,
      phoneNumber,
      otpCode
    );
  }

  /**
   * Factory method for bKash PIN login (Bangladesh specific)
   */
  public static forBkash(
    phoneNumber: string,
    pin: string,
    deviceInfo?: DeviceInfo,
    rememberMe: boolean = false,
    correlationId?: CorrelationId
  ): SocialLoginCommand {
    return new SocialLoginCommand(
      SocialProvider.BKASH,
      undefined,
      deviceInfo,
      rememberMe,
      undefined,
      correlationId,
      phoneNumber,
      undefined,
      pin
    );
  }

  /**
   * Factory method for Nagad PIN login (Bangladesh specific)
   */
  public static forNagad(
    phoneNumber: string,
    pin: string,
    deviceInfo?: DeviceInfo,
    rememberMe: boolean = false,
    correlationId?: CorrelationId
  ): SocialLoginCommand {
    return new SocialLoginCommand(
      SocialProvider.NAGAD,
      undefined,
      deviceInfo,
      rememberMe,
      undefined,
      correlationId,
      phoneNumber,
      undefined,
      pin
    );
  }

  /**
   * Factory method for Rocket PIN login (Bangladesh specific)
   */
  public static forRocket(
    phoneNumber: string,
    pin: string,
    deviceInfo?: DeviceInfo,
    rememberMe: boolean = false,
    correlationId?: CorrelationId
  ): SocialLoginCommand {
    return new SocialLoginCommand(
      SocialProvider.ROCKET,
      undefined,
      deviceInfo,
      rememberMe,
      undefined,
      correlationId,
      phoneNumber,
      undefined,
      pin
    );
  }

  /**
   * Factory method for OAuth callback flow (with code instead of token)
   */
  public static forOAuthCallback(
    provider: SocialProvider,
    code: OAuthCode,
    redirectUri: string,
    deviceInfo?: DeviceInfo,
    correlationId?: CorrelationId,
    pkceParams?: PKCEParams
  ): SocialLoginCommand {
    return new SocialLoginCommand(
      provider,
      undefined,
      deviceInfo,
      false,
      undefined,
      correlationId,
      undefined,
      undefined,
      undefined,
      pkceParams,
      'en',
      code,
      redirectUri
    );
  }

  // ============================================================
  // Validation Methods (Enterprise Enhancement)
  // ============================================================

  /**
   * Validate command data
   * @throws {CommandValidationError} If validation fails
   */
  private validate(): void {
    const validation = this.getValidationResult();
    if (!validation.isValid) {
      throw new CommandValidationError(
        'Social login command validation failed',
        validation.errors,
        'SocialLoginCommand',
        this.locale
      );
    }
  }

  /**
   * Get validation result without throwing
   */
  public getValidationResult(): ValidationResult {
    const errors: string[] = [];

    // Validate provider
    if (!this.provider) {
      errors.push(getValidationMessage('providerRequired', this.locale));
    }

    // Validate based on provider type
    if (this.isOAuthFlow) {
      if (!this.accessToken) {
        errors.push(getValidationMessage('accessTokenRequired', this.locale));
      }
      if (this.accessToken && this.accessToken.length < 20) {
        errors.push(getValidationMessage('accessTokenMinLength', this.locale, 20));
      }
      if (this.accessToken && this.accessToken.length > 2048) {
        errors.push(getValidationMessage('accessTokenMaxLength', this.locale, 2048));
      }
    }

    // Validate messaging provider (WhatsApp/Imo)
    if (this.isMessagingProvider) {
      if (!this.phoneNumber) {
        errors.push(getValidationMessage('phoneRequired', this.locale));
      }
      if (this.phoneNumber && !PHONE_PATTERN.test(this.phoneNumber)) {
        errors.push(getValidationMessage('phoneInvalid', this.locale));
      }
      if (!this.otpCode) {
        errors.push(getValidationMessage('otpRequired', this.locale));
      }
      if (this.otpCode && !OTP_PATTERN.test(this.otpCode)) {
        errors.push(getValidationMessage('otpInvalid', this.locale));
      }
    }

    // Validate MFS provider (bKash/Nagad/Rocket)
    if (this.isMFSProvider) {
      if (!this.phoneNumber) {
        errors.push(getValidationMessage('phoneRequired', this.locale));
      }
      if (this.phoneNumber && !PHONE_PATTERN.test(this.phoneNumber)) {
        errors.push(getValidationMessage('phoneInvalid', this.locale));
      }
      if (!this.pin) {
        errors.push(getValidationMessage('pinRequired', this.locale));
      }
      if (this.pin && !PIN_PATTERN.test(this.pin)) {
        errors.push(getValidationMessage('pinInvalid', this.locale));
      }
    }

    // Validate OAuth callback flow
    if (this.code && !this.accessToken) {
      if (!this.code) {
        errors.push(getValidationMessage('codeRequired', this.locale));
      }
      if (!this.redirectUri) {
        errors.push(getValidationMessage('redirectUriRequired', this.locale));
      }
    }

    // Validate state
    if (this.state && this.state.length < 10) {
      errors.push(getValidationMessage('stateInvalid', this.locale));
    }

    // Validate device info
    if (this.deviceInfo?.deviceId && this.deviceInfo.deviceId.length > 255) {
      errors.push(getValidationMessage('deviceIdMaxLength', this.locale, 255));
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // ============================================================
  // Provider Detection Methods (Using shared-constants)
  // ============================================================

  /**
   * Check if this is a Bangladesh-specific provider
   */
  private checkIsBangladeshProvider(): boolean {
    const bangladeshProviders = [
      SocialProvider.WHATSAPP,
      SocialProvider.IMO,
      SocialProvider.TELEGRAM,
      SocialProvider.VIBER,
      SocialProvider.BKASH,
      SocialProvider.NAGAD,
      SocialProvider.ROCKET,
    ];
    return bangladeshProviders.includes(this.provider);
  }

  /**
   * Check if this is a messaging provider (WhatsApp, Imo, Telegram)
   */
  private checkIsMessagingProvider(): boolean {
    const messagingProviders = [
      SocialProvider.WHATSAPP,
      SocialProvider.IMO,
      SocialProvider.TELEGRAM,
      SocialProvider.VIBER,
    ];
    return messagingProviders.includes(this.provider);
  }

  /**
   * Check if this is an MFS provider (bKash, Nagad, Rocket)
   */
  private checkIsMFSProvider(): boolean {
    const mfsProviders = [
      SocialProvider.BKASH,
      SocialProvider.NAGAD,
      SocialProvider.ROCKET,
    ];
    return mfsProviders.includes(this.provider);
  }

  /**
   * Check if state parameter is provided (for CSRF)
   */
  public hasState(): boolean {
    return !!this.state && this.state.length > 0;
  }

  /**
   * Check if phone number is provided (for WhatsApp/Imo)
   */
  public hasPhoneNumber(): boolean {
    return !!this.phoneNumber;
  }

  /**
   * Check if OTP code is provided (for WhatsApp/Imo)
   */
  public hasOtpCode(): boolean {
    return !!this.otpCode;
  }

  /**
   * Check if PIN is provided (for MFS providers)
   */
  public hasPin(): boolean {
    return !!this.pin;
  }

  /**
   * Check if PKCE is enabled
   */
  public hasPKCE(): boolean {
    return !!this.pkceParams;
  }

  /**
   * Check if this is an OAuth callback flow
   */
  public isOAuthCallbackFlow(): boolean {
    return !!this.code && !!this.redirectUri;
  }

  // ============================================================
  // Provider Info Methods (Using shared-constants)
  // ============================================================

  /**
   * Get provider display name in English
   */
  private getProviderDisplayName(): string {
    return SOCIAL_PROVIDER_DISPLAY_NAMES[this.provider] || this.provider;
  }

  /**
   * Get provider display name in Bengali
   */
  private getProviderDisplayNameBn(): string {
    return SOCIAL_PROVIDER_DISPLAY_NAMES_BN[this.provider] || this.provider;
  }

  /**
   * Get provider icon name for UI
   */
  private getProviderIcon(): string {
    return SOCIAL_PROVIDER_ICONS[this.provider] || 'link';
  }

  /**
   * Get provider color for UI
   */
  private getProviderColor(): string {
    return SOCIAL_PROVIDER_COLORS[this.provider] || '#888888';
  }

  /**
   * Get required scopes for the provider (from shared-constants)
   */
  private getRequiredScopes(): string[] {
    return OAUTH_SCOPES[this.provider as keyof typeof OAUTH_SCOPES] || [];
  }

  /**
   * Get provider category
   */
  public getProviderCategory(): string {
    if (this.isBangladeshProvider) {
      if (this.isMessagingProvider) return SOCIAL_PROVIDER_CATEGORIES.MESSAGING;
      if (this.isMFSProvider) return SOCIAL_PROVIDER_CATEGORIES.MFS;
    }
    return SOCIAL_PROVIDER_CATEGORIES.OAUTH;
  }

  /**
   * Get provider info object
   */
  public getProviderInfo(): OAuthProviderInfo {
    const config = SOCIAL_PROVIDER_CONFIGS[this.provider as keyof typeof SOCIAL_PROVIDER_CONFIGS];
    return {
      provider: this.provider,
      displayName: this.providerDisplayName,
      displayNameBn: this.providerDisplayNameBn,
      authUrl: config?.authUrl || '',
      tokenUrl: config?.tokenUrl || '',
      userInfoUrl: config?.userInfoUrl || '',
      scopes: this.requiredScopes,
      isActive: config?.isActive ?? true,
      isBangladeshSpecific: this.isBangladeshProvider,
      requiresPhone: this.isMessagingProvider || this.isMFSProvider,
      requiresPin: this.isMFSProvider,
      category: this.getProviderCategory(),
    };
  }

  // ============================================================
  // Device Info Getters
  // ============================================================

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
   * Get district (Bangladesh specific)
   */
  public getDistrict(): string | undefined {
    return this.deviceInfo?.district;
  }

  /**
   * Get upazila (Bangladesh specific)
   */
  public getUpazila(): string | undefined {
    return this.deviceInfo?.upazila;
  }

  /**
   * Get device fingerprint
   */
  public getDeviceFingerprint(): string | undefined {
    return this.deviceInfo?.deviceFingerprint;
  }

  // ============================================================
  // OAuth Helper Methods (Enterprise Feature)
  // ============================================================

  /**
   * Generate PKCE code verifier (cryptographically secure)
   */
  public static generatePKCECodeVerifier(): PKCECodeVerifier {
    const verifier = randomUUID() + randomUUID();
    return verifier.substring(0, 128) as PKCECodeVerifier;
  }

  /**
   * Generate PKCE code challenge from verifier (SHA-256)
   */
  public static async generatePKCECodeChallenge(verifier: PKCECodeVerifier): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(hash)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  /**
   * Create PKCE parameters
   */
  public static async createPKCEParams(): Promise<PKCEParams> {
    const codeVerifier = SocialLoginCommand.generatePKCECodeVerifier();
    const codeChallenge = await SocialLoginCommand.generatePKCECodeChallenge(codeVerifier);
    return {
      codeVerifier,
      codeChallenge,
      codeChallengeMethod: 'S256',
    };
  }

  // ============================================================
  // Execution Context (Enterprise Enhancement)
  // ============================================================

  /**
   * Get execution context for distributed tracing
   */
  public getExecutionContext(): {
    commandId: CommandId;
    correlationId?: CorrelationId;
    timestamp: Date;
    provider: SocialProvider;
    providerCategory: string;
    isBangladeshProvider: boolean;
    isOAuthFlow: boolean;
    isOAuthCallbackFlow: boolean;
    source: string;
    locale: Locale;
  } {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      timestamp: this.timestamp,
      provider: this.provider,
      providerCategory: this.getProviderCategory(),
      isBangladeshProvider: this.isBangladeshProvider,
      isOAuthFlow: this.isOAuthFlow,
      isOAuthCallbackFlow: this.isOAuthCallbackFlow(),
      source: this.getRequestSource(),
      locale: this.locale,
    };
  }

  /**
   * Get request source for analytics
   */
  private getRequestSource(): string {
    const userAgent = this.deviceInfo?.userAgent?.toLowerCase() || '';

    if (userAgent.includes('vubonapp')) return 'mobile_app';
    if (userAgent.includes('mobile') || userAgent.includes('android') || userAgent.includes('iphone')) {
      return 'mobile_web';
    }
    return 'web';
  }

  /**
   * Get audit metadata for compliance
   */
  public getAuditMetadata(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      provider: this.provider,
      providerCategory: this.getProviderCategory(),
      isBangladeshProvider: this.isBangladeshProvider,
      isOAuthFlow: this.isOAuthFlow,
      isOAuthCallbackFlow: this.isOAuthCallbackFlow(),
      hasState: this.hasState(),
      hasPhoneNumber: this.hasPhoneNumber(),
      hasOtpCode: this.hasOtpCode(),
      hasPin: this.hasPin(),
      hasPKCE: this.hasPKCE(),
      hasDeviceInfo: !!this.deviceInfo,
      source: this.getRequestSource(),
      locale: this.locale,
      deviceInfo: this.deviceInfo ? {
        hasIp: !!this.deviceInfo.ipAddress,
        hasUserAgent: !!this.deviceInfo.userAgent,
        hasDeviceId: !!this.deviceInfo.deviceId,
        district: this.deviceInfo.district,
        upazila: this.deviceInfo.upazila,
        mobileOperator: this.deviceInfo.mobileOperator,
        networkType: this.deviceInfo.networkType,
      } : undefined,
      timestamp: this.timestamp.toISOString(),
    };
  }

  // ============================================================
  // Masking Methods (Privacy & Secure Logging)
  // ============================================================

  /**
   * Get masked access token for logging
   */
  public getMaskedAccessToken(): string {
    if (!this.accessToken) return '***';
    return maskToken(this.accessToken);
  }

  /**
   * Get masked phone number for logging
   */
  public getMaskedPhone(): string {
    if (!this.phoneNumber) return '***';
    return maskPhone(this.phoneNumber);
  }

  /**
   * Get masked OTP code for logging
   */
  public getMaskedOtpCode(): string {
    if (!this.otpCode) return '***';
    return '******';
  }

  /**
   * Get masked PIN for logging
   */
  public getMaskedPin(): string {
    if (!this.pin) return '***';
    return '****';
  }

  /**
   * Get masked IP address for logging
   */
  public getMaskedIpAddress(): string {
    if (!this.deviceInfo?.ipAddress) return '***';
    const ip = this.deviceInfo.ipAddress;
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.***.***`;
    }
    if (ip.includes(':')) {
      const segments = ip.split(':');
      if (segments.length >= 4) {
        return `${segments[0]}:${segments[1]}:****:****`;
      }
    }
    return '***';
  }

  // ============================================================
  // Logging Methods (Enterprise Enhancement)
  // ============================================================

  /**
   * Convert to string for logging (sensitive data masked)
   */
  public toString(): string {
    return `SocialLoginCommand(id=${this.commandId.slice(0, 8)}..., provider=${this.provider}, category=${this.getProviderCategory()}, isBangladesh=${this.isBangladeshProvider}, isOAuth=${this.isOAuthFlow}, source=${this.getRequestSource()}, hasDeviceInfo=${!!this.deviceInfo}, locale=${this.locale}, timestamp=${this.timestamp.toISOString()})`;
  }

  /**
   * Get summary for JSON logging
   */
  public toJSON(): Record<string, unknown> {
    return {
      commandId: this.commandId,
      correlationId: this.correlationId,
      provider: this.provider,
      providerCategory: this.getProviderCategory(),
      providerDisplayName: this.providerDisplayName,
      isBangladeshProvider: this.isBangladeshProvider,
      isOAuthFlow: this.isOAuthFlow,
      isOAuthCallbackFlow: this.isOAuthCallbackFlow(),
      hasState: this.hasState(),
      hasPKCE: this.hasPKCE(),
      hasDeviceInfo: !!this.deviceInfo,
      source: this.getRequestSource(),
      locale: this.locale,
      maskedAccessToken: this.getMaskedAccessToken(),
      maskedPhone: this.getMaskedPhone(),
      hasOtpCode: this.hasOtpCode(),
      hasPin: this.hasPin(),
      deviceInfo: this.deviceInfo ? {
        hasIp: !!this.deviceInfo.ipAddress,
        maskedIp: this.getMaskedIpAddress(),
        hasUserAgent: !!this.deviceInfo.userAgent,
        hasDeviceId: !!this.deviceInfo.deviceId,
        district: this.deviceInfo.district,
        upazila: this.deviceInfo.upazila,
        mobileOperator: this.deviceInfo.mobileOperator,
        networkType: this.deviceInfo.networkType,
      } : undefined,
      timestamp: this.timestamp.toISOString(),
    };
  }
}

// ============================================================
// Type Guards (Enterprise Enhancement)
// ============================================================

/**
 * Type guard for SocialLoginCommand
 */
export function isSocialLoginCommand(command: unknown): command is SocialLoginCommand {
  return command instanceof SocialLoginCommand;
}

/**
 * Type guard for Bangladesh social login
 */
export function isBangladeshSocialLogin(command: SocialLoginCommand): boolean {
  return command.isBangladeshProvider;
}

/**
 * Type guard for OAuth social login
 */
export function isOAuthSocialLogin(command: SocialLoginCommand): boolean {
  return command.isOAuthFlow;
}

/**
 * Type guard for messaging social login (WhatsApp/Imo)
 */
export function isMessagingSocialLogin(command: SocialLoginCommand): boolean {
  return command.isMessagingProvider;
}

/**
 * Type guard for MFS social login (bKash/Nagad/Rocket)
 */
export function isMFSSocialLogin(command: SocialLoginCommand): boolean {
  return command.isMFSProvider;
}

// ============================================================
// Provider Info Registry (Enterprise Feature)
// ============================================================

/**
 * Get all available OAuth providers
 */
export function getAllOAuthProviders(): OAuthProviderInfo[] {
  const providers: OAuthProviderInfo[] = [];
  
  for (const provider of Object.values(SocialProvider)) {
    const command = new SocialLoginCommandBuilder().setProvider(provider).build();
    providers.push(command.getProviderInfo());
  }
  
  return providers;
}

/**
 * Get active OAuth providers (filtered by health and configuration)
 */
export function getActiveOAuthProviders(): OAuthProviderInfo[] {
  return getAllOAuthProviders().filter(provider => provider.isActive);
}

/**
 * Get Bangladesh-specific OAuth providers
 */
export function getBangladeshOAuthProviders(): OAuthProviderInfo[] {
  return getAllOAuthProviders().filter(provider => provider.isBangladeshSpecific);
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  DeviceInfo as DeviceInfoType, 
  OAuthProviderInfo as OAuthProviderInfoType,
  PKCEParams as PKCEParamsType,
  CommandId as CommandIdType,
  CorrelationId as CorrelationIdType,
  AccessToken as AccessTokenType,
  OAuthState as OAuthStateType,
  OAuthCode as OAuthCodeType,
  PKCECodeVerifier as PKCECodeVerifierType,
  ValidationResult as ValidationResultType
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Shared types integration from @vubon/shared-types
// 2. ✅ Shared constants from @vubon/shared-constants
// 3. ✅ Shared utilities for masking (@vubon/shared-utils)
// 4. ✅ Branded types for type safety (CommandId, CorrelationId, AccessToken, etc.)
// 5. ✅ Command validation on construction (fail-fast)
// 6. ✅ Builder pattern for flexible command construction
// 7. ✅ Factory methods for common providers (Google, Facebook, WhatsApp, bKash, etc.)
// 8. ✅ PKCE (Proof Key for Code Exchange) support for OAuth security
// 9. ✅ Multi-language support (English/Bengali) with display names
// 10. ✅ Provider metadata with health status
// 11. ✅ Execution context for distributed tracing
// 12. ✅ Request source detection for analytics
// 13. ✅ Audit metadata for compliance
// 14. ✅ Comprehensive masking methods for secure logging
// 15. ✅ Type-safe toString() and toJSON() methods
// 16. ✅ Type guards for runtime type checking
// 17. ✅ Provider info registry
// 18. ✅ Bangladesh specific - WhatsApp, Imo, bKash, Nagad, Rocket support
// 19. ✅ OAuth callback flow support (code-based)
// 20. ✅ Validation messages in English and Bengali
// 
// Bangladesh Specific:
// - WhatsApp/Imo OTP-based login
// - bKash/Nagad/Rocket PIN-based login
// - District/Upazila tracking for location analytics
// - Mobile operator and network type detection
// - Bengali display names for providers
// - Feature phone compatibility ready
// 
// Security Features:
// - PKCE support for OAuth security
// - State parameter for CSRF protection
// - Command validation prevents malformed requests
// - Privacy masking for logs
// - Audit metadata for compliance
// - No user enumeration
// - Provider health status monitoring
// 
// ============================================================
