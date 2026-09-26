import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ContactNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(contactId: string) {
    super(`Contact not found: ${contactId}`, { contactId });
  }
}

export class ContactLimitExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;
  constructor(limit: number) {
    super(`Contact limit exceeded: max ${limit}`, { limit });
  }
}

export class InvalidContactValueError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(type: string, value: string) {
    super(`Invalid contact value for ${type}: ${value}`, { type, value });
  }
}

export class InvalidContactIdError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Invalid contact ID: ${reason}`, { reason });
  }
}

export class InvalidContactTypeError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(type: string) {
    super(`Invalid contact type: ${type}`, { type });
  }
}
