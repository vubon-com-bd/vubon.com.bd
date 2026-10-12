/**
 * AuthAccountLockControllerMapper
 * @module identity-service/interfaces/mappers
 */
import type { AuthAccountLockResponseDTO } from '../../application/dtos/responses/auth-account-lock-response.dto.js';
import type { AccountLockHttpResponseDTO } from '../dtos/responses/account-lock/account-lock.response.dto.js';

export class AuthAccountLockControllerMapper {
  static toHttpResponse(app: AuthAccountLockResponseDTO): AccountLockHttpResponseDTO {
    return {
      userId: app.userId,
      isLocked: app.isLocked,
      reason: app.reason,
      lockedAt: app.lockedAt,
      lockedUntil: app.lockedUntil,
      remainingSeconds: app.remainingSeconds,
      attemptCount: app.attemptCount,
    };
  }
}
