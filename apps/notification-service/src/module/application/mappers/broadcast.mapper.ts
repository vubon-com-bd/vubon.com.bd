/**
 * BroadcastMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { BroadcastEntity } from '@domain/entities/broadcast.entity.js';
import type { BroadcastResultVO } from '@domain/composites/broadcast-result.vo.js';
import type {
  BroadcastResponseDTO,
  BroadcastSummaryResponseDTO,
  BroadcastListResponseDTO,
  BroadcastResultResponseDTO,
} from '@application/dtos/responses/broadcast-response.dto.js';

export class BroadcastMapper {
  static toResponse(entity: BroadcastEntity): BroadcastResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name,
      type: vo.type.value as never,
      target: vo.audience.target as never,
      status: vo.status.value as never,
      channels: vo.channels.map((c) => c.value),
      templateId: vo.templateId?.value,
      recipientCount: vo.recipientCount,
      sentCount: vo.sentCount,
      failedCount: vo.failedCount,
      scheduledAt: vo.scheduledAt,
      startedAt: vo.startedAt,
      completedAt: vo.completedAt,
      createdBy: vo.createdBy.value,
      approvedBy: vo.approvedBy?.value,
      createdAt: entity.createdAt,
    };
  }

  static toSummary(entity: BroadcastEntity): BroadcastSummaryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name,
      status: vo.status.value as never,
      recipientCount: vo.recipientCount,
      sentCount: vo.sentCount,
      failedCount: vo.failedCount,
      createdAt: entity.createdAt,
    };
  }

  static toListResponse(
    entities: readonly BroadcastEntity[],
    total: number,
    page: number,
    limit: number,
  ): BroadcastListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static toResultResponse(entity: BroadcastEntity): BroadcastResultResponseDTO {
    const vo = entity.vo;
    const totalAttempts = vo.sentCount + vo.failedCount;
    return {
      broadcastId: entity.id,
      recipientCount: vo.recipientCount,
      sentCount: vo.sentCount,
      deliveredCount: vo.sentCount,
      failedCount: vo.failedCount,
      openCount: 0,
      clickCount: 0,
      unsubscribedCount: 0,
      deliveryRate: totalAttempts > 0 ? vo.sentCount / totalAttempts : 0,
      openRate: 0,
      clickRate: 0,
      unsubscribeRate: 0,
      durationMs:
        vo.startedAt && vo.completedAt
          ? new Date(vo.completedAt).getTime() - new Date(vo.startedAt).getTime()
          : 0,
      throughputPerSecond: 0,
    };
  }

  static resultVOToResponse(vo: BroadcastResultVO): BroadcastResultResponseDTO {
    return {
      broadcastId: vo.broadcastId.value,
      recipientCount: vo.recipientCount,
      sentCount: vo.sentCount,
      deliveredCount: vo.deliveredCount,
      failedCount: vo.failedCount,
      openCount: vo.openCount,
      clickCount: vo.clickCount,
      unsubscribedCount: vo.unsubscribedCount,
      deliveryRate: vo.deliveryRate,
      openRate: vo.openRate,
      clickRate: vo.clickRate,
      unsubscribeRate: vo.unsubscribeRate,
      durationMs: vo.durationMs,
      throughputPerSecond: vo.throughputPerSecond,
    };
  }
}
