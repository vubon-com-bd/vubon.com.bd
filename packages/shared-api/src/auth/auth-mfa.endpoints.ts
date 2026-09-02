/**
 * Auth MFA Endpoints
 * প্রমীকরণ MFA এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AuthMFA, AuthMFASetupInput, AuthMFAVerifyInput } from '@vubon/shared-types';
import { AuthMFASetupResponse } from '@vubon/shared-types';

export class AuthMFAEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Setup MFA
   * MFA সেটআপ করা
   */
  async setupMFA(data: AuthMFASetupInput): Promise<AuthMFASetupResponse> {
    return this.client.post<AuthMFASetupResponse>('/auth/mfa/setup', data);
  }

  /**
   * Verify MFA
   * MFA ভেরিফাই করা
   */
  async verifyMFA(data: AuthMFAVerifyInput): Promise<{ verified: boolean }> {
    return this.client.post<{ verified: boolean }>('/auth/mfa/verify', data);
  }

  /**
   * Enable MFA
   * MFA ইন্যাবল করা
   */
  async enableMFA(type: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/auth/mfa/enable', { type });
  }

  /**
   * Disable MFA
   * MFA ডিসেবল করা
   */
  async disableMFA(type: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/auth/mfa/disable', { type });
  }

  /**
   * Get MFA status
   * MFA স্ট্যাটাস পাওয়া
   */
  async getMFAStatus(): Promise<{
    enabled: boolean;
    methods: string[];
    defaultMethod?: string;
  }> {
    return this.client.get<{
      enabled: boolean;
      methods: string[];
      defaultMethod?: string;
    }>('/auth/mfa/status');
  }

  /**
   * Generate backup codes
   * ব্যাকআপ কোড তৈরি করা
   */
  async generateBackupCodes(): Promise<{ codes: string[] }> {
    return this.client.post<{ codes: string[] }>('/auth/mfa/backup-codes');
  }

  /**
   * List backup codes
   * ব্যাকআপ কোড লিস্ট পাওয়া
   */
  async listBackupCodes(): Promise<{ codes: string[] }> {
    return this.client.get<{ codes: string[] }>('/auth/mfa/backup-codes');
  }

  /**
   * Regenerate backup codes
   * ব্যাকআপ কোড পুনরায় তৈরি করা
   */
  async regenerateBackupCodes(): Promise<{ codes: string[] }> {
    return this.client.post<{ codes: string[] }>('/auth/mfa/backup-codes/regenerate');
  }

  /**
   * Get MFA configuration
   * MFA কনফিগারেশন পাওয়া
   */
  async getMFAConfig(): Promise<AuthMFA> {
    return this.client.get<AuthMFA>('/auth/mfa/config');
  }

  /**
   * Update MFA configuration
   * MFA কনফিগারেশন আপডেট করা
   */
  async updateMFAConfig(data: Partial<AuthMFA>): Promise<AuthMFA> {
    return this.client.patch<AuthMFA>('/auth/mfa/config', data);
  }

  /**
   * Get MFA recovery codes
   * MFA রিকোভারি কোড পাওয়া
   */
  async getMFARecoveryCodes(): Promise<{ codes: string[] }> {
    return this.client.get<{ codes: string[] }>('/auth/mfa/recovery-codes');
  }

  /**
   * Regenerate MFA recovery codes
   * MFA রিকোভারি কোড পুনরায় তৈরি করা
   */
  async regenerateMFARecoveryCodes(): Promise<{ codes: string[] }> {
    return this.client.post<{ codes: string[] }>('/auth/mfa/recovery-codes/regenerate');
  }
}
