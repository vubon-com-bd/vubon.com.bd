/**
 * Auth Session Manager
 * প্রমীকরণ সেশন ম্যানেজার
 */

import { AUTH_SESSION, AUTH } from '@vubon/shared-constants';

export const AuthSessionManager = {
  /**
   * Check if session is active
   * সেশন অ্যাক্টিভ কিনা চেক করা
   */
  isActive: (session: { lastActivityAt: Date; expiresAt: Date; isActive: boolean }): boolean => {
    if (!session.isActive) return false;
    const now = new Date();
    if (session.expiresAt <= now) return false;
    return true;
  },

  /**
   * Check if session is expired
   * সেশন এক্সপায়ার্ড কিনা চেক করা
   */
  isExpired: (session: { expiresAt: Date }): boolean => {
    return session.expiresAt <= new Date();
  },

  /**
   * Check if session is idle
   * সেশন আইডল কিনা চেক করা
   */
  isIdle: (
    session: { lastActivityAt: Date },
    idleTimeout: number = AUTH_SESSION.DEFAULTS.IDLE_TIMEOUT
  ): boolean => {
    const now = new Date();
    const idleTime = (now.getTime() - session.lastActivityAt.getTime()) / 1000;
    return idleTime > idleTimeout;
  },

  /**
   * Calculate session expiry
   * সেশন এক্সপায়ারি ক্যালকুলেট করা
   */
  calculateExpiry: (duration: number = AUTH_SESSION.DEFAULTS.ABSOLUTE_TIMEOUT): Date => {
    return new Date(Date.now() + duration * 1000);
  },

  /**
   * Calculate session timeout
   * সেশন টাইমআউট ক্যালকুলেট করা
   */
  calculateTimeout: (timeout: number = AUTH_SESSION.DEFAULTS.IDLE_TIMEOUT): Date => {
    return new Date(Date.now() + timeout * 1000);
  },

  /**
   * Extend session
   * সেশন এক্সটেন্ড করা
   */
  extendSession: (
    session: { expiresAt: Date; lastActivityAt: Date },
    duration: number = AUTH_SESSION.DEFAULTS.ABSOLUTE_TIMEOUT
  ): {
    expiresAt: Date;
    lastActivityAt: Date;
  } => {
    return {
      expiresAt: new Date(Date.now() + duration * 1000),
      lastActivityAt: new Date(),
    };
  },

  /**
   * Generate session token
   * সেশন টোকেন তৈরি করা
   */
  generateToken: (userId: string, deviceId: string): string => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    const data = `${userId}-${deviceId}-${timestamp}-${random}`;
    return btoa(data);
  },

  /**
   * Parse session token
   * সেশন টোকেন পার্স করা
   */
  parseToken: (
    token: string
  ): { userId: string; deviceId: string; timestamp: string; random: string } | null => {
    try {
      const decoded = atob(token);
      const parts = decoded.split('-');
      if (parts.length !== 4) return null;
      return {
        userId: parts[0],
        deviceId: parts[1],
        timestamp: parts[2],
        random: parts[3],
      };
    } catch {
      // Return null for invalid token without logging
      return null;
    }
  },

  /**
   * Get session status
   * সেশন স্ট্যাটাস পাওয়া
   */
  getStatus: (session: { lastActivityAt: Date; expiresAt: Date; isActive: boolean }): string => {
    if (!session.isActive) return AUTH_SESSION.STATUS.TERMINATED;
    if (AuthSessionManager.isExpired(session)) return AUTH_SESSION.STATUS.EXPIRED;
    if (AuthSessionManager.isIdle(session)) return AUTH_SESSION.STATUS.INACTIVE;
    return AUTH_SESSION.STATUS.ACTIVE;
  },

  /**
   * Check if session can be refreshed
   * সেশন রিফ্রেশ করা যাবে কিনা চেক করা
   */
  canRefresh: (
    session: { expiresAt: Date },
    refreshWindow: number = AUTH.DEFAULTS.REFRESH_TOKEN_EXPIRY
  ): boolean => {
    const now = new Date();
    const timeLeft = (session.expiresAt.getTime() - now.getTime()) / 1000;
    return timeLeft <= refreshWindow;
  },

  /**
   * Get session timeout in seconds
   * সেশন টাইমআউট সেকেন্ডে পাওয়া
   */
  getTimeoutInSeconds: (timeout: number = AUTH_SESSION.DEFAULTS.IDLE_TIMEOUT): number => {
    return timeout;
  },

  /**
   * Format session time remaining
   * সেশন বাকি সময় ফরম্যাট করা
   */
  formatTimeRemaining: (session: { expiresAt: Date }): string => {
    const now = new Date();
    const timeLeft = (session.expiresAt.getTime() - now.getTime()) / 1000;

    if (timeLeft <= 0) return 'Expired';

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = Math.floor(timeLeft % 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  },
};
