/**
 * Admin 2FA Endpoints
 * অ্যাডমিন 2FA এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import {
  Admin2FA,
  Admin2FASetupInput,
  Admin2FAVerifyInput,
  Admin2FAResponse,
} from '@vubon/shared-types';

export class Admin2FAEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Setup 2FA
   * 2FA সেটআপ করা
   */
  async setup2FA(adminId: string, data: Admin2FASetupInput): Promise<Admin2FAResponse> {
    return this.client.post<Admin2FAResponse>(`/admin/${adminId}/2fa/setup`, data);
  }

  /**
   * Verify 2FA
   * 2FA ভেরিফাই করা
   */
  async verify2FA(adminId: string, data: Admin2FAVerifyInput): Promise<{ verified: boolean }> {
    return this.client.post<{ verified: boolean }>(`/admin/${adminId}/2fa/verify`, data);
  }

  /**
   * Enable 2FA
   * 2FA ইন্যাবল করা
   */
  async enable2FA(adminId: string, method: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/admin/${adminId}/2fa/enable`, { method });
  }

  /**
   * Disable 2FA
   * 2FA ডিসেবল করা
   */
  async disable2FA(adminId: string, method: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/admin/${adminId}/2fa/disable`, { method });
  }

  /**
   * Get 2FA status
   * 2FA স্ট্যাটাস পাওয়া
   */
  async get2FAStatus(adminId: string): Promise<{
    enabled: boolean;
    methods: string[];
    defaultMethod?: string;
  }> {
    return this.client.get(`/admin/${adminId}/2fa/status`);
  }

  /**
   * Generate backup codes
   * ব্যাকআপ কোড তৈরি করা
   */
  async generateBackupCodes(adminId: string): Promise<{ codes: string[] }> {
    return this.client.post<{ codes: string[] }>(`/admin/${adminId}/2fa/backup-codes`);
  }

  /**
   * Get admin 2FA info
   * অ্যাডমিনের 2FA তথ্য পাওয়া
   */
  async getAdmin2FA(adminId: string): Promise<Admin2FA> {
    return this.client.get<Admin2FA>(`/admin/${adminId}/2fa`);
  }

  /**
   * Get current admin 2FA info
   * বর্তমান অ্যাডমিনের 2FA তথ্য পাওয়া
   */
  async getMy2FA(): Promise<Admin2FA> {
    return this.client.get<Admin2FA>('/admin/me/2fa');
  }

  /**
   * Update 2FA settings
   * 2FA সেটিংস আপডেট করা
   */
  async update2FA(adminId: string, data: Partial<Admin2FA>): Promise<Admin2FA> {
    return this.client.patch<Admin2FA>(`/admin/${adminId}/2fa`, data);
  }
}
