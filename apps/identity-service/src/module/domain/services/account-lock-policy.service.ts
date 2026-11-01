/**
 * AccountLockPolicyService
 * @module identity-service/domain/services
 */
import { AUTH_LOGIN_ATTEMPT } from '@vubon/shared-constants/auth';
import { SECURITY } from '@vubon/shared-constants/security';

export interface LockDecision {
  readonly shouldLock: boolean;
  readonly lockDurationSeconds: number;
  readonly reason: string;
}

export class AccountLockPolicyService {
  static lockoutDurationSeconds(): number {
    return AUTH_LOGIN_ATTEMPT.LOCKOUT_DURATION_SECONDS;
  }

  static maxAttempts(): number {
    return AUTH_LOGIN_ATTEMPT.MAX_ATTEMPTS;
  }

  static maxAttemptsPerIp(): number {
    return AUTH_LOGIN_ATTEMPT.MAX_ATTEMPTS_PER_IP;
  }

  /**
   * Decide whether account should be locked based on failure count.
   */
  static decide(failureCount: number): LockDecision {
    if (failureCount < this.maxAttempts()) {
      return {
        shouldLock: false,
        lockDurationSeconds: 0,
        reason: 'below_threshold',
      };
    }
    return {
      shouldLock: true,
      lockDurationSeconds: this.lockoutDurationSeconds(),
      reason: 'too_many_attempts',
    };
  }

  /**
   * Progressive backoff — for repeated locks.
   * 1st lock: base; 2nd: 2x; 3rd: 4x; capped at SECURITY.LOCKOUT_DURATION_SECONDS * 8.
   */
  static progressiveDuration(lockCount: number): number {
    const base = this.lockoutDurationSeconds();
    const multiplier = Math.min(8, Math.pow(2, Math.max(0, lockCount - 1)));
    const cap = SECURITY.LOCKOUT_DURATION_SECONDS * 8;
    return Math.min(cap, base * multiplier);
  }

  /**
   * Whether to auto-unlock.
   */
  static isAutoUnlockEnabled(): boolean {
    return true;
  }
}
