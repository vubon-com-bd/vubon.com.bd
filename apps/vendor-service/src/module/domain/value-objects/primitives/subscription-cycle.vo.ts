/**
 * SubscriptionCycle Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_SUBSCRIPTION_CYCLE } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_SUBSCRIPTION_CYCLE) as readonly string[];

export class SubscriptionCycleVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }
  protected static allowedValues(): ReadonlySet<string> { return new Set(ALLOWED); }

  static create(raw: string): SubscriptionCycleVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(`Invalid subscription cycle "${raw}"`, 'cycle');
    }
    return new SubscriptionCycleVO(raw);
  }

  static reconstitute(raw: string): SubscriptionCycleVO { return new SubscriptionCycleVO(raw); }

  /** Cycle duration in days (0 for lifetime). */
  toDays(): number {
    const map: Record<string, number> = {
      [VENDOR_SUBSCRIPTION_CYCLE.MONTHLY]: 30,
      [VENDOR_SUBSCRIPTION_CYCLE.QUARTERLY]: 90,
      [VENDOR_SUBSCRIPTION_CYCLE.HALF_YEARLY]: 180,
      [VENDOR_SUBSCRIPTION_CYCLE.YEARLY]: 365,
      [VENDOR_SUBSCRIPTION_CYCLE.LIFETIME]: 0,
    };
    return map[this.value] ?? 30;
  }

  isLifetime(): boolean { return this.value === VENDOR_SUBSCRIPTION_CYCLE.LIFETIME; }
  isAnnual(): boolean { return this.value === VENDOR_SUBSCRIPTION_CYCLE.YEARLY; }

  /** Compute next renewal date from a period start. */
  nextPeriodStart(from: Date = new Date()): Date {
    if (this.isLifetime()) return from;
    const days = this.toDays();
    return new Date(from.getTime() + days * 24 * 60 * 60 * 1000);
  }
}
