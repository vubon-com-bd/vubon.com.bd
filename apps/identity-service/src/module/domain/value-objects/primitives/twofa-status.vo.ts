/**
 * TwoFactorStatus Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type TwoFactorStatusValue = 'disabled' | 'pending' | 'enabled' | 'locked';

const VALID_STATUSES: readonly TwoFactorStatusValue[] = [
  'disabled',
  'pending',
  'enabled',
  'locked',
];

export class TwoFactorStatusVO extends BaseStatusVO<TwoFactorStatusValue> {
  private constructor(value: TwoFactorStatusValue) {
    super(value);
  }

  static create(raw: string): TwoFactorStatusVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('TwoFactorStatus cannot be empty', 'twoFactorStatus');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized as TwoFactorStatusValue)) {
      throw new ValidationError(
        `Invalid TwoFactorStatus "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'twoFactorStatus',
      );
    }
    return new TwoFactorStatusVO(normalized as TwoFactorStatusValue);
  }

  static disabled(): TwoFactorStatusVO { return new TwoFactorStatusVO('disabled'); }
  static pending(): TwoFactorStatusVO { return new TwoFactorStatusVO('pending'); }
  static enabled(): TwoFactorStatusVO { return new TwoFactorStatusVO('enabled'); }
  static locked(): TwoFactorStatusVO { return new TwoFactorStatusVO('locked'); }

  static reconstitute(raw: string): TwoFactorStatusVO {
    return new TwoFactorStatusVO(raw as TwoFactorStatusValue);
  }

  isDisabled(): boolean { return this.value === 'disabled'; }
  isPending(): boolean { return this.value === 'pending'; }
  isEnabled(): boolean { return this.value === 'enabled'; }
  isLocked(): boolean { return this.value === 'locked'; }
  isOperational(): boolean { return this.isEnabled(); }
}
