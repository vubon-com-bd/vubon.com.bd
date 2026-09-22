import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class KycNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(userId: string) {
    super(`KYC not found for user: ${userId}`, { userId });
  }
}

export class KycExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_VERIFICATION_EXPIRED;
  readonly httpStatus = 410;
  constructor(userId: string) {
    super(`KYC expired for user: ${userId}`, { userId });
  }
}

export class KycNotAllowedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;
  constructor(reason: string) {
    super(`KYC not allowed: ${reason}`, { reason });
  }
}

export class InvalidKycDocumentError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(document: string) {
    super(`Invalid KYC document: ${document}`, { document });
  }
}

export class InvalidKycIdError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Invalid KYC ID: ${reason}`, { reason });
  }
}

export class InvalidKycStatusError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(status: string) {
    super(`Invalid KYC status: ${status}`, { status });
  }
}
