/**
 * PauseSubscriptionRequestDTO
 * @module payment-service/application/dtos/requests/subscription
 */
export interface PauseSubscriptionRequestDTO {
  readonly subscriptionId: string;
  readonly resumeAt?: string;
  readonly reason?: string;
}

export interface PauseSubscriptionContextDTO {
  readonly request: PauseSubscriptionRequestDTO;
  readonly userId: string;
}
