/**
 * Session Endpoints - Session management API contracts
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-api/endpoints/user/session.endpoints
 *
 * RULES:
 * ✅ ONLY API endpoint contracts - NO business logic
 * ✅ NO JWT decoding, business rules
 * ✅ Thin endpoints - only URL + request function + typed response
 * ✅ Named exports only
 * ✅ No side effects beyond HTTP requests
 */

import type { AxiosInstance } from 'axios';
import type { ApiResponse, PaginatedApiResponse } from '@vubon/auth-types';

// Import API routes from constants and retry utilities
import { API_ROUTES } from '@vubon/auth-constants';
import { withRetry, DEFAULT_RETRY_CONFIG } from '../../client/retry.client';

// ==================== Constants ====================

const SESSION_BASE = '/api/v1/sessions';

// Helper function for idempotent GET requests with retry
const withIdempotentRetry = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  return withRetry(requestFn, DEFAULT_RETRY_CONFIG);
};

// Helper function for building URL with query params
const buildUrlWithParams = (baseUrl: string, params?: Record<string, string | number | undefined>): string => {
  if (!params) return baseUrl;

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null)
  );

  if (Object.keys(filteredParams).length === 0) return baseUrl;

  const searchParams = new URLSearchParams();
  Object.entries(filteredParams).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });

  return `${baseUrl}?${searchParams.toString()}`;
};

// Helper function for idempotent GET requests with params
const withIdempotentGet = async <T>(
  client: AxiosInstance,
  url: string,
  params?: Record<string, string | number | undefined>
): Promise<T> => {
  const finalUrl = buildUrlWithParams(url, params);
  return withIdempotentRetry(async () => {
    const response = await client.get<ApiResponse<T>>(finalUrl);
    return response.data.data;
  });
};

// ==================== Types ====================

export interface DeviceInfo {
  deviceType: 'desktop' | 'laptop' | 'tablet' | 'mobile' | 'feature_phone' | 'tv' | 'console' | 'wearable' | 'other';
  os: string;
  osVersion?: string;
  browser: string;
  browserVersion?: string;
  isMobile: boolean;
  isTouchDevice: boolean;
  screenResolution?: string;
  language: string;
  timezone: string;
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
}

export interface LocationInfo {
  country?: string;
  countryCode?: string;
  city?: string;
  district?: string;
  upazila?: string;
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
  isFamilyShared: boolean;
  familyMemberName?: string;
}

export interface RevokeSessionRequest {
  sessionId: string;
  reason?: string;
}

export interface RevokeAllSessionsRequest {
  exceptCurrent?: boolean;
  exceptDeviceIds?: string[];
  deviceTypes?: string[];
  reason?: string;
}

export interface RevokeAllSessionsResponse {
  success: boolean;
  revokedCount: number;
  revokedSessionIds: string[];
}

export interface ExtendSessionRequest {
  sessionId: string;
  durationSeconds?: number;
  keepAlive?: boolean;
}

export interface ExtendSessionResponse {
  expiresAt: string;
  idleTimeoutAt: string;
  extended: boolean;
}

export interface SessionHeartbeatRequest {
  sessionId: string;
  currentUrl?: string;
  activityType?: 'page_view' | 'api_call' | 'user_interaction';
}

export interface SessionHeartbeatResponse {
  success: boolean;
  sessionExtended: boolean;
  newExpiresAt?: string;
  remainingIdleSeconds: number;
  warningThresholdReached: boolean;
}

export interface SessionStatistics {
  totalActive: number;
  totalExpired: number;
  totalRevoked: number;
  totalSuspended: number;
  averageSessionDurationSeconds: number;
  sessionsByDeviceType: Record<string, number>;
  sessionsByNetworkType: Record<string, number>;
  sessionsByDistrict?: Array<{ district: string; count: number }>;
  activeSessionsByHour: Array<{ hour: string; count: number }>;
  suspiciousSessions: number;
}

export interface SessionFilterOptions {
  userId?: string;
  status?: 'active' | 'expired' | 'revoked' | 'suspended';
  deviceType?: string;
  ipAddress?: string;
  fromDate?: string;
  toDate?: string;
  isCurrent?: boolean;
  isFamilyShared?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'lastActivityAt' | 'expiresAt';
  sortOrder?: 'asc' | 'desc';
}

// ==================== Endpoint Functions ====================

export const createSessionEndpoints = (client: AxiosInstance) => {
  return {
    /**
     * Get all active sessions for current user
     * Idempotent GET - safe to retry
     */
    getSessions: async (includeExpired?: boolean): Promise<Session[]> => {
      const url = buildUrlWithParams(SESSION_BASE, { includeExpired: includeExpired ? 'true' : undefined });
      return withIdempotentGet(client, url);
    },

    /**
     * Get sessions with pagination and filters (admin only)
     * Idempotent GET - safe to retry
     */
    getSessionsWithFilters: async (filters?: SessionFilterOptions): Promise<PaginatedApiResponse<Session>> => {
      const params: Record<string, string | number | undefined> = {};
      if (filters?.userId) params.userId = filters.userId;
      if (filters?.status) params.status = filters.status;
      if (filters?.deviceType) params.deviceType = filters.deviceType;
      if (filters?.ipAddress) params.ipAddress = filters.ipAddress;
      if (filters?.fromDate) params.fromDate = filters.fromDate;
      if (filters?.toDate) params.toDate = filters.toDate;
      if (filters?.page) params.page = filters.page;
      if (filters?.limit) params.limit = filters.limit;
      if (filters?.sortBy) params.sortBy = filters.sortBy;
      if (filters?.sortOrder) params.sortOrder = filters.sortOrder;

      const url = buildUrlWithParams(`${SESSION_BASE}/admin`, params);
      return withIdempotentGet(client, url);
    },

    /**
     * Get session by ID
     * Idempotent GET - safe to retry
     */
    getSessionById: async (sessionId: string): Promise<Session> => {
      return withIdempotentGet(client, `${SESSION_BASE}/${sessionId}`);
    },

    /**
     * Get current session
     * Idempotent GET - safe to retry
     */
    getCurrentSession: async (): Promise<Session> => {
      return withIdempotentGet(client, `${SESSION_BASE}/current`);
    },

    /**
     * Revoke specific session
     * Non-idempotent POST - no retry (user action)
     */
    revokeSession: async (data: RevokeSessionRequest): Promise<{ success: boolean; message: string }> => {
      const response = await client.post<ApiResponse<{ success: boolean; message: string }>>(
        `${SESSION_BASE}/${data.sessionId}/revoke`,
        { reason: data.reason }
      );
      return response.data.data;
    },

    /**
     * Revoke all sessions
     * Non-idempotent POST - no retry (user action)
     */
    revokeAllSessions: async (data?: RevokeAllSessionsRequest): Promise<RevokeAllSessionsResponse> => {
      const response = await client.post<ApiResponse<RevokeAllSessionsResponse>>(`${SESSION_BASE}/revoke-all`, data || {});
      return response.data.data;
    },

    /**
     * Extend session expiry (heartbeat)
     * Non-idempotent POST - no retry (user action, modifies state)
     */
    extendSession: async (data: ExtendSessionRequest): Promise<ExtendSessionResponse> => {
      const response = await client.post<ApiResponse<ExtendSessionResponse>>(`${SESSION_BASE}/${data.sessionId}/extend`, {
        durationSeconds: data.durationSeconds,
        keepAlive: data.keepAlive,
      });
      return response.data.data;
    },

    /**
     * Send session heartbeat (keep session alive)
     * Non-idempotent POST - no retry (user action, modifies state)
     */
    sendHeartbeat: async (data: SessionHeartbeatRequest): Promise<SessionHeartbeatResponse> => {
      const response = await client.post<ApiResponse<SessionHeartbeatResponse>>(`${SESSION_BASE}/heartbeat`, data);
      return response.data.data;
    },

    /**
     * Get session statistics (admin only)
     * Idempotent GET - safe to retry
     */
    getSessionStatistics: async (): Promise<SessionStatistics> => {
      return withIdempotentGet(client, `${SESSION_BASE}/statistics`);
    },

    /**
     * Get sessions for a specific user (admin only)
     * Idempotent GET - safe to retry
     */
    getUserSessions: async (userId: string): Promise<Session[]> => {
      return withIdempotentGet(client, `${SESSION_BASE}/user/${userId}`);
    },

    /**
     * Revoke sessions by device type
     * Non-idempotent POST - no retry (admin action, modifies state)
     */
    revokeSessionsByDeviceType: async (deviceType: string, reason?: string): Promise<RevokeAllSessionsResponse> => {
      const response = await client.post<ApiResponse<RevokeAllSessionsResponse>>(`${SESSION_BASE}/revoke-by-device`, {
        deviceType,
        reason,
      });
      return response.data.data;
    },
  };
};

export type SessionEndpoints = ReturnType<typeof createSessionEndpoints>;
