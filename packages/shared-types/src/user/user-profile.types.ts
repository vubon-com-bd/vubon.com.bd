import { BaseEntity } from '../common/base.types';
import { Name } from '../common/name.types';
import { Address } from '../common/address.types';
import { USER_PROFILE } from '@vubon/shared-constants/src/user/user-profile.constants';
import { SocialLinks } from './user.types';

/**
 * User profile interface
 */
export interface UserProfile extends BaseEntity {
  profileId: string;
  userId: string;
  name: Name;
  address?: Address;
  avatar?: string;
  bio?: string;
  website?: string;
  socialLinks: SocialLinks;
  visibility: keyof typeof USER_PROFILE;
  metadata: Record<string, unknown>;
}
