/**
 * Session Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';

// ─── Not Found (404) ───────────────────────
export class SessionNotFoundError extends NotFoundError {
  constructor(sessionId: string) {
    super('Session', sessionId);
    this.name = 'SessionNotFoundError';
  }
}

// ─── Authentication (401) ───────────────────
export class SessionExpiredError extends BusinessRuleError {
  constructor(sessionId: string, expiredAt: string) {
    super(
      `Session "${sessionId}" expired at ${expiredAt}`,
      'SESSION_EXPIRED',
      { sessionId, expiredAt },
    );
    this.name = 'SessionExpiredError';
  }
}

export class SessionRevokedError extends BusinessRuleError {
  constructor(sessionId: string, reason?: string) {
    super(
      `Session "${sessionId}" has been revoked${reason ? `: ${reason}` : ''}`,
      'SESSION_REVOKED',
      { sessionId, reason },
    );
    this.name = 'SessionRevokedError';
  }
}

export class SessionIdleTimeoutError extends BusinessRuleError {
  constructor(sessionId: string, lastAccessedAt: string) {
    super(
      `Session "${sessionId}" idle timeout exceeded (last accessed ${lastAccessedAt})`,
      'SESSION_IDLE_TIMEOUT',
      { sessionId, lastAccessedAt },
    );
    this.name = 'SessionIdleTimeoutError';
  }
}

// ─── Business Rule (400) ───────────────────
export class ConcurrentSessionLimitError extends BusinessRuleError {
  constructor(userId: string, limit: number, current: number) {
    super(
      `User "${userId}" has reached max concurrent sessions (${current}/${limit})`,
      'CONCURRENT_SESSION_LIMIT',
      { userId, limit, current },
    );
    this.name = 'ConcurrentSessionLimitError';
  }
}

export class InvalidSessionTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, sessionId?: string) {
    super(
      `Cannot transition session status from "${from}" to "${to}"`,
      'INVALID_SESSION_TRANSITION',
      { from, to, sessionId },
    );
    this.name = 'InvalidSessionTransitionError';
  }
}

export class SessionAlreadyRevokedError extends BusinessRuleError {
  constructor(sessionId: string) {
    super(
      `Session "${sessionId}" is already revoked`,
      'SESSION_ALREADY_REVOKED',
      { sessionId },
    );
    this.name = 'SessionAlreadyRevokedError';
  }
}
