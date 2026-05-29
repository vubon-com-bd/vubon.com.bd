/**
 * MFA Endpoints - Multi-Factor Authentication API contracts
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-api/endpoints/auth/mfa.endpoints
 *
 * RULES:
 * ✅ ONLY API endpoint contracts - NO business logic
 * ✅ NO TOTP generation, secret encryption
 * ✅ Thin endpoints - only URL + request function + typed response
 * ✅ Named exports only
 * ✅ No side effects beyond HTTP requests
 */

import type { AxiosInstance } from 'axios';
import type { ApiResponse } from '@vubon/auth-types';

// Import API routes from constants and retry utilities
import { API_ROUTES } from '@vubon/auth-constants';
import { withRetry, DEFAULT_RETRY_CONFIG } from '../../client/retry.client';

// ==================== Constants ====================

// Base path for MFA endpoints (using constants where available)
const MFA_BASE = '/api/v1/mfa';

// Helper function for idempotent GET requests with retry
const withIdempotentRetry = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  return withRetry(requestFn, DEFAULT_RETRY_CONFIG);
};

// Helper function to build URL with query parameters
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

// Pagination parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
}

// ==================== Types ====================

export type MFAProvider = 
  | 'totp' 
  | 'sms' 
  | 'email' 
  | 'backup_code' 
  | 'webauthn'
  | 'whatsapp_otp'
  | 'imo_otp'
  | 'bkash_pin'
  | 'nagad_pin'
  | 'rocket_pin'
  | 'voice_call_otp';

export type MFAVerificationType = 
  | 'login' 
  | 'payment' 
  | 'sensitive_change' 
  | 'password_change' 
  | 'device_trust'
  | 'high_value_order'
  | 'international_order';

export interface MFASetupRequest {
  provider: MFAProvider;
  identifier?: string;
  label?: string;
  setAsPrimary?: boolean;
}

export interface MFASetupResponse {
  methodId: string;
  provider: MFAProvider;
  qrCodeUrl?: string;
  secret?: string;
  backupCodes?: string[];
  instructions?: string;
  expiresAt: string;
}

export interface MFAVerifyRequest {
  methodId?: string;
  code: string;
  verificationType: MFAVerificationType;
  trustDevice?: boolean;
  trustDurationDays?: number;
  challengeId?: string;
}

export interface MFAVerifyResponse {
  success: boolean;
  verified: boolean;
  methodUsed: MFAProvider | null;
  remainingAttempts: number;
  isLocked: boolean;
  lockExpiresAt?: string;
  error?: string;
  requiresAlternativeMethod?: boolean;
  alternativeMethods?: MFAProvider[];
}

export interface MFAMethod {
  id: string;
  provider: MFAProvider;
  identifier: string;
  label: string | null;
  isPrimary: boolean;
  isVerified: boolean;
  isBackup: boolean;
  priority: number;
  createdAt: string;
  lastUsedAt: string | null;
  lastFailedAt: string | null;
  iconName: string;
  displayName: string;
}

export interface MFAStatusResponse {
  enabled: boolean;
  status: 'not_enabled' | 'setup_pending' | 'setup_in_progress' | 'enabled' | 'enabled_default' | 'enabled_multi' | 'locked' | 'disabled_by_admin' | 'recovery_mode';
  methods: MFAMethod[];
  requiredForRole: boolean;
  requiredForAction: boolean;
  trustedDevices: string[];
  recoveryCodesRemaining: number;
  defaultMethod: MFAProvider | null;
  recommendedMethods: MFAProvider[];
}

export interface MFARecoveryRequest {
  backupCode: string;
  newPassword?: string;
  trustDevice?: boolean;
}

export interface MFARecoveryResponse {
  success: boolean;
  recovered: boolean;
  newSessionCreated: boolean;
  sessionId?: string;
  requiresPasswordReset: boolean;
  remainingBackupCodes: number;
  regenerateBackupCodesRequired: boolean;
  message?: string;
}

export interface MFAChallengeRequest {
  verificationType: MFAVerificationType;
  preferredMethod?: MFAProvider;
  metadata?: {
    amount?: number;
    orderId?: string;
    deviceId?: string;
    ipAddress?: string;
  };
}

export interface MFAChallengeResponse {
  challengeId: string;
  requiredMethods: MFAProvider[];
  expiresAt: string;
  remainingAttempts: number;
  verificationType: MFAVerificationType;
  instructions?: string;
}

export interface TOTPSetupRequest {
  issuer?: string;
  accountName?: string;
}

export interface TOTPSetupResponse {
  methodId: string;
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

export interface WebAuthnRegistrationRequest {
  deviceName: string;
  authenticatorType?: 'platform' | 'cross-platform';
}

export interface WebAuthnRegistrationResponse {
  challenge: string;
  rpId: string;
  rpName: string;
  userId: string;
  userName: string;
  userDisplayName: string;
  timeout: number;
  attestation: 'none' | 'indirect' | 'direct';
  authenticatorSelection?: {
    authenticatorAttachment?: 'platform' | 'cross-platform';
    residentKey?: 'discouraged' | 'preferred' | 'required';
    userVerification?: 'discouraged' | 'preferred' | 'required';
  };
}

export interface WebAuthnAuthResponse {
  challenge: string;
  rpId: string;
  timeout: number;
  allowCredentials?: Array<{
    id: string;
    type: 'public-key';
    transports?: Array<'usb' | 'nfc' | 'ble' | 'internal'>;
  }>;
  userVerification?: 'discouraged' | 'preferred' | 'required';
}

// Backup Codes List Response (paginated)
export interface BackupCodesListResponse {
  backupCodes: string[];
  remainingCount: number;
  totalCount: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ==================== Endpoint Functions ====================

export const createMfaEndpoints = (client: AxiosInstance) => {
  return {
    /**
     * Get MFA status for current user
     * Idempotent GET - safe to retry
     */
    getStatus: async (): Promise<MFAStatusResponse> => {
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<MFAStatusResponse>>(`${MFA_BASE}/status`);
        return response.data.data;
      });
    },

    /**
     * Setup MFA for a provider
     * Non-idempotent POST - no retry (user action)
     */
    setup: async (data: MFASetupRequest): Promise<MFASetupResponse> => {
      const response = await client.post<ApiResponse<MFASetupResponse>>(`${MFA_BASE}/setup`, data);
      return response.data.data;
    },

    /**
     * Setup TOTP specifically
     * Non-idempotent POST - no retry (user action)
     */
    setupTotp: async (data: TOTPSetupRequest): Promise<TOTPSetupResponse> => {
      const response = await client.post<ApiResponse<TOTPSetupResponse>>(`${MFA_BASE}/totp/setup`, data);
      return response.data.data;
    },

    /**
     * Verify and enable MFA
     * Non-idempotent POST - no retry (user action)
     */
    verify: async (data: MFAVerifyRequest): Promise<MFAVerifyResponse> => {
      const response = await client.post<ApiResponse<MFAVerifyResponse>>(`${MFA_BASE}/verify`, data);
      return response.data.data;
    },

    /**
     * Disable MFA for a method or all methods
     * Non-idempotent POST - no retry (user/admin action)
     */
    disable: async (methodId?: string, reason?: string): Promise<{ success: boolean; message: string }> => {
      const response = await client.post<ApiResponse<{ success: boolean; message: string }>>(`${MFA_BASE}/disable`, {
        methodId,
        reason,
      });
      return response.data.data;
    },

    /**
     * Get backup codes (paginated)
     * Idempotent GET - safe to retry
     */
    getBackupCodes: async (params?: PaginationParams): Promise<BackupCodesListResponse> => {
      const url = buildUrlWithParams(`${MFA_BASE}/backup-codes`, params);
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<BackupCodesListResponse>>(url);
        return response.data.data;
      });
    },

    /**
     * Regenerate backup codes
     * Non-idempotent POST - no retry (user action)
     */
    regenerateBackupCodes: async (): Promise<{ backupCodes: string[] }> => {
      const response = await client.post<ApiResponse<{ backupCodes: string[] }>>(`${MFA_BASE}/backup-codes/regenerate`);
      return response.data.data;
    },

    /**
     * Verify with backup code (recovery)
     * Non-idempotent POST - no retry (user action)
     */
    verifyWithBackupCode: async (data: MFARecoveryRequest): Promise<MFARecoveryResponse> => {
      const response = await client.post<ApiResponse<MFARecoveryResponse>>(`${MFA_BASE}/recovery`, data);
      return response.data.data;
    },

    /**
     * Create MFA challenge for step-up authentication
     * Non-idempotent POST - no retry (user action)
     */
    createChallenge: async (data: MFAChallengeRequest): Promise<MFAChallengeResponse> => {
      const response = await client.post<ApiResponse<MFAChallengeResponse>>(`${MFA_BASE}/challenge`, data);
      return response.data.data;
    },

    /**
     * Get challenge status
     * Idempotent GET - safe to retry
     */
    getChallengeStatus: async (challengeId: string): Promise<MFAChallengeResponse> => {
      return withIdempotentRetry(async () => {
        const response = await client.get<ApiResponse<MFAChallengeResponse>>(`${MFA_BASE}/challenge/${challengeId}`);
        return response.data.data;
      });
    },

    /**
     * Set primary MFA method
     * Non-idempotent POST - no retry (user action)
     */
    setPrimaryMethod: async (methodId: string): Promise<{ success: boolean }> => {
      const response = await client.post<ApiResponse<{ success: boolean }>>(`${MFA_BASE}/primary`, { methodId });
      return response.data.data;
    },

    /**
     * Get WebAuthn registration options
     * Non-idempotent POST - no retry (user action, triggers state change on server)
     */
    getWebAuthnRegistration: async (data: WebAuthnRegistrationRequest): Promise<WebAuthnRegistrationResponse> => {
      const response = await client.post<ApiResponse<WebAuthnRegistrationResponse>>(`${MFA_BASE}/webauthn/register/begin`, data);
      return response.data.data;
    },

    /**
     * Complete WebAuthn registration
     * Non-idempotent POST - no retry (user action)
     */
    completeWebAuthnRegistration: async (credential: unknown): Promise<MFASetupResponse> => {
      const response = await client.post<ApiResponse<MFASetupResponse>>(`${MFA_BASE}/webauthn/register/complete`, { credential });
      return response.data.data;
    },

    /**
     * Get WebAuthn authentication options
     * Non-idempotent POST - no retry (user action, triggers state change on server)
     */
    getWebAuthnAuth: async (): Promise<WebAuthnAuthResponse> => {
      const response = await client.post<ApiResponse<WebAuthnAuthResponse>>(`${MFA_BASE}/webauthn/auth/begin`);
      return response.data.data;
    },

    /**
     * Complete WebAuthn authentication
     * Non-idempotent POST - no retry (user action)
     */
    completeWebAuthnAuth: async (credential: unknown): Promise<MFAVerifyResponse> => {
      const response = await client.post<ApiResponse<MFAVerifyResponse>>(`${MFA_BASE}/webauthn/auth/complete`, { credential });
      return response.data.data;
    },
  };
};

export type MfaEndpoints = ReturnType<typeof createMfaEndpoints>;
