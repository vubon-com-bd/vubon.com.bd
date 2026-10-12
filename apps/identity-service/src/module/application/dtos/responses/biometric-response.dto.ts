/**
 * Biometric Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface BiometricResponseDTO {
  readonly success: true;
  readonly enabled: boolean;
  readonly biometricId?: string;
  readonly type?: string;
  readonly message?: string;
}
