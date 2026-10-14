/**
 * SubscriptionMapper
 * @module vendor-service/application/mappers
 */
import type { VendorSubscriptionEntity } from '../../domain/entities/vendor-subscription.entity.js';
import type {
  SubscriptionResponseDTO,
  SubscriptionPublicResponseDTO,
  SubscriptionSummaryResponseDTO,
} from '../dtos/responses/subscription-response.dto.js';

export class SubscriptionMapper {
  static toResponse(entity: VendorSubscriptionEntity): SubscriptionResponseDTO {
    return {
      id: entity.id,
      vendorId: entity.vendorId.value,
      plan: entity.plan.value,
      status: entity.status,
      cycle: entity.cycle,
      priceAmount: entity.priceAmount,
      currency: entity.currency,
      startedAt: entity.startedAt,
      trialEndsAt: entity.trialEndsAt,
      currentPeriodStart: entity.currentPeriodStart,
      currentPeriodEnd: entity.currentPeriodEnd,
      cancelledAt: entity.cancelledAt,
      cancellationReason: entity.vo.cancellationReason,
      cancelAtPeriodEnd: entity.cancelAtPeriodEnd,
      autoRenew: entity.autoRenew,
      lastPaymentAt: entity.vo.lastPaymentAt,
      nextPaymentAt: entity.nextPaymentAt,
      daysRemainingInPeriod: entity.daysRemainingInPeriod,
      trialDaysRemaining: entity.trialDaysRemaining,
      monthlyEquivalent: entity.monthlyEquivalent,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toPublicResponse(entity: VendorSubscriptionEntity): SubscriptionPublicResponseDTO {
    return {
      id: entity.id,
      plan: entity.plan.value,
      status: entity.status,
      cycle: entity.cycle,
      priceAmount: entity.priceAmount,
      currency: entity.currency,
      currentPeriodEnd: entity.currentPeriodEnd,
      autoRenew: entity.autoRenew,
    };
  }

  static toSummary(entity: VendorSubscriptionEntity): SubscriptionSummaryResponseDTO {
    return {
      id: entity.id,
      plan: entity.plan.value,
      status: entity.status,
      cycle: entity.cycle,
      priceAmount: entity.priceAmount,
      currency: entity.currency,
    };
  }
}
