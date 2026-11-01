/**
 * DeliveryMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { NotificationDeliveryEntity } from '@domain/entities/notification-delivery.entity.js';
import type { DeliveryResponseDTO } from '@application/dtos/responses/delivery-response.dto.js';

export class DeliveryMapper {
  static toResponse(entity: NotificationDeliveryEntity): DeliveryResponseDTO {
    return {
      id: entity.id,
      notificationId: entity.notificationId.value,
      channel: 'unknown',
      status: entity.status.value as never,
      providerName: entity.delivery.providerName?.value,
      providerMessageId: entity.delivery.providerMessageId?.value,
      attemptCount: entity.delivery.attemptCount,
      maxAttempts: entity.delivery.maxAttempts,
      sentAt: entity.delivery.sentAt,
      deliveredAt: entity.delivery.deliveredAt,
      failedAt: entity.delivery.failedAt,
      failureReason: undefined,
      durationMs: entity.delivery.deliveryDurationMs,
    };
  }
}
