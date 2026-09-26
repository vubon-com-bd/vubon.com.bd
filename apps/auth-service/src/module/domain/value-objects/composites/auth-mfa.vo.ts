/**
 * AuthMfaVO — Snapshot of user's MFA configuration
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { MfaTypeVO } from '../primitives/mfa-type.vo';
import { MfaStatusVO } from '../primitives/mfa-status.vo';

export interface AuthMfaVOProps {
  readonly userId: UserIdVO;
  readonly type: MfaTypeVO;
  readonly status: MfaStatusVO;
  readonly enrolledAt?: number;
  readonly verifiedAt?: number;
}

export class AuthMfaVO extends BaseVO<AuthMfaVOProps> {
  private constructor(props: AuthMfaVOProps) {
    super(props);
  }

  static of(props: AuthMfaVOProps): AuthMfaVO {
    return new AuthMfaVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get type(): MfaTypeVO { return this.value.type; }
  get status(): MfaStatusVO { return this.value.status; }

  isEnabled(): boolean { return this.value.status.isActive(); }
  requiresVerification(): boolean { return this.value.status.requiresVerification(); }
}
