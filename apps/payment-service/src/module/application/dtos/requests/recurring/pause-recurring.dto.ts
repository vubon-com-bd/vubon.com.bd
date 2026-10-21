/**
 * PauseRecurringRequestDTO
 * @module payment-service/application/dtos/requests/recurring
 */
export interface PauseRecurringRequestDTO {
  readonly recurringId: string;
  readonly reason?: string;
}

export interface PauseRecurringContextDTO {
  readonly request: PauseRecurringRequestDTO;
  readonly actorId?: string;
}
