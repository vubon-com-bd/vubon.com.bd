/**
 * User Validator
 * ইউজার ভ্যালিডেটর
 */

import { REGEX } from '@vubon/shared-constants';
import { User, UserCreateInput, UserUpdateInput } from '@vubon/shared-types';

export const UserValidator = {
  /**
   * Validate user data
   * ইউজার ডেটা ভ্যালিডেট করা
   */
  validate: (data: Partial<User>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (data.email && !REGEX.EMAIL.test(data.email)) {
      errors.push('Invalid email format');
    }

    if (data.phone && !REGEX.PHONE.test(data.phone)) {
      errors.push('Invalid phone number');
    }

    if (data.name && (data.name.length < 2 || data.name.length > 100)) {
      errors.push('Name must be between 2 and 100 characters');
    }

    if (data.username && !REGEX.SLUG.test(data.username)) {
      errors.push('Username can only contain letters, numbers, underscores and hyphens');
    }

    if (data.bio && data.bio.length > 500) {
      errors.push('Bio must be less than 500 characters');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate user creation
   * ইউজার তৈরি ভ্যালিডেট করা
   */
  validateCreate: (data: UserCreateInput): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.email || !REGEX.EMAIL.test(data.email)) {
      errors.push('Valid email is required');
    }

    if (!data.name || data.name.length < 2) {
      errors.push('Name must be at least 2 characters');
    }

    if (data.phone && !REGEX.PHONE.test(data.phone)) {
      errors.push('Invalid phone number');
    }

    if (data.username && !REGEX.SLUG.test(data.username)) {
      errors.push('Username can only contain letters, numbers, underscores and hyphens');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate user update
   * ইউজার আপডেট ভ্যালিডেট করা
   */
  validateUpdate: (data: UserUpdateInput): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (data.email && !REGEX.EMAIL.test(data.email)) {
      errors.push('Invalid email format');
    }

    if (data.phone && !REGEX.PHONE.test(data.phone)) {
      errors.push('Invalid phone number');
    }

    if (data.name && (data.name.length < 2 || data.name.length > 100)) {
      errors.push('Name must be between 2 and 100 characters');
    }

    if (data.username && !REGEX.SLUG.test(data.username)) {
      errors.push('Username can only contain letters, numbers, underscores and hyphens');
    }

    if (data.bio && data.bio.length > 500) {
      errors.push('Bio must be less than 500 characters');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Check if user is active
   * ইউজার অ্যাক্টিভ কিনা চেক করা
   */
  isActive: (user: { status: string }): boolean => {
    return user.status === 'active' || user.status === 'verified';
  },

  /**
   * Check if user is verified
   * ইউজার ভেরিফাইড কিনা চেক করা
   */
  isVerified: (user: { isVerified: boolean }): boolean => {
    return user.isVerified === true;
  },

  /**
   * Check if user is locked
   * ইউজার লকড কিনা চেক করা
   */
  isLocked: (user: { isLocked: boolean }): boolean => {
    return user.isLocked === true;
  },
};
