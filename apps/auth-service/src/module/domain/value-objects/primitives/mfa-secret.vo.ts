/**
 * MfaSecretVO — TOTP shared secret (base32)
 * @module auth-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Base32 encoded, 16–128 chars
 * - Uppercase, only A-Z and 2-7
 * - Never logged
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { MfaInvalidError } from '../../errors/mfa.errors';

const BASE32 = /^[A-Z2-7]+=*$/;
const MIN = 16;
const MAX = 128;

export class MfaSecretVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): MfaSecretVO {
    if (typeof raw !== 'string') {
      throw new MfaInvalidError('MFA secret must be a string');
    }
    const normalized = raw.toUpperCase().replace(/\s/g, '');
    if (normalized.length < MIN || normalized.length > MAX) {
      throw new MfaInvalidError(`MFA secret must be ${MIN}–${MAX} chars`);
    }
    if (!BASE32.test(normalized)) {
      throw new MfaInvalidError('MFA secret must be base32 encoded');
    }
    return new MfaSecretVO(normalized);
  }

  get masked(): string {
    return `${this.value.slice(0, 4)}****${this.value.slice(-4)}`;
  }

  override toJSON(): string {
    return this.masked;
  }

  override toString(): string {
    return this.masked;
  }
}
