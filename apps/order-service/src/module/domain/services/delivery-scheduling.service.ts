/**
 * DeliverySchedulingService — compute delivery estimates
 * @module order-service/domain/services
 */
import { DELIVERY } from '@vubon/shared-constants/logistics';

export interface DeliveryEstimate {
  readonly estimatedAt: string;
  readonly earliestAt: string;
  readonly latestAt: string;
  readonly estimatedDays: number;
}

export class DeliverySchedulingService {
  /** Default business hours for delivery (8 AM – 8 PM). */
  private static readonly START_HOUR = 8;
  private static readonly END_HOUR = 20;

  /** Compute delivery estimate given estimated days and start time. */
  static estimate(
    estimatedDays: number,
    fromDate: Date = new Date(),
  ): DeliveryEstimate {
    const days = Math.max(0, estimatedDays);
    const earliest = this.addBusinessDays(fromDate, days);
    const latest = this.addBusinessDays(fromDate, days + 2);

    return {
      estimatedAt: earliest.toISOString(),
      earliestAt: earliest.toISOString(),
      latestAt: latest.toISOString(),
      estimatedDays: days,
    };
  }

  /** Estimate for a specific shipping method type. */
  static estimateForType(
    type: string,
    fromDate: Date = new Date(),
  ): DeliveryEstimate {
    const days = this.daysForType(type);
    return this.estimate(days, fromDate);
  }

  /** Default estimated days per delivery type. */
  static daysForType(type: string): number {
    const map: Record<string, number> = {
      same_day: 0,
      express: 1,
      next_day: 1,
      overnight: 1,
      standard: 3,
      economy: 5,
      freight: 7,
      pickup: 0,
      local_delivery: 1,
      international: 10,
      digital: 0,
      scheduled: 3,
      contactless: 3,
      locker: 3,
      door: 3,
    };
    return map[type] ?? 3;
  }

  /** Add business days to a date (skip weekends). */
  static addBusinessDays(from: Date, days: number): Date {
    const result = new Date(from.getTime());
    let added = 0;
    while (added < days) {
      result.setDate(result.getDate() + 1);
      const dow = result.getDay();
      if (dow !== 0 && dow !== 6) added++;
    }
    // Snap to business hours
    if (result.getHours() < this.START_HOUR) {
      result.setHours(this.START_HOUR, 0, 0, 0);
    } else if (result.getHours() >= this.END_HOUR) {
      result.setDate(result.getDate() + 1);
      result.setHours(this.START_HOUR, 0, 0, 0);
    }
    return result;
  }

  /** Check if a delivery attempt can be made now. */
  static canAttemptNow(now: Date = new Date()): boolean {
    const dow = now.getDay();
    if (dow === 0 || dow === 6) return false;
    const hour = now.getHours();
    return hour >= this.START_HOUR && hour < this.END_HOUR;
  }

  /** Compute next available delivery slot. */
  static nextAvailableSlot(now: Date = new Date()): Date {
    if (this.canAttemptNow(now)) return now;
    return this.addBusinessDays(now, 1);
  }

  /** Compute grace period end time from a scheduled delivery. */
  static graceEnd(scheduledAt: Date): Date {
    const result = new Date(scheduledAt.getTime());
    result.setMinutes(result.getMinutes() + DELIVERY.GRACE_PERIOD_MINUTES);
    return result;
  }

  /** Compute max attempts threshold. */
  static readonly MAX_ATTEMPTS = DELIVERY.MAX_ATTEMPTS;

  /** Interval hours between retry attempts. */
  static readonly ATTEMPT_INTERVAL_HOURS = DELIVERY.ATTEMPT_INTERVAL_HOURS;

  /** Check if enough time has passed to retry. */
  static canRetry(lastAttemptAt: Date, now: Date = new Date()): boolean {
    const diffMs = now.getTime() - lastAttemptAt.getTime();
    const requiredMs = DELIVERY.ATTEMPT_INTERVAL_HOURS * 60 * 60 * 1000;
    return diffMs >= requiredMs;
  }
}
