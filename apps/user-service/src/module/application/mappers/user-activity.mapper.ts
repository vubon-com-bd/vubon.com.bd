/**
 * UserActivityMapper
 */
import { UserActivityEntity } from '@domain/entities/user-activity.entity';
import type { ActivityResponseDTO } from '../dtos/responses/activity-response.dto.js';

export class UserActivityMapper {
  static toResponse(activity: UserActivityEntity): ActivityResponseDTO {
    return {
      id: activity.id,
      userId: activity.userId.value,
      type: activity.type.value,
      timestamp: activity.timestamp.toISOString(),
      metadata: activity.metadata,
    };
  }

  static toResponseList(
    activities: readonly UserActivityEntity[]
  ): readonly ActivityResponseDTO[] {
    return activities.map((a) => UserActivityMapper.toResponse(a));
  }
}
