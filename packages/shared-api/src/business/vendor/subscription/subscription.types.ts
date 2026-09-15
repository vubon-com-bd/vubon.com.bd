export type SubscriptionPlan = 'free' | 'basic' | 'pro' | 'enterprise';
export type SubscriptionStatus = 'active' | 'past_due' | 'cancelled';

export interface VendorSubscription {
  readonly vendorId: string;
  readonly plan: SubscriptionPlan;
  readonly status: SubscriptionStatus;
  readonly startsAt: string;
  readonly renewsAt?: string;
  readonly features: readonly string[];
}
