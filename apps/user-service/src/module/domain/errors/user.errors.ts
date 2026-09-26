import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class UserNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(userId: string) {
    super(`User not found: ${userId}`, { userId });
  }
}

export class UserAlreadyExistsError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_ALREADY_EXISTS;
  readonly httpStatus = 409;
  constructor(email: string) {
    super(`User already exists: ${email}`, { email });
  }
}

export class InvalidUserStatusError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(status: string) {
    super(`Invalid user status: ${status}`, { status });
  }
}

export class UserSuspendedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.USER_INACTIVE;
  readonly httpStatus = 403;
  constructor(userId: string) {
    super(`User suspended: ${userId}`, { userId });
  }
}

export class InvalidUserIdError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Invalid user ID: ${reason}`, { reason });
  }
}

export class InvalidUserNameError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_NAME;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Invalid user name: ${reason}`, { reason });
  }
}

export class InvalidUserPhoneError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_PHONE;
  readonly httpStatus = 400;
  constructor(phone: string) {
    super(`Invalid phone: ${phone}`, { phone });
  }
}

export class InvalidUserTypeError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_TYPE;
  readonly httpStatus = 400;
  constructor(type: string) {
    super(`Invalid user type: ${type}`, { type });
  }
}

export class InvalidUserGenderError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(gender: string) {
    super(`Invalid gender: ${gender}`, { gender });
  }
}

export class InvalidUserLanguageError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(language: string) {
    super(`Invalid language: ${language}`, { language });
  }
}

export class InvalidUserTimezoneError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(timezone: string) {
    super(`Invalid timezone: ${timezone}`, { timezone });
  }
}

export class InvalidUserAvatarError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;
  constructor(url: string) {
    super(`Invalid avatar URL: ${url}`, { url });
  }
}

export class InvalidUserBioError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Invalid bio: ${reason}`, { reason });
  }
}
