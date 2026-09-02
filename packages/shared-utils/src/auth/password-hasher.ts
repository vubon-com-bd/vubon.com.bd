/**
 * Auth Password Hasher
 * প্রমাণীকরণ পাসওয়ার্ড হ্যাশার
 */

import { AUTH_PASSWORD } from '@vubon/shared-constants';

export const AuthPasswordHasher = {
  /**
   * Hash password using bcrypt
   * বিসিrypt ব্যবহার করে পাসওয়ার্ড হ্যাশ করা
   */
  hash: async (
    password: string,
    saltRounds: number = AUTH_PASSWORD.HASHING.SALT_ROUNDS
  ): Promise<string> => {
    // In real implementation, use bcrypt library
    // This is a simplified version for demonstration
    const encoder = new TextEncoder();
    const data = encoder.encode(password + AUTH_PASSWORD.HASHING.PEPPER_ENABLED ? 'pepper' : '');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    return `$2b$${saltRounds}$${hashHex}`;
  },

  /**
   * Verify password against hash
   * হ্যাশের সাথে পাসওয়ার্ড ভেরিফাই করা
   */
  verify: async (password: string, hash: string): Promise<boolean> => {
    // In real implementation, use bcrypt compare
    // This is a simplified version
    const saltRounds = parseInt(hash.split('$')[2] || '12');
    const newHash = await AuthPasswordHasher.hash(password, saltRounds);
    return hash === newHash;
  },

  /**
   * Check if password is strong
   * পাসওয়ার্ড শক্তিশালী কিনা চেক করা
   */
  isStrong: (password: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const policy = AUTH_PASSWORD.POLICY;

    if (password.length < policy.MIN_LENGTH) {
      errors.push(`Password must be at least ${policy.MIN_LENGTH} characters`);
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

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Check if password is common
   * পাসওয়ার্ড সাধারণ কিনা চেক করা
   */
  isCommonPassword: (password: string): boolean => {
    const commonPasswords = [
      'password',
      '123456',
      '12345678',
      'qwerty',
      'abc123',
      'monkey',
      'letmein',
      'dragon',
      '111111',
      'baseball',
      'iloveyou',
      'trustno1',
      '1234567',
      'sunshine',
      'master',
      '123123',
      'welcome',
      'shadow',
      'ashley',
      'football',
      'jesus',
      'michael',
      'ninja',
      'mustang',
      'password1',
      'admin',
      '123456789',
      '1234567890',
      '12345',
      '1234',
    ];
    return commonPasswords.includes(password.toLowerCase());
  },

  /**
   * Generate random password
   * র্যান্ডম পাসওয়ার্ড তৈরি করা
   */
  generateRandom: (length: number = AUTH_PASSWORD.POLICY.MIN_LENGTH): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
  },
};
