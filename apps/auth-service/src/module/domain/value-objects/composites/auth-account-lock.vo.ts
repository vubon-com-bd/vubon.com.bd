import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { AccountLockReasonVO } from '../primitives/account-lock-reason.vo';
import { AccountLockDurationVO } from '../primitives/account-lock-duration.vo';

export interface AuthAccountLockProps {
  readonly userId: UserIdVO;
  readonly reason: AccountLockReasonVO;
  readonly duration: AccountLockDurationVO;
  readonly lockedAt: Date;
  readonly unlockedAt: Date | null;
}

export class AuthAccountLockVO extends BaseVO<AuthAccountLockProps> {
  private constructor(props: AuthAccountLockProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AuthAccountLockProps): AuthAccountLockVO {
    return new AuthAccountLockVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get reason(): AccountLockReasonVO { return this.value.reason; }
  get duration(): AccountLockDurationVO { return this.value.duration; }
  get lockedAt(): Date { return this.value.lockedAt; }
  get unlockedAt(): Date | null { return this.value.unlockedAt; }

  get isActive(): boolean {
    return this.value.unlockedAt === null && this.value.duration.isActive();
  }
}
