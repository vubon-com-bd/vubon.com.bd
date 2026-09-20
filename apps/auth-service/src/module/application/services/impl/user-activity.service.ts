import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserActivityServiceInterface } from '../interfaces/user-activity.service.interface';
import type { UserActivityRepository } from '../../../domain/repositories/user-activity.repository.interface';
import { UserActivityEntity } from '../../../domain/entities/user-activity.entity';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { ActivityTypeVO } from '../../../domain/value-objects/primitives/activity-type.vo';
import { ActivityTimestampVO } from '../../../domain/value-objects/primitives/activity-timestamp.vo';
import type { UserActivityResponseDTO } from '../../dtos/responses/user-activity-response.dto';

@Injectable()
export class UserActivityService
  extends BaseService<UserActivityEntity, string>
  implements UserActivityServiceInterface
{
  readonly name = 'UserActivityService';

  constructor(
    @Inject('UserActivityRepository') private readonly activityRepo: UserActivityRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async record(input: {
    userId: string;
    type: string;
    category: string;
    ip?: string;
    userAgent?: string;
    metadata?: Record<string, unknown>;
  }): Promise<void> {
    const entity = UserActivityEntity.create({
      userId: UserIdVO.create(input.userId),
      type: ActivityTypeVO.create(input.type),
      category: input.category,
      ip: input.ip ?? null,
      userAgent: input.userAgent ?? null,
      metadata: input.metadata ?? {},
      timestamp: ActivityTimestampVO.now(),
    });
    await this.activityRepo.save(entity);
  }

  async listByUser(
    userId: string,
    limit: number,
  ): Promise<readonly UserActivityResponseDTO[]> {
    const entities = await this.activityRepo.findRecent(
      UserIdVO.create(userId),
      limit,
    );
    return entities.map((e) => this.toDTO(e));
  }

  private toDTO(entity: UserActivityEntity): UserActivityResponseDTO {
    return {
      id: entity.id,
      userId: entity.userId.value,
      type: entity.type.value,
      category: entity.category,
      occurredAt: new Date(entity.timestamp.epochMs).toISOString(),
      userAgent: entity.userAgent ?? undefined,
      ipAddress: entity.ip ?? undefined,
      metadata: entity.metadata,
    };
  }
}
