/**
 * ReverseTransactionRequestDTO
 * @module payment-service/application/dtos/requests/transaction
 */
export interface ReverseTransactionRequestDTO {
  readonly transactionId: string;
  readonly reason: string;
  readonly idempotencyKey?: string;
}

export interface ReverseTransactionContextDTO {
  readonly request: ReverseTransactionRequestDTO;
  readonly actorId?: string;
}
