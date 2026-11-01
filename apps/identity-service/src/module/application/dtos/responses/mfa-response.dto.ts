/**
 * MFA Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface MfaResponseDTO {
  readonly success: true;
  readonly enabled: boolean;
  readonly primaryMethod?: string;
  readonly backupMethods?: readonly string[];
  readonly recoveryCodes?: readonly string[];
  readonly message?: string;
}

export interface MfaSetupResponseDTO {
  readonly success: true;
  readonly secret: string;
  readonly qrCodeUrl: string;
  readonly otpauthUrl: string;
  readonly backupCodes: readonly string[];
}

export interface MfaChallengeResponseDTO {
  readonly success: true;
  readonly challengeId: string;
  readonly mfaMethods: readonly string[];
  readonly expiresAt: string;
}
