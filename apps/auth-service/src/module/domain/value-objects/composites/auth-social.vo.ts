/**
 * AuthSocialVO — Snapshot of a linked social identity
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { SocialProviderVO } from '../primitives/social-provider.vo';
import { SocialStatusVO } from '../primitives/social-status.vo';

export interface AuthSocialVOProps {
  readonly socialId: string;
  readonly userId: UserIdVO;
  readonly provider: SocialProviderVO;
  readonly providerUserId: string;
  readonly status: SocialStatusVO;
  readonly linkedAt: number;
  readonly unlinkedAt?: number;
}

export class AuthSocialVO extends BaseVO<AuthSocialVOProps> {
  private constructor(props: AuthSocialVOProps) {
    super(props);
  }

  static of(props: AuthSocialVOProps): AuthSocialVO {
    if (!props.providerUserId) {
      throw new Error('providerUserId is required');
    }
    return new AuthSocialVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get provider(): SocialProviderVO { return this.value.provider; }
  get status(): SocialStatusVO { return this.value.status; }

  isLinked(): boolean { return this.value.status.isActive(); }
}
