/**
 * Vendor Document Application Errors
 * @module vendor-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class DocumentValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'DocumentValidationError';
  }
}

export class DocumentUploadApplicationError extends CommandError {
  constructor(reason: string) {
    super(`Document upload failed: ${reason}`, 'UploadDocument');
    this.name = 'DocumentUploadApplicationError';
  }
}

export class DocumentApprovalApplicationError extends CommandError {
  constructor(documentId: string, reason: string) {
    super(`Document "${documentId}" approval failed: ${reason}`, 'ApproveDocument');
    this.name = 'DocumentApprovalApplicationError';
  }
}

export class DocumentRejectionApplicationError extends CommandError {
  constructor(documentId: string, reason: string) {
    super(`Document "${documentId}" rejection failed: ${reason}`, 'RejectDocument');
    this.name = 'DocumentRejectionApplicationError';
  }
}

export class DocumentAlreadyVerifiedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;
  constructor(documentId: string) {
    super(`Document "${documentId}" is already verified`, { documentId });
    this.name = 'DocumentAlreadyVerifiedApplicationError';
  }
}

export class DocumentExpiredApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 422;
  constructor(documentId: string, expiredAt: string) {
    super(`Document "${documentId}" expired at ${expiredAt}`, { documentId, expiredAt });
    this.name = 'DocumentExpiredApplicationError';
  }
}
