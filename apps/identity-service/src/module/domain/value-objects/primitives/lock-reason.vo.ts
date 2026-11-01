/**
 * LockReason Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type LockReasonValue =
  | 'too_many_attempts'
  | 'suspicious_activity'
  | 'manual_admin'
  | 'policy_violation'
  | 'security_breach';

const VALID_REASONS: readonly LockReasonValue[] = [
  'too_many_attempts',
  'suspicious_activity',
  'manual_admin',
  'policy_violation',
  'security_breach',
];

export class LockReasonVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): LockReasonVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('LockReason cannot be empty', 'lockReason');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_REASONS.includes(normalized as LockReasonValue)) {
      throw new ValidationError(
        `Invalid LockReason "${normalized}". Allowed: ${VALID_REASONS.join(', ')}`,
        'lockReason',
      );
    }
    return new LockReasonVO(normalized);
  }

  static reconstitute(raw: string): LockReasonVO {
    return new LockReasonVO(raw);
  }

  get kind(): LockReasonValue { return this.value as LockReasonValue; }
}
