/**
 * RecoveryCodesResponseDTO — Plain codes only returned once at generation
 * @module auth-service/application/dtos/responses
 */
export interface RecoveryCodesResponseDTO {
  readonly codes: readonly string[];
  readonly generatedAt: string;
  readonly expiresAt?: string;
}
