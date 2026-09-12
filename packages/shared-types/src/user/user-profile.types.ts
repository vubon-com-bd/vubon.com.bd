import { BaseEntity } from '../common/base.types';
import { AddressData } from '../common/address.types';
import { NameData } from '../common/name.types';
import { USER_PROFILE } from '@vubon/shared-constants/src/user/user-profile.constants';
import { SocialLinks } from './user.types';

/**
 * User profile visibility value
 */
export type UserProfileVisibility = (typeof USER_PROFILE)[keyof typeof USER_PROFILE];

/**
 * User profile interface
 * Note: name/address stored as plain data for serialization.
 */
export interface UserProfile extends BaseEntity {
  profileId: string;
  userId: string;
  name: NameData;
  address?: AddressData;
  avatar?: string;
  bio?: string;
  website?: string;
  socialLinks: SocialLinks;
  visibility: UserProfileVisibility;
  metadata: Record<string, unknown>;
}
