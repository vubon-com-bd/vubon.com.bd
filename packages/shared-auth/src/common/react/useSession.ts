import { useState, useEffect, useCallback } from 'react';
import { SessionManager, Session } from '../client/session-manager';
import { useAuth } from './useAuth';

export interface UseSessionOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
  onSessionExpired?: () => void;
}

export const useSession = (sessionManager: SessionManager, options: UseSessionOptions = {}) => {
  const { user } = useAuth();
  const [session, setSession] = useState<Session | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const { autoRefresh = true, refreshInterval = 60000, onSessionExpired } = options;

  const createSession = useCallback(
    (deviceInfo?: Session['deviceInfo']) => {
      if (!user) {
        throw new Error('User must be authenticated to create a session');
      }
      const newSession = sessionManager.createSession(user.id, deviceInfo);
      setSession(newSession);
      setIsActive(true);
      return newSession;
    },
    [user, sessionManager]
  );

  const validateSession = useCallback(
    (sessionId: string): boolean => {
      const isValid = sessionManager.validateSession(sessionId);
      setIsActive(isValid);
      if (!isValid && onSessionExpired) {
        onSessionExpired();
      }
      return isValid;
    },
    [sessionManager, onSessionExpired]
  );

  const refreshSession = useCallback(() => {
    if (session) {
      const extended = sessionManager.extendSession(session.id);
      if (extended) {
        const updatedSession = sessionManager.getSession(session.id);
        setSession(updatedSession);
        return true;
      }
    }
    return false;
  }, [session, sessionManager]);

  const endSession = useCallback(() => {
    if (session) {
      sessionManager.invalidateSession(session.id);
      setSession(null);
      setIsActive(false);
    }
  }, [session, sessionManager]);

  const getActiveSessions = useCallback(() => {
    if (!user) return [];
    return sessionManager.getActiveSessions(user.id);
  }, [user, sessionManager]);

  const getSessionCount = useCallback(() => {
    if (!user) return 0;
    return sessionManager.getSessionCount(user.id);
  }, [user, sessionManager]);

  // Auto-refresh session
  useEffect(() => {
    if (!autoRefresh || !session) return;

    const interval = setInterval(() => {
      refreshSession();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, session, refreshSession]);

  // Update remaining time
  useEffect(() => {
    if (!session) {
      setRemainingTime(0);
      return;
    }

    const updateRemainingTime = () => {
      const remaining = session.expiresAt.getTime() - Date.now();
      setRemainingTime(Math.max(0, remaining));
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [session]);

  return {
    session,
    isActive,
    remainingTime,
    createSession,
    validateSession,
    refreshSession,
    endSession,
    getActiveSessions,
    getSessionCount,
  };
};
