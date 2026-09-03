/**
 * Verification Validator
 * ইউজার ভেরিফিকেশন ভ্যালিডেটর
 */

import { REGEX } from '@vubon/shared-constants';
import {
  UserVerification,
  UserVerificationCreateInput,
  UserVerificationVerifyInput,
} from '@vubon/shared-types';
import { USER_VERIFICATION } from '@vubon/shared-constants';

type VerificationMethod =
  (typeof USER_VERIFICATION.METHODS)[keyof typeof USER_VERIFICATION.METHODS];
type VerificationStatus = (typeof USER_VERIFICATION.STATUS)[keyof typeof USER_VERIFICATION.STATUS];
type VerificationLevel = (typeof USER_VERIFICATION.LEVELS)[keyof typeof USER_VERIFICATION.LEVELS];

export const VerificationValidator = {
  /**
   * Validate verification data
   * ভেরিফিকেশন ডেটা ভ্যালিডেট করা
   */
  validate: (data: Partial<UserVerification>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (
      data.method &&
      !Object.values(USER_VERIFICATION.METHODS).includes(data.method as VerificationMethod)
    ) {
      errors.push('Invalid verification method');
    }

    if (
      data.status &&
      !Object.values(USER_VERIFICATION.STATUS).includes(data.status as VerificationStatus)
    ) {
      errors.push('Invalid verification status');
    }

    if (
      data.level &&
      !Object.values(USER_VERIFICATION.LEVELS).includes(data.level as VerificationLevel)
    ) {
      errors.push('Invalid verification level');
    }

    if (data.value && data.value.length < 1) {
      errors.push('Verification value is required');
    }

    if (data.method === 'email' && data.value && !REGEX.EMAIL.test(data.value)) {
      errors.push('Invalid email format');
    }

    if (data.method === 'phone' && data.value && !REGEX.PHONE.test(data.value)) {
      errors.push('Invalid phone number');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate verification creation
   * ভেরিফিকেশন তৈরি ভ্যালিডেট করা
   */
  validateCreate: (data: UserVerificationCreateInput): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.userId) {
      errors.push('User ID is required');
    }

    if (
      !data.method ||
      !Object.values(USER_VERIFICATION.METHODS).includes(data.method as VerificationMethod)
    ) {
      errors.push('Valid verification method is required');
    }

    if (!data.value || data.value.length < 1) {
      errors.push('Verification value is required');
    }

    if (data.method === 'email' && !REGEX.EMAIL.test(data.value)) {
      errors.push('Invalid email format');
    }

    if (data.method === 'phone' && !REGEX.PHONE.test(data.value)) {
      errors.push('Invalid phone number');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate verification verify
   * ভেরিফিকেশন ভেরিফাই ভ্যালিডেট করা
   */
  validateVerify: (data: UserVerificationVerifyInput): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.code && !data.token) {
      errors.push('Either code or token is required');
    }

    if (data.code && data.code.length < 4) {
      errors.push('Code must be at least 4 characters');
    }

    if (data.token && data.token.length < 8) {
      errors.push('Token must be at least 8 characters');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Check if verification is expired
   * ভেরিফিকেশন এক্সপায়ার্ড কিনা চেক করা
   */
  isExpired: (verification: UserVerification): boolean => {
    return new Date(verification.expiresAt) < new Date();
  },

  /**
   * Check if verification is pending
   * ভেরিফিকেশন পেন্ডিং কিনা চেক করা
   */
  isPending: (verification: UserVerification): boolean => {
    return verification.status === USER_VERIFICATION.STATUS.PENDING;
  },

  /**
   * Check if verification is verified
   * ভেরিফিকেশন ভেরিফাইড কিনা চেক করা
   */
  isVerified: (verification: UserVerification): boolean => {
    return verification.status === USER_VERIFICATION.STATUS.VERIFIED;
  },

  /**
   * Check if verification is rejected
   * ভেরিফিকেশন রিজেক্টেড কিনা চেক করা
   */
  isRejected: (verification: UserVerification): boolean => {
    return verification.status === USER_VERIFICATION.STATUS.REJECTED;
  },

  /**
   * Check if verification is in progress
   * ভেরিফিকেশন ইন প্রগ্রেস কিনা চেক করা
   */
  isInProgress: (verification: UserVerification): boolean => {
    return verification.status === USER_VERIFICATION.STATUS.IN_PROGRESS;
  },

  /**
   * Get verification status label
   * ভেরিফিকেশন স্ট্যাটাস লেবেল পাওয়া
   */
  getStatusLabel: (status: string): string => {
    const labels: Record<string, string> = {
      pending: 'Pending',
      verified: 'Verified',
      rejected: 'Rejected',
      expired: 'Expired',
      in_progress: 'In Progress',
      failed: 'Failed',
      cancelled: 'Cancelled',
      awaiting_review: 'Awaiting Review',
    };
    return labels[status] || status;
  },
};
