/**
 * RecoveryCodeValue — Wrapper for recovery code string
 * @module identity-service/domain/value-objects/primitives
 *
 * ⚠️ Named RecoveryCodeValue to avoid conflict with composite RecoveryCodeVO
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class RecoveryCodeValueVO extends BaseCodeVO {
  private static readonly MIN = 8;
  private static readonly MAX = 32;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RecoveryCodeValueVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('RecoveryCode cannot be empty', 'recoveryCode');
    }
    const normalized = raw.trim().toUpperCase().replace(/\s|-/g, '');
    if (normalized.length < RecoveryCodeValueVO.MIN || normalized.length > RecoveryCodeValueVO.MAX) {
      throw new ValidationError(
        `RecoveryCode must be ${RecoveryCodeValueVO.MIN}-${RecoveryCodeValueVO.MAX} chars`,
        'recoveryCode',
      );
    }
    if (!/^[A-Z0-9]+$/.test(normalized)) {
      throw new ValidationError('RecoveryCode must be alphanumeric', 'recoveryCode');
    }
    return new RecoveryCodeValueVO(normalized);
  }

  static reconstitute(raw: string): RecoveryCodeValueVO {
    return new RecoveryCodeValueVO(raw);
  }

  matches(other: string): boolean {
    return this.value === other.trim().toUpperCase().replace(/\s|-/g, '');
  }

  get masked(): string {
    return `${this.value.slice(0, 4)}****`;
  }
}
