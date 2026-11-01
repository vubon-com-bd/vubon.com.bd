/**
 * Verification Domain Errors
 * @module payment-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class VerificationNotFoundError extends NotFoundError {
  constructor(verificationId: string) {
    super('Verification', verificationId);
    this.name = 'VerificationNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidVerificationStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid verification status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidVerificationStatusError';
  }
}

export class InvalidVerificationMethodError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid verification method "${value}". Allowed: ${allowed.join(', ')}`, 'method');
    this.name = 'InvalidVerificationMethodError';
  }
}

// ─── Business Rule (400) ───────────────────
export class VerificationFailedError extends BusinessRuleError {
  constructor(verificationId: string, reason: string) {
    super(
      `Verification "${verificationId}" failed: ${reason}`,
      'VERIFICATION_FAILED',
      { verificationId, reason },
    );
    this.name = 'VerificationFailedError';
  }
}

export class VerificationExpiredError extends BusinessRuleError {
  constructor(verificationId: string, expiredAt: string) {
    super(
      `Verification "${verificationId}" expired at ${expiredAt}`,
      'VERIFICATION_EXPIRED',
      { verificationId, expiredAt },
    );
    this.name = 'VerificationExpiredError';
  }
}

export class VerificationCodeMismatchError extends BusinessRuleError {
  constructor(verificationId: string) {
    super(
      `Verification "${verificationId}" code mismatch`,
      'VERIFICATION_CODE_MISMATCH',
      { verificationId },
    );
    this.name = 'VerificationCodeMismatchError';
  }
}
