/**
 * AuthSettingsResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface AuthSettingsResponseDTO {
  readonly userId: string;
  readonly sessionTimeoutMinutes: number;
  readonly maxConcurrentSessions: number;
  readonly mfaRequired: boolean;
  readonly allowedProviders: readonly string[];
  readonly updatedAt: string;
}
