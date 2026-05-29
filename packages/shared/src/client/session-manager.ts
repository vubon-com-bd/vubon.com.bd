/**
 * Session Manager - Active session management
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-auth/client/session-manager
 *
 * RULES:
 * ✅ ONLY session management - NO business analytics
 * ✅ NO audit logging engine, admin session management
 * ✅ Pure session CRUD operations
 * ✅ Singleton pattern for consistent state
 * ✅ TypeScript strict
 */

import type { Session, DeviceInfo, LocationInfo } from '@vubon/auth-types';

// ==================== Types ====================

// বাংলাদেশ স্পেসিফিক নেটওয়ার্ক ও লোকেশন টাইপ
export type NetworkType = '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
export type MobileOperator = 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';

export interface SessionDeviceInfo {
  deviceType: string;
  os: string;
  osVersion?: string;
  browser: string;
  browserVersion?: string;
  isMobile: boolean;
  isTouchDevice?: boolean;
  // বাংলাদেশ স্পেসিফিক ফিল্ড
  networkType?: NetworkType;
  mobileOperator?: MobileOperator;
  dataSaverEnabled?: boolean;
  district?: string;
  upazila?: string;
}

export interface SessionLocation {
  country?: string;
  city?: string;
  district?: string;
  upazila?: string;
  division?: string;
  postalCode?: string;
  isp?: string;
}

export interface SessionData {
  id: string;
  userId: string;
  deviceInfo: SessionDeviceInfo;
  ipAddress: string;
  location?: SessionLocation;
  lastActivityAt: string;
  lastActivityUrl?: string;
  expiresAt: string;
  idleTimeoutAt: string;
  absoluteTimeoutAt: string;
  createdAt: string;
  isCurrent: boolean;
  trustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
  mfaVerified: boolean;
  isFamilyShared?: boolean;
  familyMemberName?: string;
  /** সেশন ট্রান্সফার আইডি (ডিভাইস থেকে ডিভাইসে সেশন ট্রান্সফারের জন্য) */
  sessionTransferId?: string;
}

export interface SessionManagerConfig {
  apiClient: {
    getSessions: (includeExpired?: boolean) => Promise<SessionData[]>;
    getSessionById: (sessionId: string) => Promise<SessionData>;
    revokeSession: (sessionId: string, reason?: string) => Promise<{ success: boolean; message: string }>;
    revokeAllSessions: (exceptCurrent?: boolean, reason?: string) => Promise<{ success: boolean; revokedCount: number; revokedSessionIds: string[] }>;
    revokeSessionsByDeviceType?: (deviceType: string, reason?: string) => Promise<{ success: boolean; revokedCount: number }>;
    revokeSessionsByNetworkType?: (networkType: NetworkType, reason?: string) => Promise<{ success: boolean; revokedCount: number }>;  // বাংলাদেশ স্পেসিফিক
    revokeSessionsByDistrict?: (district: string, reason?: string) => Promise<{ success: boolean; revokedCount: number }>;  // বাংলাদেশ স্পেসিফিক
    extendSession?: (sessionId: string, durationSeconds?: number) => Promise<{ expiresAt: string }>;
    sendHeartbeat?: (sessionId: string, currentUrl?: string, activityType?: 'page_view' | 'api_call' | 'user_interaction') => Promise<{ success: boolean; sessionExtended: boolean }>;
  };
  onSessionRevoked?: (sessionId: string, reason?: string) => void;
  onAllSessionsRevoked?: (revokedCount: number) => void;
  onSessionExpired?: (sessionId: string) => void;  // নতুন: সেশন এক্সপায়ার হলে কলব্যাক
  /** সেশন রিফ্রেশ ইন্টারভাল (মিলিসেকেন্ড) – ডিফল্ট ৫ মিনিট */
  refreshIntervalMs?: number;
  /** হৃদস্পন্দন সক্রিয় কিনা (ডিফল্ট true) */
  heartbeatEnabled?: boolean;
  /** হৃদস্পন্দন ইন্টারভাল (মিলিসেকেন্ড) – ডিফল্ট ২ মিনিট */
  heartbeatIntervalMs?: number;
}

export interface SessionStats {
  totalActive: number;
  totalExpired: number;
  totalRevoked: number;
  currentSessionTrustLevel: string;
  mfaVerified: boolean;
  hasFamilySharedSessions: boolean;
  // বাংলাদেশ স্পেসিফিক স্ট্যাটিস্টিকস
  sessionsByNetworkType?: Record<NetworkType, number>;
  sessionsByMobileOperator?: Record<MobileOperator, number>;
  sessionsByDistrict?: Array<{ district: string; count: number }>;
}

// ==================== Session Manager ====================

export class SessionManager {
  private config: SessionManagerConfig;
  private sessions: SessionData[] = [];
  private listeners: Set<(sessions: SessionData[]) => void> = new Set();
  private loadingPromise: Promise<SessionData[]> | null = null;
  private refreshInterval: ReturnType<typeof setInterval> | null = null;
  private heartbeatInterval: ReturnType<typeof setInterval> | null = null;

  constructor(config: SessionManagerConfig) {
    this.config = config;
    this.startAutoRefresh();
    if (this.config.heartbeatEnabled !== false) {
      this.startHeartbeat();
    }
  }

  /**
   * Start auto-refresh timer
   */
  private startAutoRefresh(): void {
    const intervalMs = this.config.refreshIntervalMs ?? 5 * 60 * 1000; // 5 minutes
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    this.refreshInterval = setInterval(() => {
      this.loadSessions().catch(() => {});
    }, intervalMs);
  }

  /**
   * Start heartbeat timer to keep session alive
   */
  private startHeartbeat(): void {
    const intervalMs = this.config.heartbeatIntervalMs ?? 2 * 60 * 1000; // 2 minutes
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    this.heartbeatInterval = setInterval(() => {
      this.sendHeartbeat().catch(() => {});
    }, intervalMs);
  }

  /**
   * Load all sessions with deduplication
   */
  async loadSessions(includeExpired: boolean = false): Promise<SessionData[]> {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = this.doLoadSessions(includeExpired);
    
    try {
      const result = await this.loadingPromise;
      return result;
    } finally {
      this.loadingPromise = null;
    }
  }

  /**
   * Actual load implementation
   */
  private async doLoadSessions(includeExpired: boolean): Promise<SessionData[]> {
    try {
      this.sessions = await this.config.apiClient.getSessions(includeExpired);
      
      // চেক করা: কোন সেশন এক্সপায়ার হয়েছে কিনা
      const now = new Date();
      for (const session of this.sessions) {
        if (new Date(session.expiresAt) <= now && !session.isCurrent) {
          this.config.onSessionExpired?.(session.id);
        }
      }
      
      this.notifyListeners();
      return this.sessions;
    } catch (error) {
      console.error('Failed to load sessions:', error);
      return [];
    }
  }

  /**
   * Get session by ID
   */
  async getSessionById(sessionId: string): Promise<SessionData | null> {
    try {
      return await this.config.apiClient.getSessionById(sessionId);
    } catch {
      return null;
    }
  }

  /**
   * Get cached sessions (no API call)
   */
  getSessions(): SessionData[] {
    return [...this.sessions];
  }

  /**
   * Get active sessions only (not expired)
   */
  getActiveSessions(): SessionData[] {
    const now = new Date();
    return this.sessions.filter((s) => new Date(s.expiresAt) > now);
  }

  /**
   * Get current session
   */
  getCurrentSession(): SessionData | undefined {
    return this.sessions.find((s) => s.isCurrent);
  }

  /**
   * Get sessions by device type
   */
  getSessionsByDeviceType(deviceType: string): SessionData[] {
    return this.sessions.filter((s) => s.deviceInfo.deviceType === deviceType);
  }

  /**
   * Get sessions by trust level
   */
  getSessionsByTrustLevel(trustLevel: SessionData['trustLevel']): SessionData[] {
    return this.sessions.filter((s) => s.trustLevel === trustLevel);
  }

  /**
   * Get sessions by network type (বাংলাদেশ স্পেসিফিক)
   */
  getSessionsByNetworkType(networkType: NetworkType): SessionData[] {
    return this.sessions.filter((s) => s.deviceInfo.networkType === networkType);
  }

  /**
   * Get sessions by mobile operator (বাংলাদেশ স্পেসিফিক)
   */
  getSessionsByMobileOperator(operator: MobileOperator): SessionData[] {
    return this.sessions.filter((s) => s.deviceInfo.mobileOperator === operator);
  }

  /**
   * Get sessions by district (বাংলাদেশ স্পেসিফিক)
   */
  getSessionsByDistrict(district: string): SessionData[] {
    return this.sessions.filter((s) => s.location?.district === district);
  }

  /**
   * Get family shared sessions (বাংলাদেশ স্পেসিফিক – যৌথ পরিবারের জন্য)
   */
  getFamilySharedSessions(): SessionData[] {
    return this.sessions.filter((s) => s.isFamilyShared === true);
  }

  /**
   * Revoke specific session
   */
  async revokeSession(sessionId: string, reason?: string): Promise<boolean> {
    try {
      await this.config.apiClient.revokeSession(sessionId, reason);
      this.sessions = this.sessions.filter((s) => s.id !== sessionId);
      this.notifyListeners();
      this.config.onSessionRevoked?.(sessionId, reason);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Revoke all sessions except current
   */
  async revokeAllSessions(exceptCurrent: boolean = true, reason?: string): Promise<number> {
    try {
      const response = await this.config.apiClient.revokeAllSessions(exceptCurrent, reason);
      
      if (response.success) {
        if (exceptCurrent) {
          const current = this.getCurrentSession();
          this.sessions = current ? [current] : [];
        } else {
          this.sessions = [];
        }
        this.notifyListeners();
        this.config.onAllSessionsRevoked?.(response.revokedCount);
        return response.revokedCount;
      }
      return 0;
    } catch {
      return 0;
    }
  }

  /**
   * Revoke sessions by device type
   */
  async revokeSessionsByDeviceType(deviceType: string, reason?: string): Promise<number> {
    if (!this.config.apiClient.revokeSessionsByDeviceType) {
      throw new Error('revokeSessionsByDeviceType not supported');
    }
    
    try {
      const response = await this.config.apiClient.revokeSessionsByDeviceType(deviceType, reason);
      
      if (response.success) {
        this.sessions = this.sessions.filter((s) => s.deviceInfo.deviceType !== deviceType);
        this.notifyListeners();
        return response.revokedCount;
      }
      return 0;
    } catch {
      return 0;
    }
  }

  /**
   * Revoke sessions by network type (বাংলাদেশ স্পেসিফিক)
   */
  async revokeSessionsByNetworkType(networkType: NetworkType, reason?: string): Promise<number> {
    if (!this.config.apiClient.revokeSessionsByNetworkType) {
      throw new Error('revokeSessionsByNetworkType not supported');
    }
    
    try {
      const response = await this.config.apiClient.revokeSessionsByNetworkType(networkType, reason);
      
      if (response.success) {
        this.sessions = this.sessions.filter((s) => s.deviceInfo.networkType !== networkType);
        this.notifyListeners();
        return response.revokedCount;
      }
      return 0;
    } catch {
      return 0;
    }
  }

  /**
   * Revoke sessions by district (বাংলাদেশ স্পেসিফিক)
   */
  async revokeSessionsByDistrict(district: string, reason?: string): Promise<number> {
    if (!this.config.apiClient.revokeSessionsByDistrict) {
      throw new Error('revokeSessionsByDistrict not supported');
    }
    
    try {
      const response = await this.config.apiClient.revokeSessionsByDistrict(district, reason);
      
      if (response.success) {
        this.sessions = this.sessions.filter((s) => s.location?.district !== district);
        this.notifyListeners();
        return response.revokedCount;
      }
      return 0;
    } catch {
      return 0;
    }
  }

  /**
   * Extend current session (keep alive)
   */
  async extendCurrentSession(durationSeconds?: number): Promise<string | null> {
    const current = this.getCurrentSession();
    if (!current || !this.config.apiClient.extendSession) {
      return null;
    }
    
    try {
      const response = await this.config.apiClient.extendSession(current.id, durationSeconds);
      
      // Update session in cache
      const index = this.sessions.findIndex((s) => s.id === current.id);
      if (index !== -1) {
        this.sessions[index] = { ...this.sessions[index], expiresAt: response.expiresAt };
        this.notifyListeners();
      }
      
      return response.expiresAt;
    } catch {
      return null;
    }
  }

  /**
   * Send heartbeat to keep session alive
   */
  async sendHeartbeat(currentUrl?: string): Promise<boolean> {
    const current = this.getCurrentSession();
    if (!current || !this.config.apiClient.sendHeartbeat) {
      return false;
    }
    
    try {
      const response = await this.config.apiClient.sendHeartbeat(current.id, currentUrl);
      
      if (response.sessionExtended) {
        // Refresh sessions to get updated expiry
        await this.loadSessions();
      }
      
      return response.success;
    } catch {
      return false;
    }
  }

  /**
   * Get session statistics (বাংলাদেশ স্পেসিফিক স্ট্যাটিস্টিকস সহ)
   */
  getStats(): SessionStats {
    const now = new Date();
    const active = this.sessions.filter((s) => new Date(s.expiresAt) > now);
    const expired = this.sessions.filter((s) => new Date(s.expiresAt) <= now);
    const current = this.getCurrentSession();
    
    // বাংলাদেশ স্পেসিফিক স্ট্যাটিস্টিকস
    const sessionsByNetworkType: Record<NetworkType, number> = {
      '2g': 0, '3g': 0, '4g': 0, '5g': 0, 'wifi': 0, 'unknown': 0,
    };
    const sessionsByMobileOperator: Record<MobileOperator, number> = {
      'gp': 0, 'robi': 0, 'banglalink': 0, 'teletalk': 0, 'unknown': 0,
    };
    const districtMap = new Map<string, number>();
    
    for (const session of this.sessions) {
      const networkType = session.deviceInfo.networkType;
      if (networkType && sessionsByNetworkType[networkType] !== undefined) {
        sessionsByNetworkType[networkType]++;
      }
      
      const operator = session.deviceInfo.mobileOperator;
      if (operator && sessionsByMobileOperator[operator] !== undefined) {
        sessionsByMobileOperator[operator]++;
      }
      
      const district = session.location?.district;
      if (district) {
        districtMap.set(district, (districtMap.get(district) || 0) + 1);
      }
    }
    
    const sessionsByDistrict = Array.from(districtMap.entries())
      .map(([district, count]) => ({ district, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // শীর্ষ ১০ জেলা
    
    return {
      totalActive: active.length,
      totalExpired: expired.length,
      totalRevoked: this.sessions.filter((s) => !active.includes(s) && !expired.includes(s)).length,
      currentSessionTrustLevel: current?.trustLevel || 'untrusted',
      mfaVerified: current?.mfaVerified || false,
      hasFamilySharedSessions: this.sessions.some((s) => s.isFamilyShared === true),
      sessionsByNetworkType,
      sessionsByMobileOperator,
      sessionsByDistrict,
    };
  }

  /**
   * Subscribe to session changes
   */
  subscribe(listener: (sessions: SessionData[]) => void): () => void {
    this.listeners.add(listener);
    listener(this.getSessions());
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners
   */
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.getSessions()));
  }

  /**
   * Clear sessions cache
   */
  clear(): void {
    this.sessions = [];
    this.loadingPromise = null;
    this.notifyListeners();
  }

  /**
   * Refresh sessions (force reload)
   */
  async refresh(): Promise<SessionData[]> {
    this.clear();
    return this.loadSessions();
  }

  /**
   * Destroy session manager (clean up intervals)
   */
  destroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    this.clear();
  }
}

// ==================== Singleton ====================

let sessionManagerInstance: SessionManager | null = null;

export const createSessionManager = (config: SessionManagerConfig): SessionManager => {
  if (sessionManagerInstance) {
    sessionManagerInstance.destroy();
    sessionManagerInstance = null;
  }
  sessionManagerInstance = new SessionManager(config);
  return sessionManagerInstance;
};

export const getSessionManager = (): SessionManager | null => {
  return sessionManagerInstance;
};

export const resetSessionManager = (): void => {
  if (sessionManagerInstance) {
    sessionManagerInstance.destroy();
    sessionManagerInstance = null;
  }
};

// ==================== Type Exports ====================

export type { SessionStats, SessionData, SessionDeviceInfo, SessionLocation, NetworkType, MobileOperator };
