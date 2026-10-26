/**
 * WebhookMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { WebhookEntity } from '@domain/entities/webhook.entity.js';
import type {
  WebhookResponseDTO,
  WebhookSummaryResponseDTO,
  WebhookListResponseDTO,
} from '@application/dtos/responses/webhook-response.dto.js';

export class WebhookMapper {
  static toResponse(entity: WebhookEntity): WebhookResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name,
      type: vo.type.value,
      status: vo.status.value as never,
      url: vo.url.value,
      events: [...vo.events],
      headers: vo.headers,
      hasSecret: vo.hasSecret(),
      lastTriggeredAt: vo.lastTriggeredAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSummary(entity: WebhookEntity): WebhookSummaryResponseDTO {
    const vo = entity.vo;
    return {
      id: entity.id,
      name: vo.name,
      status: vo.status.value as never,
      url: vo.url.value,
      eventCount: vo.eventCount,
      lastTriggeredAt: vo.lastTriggeredAt,
    };
  }

  static toListResponse(
    entities: readonly WebhookEntity[],
    total: number,
    page: number,
    limit: number,
  ): WebhookListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
