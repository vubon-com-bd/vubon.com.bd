/**
 * DowngradeSubscriptionRequestDTO
 * @module payment-service/application/dtos/requests/subscription
 */
import type { SubscriptionPlanValue } from '@domain/primitives/subscription-plan.vo';

export interface DowngradeSubscriptionRequestDTO {
  readonly subscriptionId: string;
  readonly newPlan: SubscriptionPlanValue;
  readonly newPrice: number;
  readonly currency: string;
  readonly effectiveAt?: 'immediate' | 'period_end';
  readonly idempotencyKey?: string;
}

export interface DowngradeSubscriptionContextDTO {
  readonly request: DowngradeSubscriptionRequestDTO;
  readonly userId: string;
}
