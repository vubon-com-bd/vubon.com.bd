import { BaseValueObject } from './base.vo';

/**
 * Device ID Value Object
 * Represents a unique device identifier (fingerprint or UUID)
 * Used for device tracking, fingerprinting, and trust scoring
 */
export class DeviceId extends BaseValueObject<string> {
  private readonly _deviceType?: string;
  private readonly _createdAt: Date;

  private constructor(value: string, deviceType?: string) {
    const normalized = value.trim();
    DeviceId.validate(normalized);
    super(normalized);
    this._deviceType = deviceType;
    this._createdAt = new Date();
  }

  /**
   * Create a new Device ID instance
   * @throws {Error} If the device ID is invalid
   */
  static create(value: string, deviceType?: string): DeviceId {
    return new DeviceId(value, deviceType);
  }

  /**
   * Generate a new device ID using UUID v4
   */
  static generate(deviceType?: string): DeviceId {
    const uuid = crypto.randomUUID();
    return new DeviceId(uuid, deviceType);
  }

  /**
   * Validate device ID format
   * @throws {Error} If the device ID is invalid
   */
  private static validate(value: string): void {
    if (!value || typeof value !== 'string') {
      throw new Error('Device ID must be a non-empty string');
    }

    // Check if it's a valid UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(value)) {
      return;
    }

    // Check if it's a valid fingerprint (hex or base64)
    const fingerprintRegex = /^[A-Za-z0-9+/=_-]{8,128}$/;
    if (fingerprintRegex.test(value)) {
      return;
    }

    throw new Error(
      `Invalid device ID format: ${value}. Must be a valid UUID or fingerprint string`
    );
  }

  /**
   * Get the device type
   */
  getDeviceType(): string | undefined {
    return this._deviceType;
  }

  /**
   * Get the creation timestamp
   */
  getCreatedAt(): Date {
    return new Date(this._createdAt);
  }

  /**
   * Get the device ID value
   */
  getValue(): string {
    return this._value;
  }

  /**
   * Check if the device ID is a UUID
   */
  isUUID(): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(this._value);
  }

  /**
   * Check if the device ID is a fingerprint
   */
  isFingerprint(): boolean {
    return !this.isUUID();
  }

  /**
   * Mask the device ID for display (show only first 8 chars)
   */
  mask(): string {
    if (this._value.length <= 8) {
      return '****';
    }

    const visible = 8;
    const masked = '*'.repeat(this._value.length - visible);
    const visiblePart = this._value.slice(0, visible);
    return `${visiblePart}${masked}`;
  }

  /**
   * Create a short version of the device ID for display
   */
  toShort(): string {
    if (this._value.length <= 8) {
      return this._value;
    }

    return `${this._value.slice(0, 8)}...`;
  }

  /**
   * Get the device ID as a string
   */
  toString(): string {
    return this._value;
  }

  /**
   * Compare two DeviceId objects
   */
  equals(other: DeviceId | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof DeviceId)) {
      return false;
    }

    return this._value === other._value;
  }

  /**
   * Calculate trust score for the device based on device type
   * Returns a score between 0 and 100
   */
  getTrustScore(): number {
    // Base trust score
    let score = 50;

    // UUID devices are more trustworthy than fingerprints
    if (this.isUUID()) {
      score += 30;
    } else {
      score += 10;
    }

    // Device type trust adjustments
    if (this._deviceType) {
      const trustedScores: Record<string, number> = {
        desktop: 20,
        mobile: 15,
        tablet: 10,
        iot: -10,
        unknown: 0,
      };

      const typeScore = trustedScores[this._deviceType] || 0;
      score += typeScore;
    }

    return Math.min(100, Math.max(0, score));
  }

  /**
   * Get the device ID in different formats
   */
  toFormats(): {
    full: string;
    short: string;
    masked: string;
    type: 'uuid' | 'fingerprint';
  } {
    return {
      full: this._value,
      short: this.toShort(),
      masked: this.mask(),
      type: this.isUUID() ? 'uuid' : 'fingerprint',
    };
  }
}
