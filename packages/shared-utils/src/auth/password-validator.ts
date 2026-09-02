/**
 * Auth Password Validator
 * প্রমীকরণ পাসওয়ার্ড ভ্যালিডেটর
 */

import { REGEX, AUTH_PASSWORD } from '@vubon/shared-constants';
import { AuthPasswordHasher } from './password-hasher';

export const AuthPasswordValidator = {
  /**
   * Validate password against requirements
   * প্রয়োজনীয়তা অনুযায়ী পাসওয়ার্ড ভ্যালিডেট করা
   */
  validate: (password: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const policy = AUTH_PASSWORD.POLICY;

    if (!password || password.length === 0) {
      errors.push('Password is required');
      return { valid: false, errors };
    }

    if (password.length < policy.MIN_LENGTH) {
      errors.push(`Password must be at least ${policy.MIN_LENGTH} characters long`);
    }

    if (password.length > policy.MAX_LENGTH) {
      errors.push(`Password must be less than ${policy.MAX_LENGTH} characters`);
    }

    if (policy.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (policy.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (policy.REQUIRE_NUMBER && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (policy.REQUIRE_SPECIAL_CHAR && !/[^A-Za-z0-9]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    if (policy.ALLOW_WHITESPACE === false && /\s/.test(password)) {
      errors.push('Password cannot contain whitespace');
    }

    if (policy.DISALLOW_COMMON && AuthPasswordHasher.isCommonPassword(password)) {
      errors.push('Password is too common');
    }

    if (policy.DISALLOW_REPEATED && /(.)\1{2,}/.test(password)) {
      errors.push('Password contains repeated characters');
    }

    if (
      policy.DISALLOW_SEQUENTIAL &&
      /(?:012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(
        password
      )
    ) {
      errors.push('Password contains sequential characters');
    }

    // Check for personal info (simplified)
    if (
      policy.DISALLOW_PERSONAL_INFO &&
      /(?:name|user|admin|test|password|123|abc)/i.test(password)
    ) {
      errors.push('Password contains personal information');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Check if password matches regex pattern
   * পাসওয়ার্ড রেজেক্স প্যাটার্নের সাথে মেলে কিনা চেক করা
   */
  matchesPattern: (password: string): boolean => {
    return REGEX.PASSWORD.test(password);
  },

  /**
   * Calculate password strength
   * পাসওয়ার্ড শক্তি ক্যালকুলেট করা
   */
  calculateStrength: (
    password: string
  ): { score: number; label: string; suggestions: string[] } => {
    let score = 0;
    const suggestions: string[] = [];

    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    // Character variety checks
    if (/[a-z]/.test(password)) score += 1;
    else suggestions.push('Add lowercase letters');

    if (/[A-Z]/.test(password)) score += 1;
    else suggestions.push('Add uppercase letters');

    if (/\d/.test(password)) score += 1;
    else suggestions.push('Add numbers');

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else suggestions.push('Add special characters');

    // Additional checks
    if (!/(.)\1{2,}/.test(password)) score += 1;
    else suggestions.push('Avoid repeated characters');

    if (
      !/(?:012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(
        password
      )
    ) {
      score += 1;
    } else {
      suggestions.push('Avoid sequential characters');
    }

    // Normalize score to 0-10
    score = Math.min(score, 10);

    let label = '';
    if (score >= 8) label = 'Very Strong';
    else if (score >= 6) label = 'Strong';
    else if (score >= 4) label = 'Medium';
    else if (score >= 2) label = 'Weak';
    else label = 'Very Weak';

    return { score, label, suggestions };
  },

  /**
   * Get password policy message
   * পাসওয়ার্ড পলিসি মেসেজ পাওয়া
   */
  getPolicyMessage: (): string => {
    const policy = AUTH_PASSWORD.POLICY;
    const requirements = [];

    if (policy.MIN_LENGTH) {
      requirements.push(`at least ${policy.MIN_LENGTH} characters`);
    }
    if (policy.REQUIRE_UPPERCASE) {
      requirements.push('one uppercase letter');
    }
    if (policy.REQUIRE_LOWERCASE) {
      requirements.push('one lowercase letter');
    }
    if (policy.REQUIRE_NUMBER) {
      requirements.push('one number');
    }
    if (policy.REQUIRE_SPECIAL_CHAR) {
      requirements.push('one special character');
    }

    return `Password must contain ${requirements.join(', ')}`;
  },
};
