/**
 * User domain fixtures
 * @module identity-service/test/fixtures
 */
import { UserEntity } from '@domain/entities/user.entity.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo.js';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo.js';
import { UserStatusVO } from '@domain/value-objects/primitives/user-status.vo.js';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo.js';
import { UserRoleVO } from '@domain/value-objects/primitives/user-role.vo.js';
import { UserPhoneVO } from '@domain/value-objects/primitives/user-phone.vo.js';

import {
  TEST_IDS,
  TEST_EMAIL,
  TEST_PHONE,
  TEST_USERNAME,
  TEST_ROLE_CUSTOMER,
  TEST_ROLE_ADMIN,
} from './ids.fixture.js';
import { TEST_DATES } from './dates.fixture.js';

// ─── VO Builders ────────────────────────────
export const makeUserIdVO = (id: string = TEST_IDS.USER_ID): UserIdVO =>
  UserIdVO.create(id);

export const makeUserEmail = (email: string = TEST_EMAIL): UserEmailVO =>
  UserEmailVO.create(email);

export const makeUserName = (name = 'Test'): UserNameVO =>
  UserNameVO.create(name);

export const makeUserPhone = (phone: string = TEST_PHONE): UserPhoneVO =>
  UserPhoneVO.create(phone);

// ─── UserEntity Builder ─────────────────────
export interface MakeUserOptions {
  readonly id?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly username?: string;
  readonly status?: string;
  readonly type?: string;
  readonly roles?: readonly string[];
  readonly emailVerified?: boolean;
  readonly phoneVerified?: boolean;
  readonly isMfaEnabled?: boolean;
  readonly suspendedAt?: string;
  readonly suspendedReason?: string;
  readonly now?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

export const makeUserEntity = (options: MakeUserOptions = {}): UserEntity => {
  const now = options.now ?? TEST_DATES.NOW;
  const createdAt = options.createdAt ?? now;
  const updatedAt = options.updatedAt ?? now;
  const status = options.status ?? 'active';

  // Invariant: suspendedAt required when status is suspended
  const suspendedAt = status === 'suspended'
    ? (options.suspendedAt ?? now)
    : options.suspendedAt;

  return UserEntity.reconstitute({
    id: options.id ?? TEST_IDS.USER_ID,
    createdAt,
    updatedAt,
    props: {
      email: UserEmailVO.create(options.email ?? TEST_EMAIL),
      phone: options.phone ? UserPhoneVO.create(options.phone) : undefined,
      firstName: UserNameVO.create(options.firstName ?? 'Test'),
      lastName: UserNameVO.create(options.lastName ?? 'User'),
      username: options.username ?? TEST_USERNAME,
      status: UserStatusVO.create(status),
      type: UserTypeVO.create(options.type ?? 'individual'),
      roles: (options.roles ?? [TEST_ROLE_CUSTOMER]).map((r) => UserRoleVO.create(r)),
      emailVerified: options.emailVerified ?? true,
      phoneVerified: options.phoneVerified ?? false,
      isMfaEnabled: options.isMfaEnabled ?? false,
      suspendedAt,
      suspendedReason: options.suspendedReason,
    },
  });
};

// ─── Pre-built user states ──────────────────
export const activeUser = (): UserEntity =>
  makeUserEntity({ status: 'active', emailVerified: true });

export const pendingUser = (): UserEntity =>
  makeUserEntity({ status: 'pending', emailVerified: false, phoneVerified: false });

export const unverifiedUser = (): UserEntity =>
  makeUserEntity({ status: 'unverified', emailVerified: false });

export const inactiveUser = (): UserEntity =>
  makeUserEntity({ status: 'inactive' });

export const suspendedUser = (): UserEntity =>
  makeUserEntity({
    status: 'suspended',
    suspendedAt: TEST_DATES.NOW,
    suspendedReason: 'test_suspension',
  });

export const blockedUser = (): UserEntity =>
  makeUserEntity({ status: 'blocked' });

export const deletedUser = (): UserEntity =>
  makeUserEntity({ status: 'deleted' });

export const adminUser = (): UserEntity =>
  makeUserEntity({
    roles: [TEST_ROLE_ADMIN],
    type: 'admin',
  });

export const mfaEnabledUser = (): UserEntity =>
  makeUserEntity({ isMfaEnabled: true, emailVerified: true });

export const createNewUser = (options: MakeUserOptions = {}): UserEntity => {
  const now = options.now ?? TEST_DATES.NOW;
  return UserEntity.create({
    id: UserIdVO.create(options.id ?? TEST_IDS.USER_ID),
    email: UserEmailVO.create(options.email ?? TEST_EMAIL),
    type: UserTypeVO.create(options.type ?? 'individual'),
    roles: (options.roles ?? [TEST_ROLE_CUSTOMER]).map((r) => UserRoleVO.create(r)),
    firstName: UserNameVO.create(options.firstName ?? 'Test'),
    lastName: UserNameVO.create(options.lastName ?? 'User'),
    username: options.username ?? TEST_USERNAME,
    now,
  });
};
