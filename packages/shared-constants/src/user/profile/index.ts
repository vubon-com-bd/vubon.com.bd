/**
 * User Profile Constants Index
 * Export all user profile-related constants and types
 */

// Core Profile Constants
export {
  USER_PROFILE,
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
} from './user-profile.constants';

export type {
  ProfileVisibility,
  ProfileGender,
  ProfileMaritalStatus,
  ProfileEducation,
  ProfileEmployment,
  ProfileCompletionLevel,
  SocialPlatform,
} from './user-profile.constants';

// Profile Status Constants
export {
  USER_PROFILE_STATUS,
  USER_PROFILE_STATUS_LABELS,
  USER_PROFILE_STATUS_COLORS,
  ACTIVE_PROFILE_STATUSES,
  INACTIVE_PROFILE_STATUSES,
  RESTRICTED_PROFILE_STATUSES,
  VERIFICATION_REQUIRED_PROFILE_STATUSES,
  isProfileActive as isProfileStatusActive,
  isProfileRestricted,
  isProfileVisible as isProfileStatusVisible,
  getProfileStatusLabel,
  getProfileStatusColor,
} from './user-profile-status.constants';

export type { UserProfileStatus } from './user-profile-status.constants';
