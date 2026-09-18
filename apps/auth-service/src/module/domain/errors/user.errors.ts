import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class UserNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(userId: string) {
    super(`User not found: ${userId}`, { userId });
  }
}

export class UserExistsError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_ALREADY_EXISTS;
  readonly httpStatus = 409;

  constructor(email: string) {
    super(`User already exists: ${email}`, { email });
  }
}

export class InvalidEmailError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_EMAIL;
  readonly httpStatus = 400;

  constructor(email: string) {
    super(`Invalid email: ${email}`, { email });
  }
}

export class InvalidNameError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_NAME;
  readonly httpStatus = 400;

  constructor(name: string) {
    super(`Invalid name: ${name}`, { name });
  }
}

export class InvalidPhoneError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_PHONE;
  readonly httpStatus = 400;

  constructor(phone: string) {
    super(`Invalid phone: ${phone}`, { phone });
  }
}

export class InvalidStatusError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_STATUS;
  readonly httpStatus = 400;

  constructor(status: string) {
    super(`Invalid status: ${status}`, { status });
  }
}

export class InvalidTypeError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_TYPE;
  readonly httpStatus = 400;

  constructor(type: string) {
    super(`Invalid type: ${type}`, { type });
  }
}
