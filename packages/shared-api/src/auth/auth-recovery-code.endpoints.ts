/**
 * Auth Recovery Code Endpoints
 * প্রমীকরণ রিকোভারি কোড এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';

export class AuthRecoveryCodeEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Generate recovery codes
   * রিকোভারি কোড তৈরি করা
   */
  async generateRecoveryCodes(): Promise<{ codes: string[] }> {
    return this.client.post<{ codes: string[] }>('/auth/recovery-codes');
  }

  /**
   * List recovery codes
   * রিকোভারি কোড লিস্ট পাওয়া
   */
  async listRecoveryCodes(): Promise<{ codes: string[] }> {
    return this.client.get<{ codes: string[] }>('/auth/recovery-codes');
  }

  /**
   * Verify recovery code
   * রিকোভারি কোড ভেরিফাই করা
   */
  async verifyRecoveryCode(code: string): Promise<{ verified: boolean }> {
    return this.client.post<{ verified: boolean }>('/auth/recovery-codes/verify', { code });
  }

  /**
   * Revoke recovery code
   * রিকোভারি কোড রিভোক করা
   */
  async revokeRecoveryCode(code: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/auth/recovery-codes/revoke', { code });
  }

  /**
   * Regenerate recovery codes
   * রিকোভারি কোড পুনরায় তৈরি করা
   */
  async regenerateRecoveryCodes(): Promise<{ codes: string[] }> {
    return this.client.post<{ codes: string[] }>('/auth/recovery-codes/regenerate');
  }
}
