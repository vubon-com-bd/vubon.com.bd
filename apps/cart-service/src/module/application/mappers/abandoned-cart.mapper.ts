/**
 * AbandonedCartMapper — Entity → Response DTO
 */
import { AbandonedCartEntity } from '../../domain/entities/abandoned-cart.entity.js';
import type { AbandonedCartResponseDTO } from '../dtos/responses/abandoned-cart-response.dto.js';

export class AbandonedCartMapper {
  static toResponse(e: AbandonedCartEntity): AbandonedCartResponseDTO {
    return {
      id: e.id,
      cartId: e.cartId.value,
      userId: e.userId?.value,
      email: e.email,
      status: e.status.value,
      reminderType: e.reminderType.value,
      itemCount: e.itemCount,
      cartValue: e.cartValue,
      currency: e.currency,
      abandonedAt: e.abandonedAt,
      remindersSent: e.remindersSent,
      lastReminderAt: e.lastReminderAt,
      recoveredAt: e.recoveredAt,
      recoveredOrderId: e.recoveredOrderId,
    };
  }
}
