import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { MfaSecretVO } from '../primitives/mfa-secret.vo';
import { MfaTypeVO } from '../primitives/mfa-type.vo';
import { MfaStatusVO } from '../primitives/mfa-status.vo';

export interface AuthMfaProps {
  readonly userId: UserIdVO;
  readonly secret: MfaSecretVO;
  readonly type: MfaTypeVO;
  readonly status: MfaStatusVO;
  readonly enabledAt: Date | null;
  readonly lastVerifiedAt: Date | null;
}

export class AuthMfaVO extends BaseVO<AuthMfaProps> {
  private constructor(props: AuthMfaProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AuthMfaProps): AuthMfaVO {
    return new AuthMfaVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get secret(): MfaSecretVO { return this.value.secret; }
  get type(): MfaTypeVO { return this.value.type; }
  get status(): MfaStatusVO { return this.value.status; }
  get enabledAt(): Date | null { return this.value.enabledAt; }
  get lastVerifiedAt(): Date | null { return this.value.lastVerifiedAt; }

  get isEnabled(): boolean {
    return this.value.status.value === 'enabled';
  }
}
