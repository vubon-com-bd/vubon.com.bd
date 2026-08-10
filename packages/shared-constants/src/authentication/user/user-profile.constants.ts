// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Maximum profile image size in MB
 */
export const USER_PROFILE_MAX_IMAGE_SIZE = 5;

/**
 * Allowed profile image types
 */
export const USER_PROFILE_ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
] as const;

/**
 * Maximum cover photo size in MB
 */
export const USER_PROFILE_MAX_COVER_SIZE = 10;

/**
 * Allowed cover photo types
 */
export const USER_PROFILE_ALLOWED_COVER_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
] as const;

/**
 * Profile image dimensions (width x height in pixels)
 */
export const USER_PROFILE_IMAGE_DIMENSIONS = {
  width: 400,
  height: 400,
} as const;

/**
 * Cover photo dimensions (width x height in pixels)
 */
export const USER_PROFILE_COVER_DIMENSIONS = {
  width: 1200,
  height: 400,
} as const;

/**
 * User profile configuration
 */
export const USER_PROFILE_CONFIG = {
  MAX_IMAGE_SIZE: USER_PROFILE_MAX_IMAGE_SIZE,
  ALLOWED_IMAGE_TYPES: USER_PROFILE_ALLOWED_IMAGE_TYPES,
  MAX_COVER_SIZE: USER_PROFILE_MAX_COVER_SIZE,
  ALLOWED_COVER_TYPES: USER_PROFILE_ALLOWED_COVER_TYPES,
  IMAGE_DIMENSIONS: USER_PROFILE_IMAGE_DIMENSIONS,
  COVER_DIMENSIONS: USER_PROFILE_COVER_DIMENSIONS,
} as const;

/**
 * Type for allowed image type
 */
export type UserProfileAllowedImageType = (typeof USER_PROFILE_ALLOWED_IMAGE_TYPES)[number];

/**
 * Type for allowed cover type
 */
export type UserProfileAllowedCoverType = (typeof USER_PROFILE_ALLOWED_COVER_TYPES)[number];

/**
 * Type for image dimensions
 */
export type UserProfileImageDimensions = typeof USER_PROFILE_IMAGE_DIMENSIONS;

/**
 * Type for cover dimensions
 */
export type UserProfileCoverDimensions = typeof USER_PROFILE_COVER_DIMENSIONS;

/**
 * Type for user profile configuration
 */
export type UserProfileConfig = typeof USER_PROFILE_CONFIG;
