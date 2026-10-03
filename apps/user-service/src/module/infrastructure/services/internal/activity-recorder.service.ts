/**
 * ActivityRecorderService
 * @module user-service/infrastructure/services/internal
 *
 * Combines domain ActivityTypeVO + repo save for recording user activities.
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  USER_ACTIVITY_REPOSITORY,
} from '@domain/repositories/user-activity.repository.interface';
import type { UserActivityRepository } from '@domain/repositories/user-activity.repository.interface';
import { UserActivityEntity } from '@domain/entities/user-activity.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { ActivityIdVO } from '@domain/value-objects/primitives/activity-id.vo';
import { ActivityTypeVO } from '@domain/value-objects/primitives/activity-type.vo';

export interface RecordActivityInput {
  readonly userId: string;
  readonly type: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class ActivityRecorderService {
  constructor(
    @Inject(USER_ACTIVITY_REPOSITORY)
    private readonly activityRepo: UserActivityRepository
  ) {}

  async record(input: RecordActivityInput): Promise<void> {
    const now = new Date().toISOString();
    const entity = UserActivityEntity.record({
      activityId: ActivityIdVO.create(crypto.randomUUID()),
      userId: UserIdVO.create(input.userId),
      type: ActivityTypeVO.create(input.type),
      metadata: input.metadata,
      now,
    });
    await this.activityRepo.save(entity);
  }

  async countForUser(userId: string): Promise<number> {
    return this.activityRepo.countByUserId(UserIdVO.create(userId));
  }

  async cleanupOlderThan(days: number): Promise<number> {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    return this.activityRepo.deleteOlderThan(cutoff);
  }
}
