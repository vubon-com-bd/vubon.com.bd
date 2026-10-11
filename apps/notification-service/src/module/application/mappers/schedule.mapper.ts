/**
 * ScheduleMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { ScheduleEntity } from '../../domain/entities/schedule.entity.js';
import type {
  ScheduleResponseDTO,
  ScheduleListResponseDTO,
  ScheduleTriggerResponseDTO,
} from '../dtos/responses/schedule-response.dto.js';
import type {
  NotificationScheduleTypeValue,
  NotificationScheduleStatusValue,
  NotificationScheduleRecurrenceValue,
} from '@vubon/shared-types/platform/notification';

export class ScheduleMapper {
  static toResponse(entity: ScheduleEntity): ScheduleResponseDTO {
    return {
      id: entity.id,
      type: entity.type.value as NotificationScheduleTypeValue,
      status: entity.status.value as NotificationScheduleStatusValue,
      recurrence: entity.recurrence.value as NotificationScheduleRecurrenceValue,
      scheduledAt: entity.scheduledAt,
      timezone: entity.timezone,
      nextOccurrenceAt: entity.nextOccurrenceAt,
      occurrenceCount: entity.occurrenceCount,
      maxOccurrences: entity.maxOccurrences,
      notificationTemplateId: entity.notificationTemplateId,
      userId: entity.userId,
      createdBy: entity.createdBy,
      lastTriggeredAt: entity.lastTriggeredAt,
      lastFailureReason: entity.lastFailureReason,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toListResponse(
    entities: readonly ScheduleEntity[],
    total: number,
    page: number,
    limit: number,
  ): ScheduleListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static toTriggerResponse(entity: ScheduleEntity, triggeredNotificationId?: string): ScheduleTriggerResponseDTO {
    return {
      scheduleId: entity.id,
      occurrence: entity.occurrenceCount,
      triggeredAt: entity.lastTriggeredAt ?? new Date().toISOString(),
      triggeredNotificationId,
      nextOccurrenceAt: entity.nextOccurrenceAt,
    };
  }
}
