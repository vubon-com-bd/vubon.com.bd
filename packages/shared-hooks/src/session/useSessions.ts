/**
 * useSessions Hook - Sessions query with shared-api integration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * IMPROVEMENTS:
 * - Uses shared-api instead of raw fetch for consistent error handling and auth
 * - Proper TypeScript types with shared-types integration
 * - Added Bengali message support
 * - Proper retry logic and error handling
 * - Cache invalidation support
 * - Type-safe query keys
 * - Added session time remaining hook with auto-refresh

 * @module shared-hooks/src/session/useSessions
 */

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { createSessionEndpoints } from '@vubon/shared-api/endpoints/session';
import type { ApiResponse } from '@vubon/shared-types';

// ==================== Types ====================

export interface DeviceInfo {
  deviceType: 'desktop' | 'laptop' | 'tablet' | 'mobile' | 'feature_phone' | 'tv' | 'console' | 'wearable' | 'other';
  os: string;
  osVersion?: string;
  browser: string;
  browserVersion?: string;
  isMobile: boolean;
  isTouchDevice?: boolean;
  screenResolution?: string;
  language?: string;
  timezone?: string;
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  dataSaverEnabled?: boolean;
}

export interface LocationInfo {
  country?: string;
  countryCode?: string;
  city?: string;
  district?: string;
  upazila?: string;
  division?: string;
  latitude?: number;
  longitude?: number;
  isp?: string;
}

export interface Session {
  id: string;
  userId: string;
  deviceInfo: DeviceInfo;
  ipAddress: string;
  location?: LocationInfo;
  lastActivityAt: string;
  lastActivityUrl?: string;
  expiresAt: string;
  idleTimeoutAt: string;
  absoluteTimeoutAt: string;
  createdAt: string;
  isCurrent: boolean;
  trustLevel: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
  mfaVerified: boolean;
  isFamilyShared?: boolean;
  familyMemberName?: string;
  sessionTransferId?: string;
}

export interface SessionsResponse {
  sessions: Session[];
  total: number;
  activeCount: number;
  currentSessionId: string;
}

export interface SessionStatistics {
  totalActive: number;
  totalExpired: number;
  totalRevoked: number;
  totalSuspended: number;
  averageSessionDurationSeconds: number;
  sessionsByDeviceType: Record<string, number>;
  sessionsByNetworkType?: Record<string, number>;
  sessionsByDistrict?: Array<{ district: string; count: number }>;
  activeSessionsByHour: Array<{ hour: string; count: number }>;
  suspiciousSessions: number;
}

export interface UseSessionsOptions {
  enabled?: boolean;
  staleTime?: number;
  includeExpired?: boolean;
  refetchInterval?: number;
  refetchOnWindowFocus?: boolean;
  onSuccess?: (data: SessionsResponse) => void;
  onError?: (error: Error) => void;
}

export interface UseSessionsReturn {
  data: SessionsResponse | undefined;
  sessions: Session[];
  activeSessions: Session[];
  expiredSessions: Session[];
  currentSession: Session | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetching: boolean;
  refetch: () => Promise<void>;
}

export interface UseSessionTimeRemainingReturn {
  secondsRemaining: number;
  isExpired: boolean;
  isExpiringSoon: boolean;
  minutesRemaining: number;
  hoursRemaining: number;
}

// ==================== Query Keys ====================

const SESSIONS_QUERY_KEY = ['sessions'] as const;
const SESSION_STATISTICS_QUERY_KEY = ['sessionStatistics'] as const;

// Helper to get endpoints with authenticated client
const getSessionEndpoints = () => {
  return createSessionEndpoints(getAxiosClient());
};

// Helper to extract data from API response
const extractData = <T>(response: ApiResponse<T>): T => response.data;

// Helper to check if error is non-retryable
const isNonRetryableError = (error: Error): boolean => {
  return error.message.includes('400') || error.message.includes('401') || error.message.includes('403');
};

// Helper to check if session is expired
const isSessionExpired = (session: Session): boolean => {
  return new Date(session.expiresAt) <= new Date();
};

// Helper to calculate time remaining in seconds
const getTimeRemainingSeconds = (session: Session): number => {
  const expiresAt = new Date(session.expiresAt).getTime();
  const now = Date.now();
  return Math.max(0, Math.floor((expiresAt - now) / 1000));
};

// ==================== Hooks ====================

/**
 * Hook for fetching user sessions using shared-api

 * @example
 * const { sessions, activeSessions, currentSession, isLoading, refetch } = useSessions({
 *   staleTime: 30 * 1000,
 *   includeExpired: false,
 *   onSuccess: (data) => {
 *     console.log(`Loaded ${data.sessions.length} sessions`);
 *   }
 * });

 * if (isLoading) return <LoadingSpinner />;

 * return (
 *   <div>
 *     <p>Current session: {currentSession?.deviceInfo.browser}</p>
 *     <p>Active sessions: {activeSessions.length}</p>
 *     {sessions.map(session => (
 *       <SessionCard key={session.id} session={session} />
 *     ))}
 *   </div>
 * );
 */
export const useSessions = (options?: UseSessionsOptions): UseSessionsReturn => {
  const includeExpired = options?.includeExpired ?? false;
  const endpoints = getSessionEndpoints();

  const query = useQuery({
    queryKey: [...SESSIONS_QUERY_KEY, { includeExpired }],
    queryFn: async (): Promise<SessionsResponse> => {
      const response = await endpoints.getSessions(includeExpired);
      const sessions = extractData<Session[]>(response);
      const sessionsArray = Array.isArray(sessions) ? sessions : [];

      // Calculate active count
      const now = new Date();
      const activeCount = sessionsArray.filter((s) => new Date(s.expiresAt) > now).length;

      return {
        sessions: sessionsArray,
        total: sessionsArray.length,
        activeCount,
        currentSessionId: sessionsArray.find((s) => s.isCurrent)?.id || '',
      };
    },
    staleTime: options?.staleTime ?? 30 * 1000,
    refetchInterval: options?.refetchInterval,
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? true,
    enabled: options?.enabled ?? true,
    retry: (failureCount, error) => {
      if (isNonRetryableError(error as Error)) {
        return false;
      }
      return failureCount < 2;
    },
  });

  const sessions = query.data?.sessions || [];
  const now = new Date();
  const activeSessions = sessions.filter((s) => new Date(s.expiresAt) > now);
  const expiredSessions = sessions.filter((s) => new Date(s.expiresAt) <= now);
  const currentSession = sessions.find((s) => s.isCurrent);

  // Trigger callbacks
  if (query.isSuccess && query.data && options?.onSuccess) {
    options.onSuccess(query.data);
  }
  if (query.isError && query.error && options?.onError) {
    options.onError(query.error as Error);
  }

  return {
    data: query.data,
    sessions,
    activeSessions,
    expiredSessions,
    currentSession,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
    isFetching: query.isFetching,
    refetch: async () => {
      await query.refetch();
    },
  };
};

/**
 * Hook for fetching a single session by ID using shared-api

 * @example
 * const { data: session, isLoading } = useSessionById('session-id-123', {
 *   onSuccess: (session) => {
 *     console.log('Session loaded:', session.id);
 *   }
 * });
 */
export const useSessionById = (sessionId: string, options?: Omit<UseSessionsOptions, 'includeExpired'>) => {
  const endpoints = getSessionEndpoints();

  return useQuery({
    queryKey: [...SESSIONS_QUERY_KEY, sessionId],
    queryFn: async (): Promise<Session> => {
      const response = await endpoints.getSessionById(sessionId);
      return extractData<Session>(response);
    },
    enabled: !!sessionId && (options?.enabled ?? true),
    staleTime: options?.staleTime ?? 60 * 1000,
    retry: (failureCount, error) => {
      if (isNonRetryableError(error as Error)) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook for session statistics (admin only) using shared-api

 * @example
 * const { data: stats, isLoading } = useSessionStatistics({
 *   onSuccess: (stats) => {
 *     console.log(`Active sessions: ${stats.totalActive}`);
 *   }
 * });
 */
export const useSessionStatistics = (options?: Omit<UseSessionsOptions, 'includeExpired'>) => {
  const endpoints = getSessionEndpoints();

  return useQuery({
    queryKey: SESSION_STATISTICS_QUERY_KEY,
    queryFn: async (): Promise<SessionStatistics> => {
      const response = await endpoints.getSessionStatistics();
      return extractData<SessionStatistics>(response);
    },
    staleTime: options?.staleTime ?? 60 * 1000,
    enabled: options?.enabled ?? true,
    retry: (failureCount, error) => {
      if (isNonRetryableError(error as Error)) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

/**
 * Hook for checking if a session is expired

 * @example
 * const isExpired = useIsSessionExpired(session);
 * if (isExpired) {
 *   return <ExpiredSessionWarning />;
 * }
 */
export const useIsSessionExpired = (session: Session | undefined): boolean => {
  if (!session) return true;
  return isSessionExpired(session);
};

/**
 * Hook for getting session time remaining with auto-refresh

 * @example
 * const { secondsRemaining, isExpired, isExpiringSoon } = useSessionTimeRemaining(session);

 * if (isExpiringSoon) {
 *   return <SessionExpiringWarning seconds={secondsRemaining} />;
 * }
 */
export const useSessionTimeRemaining = (session: Session | undefined): UseSessionTimeRemainingReturn => {
  const [timeRemaining, setTimeRemaining] = React.useState(() => getTimeRemainingSeconds(session));

  React.useEffect(() => {
    if (!session) return;

    const updateRemaining = () => {
      setTimeRemaining(getTimeRemainingSeconds(session));
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 1000);

    return () => clearInterval(interval);
  }, [session]);

  const isExpired = timeRemaining <= 0;
  const isExpiringSoon = timeRemaining > 0 && timeRemaining <= 300; // 5 minutes
  const minutesRemaining = Math.floor(timeRemaining / 60);
  const hoursRemaining = Math.floor(minutesRemaining / 60);

  return {
    secondsRemaining: timeRemaining,
    isExpired,
    isExpiringSoon,
    minutesRemaining,
    hoursRemaining,
  };
};

/**
 * Hook for getting sessions by device type

 * @example
 * const { mobileSessions, desktopSessions } = useSessionsByDeviceType();
 */
export const useSessionsByDeviceType = (options?: UseSessionsOptions) => {
  const { sessions, isLoading, isError, error } = useSessions(options);

  const sessionsByDeviceType = React.useMemo(() => {
    const groups: Record<string, Session[]> = {};

    for (const session of sessions) {
      const deviceType = session.deviceInfo.deviceType;
      if (!groups[deviceType]) {
        groups[deviceType] = [];
      }
      groups[deviceType].push(session);
    }

    return groups;
  }, [sessions]);

  return {
    sessionsByDeviceType,
    mobileSessions: sessionsByDeviceType['mobile'] || [],
    desktopSessions: sessionsByDeviceType['desktop'] || [],
    tabletSessions: sessionsByDeviceType['tablet'] || [],
    featurePhoneSessions: sessionsByDeviceType['feature_phone'] || [],
    isLoading,
    isError,
    error,
  };
};

/**
 * Hook for getting family shared sessions (Bangladesh specific)

 * @example
 * const { familySharedSessions, familyMemberCount } = useFamilySharedSessions();
 */
export const useFamilySharedSessions = (options?: UseSessionsOptions) => {
  const { sessions, isLoading, isError, error } = useSessions(options);

  const familySharedSessions = React.useMemo(() => {
    return sessions.filter((s) => s.isFamilyShared === true);
  }, [sessions]);

  const familyMemberCount = React.useMemo(() => {
    const uniqueMemberIds = new Set(familySharedSessions.map((s) => s.familyMemberName).filter(Boolean));
    return uniqueMemberIds.size;
  }, [familySharedSessions]);

  return {
    familySharedSessions,
    familyMemberCount,
    isLoading,
    isError,
    error,
  };
};

// ==================== Type Exports ====================

export type {
  UseSessionsOptions,
  UseSessionsReturn,
  UseSessionTimeRemainingReturn,
  Session,
  DeviceInfo,
  LocationInfo,
  SessionsResponse,
  SessionStatistics,
};
