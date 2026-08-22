/**
 * User Profile Constants
 * Core user profile-related constants
 */

import { USER_PROFILE_STATUS } from './user-profile-status.constants';

export const USER_PROFILE = {
  // Default values
  DEFAULTS: {
    STATUS: USER_PROFILE_STATUS.ACTIVE,
    VISIBILITY: 'public',
    LANGUAGE: 'bn',
    TIMEZONE: 'Asia/Dhaka',
    CURRENCY: 'BDT',
  },

  // Visibility levels
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    CONTACTS_ONLY: 'contacts-only',
    FRIENDS_ONLY: 'friends-only',
    FOLLOWERS_ONLY: 'followers-only',
  },

  // Gender options
  GENDER: {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other',
    PREFER_NOT_TO_SAY: 'prefer-not-to-say',
  },

  // Marital status
  MARITAL_STATUS: {
    SINGLE: 'single',
    MARRIED: 'married',
    DIVORCED: 'divorced',
    WIDOWED: 'widowed',
    SEPARATED: 'separated',
    PREFER_NOT_TO_SAY: 'prefer-not-to-say',
  },

  // Education levels
  EDUCATION: {
    NONE: 'none',
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    HIGHER_SECONDARY: 'higher-secondary',
    BACHELORS: 'bachelors',
    MASTERS: 'masters',
    DOCTORATE: 'doctorate',
    PROFESSIONAL: 'professional',
  },

  // Employment types
  EMPLOYMENT: {
    STUDENT: 'student',
    EMPLOYED: 'employed',
    SELF_EMPLOYED: 'self-employed',
    UNEMPLOYED: 'unemployed',
    RETIRED: 'retired',
    BUSINESS_OWNER: 'business-owner',
    FREELANCER: 'freelancer',
    HOUSEWIFE: 'housewife',
    OTHER: 'other',
  },

  // Profile fields
  FIELDS: {
    ID: 'id',
    USER_ID: 'userId',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    DISPLAY_NAME: 'displayName',
    BIO: 'bio',
    AVATAR: 'avatar',
    COVER_IMAGE: 'coverImage',
    GENDER: 'gender',
    DATE_OF_BIRTH: 'dateOfBirth',
    MARITAL_STATUS: 'maritalStatus',
    EDUCATION: 'education',
    EMPLOYMENT: 'employment',
    OCCUPATION: 'occupation',
    COMPANY: 'company',
    WEBSITE: 'website',
    SOCIAL_LINKS: 'socialLinks',
    INTERESTS: 'interests',
    SKILLS: 'skills',
    LANGUAGES: 'languages',
    STATUS: 'status',
    VISIBILITY: 'visibility',
    VERIFIED: 'verified',
    LAST_ACTIVE: 'lastActive',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
  },

  // Profile completion levels
  COMPLETION_LEVELS: {
    BASIC: 0,
    INTERMEDIATE: 50,
    COMPLETE: 75,
    FULL: 100,
  },

  // Required fields for each level
  REQUIRED_FIELDS: {
    BASIC: ['firstName', 'lastName'] as const,
    INTERMEDIATE: ['firstName', 'lastName', 'email', 'phone'] as const,
    COMPLETE: ['firstName', 'lastName', 'email', 'phone', 'address', 'dateOfBirth'] as const,
    FULL: [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'dateOfBirth',
      'nid',
      'photo',
    ] as const,
  },

  // Social platforms
  SOCIAL_PLATFORMS: {
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    LINKEDIN: 'linkedin',
    YOUTUBE: 'youtube',
    TIKTOK: 'tiktok',
    SNAPCHAT: 'snapchat',
    PINTEREST: 'pinterest',
    REDDIT: 'reddit',
    GITHUB: 'github',
    STACK_OVERFLOW: 'stack-overflow',
    MEDIUM: 'medium',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    DISCORD: 'discord',
    SLACK: 'slack',
  },

  // Profile status messages
  STATUS_MESSAGES: {
    [USER_PROFILE_STATUS.ACTIVE]: 'Profile is active',
    [USER_PROFILE_STATUS.INACTIVE]: 'Profile is inactive',
    [USER_PROFILE_STATUS.PENDING]: 'Profile is pending verification',
    [USER_PROFILE_STATUS.SUSPENDED]: 'Profile is suspended',
    [USER_PROFILE_STATUS.BLOCKED]: 'Profile is blocked',
    [USER_PROFILE_STATUS.DELETED]: 'Profile is deleted',
  },
} as const;

export type ProfileVisibility =
  (typeof USER_PROFILE.VISIBILITY)[keyof typeof USER_PROFILE.VISIBILITY];
export type ProfileGender = (typeof USER_PROFILE.GENDER)[keyof typeof USER_PROFILE.GENDER];
export type ProfileMaritalStatus =
  (typeof USER_PROFILE.MARITAL_STATUS)[keyof typeof USER_PROFILE.MARITAL_STATUS];
export type ProfileEducation = (typeof USER_PROFILE.EDUCATION)[keyof typeof USER_PROFILE.EDUCATION];
export type ProfileEmployment =
  (typeof USER_PROFILE.EMPLOYMENT)[keyof typeof USER_PROFILE.EMPLOYMENT];
export type ProfileCompletionLevel =
  (typeof USER_PROFILE.COMPLETION_LEVELS)[keyof typeof USER_PROFILE.COMPLETION_LEVELS];
export type SocialPlatform =
  (typeof USER_PROFILE.SOCIAL_PLATFORMS)[keyof typeof USER_PROFILE.SOCIAL_PLATFORMS];
export type ProfileField = (typeof USER_PROFILE.FIELDS)[keyof typeof USER_PROFILE.FIELDS];
export type RequiredFieldKey = keyof typeof USER_PROFILE.REQUIRED_FIELDS;

export function getProfileCompletionLevel(filledFields: readonly string[]): ProfileCompletionLevel {
  const totalFields = Object.values(USER_PROFILE.FIELDS).length;
  const filledCount = filledFields.filter((field) =>
    Object.values(USER_PROFILE.FIELDS).includes(field as ProfileField)
  ).length;

  const percentage = (filledCount / totalFields) * 100;

  if (percentage >= USER_PROFILE.COMPLETION_LEVELS.FULL) {
    return USER_PROFILE.COMPLETION_LEVELS.FULL;
  } else if (percentage >= USER_PROFILE.COMPLETION_LEVELS.COMPLETE) {
    return USER_PROFILE.COMPLETION_LEVELS.COMPLETE;
  } else if (percentage >= USER_PROFILE.COMPLETION_LEVELS.INTERMEDIATE) {
    return USER_PROFILE.COMPLETION_LEVELS.INTERMEDIATE;
  }
  return USER_PROFILE.COMPLETION_LEVELS.BASIC;
}

export function getGenderLabel(gender: ProfileGender): string {
  const labels: Record<ProfileGender, string> = {
    [USER_PROFILE.GENDER.MALE]: 'Male',
    [USER_PROFILE.GENDER.FEMALE]: 'Female',
    [USER_PROFILE.GENDER.OTHER]: 'Other',
    [USER_PROFILE.GENDER.PREFER_NOT_TO_SAY]: 'Prefer not to say',
  };
  return labels[gender] || 'Unknown';
}

export function getMaritalStatusLabel(status: ProfileMaritalStatus): string {
  const labels: Record<ProfileMaritalStatus, string> = {
    [USER_PROFILE.MARITAL_STATUS.SINGLE]: 'Single',
    [USER_PROFILE.MARITAL_STATUS.MARRIED]: 'Married',
    [USER_PROFILE.MARITAL_STATUS.DIVORCED]: 'Divorced',
    [USER_PROFILE.MARITAL_STATUS.WIDOWED]: 'Widowed',
    [USER_PROFILE.MARITAL_STATUS.SEPARATED]: 'Separated',
    [USER_PROFILE.MARITAL_STATUS.PREFER_NOT_TO_SAY]: 'Prefer not to say',
  };
  return labels[status] || 'Unknown';
}

export function getEducationLabel(education: ProfileEducation): string {
  const labels: Record<ProfileEducation, string> = {
    [USER_PROFILE.EDUCATION.NONE]: 'No formal education',
    [USER_PROFILE.EDUCATION.PRIMARY]: 'Primary School',
    [USER_PROFILE.EDUCATION.SECONDARY]: 'Secondary School',
    [USER_PROFILE.EDUCATION.HIGHER_SECONDARY]: 'Higher Secondary',
    [USER_PROFILE.EDUCATION.BACHELORS]: "Bachelor's Degree",
    [USER_PROFILE.EDUCATION.MASTERS]: "Master's Degree",
    [USER_PROFILE.EDUCATION.DOCTORATE]: 'Doctorate',
    [USER_PROFILE.EDUCATION.PROFESSIONAL]: 'Professional Degree',
  };
  return labels[education] || 'Unknown';
}

export function getEmploymentLabel(employment: ProfileEmployment): string {
  const labels: Record<ProfileEmployment, string> = {
    [USER_PROFILE.EMPLOYMENT.STUDENT]: 'Student',
    [USER_PROFILE.EMPLOYMENT.EMPLOYED]: 'Employed',
    [USER_PROFILE.EMPLOYMENT.SELF_EMPLOYED]: 'Self-employed',
    [USER_PROFILE.EMPLOYMENT.UNEMPLOYED]: 'Unemployed',
    [USER_PROFILE.EMPLOYMENT.RETIRED]: 'Retired',
    [USER_PROFILE.EMPLOYMENT.BUSINESS_OWNER]: 'Business Owner',
    [USER_PROFILE.EMPLOYMENT.FREELANCER]: 'Freelancer',
    [USER_PROFILE.EMPLOYMENT.HOUSEWIFE]: 'Housewife',
    [USER_PROFILE.EMPLOYMENT.OTHER]: 'Other',
  };
  return labels[employment] || 'Unknown';
}

export function getSocialPlatformLabel(platform: SocialPlatform): string {
  const labels: Record<SocialPlatform, string> = {
    [USER_PROFILE.SOCIAL_PLATFORMS.FACEBOOK]: 'Facebook',
    [USER_PROFILE.SOCIAL_PLATFORMS.TWITTER]: 'Twitter',
    [USER_PROFILE.SOCIAL_PLATFORMS.INSTAGRAM]: 'Instagram',
    [USER_PROFILE.SOCIAL_PLATFORMS.LINKEDIN]: 'LinkedIn',
    [USER_PROFILE.SOCIAL_PLATFORMS.YOUTUBE]: 'YouTube',
    [USER_PROFILE.SOCIAL_PLATFORMS.TIKTOK]: 'TikTok',
    [USER_PROFILE.SOCIAL_PLATFORMS.SNAPCHAT]: 'Snapchat',
    [USER_PROFILE.SOCIAL_PLATFORMS.PINTEREST]: 'Pinterest',
    [USER_PROFILE.SOCIAL_PLATFORMS.REDDIT]: 'Reddit',
    [USER_PROFILE.SOCIAL_PLATFORMS.GITHUB]: 'GitHub',
    [USER_PROFILE.SOCIAL_PLATFORMS.STACK_OVERFLOW]: 'Stack Overflow',
    [USER_PROFILE.SOCIAL_PLATFORMS.MEDIUM]: 'Medium',
    [USER_PROFILE.SOCIAL_PLATFORMS.WHATSAPP]: 'WhatsApp',
    [USER_PROFILE.SOCIAL_PLATFORMS.TELEGRAM]: 'Telegram',
    [USER_PROFILE.SOCIAL_PLATFORMS.DISCORD]: 'Discord',
    [USER_PROFILE.SOCIAL_PLATFORMS.SLACK]: 'Slack',
  };
  return labels[platform] || 'Unknown';
}

export function isProfileComplete(completionLevel: ProfileCompletionLevel): boolean {
  return completionLevel >= USER_PROFILE.COMPLETION_LEVELS.COMPLETE;
}

export function getMissingRequiredFields(
  filledFields: readonly string[],
  requiredLevel: ProfileCompletionLevel
): readonly string[] {
  const levelMap: Record<ProfileCompletionLevel, RequiredFieldKey> = {
    [USER_PROFILE.COMPLETION_LEVELS.BASIC]: 'BASIC',
    [USER_PROFILE.COMPLETION_LEVELS.INTERMEDIATE]: 'INTERMEDIATE',
    [USER_PROFILE.COMPLETION_LEVELS.COMPLETE]: 'COMPLETE',
    [USER_PROFILE.COMPLETION_LEVELS.FULL]: 'FULL',
  };

  const levelKey = levelMap[requiredLevel];
  const requiredFields = USER_PROFILE.REQUIRED_FIELDS[levelKey] || [];
  const fieldSet = new Set(filledFields);

  return requiredFields.filter((field) => !fieldSet.has(field));
}

export function getProfileStatusMessage(status: string): string {
  return (
    USER_PROFILE.STATUS_MESSAGES[status as keyof typeof USER_PROFILE.STATUS_MESSAGES] ||
    'Unknown status'
  );
}

export function isProfileActive(status: string): boolean {
  return status === USER_PROFILE_STATUS.ACTIVE;
}

export function isProfileVisible(visibility: ProfileVisibility): boolean {
  return visibility === USER_PROFILE.VISIBILITY.PUBLIC;
}
