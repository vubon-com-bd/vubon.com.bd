// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Minimum password length
 */
export const PASSWORD_MIN_LENGTH = 8;

/**
 * Maximum password length
 */
export const PASSWORD_MAX_LENGTH = 64;

/**
 * Require uppercase letters in password
 */
export const PASSWORD_REQUIRE_UPPERCASE = true;

/**
 * Require lowercase letters in password
 */
export const PASSWORD_REQUIRE_LOWERCASE = true;

/**
 * Require numbers in password
 */
export const PASSWORD_REQUIRE_NUMBER = true;

/**
 * Require special characters in password
 */
export const PASSWORD_REQUIRE_SPECIAL = true;

/**
 * Bcrypt salt rounds for password hashing
 */
export const PASSWORD_BCRYPT_ROUNDS = 12;

/**
 * Password policy configuration
 */
export const PASSWORD_POLICY = {
  MIN_LENGTH: PASSWORD_MIN_LENGTH,
  MAX_LENGTH: PASSWORD_MAX_LENGTH,
  REQUIRE_UPPERCASE: PASSWORD_REQUIRE_UPPERCASE,
  REQUIRE_LOWERCASE: PASSWORD_REQUIRE_LOWERCASE,
  REQUIRE_NUMBER: PASSWORD_REQUIRE_NUMBER,
  REQUIRE_SPECIAL: PASSWORD_REQUIRE_SPECIAL,
  BCRYPT_ROUNDS: PASSWORD_BCRYPT_ROUNDS,
} as const;

/**
 * Password validation messages
 */
export const PASSWORD_VALIDATION_MESSAGES = {
  MIN_LENGTH: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
  MAX_LENGTH: `Password must not exceed ${PASSWORD_MAX_LENGTH} characters`,
  REQUIRE_UPPERCASE: 'Password must contain at least one uppercase letter',
  REQUIRE_LOWERCASE: 'Password must contain at least one lowercase letter',
  REQUIRE_NUMBER: 'Password must contain at least one number',
  REQUIRE_SPECIAL: 'Password must contain at least one special character',
} as const;

/**
 * Type for password policy
 */
export type PasswordPolicy = typeof PASSWORD_POLICY;

/**
 * Type for password validation messages
 */
export type PasswordValidationMessages = typeof PASSWORD_VALIDATION_MESSAGES;
