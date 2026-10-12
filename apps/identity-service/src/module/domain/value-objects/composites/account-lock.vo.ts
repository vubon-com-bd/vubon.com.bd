/**
 * AccountLockVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { AuthIdVO } from '../primitives/auth-id.vo.js';
import { LockReasonVO } from '../primitives/lock-reason.vo.js';
import { LockDurationVO } from '../primitives/lock-duration.vo.js';
import { IpAddressVO } from '../primitives/ip-address.vo.js';

export interface AccountLockVOProps {
  readonly authId: AuthIdVO;
  readonly reason: LockReasonVO;
  readonly duration: LockDurationVO;
  readonly lockedAt: string;
  readonly lockedUntil: string;
  readonly attemptCount: number;
  readonly ipAddress?: IpAddressVO;
  readonly unlockedAt?: string;
  readonly unlockedBy?: string;
}

export class AccountLockVO extends BaseVO<AccountLockVOProps> {
  private constructor(props: AccountLockVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: AccountLockVOProps): AccountLockVO {
    const vo = new AccountLockVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: AccountLockVOProps): AccountLockVO {
    return new AccountLockVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.attemptCount < 1) {
      throw new ValidationError('attemptCount must be at least 1', 'attemptCount');
    }
    const lockMs = Date.parse(v.lockedUntil);
    const lockedMs = Date.parse(v.lockedAt);
    if (Number.isNaN(lockMs) || Number.isNaN(lockedMs)) {
      throw new ValidationError('Invalid lockedAt/lockedUntil', 'lockedUntil');
    }
    if (lockMs <= lockedMs) {
      throw new ValidationError(
        'lockedUntil must be after lockedAt',
        'lockedUntil',
      );
    }
  }

  get authId(): AuthIdVO { return this.value.authId; }
  get reason(): LockReasonVO { return this.value.reason; }
  get duration(): LockDurationVO { return this.value.duration; }
  get lockedAt(): string { return this.value.lockedAt; }
  get lockedUntil(): string { return this.value.lockedUntil; }
  get attemptCount(): number { return this.value.attemptCount; }
  get ipAddress(): IpAddressVO | undefined { return this.value.ipAddress; }
  get unlockedAt(): string | undefined { return this.value.unlockedAt; }
  get unlockedBy(): string | undefined { return this.value.unlockedBy; }

  isActive(nowMs: number = Date.now()): boolean {
    if (this.value.unlockedAt) return false;
    return nowMs < Date.parse(this.value.lockedUntil);
  }
  isExpired(nowMs: number = Date.now()): boolean {
    return nowMs >= Date.parse(this.value.lockedUntil);
  }
}
