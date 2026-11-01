/**
 * ScheduleMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { ScheduleEntity } from '@domain/entities/schedule.entity.js';
import type {
  ScheduleResponseDTO,
  ScheduleSummaryResponseDTO,
  ScheduleListResponseDTO,
} from '@application/dtos/responses/schedule-response.dto.js';

export class ScheduleMapper {
  static toResponse(entity: ScheduleEntity): ScheduleResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name,
      type: vo.type.value as never,
      recurrence: vo.frequency.value as never,
      status: vo.status.value as never,
      scheduledAt: vo.time.scheduledAt,
      timezone: vo.time.timezone,
      cronExpression: vo.cronExpression,
      templateId: vo.templateId.value,
      recipientCount: vo.recipientCount(),
      nextRunAt: entity.nextRunAt,
      lastRunAt: entity.lastRunAt,
      runCount: entity.runCount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSummary(entity: ScheduleEntity): ScheduleSummaryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name,
      status: vo.status.value as never,
      nextRunAt: entity.nextRunAt,
      runCount: entity.runCount,
      createdAt: entity.createdAt,
    };
  }

  static toListResponse(
    entities: readonly ScheduleEntity[],
    total: number,
    page: number,
    limit: number,
  ): ScheduleListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
