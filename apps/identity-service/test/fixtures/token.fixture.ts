/**
 * Token fixtures
 * @module identity-service/test/fixtures
 */
import { TokenEntity } from '@domain/entities/token.entity.js';
import { TokenIdVO } from '@domain/value-objects/primitives/token-id.vo.js';
import { TokenTypeVO } from '@domain/value-objects/primitives/token-type.vo.js';
import { TokenValueVO } from '@domain/value-objects/primitives/token-value.vo.js';
import { TokenExpiryVO } from '@domain/value-objects/primitives/token-expiry.vo.js';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';

import { TEST_IDS, TEST_ACCESS_TOKEN, TEST_REFRESH_TOKEN } from './ids.fixture.js';
import { TEST_DATES } from './dates.fixture.js';

export interface MakeTokenOptions {
  readonly id?: string;
  readonly userId?: string;
  readonly sessionId?: string;
  readonly type?: string;
  readonly value?: string;
  readonly jti?: string;
  readonly expiresAtEpoch?: number;
  readonly usedAt?: string;
  readonly revokedAt?: string;
  readonly revokedReason?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

export const makeTokenEntity = (options: MakeTokenOptions = {}): TokenEntity => {
  const now = options.createdAt ?? TEST_DATES.NOW;
  return TokenEntity.reconstitute({
    id: options.id ?? TEST_IDS.TOKEN_ID,
    createdAt: now,
    updatedAt: options.updatedAt ?? now,
    props: {
      userId: UserIdVO.create(options.userId ?? TEST_IDS.USER_ID),
      sessionId: SessionIdVO.create(options.sessionId ?? TEST_IDS.SESSION_ID),
      type: TokenTypeVO.reconstitute(options.type ?? 'access'),
      value: TokenValueVO.reconstitute(options.value ?? TEST_ACCESS_TOKEN),
      expiry: TokenExpiryVO.fromEpochSeconds(
        options.expiresAtEpoch ?? TEST_DATES.FUTURE_EXPIRY_EPOCH,
      ),
      jti: options.jti ?? TEST_IDS.JTI,
      usedAt: options.usedAt,
      revokedAt: options.revokedAt,
      revokedReason: options.revokedReason,
    },
  });
};

export const activeAccessToken = (): TokenEntity =>
  makeTokenEntity({ type: 'access' });

export const activeRefreshToken = (): TokenEntity =>
  makeTokenEntity({
    id: TEST_IDS.TOKEN_ID_2,
    type: 'refresh',
    value: TEST_REFRESH_TOKEN,
    jti: 'jti-refresh-1234567890',
  });

export const usedToken = (): TokenEntity =>
  makeTokenEntity({ usedAt: TEST_DATES.NOW });

export const revokedToken = (): TokenEntity =>
  makeTokenEntity({
    revokedAt: TEST_DATES.NOW,
    revokedReason: 'logout',
  });

export const expiredToken = (): TokenEntity =>
  makeTokenEntity({ expiresAtEpoch: TEST_DATES.PAST_EXPIRY_EPOCH });

export const createNewToken = (options: MakeTokenOptions = {}): TokenEntity => {
  const now = TEST_DATES.NOW;
  return TokenEntity.create({
    id: TokenIdVO.create(options.id ?? TEST_IDS.TOKEN_ID),
    props: {
      userId: UserIdVO.create(options.userId ?? TEST_IDS.USER_ID),
      sessionId: SessionIdVO.create(options.sessionId ?? TEST_IDS.SESSION_ID),
      type: TokenTypeVO.reconstitute(options.type ?? 'access'),
      value: TokenValueVO.reconstitute(options.value ?? TEST_ACCESS_TOKEN),
      expiry: TokenExpiryVO.fromEpochSeconds(
        options.expiresAtEpoch ?? TEST_DATES.FAR_FUTURE_EXPIRY_EPOCH,
      ),
      jti: options.jti ?? TEST_IDS.JTI,
    },
    now,
  });
};
