/**
 * Create Subscription Request DTO
 * @module vendor-service/application/dtos/requests/subscription
 */
export interface CreateSubscriptionRequestDTO {
  readonly vendorId: string;
  readonly plan: 'free' | 'basic' | 'standard' | 'premium' | 'enterprise';
  readonly cycle: 'monthly' | 'quarterly' | 'half_yearly' | 'yearly' | 'lifetime';
  readonly startTrial?: boolean;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
