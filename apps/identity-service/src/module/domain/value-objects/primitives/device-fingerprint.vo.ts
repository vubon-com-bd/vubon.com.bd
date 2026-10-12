/**
 * DeviceFingerprint Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class DeviceFingerprintVO extends BaseCodeVO {
  private static readonly MIN_LENGTH = 8;
  private static readonly MAX_LENGTH = 256;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeviceFingerprintVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('DeviceFingerprint cannot be empty', 'fingerprint');
    }
    const normalized = raw.trim();
    if (normalized.length < DeviceFingerprintVO.MIN_LENGTH ||
        normalized.length > DeviceFingerprintVO.MAX_LENGTH) {
      throw new ValidationError(
        `DeviceFingerprint must be ${DeviceFingerprintVO.MIN_LENGTH}-${DeviceFingerprintVO.MAX_LENGTH} chars`,
        'fingerprint',
      );
    }
    return new DeviceFingerprintVO(normalized);
  }

  static reconstitute(raw: string): DeviceFingerprintVO {
    return new DeviceFingerprintVO(raw);
  }
}
