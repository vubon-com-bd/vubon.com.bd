import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class DocumentNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VENDOR_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(documentId: string) {
    super(`Document not found: ${documentId}`, { documentId });
  }
}

export class DocumentExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 410;

  constructor(documentId: string) {
    super(`Document expired: ${documentId}`, { documentId });
  }
}

export class InvalidDocumentIdError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid document id: ${value}`, { value });
  }
}

export class InvalidDocumentTypeError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid document type: ${value}`, { value });
  }
}

export class InvalidDocumentStatusError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid document status: ${value}`, { value });
  }
}
