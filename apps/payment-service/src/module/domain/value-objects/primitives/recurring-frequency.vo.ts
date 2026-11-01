/**
 * RecurringFrequency Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * interval: daily | weekly | biweekly | monthly | quarterly | yearly
 * intervalCount: N intervals between each run
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type RecurringIntervalValue =
  | 'daily'
  | 'weekly'
  | 'biweekly'
  | 'monthly'
  | 'quarterly'
  | 'yearly';

const VALID_INTERVALS: readonly string[] = [
  'daily',
  'weekly',
  'biweekly',
  'monthly',
  'quarterly',
  'yearly',
];

export interface RecurringFrequencyValue {
  readonly interval: RecurringIntervalValue;
  readonly intervalCount: number;
}

export class RecurringFrequencyVO extends BaseVO<RecurringFrequencyValue> {
  private constructor(value: RecurringFrequencyValue) {
    super(value);
  }

  static create(interval: string, intervalCount = 1): RecurringFrequencyVO {
    if (typeof interval !== 'string') {
      throw new ValidationError('Recurring interval must be a string', 'interval');
    }
    const normalized = interval.trim().toLowerCase();
    if (!VALID_INTERVALS.includes(normalized)) {
      throw new ValidationError(
        `Invalid interval "${normalized}". Allowed: ${VALID_INTERVALS.join(', ')}`,
        'interval',
      );
    }
    if (!Number.isInteger(intervalCount) || intervalCount < 1 || intervalCount > 365) {
      throw new ValidationError(
        'intervalCount must be integer between 1 and 365',
        'intervalCount',
      );
    }
    return new RecurringFrequencyVO({
      interval: normalized as RecurringIntervalValue,
      intervalCount,
    });
  }

  static reconstitute(
    interval: RecurringIntervalValue,
    intervalCount: number,
  ): RecurringFrequencyVO {
    return new RecurringFrequencyVO({ interval, intervalCount });
  }

  get interval(): RecurringIntervalValue { return this.value.interval; }
  get intervalCount(): number { return this.value.intervalCount; }

  isDaily(): boolean { return this.interval === 'daily'; }
  isWeekly(): boolean { return this.interval === 'weekly'; }
  isMonthly(): boolean { return this.interval === 'monthly'; }
  isYearly(): boolean { return this.interval === 'yearly'; }

  toDays(): number {
    const daysPerInterval: Record<RecurringIntervalValue, number> = {
      daily: 1,
      weekly: 7,
      biweekly: 14,
      monthly: 30,
      quarterly: 90,
      yearly: 365,
    };
    return daysPerInterval[this.interval] * this.intervalCount;
  }
}
