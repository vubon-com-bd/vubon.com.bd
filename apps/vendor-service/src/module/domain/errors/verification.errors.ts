/**
 * Vendor Verification Errors
 * @module vendor-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VendorVerificationNotFoundError extends NotFoundError {
  constructor(verificationId: string) {
    super('VendorVerification', verificationId);
    this.name = 'VendorVerificationNotFoundError';
  }
}

export class InvalidVerificationStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid verification status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidVerificationStatusError';
  }
}

export class InvalidVerificationTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid verification type "${value}". Allowed: ${allowed.join(', ')}`, 'type');
    this.name = 'InvalidVerificationTypeError';
  }
}

export class VerificationAlreadyExistsError extends ConflictError {
  constructor(vendorId: string, type: string) {
    super(`Verification of type "${type}" already exists for vendor "${vendorId}"`, 'type');
    this.name = 'VerificationAlreadyExistsError';
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
