/**
 * User Contact Types
 * ইউজার কন্টাক্ট সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { USER_CONTACT } from '@vubon/shared-constants';

export interface UserContact extends BaseEntity {
  userId: string;
  type: (typeof USER_CONTACT.TYPES)[keyof typeof USER_CONTACT.TYPES];
  value: string;
  label?: string;
  isPrimary: boolean;
  isVerified: boolean;
  visibility: (typeof USER_CONTACT.VISIBILITY)[keyof typeof USER_CONTACT.VISIBILITY];
  metadata?: Record<string, unknown>;
}

export interface UserContactSocial extends UserContact {
  platform: (typeof USER_CONTACT.SOCIAL_PLATFORMS)[keyof typeof USER_CONTACT.SOCIAL_PLATFORMS];
  profileUrl?: string;
  username?: string;
  followers?: number;
  following?: number;
}

export interface UserContactCreateInput {
  userId: string;
  type: (typeof USER_CONTACT.TYPES)[keyof typeof USER_CONTACT.TYPES];
  value: string;
  label?: string;
  isPrimary?: boolean;
  isVerified?: boolean;
  visibility?: (typeof USER_CONTACT.VISIBILITY)[keyof typeof USER_CONTACT.VISIBILITY];
  metadata?: Record<string, unknown>;
}

// empty interface সরিয়ে type alias ব্যবহার
export type UserContactUpdateInput = Partial<UserContactCreateInput>;
