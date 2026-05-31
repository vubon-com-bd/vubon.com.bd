/**
 * Device ID Value Object - Pure Domain Core
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/value-objects/device-id.vo
 * 
 * @description
 * Represents a unique device identifier for fingerprinting and trust management.
 * Used for device tracking, MFA trust, and session management.
 * 
 * Enterprise Rules:
 * ✅ Immutable - Device ID never changes after creation
 * ✅ Self-validating - Validates format and constraints
 * ✅ Normalized - Consistent format for equality
 * ✅ Framework-free - No external dependencies
 * ✅ Bangladesh specific - Mobile operator detection ready
 * 
 * Supported formats:
 * - UUID v4: 550e8400-e29b-41d4-a716-446655440000
 * - Fingerprint hash: a1b2c3d4e5f6g7h8i9j0
 * - Browser fingerprint: fp_abc123def456
 * - Mobile device ID: ANDROID_abc123, IOS_def456
 * - Custom format: alphanumeric, hyphens, underscores, dots, colons
 * - Bangladesh mobile: BD_MOBILE_017xxxxxxxx
 * 
 * @example
 * const deviceId = new DeviceId('550e8400-e29b-41d4-a716-446655440000');
 * console.log(deviceId.getValue()); // '550e8400-e29b-41d4-a716-446655440000'
 * console.log(deviceId.isUuid()); // true
 */

import { ValueObject } from './base.vo';

// ==================== Types ====================

/**
 * Device ID validation result
 */
export interface DeviceIdValidation {
  isValid: boolean;
  normalized?: string;
  error?: string;
}

/**
 * Device type based on ID pattern
 */
export type DeviceIdType = 'uuid' | 'fingerprint' | 'mobile' | 'browser' | 'standard' | 'unknown';

/**
 * Device platform type
 */
export type DevicePlatform = 'web' | 'android' | 'ios' | 'mobile_web' | 'desktop' | 'unknown';

// ==================== Constants ====================

export const DEVICE_ID_CONSTANTS = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 512,
  DEFAULT_LENGTH: 64,
  
  // Supported ID patterns
  PATTERNS: {
    UUID_V4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    UUID_V1: /^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
    FINGERPRINT_HASH: /^[a-f0-9]{32,128}$/i,
    BROWSER_FINGERPRINT: /^fp_[a-zA-Z0-9]{16,64}$/,
    MOBILE_ANDROID: /^ANDROID_[a-zA-Z0-9]{16,64}$/i,
    MOBILE_IOS: /^IOS_[a-zA-Z0-9]{16,64}$/i,
    // Bangladesh specific mobile device pattern
    MOBILE_BD: /^BD_MOBILE_01[3-9][0-9]{8}$/i,
    // Generic alphanumeric with separators
    STANDARD: /^[a-zA-Z0-9\-_.:]{1,512}$/,
  },
  
  // Ephemeral/private browsing indicators
  EPHEMERAL_PATTERNS: [
    'private', 'incognito', 'temporary', 'unknown', '0', 'null', 'undefined',
    'anonymous', 'guest', 'temp',
  ],
} as const;

// ==================== Device ID Value Object ====================

/**
 * Device ID Value Object
 * 
 * Represents a unique identifier for a device.
 * Used for:
 * - Device fingerprinting
 * - Session management
 * - MFA trust decisions
 * - Security event tracking
 */
export class DeviceId extends ValueObject {
  private readonly _value: string;
  private readonly _normalized: string;
  private readonly _timestamp?: Date;
  private readonly _platform: DevicePlatform;
  private readonly _deviceType: DeviceIdType;

  /**
   * Creates a new Device ID value object
   * 
   * @param deviceId - Raw device identifier string
   * @param timestamp - Optional timestamp when device was first seen
   * @throws {Error} If device ID is invalid
   */
  constructor(deviceId: string, timestamp?: Date) {
    super();
    
    const validation = DeviceId.validate(deviceId);
    if (!validation.isValid) {
      throw new Error(`Invalid Device ID: ${validation.error}`);
    }
    
    this._value = deviceId.trim();
    this._normalized = validation.normalized || this.normalize(deviceId);
    this._timestamp = timestamp;
    this._platform = this.detectPlatform(this._value);
    this._deviceType = this.detectType(this._value);
    
    // Auto-validation
    this.validate();
  }

  /**
   * Protected validation method
   */
  protected validate(): void {
    if (this.isEmpty()) {
      throw new Error('Device ID cannot be empty');
    }
    
    if (this._value.length > DEVICE_ID_CONSTANTS.MAX_LENGTH) {
      throw new Error(`Device ID too long (max ${DEVICE_ID_CONSTANTS.MAX_LENGTH} characters)`);
    }
  }

  // ============================================================
  // Factory Methods
  // ============================================================

  /**
   * Static factory method for creating DeviceId from known valid value
   * (Skips validation for performance - use only when value is trusted)
   */
  public static fromValid(deviceId: string, timestamp?: Date): DeviceId {
    const instance = new DeviceId(deviceId, timestamp);
    // Validation already happened in constructor
    return instance;
  }

  /**
   * Creates a DeviceId from unknown input (safe parsing)
   */
  public static tryCreate(deviceId: unknown, timestamp?: Date): DeviceId | null {
    if (typeof deviceId !== 'string') {
      return null;
    }
    
    try {
      return new DeviceId(deviceId, timestamp);
    } catch {
      return null;
    }
  }

  /**
   * Create a DeviceId for a new device (generates a new fingerprint)
   * This is a pure domain function - no external dependencies
   */
  public static generateNew(platform: DevicePlatform = 'web'): DeviceId {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    const counter = (DeviceId._counter = (DeviceId._counter || 0) + 1);
    
    let prefix = 'fp';
    if (platform === 'android') prefix = 'ANDROID';
    if (platform === 'ios') prefix = 'IOS';
    
    const deviceId = `${prefix}_${timestamp}_${random}_${counter}`;
    return new DeviceId(deviceId, new Date());
  }
  
  private static _counter = 0;

  // ============================================================
  // Validation Methods
  // ============================================================

  /**
   * Validates a device ID string
   * 
   * @param deviceId - The device ID to validate
   * @returns Validation result with normalized value if valid
   */
  public static validate(deviceId: string): DeviceIdValidation {
    // Check if empty
    if (!deviceId || typeof deviceId !== 'string') {
      return {
        isValid: false,
        error: 'Device ID cannot be null or undefined',
      };
    }

    const trimmed = deviceId.trim();
    
    // Check length constraints
    if (trimmed.length === 0) {
      return {
        isValid: false,
        error: 'Device ID cannot be empty',
      };
    }
    
    if (trimmed.length > DEVICE_ID_CONSTANTS.MAX_LENGTH) {
      return {
        isValid: false,
        error: `Device ID too long (max ${DEVICE_ID_CONSTANTS.MAX_LENGTH} characters)`,
      };
    }

    // Check format against supported patterns
    let isValidFormat = false;

    for (const pattern of Object.values(DEVICE_ID_CONSTANTS.PATTERNS)) {
      if (pattern.test(trimmed)) {
        isValidFormat = true;
        break;
      }
    }

    if (!isValidFormat) {
      return {
        isValid: false,
        error: 'Device ID contains invalid characters or format. Allowed: alphanumeric, hyphens, underscores, dots, colons',
      };
    }

    // Normalize and return
    const normalized = DeviceId.normalize(trimmed);
    
    return {
      isValid: true,
      normalized,
      error: undefined,
    };
  }

  /**
   * Normalize a device ID to canonical form
   * - Lowercase for case-insensitive comparison
   * - Trim whitespace
   * - Remove duplicate separators
   */
  private static normalize(deviceId: string): string {
    return deviceId
      .trim()
      .toLowerCase()
      .replace(/-{2,}/g, '-')      // Replace multiple hyphens with single
      .replace(/_{2,}/g, '_')       // Replace multiple underscores with single
      .replace(/\.{2,}/g, '.')      // Replace multiple dots with single
      .replace(/:{2,}/g, ':');      // Replace multiple colons with single
  }

  /**
   * Detect device platform from ID pattern
   */
  private detectPlatform(deviceId: string): DevicePlatform {
    const id = deviceId.toLowerCase();
    
    if (id.startsWith('android_')) return 'android';
    if (id.startsWith('ios_')) return 'ios';
    if (id.startsWith('bd_mobile_')) return 'mobile_web';
    if (id.startsWith('fp_')) return 'web';
    if (DEVICE_ID_CONSTANTS.PATTERNS.MOBILE_ANDROID.test(id)) return 'android';
    if (DEVICE_ID_CONSTANTS.PATTERNS.MOBILE_IOS.test(id)) return 'ios';
    
    return 'unknown';
  }

  /**
   * Detect device ID type
   */
  private detectType(deviceId: string): DeviceIdType {
    const id = deviceId;
    
    if (DEVICE_ID_CONSTANTS.PATTERNS.UUID_V4.test(id)) return 'uuid';
    if (DEVICE_ID_CONSTANTS.PATTERNS.UUID.test(id)) return 'uuid';
    if (DEVICE_ID_CONSTANTS.PATTERNS.BROWSER_FINGERPRINT.test(id)) return 'browser';
    if (DEVICE_ID_CONSTANTS.PATTERNS.FINGERPRINT_HASH.test(id)) return 'fingerprint';
    if (DEVICE_ID_CONSTANTS.PATTERNS.MOBILE_ANDROID.test(id)) return 'mobile';
    if (DEVICE_ID_CONSTANTS.PATTERNS.MOBILE_IOS.test(id)) return 'mobile';
    if (DEVICE_ID_CONSTANTS.PATTERNS.MOBILE_BD.test(id)) return 'mobile';
    
    return 'standard';
  }

  // ============================================================
  // Instance Methods
  // ============================================================

  /**
   * Instance normalization
   */
  private normalize(deviceId: string): string {
    return DeviceId.normalize(deviceId);
  }

  /**
   * Get the raw device ID value
   */
  public getValue(): string {
    return this._value;
  }

  /**
   * Get the normalized device ID (for equality comparison)
   */
  public getNormalized(): string {
    return this._normalized;
  }

  /**
   * Get the timestamp when device was first seen
   */
  public getTimestamp(): Date | undefined {
    return this._timestamp;
  }

  /**
   * Get device platform
   */
  public getPlatform(): DevicePlatform {
    return this._platform;
  }

  /**
   * Get device ID type
   */
  public getDeviceType(): DeviceIdType {
    return this._deviceType;
  }

  /**
   * Check if the device ID matches a specific pattern
   */
  public matchesPattern(pattern: keyof typeof DEVICE_ID_CONSTANTS.PATTERNS): boolean {
    const regex = DEVICE_ID_CONSTANTS.PATTERNS[pattern];
    return regex.test(this._value);
  }

  /**
   * Check if this is a UUID format device ID
   */
  public isUuid(): boolean {
    return this._deviceType === 'uuid';
  }

  /**
   * Check if this is a browser fingerprint
   */
  public isBrowserFingerprint(): boolean {
    return this._deviceType === 'browser' || this._deviceType === 'fingerprint';
  }

  /**
   * Check if this is a mobile device ID
   */
  public isMobileDevice(): boolean {
    return this._deviceType === 'mobile';
  }

  /**
   * Check if this is a Bangladesh mobile device ID
   */
  public isBangladeshMobile(): boolean {
    return DEVICE_ID_CONSTANTS.PATTERNS.MOBILE_BD.test(this._value);
  }

  /**
   * Check if the device ID is empty/placeholder
   */
  public override isEmpty(): boolean {
    return this._value === '' || 
           this._value === 'unknown' || 
           this._value === '0' ||
           this._value === 'null' ||
           this._value === 'undefined';
  }

  /**
   * Check if this device ID is trusted (non-ephemeral)
   */
  public isPersistent(): boolean {
    const lowerValue = this._value.toLowerCase();
    return !DEVICE_ID_CONSTANTS.EPHEMERAL_PATTERNS.some(pattern => lowerValue.includes(pattern));
  }

  /**
   * Check if this is an ephemeral/private browsing device
   */
  public isEphemeral(): boolean {
    return !this.isPersistent();
  }

  // ============================================================
  // ValueObject Implementation
  // ============================================================

  /**
   * Get equality components for parent class comparison
   * Uses normalized value for case-insensitive comparison
   */
  protected getEqualityComponents(): readonly unknown[] {
    return [this._normalized, this._platform];
  }

  /**
   * Convert to JSON serializable object
   */
  public override toJSON(): Record<string, unknown> {
    return {
      value: this._value,
      normalized: this._normalized,
      type: this._deviceType,
      platform: this._platform,
      isPersistent: this.isPersistent(),
      timestamp: this._timestamp,
    };
  }

  /**
   * String representation for debugging
   */
  public override toString(): string {
    return `DeviceId(${this._deviceType}: ${this._value})`;
  }
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Type guard to check if a value is a DeviceId
 */
export function isDeviceId(value: unknown): value is DeviceId {
  return value instanceof DeviceId;
}

/**
 * Create a DeviceId from a request context
 * Handles headers, params, and generates fallback if needed
 */
export function createDeviceIdFromRequest(
  fingerprint: string | null | undefined,
  userAgent: string | null | undefined,
  ipAddress: string | null | undefined
): DeviceId {
  // Priority 1: Explicit fingerprint
  if (fingerprint && DeviceId.validate(fingerprint).isValid) {
    return new DeviceId(fingerprint);
  }
  
  // Priority 2: Generate from user agent + IP (pure domain hashing)
  const components = [userAgent || '', ipAddress || ''].filter(Boolean);
  if (components.length > 0) {
    // Simple deterministic hash (pure function, no crypto)
    let hash = 0;
    const input = components.join('|');
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    const hashHex = Math.abs(hash).toString(36);
    const generatedId = `fp_${hashHex.substring(0, 32)}`;
    return new DeviceId(generatedId);
  }
  
  // Priority 3: Unknown fallback
  return new DeviceId('unknown');
}

/**
 * Create a DeviceId from localStorage or generate new one
 */
export function createOrGetDeviceId(storedId: string | null): DeviceId {
  if (storedId && DeviceId.validate(storedId).isValid) {
    return new DeviceId(storedId);
  }
  return DeviceId.generateNew();
}

// ============================================================
// Type Exports
// ============================================================

export type { DeviceIdType, DevicePlatform };
