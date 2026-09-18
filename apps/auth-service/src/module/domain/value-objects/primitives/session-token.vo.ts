import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { InvalidTokenError } from '../../errors/token.errors';

export class SessionTokenVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SessionTokenVO {
    BaseCodeVO.validateNonEmpty(raw, 'SessionToken');
    if (raw.length < 16) {
      throw new InvalidTokenError('session token too short');
    }
    return new SessionTokenVO(raw);
  }
}
