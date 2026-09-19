import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { VerificationTypeVO } from '../primitives/verification-type.vo';
import { VerificationStatusVO } from '../primitives/verification-status.vo';

export interface UserVerificationProps {
  readonly userId: UserIdVO;
  readonly type: VerificationTypeVO;
  readonly status: VerificationStatusVO;
  readonly verifiedAt: Date | null;
  readonly expiresAt: Date | null;
}

export class UserVerificationVO extends BaseVO<UserVerificationProps> {
  private constructor(props: UserVerificationProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: UserVerificationProps): UserVerificationVO {
    return new UserVerificationVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get type(): VerificationTypeVO { return this.value.type; }
  get status(): VerificationStatusVO { return this.value.status; }
  get verifiedAt(): Date | null { return this.value.verifiedAt; }
  get expiresAt(): Date | null { return this.value.expiresAt; }

  get isVerified(): boolean {
    return this.value.status.value === 'verified';
  }

  get isExpired(): boolean {
    if (!this.value.expiresAt) return false;
    return this.value.expiresAt.getTime() <= Date.now();
  }
}
