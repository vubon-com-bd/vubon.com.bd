import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class TokenExpiredError extends DomainError {
  readonly code: ErrorCodeType = 'AUTH-002';
  readonly httpStatus = 401;

  constructor() {
    super('Token has expired');
  }
}

export class InvalidTokenError extends DomainError {
  readonly code: ErrorCodeType = 'AUTH-003';
  readonly httpStatus = 401;

  constructor() {
    super('Token is invalid');
  }
}
