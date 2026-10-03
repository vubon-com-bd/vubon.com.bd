/**
 * KYC domain errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class KycNotFoundError extends NotFoundError {
  constructor(kycId: string) {
    super('UserKyc', kycId);
    this.name = 'KycNotFoundError';
  }
}

export class KycExpiredError extends BusinessRuleError {
  constructor(kycId: string) {
    super(`KYC "${kycId}" has expired`, 'KYC_EXPIRED');
    this.name = 'KycExpiredError';
  }
}

export class KycNotAllowedError extends BusinessRuleError {
  constructor(reason: string) {
    super(`KYC not allowed: ${reason}`, 'KYC_NOT_ALLOWED');
    this.name = 'KycNotAllowedError';
  }
}

export class InvalidKycDocumentError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(
      `Invalid KYC document "${value}". Allowed: ${allowed.join(', ')}`,
      'kycDocument'
    );
    this.name = 'InvalidKycDocumentError';
  }
}
