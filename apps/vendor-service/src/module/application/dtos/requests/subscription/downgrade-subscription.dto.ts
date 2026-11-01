/**
 * Downgrade Subscription Request DTO
 * @module vendor-service/application/dtos/requests/subscription
 */
export interface DowngradeSubscriptionRequestDTO {
  readonly subscriptionId: string;
  readonly plan: 'free' | 'basic' | 'standard' | 'premium';
  readonly reason?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
