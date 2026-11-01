/**
 * DeliverySchedulingService
 * @module order-service/domain/services
 *
 * Pure domain service — computes estimated delivery windows.
 * Does NOT call external courier APIs — caller provides inputs.
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface DeliverySlot {
  readonly from: string;
  readonly to: string;
  readonly estimatedDays: number;
}

export interface SchedulingInput {
  readonly baseDays: number;
  readonly shipAt: string;
  readonly weekendSkip?: boolean;
  readonly holidays?: readonly string[];
}

export class DeliverySchedulingService {
  /**
   * Compute estimated delivery window.
   */
  static estimate(input: SchedulingInput): DeliverySlot {
    if (!Number.isInteger(input.baseDays) || input.baseDays < 0) {
      throw new BusinessRuleError(
        'baseDays must be non-negative integer',
        'INVALID_DELIVERY_BASE_DAYS',
        { baseDays: input.baseDays },
      );
    }
    if (typeof input.shipAt !== 'string' || input.shipAt.length === 0) {
      throw new BusinessRuleError(
        'shipAt timestamp is required',
        'INVALID_DELIVERY_SHIP_AT',
        { shipAt: input.shipAt },
      );
    }

    const fromDate = new Date(input.shipAt);
    if (isNaN(fromDate.getTime())) {
      throw new BusinessRuleError(
        `Invalid shipAt date: "${input.shipAt}"`,
        'INVALID_DELIVERY_SHIP_AT',
        { shipAt: input.shipAt },
      );
    }

    // Standard estimate: baseDays to baseDays + 2
    const minDays = input.baseDays;
    const maxDays = input.baseDays + 2;

    let from = this.addBusinessDays(fromDate, minDays, input);
    let to = this.addBusinessDays(fromDate, maxDays, input);

    return {
      from: from.toISOString(),
      to: to.toISOString(),
      estimatedDays: maxDays,
    };
  }

  /**
   * Add business days skipping weekends/holidays.
   */
  private static addBusinessDays(
    start: Date,
    days: number,
    input: SchedulingInput,
  ): Date {
    const result = new Date(start);
    let added = 0;
    while (added < days) {
      result.setDate(result.getDate() + 1);
      const dayOfWeek = result.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const dateStr = result.toISOString().slice(0, 10);
      const isHoliday = input.holidays?.includes(dateStr) ?? false;

      if (input.weekendSkip && isWeekend) continue;
      if (isHoliday) continue;
      added++;
    }
    return result;
  }

  /**
   * Check if a delivery window overlaps with another.
   */
  static overlaps(a: DeliverySlot, b: DeliverySlot): boolean {
    const aFrom = new Date(a.from).getTime();
    const aTo = new Date(a.to).getTime();
    const bFrom = new Date(b.from).getTime();
    const bTo = new Date(b.to).getTime();
    return aFrom <= bTo && bFrom <= aTo;
  }
}
