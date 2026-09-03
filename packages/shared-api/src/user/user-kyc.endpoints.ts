/**
 * User KYC Endpoints
 * ইউজার KYC এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { UserKYC, UserKYCCreateInput, UserKYCUpdateInput } from '@vubon/shared-types';
import { USER_KYC } from '@vubon/shared-constants';

export class UserKYCEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get user KYC
   * ইউজারের KYC পাওয়া
   */
  async getKYC(userId: string): Promise<UserKYC[]> {
    return this.client.get<UserKYC[]>(`/users/${userId}/kyc`);
  }

  /**
   * Get current user KYC
   * বর্তমান ইউজারের KYC পাওয়া
   */
  async getMyKYC(): Promise<UserKYC[]> {
    return this.client.get<UserKYC[]>('/users/me/kyc');
  }

  /**
   * Get KYC by ID
   * আইডি দ্বারা KYC পাওয়া
   */
  async getKYCById(kycId: string): Promise<UserKYC> {
    return this.client.get<UserKYC>(`/users/kyc/${kycId}`);
  }

  /**
   * Create KYC
   * KYC তৈরি করা
   */
  async createKYC(data: UserKYCCreateInput): Promise<UserKYC> {
    return this.client.post<UserKYC>('/users/kyc', data);
  }

  /**
   * Update KYC
   * KYC আপডেট করা
   */
  async updateKYC(kycId: string, data: UserKYCUpdateInput): Promise<UserKYC> {
    return this.client.patch<UserKYC>(`/users/kyc/${kycId}`, data);
  }

  /**
   * Delete KYC
   * KYC ডিলিট করা
   */
  async deleteKYC(kycId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/users/kyc/${kycId}`);
  }

  /**
   * Submit KYC for verification
   * KYC ভেরিফিকেশনের জন্য জমা দেওয়া
   */
  async submitKYC(kycId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/users/kyc/${kycId}/submit`);
  }

  /**
   * Review KYC
   * KYC রিভিউ করা
   */
  async reviewKYC(kycId: string, data: { status: string; comments?: string }): Promise<UserKYC> {
    return this.client.patch<UserKYC>(`/users/kyc/${kycId}/review`, data);
  }

  /**
   * Get KYC status
   * KYC স্ট্যাটাস পাওয়া
   */
  async getKYCStatus(userId: string): Promise<{
    status: string;
    level: number;
    isVerified: boolean;
    pendingDocuments: string[];
  }> {
    return this.client.get(`/users/${userId}/kyc/status`);
  }

  /**
   * Upload KYC document
   * KYC ডকুমেন্ট আপলোড করা
   */
  async uploadKYCDocument(kycId: string, file: File, type: string): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', type);
    return this.client.post<{ url: string }>(`/users/kyc/${kycId}/upload`, formData);
  }

  /**
   * Get KYC verification levels
   * KYC ভেরিফিকেশন লেভেল পাওয়া
   */
  async getVerificationLevels(): Promise<{
    levels: Array<{
      name: string;
      requiredDocs: string[];
      benefits: string[];
    }>;
  }> {
    return this.client.get('/users/kyc/levels');
  }

  /**
   * Get KYC types from constants
   * কনস্ট্যান্ট থেকে KYC টাইপ পাওয়া
   */
  getKYCTypes(): Record<string, string> {
    return {
      NID: USER_KYC.TYPES.NID,
      PASSPORT: USER_KYC.TYPES.PASSPORT,
      DRIVING_LICENSE: USER_KYC.TYPES.DRIVING_LICENSE,
      BIRTH_REGISTRATION: USER_KYC.TYPES.BIRTH_REGISTRATION,
      TAX_ID: USER_KYC.TYPES.TAX_ID,
      BUSINESS_LICENSE: USER_KYC.TYPES.BUSINESS_LICENSE,
      TRADE_LICENSE: USER_KYC.TYPES.TRADE_LICENSE,
      BANK_STATEMENT: USER_KYC.TYPES.BANK_STATEMENT,
      UTILITY_BILL: USER_KYC.TYPES.UTILITY_BILL,
      ADDRESS_PROOF: USER_KYC.TYPES.ADDRESS_PROOF,
    };
  }

  /**
   * Get KYC statuses from constants
   * কনস্ট্যান্ট থেকে KYC স্ট্যাটাস পাওয়া
   */
  getKYCStatuses(): Record<string, string> {
    return {
      NOT_SUBMITTED: USER_KYC.STATUS.NOT_SUBMITTED,
      SUBMITTED: USER_KYC.STATUS.SUBMITTED,
      PENDING: USER_KYC.STATUS.PENDING,
      UNDER_REVIEW: USER_KYC.STATUS.UNDER_REVIEW,
      VERIFIED: USER_KYC.STATUS.VERIFIED,
      REJECTED: USER_KYC.STATUS.REJECTED,
      EXPIRED: USER_KYC.STATUS.EXPIRED,
      CANCELLED: USER_KYC.STATUS.CANCELLED,
      NEEDS_REVISION: USER_KYC.STATUS.NEEDS_REVISION,
    };
  }

  /**
   * Get KYC document types from constants
   * কনস্ট্যান্ট থেকে KYC ডকুমেন্ট টাইপ পাওয়া
   */
  getKYCDocumentTypes(): Record<string, string> {
    return {
      IDENTITY: USER_KYC.DOCUMENT_TYPES.IDENTITY,
      ADDRESS: USER_KYC.DOCUMENT_TYPES.ADDRESS,
      INCOME: USER_KYC.DOCUMENT_TYPES.INCOME,
      BUSINESS: USER_KYC.DOCUMENT_TYPES.BUSINESS,
      EDUCATION: USER_KYC.DOCUMENT_TYPES.EDUCATION,
      OTHER: USER_KYC.DOCUMENT_TYPES.OTHER,
    };
  }
}
