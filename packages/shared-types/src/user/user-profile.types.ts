/**
 * User Profile Types
 * ইউজার প্রোফাইল সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { USER_PROFILE } from '@vubon/shared-constants';
import { User } from '../common/user';

export interface UserProfile extends BaseEntity {
  userId: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  dateOfBirth?: Date;
  gender?: (typeof USER_PROFILE.GENDER)[keyof typeof USER_PROFILE.GENDER];
  relationship?: (typeof USER_PROFILE.RELATIONSHIP)[keyof typeof USER_PROFILE.RELATIONSHIP];
  bio?: string;
  avatar?: string;
  cover?: string;
  location?: string;
  website?: string;
  company?: string;
  position?: string;
  education?: (typeof USER_PROFILE.EDUCATION)[keyof typeof USER_PROFILE.EDUCATION];
  employment?: (typeof USER_PROFILE.EMPLOYMENT)[keyof typeof USER_PROFILE.EMPLOYMENT];
  visibility: (typeof USER_PROFILE.VISIBILITY)[keyof typeof USER_PROFILE.VISIBILITY];
  metadata?: Record<string, unknown>;
}

export interface UserProfileCreateInput {
  userId: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  dateOfBirth?: Date;
  gender?: (typeof USER_PROFILE.GENDER)[keyof typeof USER_PROFILE.GENDER];
  relationship?: (typeof USER_PROFILE.RELATIONSHIP)[keyof typeof USER_PROFILE.RELATIONSHIP];
  bio?: string;
  avatar?: string;
  cover?: string;
  location?: string;
  website?: string;
  company?: string;
  position?: string;
  education?: (typeof USER_PROFILE.EDUCATION)[keyof typeof USER_PROFILE.EDUCATION];
  employment?: (typeof USER_PROFILE.EMPLOYMENT)[keyof typeof USER_PROFILE.EMPLOYMENT];
  visibility?: (typeof USER_PROFILE.VISIBILITY)[keyof typeof USER_PROFILE.VISIBILITY];
  metadata?: Record<string, unknown>;
}

// empty interface সরিয়ে type alias ব্যবহার
export type UserProfileUpdateInput = Partial<UserProfileCreateInput>;

export interface UserProfileWithUser extends UserProfile {
  user: User;
}
