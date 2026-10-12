import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { UserActivityServiceInterface, LogActivityInput } from '../interfaces/user-activity.service.interface.js';
import type { UserActivityRepository } from '../../../domain/repositories/user-activity.repository.interface.js';
import { USER_ACTIVITY_REPOSITORY } from '../../../domain/repositories/user-activity.repository.interface.js';
import type { UserActivityResponseDTO } from '../../dtos/responses/user-activity-response.dto.js';

@Injectable()
export class UserActivityService extends BaseService implements UserActivityServiceInterface {
  readonly name = 'UserActivityService';
  constructor(@Inject(USER_ACTIVITY_REPOSITORY) private readonly repo: UserActivityRepository) { super(); }
  async log(input: LogActivityInput): Promise<UserActivityResponseDTO> {
    return {
      id: Math.random().toString(36).slice(2), userId: input.userId,
      type: input.type, description: input.description,
      ipAddress: input.ipAddress, userAgent: input.userAgent,
      deviceId: input.deviceId, metadata: input.metadata,
      occurredAt: new Date().toISOString(),
    };
  }
  async listForUser(userId: string, limit?: number): Promise<readonly UserActivityResponseDTO[]> {
    const list = await this.repo.findByUserId({ value: userId } as never, limit);
    return list.map((a) => ({
      id: a.id, userId: a.userId.value, type: a.type.value,
      description: a.description, ipAddress: a.ipAddress?.value,
      userAgent: a.userAgent?.value, deviceId: a.deviceId,
      metadata: a.metadata, occurredAt: a.occurredAt,
    }));
  }
}
