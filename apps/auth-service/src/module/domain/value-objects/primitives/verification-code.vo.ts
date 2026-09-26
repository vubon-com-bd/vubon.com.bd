/**
 * VerificationCodeVO — Numeric OTP for email/phone verification
 * @module auth-service/domain/value-objects/primitives
 *
 * Business rules:
 * - 4–8 digit numeric
 * - Never logged
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { VALIDATION } from '@vubon/shared-constants/common';
import { VerificationCodeMismatchError } from '../../errors/verification.errors';

export class VerificationCodeVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static of(raw: string): VerificationCodeVO {
    if (typeof raw !== 'string') {
      throw new Error('Verification code must be a string');
    }
    const trimmed = raw.trim();
    if (!/^\d+$/.test(trimmed)) {
      throw new Error('Verification code must be numeric');
    }
    if (trimmed.length < VALIDATION.OTP_MIN_LENGTH
      || trimmed.length > VALIDATION.OTP_MAX_LENGTH) {
      throw new Error(
        `Verification code must be ${VALIDATION.OTP_MIN_LENGTH}–${VALIDATION.OTP_MAX_LENGTH} digits`,
      );
    }
    return new VerificationCodeVO(trimmed);
  }

  /** Constant-time comparison to prevent timing attacks */
  equalsConstantTime(other: VerificationCodeVO): boolean {
    const a = this.value;
    const b = other.value;
    if (a.length !== b.length) {
      throw new VerificationCodeMismatchError();
    }
    let diff = 0;
    for (let i = 0; i < a.length; i += 1) {
      diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return diff === 0;
  }

  override toJSON(): string {
    return '***';
  }

  override toString(): string {
    return '***';
  }
}
