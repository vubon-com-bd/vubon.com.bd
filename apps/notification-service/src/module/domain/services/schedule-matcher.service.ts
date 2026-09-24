import { ScheduleEntity } from '../entities/schedule.entity';

export class ScheduleMatcherService {
  isDue(schedule: ScheduleEntity, now: Date = new Date()): boolean {
    if (!schedule.isActive) return false;
    return schedule.nextRunAt.getTime() <= now.getTime();
  }

  filterDue(
    schedules: readonly ScheduleEntity[],
    now: Date = new Date(),
  ): readonly ScheduleEntity[] {
    return schedules.filter((s) => this.isDue(s, now));
  }
}
