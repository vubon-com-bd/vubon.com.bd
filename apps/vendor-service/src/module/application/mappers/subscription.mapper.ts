import { VendorSubscriptionEntity } from '../../domain/entities/vendor-subscription.entity';
import type { SubscriptionResponseDto } from '../dtos/responses/subscription-response.dto';

export class SubscriptionMapper {
  static toDto(entity: VendorSubscriptionEntity): SubscriptionResponseDto {
    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      plan: entity.plan.value,
      price: entity.price.amount,
      currency: entity.price.currency,
      startedAt: entity.startedAt.toISOString(),
      expiresAt: entity.expiresAt.toISOString(),
      autoRenew: entity.autoRenew,
      cancelledAt: entity.cancelledAt?.toISOString() ?? null,
      isActive: entity.isActive,
    };
  }
}
