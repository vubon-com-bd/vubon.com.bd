/**
 * VerificationValidatorService
 * @module identity-service/domain/services
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface VerificationCheckInput {
  readonly code: string;
  readonly expectedCode: string;
  readonly expiresAtMs: number;
  readonly attempts: number;
  readonly maxAttempts: number;
}

export class VerificationValidatorService {
  static assertValid(input: VerificationCheckInput, nowMs: number = Date.now()): void {
    if (nowMs >= input.expiresAtMs) {
      throw new BusinessRuleError(
        'Verification code expired',
        'VERIFICATION_EXPIRED',
        { expiresAtMs: input.expiresAtMs },
      );
    }
    if (input.attempts >= input.maxAttempts) {
      throw new BusinessRuleError(
        'Max verification attempts exceeded',
        'VERIFICATION_MAX_ATTEMPTS',
        { attempts: input.attempts, maxAttempts: input.maxAttempts },
      );
    }
    if (input.code !== input.expectedCode) {
      throw new BusinessRuleError(
        'Invalid verification code',
        'VERIFICATION_INVALID_CODE',
        { attempts: input.attempts + 1 },
      );
    }
  }

  static isExpired(expiresAtMs: number, nowMs: number = Date.now()): boolean {
    return nowMs >= expiresAtMs;
  }

  static remainingAttempts(attempts: number, maxAttempts: number): number {
    return Math.max(0, maxAttempts - attempts);
  }
}
