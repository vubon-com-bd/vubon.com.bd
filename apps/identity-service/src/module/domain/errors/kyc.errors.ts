/**
 * KYC Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class KycNotFoundError extends NotFoundError {
  constructor(userId: string) {
    super('Kyc', userId);
    this.name = 'KycNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class KycAlreadySubmittedError extends ConflictError {
  constructor(userId: string) {
    super(`KYC already submitted for user "${userId}"`, 'kycStatus');
    this.name = 'KycAlreadySubmittedError';
  }
}

export class KycAlreadyVerifiedError extends ConflictError {
  constructor(userId: string) {
    super(`KYC already verified for user "${userId}"`, 'kycStatus');
    this.name = 'KycAlreadyVerifiedError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidKycStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid KYC status "${value}". Allowed: ${allowed.join(', ')}`, 'kycStatus');
    this.name = 'InvalidKycStatusError';
  }
}

export class InvalidKycDocumentTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid KYC document type "${value}". Allowed: ${allowed.join(', ')}`,
      'kycDocumentType',
    );
    this.name = 'InvalidKycDocumentTypeError';
  }
}

// ─── Business Rule (400) ───────────────────
export class KycNotVerifiedError extends BusinessRuleError {
  constructor(userId: string) {
    super(
      `KYC not verified for user "${userId}"`,
      'KYC_NOT_VERIFIED',
      { userId },
    );
    this.name = 'KycNotVerifiedError';
  }
}

export class KycAlreadyPendingError extends BusinessRuleError {
  constructor(userId: string) {
    super(
      `KYC already pending for user "${userId}"`,
      'KYC_ALREADY_PENDING',
      { userId },
    );
    this.name = 'KycAlreadyPendingError';
  }
}

export class KycCannotBeVerifiedError extends BusinessRuleError {
  constructor(userId: string, status: string) {
    super(
      `KYC cannot be verified in status "${status}" for user "${userId}"`,
      'KYC_CANNOT_BE_VERIFIED',
      { userId, status },
    );
    this.name = 'KycCannotBeVerifiedError';
  }
}

export class KycDocumentMissingError extends BusinessRuleError {
  constructor(documentType: string) {
    super(
      `KYC document "${documentType}" is missing`,
      'KYC_DOCUMENT_MISSING',
      { documentType },
    );
    this.name = 'KycDocumentMissingError';
  }
}

export class KycExpiredError extends BusinessRuleError {
  constructor(userId: string, expiredAt: string) {
    super(
      `KYC expired for user "${userId}" at ${expiredAt}`,
      'KYC_EXPIRED',
      { userId, expiredAt },
    );
    this.name = 'KycExpiredError';
  }
}
