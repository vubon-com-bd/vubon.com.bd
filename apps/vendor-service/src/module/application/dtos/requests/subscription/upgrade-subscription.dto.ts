/**
 * Upgrade Subscription Request DTO
 * @module vendor-service/application/dtos/requests/subscription
 */
export interface UpgradeSubscriptionRequestDTO {
  readonly subscriptionId: string;
  readonly plan: 'basic' | 'standard' | 'premium' | 'enterprise';
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
