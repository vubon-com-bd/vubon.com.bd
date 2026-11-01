/**
 * TokenType Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { AUTH_TOKEN_TYPE } from '@vubon/shared-constants/auth';
import { InvalidTokenTypeError } from '../../errors/token.errors.js';

const VALID_TYPES: readonly string[] = Object.values(AUTH_TOKEN_TYPE);

export class TokenTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TokenTypeVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidTokenTypeError(String(raw), VALID_TYPES);
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new InvalidTokenTypeError(normalized, VALID_TYPES);
    }
    return new TokenTypeVO(normalized);
  }

  static access(): TokenTypeVO { return new TokenTypeVO(AUTH_TOKEN_TYPE.ACCESS); }
  static refresh(): TokenTypeVO { return new TokenTypeVO(AUTH_TOKEN_TYPE.REFRESH); }
  static id(): TokenTypeVO { return new TokenTypeVO(AUTH_TOKEN_TYPE.ID); }
  static reset(): TokenTypeVO { return new TokenTypeVO(AUTH_TOKEN_TYPE.RESET); }
  static verify(): TokenTypeVO { return new TokenTypeVO(AUTH_TOKEN_TYPE.VERIFY); }
  static invite(): TokenTypeVO { return new TokenTypeVO(AUTH_TOKEN_TYPE.INVITE); }
  static api(): TokenTypeVO { return new TokenTypeVO(AUTH_TOKEN_TYPE.API); }

  static reconstitute(raw: string): TokenTypeVO {
    return new TokenTypeVO(raw);
  }

  isAccess(): boolean { return this.value === AUTH_TOKEN_TYPE.ACCESS; }
  isRefresh(): boolean { return this.value === AUTH_TOKEN_TYPE.REFRESH; }
  isId(): boolean { return this.value === AUTH_TOKEN_TYPE.ID; }
  isReset(): boolean { return this.value === AUTH_TOKEN_TYPE.RESET; }
  isVerify(): boolean { return this.value === AUTH_TOKEN_TYPE.VERIFY; }
  isInvite(): boolean { return this.value === AUTH_TOKEN_TYPE.INVITE; }
  isApi(): boolean { return this.value === AUTH_TOKEN_TYPE.API; }
  isShortLived(): boolean { return this.isAccess() || this.isId(); }
  isLongLived(): boolean { return this.isRefresh() || this.isApi(); }
}
