import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ScheduleEntity } from '../entities/schedule.entity';

export class CanScheduleSpecification extends Specification<ScheduleEntity> {
  isSatisfiedBy(candidate: ScheduleEntity): boolean {
    if (!candidate.isActive) return false;
    return candidate.nextRunAt.getTime() > Date.now();
  }
}
