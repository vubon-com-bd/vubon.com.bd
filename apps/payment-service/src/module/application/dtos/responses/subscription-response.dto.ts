/**
 * Subscription Response DTOs
 * @module payment-service/application/dtos/responses
 */
import type { SubscriptionStatusValue } from '@domain/primitives/subscription-status.vo';
import type { SubscriptionPlanValue } from '@domain/primitives/subscription-plan.vo';
import type { RecurringIntervalValue } from '@domain/primitives/recurring-frequency.vo';

export interface SubscriptionResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly status: SubscriptionStatusValue;
  readonly plan: SubscriptionPlanValue;
  readonly interval: RecurringIntervalValue;
  readonly intervalCount: number;
  readonly price: number;
  readonly currency: string;
  readonly startedAt: string;
  readonly currentPeriodStart: string;
  readonly currentPeriodEnd: string;
  readonly trialEndsAt?: string;
  readonly cancelledAt?: string;
  readonly cancelAtPeriodEnd: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface SubscriptionSummaryResponseDTO {
  readonly id: string;
  readonly status: SubscriptionStatusValue;
  readonly plan: SubscriptionPlanValue;
  readonly price: number;
  readonly currency: string;
  readonly currentPeriodEnd: string;
}

export interface SubscriptionListResponseDTO {
  readonly items: readonly SubscriptionSummaryResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface SubscriptionStatsResponseDTO {
  readonly total: number;
  readonly active: number;
  readonly trialing: number;
  readonly cancelled: number;
  readonly totalMrr: number;
  readonly currency: string;
  readonly byPlan: Readonly<Record<string, number>>;
}
