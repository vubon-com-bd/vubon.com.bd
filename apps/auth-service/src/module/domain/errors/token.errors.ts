/**
 * Token Domain Errors
 * @module auth-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class TokenNotFoundError extends DomainError {
  readonly code = ERROR_CODE.AUTH_TOKEN_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(tokenId: string) {
    super(`Token not found: ${tokenId}`, { tokenId });
  }
}

export class TokenExpiredError extends DomainError {
  readonly code = ERROR_CODE.AUTH_TOKEN_EXPIRED;
  readonly httpStatus = 401;

  constructor(expiredAt: string) {
    super(`Token expired at ${expiredAt}`, { expiredAt });
  }
}

export class InvalidTokenError extends DomainError {
  readonly code = ERROR_CODE.AUTH_TOKEN_INVALID;
  readonly httpStatus = 401;

  constructor(reason: string) {
    super(`Invalid token: ${reason}`, { reason });
  }
}

export class TokenRevokedError extends DomainError {
  readonly code = ERROR_CODE.AUTH_TOKEN_REVOKED;
  readonly httpStatus = 401;

  constructor(tokenId: string) {
    super(`Token revoked: ${tokenId}`, { tokenId });
  }
}
