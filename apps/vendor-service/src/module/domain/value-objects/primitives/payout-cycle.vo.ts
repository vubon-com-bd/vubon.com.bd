/**
 * PayoutCycle Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_PAYOUT_CYCLE } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_PAYOUT_CYCLE) as readonly string[];

export class PayoutCycleVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }
  protected static allowedValues(): ReadonlySet<string> { return new Set(ALLOWED); }

  static create(raw: string): PayoutCycleVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(`Invalid payout cycle "${raw}"`, 'cycle');
    }
    return new PayoutCycleVO(raw);
  }

  static reconstitute(raw: string): PayoutCycleVO { return new PayoutCycleVO(raw); }

  /** Cycle duration in hours (0 for on_demand). */
  toHours(): number {
    const map: Record<string, number> = {
      [VENDOR_PAYOUT_CYCLE.DAILY]: 24,
      [VENDOR_PAYOUT_CYCLE.WEEKLY]: 24 * 7,
      [VENDOR_PAYOUT_CYCLE.BIWEEKLY]: 24 * 14,
      [VENDOR_PAYOUT_CYCLE.MONTHLY]: 24 * 30,
      [VENDOR_PAYOUT_CYCLE.ON_DEMAND]: 0,
    };
    return map[this.value] ?? 24 * 7;
  }

  isOnDemand(): boolean { return this.value === VENDOR_PAYOUT_CYCLE.ON_DEMAND; }
  isAutomatic(): boolean { return !this.isOnDemand(); }
}
