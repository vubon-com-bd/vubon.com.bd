import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { AUTH_PROVIDER } from '@vubon/shared-constants/auth';
import { SocialAlreadyLinkedError } from '../../errors/social.errors';

const VALID = new Set<string>(Object.values(AUTH_PROVIDER));

export class SocialProviderVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SocialProviderVO {
    if (!VALID.has(raw)) {
      throw new SocialAlreadyLinkedError(raw);
    }
    return new SocialProviderVO(raw);
  }
}
