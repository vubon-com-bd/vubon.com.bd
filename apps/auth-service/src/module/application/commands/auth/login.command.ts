/**
 * Login Command - Pure Command Data Structure
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/commands/auth/login.command
 * 
 * @description
 * Command for authenticating a user with email and password.
 * Contains all necessary data for login use case including device context.
 * 
 * Enterprise Rules:
 * ✅ Immutable command data
 * ✅ Self-contained use case data
 * ✅ No business logic
 * ✅ No validation (handled by handler)
 * ✅ Framework-free
 * ✅ Bangladesh specific - Network type and mobile operator tracking
 */

import { randomUUID } from 'crypto';

// ============================================================
// Types
// ============================================================

/**
 * Device information for login tracking (Bangladesh specific)
 */
export interface LoginDeviceInfo {
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
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  
  /** Network type (2G, 3G, 4G, 5G, WiFi) */
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  
  /** Screen resolution for fingerprinting */
  screenResolution?: string;
  
  /** Browser language */
  language?: string;
  
  /** Timezone */
  timezone?: string;
}

/**
 * Login method type
 */
export type LoginMethod = 'email' | 'phone' | 'username' | 'otp';

// ============================================================
// Login Command
// ============================================================

/**
 * Login Command
 * 
 * @example
 * const command = new LoginCommand(
 *   'user@vubon.com.bd',
 *   'MyP@ssw0rd123',
 *   {
 *     ipAddress: '192.168.1.100',
 *     userAgent: 'Mozilla/5.0...',
 *     deviceId: 'device_456',
 *     sessionId: 'sess_abc123',
 *     district: 'Dhaka',
 *     mobileOperator: 'gp',
 *     networkType: '4g'
 *   },
 *   true,
 *   'captcha_token_123',
 *   'corr_abc123'
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
    
    /** Login method (default: 'email') */
    method?: LoginMethod
  ) {
    this.commandId = randomUUID();
    this.timestamp = new Date();
    this.method = method ?? this.detectMethod(identifier);
    this.rememberMe = rememberMe ?? false;
  }
  
  /**
   * Detect login method from identifier format
   * @param identifier - Email, phone, or username
   * @returns Detected login method
   */
  private detectMethod(identifier: string): LoginMethod {
    // Check if it's an email
    if (identifier.includes('@') && identifier.includes('.')) {
      return 'email';
    }
    
    // Check if it's a Bangladesh phone number (starts with +880 or 01)
    if (/^(\+8801|01)[3-9]\d{8}$/.test(identifier)) {
      return 'phone';
    }
    
    // Default to username
    return 'username';
  }
  
  /**
   * Get the email from identifier if it's an email login
   */
  getEmail(): string | null {
    return this.method === 'email' ? this.identifier : null;
  }
  
  /**
   * Get the phone number from identifier if it's a phone login
   */
  getPhoneNumber(): string | null {
    if (this.method !== 'phone') return null;
    
    // Normalize phone number to E.164 format
    let phone = this.identifier;
    if (phone.startsWith('0')) {
      phone = `+88${phone}`;
    }
    if (!phone.startsWith('+')) {
      phone = `+${phone}`;
    }
    return phone;
  }
  
  /**
   * Get the username from identifier if it's a username login
   */
  getUsername(): string | null {
    return this.method === 'username' ? this.identifier : null;
  }
  
  /**
   * Check if this is an OTP login
   */
  isOtpLogin(): boolean {
    return this.method === 'otp';
  }
  
  /**
   * Check if this is a password-based login
   */
  isPasswordLogin(): boolean {
    return this.method === 'email' || this.method === 'phone' || this.method === 'username';
  }
  
  /**
   * Get masked identifier for logging (privacy)
   */
  getMaskedIdentifier(): string {
    if (this.method === 'email') {
      const [username, domain] = this.identifier.split('@');
      if (username && username.length > 2) {
        return `${username[0]}***${username[username.length - 1]}@${domain}`;
      }
      return `${username?.substring(0, 2)}***@${domain}`;
    }
    
    if (this.method === 'phone') {
      const phone = this.identifier.replace(/\D/g, '');
      if (phone.length >= 10) {
        return phone.slice(0, -6) + '******' + phone.slice(-2);
      }
      return '***';
    }
    
    // Username - mask partially
    if (this.identifier.length > 4) {
      return this.identifier.slice(0, 2) + '***' + this.identifier.slice(-2);
    }
    return '***';
  }
}

// ============================================================
// Phone Login Command (Bangladesh specific)
// ============================================================

/**
 * Phone Login Command
 * Specialized command for phone-based authentication
 * 
 * @example
 * const command = new PhoneLoginCommand(
 *   '+8801712345678',
 *   'MyP@ssw0rd123',
 *   { ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0...' }
 * );
 */
export class PhoneLoginCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly method: LoginMethod = 'phone';
  
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
  }
  
  /**
   * Get normalized phone number in E.164 format
   */
  getNormalizedPhone(): string {
    let phone = this.phoneNumber;
    if (phone.startsWith('0')) {
      phone = `+88${phone}`;
    }
    if (!phone.startsWith('+')) {
      phone = `+${phone}`;
    }
    return phone;
  }
  
  /**
   * Get masked phone number for logging
   */
  getMaskedPhone(): string {
    const phone = this.getNormalizedPhone();
    if (phone.length >= 13) {
      return phone.slice(0, 6) + '******' + phone.slice(-2);
    }
    return '***';
  }
}

// ============================================================
// OTP Login Command (Bangladesh specific - passwordless)
// ============================================================

/**
 * OTP Login Command
 * For passwordless authentication via SMS/WhatsApp OTP
 * 
 * @example
 * const command = new OtpLoginCommand(
 *   '+8801712345678',
 *   '123456',
 *   { ipAddress: '192.168.1.100', userAgent: 'Mozilla/5.0...' }
 * );
 */
export class OtpLoginCommand {
  public readonly commandId: string;
  public readonly timestamp: Date;
  public readonly method: LoginMethod = 'otp';
  
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
  }
  
  /**
   * Get normalized phone number in E.164 format
   */
  getNormalizedPhone(): string {
    let phone = this.phoneNumber;
    if (phone.startsWith('0')) {
      phone = `+88${phone}`;
    }
    if (!phone.startsWith('+')) {
      phone = `+${phone}`;
    }
    return phone;
  }
  
  /**
   * Get masked phone number for logging
   */
  getMaskedPhone(): string {
    const phone = this.getNormalizedPhone();
    if (phone.length >= 13) {
      return phone.slice(0, 6) + '******' + phone.slice(-2);
    }
    return '***';
  }
  
  /**
   * Check if OTP code is valid format (6 digits)
   */
  hasValidOtpFormat(): boolean {
    return /^\d{6}$/.test(this.otpCode);
  }
}

// ============================================================
// Type Exports
// ============================================================

export type { LoginDeviceInfo as LoginDeviceInfoType, LoginMethod as LoginMethodType };
