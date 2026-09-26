/**
 * AccountLockPolicyService — Escalating lock policy
 * @module auth-service/domain/services
 *
 * Policy:
 *  1–2 failed attempts  → no lock
 *  3 failed attempts    → 5 minute lock
 *  5 failed attempts    → 30 minute lock
 *  10 failed attempts   → 24 hour lock
 *  >10 failed attempts  → permanent (admin unlock)
 */
import { AccountLockDurationVO } from '../value-objects/primitives/account-lock-duration.vo';

export interface LockDecision {
  readonly shouldLock: boolean;
  readonly duration?: AccountLockDurationVO;
  readonly isPermanent: boolean;
  readonly reason: 'too_many_attempts' | 'suspicious_activity' | null;
}

const RULES: ReadonlyArray<{ threshold: number; minutes: number }> = [
  { threshold: 3, minutes: 5 },
  { threshold: 5, minutes: 30 },
  { threshold: 10, minutes: 60 * 24 },
];

export class AccountLockPolicyService {
  static decide(failedAttempts: number): LockDecision {
    if (failedAttempts < 3) {
      return { shouldLock: false, isPermanent: false, reason: null };
    }

    const rule = [...RULES].reverse().find((r) => failedAttempts >= r.threshold);
    if (!rule) {
      return { shouldLock: false, isPermanent: false, reason: null };
    }

    // Beyond last threshold by 2x → permanent
    const lastThreshold = RULES[RULES.length - 1]!.threshold;
    if (failedAttempts >= lastThreshold * 2) {
      return {
        shouldLock: true,
        isPermanent: true,
        reason: 'too_many_attempts',
      };
    }

    return {
      shouldLock: true,
      duration: AccountLockDurationVO.ofMinutes(rule.minutes),
      isPermanent: false,
      reason: 'too_many_attempts',
    };
  }

  static isSuspicious(input: {
    attemptsFromSameIp: number;
    distinctEmailsFromIp: number;
    windowMs: number;
  }): boolean {
    if (input.attemptsFromSameIp >= 20) return true;
    if (input.distinctEmailsFromIp >= 5 && input.windowMs <= 10 * 60 * 1000) {
      return true;
    }
    return false;
  }
}
