import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class MfaRequiredError extends DomainError {
  readonly code: ErrorCodeType = 'AUTH-006';
  readonly httpStatus = 403;

  constructor() {
    super('MFA is required');
  }
}

export class MfaInvalidError extends DomainError {
  readonly code: ErrorCodeType = 'VAL-001';
  readonly httpStatus = 422;

  constructor() {
    super('MFA code is invalid');
  }
}
