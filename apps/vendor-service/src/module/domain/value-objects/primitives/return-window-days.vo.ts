/**
 * ReturnWindowDays Value Object — customer return window
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_RETURN_POLICY } from '@vubon/shared-constants/business';

const MIN_DAYS = VENDOR_RETURN_POLICY.MIN_WINDOW_DAYS;
const MAX_DAYS = VENDOR_RETURN_POLICY.MAX_WINDOW_DAYS;

export class ReturnWindowDaysVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static create(days: number): ReturnWindowDaysVO {
    if (!Number.isInteger(days)) {
      throw new ValidationError('Return window must be an integer (days)', 'returnWindowDays');
    }
    if (days < MIN_DAYS) {
      throw new ValidationError(`Return window must be at least ${MIN_DAYS} days`, 'returnWindowDays');
    }
    if (days > MAX_DAYS) {
      throw new ValidationError(`Return window cannot exceed ${MAX_DAYS} days`, 'returnWindowDays');
    }
    return new ReturnWindowDaysVO(days);
  }

  static reconstitute(days: number): ReturnWindowDaysVO {
    return new ReturnWindowDaysVO(days);
  }

  static default(): ReturnWindowDaysVO {
    return new ReturnWindowDaysVO(VENDOR_RETURN_POLICY.DEFAULT_WINDOW_DAYS);
  }

  get days(): number {
    return this.value;
  }

  allowsAnyReturn(): boolean {
    return this.value > 0;
  }

  isShort(): boolean {
    return this.value > 0 && this.value <= 3;
  }

  isStandard(): boolean {
    return this.value > 3 && this.value <= 14;
  }

  isGenerous(): boolean {
    return this.value > 14;
  }

  /** Calculate last-returnable date from delivery date. */
  calculateDeadline(deliveredAt: Date): Date {
    return new Date(deliveredAt.getTime() + this.value * 24 * 60 * 60 * 1000);
  }

  isWithinWindow(deliveredAt: Date, now: Date = new Date()): boolean {
    if (!this.allowsAnyReturn()) return false;
    return now.getTime() <= this.calculateDeadline(deliveredAt).getTime();
  }

  daysRemaining(deliveredAt: Date, now: Date = new Date()): number {
    if (!this.isWithinWindow(deliveredAt, now)) return 0;
    const deadline = this.calculateDeadline(deliveredAt);
    const diff = deadline.getTime() - now.getTime();
    return Math.ceil(diff / (24 * 60 * 60 * 1000));
  }
}
