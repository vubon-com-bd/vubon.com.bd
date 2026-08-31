/**
 * User Profile Types
 * Types for user profile management
 */

import type { ID, Timestamp, JsonObject } from '../common/core-primitives.types';
import {
  USER_PROFILE_VISIBILITY,
  USER_PROFILE_SECTION,
  USER_PROFILE_SECTION_VISIBILITY,
  USER_GENDER,
  USER_MARITAL_STATUS,
  USER_EDUCATION_LEVEL,
  USER_EMPLOYMENT_TYPE,
  USER_INDUSTRY,
  USER_PROFILE_STATUS,
  USER_PROFILE_COMPLETION,
  USER_PROFILE_VERIFICATION_STATUS,
  USER_PROFILE_FIELD_TYPE,
  USER_SOCIAL_PLATFORM,
  USER_PROFILE_VISIBILITY_LABELS,
  USER_GENDER_LABELS,
  USER_MARITAL_STATUS_LABELS,
  USER_EDUCATION_LEVEL_LABELS,
  USER_EMPLOYMENT_TYPE_LABELS,
  USER_INDUSTRY_LABELS,
  USER_PROFILE_STATUS_LABELS,
  USER_PROFILE_COMPLETION_LABELS,
  USER_PROFILE_VERIFICATION_STATUS_LABELS,
  USER_PROFILE_FIELD_TYPE_LABELS,
  USER_SOCIAL_PLATFORM_LABELS,
} from '@vubon/shared-constants';

// ============================================================
// USER PROFILE TYPES
// ============================================================

/**
 * User profile visibility
 */
export type UserProfileVisibility =
  (typeof USER_PROFILE_VISIBILITY)[keyof typeof USER_PROFILE_VISIBILITY];

/**
 * User profile section
 */
export type UserProfileSection = (typeof USER_PROFILE_SECTION)[keyof typeof USER_PROFILE_SECTION];

/**
 * User profile section visibility
 */
export type UserProfileSectionVisibility =
  (typeof USER_PROFILE_SECTION_VISIBILITY)[keyof typeof USER_PROFILE_SECTION_VISIBILITY];

/**
 * User gender
 */
export type UserGender = (typeof USER_GENDER)[keyof typeof USER_GENDER];

/**
 * User marital status
 */
export type UserMaritalStatus = (typeof USER_MARITAL_STATUS)[keyof typeof USER_MARITAL_STATUS];

/**
 * User education level
 */
export type UserEducationLevel = (typeof USER_EDUCATION_LEVEL)[keyof typeof USER_EDUCATION_LEVEL];

/**
 * User employment type
 */
export type UserEmploymentType = (typeof USER_EMPLOYMENT_TYPE)[keyof typeof USER_EMPLOYMENT_TYPE];

/**
 * User industry
 */
export type UserIndustry = (typeof USER_INDUSTRY)[keyof typeof USER_INDUSTRY];

/**
 * User profile status
 */
export type UserProfileStatus = (typeof USER_PROFILE_STATUS)[keyof typeof USER_PROFILE_STATUS];

/**
 * User profile completion
 */
export type UserProfileCompletion =
  (typeof USER_PROFILE_COMPLETION)[keyof typeof USER_PROFILE_COMPLETION];

/**
 * User profile verification status
 */
export type UserProfileVerificationStatus =
  (typeof USER_PROFILE_VERIFICATION_STATUS)[keyof typeof USER_PROFILE_VERIFICATION_STATUS];

/**
 * User profile field type
 */
export type UserProfileFieldType =
  (typeof USER_PROFILE_FIELD_TYPE)[keyof typeof USER_PROFILE_FIELD_TYPE];

/**
 * User social platform
 */
export type UserSocialPlatform = (typeof USER_SOCIAL_PLATFORM)[keyof typeof USER_SOCIAL_PLATFORM];

// ============================================================
// USER PROFILE RECORD
// ============================================================

/**
 * User profile record
 */
export interface UserProfileRecord {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Profile visibility */
  visibility: UserProfileVisibility;
  /** Profile status */
  status: UserProfileStatus;
  /** Profile completion level */
  completion: UserProfileCompletion;
  /** Verification status */
  verificationStatus: UserProfileVerificationStatus;
  /** Full name */
  fullName: string;
  /** Display name */
  displayName?: string;
  /** Bio/About */
  bio?: string;
  /** Profile picture URL */
  profilePicture?: string;
  /** Cover photo URL */
  coverPhoto?: string;
  /** Gender */
  gender?: UserGender;
  /** Date of birth */
  dateOfBirth?: Date;
  /** Marital status */
  maritalStatus?: UserMaritalStatus;
  /** Education level */
  educationLevel?: UserEducationLevel;
  /** Employment type */
  employmentType?: UserEmploymentType;
  /** Industry */
  industry?: UserIndustry;
  /** Current position */
  position?: string;
  /** Company/Organization */
  company?: string;
  /** Skills */
  skills?: string[];
  /** Interests */
  interests?: string[];
  /** Achievements */
  achievements?: string[];
  /** Work experience */
  workExperience?: {
    title: string;
    company: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description?: string;
  }[];
  /** Education */
  education?: {
    institution: string;
    degree: string;
    fieldOfStudy?: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description?: string;
  }[];
  /** Certificates */
  certificates?: {
    name: string;
    issuer: string;
    issuedDate: Date;
    expiryDate?: Date;
    credentialId?: string;
    url?: string;
  }[];
  /** Languages */
  languages?: {
    language: string;
    proficiency: 'basic' | 'intermediate' | 'advanced' | 'fluent' | 'native';
  }[];
  /** Social media links */
  socialLinks?: {
    platform: UserSocialPlatform;
    url: string;
  }[];
  /** Section visibilities */
  sectionVisibilities: Record<UserProfileSection, UserProfileSectionVisibility>;
  /** When the profile was created */
  createdAt: Timestamp;
  /** When the profile was updated */
  updatedAt: Timestamp;
  /** When the profile was verified */
  verifiedAt?: Timestamp;
  /** Additional metadata */
  metadata?: JsonObject;
}

// ============================================================
// USER PROFILE REQUEST
// ============================================================

/**
 * User profile update request
 */
export interface UserProfileUpdateRequest {
  /** User ID */
  userId: ID;
  /** Full name */
  fullName?: string;
  /** Display name */
  displayName?: string;
  /** Bio/About */
  bio?: string;
  /** Profile picture URL */
  profilePicture?: string;
  /** Cover photo URL */
  coverPhoto?: string;
  /** Gender */
  gender?: UserGender;
  /** Date of birth */
  dateOfBirth?: Date;
  /** Marital status */
  maritalStatus?: UserMaritalStatus;
  /** Education level */
  educationLevel?: UserEducationLevel;
  /** Employment type */
  employmentType?: UserEmploymentType;
  /** Industry */
  industry?: UserIndustry;
  /** Position */
  position?: string;
  /** Company */
  company?: string;
  /** Skills */
  skills?: string[];
  /** Interests */
  interests?: string[];
  /** Achievements */
  achievements?: string[];
  /** Work experience */
  workExperience?: UserProfileRecord['workExperience'];
  /** Education */
  education?: UserProfileRecord['education'];
  /** Certificates */
  certificates?: UserProfileRecord['certificates'];
  /** Languages */
  languages?: UserProfileRecord['languages'];
  /** Social links */
  socialLinks?: UserProfileRecord['socialLinks'];
  /** Section visibilities */
  sectionVisibilities?: Partial<Record<UserProfileSection, UserProfileSectionVisibility>>;
  /** Additional metadata */
  metadata?: JsonObject;
}

/**
 * User profile visibility update request
 */
export interface UserProfileVisibilityUpdateRequest {
  /** User ID */
  userId: ID;
  /** Profile visibility */
  visibility: UserProfileVisibility;
  /** Section visibilities */
  sectionVisibilities?: Partial<Record<UserProfileSection, UserProfileSectionVisibility>>;
}

// ============================================================
// USER PROFILE RESPONSE
// ============================================================

/**
 * User profile response
 */
export interface UserProfileResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Profile record if successful */
  profile?: UserProfileRecord;
  /** Error message if failed */
  error?: string;
}

// ============================================================
// USER PROFILE FILTER
// ============================================================

/**
 * User profile filter
 */
export interface UserProfileFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by profile visibility */
  visibility?: UserProfileVisibility | UserProfileVisibility[];
  /** Filter by profile status */
  status?: UserProfileStatus | UserProfileStatus[];
  /** Filter by verification status */
  verificationStatus?: UserProfileVerificationStatus | UserProfileVerificationStatus[];
  /** Filter by completion level */
  completion?: UserProfileCompletion | UserProfileCompletion[];
  /** Filter by gender */
  gender?: UserGender | UserGender[];
  /** Filter by industry */
  industry?: UserIndustry | UserIndustry[];
  /** Filter by employment type */
  employmentType?: UserEmploymentType | UserEmploymentType[];
  /** Filter by education level */
  educationLevel?: UserEducationLevel | UserEducationLevel[];
  /** Search by name, bio, company */
  search?: string;
}

// ============================================================
// USER PROFILE SUMMARY
// ============================================================

/**
 * User profile summary
 */
export interface UserProfileSummary {
  /** User ID */
  userId: ID;
  /** Profile status */
  status: UserProfileStatus;
  /** Completion level */
  completion: UserProfileCompletion;
  /** Verification status */
  verificationStatus: UserProfileVerificationStatus;
  /** Profile visibility */
  visibility: UserProfileVisibility;
  /** Profile picture URL */
  profilePicture?: string;
  /** Display name */
  displayName?: string;
  /** Bio */
  bio?: string;
  /** Skills count */
  skillsCount: number;
  /** Social links count */
  socialLinksCount: number;
  /** Work experience count */
  workExperienceCount: number;
  /** Education count */
  educationCount: number;
  /** Languages count */
  languagesCount: number;
  /** Certificates count */
  certificatesCount: number;
  /** Achievements count */
  achievementsCount: number;
  /** When the profile was last updated */
  updatedAt: Timestamp;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user profile visibility is valid
 */
export function isValidUserProfileVisibility(
  visibility: string
): visibility is UserProfileVisibility {
  return Object.values(USER_PROFILE_VISIBILITY).includes(visibility as UserProfileVisibility);
}

/**
 * Check if user gender is valid
 */
export function isValidUserGender(gender: string): gender is UserGender {
  return Object.values(USER_GENDER).includes(gender as UserGender);
}

/**
 * Check if user marital status is valid
 */
export function isValidUserMaritalStatus(status: string): status is UserMaritalStatus {
  return Object.values(USER_MARITAL_STATUS).includes(status as UserMaritalStatus);
}

/**
 * Check if user education level is valid
 */
export function isValidUserEducationLevel(level: string): level is UserEducationLevel {
  return Object.values(USER_EDUCATION_LEVEL).includes(level as UserEducationLevel);
}

/**
 * Check if user employment type is valid
 */
export function isValidUserEmploymentType(type: string): type is UserEmploymentType {
  return Object.values(USER_EMPLOYMENT_TYPE).includes(type as UserEmploymentType);
}

/**
 * Check if user industry is valid
 */
export function isValidUserIndustry(industry: string): industry is UserIndustry {
  return Object.values(USER_INDUSTRY).includes(industry as UserIndustry);
}

/**
 * Check if user profile status is valid
 */
export function isValidUserProfileStatus(status: string): status is UserProfileStatus {
  return Object.values(USER_PROFILE_STATUS).includes(status as UserProfileStatus);
}

/**
 * Check if user profile field type is valid
 */
export function isValidUserProfileFieldType(type: string): type is UserProfileFieldType {
  return Object.values(USER_PROFILE_FIELD_TYPE).includes(type as UserProfileFieldType);
}

/**
 * Check if user social platform is valid
 */
export function isValidUserSocialPlatform(platform: string): platform is UserSocialPlatform {
  return Object.values(USER_SOCIAL_PLATFORM).includes(platform as UserSocialPlatform);
}

/**
 * Get user profile visibility display name
 */
export function getUserProfileVisibilityDisplayName(visibility: UserProfileVisibility): string {
  return USER_PROFILE_VISIBILITY_LABELS[visibility] || visibility;
}

/**
 * Get user gender display name
 */
export function getUserGenderDisplayName(gender: UserGender): string {
  return USER_GENDER_LABELS[gender] || gender;
}

/**
 * Get user marital status display name
 */
export function getUserMaritalStatusDisplayName(status: UserMaritalStatus): string {
  return USER_MARITAL_STATUS_LABELS[status] || status;
}

/**
 * Get user education level display name
 */
export function getUserEducationLevelDisplayName(level: UserEducationLevel): string {
  return USER_EDUCATION_LEVEL_LABELS[level] || level;
}

/**
 * Get user employment type display name
 */
export function getUserEmploymentTypeDisplayName(type: UserEmploymentType): string {
  return USER_EMPLOYMENT_TYPE_LABELS[type] || type;
}

/**
 * Get user industry display name
 */
export function getUserIndustryDisplayName(industry: UserIndustry): string {
  return USER_INDUSTRY_LABELS[industry] || industry;
}

/**
 * Get user profile status display name
 */
export function getUserProfileStatusDisplayName(status: UserProfileStatus): string {
  return USER_PROFILE_STATUS_LABELS[status] || status;
}

/**
 * Get user profile completion display name
 */
export function getUserProfileCompletionDisplayName(completion: UserProfileCompletion): string {
  return USER_PROFILE_COMPLETION_LABELS[completion] || completion;
}

/**
 * Get user profile verification status display name
 */
export function getUserProfileVerificationStatusDisplayName(
  status: UserProfileVerificationStatus
): string {
  return USER_PROFILE_VERIFICATION_STATUS_LABELS[status] || status;
}

/**
 * Get user profile field type display name
 */
export function getUserProfileFieldTypeDisplayName(type: UserProfileFieldType): string {
  return USER_PROFILE_FIELD_TYPE_LABELS[type] || type;
}

/**
 * Get user social platform display name
 */
export function getUserSocialPlatformDisplayName(platform: UserSocialPlatform): string {
  return USER_SOCIAL_PLATFORM_LABELS[platform] || platform;
}

/**
 * Check if profile is public
 */
export function isUserProfilePublic(visibility: UserProfileVisibility): boolean {
  return visibility === USER_PROFILE_VISIBILITY.PUBLIC;
}

/**
 * Check if profile is private
 */
export function isUserProfilePrivate(visibility: UserProfileVisibility): boolean {
  return visibility === USER_PROFILE_VISIBILITY.PRIVATE;
}

/**
 * Check if profile is active
 */
export function isUserProfileActive(status: UserProfileStatus): boolean {
  return status === USER_PROFILE_STATUS.ACTIVE;
}

/**
 * Check if profile is verified
 */
export function isUserProfileVerified(status: UserProfileVerificationStatus): boolean {
  return status === USER_PROFILE_VERIFICATION_STATUS.VERIFIED;
}

/**
 * Check if profile is complete
 */
export function isUserProfileComplete(completion: UserProfileCompletion): boolean {
  return completion === USER_PROFILE_COMPLETION.COMPLETE;
}

/**
 * Get all user profile visibilities
 */
export function getAllUserProfileVisibilities(): UserProfileVisibility[] {
  return Object.values(USER_PROFILE_VISIBILITY);
}

/**
 * Get all user genders
 */
export function getAllUserGenders(): UserGender[] {
  return Object.values(USER_GENDER);
}

/**
 * Get all user marital statuses
 */
export function getAllUserMaritalStatuses(): UserMaritalStatus[] {
  return Object.values(USER_MARITAL_STATUS);
}

/**
 * Get all user education levels
 */
export function getAllUserEducationLevels(): UserEducationLevel[] {
  return Object.values(USER_EDUCATION_LEVEL);
}

/**
 * Get all user employment types
 */
export function getAllUserEmploymentTypes(): UserEmploymentType[] {
  return Object.values(USER_EMPLOYMENT_TYPE);
}

/**
 * Get all user industries
 */
export function getAllUserIndustries(): UserIndustry[] {
  return Object.values(USER_INDUSTRY);
}

/**
 * Get all user profile statuses
 */
export function getAllUserProfileStatuses(): UserProfileStatus[] {
  return Object.values(USER_PROFILE_STATUS);
}

/**
 * Get all user social platforms
 */
export function getAllUserSocialPlatforms(): UserSocialPlatform[] {
  return Object.values(USER_SOCIAL_PLATFORM);
}

/**
 * Calculate profile completion percentage
 */
export function calculateUserProfileCompletion(profile: Partial<UserProfileRecord>): number {
  const fields = [
    'fullName',
    'displayName',
    'bio',
    'profilePicture',
    'gender',
    'dateOfBirth',
    'maritalStatus',
    'educationLevel',
    'employmentType',
    'industry',
    'position',
    'company',
  ];
  const optionalFields = [
    'skills',
    'interests',
    'achievements',
    'socialLinks',
    'workExperience',
    'education',
    'certificates',
    'languages',
  ];

  let filled = 0;
  let total = fields.length + optionalFields.length;

  for (const field of fields) {
    if (
      profile[field as keyof typeof profile] !== undefined &&
      profile[field as keyof typeof profile] !== null &&
      profile[field as keyof typeof profile] !== ''
    ) {
      filled++;
    }
  }

  for (const field of optionalFields) {
    const value = profile[field as keyof typeof profile];
    if (value !== undefined && value !== null && Array.isArray(value) && value.length > 0) {
      filled++;
    } else if (value !== undefined && value !== null && !Array.isArray(value) && value !== '') {
      filled++;
    }
  }

  return Math.round((filled / total) * 100);
}
