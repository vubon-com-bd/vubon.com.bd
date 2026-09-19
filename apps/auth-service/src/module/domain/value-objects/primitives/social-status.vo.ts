import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { InvalidStatusError } from '../../errors/user.errors';

const VALID = new Set<string>(['linked', 'unlinked', 'pending', 'revoked']);

export class SocialStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SocialStatusVO {
    if (!VALID.has(raw)) {
      throw new InvalidStatusError(raw);
    }
    return new SocialStatusVO(raw);
  }
}
