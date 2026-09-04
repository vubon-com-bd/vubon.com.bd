/**
 * Admin Verification Endpoints
 * অ্যাডমিন ভেরিফিকেশন এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import {
  AdminVerification,
  AdminVerificationCreateInput,
  AdminVerificationVerifyInput,
  AdminVerificationResponse,
} from '@vubon/shared-types';
import { ADMIN_VERIFICATION } from '@vubon/shared-constants';

export class AdminVerificationEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get admin verifications
   * অ্যাডমিনের ভেরিফিকেশন পাওয়া
   */
  async getVerifications(adminId: string): Promise<AdminVerification[]> {
    return this.client.get<AdminVerification[]>(`/admin/${adminId}/verifications`);
  }

  /**
   * Get current admin verifications
   * বর্তমান অ্যাডমিনের ভেরিফিকেশন পাওয়া
   */
  async getMyVerifications(): Promise<AdminVerification[]> {
    return this.client.get<AdminVerification[]>('/admin/me/verifications');
  }

  /**
   * Get verification by ID
   * আইডি দ্বারা ভেরিফিকেশন পাওয়া
   */
  async getVerification(verificationId: string): Promise<AdminVerification> {
    return this.client.get<AdminVerification>(`/admin/verifications/${verificationId}`);
  }

  /**
   * Create verification
   * ভেরিফিকেশন তৈরি করা
   */
  async createVerification(data: AdminVerificationCreateInput): Promise<AdminVerification> {
    return this.client.post<AdminVerification>('/admin/verifications', data);
  }

  /**
   * Verify code
   * কোড ভেরিফাই করা
   */
  async verifyCode(
    verificationId: string,
    data: AdminVerificationVerifyInput
  ): Promise<AdminVerificationResponse> {
    return this.client.post(`/admin/verifications/${verificationId}/verify`, data);
  }

  /**
   * Resend verification
   * ভেরিফিকেশন পুনরায় পাঠান
   */
  async resendVerification(verificationId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/admin/verifications/${verificationId}/resend`);
  }

  /**
   * Cancel verification
   * ভেরিফিকেশন বাতিল করা
   */
  async cancelVerification(verificationId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/admin/verifications/${verificationId}/cancel`);
  }

  /**
   * Get verification methods from constants
   * কনস্ট্যান্ট থেকে ভেরিফিকেশন মেথড পাওয়া
   */
  getVerificationMethods(): Record<string, string> {
    return {
      EMAIL: ADMIN_VERIFICATION.METHODS.EMAIL,
      PHONE: ADMIN_VERIFICATION.METHODS.PHONE,
      NID: ADMIN_VERIFICATION.METHODS.NID,
      PASSPORT: ADMIN_VERIFICATION.METHODS.PASSPORT,
      DRIVING_LICENSE: ADMIN_VERIFICATION.METHODS.DRIVING_LICENSE,
      BIRTH_REGISTRATION: ADMIN_VERIFICATION.METHODS.BIRTH_REGISTRATION,
      TAX_ID: ADMIN_VERIFICATION.METHODS.TAX_ID,
      BUSINESS_LICENSE: ADMIN_VERIFICATION.METHODS.BUSINESS_LICENSE,
      TRADE_LICENSE: ADMIN_VERIFICATION.METHODS.TRADE_LICENSE,
      BANK_ACCOUNT: ADMIN_VERIFICATION.METHODS.BANK_ACCOUNT,
      MOBILE_WALLET: ADMIN_VERIFICATION.METHODS.MOBILE_WALLET,
      ADDRESS: ADMIN_VERIFICATION.METHODS.ADDRESS,
      SOCIAL: ADMIN_VERIFICATION.METHODS.SOCIAL,
      BIOMETRIC: ADMIN_VERIFICATION.METHODS.BIOMETRIC,
    };
  }

  /**
   * Get verification statuses from constants
   * কনস্ট্যান্ট থেকে ভেরিফিকেশন স্ট্যাটাস পাওয়া
   */
  getVerificationStatuses(): Record<string, string> {
    return {
      PENDING: ADMIN_VERIFICATION.STATUS.PENDING,
      VERIFIED: ADMIN_VERIFICATION.STATUS.VERIFIED,
      REJECTED: ADMIN_VERIFICATION.STATUS.REJECTED,
      EXPIRED: ADMIN_VERIFICATION.STATUS.EXPIRED,
      IN_PROGRESS: ADMIN_VERIFICATION.STATUS.IN_PROGRESS,
      FAILED: ADMIN_VERIFICATION.STATUS.FAILED,
      CANCELLED: ADMIN_VERIFICATION.STATUS.CANCELLED,
      AWAITING_REVIEW: ADMIN_VERIFICATION.STATUS.AWAITING_REVIEW,
    };
  }

  /**
   * Get default verification config from constants
   * কনস্ট্যান্ট থেকে ডিফল্ট ভেরিফিকেশন কনফিগ পাওয়া
   */
  getVerificationDefaults(): {
    maxAttempts: number;
    expiryDays: number;
    codeLength: number;
    resendCooldown: number;
  } {
    return {
      maxAttempts: ADMIN_VERIFICATION.DEFAULTS.MAX_ATTEMPTS,
      expiryDays: ADMIN_VERIFICATION.DEFAULTS.EXPIRY_DAYS,
      codeLength: ADMIN_VERIFICATION.DEFAULTS.CODE_LENGTH,
      resendCooldown: ADMIN_VERIFICATION.DEFAULTS.RESEND_COOLDOWN,
    };
  }

  /**
   * Check if verification is pending
   * ভেরিফিকেশন পেন্ডিং কিনা চেক করা
   */
  isVerificationPending(status: string): boolean {
    return status === ADMIN_VERIFICATION.STATUS.PENDING;
  }

  /**
   * Check if verification is verified
   * ভেরিফিকেশন ভেরিফাইড কিনা চেক করা
   */
  isVerificationVerified(status: string): boolean {
    return status === ADMIN_VERIFICATION.STATUS.VERIFIED;
  }

  /**
   * Check if verification is rejected
   * ভেরিফিকেশন রিজেক্টেড কিনা চেক করা
   */
  isVerificationRejected(status: string): boolean {
    return status === ADMIN_VERIFICATION.STATUS.REJECTED;
  }
}
