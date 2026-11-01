/**
 * Subscription Response DTOs
 * @module vendor-service/application/dtos/responses
 */
export interface SubscriptionResponseDTO {
  readonly id: string;
  readonly vendorId: string;
  readonly plan: string;
  readonly status: string;
  readonly cycle: string;
  readonly priceAmount: number;
  readonly currency: string;
  readonly startedAt: string;
  readonly trialEndsAt?: string;
  readonly currentPeriodStart: string;
  readonly currentPeriodEnd: string;
  readonly cancelledAt?: string;
  readonly cancellationReason?: string;
  readonly cancelAtPeriodEnd: boolean;
  readonly autoRenew: boolean;
  readonly lastPaymentAt?: string;
  readonly nextPaymentAt?: string;
  readonly daysRemainingInPeriod: number;
  readonly trialDaysRemaining: number | null;
  readonly monthlyEquivalent: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface SubscriptionPublicResponseDTO {
  readonly id: string;
  readonly plan: string;
  readonly status: string;
  readonly cycle: string;
  readonly priceAmount: number;
  readonly currency: string;
  readonly currentPeriodEnd: string;
  readonly autoRenew: boolean;
}

export interface SubscriptionSummaryResponseDTO {
  readonly id: string;
  readonly plan: string;
  readonly status: string;
  readonly cycle: string;
  readonly priceAmount: number;
  readonly currency: string;
}

export interface SubscriptionStatsResponseDTO {
  readonly total: number;
  readonly active: number;
  readonly trial: number;
  readonly pastDue: number;
  readonly cancelled: number;
  readonly expired: number;
  readonly byPlan: Readonly<Record<string, number>>;
  readonly monthlyRevenue: number;
}

export interface SubscriptionPlanResponseDTO {
  readonly plan: string;
  readonly displayName: string;
  readonly priceMonthly: number;
  readonly priceYearly: number;
  readonly currency: string;
  readonly features: readonly string[];
  readonly maxProducts: number | null;
  readonly maxTeamMembers: number;
}

export interface SubscriptionPlanListResponseDTO {
  readonly plans: readonly SubscriptionPlanResponseDTO[];
}
