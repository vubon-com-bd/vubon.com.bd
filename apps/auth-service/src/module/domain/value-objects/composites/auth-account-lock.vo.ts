/**
 * AuthAccountLockVO — Snapshot of an account lock
 * @module auth-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { AccountLockReasonVO } from '../primitives/account-lock-reason.vo';

export interface AuthAccountLockVOProps {
  readonly lockId: string;
  readonly userId: UserIdVO;
  readonly reason: AccountLockReasonVO;
  readonly lockedAt: number;
  readonly unlockAt?: number;
  readonly unlockedAt?: number;
  readonly unlockedBy?: string;
}

export class AuthAccountLockVO extends BaseVO<AuthAccountLockVOProps> {
  private constructor(props: AuthAccountLockVOProps) {
    super(props);
  }

  static of(props: AuthAccountLockVOProps): AuthAccountLockVO {
    if (props.unlockAt && props.unlockAt <= props.lockedAt) {
      throw new Error('unlockAt must be after lockedAt');
    }
    return new AuthAccountLockVO(props);
  }

  get userId(): UserIdVO { return this.value.userId; }
  get reason(): AccountLockReasonVO { return this.value.reason; }

  isCurrentlyLocked(now: number): boolean {
    if (this.value.unlockedAt) return false;
    if (!this.value.unlockAt) return true; // permanent
    return this.value.unlockAt > now;
  }

  requiresManualUnlock(): boolean { return this.value.reason.requiresManualUnlock(); }
}
