/**
 * ScheduleTime Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidScheduleTimeError } from '@domain/errors/schedule.errors.js';

export interface ScheduleTimeProps {
  readonly scheduledAt: string;
  readonly timezone: string;
}

const MAX_FUTURE_DAYS = 365;

export class ScheduleTimeVO extends BaseVO<ScheduleTimeProps> {
  private constructor(value: ScheduleTimeProps) {
    super(value);
  }

  static create(props: ScheduleTimeProps): ScheduleTimeVO {
    if (typeof props.scheduledAt !== 'string' || props.scheduledAt.length === 0) {
      throw new InvalidScheduleTimeError('scheduledAt is required');
    }
    const parsed = new Date(props.scheduledAt);
    if (Number.isNaN(parsed.getTime())) {
      throw new InvalidScheduleTimeError(`invalid ISO timestamp "${props.scheduledAt}"`);
    }
    const futureMs = parsed.getTime() - Date.now();
    if (futureMs > MAX_FUTURE_DAYS * 24 * 60 * 60 * 1000) {
      throw new InvalidScheduleTimeError(`scheduledAt exceeds ${MAX_FUTURE_DAYS} days in future`);
    }
    if (typeof props.timezone !== 'string' || props.timezone.length === 0) {
      throw new InvalidScheduleTimeError('timezone is required');
    }
    return new ScheduleTimeVO({
      scheduledAt: parsed.toISOString(),
      timezone: props.timezone,
    });
  }

  static reconstitute(props: ScheduleTimeProps): ScheduleTimeVO {
    return new ScheduleTimeVO(props);
  }

  get scheduledAt(): string { return this.value.scheduledAt; }
  get timezone(): string { return this.value.timezone; }
  get isPast(): boolean { return new Date(this.value.scheduledAt).getTime() <= Date.now(); }
  get isFuture(): boolean { return new Date(this.value.scheduledAt).getTime() > Date.now(); }
}
