/**
 * Recovery Codes Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface RecoveryCodesResponseDTO {
  readonly success: true;
  readonly codes: readonly string[];
  readonly generatedAt: string;
  readonly remainingCount: number;
}
