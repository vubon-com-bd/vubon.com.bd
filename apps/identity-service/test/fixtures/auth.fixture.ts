/**
 * Auth domain fixtures — builders for test entities/VOs
 * @module identity-service/test/fixtures
 */
import { AuthEntity } from '@domain/entities/auth.entity.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { AuthTypeVO } from '@domain/value-objects/primitives/auth-type.vo.js';
import { AuthStatusVO } from '@domain/value-objects/primitives/auth-status.vo.js';
import { AuthProviderVO } from '@domain/value-objects/primitives/auth-provider.vo.js';
import { AuthMethodVO } from '@domain/value-objects/primitives/auth-method.vo.js';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { IpAddressVO } from '@domain/value-objects/primitives/ip-address.vo.js';

import { TEST_IDS, TEST_EMAIL, TEST_IP, TEST_USER_ID } from './ids.fixture.js';
import { TEST_DATES } from './dates.fixture.js';

// ─── VO Builders ────────────────────────────
export const makeAuthId = (id: string = TEST_IDS.AUTH_ID): AuthIdVO =>
  AuthIdVO.create(id);

export const makeUserId = (id: string = TEST_IDS.USER_ID): UserIdVO =>
  UserIdVO.create(id);

export const makeIdentifierEmail = (email: string = TEST_EMAIL): IdentifierVO =>
  IdentifierVO.email(email);

export const makeIpAddress = (ip: string = TEST_IP): IpAddressVO =>
  IpAddressVO.create(ip);

// ─── AuthEntity Builder ─────────────────────
export interface MakeAuthOptions {
  readonly id?: string;
  readonly userId?: string;
  readonly type?: string;
  readonly provider?: string;
  readonly method?: string;
  readonly status?: string;
  readonly identifier?: string;
  readonly isEmailVerified?: boolean;
  readonly isPhoneVerified?: boolean;
  readonly isMfaEnabled?: boolean;
  readonly failedAttempts?: number;
  readonly lockedUntil?: string;
  readonly now?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

export const makeAuthEntity = (options: MakeAuthOptions = {}): AuthEntity => {
  const now = options.now ?? TEST_DATES.NOW;
  const createdAt = options.createdAt ?? now;
  const updatedAt = options.updatedAt ?? now;

  return AuthEntity.reconstitute({
    id: options.id ?? TEST_IDS.AUTH_ID,
    createdAt,
    updatedAt,
    props: {
      userId: UserIdVO.create(options.userId ?? TEST_IDS.USER_ID),
      type: AuthTypeVO.reconstitute(options.type ?? 'password'),
      provider: AuthProviderVO.reconstitute(options.provider ?? 'local'),
      method: AuthMethodVO.reconstitute(options.method ?? 'email_password'),
      status: AuthStatusVO.reconstitute(options.status ?? 'active'),
      identifier: IdentifierVO.email(options.identifier ?? TEST_EMAIL),
      isEmailVerified: options.isEmailVerified ?? true,
      isPhoneVerified: options.isPhoneVerified ?? false,
      isMfaEnabled: options.isMfaEnabled ?? false,
      failedAttempts: options.failedAttempts ?? 0,
      lastLoginAt: undefined,
      lastLoginIp: undefined,
      lockedUntil: options.lockedUntil,
      revokedAt: undefined,
      revokedReason: undefined,
      metadata: undefined,
    },
  });
};

// ─── Pre-built instances ────────────────────
export const activeLocalAuth = (): AuthEntity =>
  makeAuthEntity({ status: 'active', provider: 'local', type: 'password' });

export const pendingAuth = (): AuthEntity =>
  makeAuthEntity({ status: 'pending', isEmailVerified: false });

export const lockedAuth = (): AuthEntity =>
  makeAuthEntity({
    status: 'locked',
    lockedUntil: TEST_DATES.FUTURE_EXPIRY,
    failedAttempts: 5,
  });

export const mfaEnabledAuth = (): AuthEntity =>
  makeAuthEntity({ isMfaEnabled: true, isEmailVerified: true });

export const revokedAuth = (): AuthEntity =>
  makeAuthEntity({ status: 'revoked' });

export const googleAuth = (): AuthEntity =>
  makeAuthEntity({ provider: 'google', type: 'social', method: 'social_login' });

// ─── Create (not reconstitute) ─────────────
export interface CreateAuthOptions {
  readonly id?: string;
  readonly userId?: string;
  readonly type?: string;
  readonly provider?: string;
  readonly method?: string;
  readonly identifier?: string;
  readonly now?: string;
}

export const createNewAuth = (options: CreateAuthOptions = {}): AuthEntity => {
  const now = options.now ?? TEST_DATES.NOW;
  return AuthEntity.create({
    id: AuthIdVO.create(options.id ?? TEST_IDS.AUTH_ID),
    props: {
      userId: UserIdVO.create(options.userId ?? TEST_IDS.USER_ID),
      type: AuthTypeVO.reconstitute(options.type ?? 'password'),
      provider: AuthProviderVO.reconstitute(options.provider ?? 'local'),
      method: AuthMethodVO.reconstitute(options.method ?? 'email_password'),
      identifier: IdentifierVO.email(options.identifier ?? TEST_EMAIL),
      metadata: undefined,
    },
    now,
  });
};
