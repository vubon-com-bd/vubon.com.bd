import { Injectable } from '@nestjs/common';
import type { SubscriptionResponseDTO } from '../../application/dtos/responses/subscription-response.dto';
import { SubscriptionResponseDto } from '../dtos/responses/subscription.response.dto';

@Injectable()
export class SubscriptionControllerMapper {
  toResponse(app: SubscriptionResponseDTO): SubscriptionResponseDto {
    return {
      id: app.id,
      userId: app.userId,
      plan: app.plan,
      status: app.status,
      currentPeriodFrom: app.currentPeriodFrom,
      currentPeriodTo: app.currentPeriodTo,
      cancelledAt: app.cancelledAt ?? undefined,
      createdAt: app.createdAt,
    };
  }
}
