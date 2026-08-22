/**
 * Authentication Password Constants
 * Password management configuration
 */

export const AUTH_PASSWORD = {
  // Password configuration
  CONFIG: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 72,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL_CHAR: true,
    BCRYPT_ROUNDS: 12,
    HISTORY_LIMIT: 5,
    MAX_AGE_DAYS: 90,
    MIN_AGE_HOURS: 24,
    LOCKOUT_ATTEMPTS: 5,
    LOCKOUT_DURATION: 3600, // 1 hour
  },

  // Password strength
  STRENGTH: {
    WEAK: 'weak',
    MEDIUM: 'medium',
    STRONG: 'strong',
    VERY_STRONG: 'very_strong',
  },

  // Password errors
  ERRORS: {
    TOO_SHORT: 'password_too_short',
    TOO_LONG: 'password_too_long',
    NO_UPPERCASE: 'password_no_uppercase',
    NO_LOWERCASE: 'password_no_lowercase',
    NO_NUMBER: 'password_no_number',
    NO_SPECIAL_CHAR: 'password_no_special_char',
    CONTAINS_WHITESPACE: 'password_contains_whitespace',
    CONTAINS_USERNAME: 'password_contains_username',
    CONTAINS_EMAIL: 'password_contains_email',
    CONTAINS_COMMON: 'password_contains_common',
    PREVIOUSLY_USED: 'password_previously_used',
    EXPIRED: 'password_expired',
    TOO_NEW: 'password_too_new',
  },

  // Special characters
  SPECIAL_CHARS: '!@#$%^&*()_+-=[]{}|;:,.<>?',

  // Common passwords (top 100 most common)
  COMMON_PASSWORDS: [
    'password',
    '123456',
    '12345678',
    '123456789',
    '12345',
    '1234567',
    'qwerty',
    'abc123',
    'password1',
    '111111',
    '123123',
    'admin',
    'letmein',
    'welcome',
    'monkey',
    'dragon',
    'master',
    'hello',
    'freedom',
    'whatever',
    'password123',
    'qwerty123',
    '1234567890',
    'iloveyou',
    'sunshine',
    'princess',
    'football',
    'baseball',
    'batman',
    'superman',
    'hockey',
    'pokemon',
    'starwars',
    'pepper',
    'cheese',
    'shadow',
    'ashley',
    'michael',
    'daniel',
    'jessica',
    'charlie',
    'andrew',
    'thomas',
    'robert',
    'jennifer',
    'amanda',
    'katherine',
    'jordan',
    'nicholas',
    'victoria',
    'christina',
    'brandon',
    'ryan',
    'david',
    'john',
    'james',
    'joseph',
    'matthew',
    'anthony',
    'william',
    'richard',
    'charles',
    'patrick',
    'jonathan',
    'sean',
    'austin',
    'brian',
    'kevin',
    'zachary',
    'justin',
    'tyler',
    'cameron',
    'dylan',
    'cody',
    'kyle',
    'morgan',
    'joshua',
    'timothy',
    'adam',
    'benjamin',
    'samuel',
    'alexander',
    'jackson',
    'aiden',
    'logan',
    'jayden',
    'noah',
    'liam',
    'mason',
    'ethan',
    'oliver',
    'jacob',
    'carter',
    'lucas',
    'aidan',
    'connor',
    'gavin',
    'brayden',
    'julian',
    'landon',
  ] as const,
} as const;

export type AuthPasswordStrength =
  (typeof AUTH_PASSWORD.STRENGTH)[keyof typeof AUTH_PASSWORD.STRENGTH];
export type AuthPasswordError = (typeof AUTH_PASSWORD.ERRORS)[keyof typeof AUTH_PASSWORD.ERRORS];
export type CommonPassword = (typeof AUTH_PASSWORD.COMMON_PASSWORDS)[number];

export const REQUIRED_CHARACTERS = {
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  NUMBER: /\d/,
  SPECIAL_CHAR: /[!@#$%^&*()_+-=[]{}|;:,.<>?]/,
  WHITESPACE: /\s/,
};

export function getPasswordMinLength(): number {
  return AUTH_PASSWORD.CONFIG.MIN_LENGTH;
}

export function getPasswordMaxLength(): number {
  return AUTH_PASSWORD.CONFIG.MAX_LENGTH;
}

export function getPasswordStrength(value: string): AuthPasswordStrength {
  if (value.length < AUTH_PASSWORD.CONFIG.MIN_LENGTH) {
    return AUTH_PASSWORD.STRENGTH.WEAK;
  }

  let score = 0;

  // Length scoring
  if (value.length >= 12) score += 2;
  else if (value.length >= 9) score += 1;

  // Character diversity scoring
  if (/[A-Z]/.test(value)) score += 1;
  if (/[a-z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[!@#$%^&*()_+-=[]{}|;:,.<>?]/.test(value)) score += 1;

  // Uniqueness scoring
  const uniqueChars = new Set(value).size;
  if (uniqueChars >= 8) score += 1;
  if (uniqueChars >= 12) score += 1;

  // Score thresholds
  if (score >= 6) return AUTH_PASSWORD.STRENGTH.VERY_STRONG;
  if (score >= 4) return AUTH_PASSWORD.STRENGTH.STRONG;
  if (score >= 2) return AUTH_PASSWORD.STRENGTH.MEDIUM;
  return AUTH_PASSWORD.STRENGTH.WEAK;
}

export function validatePassword(value: string): AuthPasswordError[] {
  const errors: AuthPasswordError[] = [];

  if (value.length < AUTH_PASSWORD.CONFIG.MIN_LENGTH) {
    errors.push(AUTH_PASSWORD.ERRORS.TOO_SHORT);
  }

  if (value.length > AUTH_PASSWORD.CONFIG.MAX_LENGTH) {
    errors.push(AUTH_PASSWORD.ERRORS.TOO_LONG);
  }

  if (AUTH_PASSWORD.CONFIG.REQUIRE_UPPERCASE && !/[A-Z]/.test(value)) {
    errors.push(AUTH_PASSWORD.ERRORS.NO_UPPERCASE);
  }

  if (AUTH_PASSWORD.CONFIG.REQUIRE_LOWERCASE && !/[a-z]/.test(value)) {
    errors.push(AUTH_PASSWORD.ERRORS.NO_LOWERCASE);
  }

  if (AUTH_PASSWORD.CONFIG.REQUIRE_NUMBER && !/\d/.test(value)) {
    errors.push(AUTH_PASSWORD.ERRORS.NO_NUMBER);
  }

  if (AUTH_PASSWORD.CONFIG.REQUIRE_SPECIAL_CHAR && !/[!@#$%^&*()_+-=[]{}|;:,.<>?]/.test(value)) {
    errors.push(AUTH_PASSWORD.ERRORS.NO_SPECIAL_CHAR);
  }

  if (/\s/.test(value)) {
    errors.push(AUTH_PASSWORD.ERRORS.CONTAINS_WHITESPACE);
  }

  return errors;
}

export function isPasswordValid(value: string): boolean {
  return validatePassword(value).length === 0;
}

export function isPasswordCommon(value: string): boolean {
  const commonPasswords: readonly string[] = AUTH_PASSWORD.COMMON_PASSWORDS;
  return commonPasswords.includes(value.toLowerCase());
}

export function isPasswordExpired(createdAt: Date): boolean {
  const age = (Date.now() - createdAt.getTime()) / (24 * 3600 * 1000);
  return age > AUTH_PASSWORD.CONFIG.MAX_AGE_DAYS;
}

export function isPasswordTooNew(createdAt: Date): boolean {
  const age = (Date.now() - createdAt.getTime()) / 3600;
  return age < AUTH_PASSWORD.CONFIG.MIN_AGE_HOURS;
}

export function getPasswordRemainingDays(createdAt: Date): number {
  const age = (Date.now() - createdAt.getTime()) / (24 * 3600 * 1000);
  return Math.max(0, AUTH_PASSWORD.CONFIG.MAX_AGE_DAYS - age);
}

export function getPasswordErrorMessage(error: AuthPasswordError): string {
  const messages: Record<AuthPasswordError, string> = {
    [AUTH_PASSWORD.ERRORS.TOO_SHORT]:
      `Password must be at least ${AUTH_PASSWORD.CONFIG.MIN_LENGTH} characters`,
    [AUTH_PASSWORD.ERRORS.TOO_LONG]:
      `Password must be at most ${AUTH_PASSWORD.CONFIG.MAX_LENGTH} characters`,
    [AUTH_PASSWORD.ERRORS.NO_UPPERCASE]: 'Password must contain at least one uppercase letter',
    [AUTH_PASSWORD.ERRORS.NO_LOWERCASE]: 'Password must contain at least one lowercase letter',
    [AUTH_PASSWORD.ERRORS.NO_NUMBER]: 'Password must contain at least one number',
    [AUTH_PASSWORD.ERRORS.NO_SPECIAL_CHAR]: 'Password must contain at least one special character',
    [AUTH_PASSWORD.ERRORS.CONTAINS_WHITESPACE]: 'Password must not contain whitespace',
    [AUTH_PASSWORD.ERRORS.CONTAINS_USERNAME]: 'Password must not contain username',
    [AUTH_PASSWORD.ERRORS.CONTAINS_EMAIL]: 'Password must not contain email',
    [AUTH_PASSWORD.ERRORS.CONTAINS_COMMON]: 'Password is too common',
    [AUTH_PASSWORD.ERRORS.PREVIOUSLY_USED]: 'Password has been used before',
    [AUTH_PASSWORD.ERRORS.EXPIRED]: 'Password has expired',
    [AUTH_PASSWORD.ERRORS.TOO_NEW]: 'Password was recently changed',
  };

  return messages[error] || 'Invalid password';
}

export function getPasswordStrengthLabel(strength: AuthPasswordStrength): string {
  const labels: Record<AuthPasswordStrength, string> = {
    [AUTH_PASSWORD.STRENGTH.WEAK]: 'Weak',
    [AUTH_PASSWORD.STRENGTH.MEDIUM]: 'Medium',
    [AUTH_PASSWORD.STRENGTH.STRONG]: 'Strong',
    [AUTH_PASSWORD.STRENGTH.VERY_STRONG]: 'Very Strong',
  };

  return labels[strength] || 'Unknown';
}

export function getPasswordStrengthColor(strength: AuthPasswordStrength): string {
  const colors: Record<AuthPasswordStrength, string> = {
    [AUTH_PASSWORD.STRENGTH.WEAK]: '#EF4444',
    [AUTH_PASSWORD.STRENGTH.MEDIUM]: '#F59E0B',
    [AUTH_PASSWORD.STRENGTH.STRONG]: '#10B981',
    [AUTH_PASSWORD.STRENGTH.VERY_STRONG]: '#059669',
  };

  return colors[strength] || '#6B7280';
}
