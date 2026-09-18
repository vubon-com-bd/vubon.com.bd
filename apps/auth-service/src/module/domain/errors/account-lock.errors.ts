import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class AccountLockedError extends DomainError {
  readonly code: ErrorCodeType = 'AUTH-007';
  readonly httpStatus = 423;

  constructor(userId: string) {
    super(`Account is locked: ${userId}`, { userId });
  }
}

export class TooManyAttemptsError extends DomainError {
  readonly code: ErrorCodeType = 'RATE-001';
  readonly httpStatus = 429;

  constructor() {
    super('Too many login attempts');
  }
}
