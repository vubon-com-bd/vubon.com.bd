/**
 * Auth Password Constants
 * প্রমাণীকরণ পাসওয়ার্ড সম্পর্কিত কনস্ট্যান্টস
 */

export const AUTH_PASSWORD = {
  // Strength levels
  STRENGTH: {
    WEAK: 'weak',
    MEDIUM: 'medium',
    STRONG: 'strong',
    VERY_STRONG: 'very_strong',
  },

  // Default password policies
  POLICY: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 32,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL_CHAR: true,
    ALLOW_WHITESPACE: false,
    DISALLOW_COMMON: true,
    DISALLOW_REPEATED: true,
    DISALLOW_SEQUENTIAL: true,
    DISALLOW_PERSONAL_INFO: true,
    HISTORY_COUNT: 5, // Store last 5 passwords
    MAX_AGE: 90, // 90 days
    MIN_AGE: 1, // 1 day
  },

  // Password reset
  RESET: {
    TOKEN_LENGTH: 32,
    TOKEN_EXPIRY: 3600, // 1 hour
    MAX_REQUESTS: 3,
    REQUEST_COOLDOWN: 300, // 5 minutes
  },

  // Password hashing
  HASHING: {
    ALGORITHM: 'bcrypt',
    SALT_ROUNDS: 12,
    PEPPER_ENABLED: true,
  },
} as const;

export type AuthPasswordStrength =
  (typeof AUTH_PASSWORD.STRENGTH)[keyof typeof AUTH_PASSWORD.STRENGTH];
