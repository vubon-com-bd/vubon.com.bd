/**
 * Login Command - Pure Command Data Structure (Enterprise Enhanced)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/login.command
 * 
 * @description
 * Command for authenticating a user with email and password.
 * Contains all necessary data for login use case including device context.
 * 
 * ✅ Enterprise Features:
 * - Shared types integration (@vubon/shared-types)
 * - Shared constants for patterns (@vubon/shared-constants)
 * - Shared utilities for phone normalization (@vubon/shared-utils)
 * - Bangladesh specific fields (district, upazila, mobileOperator, networkType)
 * - Privacy-friendly masking methods
 * - Immutable command data with readonly properties
 * - Factory methods for specialized commands
 */

import { randomUUID } from 'crypto';

// ✅ Phase-1: Shared packages import (Enterprise enhancement)
import type { 
  DeviceInfo as SharedDeviceInfo,
  LoginMethod as SharedLoginMethod,
  MobileOperator as SharedMobileOperator,
  NetworkType as SharedNetworkType
} from '@vubon/shared-types';

import { 
  PHONE_PATTERNS,
  LOGIN_METHODS,
  MOBILE_OPERATORS,
  NETWORK_TYPES
} from '@vubon/shared-constants';

import { normalizePhone, maskPhone, isValidBdMobile } from '@vubon/shared-utils';

// ============================================================
// Types (using shared types for consistency)
// ============================================================

/**
 * Device information for login tracking (Bangladesh specific)
 * ✅ Enhanced: Now extends SharedDeviceInfo for type safety
 */
export interface LoginDeviceInfo extends Partial<SharedDeviceInfo> {
  /** IP address of the request */
  ipAddress?: string;
  
  /** User agent string */
  userAgent?: string;
  
  /** Device identifier */
  deviceId?: string;
  
  /** Session ID (if resuming a session) */
  sessionId?: string;
  
  /** Correlation ID for distributed tracing */
  correlationId?: string;
  
  // Bangladesh specific fields
  /** Detected district from IP (infrastructure will enrich) */
  district?: string;
  
  /** Detected upazila from IP (infrastructure will enrich) */
  upazila?: string;
  
  /** Mobile operator (GP, Robi, Banglalink, Teletalk) */
  mobileOperator?: SharedMobileOperator;
  
  /** Network type (2G, 3G, 4G, 5G, WiFi) */
  networkType?: SharedNetworkType;
  
  /** Screen resolution for fingerprinting */
  screenResolution?: string;
  
  /** Browser language */
  language?: string;
  
  /** Timezone */
  timezone?: string;
}

/**
 * Login method type (using shared constants)
 */
export type LoginMethod = SharedLoginMethod;

// ============================================================
// Login Command (Enhanced)
// ============================================================

/**
 * Login Command
 * 
 * ✅ Enterprise Enhancement: 
 * - Added factory method for creating from request
 * - Added validation helpers
 * - Integrated shared utilities
 * 
 * @example
 * const command = LoginCommand.fromRequest(
 *   'user@vubon.com.bd',
 *   'MyP@ssw0rd123',
 *   { ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0...' }
 * );
 */
export class LoginCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly method: LoginMethod;
  
  constructor(
    /** User identifier (email, phone, or username) */
    public readonly identifier: string,
    
    /** User password (optional for OTP login) */
    public readonly password?: string,
    
    /** Device information for security tracking */
    public readonly deviceInfo?: LoginDeviceInfo,
    
    /** Whether to remember the device for extended session */
    public readonly rememberMe: boolean = false,
    
    /** CAPTCHA token for rate limiting prevention */
    public readonly captchaToken?: string,
    
    /** Correlation ID for distributed tracing */
    public readonly correlationId?: string,
    
    /** Login method (default: auto-detect) */
    method?: LoginMethod
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.method = method ?? this.detectMethod(identifier);
    this.rememberMe = rememberMe ?? false;
  }
  
  // ============================================================
  // Factory Methods (Enterprise Enhancement)
  // ============================================================
  
  /**
   * Create LoginCommand from request data (convenience factory)
   */
  public static fromRequest(
    identifier: string,
    password: string,
    deviceInfo?: LoginDeviceInfo,
    rememberMe?: boolean,
    captchaToken?: string
  ): LoginCommand {
    return new LoginCommand(
      identifier,
      password,
      deviceInfo,
      rememberMe,
      captchaToken,
      deviceInfo?.correlationId
    );
  }
  
  /**
   * Create LoginCommand for email login
   */
  public static forEmail(
    email: string,
    password: string,
    deviceInfo?: LoginDeviceInfo,
    rememberMe?: boolean
  ): LoginCommand {
    return new LoginCommand(email, password, deviceInfo, rememberMe);
  }
  
  /**
   * Create LoginCommand for phone login
   */
  public static forPhone(
    phoneNumber: string,
    password: string,
    deviceInfo?: LoginDeviceInfo,
    rememberMe?: boolean
  ): LoginCommand {
    const normalizedPhone = normalizePhone(phoneNumber, 'BD') ?? phoneNumber;
    return new LoginCommand(normalizedPhone, password, deviceInfo, rememberMe);
  }
  
  // ============================================================
  // Detection Methods
  // ============================================================
  
  /**
   * Detect login method from identifier format
   * ✅ Enhanced: Uses shared constants for patterns
   */
  private detectMethod(identifier: string): LoginMethod {
    // Check if it's an email
    if (identifier.includes('@') && identifier.includes('.')) {
      return LOGIN_METHODS.EMAIL;
    }
    
    // Check if it's a Bangladesh phone number
    if (PHONE_PATTERNS.BANGLADESH.test(identifier) || isValidBdMobile(identifier)) {
      return LOGIN_METHODS.PHONE;
    }
    
    // Default to username
    return LOGIN_METHODS.USERNAME;
  }
  
  // ============================================================
  // Getters
  // ============================================================
  
  /**
   * Get the email from identifier if it's an email login
   */
  getEmail(): string | null {
    return this.method === LOGIN_METHODS.EMAIL ? this.identifier : null;
  }
  
  /**
   * Get the phone number from identifier if it's a phone login
   * ✅ Enhanced: Uses shared utility for normalization
   */
  getPhoneNumber(): string | null {
    if (this.method !== LOGIN_METHODS.PHONE) return null;
    return normalizePhone(this.identifier, 'BD');
  }
  
  /**
   * Get the username from identifier if it's a username login
   */
  getUsername(): string | null {
    return this.method === LOGIN_METHODS.USERNAME ? this.identifier : null;
  }
  
  // ============================================================
  // Check Methods
  // ============================================================
  
  /**
   * Check if this is an OTP login
   */
  isOtpLogin(): boolean {
    return this.method === LOGIN_METHODS.OTP;
  }
  
  /**
   * Check if this is a password-based login
   */
  isPasswordLogin(): boolean {
    return this.method === LOGIN_METHODS.EMAIL || 
           this.method === LOGIN_METHODS.PHONE || 
           this.method === LOGIN_METHODS.USERNAME;
  }
  
  /**
   * Check if the identifier is a valid email format
   */
  isValidEmail(): boolean {
    return this.method === LOGIN_METHODS.EMAIL && 
           /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(this.identifier);
  }
  
  /**
   * Check if the identifier is a valid Bangladesh mobile number
   */
  isValidBangladeshMobile(): boolean {
    if (this.method !== LOGIN_METHODS.PHONE) return false;
    return isValidBdMobile(this.identifier);
  }
  
  // ============================================================
  // Masking Methods (Privacy)
  // ============================================================
  
  /**
   * Get masked identifier for logging (privacy)
   * ✅ Enhanced: Uses shared utility for phone masking
   */
  getMaskedIdentifier(): string {
    if (this.method === LOGIN_METHODS.EMAIL) {
      const [username, domain] = this.identifier.split('@');
      if (username && username.length > 2) {
        return `${username[0]}***${username[username.length - 1]}@${domain}`;
      }
      return `${username?.substring(0, 2)}***@${domain}`;
    }
    
    if (this.method === LOGIN_METHODS.PHONE) {
      return maskPhone(this.identifier);
    }
    
    // Username - mask partially
    if (this.identifier.length > 4) {
      return this.identifier.slice(0, 2) + '***' + this.identifier.slice(-2);
    }
    return '***';
  }
}

// ============================================================
// Phone Login Command (Specialized - Bangladesh specific)
// ============================================================

/**
 * Phone Login Command
 * Specialized command for phone-based authentication
 * 
 * ✅ Enterprise Enhancement: Added factory method and validation
 * 
 * @example
 * const command = PhoneLoginCommand.fromRequest(
 *   '+8801712345678',
 *   'MyP@ssw0rd123',
 *   { ipAddress: '192.168.1.100' }
 * );
 */
export class PhoneLoginCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly method: LoginMethod = LOGIN_METHODS.PHONE;
  public readonly normalizedPhone: string;
  
  constructor(
    public readonly phoneNumber: string,
    public readonly password: string,
    public readonly deviceInfo?: LoginDeviceInfo,
    public readonly rememberMe: boolean = false,
    public readonly captchaToken?: string,
    public readonly correlationId?: string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.rememberMe = rememberMe ?? false;
    this.normalizedPhone = normalizePhone(phoneNumber, 'BD') ?? phoneNumber;
  }
  
  /**
   * Factory method for creating from request
   */
  public static fromRequest(
    phoneNumber: string,
    password: string,
    deviceInfo?: LoginDeviceInfo,
    rememberMe?: boolean
  ): PhoneLoginCommand {
    return new PhoneLoginCommand(
      phoneNumber,
      password,
      deviceInfo,
      rememberMe,
      undefined,
      deviceInfo?.correlationId
    );
  }
  
  /**
   * Get normalized phone number in E.164 format
   * ✅ Now returns cached value
   */
  getNormalizedPhone(): string {
    return this.normalizedPhone;
  }
  
  /**
   * Get masked phone number for logging
   */
  getMaskedPhone(): string {
    return maskPhone(this.normalizedPhone);
  }
  
  /**
   * Check if phone number is valid Bangladesh mobile
   */
  isValidBangladeshMobile(): boolean {
    return isValidBdMobile(this.phoneNumber);
  }
}

// ============================================================
// OTP Login Command (Passwordless - Bangladesh specific)
// ============================================================

/**
 * OTP Login Command
 * For passwordless authentication via SMS/WhatsApp OTP
 * 
 * ✅ Enterprise Enhancement: Added OTP validation and factory method
 * 
 * @example
 * const command = OtpLoginCommand.fromRequest(
 *   '+8801712345678',
 *   '123456',
 *   { ipAddress: '192.168.1.100' }
 * );
 */
export class OtpLoginCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly method: LoginMethod = LOGIN_METHODS.OTP;
  public readonly normalizedPhone: string;
  
  constructor(
    public readonly phoneNumber: string,
    public readonly otpCode: string,
    public readonly deviceInfo?: LoginDeviceInfo,
    public readonly rememberMe: boolean = false,
    public readonly sessionId?: string,
    public readonly correlationId?: string
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.rememberMe = rememberMe ?? false;
    this.normalizedPhone = normalizePhone(phoneNumber, 'BD') ?? phoneNumber;
  }
  
  /**
   * Factory method for creating from request
   */
  public static fromRequest(
    phoneNumber: string,
    otpCode: string,
    deviceInfo?: LoginDeviceInfo,
    rememberMe?: boolean
  ): OtpLoginCommand {
    return new OtpLoginCommand(
      phoneNumber,
      otpCode,
      deviceInfo,
      rememberMe,
      undefined,
      deviceInfo?.correlationId
    );
  }
  
  /**
   * Get normalized phone number in E.164 format
   */
  getNormalizedPhone(): string {
    return this.normalizedPhone;
  }
  
  /**
   * Get masked phone number for logging
   */
  getMaskedPhone(): string {
    return maskPhone(this.normalizedPhone);
  }
  
  /**
   * Check if OTP code is valid format (6 digits)
   */
  hasValidOtpFormat(): boolean {
    return /^\d{6}$/.test(this.otpCode);
  }
  
  /**
   * Check if phone number is valid Bangladesh mobile
   */
  isValidBangladeshMobile(): boolean {
    return isValidBdMobile(this.phoneNumber);
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { LoginDeviceInfo as LoginDeviceInfoType, LoginMethod as LoginMethodType };
