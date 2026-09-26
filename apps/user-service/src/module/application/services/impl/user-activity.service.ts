import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserActivityServiceInterface } from '../interfaces/user-activity.service.interface';
import type { UserActivityRepository } from '../../../domain/repositories/user-activity.repository.interface';
import { UserActivityEntity } from '../../../domain/entities/user-activity.entity';
import { ActivityIdVO } from '../../../domain/value-objects/primitives/activity-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { ActivityTypeVO } from '../../../domain/value-objects/primitives/activity-type.vo';
import { ActivityTimestampVO } from '../../../domain/value-objects/primitives/activity-timestamp.vo';
import type { ActivityResponseDTO } from '../../dtos/responses/activity-response.dto';

@Injectable()
export class UserActivityService
  extends BaseService<UserActivityEntity, string>
  implements UserActivityServiceInterface
{
  readonly name = 'UserActivityService';

  constructor(
    private readonly activityRepo: UserActivityRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async record(input: {
    userId: string;
    type: string;
    metadata?: Record<string, unknown>;
  }): Promise<void> {
    const entity = UserActivityEntity.create({
      userId: UserIdVO.create(input.userId),
      type: ActivityTypeVO.create(input.type),
      timestamp: ActivityTimestampVO.now(),
      metadata: input.metadata ?? {},
    });
    await this.activityRepo.save(entity);
  }

  async listByUser(userId: string, limit: number): Promise<readonly ActivityResponseDTO[]> {
    const entities = await this.activityRepo.findRecent(
      UserIdVO.create(userId),
      limit,
    );
    return entities.map((e) => this.toDTO(e));
  }

  private toDTO(entity: UserActivityEntity): ActivityResponseDTO {
    void ActivityIdVO;
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      category: 'general',
      occurredAt: entity.timestamp.toISOString(),
      createdAt: entity.createdAt,
    } as unknown as ActivityResponseDTO;
  }
}
