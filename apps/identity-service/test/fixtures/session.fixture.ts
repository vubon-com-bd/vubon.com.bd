/**
 * Session fixtures
 * @module identity-service/test/fixtures
 */
import { SessionEntity } from '@domain/entities/session.entity.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { SessionStatusVO } from '@domain/value-objects/primitives/session-status.vo.js';
import { SessionExpiryVO } from '@domain/value-objects/primitives/session-expiry.vo.js';
import { IpAddressVO } from '@domain/value-objects/primitives/ip-address.vo.js';
import { UserAgentVO } from '@domain/value-objects/primitives/user-agent.vo.js';
import { DeviceIdVO } from '@domain/value-objects/primitives/device-id.vo.js';

import { TEST_IDS, TEST_IP, TEST_USER_AGENT } from './ids.fixture.js';
import { TEST_DATES, TEST_DURATIONS } from './dates.fixture.js';

export interface MakeSessionOptions {
  readonly id?: string;
  readonly authId?: string;
  readonly userId?: string;
  readonly status?: string;
  readonly deviceId?: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly rememberMe?: boolean;
  readonly lastAccessedAt?: string;
  readonly revokedAt?: string;
  readonly revokedReason?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly expiresAtEpoch?: number;
}

export const makeSessionEntity = (options: MakeSessionOptions = {}): SessionEntity => {
  const now = options.createdAt ?? TEST_DATES.NOW;
  return SessionEntity.reconstitute({
    id: options.id ?? TEST_IDS.SESSION_ID,
    createdAt: now,
    updatedAt: options.updatedAt ?? now,
    props: {
      authId: AuthIdVO.create(options.authId ?? TEST_IDS.AUTH_ID),
      userId: UserIdVO.create(options.userId ?? TEST_IDS.USER_ID),
      status: SessionStatusVO.reconstitute(options.status ?? 'active'),
      expiry: SessionExpiryVO.create({
        absoluteExpiresAt: options.expiresAtEpoch ?? TEST_DATES.FUTURE_EXPIRY_EPOCH,
        idleTimeoutSeconds: TEST_DURATIONS.THIRTY_MINUTES,
      }),
      ipAddress: options.ipAddress ? IpAddressVO.create(options.ipAddress) : IpAddressVO.create(TEST_IP),
      userAgent: options.userAgent ? UserAgentVO.create(options.userAgent) : UserAgentVO.create(TEST_USER_AGENT),
      deviceId: options.deviceId ? DeviceIdVO.create(options.deviceId) : undefined,
      rememberMe: options.rememberMe ?? false,
      lastAccessedAt: options.lastAccessedAt ?? now,
      refreshedAt: undefined,
      revokedAt: options.revokedAt,
      revokedReason: options.revokedReason,
    },
  });
};

export const activeSession = (): SessionEntity =>
  makeSessionEntity({ status: 'active' });

export const revokedSession = (): SessionEntity =>
  makeSessionEntity({
    status: 'revoked',
    revokedAt: TEST_DATES.NOW,
    revokedReason: 'logout',
  });

export const expiredSession = (): SessionEntity =>
  makeSessionEntity({
    status: 'expired',
    expiresAtEpoch: TEST_DATES.PAST_EXPIRY_EPOCH,
  });

export const rememberedSession = (): SessionEntity =>
  makeSessionEntity({ rememberMe: true });

export const createNewSession = (options: MakeSessionOptions = {}): SessionEntity => {
  const now = TEST_DATES.NOW;
  return SessionEntity.create({
    id: SessionIdVO.create(options.id ?? TEST_IDS.SESSION_ID),
    props: {
      authId: AuthIdVO.create(options.authId ?? TEST_IDS.AUTH_ID),
      userId: UserIdVO.create(options.userId ?? TEST_IDS.USER_ID),
      expiry: SessionExpiryVO.create({
        absoluteExpiresAt: options.expiresAtEpoch ?? TEST_DATES.FAR_FUTURE_EXPIRY_EPOCH,
        idleTimeoutSeconds: TEST_DURATIONS.THIRTY_MINUTES,
      }),
      ipAddress: options.ipAddress ? IpAddressVO.create(options.ipAddress) : undefined,
      userAgent: options.userAgent ? UserAgentVO.create(options.userAgent) : undefined,
      deviceId: options.deviceId ? DeviceIdVO.create(options.deviceId) : undefined,
      rememberMe: options.rememberMe ?? false,
    },
    now,
  });
};
