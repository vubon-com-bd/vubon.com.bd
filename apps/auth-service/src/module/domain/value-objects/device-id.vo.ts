/**
 * Device ID Value Object - Pure Domain Core (Enterprise Enhanced)
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
 * ✅ Connection resilience - Retry context support for network failures
 * ✅ Performance optimized - Cached equality components
 * ✅ Shared patterns - Uses shared-constants for cross-service consistency
 * 
 * @example
 * const deviceId = new DeviceId('550e8400-e29b-41d4-a716-446655440000');
 * console.log(deviceId.getValue()); // '550e8400-e29b-41d4-a716-446655440000'
 * console.log(deviceId.isUuid()); // true
 * 
 * // With retry context
 * const deviceId = DeviceId.generateNew({ 
 *   platform: 'web', 
 *   retryAttempt: 2, 
 *   correlationId: 'req_abc123' 
 * });
 */

import { ValueObject } from './base.vo';

// ✅ FIXED: Import shared patterns from shared-constants (Cross-service consistency)
// Note: DEVICE_ID_PATTERNS needs to be added to shared-constants package
// For now, using local constants with plan to migrate
import { DEVICE_ID_PATTERNS } from '@vubon/shared-constants';

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
export type DeviceIdType = 
  | 'uuid' 
  | 'fingerprint' 
  | 'mobile' 
  | 'browser' 
  | 'tablet' 
  | 'smart_tv' 
  | 'gaming_console' 
  | 'wearable' 
  | 'standard' 
  | 'unknown';

/**
 * Device platform type (Enhanced for multiple platforms)
 */
export type DevicePlatform = 
  | 'web' 
  | 'android' 
  | 'ios' 
  | 'mobile_web' 
  | 'desktop' 
  | 'tablet' 
  | 'smart_tv' 
  | 'gaming_console' 
  | 'wearable' 
  | 'unknown';

/**
 * Options for generating a new Device ID
 * Enhanced for connection change resilience
 */
export interface GenerationOptions {
  /** Device platform type */
  platform?: DevicePlatform;
  /** Retry attempt number (for connection failure recovery) */
  retryAttempt?: number;
  /** Correlation ID for tracking request chains across retries */
  correlationId?: string;
  /** Previous device ID (for continuity tracking) */
  previousDeviceId?: string;
  /** Timestamp override (for testing) */
  timestamp?: Date;
}

/**
 * Cached equality components structure
 */
interface EqualityComponentsCache {
  baseValue: string;
  platform: DevicePlatform;
  combined: readonly unknown[];
}

// ==================== Local Constants (Fallback) ====================

/**
 * Local constants as fallback when shared-constants not available
 * Priority: shared-constants > local constants
 */
const LOCAL_DEVICE_ID_CONSTANTS = {
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
    BROWSER_FINGERPRINT_RETRY: /^fp(_retry\d+)?(_[a-zA-Z0-9]{1,6})?_[a-z0-9]+_[a-z0-9]+_\d+$/i,
    MOBILE_ANDROID: /^ANDROID_[a-zA-Z0-9]{16,64}$/i,
    MOBILE_IOS: /^IOS_[a-zA-Z0-9]{16,64}$/i,
    MOBILE_BD: /^BD_MOBILE_01[3-9][0-9]{8}$/i,
    TABLET: /^TABLET_[a-zA-Z0-9]{16,64}$/i,
    SMART_TV: /^TV_[a-zA-Z0-9]{16,64}$/i,
    CONSOLE: /^CONSOLE_[a-zA-Z0-9]{16,64}$/i,
    WEARABLE: /^WEARABLE_[a-zA-Z0-9]{16,64}$/i,
    STANDARD: /^[a-zA-Z0-9\-_.:]{1,512}$/,
  },

  // Ephemeral/private browsing indicators
  EPHEMERAL_PATTERNS: [
    'private', 'incognito', 'temporary', 'unknown', '0', 'null', 'undefined',
    'anonymous', 'guest', 'temp', 'retry',
  ],

  // Platform detection patterns
  PLATFORM_PATTERNS: {
    ANDROID: /^android_/i,
    IOS: /^ios_/i,
    BD_MOBILE: /^bd_mobile_/i,
    TABLET: /^tablet_/i,
    TV: /^tv_/i,
    CONSOLE: /^console_/i,
    WEARABLE: /^wearable_/i,
    FP: /^fp_/i,
  },
} as const;

// Use shared constants if available, otherwise fallback to local
const DEVICE_ID_CONSTANTS = (() => {
  if (DEVICE_ID_PATTERNS && typeof DEVICE_ID_PATTERNS === 'object') {
    return {
      ...LOCAL_DEVICE_ID_CONSTANTS,
      PATTERNS: {
        ...LOCAL_DEVICE_ID_CONSTANTS.PATTERNS,
        ...(DEVICE_ID_PATTERNS as Record<string, RegExp>),
      },
    };
  }
  return LOCAL_DEVICE_ID_CONSTANTS;
})();

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
 * - Connection retry correlation
 */
export class DeviceId extends ValueObject {
  private readonly _value: string;
  private readonly _normalized: string;
  private readonly _timestamp?: Date;
  private readonly _platform: DevicePlatform;
  private readonly _deviceType: DeviceIdType;
  private readonly _retryAttempt?: number;
  private readonly _correlationId?: string;
  
  // ✅ Performance: Cached equality components
  private _cachedEqualityComponents: readonly unknown[] | null = null;

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
    this._normalized = this.normalize(deviceId);
    this._timestamp = timestamp;
    this._platform = this.detectPlatform(this._value);
    this._deviceType = this.detectType(this._value);
    
    // Extract retry metadata from the device ID
    this._retryAttempt = this.extractRetryAttempt(this._value);
    this._correlationId = this.extractCorrelationId(this._value);

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
    return new DeviceId(deviceId, timestamp);
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
   * Enhanced with retry context for connection change resilience
   * 
   * @param options - Generation options including retry context
   * @returns A new DeviceId instance
   */
  public static generateNew(options: GenerationOptions = {}): DeviceId {
    const { 
      platform = 'web', 
      retryAttempt = 0, 
      correlationId, 
      previousDeviceId,
      timestamp = new Date() 
    } = options;
    
    const retryMarker = retryAttempt > 0 ? `_retry${retryAttempt}` : '';
    
    let correlationMarker = '';
    if (correlationId) {
      const cleanCorrelation = correlationId.replace(/[^a-zA-Z0-9]/g, '').slice(-6);
      correlationMarker = cleanCorrelation ? `_${cleanCorrelation}` : '';
    } else if (previousDeviceId) {
      const extractedCorr = DeviceId.extractCorrelationId(previousDeviceId);
      if (extractedCorr) {
        correlationMarker = `_${extractedCorr}`;
      }
    }
    
    const timeStr = timestamp.getTime().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    const counter = (DeviceId._counter = (DeviceId._counter || 0) + 1);
    
    let prefix = 'fp';
    switch (platform) {
      case 'android': prefix = 'ANDROID'; break;
      case 'ios': prefix = 'IOS'; break;
      case 'tablet': prefix = 'TABLET'; break;
      case 'smart_tv': prefix = 'TV'; break;
      case 'gaming_console': prefix = 'CONSOLE'; break;
      case 'wearable': prefix = 'WEARABLE'; break;
      default: prefix = 'fp';
    }
    
    const deviceId = `${prefix}${retryMarker}${correlationMarker}_${timeStr}_${random}_${counter}`;
    return new DeviceId(deviceId, timestamp);
  }

  /**
   * Create a DeviceId that preserves continuity from a previous device ID
   * Useful for connection retries where the original device ID might be stale
   */
  public static continueFrom(previousDeviceId: DeviceId, retryAttempt: number): DeviceId {
    return DeviceId.generateNew({
      platform: previousDeviceId.getPlatform(),
      retryAttempt,
      previousDeviceId: previousDeviceId.getValue(),
      correlationId: previousDeviceId.getCorrelationId(),
    });
  }

  private static _counter = 0;

  // ============================================================
  // Metadata Extraction Methods
  // ============================================================

  /**
   * Extract retry attempt number from device ID string
   */
  private static extractRetryAttempt(deviceId: string): number | undefined {
    const match = deviceId.match(/_retry(\d+)/);
    return match ? parseInt(match[1], 10) : undefined;
  }

  /**
   * Extract correlation ID from device ID string
   */
  private static extractCorrelationId(deviceId: string): string | undefined {
    const match = deviceId.match(/_([a-zA-Z0-9]{1,6})_(?:[a-z0-9]+_[a-z0-9]+_\d+$)/);
    if (match && match[1] && !match[1].startsWith('retry')) {
      return match[1];
    }
    const retryMatch = deviceId.match(/_retry\d+_([a-zA-Z0-9]{1,6})_/);
    return retryMatch ? retryMatch[1] : undefined;
  }

  private extractRetryAttempt(deviceId: string): number | undefined {
    return DeviceId.extractRetryAttempt(deviceId);
  }

  private extractCorrelationId(deviceId: string): string | undefined {
    return DeviceId.extractCorrelationId(deviceId);
  }

  // ============================================================
  // Validation Methods
  // ============================================================

  /**
   * Validates a device ID string
   */
  public static validate(deviceId: string): DeviceIdValidation {
    if (!deviceId || typeof deviceId !== 'string') {
      return { isValid: false, error: 'Device ID cannot be null or undefined' };
    }

    const trimmed = deviceId.trim();

    if (trimmed.length === 0) {
      return { isValid: false, error: 'Device ID cannot be empty' };
    }

    if (trimmed.length > DEVICE_ID_CONSTANTS.MAX_LENGTH) {
      return { isValid: false, error: `Device ID too long (max ${DEVICE_ID_CONSTANTS.MAX_LENGTH} characters)` };
    }

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

    const normalized = DeviceId.normalize(trimmed);
    return { isValid: true, normalized, error: undefined };
  }

  /**
   * Normalize a device ID to canonical form
   */
  private static normalize(deviceId: string): string {
    return deviceId
      .trim()
      .toLowerCase()
      .replace(/-{2,}/g, '-')
      .replace(/_{2,}/g, '_')
      .replace(/\.{2,}/g, '.')
      .replace(/:{2,}/g, ':');
  }

  /**
   * Detect device platform from ID pattern (Enhanced)
   */
  private detectPlatform(deviceId: string): DevicePlatform {
    const id = deviceId.toLowerCase();
    const patterns = DEVICE_ID_CONSTANTS.PLATFORM_PATTERNS;

    if (patterns.ANDROID.test(id)) return 'android';
    if (patterns.IOS.test(id)) return 'ios';
    if (patterns.BD_MOBILE.test(id)) return 'mobile_web';
    if (patterns.TABLET.test(id)) return 'tablet';
    if (patterns.TV.test(id)) return 'smart_tv';
    if (patterns.CONSOLE.test(id)) return 'gaming_console';
    if (patterns.WEARABLE.test(id)) return 'wearable';
    if (patterns.FP.test(id)) return 'web';
    if (DEVICE_ID_CONSTANTS.PATTERNS.MOBILE_ANDROID.test(id)) return 'android';
    if (DEVICE_ID_CONSTANTS.PATTERNS.MOBILE_IOS.test(id)) return 'ios';

    return 'unknown';
  }

  /**
   * Detect device ID type (Enhanced)
   */
  private detectType(deviceId: string): DeviceIdType {
    const id = deviceId;
    const patterns = DEVICE_ID_CONSTANTS.PATTERNS;

    if (patterns.UUID_V4.test(id)) return 'uuid';
    if (patterns.UUID.test(id)) return 'uuid';
    if (patterns.BROWSER_FINGERPRINT.test(id)) return 'browser';
    if (patterns.BROWSER_FINGERPRINT_RETRY.test(id)) return 'browser';
    if (patterns.FINGERPRINT_HASH.test(id)) return 'fingerprint';
    if (patterns.MOBILE_ANDROID.test(id)) return 'mobile';
    if (patterns.MOBILE_IOS.test(id)) return 'mobile';
    if (patterns.MOBILE_BD.test(id)) return 'mobile';
    if (patterns.TABLET.test(id)) return 'tablet';
    if (patterns.SMART_TV.test(id)) return 'smart_tv';
    if (patterns.CONSOLE.test(id)) return 'gaming_console';
    if (patterns.WEARABLE.test(id)) return 'wearable';

    return 'standard';
  }

  // ============================================================
  // Instance Methods
  // ============================================================

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
   * Get retry attempt number (if this device was created during a retry)
   */
  public getRetryAttempt(): number | undefined {
    return this._retryAttempt;
  }

  /**
   * Get correlation ID for tracking request chains
   */
  public getCorrelationId(): string | undefined {
    return this._correlationId;
  }

  /**
   * Check if this device ID was created during a connection retry
   */
  public isFromRetry(): boolean {
    return (this._retryAttempt !== undefined && this._retryAttempt > 0);
  }

  /**
   * Check if the device ID matches a specific pattern
   */
  public matchesPattern(pattern: keyof typeof DEVICE_ID_CONSTANTS.PATTERNS): boolean {
    const regex = DEVICE_ID_CONSTANTS.PATTERNS[pattern];
    return regex?.test(this._value) ?? false;
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
   * Check if this is a tablet device ID
   */
  public isTablet(): boolean {
    return this._deviceType === 'tablet';
  }

  /**
   * Check if this is a smart TV device ID
   */
  public isSmartTv(): boolean {
    return this._deviceType === 'smart_tv';
  }

  /**
   * Check if this is a gaming console device ID
   */
  public isGamingConsole(): boolean {
    return this._deviceType === 'gaming_console';
  }

  /**
   * Check if this is a wearable device ID
   */
  public isWearable(): boolean {
    return this._deviceType === 'wearable';
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
    if (this.isFromRetry()) {
      return false;
    }
    return !DEVICE_ID_CONSTANTS.EPHEMERAL_PATTERNS.some(pattern => lowerValue.includes(pattern));
  }

  /**
   * Check if this is an ephemeral/private browsing device
   */
  public isEphemeral(): boolean {
    return !this.isPersistent();
  }

  /**
   * Create a new device ID for a retry attempt
   */
  public forRetry(retryAttempt: number): DeviceId {
    return DeviceId.generateNew({
      platform: this._platform,
      retryAttempt,
      correlationId: this._correlationId,
      previousDeviceId: this._value,
    });
  }

  // ============================================================
  // ValueObject Implementation
  // ============================================================

  /**
   * Get equality components for parent class comparison
   * ✅ Performance: Uses cached value
   */
  protected getEqualityComponents(): readonly unknown[] {
    if (!this._cachedEqualityComponents) {
      const baseValue = this._normalized.replace(
        /_(?:retry\d+|[a-zA-Z0-9]{1,6})_(?=[a-z0-9]+_)/, 
        '_'
      );
      this._cachedEqualityComponents = [baseValue, this._platform];
    }
    return this._cachedEqualityComponents;
  }

  /**
   * Invalidate cache (useful for testing)
   */
  protected invalidateCache(): void {
    super.invalidateCache();
    this._cachedEqualityComponents = null;
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
      isFromRetry: this.isFromRetry(),
      retryAttempt: this._retryAttempt,
      correlationId: this._correlationId,
      timestamp: this._timestamp,
    };
  }

  /**
   * String representation for debugging
   */
  public override toString(): string {
    const retryInfo = this._retryAttempt ? ` retry:${this._retryAttempt}` : '';
    const corrInfo = this._correlationId ? ` corr:${this._correlationId}` : '';
    return `DeviceId(${this._deviceType}: ${this._value}${retryInfo}${corrInfo})`;
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
 * Enhanced with retry context detection
 */
export function createDeviceIdFromRequest(
  fingerprint: string | null | undefined,
  userAgent: string | null | undefined,
  ipAddress: string | null | undefined,
  retryCount?: number,
  correlationId?: string
): DeviceId {
  if (fingerprint && DeviceId.validate(fingerprint).isValid) {
    try {
      const existingId = new DeviceId(fingerprint);
      if (retryCount && retryCount > 0 && !existingId.isFromRetry()) {
        return existingId.forRetry(retryCount);
      }
      return existingId;
    } catch {
      // Fall through to generation
    }
  }

  const components = [userAgent || '', ipAddress || ''].filter(Boolean);
  if (components.length > 0) {
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

  return DeviceId.generateNew({
    platform: 'web',
    retryAttempt: retryCount,
    correlationId,
  });
}

/**
 * Create a DeviceId from localStorage or generate new one
 * Preserves retry context when possible
 */
export function createOrGetDeviceId(
  storedId: string | null, 
  retryContext?: { attempt?: number; correlationId?: string }
): DeviceId {
  if (storedId && DeviceId.validate(storedId).isValid) {
    try {
      const existingId = new DeviceId(storedId);
      if (retryContext?.attempt && retryContext.attempt > 0 && !existingId.isFromRetry()) {
        return existingId.forRetry(retryContext.attempt);
      }
      return existingId;
    } catch {
      return DeviceId.generateNew({
        retryAttempt: retryContext?.attempt,
        correlationId: retryContext?.correlationId,
      });
    }
  }
  return DeviceId.generateNew({
    retryAttempt: retryContext?.attempt,
    correlationId: retryContext?.correlationId,
  });
}

/**
 * Get device ID constant configuration (for debugging/testing)
 */
export function getDeviceIdConstants(): typeof DEVICE_ID_CONSTANTS {
  return { ...DEVICE_ID_CONSTANTS };
}

// ============================================================
// Type Exports
// ============================================================

export type { DeviceIdType, DevicePlatform, GenerationOptions, DeviceIdValidation };
