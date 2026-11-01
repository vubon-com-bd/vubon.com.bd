/**
 * Update Bank Account Request DTO
 * @module vendor-service/application/dtos/requests/bank-account
 */
export interface UpdateBankAccountRequestDTO {
  readonly bankAccountId: string;
  readonly bankName?: string;
  readonly accountHolderName?: string;
  readonly branchName?: string;
  readonly routingNumber?: string;
  readonly swiftCode?: string;
  readonly iban?: string;
  readonly accountType?: 'savings' | 'current' | 'business' | 'other';
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
