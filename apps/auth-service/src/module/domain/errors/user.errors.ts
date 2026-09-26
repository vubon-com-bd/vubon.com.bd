/**
 * User Domain Errors
 * @module auth-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class UserNotFoundError extends DomainError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(userId: string) {
    super(`User not found: ${userId}`, { userId });
  }
}

export class UserExistsError extends DomainError {
  readonly code = ERROR_CODE.USER_ALREADY_EXISTS;
  readonly httpStatus = 409;

  constructor(email: string) {
    super(`User already exists with email: ${email}`, { email });
  }
}

export class InvalidUserStatusError extends DomainError {
  readonly code = ERROR_CODE.AUTH_INVALID_STATUS;
  readonly httpStatus = 422;

  constructor(status: string) {
    super(`Invalid user status: ${status}`, { status });
  }
}

export class InvalidUserTypeError extends DomainError {
  readonly code = ERROR_CODE.AUTH_INVALID_TYPE;
  readonly httpStatus = 422;

  constructor(type: string) {
    super(`Invalid user type: ${type}`, { type });
  }
}

export class InvalidEmailError extends DomainError {
  readonly code = ERROR_CODE.AUTH_INVALID_EMAIL;
  readonly httpStatus = 422;

  constructor(email: string) {
    super(`Invalid email format: ${email}`, { email });
  }
}

export class InvalidNameError extends DomainError {
  readonly code = ERROR_CODE.AUTH_INVALID_NAME;
  readonly httpStatus = 422;

  constructor(name: string) {
    super(`Invalid name: ${name}`, { name });
  }
}

export class InvalidPhoneError extends DomainError {
  readonly code = ERROR_CODE.AUTH_INVALID_PHONE;
  readonly httpStatus = 422;

  constructor(phone: string) {
    super(`Invalid phone number: ${phone}`, { phone });
  }
}

export class UserNotActiveError extends DomainError {
  readonly code = ERROR_CODE.USER_INACTIVE;
  readonly httpStatus = 403;

  constructor(userId: string, status: string) {
    super(
      `User ${userId} is not active (current status: ${status})`,
      { userId, status },
    );
  }
}
