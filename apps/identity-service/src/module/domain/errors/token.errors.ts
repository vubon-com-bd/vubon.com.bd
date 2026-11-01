/**
 * Token Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class TokenNotFoundError extends NotFoundError {
  constructor(tokenId: string) {
    super('Token', tokenId);
    this.name = 'TokenNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class TokenReusedError extends ConflictError {
  constructor(jti: string) {
    super(`Token with jti "${jti}" has already been used`, 'jti');
    this.name = 'TokenReusedError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidTokenTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid token type "${value}". Allowed: ${allowed.join(', ')}`, 'tokenType');
    this.name = 'InvalidTokenTypeError';
  }
}

export class InvalidTokenFormatError extends ValidationError {
  constructor(reason: string) {
    super(`Invalid token format: ${reason}`, 'token');
    this.name = 'InvalidTokenFormatError';
  }
}

// ─── Authentication (401) ───────────────────
export class TokenInvalidError extends BusinessRuleError {
  constructor(reason: string) {
    super(`Invalid token: ${reason}`, 'TOKEN_INVALID', { reason });
    this.name = 'TokenInvalidError';
  }
}

export class TokenExpiredError extends BusinessRuleError {
  constructor(expiredAt: number) {
    super(
      `Token expired at ${new Date(expiredAt).toISOString()}`,
      'TOKEN_EXPIRED',
      { expiredAt },
    );
    this.name = 'TokenExpiredError';
  }
}

export class RefreshTokenRevokedError extends BusinessRuleError {
  constructor(jti: string, reason?: string) {
    super(
      `Refresh token "${jti}" has been revoked${reason ? `: ${reason}` : ''}`,
      'REFRESH_TOKEN_REVOKED',
      { jti, reason },
    );
    this.name = 'RefreshTokenRevokedError';
  }
}

export class AccessTokenRevokedError extends BusinessRuleError {
  constructor(jti: string, reason?: string) {
    super(
      `Access token "${jti}" has been revoked${reason ? `: ${reason}` : ''}`,
      'ACCESS_TOKEN_REVOKED',
      { jti, reason },
    );
    this.name = 'AccessTokenRevokedError';
  }
}

export class TokenSignatureInvalidError extends BusinessRuleError {
  constructor() {
    super('Token signature is invalid', 'TOKEN_SIGNATURE_INVALID');
    this.name = 'TokenSignatureInvalidError';
  }
}

export class TokenAudienceMismatchError extends BusinessRuleError {
  constructor(expected: string, actual: string) {
    super(
      `Token audience mismatch: expected "${expected}", actual "${actual}"`,
      'TOKEN_AUDIENCE_MISMATCH',
      { expected, actual },
    );
    this.name = 'TokenAudienceMismatchError';
  }
}

export class ResetTokenUsedError extends BusinessRuleError {
  constructor(tokenId: string) {
    super(
      `Reset token "${tokenId}" has already been used`,
      'RESET_TOKEN_USED',
      { tokenId },
    );
    this.name = 'ResetTokenUsedError';
  }
}

export class VerifyTokenUsedError extends BusinessRuleError {
  constructor(tokenId: string) {
    super(
      `Verify token "${tokenId}" has already been used`,
      'VERIFY_TOKEN_USED',
      { tokenId },
    );
    this.name = 'VerifyTokenUsedError';
  }
}
