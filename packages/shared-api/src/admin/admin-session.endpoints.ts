/**
 * Admin Session Endpoints
 * অ্যাডমিন সেশন এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import {
  AdminSession,
  AdminSessionCreateInput,
  AdminSessionUpdateInput,
} from '@vubon/shared-types';
import { ADMIN_SESSION } from '@vubon/shared-constants';

export class AdminSessionEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get admin sessions
   * অ্যাডমিনের সেশন পাওয়া
   */
  async getSessions(adminId: string): Promise<AdminSession[]> {
    return this.client.get<AdminSession[]>(`/admin/${adminId}/sessions`);
  }

  /**
   * Get current admin sessions
   * বর্তমান অ্যাডমিনের সেশন পাওয়া
   */
  async getMySessions(): Promise<AdminSession[]> {
    return this.client.get<AdminSession[]>('/admin/me/sessions');
  }

  /**
   * Get session by ID
   * আইডি দ্বারা সেশন পাওয়া
   */
  async getSession(sessionId: string): Promise<AdminSession> {
    return this.client.get<AdminSession>(`/admin/sessions/${sessionId}`);
  }

  /**
   * Create session
   * সেশন তৈরি করা
   */
  async createSession(data: AdminSessionCreateInput): Promise<AdminSession> {
    return this.client.post<AdminSession>('/admin/sessions', data);
  }

  /**
   * Update session
   * সেশন আপডেট করা
   */
  async updateSession(sessionId: string, data: AdminSessionUpdateInput): Promise<AdminSession> {
    return this.client.patch<AdminSession>(`/admin/sessions/${sessionId}`, data);
  }

  /**
   * Terminate session
   * সেশন টারমিনেট করা
   */
  async terminateSession(sessionId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/admin/sessions/${sessionId}`);
  }

  /**
   * Terminate all sessions
   * সব সেশন টারমিনেট করা
   */
  async terminateAllSessions(adminId: string): Promise<{ success: boolean; count: number }> {
    return this.client.delete<{ success: boolean; count: number }>(`/admin/${adminId}/sessions`);
  }

  /**
   * Get active sessions count
   * অ্যাক্টিভ সেশন কাউন্ট পাওয়া
   */
  async getActiveSessionsCount(adminId: string): Promise<{ count: number }> {
    return this.client.get<{ count: number }>(`/admin/${adminId}/sessions/active/count`);
  }

  /**
   * Extend session
   * সেশন এক্সটেন্ড করা
   */
  async extendSession(sessionId: string, duration: number): Promise<AdminSession> {
    return this.client.post<AdminSession>(`/admin/sessions/${sessionId}/extend`, { duration });
  }

  /**
   * Get session statuses from constants
   * কনস্ট্যান্ট থেকে সেশন স্ট্যাটাস পাওয়া
   */
  getSessionStatuses(): Record<string, string> {
    return {
      ACTIVE: ADMIN_SESSION.STATUS.ACTIVE,
      EXPIRED: ADMIN_SESSION.STATUS.EXPIRED,
      TERMINATED: ADMIN_SESSION.STATUS.TERMINATED,
      REVOKED: ADMIN_SESSION.STATUS.REVOKED,
      PENDING: ADMIN_SESSION.STATUS.PENDING,
      INACTIVE: ADMIN_SESSION.STATUS.INACTIVE,
    };
  }

  /**
   * Get session events from constants
   * কনস্ট্যান্ট থেকে সেশন ইভেন্ট পাওয়া
   */
  getSessionEvents(): Record<string, string> {
    return {
      CREATED: ADMIN_SESSION.EVENTS.CREATED,
      UPDATED: ADMIN_SESSION.EVENTS.UPDATED,
      EXPIRED: ADMIN_SESSION.EVENTS.EXPIRED,
      TERMINATED: ADMIN_SESSION.EVENTS.TERMINATED,
      REVOKED: ADMIN_SESSION.EVENTS.REVOKED,
      REFRESHED: ADMIN_SESSION.EVENTS.REFRESHED,
    };
  }

  /**
   * Get default session config from constants
   * কনস্ট্যান্ট থেকে ডিফল্ট সেশন কনফিগ পাওয়া
   */
  getSessionDefaults(): {
    maxSessions: number;
    idleTimeout: number;
    absoluteTimeout: number;
    extendOnActivity: boolean;
  } {
    return {
      maxSessions: ADMIN_SESSION.DEFAULTS.MAX_SESSIONS,
      idleTimeout: ADMIN_SESSION.DEFAULTS.IDLE_TIMEOUT,
      absoluteTimeout: ADMIN_SESSION.DEFAULTS.ABSOLUTE_TIMEOUT,
      extendOnActivity: ADMIN_SESSION.DEFAULTS.EXTEND_ON_ACTIVITY,
    };
  }

  /**
   * Check if session is active
   * সেশন অ্যাক্টিভ কিনা চেক করা
   */
  isSessionActive(status: string): boolean {
    return status === ADMIN_SESSION.STATUS.ACTIVE;
  }

  /**
   * Check if session is expired
   * সেশন এক্সপায়ার্ড কিনা চেক করা
   */
  isSessionExpired(status: string): boolean {
    return status === ADMIN_SESSION.STATUS.EXPIRED;
  }

  /**
   * Check if session is terminated
   * সেশন টারমিনেটেড কিনা চেক করা
   */
  isSessionTerminated(status: string): boolean {
    return status === ADMIN_SESSION.STATUS.TERMINATED;
  }
}
