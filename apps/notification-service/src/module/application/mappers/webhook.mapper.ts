/**
 * WebhookMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { WebhookEntity } from '../../domain/entities/webhook.entity.js';
import type {
  WebhookResponseDTO,
  WebhookListResponseDTO,
} from '../dtos/responses/webhook-response.dto.js';
import type {
  WebhookMethodValue,
  WebhookStatusValue,
  WebhookEventValue,
} from '@vubon/shared-types/platform/notification';

export class WebhookMapper {
  static toResponse(entity: WebhookEntity): WebhookResponseDTO {
    return {
      id: entity.id,
      url: entity.url.value,
      method: entity.method.value as WebhookMethodValue,
      status: entity.status.value as WebhookStatusValue,
      events: entity.events.map((e) => e.value as WebhookEventValue),
      hasSecret: entity.hasSecret(),
      description: entity.description,
      failureCount: entity.failureCount,
      lastSuccessAt: entity.lastSuccessAt,
      lastFailureAt: entity.lastFailureAt,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toListResponse(
    entities: readonly WebhookEntity[],
    total: number,
    page: number,
    limit: number,
  ): WebhookListResponseDTO {
    return {
      items: entities.map((e) => this.toResponse(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
