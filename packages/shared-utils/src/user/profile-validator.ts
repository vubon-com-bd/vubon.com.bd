/**
 * Profile Validator
 * ইউজার প্রোফাইল ভ্যালিডেটর
 */

import { UserProfile, UserProfileCreateInput, UserProfileUpdateInput } from '@vubon/shared-types';

export const ProfileValidator = {
  /**
   * Validate profile data
   * প্রোফাইল ডেটা ভ্যালিডেট করা
   */
  validate: (data: Partial<UserProfile>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (data.fullName && (data.fullName.length < 2 || data.fullName.length > 100)) {
      errors.push('Full name must be between 2 and 100 characters');
    }

    if (data.firstName && (data.firstName.length < 1 || data.firstName.length > 50)) {
      errors.push('First name must be between 1 and 50 characters');
    }

    if (data.lastName && (data.lastName.length < 1 || data.lastName.length > 50)) {
      errors.push('Last name must be between 1 and 50 characters');
    }

    if (data.displayName && (data.displayName.length < 2 || data.displayName.length > 100)) {
      errors.push('Display name must be between 2 and 100 characters');
    }

    if (data.bio && data.bio.length > 500) {
      errors.push('Bio must be less than 500 characters');
    }

    if (data.website && !/^https?:\/\/[^\s]+$/.test(data.website)) {
      errors.push('Invalid website URL');
    }

    if (data.location && data.location.length > 100) {
      errors.push('Location must be less than 100 characters');
    }

    if (data.company && data.company.length > 100) {
      errors.push('Company must be less than 100 characters');
    }

    if (data.position && data.position.length > 100) {
      errors.push('Position must be less than 100 characters');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate profile creation
   * প্রোফাইল তৈরি ভ্যালিডেট করা
   */
  validateCreate: (data: UserProfileCreateInput): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.userId) {
      errors.push('User ID is required');
    }

    if (data.fullName && (data.fullName.length < 2 || data.fullName.length > 100)) {
      errors.push('Full name must be between 2 and 100 characters');
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
   * Validate profile update
   * প্রোফাইল আপডেট ভ্যালিডেট করা
   */
  validateUpdate: (data: UserProfileUpdateInput): { valid: boolean; errors: string[] } => {
    return ProfileValidator.validate(data);
  },

  /**
   * Get full name from first and last name
   * প্রথম এবং শেষ নাম থেকে পূর্ণ নাম পাওয়া
   */
  getFullName: (firstName?: string, lastName?: string): string => {
    if (!firstName && !lastName) return '';
    if (!firstName) return lastName || '';
    if (!lastName) return firstName;
    return `${firstName} ${lastName}`;
  },

  /**
   * Get initials from name
   * নাম থেকে ইনিশিয়ালস পাওয়া
   */
  getInitials: (name: string): string => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  },
};
