/**
 * VendorSubscriptionResponseDto
 * @module vendor-service/application/dtos/responses
 */
import type {
  VENDOR_SUBSCRIPTION_PLAN,
  VENDOR_SUBSCRIPTION_STATUS,
  VENDOR_SUBSCRIPTION_CYCLE,
} from '@vubon/shared-constants/business';

export interface VendorSubscriptionResponseDto {
  readonly id: string;
  readonly vendorId: string;
  readonly plan: (typeof VENDOR_SUBSCRIPTION_PLAN)[keyof typeof VENDOR_SUBSCRIPTION_PLAN];
  readonly status: (typeof VENDOR_SUBSCRIPTION_STATUS)[keyof typeof VENDOR_SUBSCRIPTION_STATUS];
  readonly cycle: (typeof VENDOR_SUBSCRIPTION_CYCLE)[keyof typeof VENDOR_SUBSCRIPTION_CYCLE];
  readonly price: number;
  readonly currency: string;
  readonly startedAt: string;
  readonly currentPeriodStart: string;
  readonly currentPeriodEnd: string;
  readonly trialEndsAt?: string;
  readonly cancelledAt?: string;
  readonly cancelAtPeriodEnd: boolean;
  readonly autoRenew: boolean;
  readonly features: readonly string[];
  readonly daysUntilRenewal: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface VendorSubscriptionPublicDto {
  readonly vendorId: string;
  readonly plan: (typeof VENDOR_SUBSCRIPTION_PLAN)[keyof typeof VENDOR_SUBSCRIPTION_PLAN];
  readonly status: (typeof VENDOR_SUBSCRIPTION_STATUS)[keyof typeof VENDOR_SUBSCRIPTION_STATUS];
  readonly cycle: (typeof VENDOR_SUBSCRIPTION_CYCLE)[keyof typeof VENDOR_SUBSCRIPTION_CYCLE];
  readonly price: number;
  readonly currency: string;
  readonly currentPeriodEnd: string;
}
