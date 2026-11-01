/**
 * UpgradeSubscriptionRequestDTO
 * @module payment-service/application/dtos/requests/subscription
 */
import type { SubscriptionPlanValue } from '@domain/primitives/subscription-plan.vo';

export interface UpgradeSubscriptionRequestDTO {
  readonly subscriptionId: string;
  readonly newPlan: SubscriptionPlanValue;
  readonly newPrice: number;
  readonly currency: string;
  readonly prorate?: boolean;
  readonly idempotencyKey?: string;
}

export interface UpgradeSubscriptionContextDTO {
  readonly request: UpgradeSubscriptionRequestDTO;
  readonly userId: string;
}
