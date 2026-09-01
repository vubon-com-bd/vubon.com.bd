/**
 * User Profile Schema
 * Zod schemas for user profile management
 */

import { z } from 'zod';
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
} from '@vubon/shared-constants';
import {
  idSchema,
  timestampSchema,
  jsonObjectSchema,
  urlSchema,
} from '../common/core-primitives.schema';

// ============================================================
// USER PROFILE TYPE SCHEMAS
// ============================================================

/**
 * User profile visibility schema
 */
export const userProfileVisibilitySchema = z.enum([
  USER_PROFILE_VISIBILITY.PUBLIC,
  USER_PROFILE_VISIBILITY.REGISTERED_ONLY,
  USER_PROFILE_VISIBILITY.CONNECTIONS_ONLY,
  USER_PROFILE_VISIBILITY.PRIVATE,
  USER_PROFILE_VISIBILITY.ADMIN_ONLY,
]);

/**
 * User profile section schema
 */
export const userProfileSectionSchema = z.enum([
  USER_PROFILE_SECTION.BASIC_INFO,
  USER_PROFILE_SECTION.CONTACT_INFO,
  USER_PROFILE_SECTION.ADDRESS_INFO,
  USER_PROFILE_SECTION.PROFESSIONAL_INFO,
  USER_PROFILE_SECTION.EDUCATIONAL_INFO,
  USER_PROFILE_SECTION.SOCIAL_LINKS,
  USER_PROFILE_SECTION.ABOUT,
  USER_PROFILE_SECTION.PROFILE_PICTURE,
  USER_PROFILE_SECTION.COVER_PHOTO,
  USER_PROFILE_SECTION.SKILLS,
  USER_PROFILE_SECTION.INTERESTS,
  USER_PROFILE_SECTION.ACHIEVEMENTS,
  USER_PROFILE_SECTION.WORK_EXPERIENCE,
  USER_PROFILE_SECTION.CERTIFICATES,
  USER_PROFILE_SECTION.LANGUAGES,
  USER_PROFILE_SECTION.SETTINGS,
  USER_PROFILE_SECTION.PRIVACY,
]);

/**
 * User profile section visibility schema
 */
export const userProfileSectionVisibilitySchema = z.enum([
  USER_PROFILE_SECTION_VISIBILITY.PUBLIC,
  USER_PROFILE_SECTION_VISIBILITY.REGISTERED_ONLY,
  USER_PROFILE_SECTION_VISIBILITY.CONNECTIONS_ONLY,
  USER_PROFILE_SECTION_VISIBILITY.PRIVATE,
]);

/**
 * User gender schema
 */
export const userGenderSchema = z.enum([
  USER_GENDER.MALE,
  USER_GENDER.FEMALE,
  USER_GENDER.OTHER,
  USER_GENDER.PREFER_NOT_TO_SAY,
]);

/**
 * User marital status schema
 */
export const userMaritalStatusSchema = z.enum([
  USER_MARITAL_STATUS.SINGLE,
  USER_MARITAL_STATUS.MARRIED,
  USER_MARITAL_STATUS.DIVORCED,
  USER_MARITAL_STATUS.WIDOWED,
  USER_MARITAL_STATUS.SEPARATED,
  USER_MARITAL_STATUS.PREFER_NOT_TO_SAY,
]);

/**
 * User education level schema
 */
export const userEducationLevelSchema = z.enum([
  USER_EDUCATION_LEVEL.NO_FORMAL,
  USER_EDUCATION_LEVEL.PRIMARY,
  USER_EDUCATION_LEVEL.SECONDARY,
  USER_EDUCATION_LEVEL.HIGH_SCHOOL,
  USER_EDUCATION_LEVEL.COLLEGE,
  USER_EDUCATION_LEVEL.BACHELORS,
  USER_EDUCATION_LEVEL.MASTERS,
  USER_EDUCATION_LEVEL.DOCTORATE,
  USER_EDUCATION_LEVEL.PROFESSIONAL,
  USER_EDUCATION_LEVEL.OTHER,
]);

/**
 * User employment type schema
 */
export const userEmploymentTypeSchema = z.enum([
  USER_EMPLOYMENT_TYPE.FULL_TIME,
  USER_EMPLOYMENT_TYPE.PART_TIME,
  USER_EMPLOYMENT_TYPE.CONTRACT,
  USER_EMPLOYMENT_TYPE.FREELANCE,
  USER_EMPLOYMENT_TYPE.INTERNSHIP,
  USER_EMPLOYMENT_TYPE.SELF_EMPLOYED,
  USER_EMPLOYMENT_TYPE.UNEMPLOYED,
  USER_EMPLOYMENT_TYPE.RETIRED,
  USER_EMPLOYMENT_TYPE.STUDENT,
  USER_EMPLOYMENT_TYPE.OTHER,
]);

/**
 * User industry schema
 */
export const userIndustrySchema = z.enum([
  USER_INDUSTRY.TECHNOLOGY,
  USER_INDUSTRY.HEALTHCARE,
  USER_INDUSTRY.EDUCATION,
  USER_INDUSTRY.FINANCE,
  USER_INDUSTRY.RETAIL,
  USER_INDUSTRY.MANUFACTURING,
  USER_INDUSTRY.CONSTRUCTION,
  USER_INDUSTRY.TRANSPORTATION,
  USER_INDUSTRY.HOSPITALITY,
  USER_INDUSTRY.ENTERTAINMENT,
  USER_INDUSTRY.MEDIA,
  USER_INDUSTRY.AGRICULTURE,
  USER_INDUSTRY.ENERGY,
  USER_INDUSTRY.TELECOMMUNICATIONS,
  USER_INDUSTRY.REAL_ESTATE,
  USER_INDUSTRY.LEGAL,
  USER_INDUSTRY.CONSULTING,
  USER_INDUSTRY.NON_PROFIT,
  USER_INDUSTRY.GOVERNMENT,
  USER_INDUSTRY.MILITARY,
  USER_INDUSTRY.OTHER,
]);

/**
 * User profile status schema
 */
export const userProfileStatusSchema = z.enum([
  USER_PROFILE_STATUS.ACTIVE,
  USER_PROFILE_STATUS.INCOMPLETE,
  USER_PROFILE_STATUS.PENDING,
  USER_PROFILE_STATUS.FLAGGED,
  USER_PROFILE_STATUS.SUSPENDED,
  USER_PROFILE_STATUS.DELETED,
  USER_PROFILE_STATUS.ARCHIVED,
]);

/**
 * User profile completion schema
 */
export const userProfileCompletionSchema = z.enum([
  USER_PROFILE_COMPLETION.MINIMAL,
  USER_PROFILE_COMPLETION.BASIC,
  USER_PROFILE_COMPLETION.INTERMEDIATE,
  USER_PROFILE_COMPLETION.COMPREHENSIVE,
  USER_PROFILE_COMPLETION.COMPLETE,
]);

/**
 * User profile verification status schema
 */
export const userProfileVerificationStatusSchema = z.enum([
  USER_PROFILE_VERIFICATION_STATUS.UNVERIFIED,
  USER_PROFILE_VERIFICATION_STATUS.VERIFIED,
  USER_PROFILE_VERIFICATION_STATUS.PENDING,
  USER_PROFILE_VERIFICATION_STATUS.FAILED,
  USER_PROFILE_VERIFICATION_STATUS.REQUIRES_REVIEW,
]);

/**
 * User profile field type schema
 */
export const userProfileFieldTypeSchema = z.enum([
  USER_PROFILE_FIELD_TYPE.TEXT,
  USER_PROFILE_FIELD_TYPE.NUMBER,
  USER_PROFILE_FIELD_TYPE.DATE,
  USER_PROFILE_FIELD_TYPE.EMAIL,
  USER_PROFILE_FIELD_TYPE.PHONE,
  USER_PROFILE_FIELD_TYPE.URL,
  USER_PROFILE_FIELD_TYPE.SELECT,
  USER_PROFILE_FIELD_TYPE.MULTI_SELECT,
  USER_PROFILE_FIELD_TYPE.TEXTAREA,
  USER_PROFILE_FIELD_TYPE.CHECKBOX,
  USER_PROFILE_FIELD_TYPE.RADIO,
  USER_PROFILE_FIELD_TYPE.FILE,
  USER_PROFILE_FIELD_TYPE.IMAGE,
  USER_PROFILE_FIELD_TYPE.LOCATION,
  USER_PROFILE_FIELD_TYPE.SOCIAL_LINK,
]);

/**
 * User social platform schema
 */
export const userSocialPlatformSchema = z.enum([
  USER_SOCIAL_PLATFORM.FACEBOOK,
  USER_SOCIAL_PLATFORM.TWITTER,
  USER_SOCIAL_PLATFORM.INSTAGRAM,
  USER_SOCIAL_PLATFORM.LINKEDIN,
  USER_SOCIAL_PLATFORM.YOUTUBE,
  USER_SOCIAL_PLATFORM.GITHUB,
  USER_SOCIAL_PLATFORM.GITLAB,
  USER_SOCIAL_PLATFORM.STACK_OVERFLOW,
  USER_SOCIAL_PLATFORM.MEDIUM,
  USER_SOCIAL_PLATFORM.BLOG,
  USER_SOCIAL_PLATFORM.WEBSITE,
  USER_SOCIAL_PLATFORM.TIKTOK,
  USER_SOCIAL_PLATFORM.SNAPCHAT,
  USER_SOCIAL_PLATFORM.PINTEREST,
  USER_SOCIAL_PLATFORM.REDDIT,
  USER_SOCIAL_PLATFORM.DISCORD,
  USER_SOCIAL_PLATFORM.TELEGRAM,
  USER_SOCIAL_PLATFORM.WHATSAPP,
  USER_SOCIAL_PLATFORM.SIGNAL,
  USER_SOCIAL_PLATFORM.OTHER,
]);

// ============================================================
// USER PROFILE RECORD SCHEMA
// ============================================================

/**
 * Work experience schema
 */
export const userWorkExperienceSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  startDate: z.date(),
  endDate: z.date().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
});

/**
 * Education schema
 */
export const userEducationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  fieldOfStudy: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
});

/**
 * Certificate schema
 */
export const userCertificateSchema = z.object({
  name: z.string().min(1),
  issuer: z.string().min(1),
  issuedDate: z.date(),
  expiryDate: z.date().optional(),
  credentialId: z.string().optional(),
  url: urlSchema.optional(),
});

/**
 * Language schema
 */
export const userLanguageSchema = z.object({
  language: z.string().min(1),
  proficiency: z.enum(['basic', 'intermediate', 'advanced', 'fluent', 'native']),
});

/**
 * Social link schema
 */
export const userSocialLinkSchema = z.object({
  platform: userSocialPlatformSchema,
  url: urlSchema,
});

/**
 * Section visibilities schema (partial version for updates)
 */
export const userSectionVisibilitiesSchema = z.record(
  userProfileSectionSchema,
  userProfileSectionVisibilitySchema
);

/**
 * Partial section visibilities schema
 */
export const userPartialSectionVisibilitiesSchema = z
  .record(userProfileSectionSchema, userProfileSectionVisibilitySchema)
  .optional();

/**
 * User profile record schema
 */
export const userProfileRecordSchema = z.object({
  id: idSchema,
  userId: idSchema,
  visibility: userProfileVisibilitySchema,
  status: userProfileStatusSchema,
  completion: userProfileCompletionSchema,
  verificationStatus: userProfileVerificationStatusSchema,
  fullName: z.string().min(1),
  displayName: z.string().optional(),
  bio: z.string().optional(),
  profilePicture: urlSchema.optional(),
  coverPhoto: urlSchema.optional(),
  gender: userGenderSchema.optional(),
  dateOfBirth: z.date().optional(),
  maritalStatus: userMaritalStatusSchema.optional(),
  educationLevel: userEducationLevelSchema.optional(),
  employmentType: userEmploymentTypeSchema.optional(),
  industry: userIndustrySchema.optional(),
  position: z.string().optional(),
  company: z.string().optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  workExperience: z.array(userWorkExperienceSchema).optional(),
  education: z.array(userEducationSchema).optional(),
  certificates: z.array(userCertificateSchema).optional(),
  languages: z.array(userLanguageSchema).optional(),
  socialLinks: z.array(userSocialLinkSchema).optional(),
  sectionVisibilities: userSectionVisibilitiesSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  verifiedAt: timestampSchema.optional(),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// USER PROFILE REQUEST SCHEMAS
// ============================================================

/**
 * User profile update request schema
 */
export const userProfileUpdateRequestSchema = z.object({
  userId: idSchema,
  fullName: z.string().optional(),
  displayName: z.string().optional(),
  bio: z.string().optional(),
  profilePicture: urlSchema.optional(),
  coverPhoto: urlSchema.optional(),
  gender: userGenderSchema.optional(),
  dateOfBirth: z.date().optional(),
  maritalStatus: userMaritalStatusSchema.optional(),
  educationLevel: userEducationLevelSchema.optional(),
  employmentType: userEmploymentTypeSchema.optional(),
  industry: userIndustrySchema.optional(),
  position: z.string().optional(),
  company: z.string().optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  workExperience: z.array(userWorkExperienceSchema).optional(),
  education: z.array(userEducationSchema).optional(),
  certificates: z.array(userCertificateSchema).optional(),
  languages: z.array(userLanguageSchema).optional(),
  socialLinks: z.array(userSocialLinkSchema).optional(),
  sectionVisibilities: userPartialSectionVisibilitiesSchema,
  metadata: jsonObjectSchema.optional(),
});

/**
 * User profile visibility update request schema
 */
export const userProfileVisibilityUpdateRequestSchema = z.object({
  userId: idSchema,
  visibility: userProfileVisibilitySchema,
  sectionVisibilities: userPartialSectionVisibilitiesSchema,
});

// ============================================================
// USER PROFILE RESPONSE SCHEMA
// ============================================================

/**
 * User profile response schema
 */
export const userProfileResponseSchema = z.object({
  success: z.boolean(),
  profile: userProfileRecordSchema.optional(),
  error: z.string().optional(),
});

// ============================================================
// USER PROFILE FILTER SCHEMA
// ============================================================

/**
 * User profile filter schema
 */
export const userProfileFilterSchema = z.object({
  userId: idSchema.optional(),
  visibility: z
    .union([userProfileVisibilitySchema, z.array(userProfileVisibilitySchema)])
    .optional(),
  status: z.union([userProfileStatusSchema, z.array(userProfileStatusSchema)]).optional(),
  verificationStatus: z
    .union([userProfileVerificationStatusSchema, z.array(userProfileVerificationStatusSchema)])
    .optional(),
  completion: z
    .union([userProfileCompletionSchema, z.array(userProfileCompletionSchema)])
    .optional(),
  gender: z.union([userGenderSchema, z.array(userGenderSchema)]).optional(),
  industry: z.union([userIndustrySchema, z.array(userIndustrySchema)]).optional(),
  employmentType: z.union([userEmploymentTypeSchema, z.array(userEmploymentTypeSchema)]).optional(),
  educationLevel: z.union([userEducationLevelSchema, z.array(userEducationLevelSchema)]).optional(),
  search: z.string().optional(),
});

// ============================================================
// USER PROFILE SUMMARY SCHEMA
// ============================================================

/**
 * User profile summary schema
 */
export const userProfileSummarySchema = z.object({
  userId: idSchema,
  status: userProfileStatusSchema,
  completion: userProfileCompletionSchema,
  verificationStatus: userProfileVerificationStatusSchema,
  visibility: userProfileVisibilitySchema,
  profilePicture: urlSchema.optional(),
  displayName: z.string().optional(),
  bio: z.string().optional(),
  skillsCount: z.number().int().min(0),
  socialLinksCount: z.number().int().min(0),
  workExperienceCount: z.number().int().min(0),
  educationCount: z.number().int().min(0),
  languagesCount: z.number().int().min(0),
  certificatesCount: z.number().int().min(0),
  achievementsCount: z.number().int().min(0),
  updatedAt: timestampSchema,
});

// ============================================================
// TYPE INFERENCES
// ============================================================

export type UserProfileVisibility = z.infer<typeof userProfileVisibilitySchema>;
export type UserProfileSection = z.infer<typeof userProfileSectionSchema>;
export type UserProfileSectionVisibility = z.infer<typeof userProfileSectionVisibilitySchema>;
export type UserGender = z.infer<typeof userGenderSchema>;
export type UserMaritalStatus = z.infer<typeof userMaritalStatusSchema>;
export type UserEducationLevel = z.infer<typeof userEducationLevelSchema>;
export type UserEmploymentType = z.infer<typeof userEmploymentTypeSchema>;
export type UserIndustry = z.infer<typeof userIndustrySchema>;
export type UserProfileStatus = z.infer<typeof userProfileStatusSchema>;
export type UserProfileCompletion = z.infer<typeof userProfileCompletionSchema>;
export type UserProfileVerificationStatus = z.infer<typeof userProfileVerificationStatusSchema>;
export type UserProfileFieldType = z.infer<typeof userProfileFieldTypeSchema>;
export type UserSocialPlatform = z.infer<typeof userSocialPlatformSchema>;
export type UserWorkExperience = z.infer<typeof userWorkExperienceSchema>;
export type UserEducation = z.infer<typeof userEducationSchema>;
export type UserCertificate = z.infer<typeof userCertificateSchema>;
export type UserLanguage = z.infer<typeof userLanguageSchema>;
export type UserSocialLink = z.infer<typeof userSocialLinkSchema>;
export type UserProfileRecord = z.infer<typeof userProfileRecordSchema>;
export type UserProfileUpdateRequest = z.infer<typeof userProfileUpdateRequestSchema>;
export type UserProfileVisibilityUpdateRequest = z.infer<
  typeof userProfileVisibilityUpdateRequestSchema
>;
export type UserProfileResponse = z.infer<typeof userProfileResponseSchema>;
export type UserProfileFilter = z.infer<typeof userProfileFilterSchema>;
export type UserProfileSummary = z.infer<typeof userProfileSummarySchema>;

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
  const labels: Record<UserProfileVisibility, string> = {
    public: 'Public',
    registered_only: 'Registered Users Only',
    connections_only: 'Connections Only',
    private: 'Private',
    admin_only: 'Admin Only',
  };
  return labels[visibility] || visibility;
}

/**
 * Get user gender display name
 */
export function getUserGenderDisplayName(gender: UserGender): string {
  const labels: Record<UserGender, string> = {
    male: 'Male',
    female: 'Female',
    other: 'Other',
    prefer_not_to_say: 'Prefer Not to Say',
  };
  return labels[gender] || gender;
}

/**
 * Get user marital status display name
 */
export function getUserMaritalStatusDisplayName(status: UserMaritalStatus): string {
  const labels: Record<UserMaritalStatus, string> = {
    single: 'Single',
    married: 'Married',
    divorced: 'Divorced',
    widowed: 'Widowed',
    separated: 'Separated',
    prefer_not_to_say: 'Prefer Not to Say',
  };
  return labels[status] || status;
}

/**
 * Get user education level display name
 */
export function getUserEducationLevelDisplayName(level: UserEducationLevel): string {
  const labels: Record<UserEducationLevel, string> = {
    no_formal: 'No Formal Education',
    primary: 'Primary Education',
    secondary: 'Secondary Education',
    high_school: 'High School',
    college: 'College',
    bachelors: "Bachelor's Degree",
    masters: "Master's Degree",
    doctorate: 'Doctorate',
    professional: 'Professional Degree',
    other: 'Other',
  };
  return labels[level] || level;
}

/**
 * Get user employment type display name
 */
export function getUserEmploymentTypeDisplayName(type: UserEmploymentType): string {
  const labels: Record<UserEmploymentType, string> = {
    full_time: 'Full Time',
    part_time: 'Part Time',
    contract: 'Contract',
    freelance: 'Freelance',
    internship: 'Internship',
    self_employed: 'Self Employed',
    unemployed: 'Unemployed',
    retired: 'Retired',
    student: 'Student',
    other: 'Other',
  };
  return labels[type] || type;
}

/**
 * Get user industry display name
 */
export function getUserIndustryDisplayName(industry: UserIndustry): string {
  const labels: Record<UserIndustry, string> = {
    technology: 'Technology',
    healthcare: 'Healthcare',
    education: 'Education',
    finance: 'Finance',
    retail: 'Retail',
    manufacturing: 'Manufacturing',
    construction: 'Construction',
    transportation: 'Transportation',
    hospitality: 'Hospitality',
    entertainment: 'Entertainment',
    media: 'Media',
    agriculture: 'Agriculture',
    energy: 'Energy',
    telecommunications: 'Telecommunications',
    real_estate: 'Real Estate',
    legal: 'Legal',
    consulting: 'Consulting',
    non_profit: 'Non-Profit',
    government: 'Government',
    military: 'Military',
    other: 'Other',
  };
  return labels[industry] || industry;
}

/**
 * Get user profile status display name
 */
export function getUserProfileStatusDisplayName(status: UserProfileStatus): string {
  const labels: Record<UserProfileStatus, string> = {
    active: 'Active',
    incomplete: 'Incomplete',
    pending: 'Pending Review',
    flagged: 'Flagged',
    suspended: 'Suspended',
    deleted: 'Deleted',
    archived: 'Archived',
  };
  return labels[status] || status;
}

/**
 * Get user profile completion display name
 */
export function getUserProfileCompletionDisplayName(completion: UserProfileCompletion): string {
  const labels: Record<UserProfileCompletion, string> = {
    minimal: 'Minimal',
    basic: 'Basic',
    intermediate: 'Intermediate',
    comprehensive: 'Comprehensive',
    complete: 'Complete',
  };
  return labels[completion] || completion;
}

/**
 * Get user profile verification status display name
 */
export function getUserProfileVerificationStatusDisplayName(
  status: UserProfileVerificationStatus
): string {
  const labels: Record<UserProfileVerificationStatus, string> = {
    unverified: 'Unverified',
    verified: 'Verified',
    pending: 'Verification Pending',
    failed: 'Verification Failed',
    requires_review: 'Requires Review',
  };
  return labels[status] || status;
}

/**
 * Get user profile field type display name
 */
export function getUserProfileFieldTypeDisplayName(type: UserProfileFieldType): string {
  const labels: Record<UserProfileFieldType, string> = {
    text: 'Text',
    number: 'Number',
    date: 'Date',
    email: 'Email',
    phone: 'Phone',
    url: 'URL',
    select: 'Select',
    multi_select: 'Multi-Select',
    textarea: 'Text Area',
    checkbox: 'Checkbox',
    radio: 'Radio',
    file: 'File',
    image: 'Image',
    location: 'Location',
    social_link: 'Social Link',
  };
  return labels[type] || type;
}

/**
 * Get user social platform display name
 */
export function getUserSocialPlatformDisplayName(platform: UserSocialPlatform): string {
  const labels: Record<UserSocialPlatform, string> = {
    facebook: 'Facebook',
    twitter: 'Twitter / X',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
    github: 'GitHub',
    gitlab: 'GitLab',
    stack_overflow: 'Stack Overflow',
    medium: 'Medium',
    blog: 'Blog',
    website: 'Website',
    tiktok: 'TikTok',
    snapchat: 'Snapchat',
    pinterest: 'Pinterest',
    reddit: 'Reddit',
    discord: 'Discord',
    telegram: 'Telegram',
    whatsapp: 'WhatsApp',
    signal: 'Signal',
    other: 'Other',
  };
  return labels[platform] || platform;
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
    const value = profile[field as keyof typeof profile];
    if (value !== undefined && value !== null && value !== '') {
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
