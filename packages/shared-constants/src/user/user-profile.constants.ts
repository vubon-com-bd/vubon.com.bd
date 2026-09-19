export const USER_PROFILE = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  BIO_MAX_LENGTH: 500,
  AVATAR_MAX_SIZE_MB: 5,
  COVER_MAX_SIZE_MB: 10,
  WEBSITE_MAX_LENGTH: 255,
  COMPANY_MAX_LENGTH: 150,
  DESIGNATION_MAX_LENGTH: 100,
} as const;

export const USER_PROFILE_VISIBILITY = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  FRIENDS: 'friends',
  FOLLOWERS: 'followers',
  ONLY_ME: 'only_me',
} as const;

export const USER_GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
  PREFER_NOT_TO_SAY: 'prefer_not_to_say',
} as const;

export type UserProfileVisibilityType =
  (typeof USER_PROFILE_VISIBILITY)[keyof typeof USER_PROFILE_VISIBILITY];
export type UserGenderType = (typeof USER_GENDER)[keyof typeof USER_GENDER];
