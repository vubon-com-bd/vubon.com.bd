/**
 * Login Attempt fixtures
 * @module identity-service/test/fixtures
 */
import { LoginAttemptEntity } from '@domain/entities/login-attempt.entity.js';
import { AuthIdVO } from '@domain/value-objects/primitives/auth-id.vo.js';
import { LoginAttemptStatusVO } from '@domain/value-objects/primitives/login-attempt-status.vo.js';
import { IdentifierVO } from '@domain/value-objects/primitives/identifier.vo.js';
import { IpAddressVO } from '@domain/value-objects/primitives/ip-address.vo.js';
import { UserAgentVO } from '@domain/value-objects/primitives/user-agent.vo.js';

import { TEST_IDS, TEST_EMAIL, TEST_IP, TEST_USER_AGENT } from './ids.fixture.js';
import { TEST_DATES } from './dates.fixture.js';

export interface MakeLoginAttemptOptions {
  readonly id?: string;
  readonly authId?: string | null;
  readonly identifier?: string;
  readonly status?: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly failureReason?: string;
  readonly attemptedAt?: string;
}

export const makeLoginAttemptEntity = (
  options: MakeLoginAttemptOptions = {},
): LoginAttemptEntity => {
  const attemptedAt = options.attemptedAt ?? TEST_DATES.NOW;
  // null = explicitly no authId; undefined = use default
  const authIdValue = options.authId === null
    ? undefined
    : options.authId ?? TEST_IDS.AUTH_ID;

  return LoginAttemptEntity.reconstitute({
    id: options.id ?? TEST_IDS.LOGIN_ATTEMPT_ID,
    createdAt: attemptedAt,
    updatedAt: attemptedAt,
    props: {
      authId: authIdValue ? AuthIdVO.create(authIdValue) : undefined,
      identifier: IdentifierVO.email(options.identifier ?? TEST_EMAIL),
      status: LoginAttemptStatusVO.reconstitute(options.status ?? 'failed'),
      ipAddress: IpAddressVO.create(options.ipAddress ?? TEST_IP),
      userAgent: UserAgentVO.create(options.userAgent ?? TEST_USER_AGENT),
      failureReason: options.failureReason ?? 'invalid_password',
      attemptedAt,
    },
  });
};

export const successAttempt = (): LoginAttemptEntity =>
  makeLoginAttemptEntity({ status: 'success', failureReason: undefined });

export const failedAttempt = (): LoginAttemptEntity =>
  makeLoginAttemptEntity({ status: 'failed', failureReason: 'invalid_password' });

export const lockedAttempt = (): LoginAttemptEntity =>
  makeLoginAttemptEntity({ status: 'locked', failureReason: 'too_many_attempts' });

export const createNewLoginAttempt = (
  options: MakeLoginAttemptOptions = {},
): LoginAttemptEntity => {
  const authIdValue = options.authId === null
    ? undefined
    : options.authId ?? TEST_IDS.AUTH_ID;

  return LoginAttemptEntity.create({
    id: options.id ?? TEST_IDS.LOGIN_ATTEMPT_ID,
    props: {
      authId: authIdValue ? AuthIdVO.create(authIdValue) : undefined,
      identifier: IdentifierVO.email(options.identifier ?? TEST_EMAIL),
      status: LoginAttemptStatusVO.reconstitute(options.status ?? 'failed'),
      ipAddress: IpAddressVO.create(options.ipAddress ?? TEST_IP),
      userAgent: UserAgentVO.create(options.userAgent ?? TEST_USER_AGENT),
      failureReason: options.failureReason ?? 'invalid_password',
      attemptedAt: options.attemptedAt ?? TEST_DATES.NOW,
    },
    now: TEST_DATES.NOW,
  });
};
