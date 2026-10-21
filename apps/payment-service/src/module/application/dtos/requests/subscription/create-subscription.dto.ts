/**
 * CreateSubscriptionRequestDTO
 * @module payment-service/application/dtos/requests/subscription
 */
import type { SubscriptionPlanValue } from '@domain/primitives/subscription-plan.vo';
import type { RecurringIntervalValue } from '@domain/primitives/recurring-frequency.vo';
import type { PaymentMethodValue } from '@vubon/shared-types/business/payment';

export interface CreateSubscriptionRequestDTO {
  readonly plan: SubscriptionPlanValue;
  readonly interval: RecurringIntervalValue;
  readonly intervalCount: number;
  readonly price: number;
  readonly currency: string;
  readonly method: PaymentMethodValue;
  readonly gateway?: string;
  readonly trialDays?: number;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly idempotencyKey?: string;
}

export interface CreateSubscriptionContextDTO {
  readonly request: CreateSubscriptionRequestDTO;
  readonly userId: string;
}
