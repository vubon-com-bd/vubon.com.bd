/**
 * MfaResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface MfaResponseDTO {
  readonly enabled: boolean;
  readonly type: string;
  readonly enrolledAt?: string;
  readonly verifiedAt?: string;
  readonly backupMethods?: readonly string[];
}

export interface MfaChallengeResponseDTO {
  readonly challengeId: string;
  readonly methods: readonly string[];
  readonly expiresAt: string;
}
