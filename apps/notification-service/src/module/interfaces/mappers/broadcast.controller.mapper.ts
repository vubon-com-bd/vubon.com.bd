/**
 * BroadcastControllerMapper
 * @module notification-service/interfaces/mappers
 */
import type {
  CreateBroadcastHttpDTO,
  UpdateBroadcastHttpDTO,
  ScheduleBroadcastHttpDTO,
  StartBroadcastHttpDTO,
  CancelBroadcastHttpDTO,
  TestBroadcastHttpDTO,
  ListBroadcastsHttpQueryDTO,
} from '../dtos/requests/broadcast/broadcast.http-dto.js';
import type {
  CreateBroadcastRequestDTO,
  UpdateBroadcastRequestDTO,
  ScheduleBroadcastRequestDTO,
  StartBroadcastRequestDTO,
  CancelBroadcastRequestDTO,
  TestBroadcastRequestDTO,
  ListBroadcastsRequestDTO,
} from '../../application/dtos/requests/broadcast/broadcast.dto.js';

export class BroadcastControllerMapper {
  static toCreateAppDto(dto: CreateBroadcastHttpDTO): CreateBroadcastRequestDTO {
    return {
      type: dto.type as never,
      target: dto.target as never,
      templateId: dto.templateId,
      channels: dto.channels,
      estimatedRecipients: dto.estimatedRecipients,
      scheduledAt: dto.scheduledAt,
      segmentFilter: dto.segmentFilter,
      customRecipientIds: dto.customRecipientIds,
      data: dto.data,
    };
  }

  static toUpdateAppDto(broadcastId: string, dto: UpdateBroadcastHttpDTO): UpdateBroadcastRequestDTO {
    return {
      broadcastId,
      templateId: dto.templateId,
      channels: dto.channels,
      estimatedRecipients: dto.estimatedRecipients,
      scheduledAt: dto.scheduledAt,
      segmentFilter: dto.segmentFilter,
    };
  }

  static toScheduleAppDto(broadcastId: string, dto: ScheduleBroadcastHttpDTO): ScheduleBroadcastRequestDTO {
    return { broadcastId, scheduledAt: dto.scheduledAt };
  }

  static toStartAppDto(broadcastId: string, dto: StartBroadcastHttpDTO): StartBroadcastRequestDTO {
    return {
      broadcastId,
      totalRecipients: dto.totalRecipients,
      approvedBy: dto.approvedBy,
    };
  }

  static toCancelAppDto(broadcastId: string, dto: CancelBroadcastHttpDTO): CancelBroadcastRequestDTO {
    return { broadcastId, reason: dto.reason };
  }

  static toTestAppDto(broadcastId: string, dto: TestBroadcastHttpDTO): TestBroadcastRequestDTO {
    return { broadcastId, recipientIds: dto.recipientIds };
  }

  static toListAppDto(q: ListBroadcastsHttpQueryDTO): ListBroadcastsRequestDTO {
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: q.sortBy as never,
      sortDir: q.sortDir,
      filter: {
        type: q.type,
        status: q.status,
        templateId: q.templateId,
        createdBy: q.createdBy,
        fromDate: q.fromDate,
        toDate: q.toDate,
      },
    };
  }
}
