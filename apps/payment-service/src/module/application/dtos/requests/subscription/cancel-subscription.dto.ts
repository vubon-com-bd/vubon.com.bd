/**
 * CancelSubscriptionRequestDTO
 * @module payment-service/application/dtos/requests/subscription
 */
export interface CancelSubscriptionRequestDTO {
  readonly subscriptionId: string;
  readonly reason: string;
  readonly cancelAtPeriodEnd: boolean;
}

export interface CancelSubscriptionContextDTO {
  readonly request: CancelSubscriptionRequestDTO;
  readonly userId: string;
}
