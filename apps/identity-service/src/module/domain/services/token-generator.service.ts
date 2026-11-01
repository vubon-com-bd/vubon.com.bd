/**
 * TokenGeneratorService
 * @module identity-service/domain/services
 *
 * Generates token payloads — NOT signing (that's infrastructure).
 */
import { AUTH_TOKEN, AUTH_TOKEN_TYPE } from '@vubon/shared-constants/auth';
import { TokenExpiryVO } from '../value-objects/primitives/token-expiry.vo.js';
import { TokenTypeVO } from '../value-objects/primitives/token-type.vo.js';

export interface TokenPayloadInput {
  readonly sub: string;
  readonly sid?: string;
  readonly type: string;
  readonly scope?: readonly string[];
  readonly iss: string;
  readonly aud?: string;
  readonly jti: string;
}

export interface TokenPayload {
  readonly sub: string;
  readonly sid?: string;
  readonly type: string;
  readonly scope?: readonly string[];
  readonly iat: number;
  readonly exp: number;
  readonly iss: string;
  readonly aud?: string;
  readonly jti: string;
}

export class TokenGeneratorService {
  static readonly ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
  static readonly REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 3600;
  static readonly ID_TOKEN_TTL_SECONDS = 3600;
  static readonly RESET_TOKEN_TTL_SECONDS = 3600;
  static readonly VERIFY_TOKEN_TTL_SECONDS = 24 * 3600;
  static readonly INVITE_TOKEN_TTL_SECONDS = 7 * 24 * 3600;

  /**
   * Build token payload with correct exp.
   */
  static buildPayload(
    input: TokenPayloadInput,
    ttlSeconds: number,
    nowMs: number = Date.now(),
  ): TokenPayload {
    const iat = Math.floor(nowMs / 1000);
    const exp = iat + ttlSeconds;
    return {
      sub: input.sub,
      sid: input.sid,
      type: input.type,
      scope: input.scope,
      iat,
      exp,
      iss: input.iss,
      aud: input.aud,
      jti: input.jti,
    };
  }

  static accessTokenPayload(
    input: Omit<TokenPayloadInput, 'type'>,
    nowMs: number = Date.now(),
  ): TokenPayload {
    return this.buildPayload(
      { ...input, type: AUTH_TOKEN_TYPE.ACCESS },
      this.ACCESS_TOKEN_TTL_SECONDS,
      nowMs,
    );
  }

  static refreshTokenPayload(
    input: Omit<TokenPayloadInput, 'type'>,
    nowMs: number = Date.now(),
  ): TokenPayload {
    return this.buildPayload(
      { ...input, type: AUTH_TOKEN_TYPE.REFRESH },
      this.REFRESH_TOKEN_TTL_SECONDS,
      nowMs,
    );
  }

  static idTokenPayload(
    input: Omit<TokenPayloadInput, 'type'>,
    nowMs: number = Date.now(),
  ): TokenPayload {
    return this.buildPayload(
      { ...input, type: AUTH_TOKEN_TYPE.ID },
      this.ID_TOKEN_TTL_SECONDS,
      nowMs,
    );
  }

  static resetTokenPayload(
    input: Omit<TokenPayloadInput, 'type'>,
    nowMs: number = Date.now(),
  ): TokenPayload {
    return this.buildPayload(
      { ...input, type: AUTH_TOKEN_TYPE.RESET },
      this.RESET_TOKEN_TTL_SECONDS,
      nowMs,
    );
  }

  static verifyTokenPayload(
    input: Omit<TokenPayloadInput, 'type'>,
    nowMs: number = Date.now(),
  ): TokenPayload {
    return this.buildPayload(
      { ...input, type: AUTH_TOKEN_TYPE.VERIFY },
      this.VERIFY_TOKEN_TTL_SECONDS,
      nowMs,
    );
  }

  static inviteTokenPayload(
    input: Omit<TokenPayloadInput, 'type'>,
    nowMs: number = Date.now(),
  ): TokenPayload {
    return this.buildPayload(
      { ...input, type: AUTH_TOKEN_TYPE.INVITE },
      this.INVITE_TOKEN_TTL_SECONDS,
      nowMs,
    );
  }

  static accessExpiry(nowMs: number = Date.now()): TokenExpiryVO {
    return TokenExpiryVO.fromNow(this.ACCESS_TOKEN_TTL_SECONDS, nowMs);
  }

  static refreshExpiry(nowMs: number = Date.now()): TokenExpiryVO {
    return TokenExpiryVO.fromNow(this.REFRESH_TOKEN_TTL_SECONDS, nowMs);
  }

  static defaultType(): TokenTypeVO {
    return TokenTypeVO.access();
  }

  static issuer(): string {
    return AUTH_TOKEN.ISSUER;
  }

  static audience(): string {
    return AUTH_TOKEN.AUDIENCE;
  }

  static algorithm(): string {
    return AUTH_TOKEN.ALGORITHM;
  }
}
