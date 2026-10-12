/**
 * User KYC Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface KycDocumentResponseDTO {
  readonly type: string;
  readonly number: string;
  readonly verified: boolean;
}

export interface UserKycResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly status: string;
  readonly documents: readonly KycDocumentResponseDTO[];
  readonly submittedAt?: string;
  readonly verifiedAt?: string;
  readonly rejectedAt?: string;
  readonly rejectionReason?: string;
  readonly expiresAt?: string;
  readonly updatedAt: string;
}
