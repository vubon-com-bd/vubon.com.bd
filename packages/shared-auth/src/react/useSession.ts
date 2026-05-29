/**
 * useSession Hook - Session management hook
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-auth/shared-auth/src/react/useSession
 * 
 * RULES:
 * ✅ ONLY session management hook - NO business logic
 * ✅ NO analytics, device tracking engine
 * ✅ Pure React hook for session operations
 * ✅ TypeScript strict
 */

import React from 'react';
import { getSessionManager } from '../client/session-manager';
import type { Session } from '../client/session-manager';

// ==================== Types ====================

export interface UseSessionReturn {
  /** List of all sessions */
  sessions: Session[];
  /** Current session */
  currentSession: Session | undefined;
  /** Whether sessions are loading */
  loading: boolean;
  /** Whether there was an error loading sessions */
  error: Error | null;
  /** Revoke a specific session */
  revokeSession: (sessionId: string, reason?: string) => Promise<boolean>;
  /** Revoke all sessions (except current) */
  revokeAllSessions: (exceptCurrent?: boolean, reason?: string) => Promise<number>;
  /** Revoke sessions by device type */
  revokeSessionsByDeviceType: (deviceType: string, reason?: string) => Promise<number>;
  /** Refresh session list */
  refresh: () => Promise<void>;
  /** Extend current session */
  extendCurrentSession: (durationSeconds?: number) => Promise<string | null>;
  /** Send heartbeat to keep session alive */
  sendHeartbeat: (currentUrl?: string) => Promise<boolean>;
  /** Get active sessions only */
  activeSessions: Session[];
  /** Get sessions by device type */
  getSessionsByDeviceType: (deviceType: string) => Session[];
  /** Get sessions by network type (Bangladesh specific) */
  getSessionsByNetworkType: (networkType: string) => Session[];
  /** Get sessions by district (Bangladesh specific) */
  getSessionsByDistrict: (district: string) => Session[];
  /** Get family shared sessions */
  familySharedSessions: Session[];
  /** Session statistics including Bangladesh specific metrics */
  stats: {
    totalActive: number;
    totalExpired: number;
    currentSessionTrustLevel: string;
    mfaVerified: boolean;
    hasFamilySharedSessions: boolean;
    /** Sessions grouped by network type (2G, 3G, 4G, WiFi, etc.) */
    sessionsByNetworkType: Record<string, number>;
    /** Sessions grouped by district */
    sessionsByDistrict: Record<string, number>;
  };
}

// ==================== Hook ====================

/**
 * Hook for managing user sessions
 * 
 * @returns Session management methods and state
 * 
 * @example
 * const { sessions, revokeSession, revokeAllSessions, activeSessions } = useSession();
 */
export const useSession = (): UseSessionReturn => {
  const sessionManager = React.useMemo(() => getSessionManager(), []);
  const [sessions, setSessions] = React.useState<Session[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  
  const loadSessions = React.useCallback(async () => {
    if (!sessionManager) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const loadedSessions = await sessionManager.loadSessions();
      setSessions(loadedSessions);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load sessions');
      setError(error);
      console.error('Failed to load sessions:', error);
    } finally {
      setLoading(false);
    }
  }, [sessionManager]);
  
  React.useEffect(() => {
    if (!sessionManager) return;
    
    loadSessions();
    
    const unsubscribe = sessionManager.subscribe((newSessions) => {
      setSessions(newSessions);
    });
    
    return unsubscribe;
  }, [sessionManager, loadSessions]);
  
  const revokeSession = React.useCallback(
    async (sessionId: string, reason?: string): Promise<boolean> => {
      if (!sessionManager) return false;
      const success = await sessionManager.revokeSession(sessionId, reason);
      if (success) {
        await loadSessions();
      }
      return success;
    },
    [sessionManager, loadSessions]
  );
  
  const revokeAllSessions = React.useCallback(
    async (exceptCurrent: boolean = true, reason?: string): Promise<number> => {
      if (!sessionManager) return 0;
      const count = await sessionManager.revokeAllSessions(exceptCurrent, reason);
      if (count > 0) {
        await loadSessions();
      }
      return count;
    },
    [sessionManager, loadSessions]
  );
  
  const revokeSessionsByDeviceType = React.useCallback(
    async (deviceType: string, reason?: string): Promise<number> => {
      if (!sessionManager) return 0;
      const count = await sessionManager.revokeSessionsByDeviceType(deviceType, reason);
      if (count > 0) {
        await loadSessions();
      }
      return count;
    },
    [sessionManager, loadSessions]
  );
  
  const extendCurrentSession = React.useCallback(
    async (durationSeconds?: number): Promise<string | null> => {
      if (!sessionManager) return null;
      return sessionManager.extendCurrentSession(durationSeconds);
    },
    [sessionManager]
  );
  
  const sendHeartbeat = React.useCallback(
    async (currentUrl?: string): Promise<boolean> => {
      if (!sessionManager) return false;
      return sessionManager.sendHeartbeat(currentUrl);
    },
    [sessionManager]
  );
  
  const getSessionsByDeviceType = React.useCallback(
    (deviceType: string): Session[] => {
      return sessions.filter((s) => s.deviceInfo.deviceType === deviceType);
    },
    [sessions]
  );
  
  const getSessionsByNetworkType = React.useCallback(
    (networkType: string): Session[] => {
      return sessions.filter((s) => s.deviceInfo.networkType === networkType);
    },
    [sessions]
  );
  
  const getSessionsByDistrict = React.useCallback(
    (district: string): Session[] => {
      return sessions.filter((s) => s.location?.district === district);
    },
    [sessions]
  );
  
  const currentSession = React.useMemo(() => {
    return sessions.find((s) => s.isCurrent);
  }, [sessions]);
  
  const activeSessions = React.useMemo(() => {
    const now = new Date();
    return sessions.filter((s) => new Date(s.expiresAt) > now);
  }, [sessions]);
  
  const familySharedSessions = React.useMemo(() => {
    return sessions.filter((s) => s.isFamilyShared === true);
  }, [sessions]);
  
  const stats = React.useMemo(() => {
    const now = new Date();
    const active = sessions.filter((s) => new Date(s.expiresAt) > now);
    const expired = sessions.filter((s) => new Date(s.expiresAt) <= now);
    const current = sessions.find((s) => s.isCurrent);
    
    // বাংলাদেশ স্পেসিফিক – নেটওয়ার্ক টাইপ ও জেলা ভিত্তিক কাউন্ট
    const sessionsByNetworkType: Record<string, number> = {};
    const sessionsByDistrict: Record<string, number> = {};
    
    for (const session of active) {
      const networkType = session.deviceInfo.networkType || 'unknown';
      sessionsByNetworkType[networkType] = (sessionsByNetworkType[networkType] || 0) + 1;
      
      const district = session.location?.district;
      if (district) {
        sessionsByDistrict[district] = (sessionsByDistrict[district] || 0) + 1;
      }
    }
    
    return {
      totalActive: active.length,
      totalExpired: expired.length,
      currentSessionTrustLevel: current?.trustLevel || 'untrusted',
      mfaVerified: current?.mfaVerified || false,
      hasFamilySharedSessions: sessions.some((s) => s.isFamilyShared === true),
      sessionsByNetworkType,
      sessionsByDistrict,
    };
  }, [sessions]);
  
  return {
    sessions,
    currentSession,
    loading,
    error,
    revokeSession,
    revokeAllSessions,
    revokeSessionsByDeviceType,
    refresh: loadSessions,
    extendCurrentSession,
    sendHeartbeat,
    activeSessions,
    getSessionsByDeviceType,
    getSessionsByNetworkType,
    getSessionsByDistrict,
    familySharedSessions,
    stats,
  };
};

/**
 * Hook for getting only current session (lightweight)
 */
export const useCurrentSession = (): { session: Session | undefined; loading: boolean } => {
  const { currentSession, loading } = useSession();
  return { session: currentSession, loading };
};

/**
 * Hook for session statistics (lightweight)
 */
export const useSessionStats = () => {
  const { stats } = useSession();
  return stats;
};

/**
 * Hook for revoking sessions (no state subscription)
 */
export const useSessionActions = () => {
  const sessionManager = React.useMemo(() => getSessionManager(), []);
  
  const revokeSession = React.useCallback(
    async (sessionId: string, reason?: string): Promise<boolean> => {
      if (!sessionManager) return false;
      return sessionManager.revokeSession(sessionId, reason);
    },
    [sessionManager]
  );
  
  const revokeAllSessions = React.useCallback(
    async (exceptCurrent: boolean = true, reason?: string): Promise<number> => {
      if (!sessionManager) return 0;
      return sessionManager.revokeAllSessions(exceptCurrent, reason);
    },
    [sessionManager]
  );
  
  const revokeSessionsByDeviceType = React.useCallback(
    async (deviceType: string, reason?: string): Promise<number> => {
      if (!sessionManager) return 0;
      return sessionManager.revokeSessionsByDeviceType(deviceType, reason);
    },
    [sessionManager]
  );
  
  return {
    revokeSession,
    revokeAllSessions,
    revokeSessionsByDeviceType,
  };
};

// ==================== Type Exports ====================

export type { UseSessionReturn };
