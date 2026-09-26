import { UserActivityEntity } from '../../domain/entities/user-activity.entity';
import type { ActivityResponseDTO } from '../dtos/responses/activity-response.dto';

export class UserActivityMapper {
  static toResponse(activity: UserActivityEntity): ActivityResponseDTO {
    return {
      id: activity.id.value,
      userId: activity.userId.value,
      type: activity.type.value,
      category: 'general',
      occurredAt: activity.timestamp.toISOString(),
      createdAt: activity.createdAt,
    } as unknown as ActivityResponseDTO;
  }

  static toListResponse(
    activities: readonly UserActivityEntity[],
  ): readonly ActivityResponseDTO[] {
    return activities.map((a) => UserActivityMapper.toResponse(a));
  }
}
