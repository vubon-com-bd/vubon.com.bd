import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { OAuthProviderVO } from '../primitives/oauth-provider.vo';
import { OAuthTokenVO } from '../primitives/oauth-token.vo';
import { OAuthStatusVO } from '../primitives/oauth-status.vo';

export interface AuthOAuthProps {
  readonly userId: UserIdVO;
  readonly provider: OAuthProviderVO;
  readonly accessToken: OAuthTokenVO;
  readonly refreshToken: OAuthTokenVO | null;
  readonly scope: string;
  readonly status: OAuthStatusVO;
  readonly expiresAt: Date | null;
}

export class AuthOAuthVO extends BaseVO<AuthOAuthProps> {
  private constructor(props: AuthOAuthProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AuthOAuthProps): AuthOAuthVO {
    return new AuthOAuthVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get provider(): OAuthProviderVO { return this.value.provider; }
  get accessToken(): OAuthTokenVO { return this.value.accessToken; }
  get refreshToken(): OAuthTokenVO | null { return this.value.refreshToken; }
  get scope(): string { return this.value.scope; }
  get status(): OAuthStatusVO { return this.value.status; }
  get expiresAt(): Date | null { return this.value.expiresAt; }

  get isExpired(): boolean {
    if (!this.value.expiresAt) return false;
    return this.value.expiresAt.getTime() <= Date.now();
  }
}
