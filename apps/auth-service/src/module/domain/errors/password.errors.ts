import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class InvalidPasswordError extends DomainError {
  readonly code: ErrorCodeType = 'AUTH-001';
  readonly httpStatus = 422;

  constructor() {
    super('Password is invalid');
  }
}

export class WeakPasswordError extends DomainError {
  readonly code: ErrorCodeType = 'VAL-001';
  readonly httpStatus = 422;

  constructor(reason: string) {
    super(`Password too weak: ${reason}`, { reason });
  }
}
