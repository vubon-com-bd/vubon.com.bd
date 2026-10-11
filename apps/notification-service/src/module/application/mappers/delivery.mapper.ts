/**
 * DeliveryMapper — Entity → Response DTO
 * @module notification-service/application/mappers
 */
import type { NotificationEntity } from '../../domain/entities/notification.entity.js';
import type {
  DeliveryResponseDTO,
  DeliveryRetryResponseDTO,
} from '../dtos/responses/delivery-response.dto.js';
import type { NotificationDeliveryStatusValue } from '@vubon/shared-types/platform/notification';

export class DeliveryMapper {
  static toResponse(entity: NotificationEntity): DeliveryResponseDTO {
    return {
      notificationId: entity.id,
      status: entity.deliveryStatus.value as NotificationDeliveryStatusValue,
      attemptCount: entity.deliveryAttempts,
      lastAttemptAt: entity.sentAt,
      deliveredAt: entity.deliveredAt,
      sentAt: entity.sentAt,
      failureReason: entity.failureReason?.value,
      attempts: [],
    };
  }

  static toRetryResponse(input: {
    notificationId: string;
    scheduled: boolean;
    attempt: number;
    nextAttemptAt?: string;
    delayMs?: number;
    reason?: string;
  }): DeliveryRetryResponseDTO {
    return input;
  }
}
