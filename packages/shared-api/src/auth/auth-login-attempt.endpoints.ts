/**
 * Auth Login Attempt Endpoints
 * প্রমীকরণ লগইন Attempt এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AuthLoginAttemptStats } from '@vubon/shared-types';

export class AuthLoginAttemptEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get login attempt stats
   * লগইন Attempt স্ট্যাটিসটিক্স পাওয়া
   */
  async getStats(): Promise<AuthLoginAttemptStats> {
    return this.client.get<AuthLoginAttemptStats>('/auth/login-attempts/stats');
  }

  /**
   * Get login attempt history
   * লগইন Attempt হিস্ট্রি পাওয়া
   */
  async getHistory(limit: number = 10): Promise<{
    items: { attemptedAt: Date; success: boolean; ipAddress: string; userAgent?: string }[];
  }> {
    return this.client.get<{
      items: { attemptedAt: Date; success: boolean; ipAddress: string; userAgent?: string }[];
    }>('/auth/login-attempts/history', { params: { limit: String(limit) } });
  }

  /**
   * Clear login attempt history
   * লগইন Attempt হিস্ট্রি ক্লিয়ার করা
   */
  async clearHistory(): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>('/auth/login-attempts/history');
  }

  /**
   * Check if IP is blocked
   * IP ব্লকড কিনা চেক করা
   */
  async isIPBlocked(ipAddress: string): Promise<{ blocked: boolean; remainingTime?: number }> {
    return this.client.get<{ blocked: boolean; remainingTime?: number }>(
      '/auth/login-attempts/ip-blocked',
      {
        params: { ip: ipAddress },
      }
    );
  }

  /**
   * Unblock IP
   * IP আনব্লক করা
   */
  async unblockIP(ipAddress: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/auth/login-attempts/unblock-ip', {
      ip: ipAddress,
    });
  }
}
