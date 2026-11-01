/**
 * CancelRecurringRequestDTO
 * @module payment-service/application/dtos/requests/recurring
 */
export interface CancelRecurringRequestDTO {
  readonly recurringId: string;
  readonly reason: string;
  readonly cancelledBy?: string;
}

export interface CancelRecurringContextDTO {
  readonly request: CancelRecurringRequestDTO;
  readonly actorId?: string;
}
