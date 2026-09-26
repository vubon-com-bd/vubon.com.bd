/**
 * Token Application Errors
 * @module auth-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import type { ErrorCodeType } from '@vubon/shared-constants/common';

export class TokenExpiredAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_TOKEN_EXPIRED;
  readonly httpStatus = 401;

  constructor(expiredAt?: string) {
    super(
      expiredAt ? `Token expired at ${expiredAt}` : 'Token has expired',
      { expiredAt },
    );
  }
}

export class TokenInvalidAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_TOKEN_INVALID;
  readonly httpStatus = 401;

  constructor(reason = 'Invalid token') {
    super(reason);
  }
}

export class TokenNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_TOKEN_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(tokenId: string) {
    super(`Token not found: ${tokenId}`, { tokenId });
  }
}

export class TokenRevokedAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_TOKEN_REVOKED;
  readonly httpStatus = 401;

  constructor(tokenId: string) {
    super(`Token has been revoked: ${tokenId}`, { tokenId });
  }
}

export class TokenFormatInvalidAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_INVALID_TOKEN_FORMAT;
  readonly httpStatus = 400;

  constructor(reason = 'Malformed token') {
    super(reason);
  }
}
