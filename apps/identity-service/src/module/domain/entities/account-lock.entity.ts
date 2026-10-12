/**
 * AccountLockEntity — AGGREGATE ROOT
 * @module identity-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { LockReasonVO } from '../value-objects/primitives/lock-reason.vo.js';
import { LockDurationVO } from '../value-objects/primitives/lock-duration.vo.js';
import { IpAddressVO } from '../value-objects/primitives/ip-address.vo.js';

import {
  AccountLockedEvent,
  AccountUnlockedEvent,
} from '../events/account-lock.events.js';

export interface AccountLockEntityProps {
  readonly authId: AuthIdVO;
  readonly userId: UserIdVO;
  readonly reason: LockReasonVO;
  readonly duration: LockDurationVO;
  readonly attemptCount: number;
  readonly lockedAt: string;
  readonly lockedUntil: string;
  readonly ipAddress?: IpAddressVO;
  readonly unlockedAt?: string;
  readonly unlockedBy?: string;
}

export class AccountLockEntity extends AggregateRoot<string> {
  private _unlockedAt?: string;
  private _unlockedBy?: string;

  private readonly _authId: AuthIdVO;
  private readonly _userId: UserIdVO;
  private readonly _reason: LockReasonVO;
  private readonly _duration: LockDurationVO;
  private readonly _attemptCount: number;
  private readonly _lockedAt: string;
  private readonly _lockedUntil: string;
  private readonly _ipAddress?: IpAddressVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: AccountLockEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this._authId = props.authId;
    this._userId = props.userId;
    this._reason = props.reason;
    this._duration = props.duration;
    this._attemptCount = props.attemptCount;
    this._lockedAt = props.lockedAt;
    this._lockedUntil = props.lockedUntil;
    this._ipAddress = props.ipAddress;
    this._unlockedAt = props.unlockedAt;
    this._unlockedBy = props.unlockedBy;
  }

  get authId(): AuthIdVO { return this._authId; }
  get userId(): UserIdVO { return this._userId; }
  get reason(): LockReasonVO { return this._reason; }
  get duration(): LockDurationVO { return this._duration; }
  get attemptCount(): number { return this._attemptCount; }
  get lockedAt(): string { return this._lockedAt; }
  get lockedUntil(): string { return this._lockedUntil; }
  get ipAddress(): IpAddressVO | undefined { return this._ipAddress; }
  get unlockedAt(): string | undefined { return this._unlockedAt; }
  get unlockedBy(): string | undefined { return this._unlockedBy; }

  isActive(nowMs: number = Date.now()): boolean {
    if (this._unlockedAt) return false;
    return nowMs < Date.parse(this._lockedUntil);
  }
  isExpired(nowMs: number = Date.now()): boolean {
    return nowMs >= Date.parse(this._lockedUntil);
  }

  unlock(unlockedBy?: string, now: string = new Date().toISOString()): void {
    if (this._unlockedAt) {
      throw new BusinessRuleError(
        'Account lock already unlocked',
        'ACCOUNT_LOCK_ALREADY_UNLOCKED',
        { lockId: this.id },
      );
    }
    this._unlockedAt = now;
    this._unlockedBy = unlockedBy;
    this.addDomainEvent(
      new AccountUnlockedEvent({
        aggregateId: this.id,
        payload: {
          authId: this._authId.value,
          userId: this._userId.value,
          unlockedAt: now,
          unlockedBy,
          reason: 'manual_unlock',
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    props: AccountLockEntityProps;
    now: string;
  }): AccountLockEntity {
    const entity = new AccountLockEntity(params.id, params.now, params.now, params.props);

    entity.addDomainEvent(
      new AccountLockedEvent({
        aggregateId: params.id,
        payload: {
          authId: params.props.authId.value,
          userId: params.props.userId.value,
          reason: params.props.reason.value,
          attemptCount: params.props.attemptCount,
          lockedAt: params.props.lockedAt,
          lockedUntil: params.props.lockedUntil,
          ipAddress: params.props.ipAddress?.value,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: AccountLockEntityProps;
    version?: number;
  }): AccountLockEntity {
    const entity = new AccountLockEntity(params.id, params.createdAt, params.updatedAt, params.props);
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
