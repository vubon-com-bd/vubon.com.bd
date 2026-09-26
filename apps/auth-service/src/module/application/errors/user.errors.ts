/**
 * User Application Errors
 * @module auth-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class UserNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(userId: string) {
    super(`User not found: ${userId}`, { userId });
  }
}

export class UserAlreadyExistsAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_ALREADY_EXISTS;
  readonly httpStatus = 409;

  constructor(field: 'email' | 'phone' | 'username', value: string) {
    super(`User already exists with ${field}: ${value}`, { field, value });
  }
}

export class UserInactiveAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_INACTIVE;
  readonly httpStatus = 403;

  constructor(userId: string, status: string) {
    super(`User ${userId} is not active (status: ${status})`, { userId, status });
  }
}

export class InvalidEmailAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_EMAIL;
  readonly httpStatus = 400;

  constructor(email: string) {
    super(`Invalid email format: ${email}`, { email });
  }
}

export class InvalidNameAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_NAME;
  readonly httpStatus = 400;

  constructor(name: string) {
    super(`Invalid name: ${name}`, { name });
  }
}

export class InvalidPhoneAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_PHONE;
  readonly httpStatus = 400;

  constructor(phone: string) {
    super(`Invalid phone number: ${phone}`, { phone });
  }
}
