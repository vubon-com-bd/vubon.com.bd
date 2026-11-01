/**
 * SocialProvider Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { AUTH_SOCIAL } from '@vubon/shared-constants/auth';
import { InvalidSocialProviderError } from '../../errors/social.errors.js';

const VALID_PROVIDERS: readonly string[] = Object.values(AUTH_SOCIAL);

export class SocialProviderVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SocialProviderVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new InvalidSocialProviderError(String(raw), VALID_PROVIDERS);
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_PROVIDERS.includes(normalized)) {
      throw new InvalidSocialProviderError(normalized, VALID_PROVIDERS);
    }
    return new SocialProviderVO(normalized);
  }

  static google(): SocialProviderVO { return new SocialProviderVO(AUTH_SOCIAL.GOOGLE); }
  static facebook(): SocialProviderVO { return new SocialProviderVO(AUTH_SOCIAL.FACEBOOK); }
  static apple(): SocialProviderVO { return new SocialProviderVO(AUTH_SOCIAL.APPLE); }
  static github(): SocialProviderVO { return new SocialProviderVO(AUTH_SOCIAL.GITHUB); }
  static linkedin(): SocialProviderVO { return new SocialProviderVO(AUTH_SOCIAL.LINKEDIN); }
  static twitter(): SocialProviderVO { return new SocialProviderVO(AUTH_SOCIAL.TWITTER); }
  static microsoft(): SocialProviderVO { return new SocialProviderVO(AUTH_SOCIAL.MICROSOFT); }

  static reconstitute(raw: string): SocialProviderVO {
    return new SocialProviderVO(raw);
  }
}
