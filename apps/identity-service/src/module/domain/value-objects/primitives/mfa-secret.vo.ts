/**
 * MfaSecret Value Object
 * @module identity-service/domain/value-objects/primitives
 *
 * Base32-encoded TOTP secret.
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class MfaSecretVO extends BaseCodeVO {
  private static readonly MIN_LENGTH = 16;
  private static readonly MAX_LENGTH = 128;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): MfaSecretVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('MfaSecret cannot be empty', 'mfaSecret');
    }
    const normalized = raw.trim().toUpperCase().replace(/\s/g, '');
    if (normalized.length < MfaSecretVO.MIN_LENGTH ||
        normalized.length > MfaSecretVO.MAX_LENGTH) {
      throw new ValidationError(
        `MfaSecret must be ${MfaSecretVO.MIN_LENGTH}-${MfaSecretVO.MAX_LENGTH} chars`,
        'mfaSecret',
      );
    }
    if (!/^[A-Z2-7]+=*$/.test(normalized)) {
      throw new ValidationError('MfaSecret must be base32 encoded', 'mfaSecret');
    }
    return new MfaSecretVO(normalized);
  }

  static reconstitute(raw: string): MfaSecretVO {
    return new MfaSecretVO(raw);
  }

  // for logs
  get masked(): string {
    return `${this.value.slice(0, 4)}...${this.value.slice(-4)}`;
  }
}
