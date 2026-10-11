/**
 * DigestMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { DigestEntity } from '../../domain/entities/digest.entity.js';
import type {
  DigestResponseDTO,
  DigestListResponseDTO,
  DigestPreviewResponseDTO,
} from '../dtos/responses/digest-response.dto.js';
import type {
  NotificationDigestFrequencyValue,
  NotificationDigestTypeValue,
  NotificationDigestStatusValue,
} from '@vubon/shared-types/platform/notification';

export class DigestMapper {
  static toResponse(entity: DigestEntity): DigestResponseDTO {
    return {
      id: entity.id,
      userId: entity.userId,
      frequency: entity.frequency.value as NotificationDigestFrequencyValue,
      type: entity.type.value as NotificationDigestTypeValue,
      status: entity.status.value as NotificationDigestStatusValue,
      periodStart: entity.periodStart,
      periodEnd: entity.periodEnd,
      itemCount: entity.itemCount,
      itemIds: entity.itemIds,
      generatedAt: entity.generatedAt,
      sentAt: entity.sentAt,
      channel: entity.channel,
      failureReason: entity.failureReason,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toListResponse(
    entities: readonly DigestEntity[],
    total: number,
    page: number,
    limit: number,
  ): DigestListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static toPreview(
    userId: string,
    items: readonly {
      id: string;
      type: string;
      title: string;
      category: string;
      createdAt: string;
    }[],
  ): DigestPreviewResponseDTO {
    return {
      userId,
      itemCount: items.length,
      items,
    };
  }
}
