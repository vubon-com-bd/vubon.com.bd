/**
 * Auth 2FA Endpoints
 * প্রমীকরণ 2FA এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import {
  Auth2FA,
  Auth2FASetupInput,
  Auth2FAVerifyInput,
  Auth2FAResponse,
} from '@vubon/shared-types';

export class Auth2FAEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Setup 2FA
   * 2FA সেটআপ করা
   */
  async setup2FA(data: Auth2FASetupInput): Promise<Auth2FAResponse> {
    return this.client.post<Auth2FAResponse>('/auth/2fa/setup', data);
  }

  /**
   * Verify 2FA
   * 2FA ভেরিফাই করা
   */
  async verify2FA(data: Auth2FAVerifyInput): Promise<{ verified: boolean }> {
    return this.client.post<{ verified: boolean }>('/auth/2fa/verify', data);
  }

  /**
   * Enable 2FA
   * 2FA ইন্যাবল করা
   */
  async enable2FA(method: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/auth/2fa/enable', { method });
  }

  /**
   * Disable 2FA
   * 2FA ডিসেবল করা
   */
  async disable2FA(method: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/auth/2fa/disable', { method });
  }

  /**
   * Get 2FA status
   * 2FA স্ট্যাটাস পাওয়া
   */
  async get2FAStatus(): Promise<{
    enabled: boolean;
    methods: string[];
    defaultMethod?: string;
  }> {
    return this.client.get<{
      enabled: boolean;
      methods: string[];
      defaultMethod?: string;
    }>('/auth/2fa/status');
  }

  /**
   * Generate 2FA backup codes
   * 2FA ব্যাকআপ কোড তৈরি করা
   */
  async generate2FABackupCodes(): Promise<{ codes: string[] }> {
    return this.client.post<{ codes: string[] }>('/auth/2fa/backup-codes');
  }

  /**
   * Get 2FA configuration
   * 2FA কনফিগারেশন পাওয়া
   */
  async get2FAConfig(): Promise<Auth2FA> {
    return this.client.get<Auth2FA>('/auth/2fa/config');
  }

  /**
   * Update 2FA configuration
   * 2FA কনফিগারেশন আপডেট করা
   */
  async update2FAConfig(data: Partial<Auth2FA>): Promise<Auth2FA> {
    return this.client.patch<Auth2FA>('/auth/2fa/config', data);
  }

  /**
   * Get 2FA recovery codes
   * 2FA রিকোভারি কোড পাওয়া
   */
  async get2FARecoveryCodes(): Promise<{ codes: string[] }> {
    return this.client.get<{ codes: string[] }>('/auth/2fa/recovery-codes');
  }

  /**
   * Regenerate 2FA recovery codes
   * 2FA রিকোভারি কোড পুনরায় তৈরি করা
   */
  async regenerate2FARecoveryCodes(): Promise<{ codes: string[] }> {
    return this.client.post<{ codes: string[] }>('/auth/2fa/recovery-codes/regenerate');
  }
}
