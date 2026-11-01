/**
 * Set Default Bank Account Request DTO
 * @module vendor-service/application/dtos/requests/bank-account
 */
export interface SetDefaultAccountRequestDTO {
  readonly bankAccountId: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
