/**
 * Auth Session Endpoints
 * প্রমীকরণ সেশন এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AuthSession } from '@vubon/shared-types';
import { AUTH_SESSION } from '@vubon/shared-constants';

export class AuthSessionEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get all sessions for current user
   * বর্তমান ইউজারের সব সেশন পাওয়া
   */
  async getSessions(): Promise<AuthSession[]> {
    return this.client.get<AuthSession[]>('/auth/sessions');
  }

  /**
   * Get session by ID
   * আইডি দ্বারা সেশন পাওয়া
   */
  async getSession(sessionId: string): Promise<AuthSession> {
    return this.client.get<AuthSession>(`/auth/sessions/${sessionId}`);
  }

  /**
   * Create new session
   * নতুন সেশন তৈরি করা
   */
  async createSession(data: {
    userId: string;
    deviceId: string;
    expiresIn?: number;
  }): Promise<AuthSession> {
    return this.client.post<AuthSession>('/auth/sessions', data);
  }

  /**
   * Terminate session
   * সেশন টারমিনেট করা
   */
  async terminateSession(sessionId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/auth/sessions/${sessionId}`);
  }

  /**
   * Terminate all sessions
   * সব সেশন টারমিনেট করা
   */
  async terminateAllSessions(): Promise<{ success: boolean; count: number }> {
    return this.client.delete<{ success: boolean; count: number }>('/auth/sessions');
  }

  /**
   * Update session status
   * সেশন স্ট্যাটাস আপডেট করা
   */
  async updateSessionStatus(sessionId: string, status: string): Promise<AuthSession> {
    return this.client.patch<AuthSession>(`/auth/sessions/${sessionId}/status`, { status });
  }

  /**
   * Extend session
   * সেশন এক্সটেন্ড করা
   */
  async extendSession(sessionId: string, duration: number): Promise<AuthSession> {
    return this.client.post<AuthSession>(`/auth/sessions/${sessionId}/extend`, { duration });
  }

  /**
   * Get active sessions count
   * অ্যাক্টিভ সেশন কাউন্ট পাওয়া
   */
  async getActiveSessionsCount(): Promise<{ count: number }> {
    return this.client.get<{ count: number }>('/auth/sessions/active/count');
  }

  /**
   * Check if session is active
   * সেশন অ্যাক্টিভ কিনা চেক করা
   */
  async isSessionActive(sessionId: string): Promise<{ active: boolean }> {
    return this.client.get<{ active: boolean }>(`/auth/sessions/${sessionId}/active`);
  }

  /**
   * Get session by token
   * টোকেন দ্বারা সেশন পাওয়া
   */
  async getSessionByToken(token: string): Promise<AuthSession> {
    return this.client.post<AuthSession>('/auth/sessions/by-token', { token });
  }

  /**
   * Refresh session
   * সেশন রিফ্রেশ করা
   */
  async refreshSession(sessionId: string): Promise<{ session: AuthSession; token: string }> {
    return this.client.post<{ session: AuthSession; token: string }>(
      `/auth/sessions/${sessionId}/refresh`
    );
  }

  /**
   * Get session history
   * সেশন হিস্ট্রি পাওয়া
   */
  async getSessionHistory(options?: { limit?: number; offset?: number }): Promise<{
    items: AuthSession[];
    total: number;
    limit: number;
    offset: number;
  }> {
    const params: Record<string, string> = {};
    if (options?.limit) params.limit = String(options.limit);
    if (options?.offset) params.offset = String(options.offset);
    return this.client.get('/auth/sessions/history', { params });
  }
}
