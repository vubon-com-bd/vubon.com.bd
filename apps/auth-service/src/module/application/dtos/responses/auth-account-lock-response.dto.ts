/**
 * AuthAccountLockResponseDTO
 * @module auth-service/application/dtos/responses
 */
export interface AuthAccountLockResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly reason: string;
  readonly lockedAt: string;
  readonly unlockAt?: string;
  readonly unlockedAt?: string;
  readonly unlockedBy?: string;
  readonly isCurrentlyLocked: boolean;
  readonly isPermanent: boolean;
}
