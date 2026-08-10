// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User profile status enum
 */
export const USER_PROFILE_STATUS = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  FRIENDS_ONLY: 'friends_only',
  RESTRICTED: 'restricted',
  HIDDEN: 'hidden',
} as const;

/**
 * Profile is visible to everyone
 */
export const USER_PROFILE_STATUS_PUBLIC = USER_PROFILE_STATUS.PUBLIC;

/**
 * Profile is visible only to the user themselves
 */
export const USER_PROFILE_STATUS_PRIVATE = USER_PROFILE_STATUS.PRIVATE;

/**
 * Profile is visible only to friends
 */
export const USER_PROFILE_STATUS_FRIENDS_ONLY = USER_PROFILE_STATUS.FRIENDS_ONLY;

/**
 * Profile has limited visibility
 */
export const USER_PROFILE_STATUS_RESTRICTED = USER_PROFILE_STATUS.RESTRICTED;

/**
 * Profile is hidden
 */
export const USER_PROFILE_STATUS_HIDDEN = USER_PROFILE_STATUS.HIDDEN;

/**
 * Type for user profile status
 */
export type UserProfileStatus = (typeof USER_PROFILE_STATUS)[keyof typeof USER_PROFILE_STATUS];
