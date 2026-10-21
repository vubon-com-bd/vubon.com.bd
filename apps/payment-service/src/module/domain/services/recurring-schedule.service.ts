/**
 * RecurringScheduleService
 * @module payment-service/domain/services
 *
 * Computes next-run dates for recurring payments.
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import type { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';

export interface ScheduleInput {
  readonly frequency: RecurringFrequencyVO;
  readonly startAt: string;
  readonly endAt?: string;
  readonly referenceDate?: Date;
}

export interface ScheduleResult {
  readonly nextRunAt: string;
  readonly isFinal: boolean;
  readonly skipped: number;
}

export class RecurringScheduleService {
  static computeNextRun(input: ScheduleInput): ScheduleResult {
    const { frequency, startAt, endAt, referenceDate = new Date() } = input;

    let next = new Date(startAt);
    let skipped = 0;

    while (next.getTime() <= referenceDate.getTime()) {
      next = this.advance(next, frequency);
      skipped += 1;
      if (skipped > 10000) {
        throw new ValidationError('Recurring schedule exceeded max iterations', 'frequency');
      }
    }

    const isFinal = endAt !== undefined && next.getTime() > new Date(endAt).getTime();
    return {
      nextRunAt: next.toISOString(),
      isFinal,
      skipped,
    };
  }

  static advance(from: Date, frequency: RecurringFrequencyVO): Date {
    const d = new Date(from.getTime());
    const count = frequency.intervalCount;
    switch (frequency.interval) {
      case 'daily':
        d.setUTCDate(d.getUTCDate() + count);
        break;
      case 'weekly':
        d.setUTCDate(d.getUTCDate() + 7 * count);
        break;
      case 'biweekly':
        d.setUTCDate(d.getUTCDate() + 14 * count);
        break;
      case 'monthly':
        d.setUTCMonth(d.getUTCMonth() + count);
        break;
      case 'quarterly':
        d.setUTCMonth(d.getUTCMonth() + 3 * count);
        break;
      case 'yearly':
        d.setUTCFullYear(d.getUTCFullYear() + count);
        break;
    }
    return d;
  }

  static isDue(nextRunAt: string, reference: Date = new Date()): boolean {
    return new Date(nextRunAt).getTime() <= reference.getTime();
  }
}
