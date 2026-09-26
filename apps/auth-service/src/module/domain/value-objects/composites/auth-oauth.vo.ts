/**
 * AuthOAuthVO — Snapshot of an OAuth binding
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { OAuthProviderVO } from '../primitives/oauth-provider.vo';
import { OAuthStatusVO } from '../primitives/oauth-status.vo';

export interface AuthOAuthVOProps {
  readonly oauthId: string;
  readonly userId: UserIdVO;
  readonly provider: OAuthProviderVO;
  readonly providerUserId: string;
  readonly scopes: readonly string[];
  readonly status: OAuthStatusVO;
  readonly linkedAt: number;
  readonly expiresAt?: number;
}

export class AuthOAuthVO extends BaseVO<AuthOAuthVOProps> {
  private constructor(props: AuthOAuthVOProps) {
    super(props);
  }

  static of(props: AuthOAuthVOProps): AuthOAuthVO {
    if (!props.providerUserId) {
      throw new Error('providerUserId is required');
    }
    return new AuthOAuthVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get provider(): OAuthProviderVO { return this.value.provider; }
  get status(): OAuthStatusVO { return this.value.status; }

  hasScope(scope: string): boolean { return this.value.scopes.includes(scope); }
  isActive(): boolean { return this.value.status.isActive(); }
}
