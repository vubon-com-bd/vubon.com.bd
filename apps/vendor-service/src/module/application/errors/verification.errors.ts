/**
 * Vendor Verification Application Errors
 * @module vendor-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

// ─── Not Found (404) ──────────────────────
export class VerificationNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(verificationId: string) {
    super('VendorVerification', verificationId);
    this.name = 'VerificationNotFoundApplicationError';
  }
}

export class DocumentNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(documentId: string) {
    super('VendorDocument', documentId);
    this.name = 'DocumentNotFoundApplicationError';
  }
}

// ─── Validation (422) ─────────────────────
export class VerificationValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'VerificationValidationError';
  }
}

// ─── Command errors (400) ─────────────────
export class VerificationSubmissionError extends CommandError {
  constructor(reason: string) {
    super(`Verification submission failed: ${reason}`, 'SubmitVerification');
    this.name = 'VerificationSubmissionError';
  }
}

export class DocumentUploadError extends CommandError {
  constructor(reason: string) {
    super(`Document upload failed: ${reason}`, 'UploadDocument');
    this.name = 'DocumentUploadError';
  }
}

export class ReverifyError extends CommandError {
  constructor(verificationId: string, reason: string) {
    super(`Reverification "${verificationId}" failed: ${reason}`, 'Reverify');
    this.name = 'ReverifyError';
  }
}

// ─── Conflict (409) ───────────────────────
export class VerificationAlreadyExistsApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(vendorId: string, type: string) {
    super(`Verification of type "${type}" already exists for vendor "${vendorId}"`, {
      vendorId,
      type,
    });
    this.name = 'VerificationAlreadyExistsApplicationError';
  }
}

export class DocumentLimitExceededApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(vendorId: string, max: number) {
    super(`Vendor "${vendorId}" exceeded max documents (${max})`, { vendorId, max });
    this.name = 'DocumentLimitExceededApplicationError';
  }
}
