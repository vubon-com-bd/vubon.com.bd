import { BaseEntity } from '../common/base.types';
import { Email } from '../common/email.types';
import { PhoneNumber } from '../common/phone.types';
import { Address } from '../common/address.types';
import { Name } from '../common/name.types';
import { USER_STATUS } from '@vubon/shared-constants/src/user/user-status.constants';
import { USER_TYPES } from '@vubon/shared-constants/src/user/user-type.constants';
import { USER_ROLES } from '@vubon/shared-constants/src/user/user-role.constants';
import { USER_PERMISSIONS } from '@vubon/shared-constants/src/user/user-permission.constants';
import { Auth } from '../auth/auth.types';

/**
 * Social links interface
 */
export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}

/**
 * User metadata interface
 */
export interface UserMetadata {
  avatar?: string;
  bio?: string;
  website?: string;
  socialLinks?: SocialLinks;
  preferences?: Record<string, unknown>;
}

/**
 * User interface
 */
export interface User extends BaseEntity {
  userId: string;
  email: Email;
  phone?: PhoneNumber;
  name: Name;
  address?: Address;
  status: keyof typeof USER_STATUS | string;
  type: keyof typeof USER_TYPES | string;
  role: keyof typeof USER_ROLES | string;
  permissions: (keyof typeof USER_PERMISSIONS | string)[];
  auth: Auth;
  isVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  registeredAt: Date;
  metadata: UserMetadata;
}
