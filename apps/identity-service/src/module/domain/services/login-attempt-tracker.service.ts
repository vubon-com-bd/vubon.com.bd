/**
 * LoginAttemptTrackerService
 * @module identity-service/domain/services
 */
import { AUTH_LOGIN_ATTEMPT } from '@vubon/shared-constants/auth';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface AttemptWindow {
  readonly identifier: string;
  readonly attempts: readonly { readonly atMs: number; readonly success: boolean }[];
}

export class LoginAttemptTrackerService {
  static maxAttempts(): number {
    return AUTH_LOGIN_ATTEMPT.MAX_ATTEMPTS;
  }

  static maxAttemptsPerIp(): number {
    return AUTH_LOGIN_ATTEMPT.MAX_ATTEMPTS_PER_IP;
  }

  static lockoutSeconds(): number {
    return AUTH_LOGIN_ATTEMPT.LOCKOUT_DURATION_SECONDS;
  }

  static windowSeconds(): number {
    return AUTH_LOGIN_ATTEMPT.ATTEMPT_WINDOW_SECONDS;
  }

  /**
   * Count failures within window.
   */
  static countFailures(
    attempts: readonly { readonly atMs: number; readonly success: boolean }[],
    nowMs: number = Date.now(),
  ): number {
    const cutoff = nowMs - this.windowSeconds() * 1000;
    return attempts.filter((a) => !a.success && a.atMs >= cutoff).length;
  }

  /**
   * Check if identifier should be locked due to failures.
   * Throws if reached.
   */
  static assertNotLocked(
    attempts: readonly { readonly atMs: number; readonly success: boolean }[],
    nowMs: number = Date.now(),
  ): void {
    const failures = this.countFailures(attempts, nowMs);
    if (failures >= this.maxAttempts()) {
      throw new BusinessRuleError(
        `Too many login attempts (${failures})`,
        'TOO_MANY_LOGIN_ATTEMPTS',
        { failures, max: this.maxAttempts() },
      );
    }
  }

  static shouldResetOnSuccess(): boolean {
    return AUTH_LOGIN_ATTEMPT.RESET_AFTER_SUCCESS;
  }

  /**
   * Given a set of failures, compute the lockout until timestamp.
   */
  static computeLockUntil(nowMs: number = Date.now()): number {
    return nowMs + this.lockoutSeconds() * 1000;
  }

  static isLockedOut(
    attempts: readonly { readonly atMs: number; readonly success: boolean }[],
    nowMs: number = Date.now(),
  ): boolean {
    return this.countFailures(attempts, nowMs) >= this.maxAttempts();
  }
}
