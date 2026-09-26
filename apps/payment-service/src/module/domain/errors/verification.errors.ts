import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class SignatureVerificationError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_UNAUTHORIZED;
  readonly httpStatus = 401;

  constructor() {
    super('Invalid webhook signature');
  }
}
