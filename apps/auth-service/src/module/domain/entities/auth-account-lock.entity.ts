/**
 * AuthAccountLockEntity — Account lock record (aggregate)
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import { AccountLockReasonVO } from '../value-objects/primitives/account-lock-reason.vo';
import { AccountLockDurationVO } from '../value-objects/primitives/account-lock-duration.vo';
import { AccountNotLockedError } from '../errors/account-lock.errors';

export interface AuthAccountLockEntityProps {
  readonly id: string;
  readonly userId: UserId;
  readonly reason: AccountLockReasonVO;
  readonly lockedAt: number;
  readonly duration?: AccountLockDurationVO;
  readonly unlockedAt?: number;
  readonly unlockedBy?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class AuthAccountLockEntity extends BaseEntity<string> {
  readonly userId: UserId;
  private _reason: AccountLockReasonVO;
  private _lockedAt: number;
  private _duration?: AccountLockDurationVO;
  private _unlockedAt?: number;
  private _unlockedBy?: string;

  private constructor(props: AuthAccountLockEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._reason = props.reason;
    this._lockedAt = props.lockedAt;
    this._duration = props.duration;
    this._unlockedAt = props.unlockedAt;
    this._unlockedBy = props.unlockedBy;
  }

  static create(props: AuthAccountLockEntityProps): AuthAccountLockEntity {
    return new AuthAccountLockEntity(props);
  }

  get reason(): AccountLockReasonVO { return this._reason; }
  get lockedAt(): number { return this._lockedAt; }
  get duration(): AccountLockDurationVO | undefined { return this._duration; }
  get unlockedAt(): number | undefined { return this._unlockedAt; }

  isPermanent(): boolean { return this._duration === undefined; }

  isLocked(now: number): boolean {
    if (this._unlockedAt) return false;
    if (!this._duration) return true;
    return this._lockedAt + this._duration.value > now;
  }

  unlock(at: number, by?: string): void {
    if (this._unlockedAt) throw new AccountNotLockedError(this.userId);
    this._unlockedAt = at;
    this._unlockedBy = by;
  }

  shouldAutoUnlock(now: number): boolean {
    if (this._unlockedAt || !this._duration) return false;
    if (!this._duration.canAutoUnlock()) return false;
    return !this.isLocked(now);
  }
}
