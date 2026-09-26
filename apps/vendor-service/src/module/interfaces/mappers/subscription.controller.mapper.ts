import { Injectable } from '@nestjs/common';
import type { SubscriptionResponseDto } from '../dtos/responses/subscription.response.dto';

@Injectable()
export class SubscriptionControllerMapper {
  toResponse(input: {
    id: string;
    vendorId: string;
    plan: string;
    price: number;
    currency: string;
    startedAt: string;
    expiresAt: string;
    autoRenew: boolean;
    cancelledAt: string | null;
    isActive: boolean;
  }): SubscriptionResponseDto {
    return {
      id: input.id,
      vendorId: input.vendorId,
      plan: input.plan,
      price: input.price,
      currency: input.currency,
      startedAt: input.startedAt,
      expiresAt: input.expiresAt,
      autoRenew: input.autoRenew,
      cancelledAt: input.cancelledAt,
      isActive: input.isActive,
    };
  }
}
