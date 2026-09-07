import { Email } from '../common/email.types';
import { PhoneNumber } from '../common/phone.types';
import { Address } from '../common/address.types';
import { Name } from '../common/name.types';
import { USER_STATUS } from '@vubon/shared-constants';
import { USER_TYPES } from '@vubon/shared-constants';
import { USER_ROLES } from '@vubon/shared-constants';
import { USER_PERMISSIONS } from '@vubon/shared-constants';
import { Auth } from '../auth/auth.types';

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}

export interface UserMetadata {
  avatar?: string;
  bio?: string;
  website?: string;
  socialLinks?: SocialLinks;
  preferences?: Record<string, unknown>;
}

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  userId: string;
  email: Email;
  phone?: PhoneNumber;
  name: Name;
  address?: Address;
  status: keyof typeof USER_STATUS;
  type: keyof typeof USER_TYPES;
  role: keyof typeof USER_ROLES;
  permissions: (keyof typeof USER_PERMISSIONS)[];
  auth: Auth;
  isVerified: boolean;
  lastLoginAt?: Date;
  registeredAt: Date;
  metadata: UserMetadata;
}
