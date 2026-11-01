/**
 * Add Bank Account Request DTO
 * @module vendor-service/application/dtos/requests/bank-account
 */
export interface AddBankAccountRequestDTO {
  readonly vendorId: string;
  readonly bankName: string;
  readonly accountNumber: string;
  readonly accountHolderName: string;
  readonly branchName?: string;
  readonly routingNumber?: string;
  readonly swiftCode?: string;
  readonly iban?: string;
  readonly accountType: 'savings' | 'current' | 'business' | 'other';
  readonly currency: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
