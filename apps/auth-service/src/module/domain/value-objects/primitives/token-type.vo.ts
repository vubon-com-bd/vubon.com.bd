/**
 * TokenTypeVO — Discriminates token purposes
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { InvalidTokenError } from '../../errors/token.errors';

export type TokenTypeValue =
  | 'access'
  | 'refresh'
  | 'id'
  | 'password_reset'
  | 'email_verification'
  | 'invite'
  | 'api_key';

const ALLOWED: ReadonlySet<string> = new Set<string>([
  'access', 'refresh', 'id', 'password_reset',
  'email_verification', 'invite', 'api_key',
]);

export class TokenTypeVO extends BaseTypeVO<TokenTypeValue> {
  private constructor(value: TokenTypeValue) {
    super(value);
  }

  static of(raw: string): TokenTypeVO {
    if (!ALLOWED.has(raw)) {
      throw new InvalidTokenError(`Invalid token type: ${raw}`);
    }
    return new TokenTypeVO(raw as TokenTypeValue);
  }

  isShortLived(): boolean {
    return this.value === 'access' || this.value === 'id';
  }

  isRefreshLike(): boolean {
    return this.value === 'refresh';
  }
}
