import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class VerificationExpiredError extends DomainError {
  readonly code: ErrorCodeType = 'AUTH-002';
  readonly httpStatus = 401;

  constructor() {
    super('Verification code has expired');
  }
}
