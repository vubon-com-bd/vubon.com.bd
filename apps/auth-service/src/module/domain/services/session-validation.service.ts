/**
 * SessionValidationService — Session validity rules
 * @module auth-service/domain/services
 */
import { AuthSessionEntity } from '../entities/auth-session.entity';
import { SessionExpiredError, SessionRevokedError } from '../errors/session.errors';

export interface SessionValidationContext {
  readonly now: number;
  readonly maxIdleMs?: number;
  readonly lastActivityAt?: number;
}

export class SessionValidationService {
  /**
   * Assert that a session is usable — throws otherwise.
   */
  static assertUsable(
    session: AuthSessionEntity,
    ctx: SessionValidationContext,
  ): void {
    if (session.isRevoked()) {
      throw new SessionRevokedError(session.id, 'Session was revoked');
    }
    if (session.isExpired(ctx.now)) {
      throw new SessionExpiredError(session.id, session.expiry.toISOString());
    }
    if (
      ctx.maxIdleMs !== undefined
      && ctx.lastActivityAt !== undefined
      && ctx.now - ctx.lastActivityAt > ctx.maxIdleMs
    ) {
      throw new SessionExpiredError(
        session.id,
        new Date(ctx.lastActivityAt + ctx.maxIdleMs).toISOString(),
      );
    }
  }

  static isValid(
    session: AuthSessionEntity,
    ctx: SessionValidationContext,
  ): boolean {
    try {
      SessionValidationService.assertUsable(session, ctx);
      return true;
    } catch {
      return false;
    }
  }

  /** Given remaining TTL, should we slide the session? */
  static shouldRefresh(
    session: AuthSessionEntity,
    now: number,
    thresholdMs = 5 * 60 * 1000,
  ): boolean {
    return session.expiry.remainingMs(now) < thresholdMs;
  }
}
