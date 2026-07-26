/**
 * Authentication related constants for the registration feature
 * All constants are immutable and exported as const assertions for strict type safety
 */

/**
 * Password validation constants
 */
export const PASSWORD_MIN_LENGTH = 8 as const;
export const PASSWORD_MAX_LENGTH = 72 as const;

/**
 * Password pattern: At least 8 characters, at least one uppercase letter,
 * one lowercase letter, one number, and one special character
 * Uses positive lookahead for complexity validation
 */
export const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,72}$/ as const;

/**
 * User status enumeration
 * Used to track the state of user accounts throughout their lifecycle
 */
export const USER_STATUS = {
  PENDING_VERIFICATION: 'PENDING_VERIFICATION',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  DEACTIVATED: 'DEACTIVATED',
} as const;

/**
 * Type inference for UserStatus union type
 * Can be used with typeof USER_STATUS[keyof typeof USER_STATUS]
 */
export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];

/**
 * Default role assigned to newly registered users
 * Roles determine permissions and access levels within the system
 */
export const DEFAULT_ROLE = 'CUSTOMER' as const;
export const USER_ROLES = {
  CUSTOMER: 'CUSTOMER',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
