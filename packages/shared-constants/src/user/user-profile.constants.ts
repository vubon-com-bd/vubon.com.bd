/**
 * User Profile Constants
 * ইউজার প্রোফাইল সম্পর্কিত কনস্ট্যান্টস
 */

export const USER_PROFILE = {
  // Profile visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    CONTACTS: 'contacts',
    FRIENDS: 'friends',
    CUSTOM: 'custom',
  },

  // Gender options
  GENDER: {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other',
    PREFER_NOT_TO_SAY: 'prefer_not_to_say',
  },

  // Relationship status
  RELATIONSHIP: {
    SINGLE: 'single',
    MARRIED: 'married',
    DIVORCED: 'divorced',
    WIDOWED: 'widowed',
    IN_RELATIONSHIP: 'in_relationship',
    ENGAGED: 'engaged',
    COMPLICATED: 'complicated',
  },

  // Education levels
  EDUCATION: {
    NONE: 'none',
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    HIGHER_SECONDARY: 'higher_secondary',
    GRADUATE: 'graduate',
    POST_GRADUATE: 'post_graduate',
    DOCTORATE: 'doctorate',
    PROFESSIONAL: 'professional',
  },

  // Employment types
  EMPLOYMENT: {
    FULL_TIME: 'full_time',
    PART_TIME: 'part_time',
    SELF_EMPLOYED: 'self_employed',
    FREELANCE: 'freelance',
    CONTRACT: 'contract',
    INTERN: 'intern',
    UNEMPLOYED: 'unemployed',
    RETIRED: 'retired',
    STUDENT: 'student',
  },

  // Default values
  DEFAULTS: {
    BIO: '',
    VISIBILITY: 'public',
    GENDER: 'prefer_not_to_say',
    AVATAR: 'default-avatar.png',
    COVER: 'default-cover.jpg',
  },

  // Validation rules
  VALIDATION: {
    BIO_MAX_LENGTH: 500,
    LOCATION_MAX_LENGTH: 100,
    WEBSITE_MAX_LENGTH: 100,
    COMPANY_MAX_LENGTH: 100,
    POSITION_MAX_LENGTH: 100,
  },
} as const;

export type UserProfileVisibility =
  (typeof USER_PROFILE.VISIBILITY)[keyof typeof USER_PROFILE.VISIBILITY];
export type UserProfileGender = (typeof USER_PROFILE.GENDER)[keyof typeof USER_PROFILE.GENDER];
export type UserProfileRelationship =
  (typeof USER_PROFILE.RELATIONSHIP)[keyof typeof USER_PROFILE.RELATIONSHIP];
export type UserProfileEducation =
  (typeof USER_PROFILE.EDUCATION)[keyof typeof USER_PROFILE.EDUCATION];
export type UserProfileEmployment =
  (typeof USER_PROFILE.EMPLOYMENT)[keyof typeof USER_PROFILE.EMPLOYMENT];
