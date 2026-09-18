import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { SsoProviderVO } from '../primitives/sso-provider.vo';
import { SsoTokenVO } from '../primitives/sso-token.vo';
import { SsoStatusVO } from '../primitives/sso-status.vo';

export interface AuthSsoProps {
  readonly userId: UserIdVO;
  readonly provider: SsoProviderVO;
  readonly externalId: string;
  readonly sessionToken: SsoTokenVO;
  readonly status: SsoStatusVO;
  readonly linkedAt: Date;
}

export class AuthSsoVO extends BaseVO<AuthSsoProps> {
  private constructor(props: AuthSsoProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AuthSsoProps): AuthSsoVO {
    return new AuthSsoVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get provider(): SsoProviderVO { return this.value.provider; }
  get externalId(): string { return this.value.externalId; }
  get sessionToken(): SsoTokenVO { return this.value.sessionToken; }
  get status(): SsoStatusVO { return this.value.status; }
  get linkedAt(): Date { return this.value.linkedAt; }
}
