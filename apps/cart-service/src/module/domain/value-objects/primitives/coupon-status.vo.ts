/**
 * CouponStatus Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type CouponStatusValue =
  | 'active'
  | 'inactive'
  | 'expired'
  | 'scheduled'
  | 'exhausted'
  | 'disabled';

const VALID_STATUSES: readonly string[] = [
  'active',
  'inactive',
  'expired',
  'scheduled',
  'exhausted',
  'disabled',
];

const VALID_TRANSITIONS: Readonly<Record<CouponStatusValue, readonly CouponStatusValue[]>> = {
  active: ['inactive', 'expired', 'exhausted', 'disabled'],
  inactive: ['active', 'disabled', 'expired'],
  expired: [],
  scheduled: ['active', 'disabled'],
  exhausted: [],
  disabled: ['active'],
};

export class CouponStatusVO extends BaseStatusVO<CouponStatusValue> {
  private constructor(value: CouponStatusValue) {
    super(value);
  }

  static create(raw: string): CouponStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid CouponStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new CouponStatusVO(normalized as CouponStatusValue);
  }

  static active(): CouponStatusVO {
    return new CouponStatusVO('active');
  }

  static reconstitute(raw: string): CouponStatusVO {
    return new CouponStatusVO(raw as CouponStatusValue);
  }

  isActiveStatus(): boolean {
    return this.value === 'active';
  }
  isInactive(): boolean {
    return this.value === 'inactive';
  }
  isExpired(): boolean {
    return this.value === 'expired';
  }
  isScheduled(): boolean {
    return this.value === 'scheduled';
  }
  isExhausted(): boolean {
    return this.value === 'exhausted';
  }
  isDisabled(): boolean {
    return this.value === 'disabled';
  }

  isUsable(): boolean {
    return this.isActiveStatus();
  }

  isFinal(): boolean {
    return this.isExpired() || this.isExhausted();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as CouponStatusValue);
  }
}
