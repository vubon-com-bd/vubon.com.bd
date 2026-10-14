/**
 * Bank Account Response DTOs
 * @module vendor-service/application/dtos/responses
 */
export interface BankAccountResponseDTO {
  readonly id: string;
  readonly vendorId: string;
  readonly bankName: string;
  readonly accountNumber: string;
  readonly maskedAccountNumber: string;
  readonly accountHolderName: string;
  readonly branchName?: string;
  readonly routingNumber?: string;
  readonly swiftCode?: string;
  readonly iban?: string;
  readonly accountType: string;
  readonly currency: string;
  readonly isDefault: boolean;
  readonly isVerified: boolean;
  readonly verifiedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface BankAccountSummaryResponseDTO {
  readonly id: string;
  readonly bankName: string;
  readonly maskedAccountNumber: string;
  readonly currency: string;
  readonly isDefault: boolean;
  readonly isVerified: boolean;
}

export interface BankAccountListResponseDTO {
  readonly items: readonly BankAccountSummaryResponseDTO[];
  readonly total: number;
}
