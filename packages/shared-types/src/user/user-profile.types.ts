/**
 * User Profile Types
 * @module shared-types/user
 *
 * Values আসে shared-constants/user/user-profile.constants থেকে।
 */

import type {
  USER_PROFILE,
  USER_PROFILE_VISIBILITY,
  USER_GENDER,
} from '@vubon/shared-constants/user';
import type { UserId, Url } from '../common/primitives';

export type ProfileVisibilityValue =
  (typeof USER_PROFILE_VISIBILITY)[keyof typeof USER_PROFILE_VISIBILITY];

export type GenderValue = (typeof USER_GENDER)[keyof typeof USER_GENDER];

export type BioMaxLength = typeof USER_PROFILE.BIO_MAX_LENGTH;
export type NameMaxLength = typeof USER_PROFILE.NAME_MAX_LENGTH;

export interface UserProfile {
  readonly userId: UserId;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly displayName?: string;
  readonly bio?: string;
  readonly avatarUrl?: Url;
  readonly coverUrl?: Url;
  readonly gender?: GenderValue;
  readonly dateOfBirth?: string;
  readonly website?: Url;
  readonly company?: string;
  readonly designation?: string;
  readonly visibility: ProfileVisibilityValue;
  readonly updatedAt: string;
}

export interface UserProfilePublic {
  readonly userId: UserId;
  readonly displayName: string;
  readonly avatarUrl?: Url;
  readonly bio?: string;
  readonly company?: string;
  readonly designation?: string;
}
