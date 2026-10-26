/**
 * CanScheduleSpecification
 * @module notification-service/domain/specifications
 *
 * Determines if a notification/schedule can be scheduled at a time।
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { NOTIFICATION_SCHEDULE } from '@vubon/shared-constants/platform';
import type { ScheduleEntity } from '@domain/entities/schedule.entity.js';

const MAX_FUTURE_DAYS = NOTIFICATION_SCHEDULE.MAX_FUTURE_DAYS;
const MAX_ACTIVE = NOTIFICATION_SCHEDULE.MAX_ACTIVE_SCHEDULES;

export interface CanScheduleContext {
  readonly now?: Date;
  readonly activeScheduleCount?: number;
}

export interface CanScheduleCandidate {
  readonly schedule: ScheduleEntity;
  readonly ctx?: CanScheduleContext;
}

export class CanScheduleSpecification extends Specification<CanScheduleCandidate> {
  isSatisfiedBy(c: CanScheduleCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: CanScheduleCandidate): string | null {
    const s = c.schedule;
    const now = c.ctx?.now ?? new Date();

    if (!s.isPending() && !s.isActive()) {
      return `schedule status "${s.status.value}" cannot be (re)scheduled`;
    }

    if (c.ctx?.activeScheduleCount !== undefined && c.ctx.activeScheduleCount >= MAX_ACTIVE) {
      return `max active schedules (${MAX_ACTIVE}) reached`;
    }

    const scheduledAt = s.vo.time.scheduledAt;
    const scheduledMs = new Date(scheduledAt).getTime();

    if (Number.isNaN(scheduledMs)) {
      return 'invalid scheduledAt timestamp';
    }

    if (scheduledMs <= now.getTime()) {
      return 'scheduledAt is in the past';
    }

    const maxFutureMs = now.getTime() + MAX_FUTURE_DAYS * 24 * 60 * 60 * 1000;
    if (scheduledMs > maxFutureMs) {
      return `scheduledAt exceeds ${MAX_FUTURE_DAYS} days in future`;
    }

    if (!s.vo.hasRecipients()) {
      return 'schedule has no recipients';
    }

    return null;
  }

  static strict(): CanScheduleSpecification {
    return new CanScheduleSpecification();
  }
}
