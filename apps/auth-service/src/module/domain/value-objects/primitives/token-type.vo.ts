import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { InvalidTokenError } from '../../errors/token.errors';

const VALID_TOKEN_TYPES = new Set<string>([
  'access',
  'refresh',
  'id',
  'reset',
  'verify',
  'magic',
]);

export class TokenTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TokenTypeVO {
    if (!VALID_TOKEN_TYPES.has(raw)) {
      throw new InvalidTokenError(`invalid token type: ${raw}`);
    }
    return new TokenTypeVO(raw);
  }
}
