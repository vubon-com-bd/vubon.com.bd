/**
 * VoucherStatus Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type VoucherStatusValue =
  | 'active'
  | 'inactive'
  | 'redeemed'
  | 'expired'
  | 'cancelled'
  | 'scheduled';

const VALID_STATUSES: readonly string[] = [
  'active',
  'inactive',
  'redeemed',
  'expired',
  'cancelled',
  'scheduled',
];

const VALID_TRANSITIONS: Readonly<Record<VoucherStatusValue, readonly VoucherStatusValue[]>> = {
  active: ['inactive', 'redeemed', 'expired', 'cancelled'],
  inactive: ['active', 'cancelled', 'expired'],
  redeemed: [],
  expired: [],
  cancelled: [],
  scheduled: ['active', 'cancelled'],
};

export class VoucherStatusVO extends BaseStatusVO<VoucherStatusValue> {
  private constructor(value: VoucherStatusValue) {
    super(value);
  }

  static create(raw: string): VoucherStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid VoucherStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new VoucherStatusVO(normalized as VoucherStatusValue);
  }

  static active(): VoucherStatusVO {
    return new VoucherStatusVO('active');
  }

  static reconstitute(raw: string): VoucherStatusVO {
    return new VoucherStatusVO(raw as VoucherStatusValue);
  }

  isActiveStatus(): boolean {
    return this.value === 'active';
  }
  isInactive(): boolean {
    return this.value === 'inactive';
  }
  isRedeemed(): boolean {
    return this.value === 'redeemed';
  }
  isExpired(): boolean {
    return this.value === 'expired';
  }
  isCancelled(): boolean {
    return this.value === 'cancelled';
  }
  isScheduled(): boolean {
    return this.value === 'scheduled';
  }

  isRedeemable(): boolean {
    return this.isActiveStatus();
  }

  isFinal(): boolean {
    return this.isRedeemed() || this.isExpired() || this.isCancelled();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as VoucherStatusValue);
  }
}
