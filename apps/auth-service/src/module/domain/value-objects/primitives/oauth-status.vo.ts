import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { InvalidStatusError } from '../../errors/user.errors';

const VALID = new Set<string>(['pending', 'active', 'revoked', 'expired']);

export class OAuthStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OAuthStatusVO {
    if (!VALID.has(raw)) {
      throw new InvalidStatusError(raw);
    }
    return new OAuthStatusVO(raw);
  }
}
