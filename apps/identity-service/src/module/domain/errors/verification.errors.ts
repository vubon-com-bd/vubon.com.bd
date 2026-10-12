/**
 * Verification Domain Errors
 * @module identity-service/domain/errors
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

// ─── Business Rule (400) ───────────────────
export class OtpExpiredError extends BusinessRuleError {
  constructor(verificationId: string, expiredAt: string) {
    super(
      `OTP for verification "${verificationId}" expired at ${expiredAt}`,
      'OTP_EXPIRED',
      { verificationId, expiredAt },
    );
    this.name = 'OtpExpiredError';
  }
}

export class OtpInvalidError extends BusinessRuleError {
  constructor(attempt: number, maxAttempts: number) {
    super(
      `Invalid OTP (attempt ${attempt}/${maxAttempts})`,
      'OTP_INVALID',
      { attempt, maxAttempts },
    );
    this.name = 'OtpInvalidError';
  }
}

export class OtpMaxAttemptsError extends BusinessRuleError {
  constructor(verificationId: string, maxAttempts: number) {
    super(
      `Max OTP attempts (${maxAttempts}) exceeded for verification "${verificationId}"`,
      'OTP_MAX_ATTEMPTS',
      { verificationId, maxAttempts },
    );
    this.name = 'OtpMaxAttemptsError';
  }
}

export class OtpResendCooldownError extends BusinessRuleError {
  constructor(waitSeconds: number) {
    super(
      `OTP resend cooldown active. Wait ${waitSeconds}s`,
      'OTP_RESEND_COOLDOWN',
      { waitSeconds },
    );
    this.name = 'OtpResendCooldownError';
  }
}

export class OtpMaxResendError extends BusinessRuleError {
  constructor(maxResend: number) {
    super(
      `Max OTP resend (${maxResend}) reached`,
      'OTP_MAX_RESEND',
      { maxResend },
    );
    this.name = 'OtpMaxResendError';
  }
}

export class VerificationAlreadyVerifiedError extends BusinessRuleError {
  constructor(verificationId: string, verifiedAt: string) {
    super(
      `Verification "${verificationId}" already verified at ${verifiedAt}`,
      'VERIFICATION_ALREADY_VERIFIED',
      { verificationId, verifiedAt },
    );
    this.name = 'VerificationAlreadyVerifiedError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidVerificationChannelError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid verification channel "${value}". Allowed: ${allowed.join(', ')}`,
      'channel',
    );
    this.name = 'InvalidVerificationChannelError';
  }
}

export class InvalidVerificationPurposeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid verification purpose "${value}". Allowed: ${allowed.join(', ')}`,
      'purpose',
    );
    this.name = 'InvalidVerificationPurposeError';
  }
}

export class InvalidOtpFormatError extends ValidationError {
  constructor(expectedLength: number) {
    super(`OTP must be exactly ${expectedLength} digits`, 'otp');
    this.name = 'InvalidOtpFormatError';
  }
}
