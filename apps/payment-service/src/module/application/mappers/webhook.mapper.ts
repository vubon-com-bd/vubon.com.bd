/**
 * WebhookMapper — Entity → Response DTO
 * @module payment-service/application/mappers
 */
import type { WebhookEventEntity } from '../../domain/entities/webhook-event.entity.js';
import type {
  WebhookEventResponseDTO,
  WebhookListResponseDTO,
} from '../dtos/responses/webhook-response.dto.js';

export class WebhookMapper {
  static toResponse(entity: WebhookEventEntity): WebhookEventResponseDTO {
    return {
      id: entity.id,
      gateway: entity.gateway,
      gatewayEventId: entity.gatewayEventId,
      eventType: entity.eventType,
      verified: entity.verified,
      processed: entity.processed,
      attempts: entity.attempts,
      paymentId: entity.paymentId?.value,
      receivedAt: entity.receivedAt,
      verifiedAt: entity.verifiedAt,
      processedAt: entity.processedAt,
      failedAt: entity.failedAt,
    };
  }

  static toListResponse(
    entities: readonly WebhookEventEntity[],
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
