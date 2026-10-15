/**
 * AbandonedCartMapper — Entity → Response DTO
 * @module cart-service/application/mappers
 */
import type { AbandonedCartEntity } from '../../domain/entities/abandoned-cart.entity.js';
import type {
  AbandonedCartResponseDTO,
  AbandonedCartPublicResponseDTO,
} from '../dtos/responses/abandoned-cart-response.dto.js';

export class AbandonedCartMapper {
  static toResponse(entity: AbandonedCartEntity): AbandonedCartResponseDTO {
    return {
      id: entity.id,
      cartId: entity.cartId.value,
      userId: entity.userId?.value,
      email: entity.email,
      status: entity.status.value,
      itemCount: entity.itemCount,
      cartValue: entity.cartValue,
      currency: entity.currency,
      abandonedAt: entity.abandonedAt,
      remindersSent: entity.remindersSent,
      lastReminderAt: entity.lastReminderAt,
      recoveredAt: entity.recoveredAt,
      recoveredOrderId: entity.recoveredOrderId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: AbandonedCartEntity): AbandonedCartPublicResponseDTO {
    return {
      id: entity.id,
      status: entity.status.value,
      itemCount: entity.itemCount,
      cartValue: entity.cartValue,
      currency: entity.currency,
      abandonedAt: entity.abandonedAt,
      remindersSent: entity.remindersSent,
    };
  }
}
