/**
 * RecoveryCodeStatus Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type RecoveryCodeStatusValue = 'active' | 'used' | 'revoked';

const VALID_STATUSES: readonly RecoveryCodeStatusValue[] = ['active', 'used', 'revoked'];

export class RecoveryCodeStatusVO extends BaseStatusVO<RecoveryCodeStatusValue> {
  private constructor(value: RecoveryCodeStatusValue) {
    super(value);
  }

  static create(raw: string): RecoveryCodeStatusVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('RecoveryCodeStatus cannot be empty', 'recoveryCodeStatus');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized as RecoveryCodeStatusValue)) {
      throw new ValidationError(
        `Invalid RecoveryCodeStatus "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'recoveryCodeStatus',
      );
    }
    return new RecoveryCodeStatusVO(normalized as RecoveryCodeStatusValue);
  }

  static active(): RecoveryCodeStatusVO { return new RecoveryCodeStatusVO('active'); }
  static used(): RecoveryCodeStatusVO { return new RecoveryCodeStatusVO('used'); }
  static revoked(): RecoveryCodeStatusVO { return new RecoveryCodeStatusVO('revoked'); }

  static reconstitute(raw: string): RecoveryCodeStatusVO {
    return new RecoveryCodeStatusVO(raw as RecoveryCodeStatusValue);
  }

  isActive(): boolean { return this.value === 'active'; }
  isUsed(): boolean { return this.value === 'used'; }
  isRevoked(): boolean { return this.value === 'revoked'; }
  isFinal(): boolean { return this.isUsed() || this.isRevoked(); }
}
