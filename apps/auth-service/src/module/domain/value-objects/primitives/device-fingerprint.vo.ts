/**
 * DeviceFingerprintVO — Device fingerprint hash
 * @module auth-service/domain/value-objects/primitives
 *
 * Business rules:
 * - 32–128 char hex/base64 string
 * - Immutable
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

const PATTERN = /^[A-Za-z0-9_\-]+$/;
const MIN = 32;
const MAX = 128;

export class DeviceFingerprintVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): DeviceFingerprintVO {
    if (typeof raw !== 'string') {
      throw new Error('Device fingerprint must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN || trimmed.length > MAX) {
      throw new Error(`Device fingerprint length must be ${MIN}–${MAX}`);
    }
    if (!PATTERN.test(trimmed)) {
      throw new Error('Device fingerprint contains invalid characters');
    }
    return new DeviceFingerprintVO(trimmed);
  }

  get masked(): string {
    return `${this.value.slice(0, 6)}…${this.value.slice(-4)}`;
  }

  override toJSON(): string {
    return this.masked;
  }
}
