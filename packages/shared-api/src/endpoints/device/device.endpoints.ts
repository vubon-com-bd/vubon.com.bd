/**
 * Device Endpoints - Device management API contracts
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-api/endpoints/device/device.endpoints
 *
 * RULES:
 * ✅ ONLY API endpoint contracts - NO business logic
 * ✅ NO browser fingerprint generation
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

const DEVICES_BASE = '/api/v1/devices';

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
  deviceId: string;
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
  dataSaverEnabled?: boolean;                    // বাংলাদেশ স্পেসিফিক
  district?: string;                              // বাংলাদেশ স্পেসিফিক
  upazila?: string;                               // বাংলাদেশ স্পেসিফিক
}

export interface TrustedDevice {
  id: string;
  deviceId: string;
  deviceInfo: DeviceInfo;
  trustLevel: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
  trustScore: number;
  trustedAt: string;
  lastUsedAt: string;
  expiresAt: string | null;
  name: string | null;
  isCurrent: boolean;
  isFamilyShared: boolean;
  familyMemberName?: string;
  fingerprintHash?: string;                       // ডিভাইস ফিঙ্গারপ্রিন্ট হ্যাশ
}

export interface RegisterDeviceRequest {
  deviceInfo: DeviceInfo;
  fingerprint?: {                                 // ডিভাইস ফিঙ্গারপ্রিন্ট
    hash: string;
    components: string[];
    version: number;
  };
  name?: string;
  trustDevice: boolean;
  trustDurationDays?: number;
  isFamilyShared?: boolean;
  familyMemberId?: string;
}

export interface UpdateDeviceTrustRequest {
  trustLevel: 'standard' | 'trusted' | 'high_trust';
  durationDays?: number;
  reason?: string;
}

export interface DeviceFingerprint {
  hash: string;
  components: string[];
  componentVersions?: Record<string, string>;
  version: number;
  generatedAt?: string;
}

export interface DeviceRiskAssessment {
  deviceId: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: Array<{
    factor: string;
    score: number;
    weight?: number;
    reason: string;
    evidence?: string;
  }>;
  requiresMFA: boolean;
  requiresAdditionalVerification: boolean;
  recommendedTrustLevel: string;
  assessedAt: string;
}

export interface DeviceActivity {
  id: string;
  deviceId: string;
  activityType: 'login' | 'logout' | 'token_refresh' | 'mfa_verified' | 'trust_granted' | 'trust_revoked' | 'trust_escalated' | 'trust_deescalated' | 'device_removed' | 'device_name_changed' | 'device_fingerprint_changed' | 'suspicious_activity_detected';
  timestamp: string;
  ipAddress: string;
  userAgent?: string;
  location?: {
    country?: string;
    city?: string;
    district?: string;
    upazila?: string;
  };
  metadata?: Record<string, unknown>;
}

export interface DeviceSessionTransferRequest {
  targetDeviceInfo: DeviceInfo;
  transferMethod: 'qr_code' | 'magic_link' | 'otp';
  transferCode?: string;
  viaWhatsApp?: boolean;                           // বাংলাদেশ স্পেসিফিক
  viaSms?: boolean;                                // বাংলাদেশ স্পেসিফিক
}

export interface DeviceSessionTransferResponse {
  transferId: string;
  transferMethod: string;
  qrCodeUrl?: string;
  magicLink?: string;
  otpSent?: boolean;
  whatsappSent?: boolean;                          // বাংলাদেশ স্পেসিফিক
  smsSent?: boolean;                               // বাংলাদেশ স্পেসিফিক
  expiresAt: string;
  status: 'pending' | 'completed' | 'expired';
}

export interface DevicePairingRequest {
  pairedUserId: string;
  relationship: 'parent' | 'child' | 'spouse' | 'sibling' | 'other';
  permissions: Array<'view_orders' | 'track_orders' | 'add_to_cart' | 'wishlist' | 'view_addresses' | 'limited_payment' | 'full_payment'>;
  expiresAt?: string;
}

export interface DevicePairingResponse {
  pairingId: string;
  ownerUserId: string;
  pairedUserId: string;
  relationship: string;
  permissions: string[];
  pairedAt: string;
  expiresAt: string | null;
  status: 'active' | 'revoked' | 'expired';
}

export interface PublicDeviceSessionRequest {
  deviceId: string;
  sessionId?: string;
  restrictions?: Array<'no_card_payment' | 'no_bank_transfer' | 'mfs_only' | 'no_address_save' | 'auto_logout_on_close'>;
}

export interface PublicDeviceSessionResponse {
  sessionId: string;
  deviceId: string;
  expiresAt: string;
  restrictions: string[];
  warningMessage?: string;
  warningMessageBn?: string;                       // বাংলা ওয়ার্নিং
}

// Pagination params (standardized)
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// Device filter options
export interface DeviceFilterOptions {
  trustLevel?: string;
  deviceType?: string;
  isFamilyShared?: boolean;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'trustedAt' | 'lastUsedAt' | 'trustLevel';
  sortOrder?: 'asc' | 'desc';
}

// Device statistics (Bangladesh specific)
export interface DeviceStatistics {
  totalDevices: number;
  trustedDevices: number;
  untrustedDevices: number;
  familySharedDevices: number;
  devicesByType: Record<string, number>;
  devicesByNetworkType?: Record<string, number>;   // বাংলাদেশ স্পেসিফিক
  devicesByMobileOperator?: Record<string, number>; // বাংলাদেশ স্পেসিফিক
  devicesByDistrict?: Array<{ district: string; count: number }>; // বাংলাদেশ স্পেসিফিক
  suspiciousDevices: number;
  highRiskDevices: number;
}

// ==================== Endpoint Functions ====================

export const createDeviceEndpoints = (client: AxiosInstance) => {
  // Helper function to get full API path (using constants)
  const api = (path: string) => path;

  return {
    /**
     * Register current device
     * Non-idempotent POST - no retry (user action, creates new device record)
     */
    registerDevice: async (data: RegisterDeviceRequest): Promise<TrustedDevice> => {
      const response = await client.post<ApiResponse<TrustedDevice>>(`${DEVICES_BASE}/register`, data);
      return response.data.data;
    },

    /**
     * Get all trusted devices for current user
     * Idempotent GET - safe to retry
     */
    getDevices: async (includeExpired?: boolean): Promise<TrustedDevice[]> => {
      const params = includeExpired ? { includeExpired: 'true' } : undefined;
      return withIdempotentGet(client, DEVICES_BASE, params);
    },

    /**
     * Get devices with pagination and filters
     * Idempotent GET - safe to retry
     */
    getDevicesWithFilters: async (filters?: DeviceFilterOptions): Promise<PaginatedApiResponse<TrustedDevice>> => {
      const params: Record<string, string | number | undefined> = {};
      if (filters?.trustLevel) params.trustLevel = filters.trustLevel;
      if (filters?.deviceType) params.deviceType = filters.deviceType;
      if (filters?.isFamilyShared !== undefined) params.isFamilyShared = filters.isFamilyShared;
      if (filters?.page) params.page = filters.page;
      if (filters?.limit) params.limit = filters.limit;
      if (filters?.sortBy) params.sortBy = filters.sortBy;
      if (filters?.sortOrder) params.sortOrder = filters.sortOrder;

      const url = buildUrlWithParams(DEVICES_BASE, params);
      return withIdempotentGet(client, url);
    },

    /**
     * Get device by ID
     * Idempotent GET - safe to retry
     */
    getDeviceById: async (deviceId: string): Promise<TrustedDevice> => {
      return withIdempotentGet(client, `${DEVICES_BASE}/${deviceId}`);
    },

    /**
     * Get current device info
     * Idempotent GET - safe to retry
     */
    getCurrentDevice: async (): Promise<TrustedDevice> => {
      return withIdempotentGet(client, `${DEVICES_BASE}/current`);
    },

    /**
     * Update device trust level
     * Non-idempotent PATCH - no retry (user action, modifies state)
     */
    updateDeviceTrust: async (
      deviceId: string,
      data: UpdateDeviceTrustRequest
    ): Promise<TrustedDevice> => {
      const response = await client.patch<ApiResponse<TrustedDevice>>(`${DEVICES_BASE}/${deviceId}/trust`, data);
      return response.data.data;
    },

    /**
     * Remove trusted device
     * Non-idempotent DELETE - no retry (user action, modifies state)
     */
    removeDevice: async (deviceId: string, reason?: string): Promise<{ success: boolean; message: string }> => {
      const response = await client.delete<ApiResponse<{ success: boolean; message: string }>>(
        `${DEVICES_BASE}/${deviceId}`,
        { data: { reason } }
      );
      return response.data.data;
    },

    /**
     * Rename device
     * Non-idempotent PATCH - no retry (user action, modifies state)
     */
    renameDevice: async (deviceId: string, name: string): Promise<TrustedDevice> => {
      const response = await client.patch<ApiResponse<TrustedDevice>>(`${DEVICES_BASE}/${deviceId}/rename`, { name });
      return response.data.data;
    },

    /**
     * Get device risk assessment
     * Idempotent GET - safe to retry
     */
    getDeviceRisk: async (deviceId: string): Promise<DeviceRiskAssessment> => {
      return withIdempotentGet(client, `${DEVICES_BASE}/${deviceId}/risk`);
    },

    /**
     * Get device activity history (paginated)
     * Idempotent GET - safe to retry
     */
    getDeviceActivity: async (
      deviceId: string,
      params?: PaginationParams
    ): Promise<PaginatedApiResponse<DeviceActivity>> => {
      return withIdempotentGet(client, `${DEVICES_BASE}/${deviceId}/activity`, params);
    },

    /**
     * Initiate session transfer to another device
     * Non-idempotent POST - no retry (user action, creates transfer state)
     */
    initiateSessionTransfer: async (data: DeviceSessionTransferRequest): Promise<DeviceSessionTransferResponse> => {
      const response = await client.post<ApiResponse<DeviceSessionTransferResponse>>(`${DEVICES_BASE}/session-transfer/initiate`, data);
      return response.data.data;
    },

    /**
     * Complete session transfer
     * Non-idempotent POST - no retry (user action, consumes transfer code)
     */
    completeSessionTransfer: async (transferId: string, transferCode: string): Promise<{ success: boolean; sessionId?: string }> => {
      const response = await client.post<ApiResponse<{ success: boolean; sessionId?: string }>>(
        `${DEVICES_BASE}/session-transfer/complete`,
        { transferId, transferCode }
      );
      return response.data.data;
    },

    /**
     * Get pending session transfers
     * Idempotent GET - safe to retry
     */
    getPendingTransfers: async (): Promise<DeviceSessionTransferResponse[]> => {
      return withIdempotentGet(client, `${DEVICES_BASE}/session-transfer/pending`);
    },

    /**
     * Cancel pending session transfer
     * Non-idempotent DELETE - no retry (user action, modifies state)
     */
    cancelSessionTransfer: async (transferId: string): Promise<{ success: boolean }> => {
      const response = await client.delete<ApiResponse<{ success: boolean }>>(`${DEVICES_BASE}/session-transfer/${transferId}`);
      return response.data.data;
    },

    /**
     * Pair device with family member (Bangladesh specific - joint family support)
     * Non-idempotent POST - no retry (user action, creates pairing)
     */
    pairDevice: async (deviceId: string, data: DevicePairingRequest): Promise<DevicePairingResponse> => {
      const response = await client.post<ApiResponse<DevicePairingResponse>>(`${DEVICES_BASE}/${deviceId}/pair`, data);
      return response.data.data;
    },

    /**
     * Get paired devices for current user
     * Idempotent GET - safe to retry
     */
    getPairedDevices: async (): Promise<DevicePairingResponse[]> => {
      return withIdempotentGet(client, `${DEVICES_BASE}/pairings`);
    },

    /**
     * Get pending pairing requests
     * Idempotent GET - safe to retry
     */
    getPendingPairings: async (): Promise<DevicePairingResponse[]> => {
      return withIdempotentGet(client, `${DEVICES_BASE}/pairings/pending`);
    },

    /**
     * Accept pending pairing request
     * Non-idempotent POST - no retry (user action, modifies state)
     */
    acceptPairing: async (pairingId: string): Promise<DevicePairingResponse> => {
      const response = await client.post<ApiResponse<DevicePairingResponse>>(`${DEVICES_BASE}/pairings/${pairingId}/accept`);
      return response.data.data;
    },

    /**
     * Reject pending pairing request
     * Non-idempotent DELETE - no retry (user action, modifies state)
     */
    rejectPairing: async (pairingId: string): Promise<{ success: boolean }> => {
      const response = await client.delete<ApiResponse<{ success: boolean }>>(`${DEVICES_BASE}/pairings/${pairingId}/reject`);
      return response.data.data;
    },

    /**
     * Revoke device pairing
     * Non-idempotent DELETE - no retry (user action, modifies state)
     */
    revokePairing: async (pairingId: string): Promise<{ success: boolean }> => {
      const response = await client.delete<ApiResponse<{ success: boolean }>>(`${DEVICES_BASE}/pairings/${pairingId}`);
      return response.data.data;
    },

    /**
     * Create public/shared device session (kiosk/cyber cafe)
     * Non-idempotent POST - no retry (user action, creates session)
     */
    createPublicSession: async (data: PublicDeviceSessionRequest): Promise<PublicDeviceSessionResponse> => {
      const response = await client.post<ApiResponse<PublicDeviceSessionResponse>>(`${DEVICES_BASE}/public-session`, data);
      return response.data.data;
    },

    /**
     * Revoke all sessions for a device (force logout)
     * Non-idempotent POST - no retry (user action, modifies state)
     */
    revokeDeviceSessions: async (deviceId: string): Promise<{ success: boolean; sessionsRevoked: number }> => {
      const response = await client.post<ApiResponse<{ success: boolean; sessionsRevoked: number }>>(
        `${DEVICES_BASE}/${deviceId}/revoke-sessions`
      );
      return response.data.data;
    },

    /**
     * Get device statistics (admin only)
     * Idempotent GET - safe to retry
     */
    getDeviceStatistics: async (): Promise<DeviceStatistics> => {
      return withIdempotentGet(client, `${DEVICES_BASE}/statistics`);
    },

    /**
     * Get device fingerprint for current device
     * Idempotent GET - safe to retry
     */
    getDeviceFingerprint: async (): Promise<DeviceFingerprint> => {
      return withIdempotentGet(client, `${DEVICES_BASE}/fingerprint`);
    },
  };
};

export type DeviceEndpoints = ReturnType<typeof createDeviceEndpoints>;
