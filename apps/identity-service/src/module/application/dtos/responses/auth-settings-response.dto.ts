/**
 * Auth Settings Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface AuthSettingsResponseDTO {
  readonly twoFactorRequired: boolean;
  readonly sessionTimeoutSeconds: number;
  readonly passwordExpiryDays: number;
  readonly passwordHistoryCount: number;
  readonly loginAlertsEnabled: boolean;
  readonly maxLoginAttempts: number;
  readonly lockoutDurationSeconds: number;
  readonly allowedIpRanges: readonly string[];
  readonly mfaRequired: boolean;
}
