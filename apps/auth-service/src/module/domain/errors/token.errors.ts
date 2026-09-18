import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class TokenExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_TOKEN_EXPIRED;
  readonly httpStatus = 401;

  constructor(tokenId: string) {
    super(`Token expired: ${tokenId}`, { tokenId });
  }
}

export class InvalidTokenError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_TOKEN_INVALID;
  readonly httpStatus = 401;

  constructor(reason: string) {
    super(`Invalid token: ${reason}`, { reason });
  }
}
