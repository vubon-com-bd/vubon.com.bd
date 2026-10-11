/**
 * ScheduleControllerMapper
 * @module notification-service/interfaces/mappers
 */
import type {
  CreateScheduleHttpDTO,
  UpdateScheduleHttpDTO,
  PauseScheduleHttpDTO,
  CancelScheduleHttpDTO,
  TriggerScheduleHttpDTO,
  ListSchedulesHttpQueryDTO,
} from '../dtos/requests/schedule/schedule.http-dto.js';
import type {
  CreateScheduleRequestDTO,
  UpdateScheduleRequestDTO,
  PauseScheduleRequestDTO,
  CancelScheduleRequestDTO,
  TriggerScheduleRequestDTO,
  ListSchedulesRequestDTO,
} from '../../application/dtos/requests/schedule/schedule.dto.js';

export class ScheduleControllerMapper {
  static toCreateAppDto(dto: CreateScheduleHttpDTO): CreateScheduleRequestDTO {
    return {
      type: dto.type as never,
      recurrence: dto.recurrence as never,
      scheduledAt: dto.scheduledAt,
      timezone: dto.timezone,
      notificationTemplateId: dto.notificationTemplateId,
      userId: dto.userId,
      maxOccurrences: dto.maxOccurrences,
    };
  }

  static toUpdateAppDto(scheduleId: string, dto: UpdateScheduleHttpDTO): UpdateScheduleRequestDTO {
    return {
      scheduleId,
      scheduledAt: dto.scheduledAt,
      recurrence: dto.recurrence as never,
      timezone: dto.timezone,
      maxOccurrences: dto.maxOccurrences,
    };
  }

  static toPauseAppDto(scheduleId: string, dto: PauseScheduleHttpDTO): PauseScheduleRequestDTO {
    return { scheduleId, reason: dto.reason };
  }

  static toCancelAppDto(scheduleId: string, dto: CancelScheduleHttpDTO): CancelScheduleRequestDTO {
    return { scheduleId, reason: dto.reason };
  }

  static toTriggerAppDto(scheduleId: string, dto: TriggerScheduleHttpDTO): TriggerScheduleRequestDTO {
    return { scheduleId, triggeredNotificationId: dto.triggeredNotificationId };
  }

  static toListAppDto(q: ListSchedulesHttpQueryDTO): ListSchedulesRequestDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: q.sortBy as never,
      sortDir: q.sortDir,
      filter: {
        userId: q.userId,
        type: q.type,
        status: q.status,
        templateId: q.templateId,
        fromDate: q.fromDate,
        toDate: q.toDate,
      },
    };
  }
}
