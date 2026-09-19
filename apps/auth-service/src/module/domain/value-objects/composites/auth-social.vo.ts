import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { SocialProviderVO } from '../primitives/social-provider.vo';
import { SocialTokenVO } from '../primitives/social-token.vo';
import { SocialStatusVO } from '../primitives/social-status.vo';

export interface AuthSocialProps {
  readonly userId: UserIdVO;
  readonly provider: SocialProviderVO;
  readonly providerUserId: string;
  readonly accessToken: SocialTokenVO;
  readonly refreshToken: SocialTokenVO | null;
  readonly status: SocialStatusVO;
  readonly linkedAt: Date;
}

export class AuthSocialVO extends BaseVO<AuthSocialProps> {
  private constructor(props: AuthSocialProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AuthSocialProps): AuthSocialVO {
    return new AuthSocialVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get provider(): SocialProviderVO { return this.value.provider; }
  get providerUserId(): string { return this.value.providerUserId; }
  get accessToken(): SocialTokenVO { return this.value.accessToken; }
  get refreshToken(): SocialTokenVO | null { return this.value.refreshToken; }
  get status(): SocialStatusVO { return this.value.status; }
  get linkedAt(): Date { return this.value.linkedAt; }

  get isLinked(): boolean {
    return this.value.status.value === 'linked';
  }
}
