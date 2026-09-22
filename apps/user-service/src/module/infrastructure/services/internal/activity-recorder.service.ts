import { Injectable } from '@nestjs/common';
import type { UserActivityRepository } from '../../../domain/repositories/user-activity.repository.interface';
import { UserActivityEntity } from '../../../domain/entities/user-activity.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { ActivityTypeVO } from '../../../domain/value-objects/primitives/activity-type.vo';
import { ActivityTimestampVO } from '../../../domain/value-objects/primitives/activity-timestamp.vo';

@Injectable()
export class ActivityRecorderService {
  constructor(private readonly activityRepo: UserActivityRepository) {}

  async record(
    userId: string,
    type: string,
    metadata: Record<string, unknown> = {},
  ): Promise<void> {
    const entity = UserActivityEntity.create({
      userId: UserIdVO.create(userId),
      type: ActivityTypeVO.create(type),
      timestamp: ActivityTimestampVO.now(),
      metadata,
    });
    await this.activityRepo.save(entity);
  }
}
