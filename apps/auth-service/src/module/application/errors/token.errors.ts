import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class TokenNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_TOKEN_INVALID;
  readonly httpStatus = 404;

  constructor(tokenId: string) {
    super(`Token not found: ${tokenId}`, { tokenId });
  }
}

export class TokenOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Token operation failed: ${reason}`, { reason });
  }
}
