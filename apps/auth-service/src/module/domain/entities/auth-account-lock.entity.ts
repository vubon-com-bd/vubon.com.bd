import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AccountLockReasonVO } from '../value-objects/primitives/account-lock-reason.vo';
import { AccountLockDurationVO } from '../value-objects/primitives/account-lock-duration.vo';
import {
  AccountLockedEvent,
  AccountUnlockedEvent,
} from '../events/auth-account-lock.events';

export interface AuthAccountLockEntityProps {
  readonly userId: UserIdVO;
  readonly reason: AccountLockReasonVO;
  readonly duration: AccountLockDurationVO;
  readonly lockedAt: Date;
  readonly unlockedAt: Date | null;
}

export class AuthAccountLockEntity extends AggregateRoot<UserIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _reason: AccountLockReasonVO;
  private readonly _duration: AccountLockDurationVO;
  private readonly _lockedAt: Date;
  private readonly _unlockedAt: Date | null;

  private constructor(
    id: UserIdVO,
    props: AuthAccountLockEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._reason = props.reason;
    this._duration = props.duration;
    this._lockedAt = props.lockedAt;
    this._unlockedAt = props.unlockedAt;
  }

  static create(props: AuthAccountLockEntityProps): AuthAccountLockEntity {
    const now = new Date().toISOString();
    const entity = new AuthAccountLockEntity(props.userId, props, now, now, null);
    entity.addDomainEvent(
      new AccountLockedEvent(
        props.userId.value,
        props.userId.value,
        props.reason.value,
        new Date(props.duration.epochMs).toISOString(),
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: UserIdVO,
    props: AuthAccountLockEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): AuthAccountLockEntity {
    return new AuthAccountLockEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  unlock(reason: string): AuthAccountLockEntity {
    const now = new Date();
    const updated = new AuthAccountLockEntity(
      this.id,
      { ...this._toProps(), unlockedAt: now },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new AccountUnlockedEvent(
        this.id.value,
        this.id.value,
        reason,
        this.version + 1,
      ),
    );
    return updated;
  }

  get userId(): UserIdVO { return this._userId; }
  get reason(): AccountLockReasonVO { return this._reason; }
  get duration(): AccountLockDurationVO { return this._duration; }
  get lockedAt(): Date { return this._lockedAt; }
  get unlockedAt(): Date | null { return this._unlockedAt; }

  get isActive(): boolean {
    return this._unlockedAt === null && this._duration.isActive();
  }

  private _toProps(): AuthAccountLockEntityProps {
    return {
      userId: this._userId,
      reason: this._reason,
      duration: this._duration,
      lockedAt: this._lockedAt,
      unlockedAt: this._unlockedAt,
    };
  }
}
