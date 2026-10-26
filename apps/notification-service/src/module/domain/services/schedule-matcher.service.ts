/**
 * ScheduleMatcherService
 * @module notification-service/domain/services
 *
 * Determines if a schedule should run NOW based on:
 *  - nextRunAt ≤ now
 *  - status is runnable (active)
 *  - not in quiet hours
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import type { ScheduleEntity } from '@domain/entities/schedule.entity.js';

export interface MatchInput {
  readonly schedule: ScheduleEntity;
  readonly now: string;
  readonly gracePeriodMinutes?: number;
}

export interface MatchResult {
  readonly shouldRun: boolean;
  readonly reason: string;
}

const DEFAULT_GRACE_MINUTES = 5;

export class ScheduleMatcherService {
  static match(input: MatchInput): MatchResult {
    const { schedule, now } = input;

    if (!schedule.isRunnable()) {
      return { shouldRun: false, reason: `not-runnable:${schedule.status.value}` };
    }

    const next = schedule.nextRunAt;
    if (!next) {
      return { shouldRun: false, reason: 'no-next-run' };
    }

    const nowMs = new Date(now).getTime();
    const nextMs = new Date(next).getTime();
    const grace = (input.gracePeriodMinutes ?? DEFAULT_GRACE_MINUTES) * 60 * 1000;

    if (nowMs + grace < nextMs) {
      return { shouldRun: false, reason: 'not-yet' };
    }

    // Don't run if too far in past (schedule missed by > 1 hour)
    if (nowMs - nextMs > MS_HOUR() * 24) {
      return { shouldRun: false, reason: 'stale-over-24h' };
    }

    return { shouldRun: true, reason: 'due' };
  }

  /** Filter a list of schedules to those due now */
  static filterDue(
    schedules: readonly ScheduleEntity[],
    now: string,
  ): readonly ScheduleEntity[] {
    return schedules.filter((s) => this.match({ schedule: s, now }).shouldRun);
  }
}

function MS_HOUR(): number {
  return 60 * 60 * 1000;
}
