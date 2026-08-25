/**
 * User Profile Types
 * Type definitions for user profile based on shared-constants
 * @module UserProfileTypes
 */

import {
  BaseEntity,
  Timestamp,
  Metadata,
  ID,
  FullName,
  Email,
  PhoneNumber,
  Address as BaseAddress,
} from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants user profile
// ============================================================
import {
  // Core Profile Constants
  USER_PROFILE,
  ProfileVisibility,
  ProfileGender,
  ProfileMaritalStatus,
  ProfileEducation,
  ProfileEmployment,
  ProfileCompletionLevel,
  SocialPlatform,
  getProfileCompletionLevel,
  getGenderLabel,
  getMaritalStatusLabel,
  getEducationLabel,
  getEmploymentLabel,
  getSocialPlatformLabel,
  isProfileComplete,
  getMissingRequiredFields,
  getProfileStatusMessage,
  isProfileActive,
  isProfileVisible,
  // Profile Status Constants
  USER_PROFILE_STATUS,
  USER_PROFILE_STATUS_LABELS,
  USER_PROFILE_STATUS_COLORS,
  ACTIVE_PROFILE_STATUSES,
  INACTIVE_PROFILE_STATUSES,
  RESTRICTED_PROFILE_STATUSES,
  VERIFICATION_REQUIRED_PROFILE_STATUSES,
  UserProfileStatus,
  isProfileStatusActive,
  isProfileRestricted,
  isProfileStatusVisible,
  getProfileStatusLabel,
  getProfileStatusColor,
} from '@vubon/shared-constants';

// ============================================================
// User Profile Extended Types
// ============================================================

/**
 * User profile with additional metadata
 */
export interface UserProfileExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  fullName: FullName;
  firstName: string;
  lastName: string;
  displayName?: string;
  email: Email;
  phone?: PhoneNumber;
  avatar?: string;
  banner?: string;
  bio?: string;
  headline?: string;
  status: UserProfileStatus;
  visibility: ProfileVisibility;
  gender?: ProfileGender;
  maritalStatus?: ProfileMaritalStatus;
  education?: ProfileEducation;
  employment?: ProfileEmployment;
  birthDate?: Date;
  location?: string;
  address?: BaseAddress;
  socialProfiles: UserProfileSocialProfile[];
  completionLevel: ProfileCompletionLevel;
  isComplete: boolean;
  isActive: boolean;
  isVisible: boolean;
  isRestricted: boolean;
  missingFields: string[];
  metadata?: Metadata;
}

/**
 * User profile social profile
 */
export interface UserProfileSocialProfile {
  platform: SocialPlatform;
  url: string;
  username?: string;
  isVerified: boolean;
  isPublic: boolean;
}

/**
 * User profile statistics
 */
export interface UserProfileStatistics {
  userId: ID;
  totalViews: number;
  totalUpdates: number;
  completionLevel: ProfileCompletionLevel;
  visibleFields: number;
  totalFields: number;
  lastUpdateAt?: Date;
  profileAgeDays: number;
}

/**
 * User profile update
 */
export interface UserProfileUpdate extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  field: string;
  oldValue: unknown;
  newValue: unknown;
  updatedBy: ID;
  reason?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * User profile verification
 */
export interface UserProfileVerification extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  field: 'email' | 'phone' | 'address' | 'identity';
  status: 'pending' | 'verified' | 'rejected' | 'expired';
  verifiedAt?: Date;
  expiresAt?: Date;
  verifiedBy?: ID;
  metadata?: Metadata;
}

/**
 * User profile export
 */
export interface UserProfileExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'vcard';
  includeFields: string[];
  excludeFields: string[];
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Profile Constants
  USER_PROFILE,
  ProfileVisibility,
  ProfileGender,
  ProfileMaritalStatus,
  ProfileEducation,
  ProfileEmployment,
  ProfileCompletionLevel,
  SocialPlatform,
  getProfileCompletionLevel,
  getGenderLabel,
  getMaritalStatusLabel,
  getEducationLabel,
  getEmploymentLabel,
  getSocialPlatformLabel,
  isProfileComplete,
  getMissingRequiredFields,
  getProfileStatusMessage,
  isProfileActive,
  isProfileVisible,
  // Profile Status Constants
  USER_PROFILE_STATUS,
  USER_PROFILE_STATUS_LABELS,
  USER_PROFILE_STATUS_COLORS,
  ACTIVE_PROFILE_STATUSES,
  INACTIVE_PROFILE_STATUSES,
  RESTRICTED_PROFILE_STATUSES,
  VERIFICATION_REQUIRED_PROFILE_STATUSES,
  UserProfileStatus,
  isProfileStatusActive,
  isProfileRestricted,
  isProfileStatusVisible,
  getProfileStatusLabel,
  getProfileStatusColor,
};
