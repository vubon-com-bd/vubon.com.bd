/**
 * InsuranceStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { INSURANCE_STATUS } from '@vubon/shared-constants/logistics';

export type InsuranceStatusValue =
  (typeof INSURANCE_STATUS)[keyof typeof INSURANCE_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(INSURANCE_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<InsuranceStatusValue, readonly InsuranceStatusValue[]>
> = {
  pending: ['active', 'cancelled'],
  active: ['expired', 'claimed', 'cancelled'],
  inactive: ['active', 'cancelled'],
  expired: [], // final
  cancelled: [], // final
  claimed: ['expired'],
};

export class InsuranceStatusVO extends BaseStatusVO<InsuranceStatusValue> {
  private constructor(value: InsuranceStatusValue) {
    super(value);
  }

  static create(raw: string): InsuranceStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('InsuranceStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid InsuranceStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new InsuranceStatusVO(normalized as InsuranceStatusValue);
  }

  static reconstitute(raw: string): InsuranceStatusVO {
    return new InsuranceStatusVO(raw as InsuranceStatusValue);
  }

  static active(): InsuranceStatusVO {
    return new InsuranceStatusVO(INSURANCE_STATUS.ACTIVE);
  }

  isPending(): boolean { return this.value === INSURANCE_STATUS.PENDING; }
  isActive(): boolean { return this.value === INSURANCE_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === INSURANCE_STATUS.INACTIVE; }
  isExpired(): boolean { return this.value === INSURANCE_STATUS.EXPIRED; }
  isCancelled(): boolean { return this.value === INSURANCE_STATUS.CANCELLED; }
  isClaimed(): boolean { return this.value === INSURANCE_STATUS.CLAIMED; }

  isFinal(): boolean {
    return this.isExpired() || this.isCancelled();
  }

  isClaimable(): boolean {
    return this.isActive();
  }

  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as InsuranceStatusValue;
    return (VALID_TRANSITIONS[this.value] ?? []).includes(normalized);
  }
}
