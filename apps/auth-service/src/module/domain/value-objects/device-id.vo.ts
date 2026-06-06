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
 * ✅ Connection resilience - Retry context support for network failures
 * 
 * Supported formats:
 * - UUID v4: 550e8400-e29b-41d4-a716-446655440000
 * - Fingerprint hash: a1b2c3d4e5f6g7h8i9j0
 * - Browser fingerprint: fp_abc123def456
 * - Mobile device ID: ANDROID_abc123, IOS_def456
 * - Custom format: alphanumeric, hyphens, underscores, dots, colons
 * - Bangladesh mobile: BD_MOBILE_017xxxxxxxx
 * - Retry markers: fp_retry1_corr123_timestamp_random_counter
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
    BROWSER_FINGERPRINT_RETRY: /^fp(_retry\d+)?(_[a-zA-Z0-9]{1,6})?_[a-z0-9]+_[a-z0-9]+_\d+$/i,
    MOBILE_ANDROID: /^ANDROID_[a-zA-Z0-9]{16,64}$/i,
    MOBILE_IOS: /^IOS_[a-zA-Z0-9]{16,64}$/i,
    MOBILE_BD: /^BD_MOBILE_01[3-9][0-9]{8}$/i,
    STANDARD: /^[a-zA-Z0-9\-_.:]{1,512}$/,
  },

  // Ephemeral/private browsing indicators
  EPHEMERAL_PATTERNS: [
    'private', 'incognito', 'temporary', 'unknown', '0', 'null', 'undefined',
    'anonymous', 'guest', 'temp', 'retry',
  ],
} as const;

// ==================== Device ID Value Object ====================

export class DeviceId extends ValueObject {
  private readonly _value: string;
  private readonly _normalized: string;
  private readonly _timestamp?: Date;
  private readonly _platform: DevicePlatform;
  private readonly _deviceType: DeviceIdType;
  private readonly _retryAttempt?: number;
  private readonly _correlationId?: string;

  private static _counter = 0;

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
    this._retryAttempt = this.extractRetryAttempt(this._value);
    this._correlationId = this.extractCorrelationId(this._value);

    this.validate();
  }

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

  public static fromValid(deviceId: string, timestamp?: Date): DeviceId {
    return new DeviceId(deviceId, timestamp);
  }

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
    if (platform === 'android') prefix = 'ANDROID';
    if (platform === 'ios') prefix = 'IOS';
    
    const deviceId = `${prefix}${retryMarker}${correlationMarker}_${timeStr}_${random}_${counter}`;
    return new DeviceId(deviceId, timestamp);
  }

  public static continueFrom(previousDeviceId: DeviceId, retryAttempt: number): DeviceId {
    return DeviceId.generateNew({
      platform: previousDeviceId.getPlatform(),
      retryAttempt,
      previousDeviceId: previousDeviceId.getValue(),
      correlationId: previousDeviceId.getCorrelationId(),
    });
  }

  // ============================================================
  // Metadata Extraction Methods
  // ============================================================

  private static extractRetryAttempt(deviceId: string): number | undefined {
    const match = deviceId.match(/_retry(\d+)/);
    return match ? parseInt(match[1], 10) : undefined;
  }

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

  public static validate(deviceId: string): DeviceIdValidation {
    if (!deviceId || typeof deviceId !== 'string') {
      return {
        isValid: false,
        error: 'Device ID cannot be null or undefined',
      };
    }

    const trimmed = deviceId.trim();

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

    return {
      isValid: true,
      normalized,
      error: undefined,
    };
  }

  private static normalize(deviceId: string): string {
    return deviceId
      .trim()
      .toLowerCase()
      .replace(/-{2,}/g, '-')
      .replace(/_{2,}/g, '_')
      .replace(/\.{2,}/g, '.')
      .replace(/:{2,}/g, ':');
  }

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

  private detectType(deviceId: string): DeviceIdType {
    const id = deviceId;

    if (DEVICE_ID_CONSTANTS.PATTERNS.UUID_V4.test(id)) return 'uuid';
    if (DEVICE_ID_CONSTANTS.PATTERNS.UUID.test(id)) return 'uuid';
    if (DEVICE_ID_CONSTANTS.PATTERNS.BROWSER_FINGERPRINT.test(id)) return 'browser';
    if (DEVICE_ID_CONSTANTS.PATTERNS.BROWSER_FINGERPRINT_RETRY.test(id)) return 'browser';
    if (DEVICE_ID_CONSTANTS.PATTERNS.FINGERPRINT_HASH.test(id)) return 'fingerprint';
    if (DEVICE_ID_CONSTANTS.PATTERNS.MOBILE_ANDROID.test(id)) return 'mobile';
    if (DEVICE_ID_CONSTANTS.PATTERNS.MOBILE_IOS.test(id)) return 'mobile';
    if (DEVICE_ID_CONSTANTS.PATTERNS.MOBILE_BD.test(id)) return 'mobile';

    return 'standard';
  }

  // ============================================================
  // Instance Methods
  // ============================================================

  private normalize(deviceId: string): string {
    return DeviceId.normalize(deviceId);
  }

  public getValue(): string {
    return this._value;
  }

  public getNormalized(): string {
    return this._normalized;
  }

  public getTimestamp(): Date | undefined {
    return this._timestamp;
  }

  public getPlatform(): DevicePlatform {
    return this._platform;
  }

  public getDeviceType(): DeviceIdType {
    return this._deviceType;
  }

  public getRetryAttempt(): number | undefined {
    return this._retryAttempt;
  }

  public getCorrelationId(): string | undefined {
    return this._correlationId;
  }

  public isFromRetry(): boolean {
    return this._retryAttempt !== undefined && this._retryAttempt > 0;
  }

  public matchesPattern(pattern: keyof typeof DEVICE_ID_CONSTANTS.PATTERNS): boolean {
    const regex = DEVICE_ID_CONSTANTS.PATTERNS[pattern];
    return regex.test(this._value);
  }

  public isUuid(): boolean {
    return this._deviceType === 'uuid';
  }

  public isBrowserFingerprint(): boolean {
    return this._deviceType === 'browser' || this._deviceType === 'fingerprint';
  }

  public isMobileDevice(): boolean {
    return this._deviceType === 'mobile';
  }

  public isBangladeshMobile(): boolean {
    return DEVICE_ID_CONSTANTS.PATTERNS.MOBILE_BD.test(this._value);
  }

  public override isEmpty(): boolean {
    return this._value === '' || 
           this._value === 'unknown' || 
           this._value === '0' ||
           this._value === 'null' ||
           this._value === 'undefined';
  }

  public isPersistent(): boolean {
    const lowerValue = this._value.toLowerCase();
    if (this.isFromRetry()) {
      return false;
    }
    return !DEVICE_ID_CONSTANTS.EPHEMERAL_PATTERNS.some(pattern => lowerValue.includes(pattern));
  }

  public isEphemeral(): boolean {
    return !this.isPersistent();
  }

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

  protected getEqualityComponents(): readonly unknown[] {
    const baseValue = this._normalized.replace(/_(?:retry\d+|[a-zA-Z0-9]{1,6})_(?=[a-z0-9]+_)/, '_');
    return [baseValue, this._platform];
  }

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

  public override toString(): string {
    const retryInfo = this._retryAttempt ? ` retry:${this._retryAttempt}` : '';
    const corrInfo = this._correlationId ? ` corr:${this._correlationId}` : '';
    return `DeviceId(${this._deviceType}: ${this._value}${retryInfo}${corrInfo})`;
  }
}

// ============================================================
// Utility Functions
// ============================================================

export function isDeviceId(value: unknown): value is DeviceId {
  return value instanceof DeviceId;
}

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

// ============================================================
// Type Exports
// ============================================================

export type { DeviceIdType, DevicePlatform };
