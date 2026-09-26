/**
 * UserActivityService
 * @module auth-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserId } from '@vubon/shared-types/common';
import type { UserActivityServiceInterface } from '../interfaces/user-activity.service.interface';
import type { UserActivityRepository } from '../../../domain/repositories/user-activity.repository.interface';
import type { IdGeneratorServiceInterface } from '../interfaces/id-generator.service.interface';
import {
  UserActivityEntity,
  type ActivityType,
} from '../../../domain/entities/user-activity.entity';
import type { UserActivityResponseDTO } from '../../dtos/responses/user-activity-response.dto';
import { ID_GENERATOR } from '../tokens';
import { USER_ACTIVITY_REPO } from '../../tokens';

@Injectable()
export class UserActivityService
  extends BaseService<UserActivityEntity, string>
  implements UserActivityServiceInterface {
  readonly name = 'UserActivityService';

  constructor(
    @Inject(USER_ACTIVITY_REPO) private readonly repo: UserActivityRepository,
    @Inject(ID_GENERATOR) private readonly idGen: IdGeneratorServiceInterface,
  ) { super(); }

  async record(input: {
    userId: UserId;
    type: string;
    ipAddress?: string;
    userAgent?: string;
    metadata?: Readonly<Record<string, string>>;
  }): Promise<UserActivityEntity> {
    const now = new Date().toISOString();
    const entity = UserActivityEntity.create({
      id: this.idGen.generate(),
      userId: input.userId,
      type: input.type as ActivityType,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      metadata: input.metadata,
      createdAt: now,
      updatedAt: now,
    });
    return this.repo.save(entity);
  }

  async listForUser(
    userId: UserId,
    limit = 50,
  ): Promise<readonly UserActivityEntity[]> {
    return this.repo.findByUserId(userId, limit);
  }

  toResponse(activity: UserActivityEntity): UserActivityResponseDTO {
    return {
      id: activity.id,
      userId: activity.userId,
      type: activity.type,
      ipAddress: activity.ipAddress,
      userAgent: activity.userAgent,
      metadata: activity.metadata,
      createdAt: activity.createdAt,
    };
  }
}
