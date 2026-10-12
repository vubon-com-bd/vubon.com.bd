/**
 * Auth Account Lock Response DTO
 * @module identity-service/application/dtos/responses
 */
export interface AuthAccountLockResponseDTO {
  readonly userId: string;
  readonly isLocked: boolean;
  readonly reason?: string;
  readonly lockedAt?: string;
  readonly lockedUntil?: string;
  readonly remainingSeconds?: number;
  readonly attemptCount?: number;
}
