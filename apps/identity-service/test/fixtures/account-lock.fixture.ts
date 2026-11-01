/**
 * Account Lock fixtures
 * @module identity-service/test/fixtures
 */
import { AccountLockEntity } from '@domain/entities/account-lock.entity.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { LockReasonVO } from '@domain/value-objects/primitives/lock-reason.vo.js';
import { LockDurationVO } from '@domain/value-objects/primitives/lock-duration.vo.js';
import { IpAddressVO } from '@domain/value-objects/primitives/ip-address.vo.js';

import { TEST_IDS, TEST_IP } from './ids.fixture.js';
import { TEST_DATES } from './dates.fixture.js';

export interface MakeAccountLockOptions {
  readonly id?: string;
  readonly authId?: string;
  readonly userId?: string;
  readonly reason?: string;
  readonly durationSeconds?: number;
  readonly attemptCount?: number;
  readonly lockedAt?: string;
  readonly lockedUntil?: string;
  readonly unlockedAt?: string;
  readonly unlockedBy?: string;
}

export const makeAccountLockEntity = (
  options: MakeAccountLockOptions = {},
): AccountLockEntity => {
  const lockedAt = options.lockedAt ?? TEST_DATES.NOW;
  return AccountLockEntity.reconstitute({
    id: options.id ?? TEST_IDS.ACCOUNT_LOCK_ID,
    createdAt: lockedAt,
    updatedAt: lockedAt,
    props: {
      authId: AuthIdVO.create(options.authId ?? TEST_IDS.AUTH_ID),
      userId: UserIdVO.create(options.userId ?? TEST_IDS.USER_ID),
      reason: LockReasonVO.create(options.reason ?? 'too_many_attempts'),
      duration: LockDurationVO.fromSeconds(options.durationSeconds ?? 900),
      attemptCount: options.attemptCount ?? 5,
      lockedAt,
      lockedUntil: options.lockedUntil ?? TEST_DATES.IN_ONE_HOUR,
      ipAddress: IpAddressVO.create(TEST_IP),
      unlockedAt: options.unlockedAt,
      unlockedBy: options.unlockedBy,
    },
  });
};

export const activeAccountLock = (): AccountLockEntity =>
  makeAccountLockEntity({ unlockedAt: undefined });

export const expiredAccountLock = (): AccountLockEntity =>
  makeAccountLockEntity({
    lockedUntil: TEST_DATES.PAST_EXPIRY,
  });

export const unlockedAccountLock = (): AccountLockEntity =>
  makeAccountLockEntity({
    unlockedAt: TEST_DATES.NOW,
    unlockedBy: TEST_IDS.USER_ID,
  });

export const createNewAccountLock = (
  options: MakeAccountLockOptions = {},
): AccountLockEntity => {
  const lockedAt = TEST_DATES.NOW;
  return AccountLockEntity.create({
    id: options.id ?? TEST_IDS.ACCOUNT_LOCK_ID,
    props: {
      authId: AuthIdVO.create(options.authId ?? TEST_IDS.AUTH_ID),
      userId: UserIdVO.create(options.userId ?? TEST_IDS.USER_ID),
      reason: LockReasonVO.create(options.reason ?? 'too_many_attempts'),
      duration: LockDurationVO.fromSeconds(options.durationSeconds ?? 900),
      attemptCount: options.attemptCount ?? 5,
      lockedAt,
      lockedUntil: options.lockedUntil ?? TEST_DATES.IN_ONE_HOUR,
      ipAddress: IpAddressVO.create(TEST_IP),
    },
    now: lockedAt,
  });
};
