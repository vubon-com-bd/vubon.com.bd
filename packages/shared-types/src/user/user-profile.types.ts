import { Name } from '../common/name.types';
import { Address } from '../common/address.types';
import { Email } from '../common/email.types';
import { PhoneNumber } from '../common/phone.types';
import { USER_PROFILE } from '@vubon/shared-constants';
import { SocialLinks } from './user.types';

export interface UserProfile {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  profileId: string;
  userId: string;
  name: Name;
  email?: Email; // নতুন
  phone?: PhoneNumber; // নতুন
  address?: Address;
  avatar?: string;
  bio?: string;
  website?: string;
  socialLinks: SocialLinks;
  visibility: keyof typeof USER_PROFILE;
  metadata: Record<string, unknown>;
}
