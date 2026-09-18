import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { InvalidTokenError } from '../../errors/token.errors';

export class TokenValueVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TokenValueVO {
    BaseCodeVO.validateNonEmpty(raw, 'TokenValue');
    if (raw.length < 8) {
      throw new InvalidTokenError('token value too short');
    }
    return new TokenValueVO(raw);
  }
}
