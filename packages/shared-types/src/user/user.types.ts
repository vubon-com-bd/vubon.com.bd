/**
 * User Core Types
 * @module shared-types/user
 *
 * Base entity + aggregator।
 */

import type { UserId, Email, Phone, PasswordHash } from '../common/primitives/index.js';
import type { BaseEntity } from '../common/base/index.js';
import type { UserStatusValue } from './user-status.types.js';
import type { UserTypeValue } from './user-type.types.js';
import type { UserRoleValue } from './user-role.types.js';
import type { UserProfile } from './user-profile.types.js';
import type { UserSettings } from './user-settings.types.js';
import type { UserPreferences } from './user-preferences.types.js';
import type { UserKyc } from './user-kyc.types.js';

export interface User extends BaseEntity<UserId> {
  readonly email: Email;
  readonly phone?: Phone;
  readonly username?: string;
  readonly status: UserStatusValue;
  readonly type: UserTypeValue;
  readonly roles: readonly UserRoleValue[];
  readonly emailVerified: boolean;
  readonly phoneVerified: boolean;
  readonly isMfaEnabled: boolean;
  readonly lastLoginAt?: string;
  readonly lastActiveAt?: string;

  /** @internal */
  readonly passwordHash?: PasswordHash;

  readonly profile?: UserProfile;
  readonly settings?: UserSettings;
  readonly preferences?: UserPreferences;
  readonly kyc?: UserKyc;
}

export interface UserPublic {
  readonly id: UserId;
  readonly email: Email;
  readonly username?: string;
  readonly status: UserStatusValue;
  readonly type: UserTypeValue;
  readonly roles: readonly UserRoleValue[];
  readonly emailVerified: boolean;
  readonly profile?: UserProfile;
}

export interface UserSummary {
  readonly id: UserId;
  readonly email: Email;
  readonly username?: string;
  readonly displayName?: string;
  readonly avatarUrl?: string;
  readonly status: UserStatusValue;
  readonly type: UserTypeValue;
}

export interface UserCreateInput {
  readonly email: Email;
  readonly phone?: Phone;
  readonly username?: string;
  readonly password: string;
  readonly type: UserTypeValue;
  readonly role?: UserRoleValue;
}

export interface UserUpdateInput {
  readonly username?: string;
  readonly profile?: Partial<UserProfile>;
  readonly settings?: Partial<UserSettings>;
  readonly preferences?: Partial<UserPreferences>;
}

export interface UserListFilter {
  readonly status?: UserStatusValue;
  readonly type?: UserTypeValue;
  readonly role?: UserRoleValue;
  readonly emailVerified?: boolean;
  readonly search?: string;
}
