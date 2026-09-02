/**
 * Auth Account Lock Endpoints
 * প্রমীকরণ অ্যাকাউন্ট লক এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AuthAccountLockStatus } from '@vubon/shared-types';

export class AuthAccountLockEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get account lock status
   * অ্যাকাউন্ট লক স্ট্যাটাস পাওয়া
   */
  async getLockStatus(): Promise<AuthAccountLockStatus> {
    return this.client.get<AuthAccountLockStatus>('/auth/account/lock-status');
  }

  /**
   * Lock account
   * অ্যাকাউন্ট লক করা
   */
  async lockAccount(reason?: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/auth/account/lock', { reason });
  }

  /**
   * Unlock account
   * অ্যাকাউন্ট আনলক করা
   */
  async unlockAccount(): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/auth/account/unlock');
  }

  /**
   * Get lock history
   * লক হিস্ট্রি পাওয়া
   */
  async getLockHistory(): Promise<{
    items: { lockedAt: Date; unlockedAt?: Date; reason?: string; lockedBy?: string }[];
  }> {
    return this.client.get<{
      items: { lockedAt: Date; unlockedAt?: Date; reason?: string; lockedBy?: string }[];
    }>('/auth/account/lock-history');
  }

  /**
   * Check if account can be unlocked
   * অ্যাকাউন্ট আনলক করা যাবে কিনা চেক করা
   */
  async canUnlock(): Promise<{ canUnlock: boolean; remainingTime?: number }> {
    return this.client.get<{ canUnlock: boolean; remainingTime?: number }>(
      '/auth/account/can-unlock'
    );
  }
}
