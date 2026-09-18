import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class UserNotFoundError extends DomainError {
  readonly code: ErrorCodeType = 'USR-001';
  readonly httpStatus = 404;

  constructor(userId: string) {
    super(`User not found: ${userId}`, { userId });
  }
}

export class UserExistsError extends DomainError {
  readonly code: ErrorCodeType = 'USR-002';
  readonly httpStatus = 409;

  constructor(email: string) {
    super(`User already exists: ${email}`, { email });
  }
}

export class InvalidNameError extends DomainError {
  readonly code: ErrorCodeType = 'VAL-001';
  readonly httpStatus = 422;

  constructor(name: string) {
    super(`Invalid name: ${name}`, { name });
  }
}

export class InvalidPhoneError extends DomainError {
  readonly code: ErrorCodeType = 'VAL-001';
  readonly httpStatus = 422;

  constructor(phone: string) {
    super(`Invalid phone: ${phone}`, { phone });
  }
}

export class InvalidStatusError extends DomainError {
  readonly code: ErrorCodeType = 'VAL-001';
  readonly httpStatus = 422;

  constructor(status: string) {
    super(`Invalid status: ${status}`, { status });
  }
}

export class InvalidTypeError extends DomainError {
  readonly code: ErrorCodeType = 'VAL-001';
  readonly httpStatus = 422;

  constructor(type: string) {
    super(`Invalid type: ${type}`, { type });
  }
}
