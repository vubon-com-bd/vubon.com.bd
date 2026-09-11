import { BaseEntity } from '../common/base.types';
import { Email } from '../common/email.types';
import { PhoneNumber } from '../common/phone.types';
import { Address } from '../common/address.types';
import { Name } from '../common/name.types';
import { USER_STATUS } from '@vubon/shared-constants/src/user/user-status.constants';
import { USER_TYPES } from '@vubon/shared-constants/src/user/user-type.constants';
import { USER_ROLES } from '@vubon/shared-constants/src/user/user-role.constants';
import { USER_PERMISSIONS } from '@vubon/shared-constants/src/user/user-permission.constants';
import { Auth, AuthPublic } from '../auth/auth.types';

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
 * User status and type values (unique to user.types)
 */
export type UserStatusValue = (typeof USER_STATUS)[keyof typeof USER_STATUS];
export type UserTypeValue = (typeof USER_TYPES)[keyof typeof USER_TYPES];

/**
 * User interface (internal)
 */
export interface User extends Omit<BaseEntity, 'status'> {
  userId: string;
  email: Email;
  phone?: PhoneNumber;
  name: Name;
  address?: Address;
  status: UserStatusValue;
  type: UserTypeValue;
  role: (typeof USER_ROLES)[keyof typeof USER_ROLES];
  permissions: Array<(typeof USER_PERMISSIONS)[keyof typeof USER_PERMISSIONS]>;
  /** @internal */
  auth: Auth;
  isVerified: boolean;
  isActive: boolean;
  lastLoginAt?: Date;
  registeredAt: Date;
  metadata: UserMetadata;
}

/**
 * Public-safe User DTO
 */
export type UserPublic = Omit<User, 'auth' | 'metadata'> & {
  auth?: AuthPublic;
  metadata?: Omit<UserMetadata, 'preferences'>;
};
