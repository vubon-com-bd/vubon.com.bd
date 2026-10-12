/**
 * User Verification Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface UserVerificationResponseDTO {
  readonly userId: string;
  readonly emailVerified: boolean;
  readonly emailVerifiedAt?: string;
  readonly phoneVerified: boolean;
  readonly phoneVerifiedAt?: string;
  readonly identityVerified: boolean;
  readonly identityVerifiedAt?: string;
  readonly addressVerified: boolean;
  readonly addressVerifiedAt?: string;
  readonly kycStatus: string;
  readonly updatedAt: string;
}
