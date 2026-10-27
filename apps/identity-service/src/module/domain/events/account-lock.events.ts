/**
 * Account Lock Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const ACCOUNT_LOCK_EVENT_TYPE = {
  LOCKED: 'identity.account_lock.locked',
  UNLOCKED: 'identity.account_lock.unlocked',
  EXTENDED: 'identity.account_lock.extended',
} as const;

export interface AccountLockedPayload {
  readonly authId: string;
  readonly userId: string;
  readonly reason: string;
  readonly attemptCount: number;
  readonly lockedAt: string;
  readonly lockedUntil: string;
  readonly ipAddress?: string;
}

export interface AccountUnlockedPayload {
  readonly authId: string;
  readonly userId: string;
  readonly unlockedAt: string;
  readonly unlockedBy?: string;
  readonly reason?: string;
}

export class AccountLockedEvent extends BaseDomainEvent<
  typeof ACCOUNT_LOCK_EVENT_TYPE.LOCKED,
  AccountLockedPayload
> {
  constructor(p: BaseEventParams<AccountLockedPayload>) {
    super(buildEventParams(ACCOUNT_LOCK_EVENT_TYPE.LOCKED, AUTH_AGGREGATE_TYPE.ACCOUNT_LOCK, p));
  }
}

export class AccountUnlockedEvent extends BaseDomainEvent<
  typeof ACCOUNT_LOCK_EVENT_TYPE.UNLOCKED,
  AccountUnlockedPayload
> {
  constructor(p: BaseEventParams<AccountUnlockedPayload>) {
    super(buildEventParams(ACCOUNT_LOCK_EVENT_TYPE.UNLOCKED, AUTH_AGGREGATE_TYPE.ACCOUNT_LOCK, p));
  }
}
