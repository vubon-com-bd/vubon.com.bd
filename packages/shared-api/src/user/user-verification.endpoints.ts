/**
 * User Verification Endpoints
 * ইউজার ভেরিফিকেশন এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import {
  UserVerification,
  UserVerificationCreateInput,
  UserVerificationVerifyInput,
} from '@vubon/shared-types';
import { USER_VERIFICATION } from '@vubon/shared-constants';

export class UserVerificationEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get user verifications
   * ইউজারের ভেরিফিকেশন পাওয়া
   */
  async getVerifications(userId: string): Promise<UserVerification[]> {
    return this.client.get<UserVerification[]>(`/users/${userId}/verifications`);
  }

  /**
   * Get current user verifications
   * বর্তমান ইউজারের ভেরিফিকেশন পাওয়া
   */
  async getMyVerifications(): Promise<UserVerification[]> {
    return this.client.get<UserVerification[]>('/users/me/verifications');
  }

  /**
   * Get verification by ID
   * আইডি দ্বারা ভেরিফিকেশন পাওয়া
   */
  async getVerification(verificationId: string): Promise<UserVerification> {
    return this.client.get<UserVerification>(`/users/verifications/${verificationId}`);
  }

  /**
   * Create verification
   * ভেরিফিকেশন তৈরি করা
   */
  async createVerification(data: UserVerificationCreateInput): Promise<UserVerification> {
    // USER_VERIFICATION ব্যবহার করে ডিফল্ট স্ট্যাটাস সেট করা
    const verificationData = {
      ...data,
      status: USER_VERIFICATION.STATUS.PENDING,
      level: data.level || USER_VERIFICATION.LEVELS.BASIC,
      maxAttempts: data.maxAttempts || USER_VERIFICATION.DEFAULTS.MAX_ATTEMPTS,
    };
    return this.client.post<UserVerification>('/users/verifications', verificationData);
  }

  /**
   * Verify code
   * কোড ভেরিফাই করা
   */
  async verifyCode(
    verificationId: string,
    data: UserVerificationVerifyInput
  ): Promise<{
    verified: boolean;
    status: string;
    level?: string;
  }> {
    return this.client.post<{
      verified: boolean;
      status: string;
      level?: string;
    }>(`/users/verifications/${verificationId}/verify`, data);
  }

  /**
   * Resend verification
   * ভেরিফিকেশন পুনরায় পাঠান
   */
  async resendVerification(verificationId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/users/verifications/${verificationId}/resend`);
  }

  /**
   * Cancel verification
   * ভেরিফিকেশন বাতিল করা
   */
  async cancelVerification(verificationId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/users/verifications/${verificationId}/cancel`);
  }

  /**
   * Get verification status
   * ভেরিফিকেশন স্ট্যাটাস পাওয়া
   */
  async getVerificationStatus(
    userId: string,
    method: string
  ): Promise<{
    status: string;
    level: string;
    isVerified: boolean;
  }> {
    // USER_VERIFICATION ব্যবহার করে মেথড ভ্যালিডেট করা
    const validMethods = Object.values(USER_VERIFICATION.METHODS) as string[];
    if (!validMethods.includes(method)) {
      throw new Error(
        `Invalid verification method: ${method}. Valid methods: ${validMethods.join(', ')}`
      );
    }
    return this.client.get<{
      status: string;
      level: string;
      isVerified: boolean;
    }>(`/users/${userId}/verifications/status/${method}`);
  }

  /**
   * Verify email
   * ইমেইল ভেরিফাই করা
   */
  async verifyEmail(token: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/users/verifications/email', { token });
  }

  /**
   * Verify phone
   * ফোন ভেরিফাই করা
   */
  async verifyPhone(code: string, phone: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/users/verifications/phone', { code, phone });
  }

  /**
   * Get verification methods
   * ভেরিফিকেশন পদ্ধতি পাওয়া
   */
  async getVerificationMethods(): Promise<{
    methods: string[];
    levels: string[];
    defaultMethod: string;
    defaultLevel: string;
  }> {
    // USER_VERIFICATION ব্যবহার করে সব পদ্ধতি এবং লেভেল রিটার্ন করা
    return {
      methods: Object.values(USER_VERIFICATION.METHODS) as string[],
      levels: Object.values(USER_VERIFICATION.LEVELS) as string[],
      defaultMethod: USER_VERIFICATION.METHODS.EMAIL,
      defaultLevel: USER_VERIFICATION.LEVELS.BASIC,
    };
  }

  /**
   * Get verification status by method
   * পদ্ধতি অনুযায়ী ভেরিফিকেশন স্ট্যাটাস পাওয়া
   */
  async getVerificationStatusByMethod(
    userId: string,
    method: string
  ): Promise<{
    status: string;
    isVerified: boolean;
    verifiedAt?: Date;
    expiresAt?: Date;
  }> {
    const validMethods = Object.values(USER_VERIFICATION.METHODS) as string[];
    if (!validMethods.includes(method)) {
      throw new Error(`Invalid verification method: ${method}`);
    }
    return this.client.get(`/users/${userId}/verifications/method/${method}`);
  }

  /**
   * Check if user has any verified method
   * ইউজারের কোনো ভেরিফাইড পদ্ধতি আছে কিনা চেক করা
   */
  async hasVerifiedMethod(userId: string): Promise<{
    hasVerified: boolean;
    verifiedMethods: string[];
  }> {
    return this.client.get(`/users/${userId}/verifications/has-verified`);
  }
}
