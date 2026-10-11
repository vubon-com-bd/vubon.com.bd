/**
 * BroadcastMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { BroadcastEntity } from '../../domain/entities/broadcast.entity.js';
import type {
  BroadcastResponseDTO,
  BroadcastListResponseDTO,
  BroadcastStatsResponseDTO,
  BroadcastProgressResponseDTO,
} from '../dtos/responses/broadcast-response.dto.js';
import type {
  NotificationBroadcastTypeValue,
  NotificationBroadcastStatusValue,
  NotificationBroadcastTargetValue,
} from '@vubon/shared-types/platform/notification';

export class BroadcastMapper {
  static toResponse(entity: BroadcastEntity): BroadcastResponseDTO {
    return {
      id: entity.id,
      type: entity.type.value as NotificationBroadcastTypeValue,
      status: entity.status.value as NotificationBroadcastStatusValue,
      target: entity.target.value as NotificationBroadcastTargetValue,
      templateId: entity.templateId,
      estimatedRecipients: entity.estimatedRecipients,
      totalRecipients: entity.totalRecipients,
      processed: entity.processed,
      succeeded: entity.succeeded,
      failed: entity.failed,
      progressPercent: entity.progressPercent(),
      scheduledAt: entity.scheduledAt,
      startedAt: entity.startedAt,
      completedAt: entity.completedAt,
      failureReasons: entity.failureReasons.length > 0 ? entity.failureReasons : undefined,
      createdBy: entity.createdBy,
      approvedBy: entity.approvedBy,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toListResponse(
    entities: readonly BroadcastEntity[],
    total: number,
    page: number,
    limit: number,
  ): BroadcastListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static toStats(entity: BroadcastEntity): BroadcastStatsResponseDTO {
    const total = entity.totalRecipients ?? 0;
    const processed = entity.processed;
    const successRate = processed > 0 ? entity.succeeded / processed : 0;
    const failureRate = processed > 0 ? entity.failed / processed : 0;
    return {
      broadcastId: entity.id,
      totalRecipients: total,
      processed,
      succeeded: entity.succeeded,
      failed: entity.failed,
      progressPercent: entity.progressPercent(),
      deliveryRate: Math.round(successRate * 10000) / 100,
      failureRate: Math.round(failureRate * 10000) / 100,
    };
  }

  static toProgress(entity: BroadcastEntity): BroadcastProgressResponseDTO {
    return {
      broadcastId: entity.id,
      processed: entity.processed,
      total: entity.totalRecipients ?? 0,
      succeeded: entity.succeeded,
      failed: entity.failed,
      progressPercent: entity.progressPercent(),
    };
  }
}
