/**
 * ScheduleControllerMapper — HTTP DTO ↔ App DTO
 * @module notification-service/interfaces/mappers
 */
import type {
  CreateScheduleRequestDTO,
  UpdateScheduleRequestDTO,
  CancelScheduleRequestDTO,
} from '@application/dtos/requests/schedule/index.js';
import type { ScheduleListOptionsDTO } from '@application/services/interfaces/schedule.service.interface.js';
import type {
  ScheduleResponseDTO,
  ScheduleSummaryResponseDTO,
  ScheduleListResponseDTO,
} from '@application/dtos/responses/schedule-response.dto.js';
import {
  ScheduleHttpResponseDTO,
  ScheduleSummaryHttpResponseDTO,
  ScheduleListHttpResponseDTO,
} from '@interfaces/dtos/responses/schedule.response.dto.js';

export interface CreateScheduleHttpDTO {
  readonly name: string;
  readonly type: string;
  readonly recurrence: string;
  readonly scheduledAt?: string;
  readonly timezone: string;
  readonly cronExpression?: string;
  readonly templateId?: string;
  readonly recipientIds?: readonly string[];
  readonly data?: Readonly<Record<string, unknown>>;
}

export interface UpdateScheduleHttpDTO {
  readonly name?: string;
  readonly scheduledAt?: string;
  readonly timezone?: string;
  readonly cronExpression?: string;
  readonly recipientIds?: readonly string[];
}

export interface ListSchedulesHttpQueryDTO {
  readonly page?: number;
  readonly limit?: number;
  readonly status?: string;
  readonly type?: string;
}

export class ScheduleControllerMapper {
  static toCreateRequestDTO(dto: CreateScheduleHttpDTO): CreateScheduleRequestDTO {
    return {
      name: dto.name,
      type: dto.type as never,
      recurrence: dto.recurrence as never,
      scheduledAt: dto.scheduledAt,
      timezone: dto.timezone,
      cronExpression: dto.cronExpression,
      templateId: dto.templateId,
      recipientIds: dto.recipientIds ? [...dto.recipientIds] : undefined,
      data: dto.data,
    };
  }

  static toUpdateRequestDTO(
    scheduleId: string,
    dto: UpdateScheduleHttpDTO,
  ): UpdateScheduleRequestDTO {
    return {
      scheduleId,
      name: dto.name,
      scheduledAt: dto.scheduledAt,
      timezone: dto.timezone,
      cronExpression: dto.cronExpression,
      recipientIds: dto.recipientIds ? [...dto.recipientIds] : undefined,
    };
  }

  static toCancelRequestDTO(scheduleId: string, reason?: string): CancelScheduleRequestDTO {
    return { scheduleId, reason };
  }

  static toListOptions(q: ListSchedulesHttpQueryDTO): ScheduleListOptionsDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      filter: { status: q.status, type: q.type },
    };
  }

  static toHttpResponse(app: ScheduleResponseDTO): ScheduleHttpResponseDTO {
    return app as unknown as ScheduleHttpResponseDTO;
  }

  static toSummaryHttp(app: ScheduleSummaryResponseDTO): ScheduleSummaryHttpResponseDTO {
    return app as unknown as ScheduleSummaryHttpResponseDTO;
  }

  static toListHttp(app: ScheduleListResponseDTO): ScheduleListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
    };
  }
}
