/**
 * Delete Bank Account Request DTO
 * @module vendor-service/application/dtos/requests/bank-account
 */
export interface DeleteBankAccountRequestDTO {
  readonly bankAccountId: string;
  readonly reason?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
