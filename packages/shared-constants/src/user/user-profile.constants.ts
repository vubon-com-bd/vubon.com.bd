/**
 * User Profile Constants
 * All possible user profile-related constants in the system
 * Imports common values where applicable
 */

import { STATUS } from '../common/status.constants';

/**
 * User profile visibility types
 * Defines who can see the user profile
 */
export const USER_PROFILE_VISIBILITY = {
  /** Profile is public and visible to everyone */
  PUBLIC: 'public',
  /** Profile is visible only to logged-in users */
  REGISTERED_ONLY: 'registered_only',
  /** Profile is visible only to connections/friends */
  CONNECTIONS_ONLY: 'connections_only',
  /** Profile is private and visible only to the user */
  PRIVATE: 'private',
  /** Profile is visible only to admins */
  ADMIN_ONLY: 'admin_only',
} as const;

/**
 * User profile section types
 * Defines the sections of a user profile
 */
export const USER_PROFILE_SECTION = {
  /** Basic information section */
  BASIC_INFO: 'basic_info',
  /** Contact information section */
  CONTACT_INFO: 'contact_info',
  /** Address information section */
  ADDRESS_INFO: 'address_info',
  /** Professional information section */
  PROFESSIONAL_INFO: 'professional_info',
  /** Educational information section */
  EDUCATIONAL_INFO: 'educational_info',
  /** Social media links section */
  SOCIAL_LINKS: 'social_links',
  /** About/Bio section */
  ABOUT: 'about',
  /** Profile picture section */
  PROFILE_PICTURE: 'profile_picture',
  /** Cover photo section */
  COVER_PHOTO: 'cover_photo',
  /** Skills section */
  SKILLS: 'skills',
  /** Interests section */
  INTERESTS: 'interests',
  /** Achievements section */
  ACHIEVEMENTS: 'achievements',
  /** Work experience section */
  WORK_EXPERIENCE: 'work_experience',
  /** Certificates section */
  CERTIFICATES: 'certificates',
  /** Languages section */
  LANGUAGES: 'languages',
  /** Settings section */
  SETTINGS: 'settings',
  /** Privacy section */
  PRIVACY: 'privacy',
} as const;

/**
 * User profile section visibility
 * Defines visibility per section
 */
export const USER_PROFILE_SECTION_VISIBILITY = {
  /** Section is visible to everyone */
  PUBLIC: 'public',
  /** Section is visible only to registered users */
  REGISTERED_ONLY: 'registered_only',
  /** Section is visible only to connections */
  CONNECTIONS_ONLY: 'connections_only',
  /** Section is private */
  PRIVATE: 'private',
} as const;

/**
 * User gender types
 */
export const USER_GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
  PREFER_NOT_TO_SAY: 'prefer_not_to_say',
} as const;

/**
 * User marital status types
 */
export const USER_MARITAL_STATUS = {
  SINGLE: 'single',
  MARRIED: 'married',
  DIVORCED: 'divorced',
  WIDOWED: 'widowed',
  SEPARATED: 'separated',
  PREFER_NOT_TO_SAY: 'prefer_not_to_say',
} as const;

/**
 * User education level types
 */
export const USER_EDUCATION_LEVEL = {
  NO_FORMAL: 'no_formal',
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  HIGH_SCHOOL: 'high_school',
  COLLEGE: 'college',
  BACHELORS: 'bachelors',
  MASTERS: 'masters',
  DOCTORATE: 'doctorate',
  PROFESSIONAL: 'professional',
  OTHER: 'other',
} as const;

/**
 * User employment type
 */
export const USER_EMPLOYMENT_TYPE = {
  FULL_TIME: 'full_time',
  PART_TIME: 'part_time',
  CONTRACT: 'contract',
  FREELANCE: 'freelance',
  INTERNSHIP: 'internship',
  SELF_EMPLOYED: 'self_employed',
  UNEMPLOYED: 'unemployed',
  RETIRED: 'retired',
  STUDENT: 'student',
  OTHER: 'other',
} as const;

/**
 * User industry types
 */
export const USER_INDUSTRY = {
  TECHNOLOGY: 'technology',
  HEALTHCARE: 'healthcare',
  EDUCATION: 'education',
  FINANCE: 'finance',
  RETAIL: 'retail',
  MANUFACTURING: 'manufacturing',
  CONSTRUCTION: 'construction',
  TRANSPORTATION: 'transportation',
  HOSPITALITY: 'hospitality',
  ENTERTAINMENT: 'entertainment',
  MEDIA: 'media',
  AGRICULTURE: 'agriculture',
  ENERGY: 'energy',
  TELECOMMUNICATIONS: 'telecommunications',
  REAL_ESTATE: 'real_estate',
  LEGAL: 'legal',
  CONSULTING: 'consulting',
  NON_PROFIT: 'non_profit',
  GOVERNMENT: 'government',
  MILITARY: 'military',
  OTHER: 'other',
} as const;

/**
 * User profile status
 */
export const USER_PROFILE_STATUS = {
  /** Profile is active and visible */
  ACTIVE: STATUS.ACTIVE,
  /** Profile is incomplete */
  INCOMPLETE: 'incomplete',
  /** Profile is pending review */
  PENDING: STATUS.PENDING,
  /** Profile is flagged for review */
  FLAGGED: 'flagged',
  /** Profile is suspended */
  SUSPENDED: STATUS.SUSPENDED,
  /** Profile is deleted */
  DELETED: STATUS.DELETED,
  /** Profile is archived */
  ARCHIVED: STATUS.ARCHIVED,
} as const;

/**
 * User profile completion levels
 */
export const USER_PROFILE_COMPLETION = {
  /** Minimum required fields only */
  MINIMAL: 'minimal',
  /** Basic profile complete */
  BASIC: 'basic',
  /** Intermediate profile complete */
  INTERMEDIATE: 'intermediate',
  /** Comprehensive profile complete */
  COMPREHENSIVE: 'comprehensive',
  /** Complete profile with all fields */
  COMPLETE: 'complete',
} as const;

/**
 * User profile verification status
 */
export const USER_PROFILE_VERIFICATION_STATUS = {
  /** Profile is not verified */
  UNVERIFIED: 'unverified',
  /** Profile is verified */
  VERIFIED: 'verified',
  /** Verification is pending */
  PENDING: STATUS.PENDING,
  /** Verification failed */
  FAILED: STATUS.FAILED,
  /** Verification requires review */
  REQUIRES_REVIEW: 'requires_review',
} as const;

/**
 * User profile labels
 * Human-readable labels for UI
 */
export const USER_PROFILE_VISIBILITY_LABELS: Record<string, string> = {
  [USER_PROFILE_VISIBILITY.PUBLIC]: 'Public',
  [USER_PROFILE_VISIBILITY.REGISTERED_ONLY]: 'Registered Users Only',
  [USER_PROFILE_VISIBILITY.CONNECTIONS_ONLY]: 'Connections Only',
  [USER_PROFILE_VISIBILITY.PRIVATE]: 'Private',
  [USER_PROFILE_VISIBILITY.ADMIN_ONLY]: 'Admin Only',
};

/**
 * User gender labels
 */
export const USER_GENDER_LABELS: Record<string, string> = {
  [USER_GENDER.MALE]: 'Male',
  [USER_GENDER.FEMALE]: 'Female',
  [USER_GENDER.OTHER]: 'Other',
  [USER_GENDER.PREFER_NOT_TO_SAY]: 'Prefer Not to Say',
};

/**
 * User marital status labels
 */
export const USER_MARITAL_STATUS_LABELS: Record<string, string> = {
  [USER_MARITAL_STATUS.SINGLE]: 'Single',
  [USER_MARITAL_STATUS.MARRIED]: 'Married',
  [USER_MARITAL_STATUS.DIVORCED]: 'Divorced',
  [USER_MARITAL_STATUS.WIDOWED]: 'Widowed',
  [USER_MARITAL_STATUS.SEPARATED]: 'Separated',
  [USER_MARITAL_STATUS.PREFER_NOT_TO_SAY]: 'Prefer Not to Say',
};

/**
 * User education level labels
 */
export const USER_EDUCATION_LEVEL_LABELS: Record<string, string> = {
  [USER_EDUCATION_LEVEL.NO_FORMAL]: 'No Formal Education',
  [USER_EDUCATION_LEVEL.PRIMARY]: 'Primary Education',
  [USER_EDUCATION_LEVEL.SECONDARY]: 'Secondary Education',
  [USER_EDUCATION_LEVEL.HIGH_SCHOOL]: 'High School',
  [USER_EDUCATION_LEVEL.COLLEGE]: 'College',
  [USER_EDUCATION_LEVEL.BACHELORS]: "Bachelor's Degree",
  [USER_EDUCATION_LEVEL.MASTERS]: "Master's Degree",
  [USER_EDUCATION_LEVEL.DOCTORATE]: 'Doctorate',
  [USER_EDUCATION_LEVEL.PROFESSIONAL]: 'Professional Degree',
  [USER_EDUCATION_LEVEL.OTHER]: 'Other',
};

/**
 * User employment type labels
 */
export const USER_EMPLOYMENT_TYPE_LABELS: Record<string, string> = {
  [USER_EMPLOYMENT_TYPE.FULL_TIME]: 'Full Time',
  [USER_EMPLOYMENT_TYPE.PART_TIME]: 'Part Time',
  [USER_EMPLOYMENT_TYPE.CONTRACT]: 'Contract',
  [USER_EMPLOYMENT_TYPE.FREELANCE]: 'Freelance',
  [USER_EMPLOYMENT_TYPE.INTERNSHIP]: 'Internship',
  [USER_EMPLOYMENT_TYPE.SELF_EMPLOYED]: 'Self Employed',
  [USER_EMPLOYMENT_TYPE.UNEMPLOYED]: 'Unemployed',
  [USER_EMPLOYMENT_TYPE.RETIRED]: 'Retired',
  [USER_EMPLOYMENT_TYPE.STUDENT]: 'Student',
  [USER_EMPLOYMENT_TYPE.OTHER]: 'Other',
};

/**
 * User industry labels
 */
export const USER_INDUSTRY_LABELS: Record<string, string> = {
  [USER_INDUSTRY.TECHNOLOGY]: 'Technology',
  [USER_INDUSTRY.HEALTHCARE]: 'Healthcare',
  [USER_INDUSTRY.EDUCATION]: 'Education',
  [USER_INDUSTRY.FINANCE]: 'Finance',
  [USER_INDUSTRY.RETAIL]: 'Retail',
  [USER_INDUSTRY.MANUFACTURING]: 'Manufacturing',
  [USER_INDUSTRY.CONSTRUCTION]: 'Construction',
  [USER_INDUSTRY.TRANSPORTATION]: 'Transportation',
  [USER_INDUSTRY.HOSPITALITY]: 'Hospitality',
  [USER_INDUSTRY.ENTERTAINMENT]: 'Entertainment',
  [USER_INDUSTRY.MEDIA]: 'Media',
  [USER_INDUSTRY.AGRICULTURE]: 'Agriculture',
  [USER_INDUSTRY.ENERGY]: 'Energy',
  [USER_INDUSTRY.TELECOMMUNICATIONS]: 'Telecommunications',
  [USER_INDUSTRY.REAL_ESTATE]: 'Real Estate',
  [USER_INDUSTRY.LEGAL]: 'Legal',
  [USER_INDUSTRY.CONSULTING]: 'Consulting',
  [USER_INDUSTRY.NON_PROFIT]: 'Non-Profit',
  [USER_INDUSTRY.GOVERNMENT]: 'Government',
  [USER_INDUSTRY.MILITARY]: 'Military',
  [USER_INDUSTRY.OTHER]: 'Other',
};

/**
 * User profile completion labels
 */
export const USER_PROFILE_COMPLETION_LABELS: Record<string, string> = {
  [USER_PROFILE_COMPLETION.MINIMAL]: 'Minimal',
  [USER_PROFILE_COMPLETION.BASIC]: 'Basic',
  [USER_PROFILE_COMPLETION.INTERMEDIATE]: 'Intermediate',
  [USER_PROFILE_COMPLETION.COMPREHENSIVE]: 'Comprehensive',
  [USER_PROFILE_COMPLETION.COMPLETE]: 'Complete',
};

/**
 * User profile status labels
 */
export const USER_PROFILE_STATUS_LABELS: Record<string, string> = {
  [USER_PROFILE_STATUS.ACTIVE]: 'Active',
  [USER_PROFILE_STATUS.INCOMPLETE]: 'Incomplete',
  [USER_PROFILE_STATUS.PENDING]: 'Pending Review',
  [USER_PROFILE_STATUS.FLAGGED]: 'Flagged',
  [USER_PROFILE_STATUS.SUSPENDED]: 'Suspended',
  [USER_PROFILE_STATUS.DELETED]: 'Deleted',
  [USER_PROFILE_STATUS.ARCHIVED]: 'Archived',
};

/**
 * User profile verification labels
 */
export const USER_PROFILE_VERIFICATION_STATUS_LABELS: Record<string, string> = {
  [USER_PROFILE_VERIFICATION_STATUS.UNVERIFIED]: 'Unverified',
  [USER_PROFILE_VERIFICATION_STATUS.VERIFIED]: 'Verified',
  [USER_PROFILE_VERIFICATION_STATUS.PENDING]: 'Verification Pending',
  [USER_PROFILE_VERIFICATION_STATUS.FAILED]: 'Verification Failed',
  [USER_PROFILE_VERIFICATION_STATUS.REQUIRES_REVIEW]: 'Requires Review',
};

/**
 * Check if user profile visibility is valid
 */
export function isValidUserProfileVisibility(visibility: string): boolean {
  return Object.values(USER_PROFILE_VISIBILITY).includes(
    visibility as (typeof USER_PROFILE_VISIBILITY)[keyof typeof USER_PROFILE_VISIBILITY]
  );
}

/**
 * Check if user gender is valid
 */
export function isValidUserGender(gender: string): boolean {
  return Object.values(USER_GENDER).includes(
    gender as (typeof USER_GENDER)[keyof typeof USER_GENDER]
  );
}

/**
 * Check if user marital status is valid
 */
export function isValidUserMaritalStatus(status: string): boolean {
  return Object.values(USER_MARITAL_STATUS).includes(
    status as (typeof USER_MARITAL_STATUS)[keyof typeof USER_MARITAL_STATUS]
  );
}

/**
 * Check if user education level is valid
 */
export function isValidUserEducationLevel(level: string): boolean {
  return Object.values(USER_EDUCATION_LEVEL).includes(
    level as (typeof USER_EDUCATION_LEVEL)[keyof typeof USER_EDUCATION_LEVEL]
  );
}

/**
 * Check if user employment type is valid
 */
export function isValidUserEmploymentType(type: string): boolean {
  return Object.values(USER_EMPLOYMENT_TYPE).includes(
    type as (typeof USER_EMPLOYMENT_TYPE)[keyof typeof USER_EMPLOYMENT_TYPE]
  );
}

/**
 * Check if user industry is valid
 */
export function isValidUserIndustry(industry: string): boolean {
  return Object.values(USER_INDUSTRY).includes(
    industry as (typeof USER_INDUSTRY)[keyof typeof USER_INDUSTRY]
  );
}

/**
 * Check if user profile status is valid
 */
export function isValidUserProfileStatus(status: string): boolean {
  return Object.values(USER_PROFILE_STATUS).includes(
    status as (typeof USER_PROFILE_STATUS)[keyof typeof USER_PROFILE_STATUS]
  );
}

/**
 * Get user profile visibility label
 */
export function getUserProfileVisibilityLabel(visibility: string): string {
  return USER_PROFILE_VISIBILITY_LABELS[visibility] || visibility;
}

/**
 * Get user gender label
 */
export function getUserGenderLabel(gender: string): string {
  return USER_GENDER_LABELS[gender] || gender;
}

/**
 * Get user marital status label
 */
export function getUserMaritalStatusLabel(status: string): string {
  return USER_MARITAL_STATUS_LABELS[status] || status;
}

/**
 * Get user education level label
 */
export function getUserEducationLevelLabel(level: string): string {
  return USER_EDUCATION_LEVEL_LABELS[level] || level;
}

/**
 * Get user employment type label
 */
export function getUserEmploymentTypeLabel(type: string): string {
  return USER_EMPLOYMENT_TYPE_LABELS[type] || type;
}

/**
 * Get user industry label
 */
export function getUserIndustryLabel(industry: string): string {
  return USER_INDUSTRY_LABELS[industry] || industry;
}

/**
 * Get user profile status label
 */
export function getUserProfileStatusLabel(status: string): string {
  return USER_PROFILE_STATUS_LABELS[status] || status;
}

/**
 * Get user profile verification label
 */
export function getUserProfileVerificationStatusLabel(status: string): string {
  return USER_PROFILE_VERIFICATION_STATUS_LABELS[status] || status;
}

/**
 * Check if profile is public
 */
export function isUserProfilePublic(visibility: string): boolean {
  return visibility === USER_PROFILE_VISIBILITY.PUBLIC;
}

/**
 * Check if profile is private
 */
export function isUserProfilePrivate(visibility: string): boolean {
  return visibility === USER_PROFILE_VISIBILITY.PRIVATE;
}

/**
 * Check if profile is active
 */
export function isUserProfileActive(status: string): boolean {
  return status === USER_PROFILE_STATUS.ACTIVE;
}

/**
 * Check if profile is verified
 */
export function isUserProfileVerified(status: string): boolean {
  return status === USER_PROFILE_VERIFICATION_STATUS.VERIFIED;
}

/**
 * Check if profile is complete
 */
export function isUserProfileComplete(completionLevel: string): boolean {
  return completionLevel === USER_PROFILE_COMPLETION.COMPLETE;
}

/**
 * Get all user profile visibilities
 */
export function getAllUserProfileVisibilities(): string[] {
  return Object.values(USER_PROFILE_VISIBILITY);
}

/**
 * Get all user genders
 */
export function getAllUserGenders(): string[] {
  return Object.values(USER_GENDER);
}

/**
 * Get all user marital statuses
 */
export function getAllUserMaritalStatuses(): string[] {
  return Object.values(USER_MARITAL_STATUS);
}

/**
 * Get all user education levels
 */
export function getAllUserEducationLevels(): string[] {
  return Object.values(USER_EDUCATION_LEVEL);
}

/**
 * Get all user employment types
 */
export function getAllUserEmploymentTypes(): string[] {
  return Object.values(USER_EMPLOYMENT_TYPE);
}

/**
 * Get all user industries
 */
export function getAllUserIndustries(): string[] {
  return Object.values(USER_INDUSTRY);
}

/**
 * Get all user profile statuses
 */
export function getAllUserProfileStatuses(): string[] {
  return Object.values(USER_PROFILE_STATUS);
}

/**
 * User profile field types
 */
export const USER_PROFILE_FIELD_TYPE = {
  TEXT: 'text',
  NUMBER: 'number',
  DATE: 'date',
  EMAIL: 'email',
  PHONE: 'phone',
  URL: 'url',
  SELECT: 'select',
  MULTI_SELECT: 'multi_select',
  TEXTAREA: 'textarea',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  FILE: 'file',
  IMAGE: 'image',
  LOCATION: 'location',
  SOCIAL_LINK: 'social_link',
} as const;

/**
 * User profile field labels
 */
export const USER_PROFILE_FIELD_TYPE_LABELS: Record<string, string> = {
  [USER_PROFILE_FIELD_TYPE.TEXT]: 'Text',
  [USER_PROFILE_FIELD_TYPE.NUMBER]: 'Number',
  [USER_PROFILE_FIELD_TYPE.DATE]: 'Date',
  [USER_PROFILE_FIELD_TYPE.EMAIL]: 'Email',
  [USER_PROFILE_FIELD_TYPE.PHONE]: 'Phone',
  [USER_PROFILE_FIELD_TYPE.URL]: 'URL',
  [USER_PROFILE_FIELD_TYPE.SELECT]: 'Select',
  [USER_PROFILE_FIELD_TYPE.MULTI_SELECT]: 'Multi-Select',
  [USER_PROFILE_FIELD_TYPE.TEXTAREA]: 'Text Area',
  [USER_PROFILE_FIELD_TYPE.CHECKBOX]: 'Checkbox',
  [USER_PROFILE_FIELD_TYPE.RADIO]: 'Radio',
  [USER_PROFILE_FIELD_TYPE.FILE]: 'File',
  [USER_PROFILE_FIELD_TYPE.IMAGE]: 'Image',
  [USER_PROFILE_FIELD_TYPE.LOCATION]: 'Location',
  [USER_PROFILE_FIELD_TYPE.SOCIAL_LINK]: 'Social Link',
};

/**
 * Check if user profile field type is valid
 */
export function isValidUserProfileFieldType(type: string): boolean {
  return Object.values(USER_PROFILE_FIELD_TYPE).includes(
    type as (typeof USER_PROFILE_FIELD_TYPE)[keyof typeof USER_PROFILE_FIELD_TYPE]
  );
}

/**
 * Get user profile field type label
 */
export function getUserProfileFieldTypeLabel(type: string): string {
  return USER_PROFILE_FIELD_TYPE_LABELS[type] || type;
}

/**
 * Social media platform types
 */
export const USER_SOCIAL_PLATFORM = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedin',
  YOUTUBE: 'youtube',
  GITHUB: 'github',
  GITLAB: 'gitlab',
  STACK_OVERFLOW: 'stack_overflow',
  MEDIUM: 'medium',
  BLOG: 'blog',
  WEBSITE: 'website',
  TIKTOK: 'tiktok',
  SNAPCHAT: 'snapchat',
  PINTEREST: 'pinterest',
  REDDIT: 'reddit',
  DISCORD: 'discord',
  TELEGRAM: 'telegram',
  WHATSAPP: 'whatsapp',
  SIGNAL: 'signal',
  OTHER: 'other',
} as const;

/**
 * User social platform labels
 */
export const USER_SOCIAL_PLATFORM_LABELS: Record<string, string> = {
  [USER_SOCIAL_PLATFORM.FACEBOOK]: 'Facebook',
  [USER_SOCIAL_PLATFORM.TWITTER]: 'Twitter / X',
  [USER_SOCIAL_PLATFORM.INSTAGRAM]: 'Instagram',
  [USER_SOCIAL_PLATFORM.LINKEDIN]: 'LinkedIn',
  [USER_SOCIAL_PLATFORM.YOUTUBE]: 'YouTube',
  [USER_SOCIAL_PLATFORM.GITHUB]: 'GitHub',
  [USER_SOCIAL_PLATFORM.GITLAB]: 'GitLab',
  [USER_SOCIAL_PLATFORM.STACK_OVERFLOW]: 'Stack Overflow',
  [USER_SOCIAL_PLATFORM.MEDIUM]: 'Medium',
  [USER_SOCIAL_PLATFORM.BLOG]: 'Blog',
  [USER_SOCIAL_PLATFORM.WEBSITE]: 'Website',
  [USER_SOCIAL_PLATFORM.TIKTOK]: 'TikTok',
  [USER_SOCIAL_PLATFORM.SNAPCHAT]: 'Snapchat',
  [USER_SOCIAL_PLATFORM.PINTEREST]: 'Pinterest',
  [USER_SOCIAL_PLATFORM.REDDIT]: 'Reddit',
  [USER_SOCIAL_PLATFORM.DISCORD]: 'Discord',
  [USER_SOCIAL_PLATFORM.TELEGRAM]: 'Telegram',
  [USER_SOCIAL_PLATFORM.WHATSAPP]: 'WhatsApp',
  [USER_SOCIAL_PLATFORM.SIGNAL]: 'Signal',
  [USER_SOCIAL_PLATFORM.OTHER]: 'Other',
};

/**
 * Check if user social platform is valid
 */
export function isValidUserSocialPlatform(platform: string): boolean {
  return Object.values(USER_SOCIAL_PLATFORM).includes(
    platform as (typeof USER_SOCIAL_PLATFORM)[keyof typeof USER_SOCIAL_PLATFORM]
  );
}

/**
 * Get user social platform label
 */
export function getUserSocialPlatformLabel(platform: string): string {
  return USER_SOCIAL_PLATFORM_LABELS[platform] || platform;
}

/**
 * Get all user social platforms
 */
export function getAllUserSocialPlatforms(): string[] {
  return Object.values(USER_SOCIAL_PLATFORM);
}
