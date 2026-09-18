import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { AUTH_PROVIDER } from '@vubon/shared-constants/auth';
import { OAuthFailedError } from '../../errors/oauth.errors';

const VALID = new Set<string>(Object.values(AUTH_PROVIDER));

export class OAuthProviderVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OAuthProviderVO {
    if (!VALID.has(raw)) {
      throw new OAuthFailedError(raw, 'unsupported provider');
    }
    return new OAuthProviderVO(raw);
  }
}
