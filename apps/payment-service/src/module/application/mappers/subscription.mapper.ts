import { Injectable } from '@nestjs/common';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import type { SubscriptionResponseDTO } from '../dtos/responses/subscription-response.dto';

@Injectable()
export class SubscriptionMapper {
  toResponse(entity: SubscriptionEntity): SubscriptionResponseDTO {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      plan: entity.plan.value,
      status: entity.status.value,
      currentPeriodFrom: entity.currentPeriodFrom.toISOString(),
      currentPeriodTo: entity.currentPeriodTo.toISOString(),
      cancelledAt: entity.cancelledAt?.toISOString(),
      createdAt: entity.createdAt,
    };
  }
}
