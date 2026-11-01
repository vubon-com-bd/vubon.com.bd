/**
 * Cancel Subscription Request DTO
 * @module vendor-service/application/dtos/requests/subscription
 */
export interface CancelSubscriptionRequestDTO {
  readonly subscriptionId: string;
  readonly reason: string;
  readonly cancelAtPeriodEnd?: boolean;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
