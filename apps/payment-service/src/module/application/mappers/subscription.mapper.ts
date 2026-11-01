/**
 * SubscriptionMapper — Entity → Response DTO
 * @module payment-service/application/mappers
 */
import type { SubscriptionEntity } from '@domain/entities/subscription.entity';
import type {
  SubscriptionResponseDTO,
  SubscriptionSummaryResponseDTO,
  SubscriptionListResponseDTO,
} from '@application/dtos/responses/subscription-response.dto';

export class SubscriptionMapper {
  static toResponse(e: SubscriptionEntity): SubscriptionResponseDTO {
    return {
      id: e.id,
      userId: e.userId.value,
      status: e.status.value,
      plan: e.plan.value,
      interval: e.frequency.interval,
      intervalCount: e.frequency.intervalCount,
      price: e.price.amount,
      currency: e.price.currency,
      startedAt: e.startedAt,
      currentPeriodStart: e.currentPeriodStart,
      currentPeriodEnd: e.currentPeriodEnd,
      trialEndsAt: e.trialEndsAt,
      cancelledAt: e.cancelledAt,
      cancelAtPeriodEnd: e.cancelAtPeriodEnd,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    };
  }

  static toSummary(e: SubscriptionEntity): SubscriptionSummaryResponseDTO {
    return {
      id: e.id,
      status: e.status.value,
      plan: e.plan.value,
      price: e.price.amount,
      currency: e.price.currency,
      currentPeriodEnd: e.currentPeriodEnd,
    };
  }

  static toListResponse(
    entities: readonly SubscriptionEntity[],
    total: number,
    page: number,
    limit: number,
  ): SubscriptionListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
