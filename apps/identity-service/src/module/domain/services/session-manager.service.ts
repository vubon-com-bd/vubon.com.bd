/**
 * SessionManagerService
 * @module identity-service/domain/services
 */
import { AUTH_SESSION } from '@vubon/shared-constants/auth';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { SessionExpiryVO } from '../value-objects/primitives/session-expiry.vo.js';

export class SessionManagerService {
  static absoluteExpirySeconds(rememberMe = false): number {
    return rememberMe
      ? AUTH_SESSION.REMEMBER_ME_EXPIRY_SECONDS
      : AUTH_SESSION.EXPIRY_SECONDS;
  }

  static idleTimeoutSeconds(): number {
    return AUTH_SESSION.IDLE_TIMEOUT_SECONDS;
  }

  static absoluteTimeoutSeconds(): number {
    return AUTH_SESSION.ABSOLUTE_TIMEOUT_SECONDS;
  }

  static maxSessionsPerUser(): number {
    return AUTH_SESSION.MAX_SESSIONS_PER_USER;
  }

  static concurrentLoginAllowed(): boolean {
    return AUTH_SESSION.CONCURRENT_LOGIN_ALLOWED;
  }

  static refreshThresholdSeconds(): number {
    return AUTH_SESSION.REFRESH_THRESHOLD_SECONDS;
  }

  static buildExpiry(rememberMe = false, nowMs: number = Date.now()): SessionExpiryVO {
    const absSeconds = this.absoluteExpirySeconds(rememberMe);
    return SessionExpiryVO.create({
      absoluteExpiresAt: Math.floor(nowMs / 1000) + absSeconds,
      idleTimeoutSeconds: this.idleTimeoutSeconds(),
    });
  }

  /**
   * Enforce concurrent session limit.
   * If limit exceeded and concurrent not allowed, reject new session.
   */
  static enforceConcurrentLimit(currentCount: number): void {
    if (!this.concurrentLoginAllowed() && currentCount > 0) {
      throw new BusinessRuleError(
        'Concurrent logins are not allowed',
        'CONCURRENT_LOGIN_FORBIDDEN',
        { currentCount },
      );
    }
    if (currentCount >= this.maxSessionsPerUser()) {
      throw new BusinessRuleError(
        `Max sessions reached (${this.maxSessionsPerUser()})`,
        'CONCURRENT_SESSION_LIMIT',
        { currentCount, limit: this.maxSessionsPerUser() },
      );
    }
  }

  /**
   * Decide whether a session should be refreshed.
   */
  static shouldRefresh(expiresAtEpoch: number, nowMs: number = Date.now()): boolean {
    const remaining = expiresAtEpoch - Math.floor(nowMs / 1000);
    return remaining <= this.refreshThresholdSeconds();
  }

  /**
   * Compute which sessions to evict when limit exceeded.
   * Returns oldest-first IDs.
   */
  static selectForEviction(
    sessions: readonly { readonly id: string; readonly createdAt: string }[],
    neededFree: number,
  ): readonly string[] {
    if (neededFree <= 0) return [];
    const sorted = [...sessions].sort(
      (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
    );
    return sorted.slice(0, neededFree).map((s) => s.id);
  }
}
