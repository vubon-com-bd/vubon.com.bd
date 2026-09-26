import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ScheduleEntity } from '../entities/schedule.entity';
import { ScheduleIdVO } from '../value-objects/primitives/schedule-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface ScheduleRepository extends BaseRepository<ScheduleEntity, ScheduleIdVO> {
  findDue(now: Date, limit?: number): Promise<readonly ScheduleEntity[]>;
  findActive(): Promise<readonly ScheduleEntity[]>;
  findByUser(userId: UserIdVO): Promise<readonly ScheduleEntity[]>;
}
