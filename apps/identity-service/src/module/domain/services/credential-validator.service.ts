/**
 * CredentialValidatorService — Pure domain service
 * @module identity-service/domain/services
 *
 * Validates password policies and credential structure.
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { AUTH_PASSWORD } from '@vubon/shared-constants/auth';

export interface PasswordValidationResult {
  readonly valid: boolean;
  readonly score: number;
  readonly strength: 'weak' | 'fair' | 'good' | 'strong' | 'very_strong';
  readonly reasons: readonly string[];
  readonly feedback: readonly string[];
}

export class CredentialValidatorService {
  /**
   * Validate a plain password against policy.
   * Returns structured result — never throws.
   */
  static validatePassword(password: string): PasswordValidationResult {
    const reasons: string[] = [];
    const feedback: string[] = [];

    if (typeof password !== 'string' || password.length === 0) {
      return {
        valid: false,
        score: 0,
        strength: 'weak',
        reasons: ['empty'],
        feedback: ['Password cannot be empty'],
      };
    }

    if (password.length < AUTH_PASSWORD.MIN_LENGTH) {
      reasons.push('too_short');
      feedback.push(`Minimum ${AUTH_PASSWORD.MIN_LENGTH} chars`);
    }
    if (password.length > AUTH_PASSWORD.MAX_LENGTH) {
      reasons.push('too_long');
      feedback.push(`Maximum ${AUTH_PASSWORD.MAX_LENGTH} chars`);
    }
    if (AUTH_PASSWORD.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
      reasons.push('no_uppercase');
      feedback.push('Add uppercase letter');
    }
    if (AUTH_PASSWORD.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
      reasons.push('no_lowercase');
      feedback.push('Add lowercase letter');
    }
    if (AUTH_PASSWORD.REQUIRE_NUMBER && !/\d/.test(password)) {
      reasons.push('no_number');
      feedback.push('Add a number');
    }
    if (AUTH_PASSWORD.REQUIRE_SYMBOL && !/[^A-Za-z0-9]/.test(password)) {
      reasons.push('no_symbol');
      feedback.push('Add a symbol');
    }

    const score = this.computeScore(password);
    const strength = this.scoreToStrength(score);

    return {
      valid: reasons.length === 0,
      score,
      strength,
      reasons,
      feedback,
    };
  }

  /**
   * Enforce password policy — throws if invalid.
   */
  static enforcePasswordPolicy(password: string): void {
    const result = this.validatePassword(password);
    if (!result.valid) {
      throw new BusinessRuleError(
        `Password policy violated: ${result.reasons.join(', ')}`,
        'PASSWORD_POLICY_VIOLATION',
        { reasons: result.reasons },
      );
    }
  }

  /**
   * Check if candidate hash was used before (history).
   */
  static isInHistory(candidateHash: string, previousHashes: readonly string[]): boolean {
    return previousHashes.some((h) => h === candidateHash);
  }

  // ─── Private helpers ───────────────────
  private static computeScore(password: string): number {
    let score = 0;
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 15;
    if (/\d/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;

    // Penalty for repeats
    if (/(.)\1{2,}/.test(password)) score -= 10;
    // Penalty for common sequences
    if (/1234|abcd|qwer/i.test(password)) score -= 15;

    return Math.max(0, Math.min(100, score));
  }

  private static scoreToStrength(score: number): PasswordValidationResult['strength'] {
    if (score < 30) return 'weak';
    if (score < 50) return 'fair';
    if (score < 70) return 'good';
    if (score < 85) return 'strong';
    return 'very_strong';
  }
}
