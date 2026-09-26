import { Injectable } from '@nestjs/common';
import type { AbandonedCartEntity } from '../../domain/entities/abandoned-cart.entity';
import { AbandonedCartResponseDto } from '../dtos/responses/abandoned-cart.response.dto';

@Injectable()
export class AbandonedCartControllerMapper {
  toResponse(entity: AbandonedCartEntity): AbandonedCartResponseDto {
    return {
      id: entity.id.value,
      cartId: entity.cartId.value,
      userId: entity.userId?.value ?? null,
      itemCount: entity.itemCount,
      subtotalAmount: entity.subtotalAmount,
      currency: entity.currency,
      status: entity.status.value,
      reminderCount: entity.reminder.count,
      abandonedAt: entity.abandonedAt.toISOString(),
      recoveredAt: entity.recoveredAt?.toISOString() ?? null,
    };
  }
}
