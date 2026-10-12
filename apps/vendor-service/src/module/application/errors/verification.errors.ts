/**
 * Application-level verification errors
 * @module vendor-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class VerificationNotSubmittableError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_VERIFICATION_NOT_ALLOWED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Verification not submittable: ${reason}`, { reason });
    this.name = 'VerificationNotSubmittableError';
  }
}

export class DocumentUploadFailedError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_VERIFICATION_NOT_ALLOWED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Document upload failed: ${reason}`, { reason });
    this.name = 'DocumentUploadFailedError';
  }
}

export class DocumentNotFoundError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_DOCUMENT_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(documentId: string) {
    super(`Document "${documentId}" not found`, { documentId });
    this.name = 'DocumentNotFoundError';
  }
}

export class RequiredDocumentsMissingError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_VERIFICATION_NOT_ALLOWED;
  readonly httpStatus = 422;
  constructor(missing: readonly string[]) {
    super(`Required documents missing: ${missing.join(', ')}`, { missing });
    this.name = 'RequiredDocumentsMissingError';
  }
}

export class VerificationExpiredError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_VERIFICATION_EXPIRED;
  readonly httpStatus = 410;
  constructor(expiredAt: string) {
    super(`Verification expired at ${expiredAt}`, { expiredAt });
    this.name = 'VerificationExpiredError';
  }
}

export class DocumentExpiredError extends ApplicationError {
  readonly code = ERROR_CODE.VENDOR_DOCUMENT_EXPIRED;
  readonly httpStatus = 410;
  constructor(documentId: string, expiresAt: string) {
    super(`Document "${documentId}" expired at ${expiresAt}`, { documentId, expiresAt });
    this.name = 'DocumentExpiredError';
  }
}
