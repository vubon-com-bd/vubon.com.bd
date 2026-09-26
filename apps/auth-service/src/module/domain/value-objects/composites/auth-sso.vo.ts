/**
 * AuthSsoVO — Snapshot of an SSO binding
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { SsoProviderVO } from '../primitives/sso-provider.vo';
import { SsoStatusVO } from '../primitives/sso-status.vo';

export interface AuthSsoVOProps {
  readonly ssoId: string;
  readonly userId: UserIdVO;
  readonly provider: SsoProviderVO;
  readonly tenantId: string;
  readonly providerUserId: string;
  readonly status: SsoStatusVO;
  readonly linkedAt: number;
}

export class AuthSsoVO extends BaseVO<AuthSsoVOProps> {
  private constructor(props: AuthSsoVOProps) {
    super(props);
  }

  static of(props: AuthSsoVOProps): AuthSsoVO {
    if (!props.tenantId) {
      throw new Error('SSO tenantId is required');
    }
    if (!props.providerUserId) {
      throw new Error('SSO providerUserId is required');
    }
    return new AuthSsoVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get provider(): SsoProviderVO { return this.value.provider; }
  get tenantId(): string { return this.value.tenantId; }

  isActive(): boolean { return this.value.status.isActive(); }
}
