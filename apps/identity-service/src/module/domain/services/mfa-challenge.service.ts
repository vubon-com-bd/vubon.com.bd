/**
 * MfaChallengeService
 * @module identity-service/domain/services
 */
import { AUTH_MFA } from '@vubon/shared-constants/auth';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface ChallengeRecord {
  readonly attempts: number;
  readonly maxAttempts: number;
  readonly expiresAtMs: number;
}

export class MfaChallengeService {
  static otpLength(): number {
    return AUTH_MFA.OTP_LENGTH;
  }

  static otpExpirySeconds(): number {
    return AUTH_MFA.OTP_EXPIRY_SECONDS;
  }

  static maxAttempts(): number {
    return AUTH_MFA.MAX_ATTEMPTS;
  }

  static backupCodesCount(): number {
    return AUTH_MFA.BACKUP_CODES_COUNT;
  }

  static backupCodeLength(): number {
    return AUTH_MFA.BACKUP_CODE_LENGTH;
  }

  static totpPeriod(): number {
    return AUTH_MFA.TOTP_PERIOD_SECONDS;
  }

  static totpDigits(): number {
    return AUTH_MFA.TOTP_DIGITS;
  }

  static totpAlgorithm(): string {
    return AUTH_MFA.TOTP_ALGORITHM;
  }

  /**
   * Record a failed attempt and check for max attempts.
   * Throws when max attempts hit.
   */
  static recordAttempt(challenge: ChallengeRecord, nowMs: number = Date.now()): ChallengeRecord {
    if (nowMs >= challenge.expiresAtMs) {
      throw new BusinessRuleError(
        'MFA challenge expired',
        'MFA_CHALLENGE_EXPIRED',
        { expiresAtMs: challenge.expiresAtMs },
      );
    }
    const next: ChallengeRecord = {
      attempts: challenge.attempts + 1,
      maxAttempts: challenge.maxAttempts,
      expiresAtMs: challenge.expiresAtMs,
    };
    if (next.attempts >= next.maxAttempts) {
      throw new BusinessRuleError(
        `Max MFA attempts exceeded (${next.maxAttempts})`,
        'MFA_MAX_ATTEMPTS',
        { attempts: next.attempts, maxAttempts: next.maxAttempts },
      );
    }
    return next;
  }

  static isChallengeActive(challenge: ChallengeRecord, nowMs: number = Date.now()): boolean {
    return nowMs < challenge.expiresAtMs && challenge.attempts < challenge.maxAttempts;
  }

  static challengeExpiresAt(nowMs: number = Date.now()): Date {
    return new Date(nowMs + this.otpExpirySeconds() * 1000);
  }

  /**
   * Whether a backup code should be flagged as low (below 2 remaining).
   */
  static isBackupLow(remaining: number): boolean {
    return remaining <= 2;
  }

  /**
   * Whether a primary method (TOTP/WebAuthn) is stronger than SMS/Email.
   */
  static isStrongMethod(method: string): boolean {
    return method === 'totp' || method === 'webauthn';
  }
}
