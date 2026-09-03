/**
 * KYC Validator
 * ইউজার KYC ভ্যালিডেটর
 */

import { UserKYC, UserKYCCreateInput, UserKYCUpdateInput } from '@vubon/shared-types';
import { USER_KYC } from '@vubon/shared-constants';

type KYCType = (typeof USER_KYC.TYPES)[keyof typeof USER_KYC.TYPES];
type KYCStatus = (typeof USER_KYC.STATUS)[keyof typeof USER_KYC.STATUS];
type KYCDocumentType = (typeof USER_KYC.DOCUMENT_TYPES)[keyof typeof USER_KYC.DOCUMENT_TYPES];

export const KYCValidator = {
  /**
   * Validate KYC data
   * KYC ডেটা ভ্যালিডেট করা
   */
  validate: (data: Partial<UserKYC>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (data.type && !Object.values(USER_KYC.TYPES).includes(data.type as KYCType)) {
      errors.push('Invalid KYC type');
    }

    if (data.status && !Object.values(USER_KYC.STATUS).includes(data.status as KYCStatus)) {
      errors.push('Invalid KYC status');
    }

    if (
      data.documentType &&
      !Object.values(USER_KYC.DOCUMENT_TYPES).includes(data.documentType as KYCDocumentType)
    ) {
      errors.push('Invalid document type');
    }

    if (data.documentNumber && data.documentNumber.length < 5) {
      errors.push('Document number must be at least 5 characters');
    }

    if (data.documentUrl && !/^https?:\/\/[^\s]+$/.test(data.documentUrl)) {
      errors.push('Invalid document URL');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate KYC creation
   * KYC তৈরি ভ্যালিডেট করা
   */
  validateCreate: (data: UserKYCCreateInput): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!data.userId) {
      errors.push('User ID is required');
    }

    if (!data.type || !Object.values(USER_KYC.TYPES).includes(data.type as KYCType)) {
      errors.push('Valid KYC type is required');
    }

    if (
      !data.documentType ||
      !Object.values(USER_KYC.DOCUMENT_TYPES).includes(data.documentType as KYCDocumentType)
    ) {
      errors.push('Valid document type is required');
    }

    if (data.documentNumber && data.documentNumber.length < 5) {
      errors.push('Document number must be at least 5 characters');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate KYC update
   * KYC আপডেট ভ্যালিডেট করা
   */
  validateUpdate: (data: UserKYCUpdateInput): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (data.type && !Object.values(USER_KYC.TYPES).includes(data.type as KYCType)) {
      errors.push('Invalid KYC type');
    }

    if (data.status && !Object.values(USER_KYC.STATUS).includes(data.status as KYCStatus)) {
      errors.push('Invalid KYC status');
    }

    if (
      data.documentType &&
      !Object.values(USER_KYC.DOCUMENT_TYPES).includes(data.documentType as KYCDocumentType)
    ) {
      errors.push('Invalid document type');
    }

    if (data.documentNumber && data.documentNumber.length < 5) {
      errors.push('Document number must be at least 5 characters');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Check if KYC is verified
   * KYC ভেরিফাইড কিনা চেক করা
   */
  isVerified: (kyc: UserKYC): boolean => {
    return kyc.status === USER_KYC.STATUS.VERIFIED;
  },

  /**
   * Check if KYC is pending
   * KYC পেন্ডিং কিনা চেক করা
   */
  isPending: (kyc: UserKYC): boolean => {
    return kyc.status === USER_KYC.STATUS.PENDING || kyc.status === USER_KYC.STATUS.UNDER_REVIEW;
  },

  /**
   * Check if KYC is expired
   * KYC এক্সপায়ার্ড কিনা চেক করা
   */
  isExpired: (kyc: UserKYC): boolean => {
    if (kyc.status === USER_KYC.STATUS.EXPIRED) return true;
    if (kyc.expiresAt) {
      return new Date(kyc.expiresAt) < new Date();
    }
    return false;
  },

  /**
   * Get KYC verification level
   * KYC ভেরিফিকেশন লেভেল পাওয়া
   */
  getVerificationLevel: (kyc: UserKYC): number => {
    if (kyc.status !== USER_KYC.STATUS.VERIFIED) return 0;

    // Use a type-safe approach
    const level = (kyc as { level?: string }).level || 'basic';

    const levelMap: Record<string, number> = {
      basic: 1,
      standard: 2,
      premium: 3,
      enterprise: 4,
    };

    return levelMap[level] || 0;
  },

  /**
   * Get KYC status label
   * KYC স্ট্যাটাস লেবেল পাওয়া
   */
  getStatusLabel: (status: string): string => {
    const labels: Record<string, string> = {
      not_submitted: 'Not Submitted',
      submitted: 'Submitted',
      pending: 'Pending',
      under_review: 'Under Review',
      verified: 'Verified',
      rejected: 'Rejected',
      expired: 'Expired',
      cancelled: 'Cancelled',
      needs_revision: 'Needs Revision',
    };
    return labels[status] || status;
  },
};
