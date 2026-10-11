/**
 * PreferenceMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { PreferenceEntity } from '../../domain/entities/preference.entity.js';
import type {
  PreferenceResponseDTO,
  PreferencePublicResponseDTO,
} from '../dtos/responses/preference-response.dto.js';

export class PreferenceMapper {
  static toResponse(entity: PreferenceEntity): PreferenceResponseDTO {
    return {
      id: entity.id,
      userId: entity.userId,
      channelPreferences: entity.channelPreferences,
      categoryPreferences: entity.categoryPreferences,
      quietHoursEnabled: entity.quietHoursEnabled,
      quietHoursStart: entity.quietHoursStart,
      quietHoursEnd: entity.quietHoursEnd,
      timezone: entity.timezone,
      locale: entity.locale,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublic(entity: PreferenceEntity): PreferencePublicResponseDTO {
    return {
      userId: entity.userId,
      channels: entity.channelPreferences,
      categories: entity.categoryPreferences,
      quietHours: {
        enabled: entity.quietHoursEnabled,
        start: entity.quietHoursStart,
        end: entity.quietHoursEnd,
        timezone: entity.timezone,
      },
    };
  }
}
