import { Injectable } from '@nestjs/common';
import { AbandonedCartEntity } from '../../domain/entities/abandoned-cart.entity';
import type { AbandonedCartResponseDTO } from '../dtos/responses/abandoned-cart-response.dto';

@Injectable()
export class AbandonedCartMapper {
  toResponse(entity: AbandonedCartEntity): AbandonedCartResponseDTO {
    return {
      id: entity.id.value,
      cartId: entity.cartId.value,
      userId: entity.userId?.value,
      itemCount: entity.itemCount,
      subtotalAmount: entity.subtotalAmount,
      currency: entity.currency,
      status: entity.status.value,
      reminderCount: entity.reminder.count,
      abandonedAt: entity.abandonedAt.toISOString(),
      recoveredAt: entity.recoveredAt?.toISOString(),
    };
  }
}
