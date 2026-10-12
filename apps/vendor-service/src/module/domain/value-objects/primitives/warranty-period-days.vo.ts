/**
 * WarrantyPeriodDays Value Object — warranty duration in days
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_WARRANTY, VENDOR_WARRANTY_PERIOD } from '@vubon/shared-constants/business';

const MAX_DAYS = VENDOR_WARRANTY.MAX_PERIOD_DAYS;

const PRESET_VALUES = new Set<number>([
  VENDOR_WARRANTY_PERIOD.DAYS_7,
  VENDOR_WARRANTY_PERIOD.DAYS_30,
  VENDOR_WARRANTY_PERIOD.DAYS_90,
  VENDOR_WARRANTY_PERIOD.MONTHS_6,
  VENDOR_WARRANTY_PERIOD.YEAR_1,
  VENDOR_WARRANTY_PERIOD.YEARS_2,
  VENDOR_WARRANTY_PERIOD.YEARS_3,
  VENDOR_WARRANTY_PERIOD.YEARS_5,
]);

export class WarrantyPeriodDaysVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(days: number): WarrantyPeriodDaysVO {
    if (!Number.isInteger(days)) {
      throw new ValidationError('Warranty period must be an integer (days)', 'warrantyPeriodDays');
    }
    if (days <= 0) {
      throw new ValidationError('Warranty period must be positive', 'warrantyPeriodDays');
    }
    if (days > MAX_DAYS) {
      throw new ValidationError(`Warranty period cannot exceed ${MAX_DAYS} days`, 'warrantyPeriodDays');
    }
    return new WarrantyPeriodDaysVO(days);
  }

  static reconstitute(days: number): WarrantyPeriodDaysVO {
    return new WarrantyPeriodDaysVO(days);
  }

  static default(): WarrantyPeriodDaysVO {
    return new WarrantyPeriodDaysVO(VENDOR_WARRANTY.DEFAULT_PERIOD_DAYS);
  }

  get days(): number {
    return this.value;
  }

  toMonths(): number {
    return Math.floor(this.value / 30);
  }

  toYears(): number {
    return Math.round((this.value / 365) * 10) / 10;
  }

  isPreset(): boolean {
    return PRESET_VALUES.has(this.value);
  }

  isShortTerm(): boolean {
    return this.value <= 30;
  }

  isLongTerm(): boolean {
    return this.value >= 365;
  }

  /** Calculate expiry date from a start date. */
  calculateExpiry(startDate: Date = new Date()): Date {
    return new Date(startDate.getTime() + this.value * 24 * 60 * 60 * 1000);
  }

  /** Days remaining until expiry, or 0 if already expired. */
  daysRemainingFrom(startDate: Date, now: Date = new Date()): number {
    const expiry = this.calculateExpiry(startDate);
    const diff = expiry.getTime() - now.getTime();
    return diff <= 0 ? 0 : Math.ceil(diff / (24 * 60 * 60 * 1000));
  }
}
