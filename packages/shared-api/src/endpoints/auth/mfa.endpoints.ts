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

// ==================== Endpoint Functions ====================

export const createMfaEndpoints = (client: AxiosInstance) => {
  return {
    /**
     * Get MFA status for current user
     */
    getStatus: async (): Promise<MFAStatusResponse> => {
      const response = await client.get<ApiResponse<MFAStatusResponse>>('/api/v1/mfa/status');
      return response.data.data;
    },
    
    /**
     * Setup MFA for a provider
     */
    setup: async (data: MFASetupRequest): Promise<MFASetupResponse> => {
      const response = await client.post<ApiResponse<MFASetupResponse>>('/api/v1/mfa/setup', data);
      return response.data.data;
    },
    
    /**
     * Setup TOTP specifically
     */
    setupTotp: async (data: TOTPSetupRequest): Promise<TOTPSetupResponse> => {
      const response = await client.post<ApiResponse<TOTPSetupResponse>>('/api/v1/mfa/totp/setup', data);
      return response.data.data;
    },
    
    /**
     * Verify and enable MFA
     */
    verify: async (data: MFAVerifyRequest): Promise<MFAVerifyResponse> => {
      const response = await client.post<ApiResponse<MFAVerifyResponse>>('/api/v1/mfa/verify', data);
      return response.data.data;
    },
    
    /**
     * Disable MFA for a method or all methods
     */
    disable: async (methodId?: string, reason?: string): Promise<{ success: boolean; message: string }> => {
      const response = await client.post<ApiResponse<{ success: boolean; message: string }>>('/api/v1/mfa/disable', { 
        methodId, 
        reason 
      });
      return response.data.data;
    },
    
    /**
     * Get backup codes
     */
    getBackupCodes: async (): Promise<{ backupCodes: string[]; remainingCount: number; totalCount: number }> => {
      const response = await client.get<ApiResponse<{ backupCodes: string[]; remainingCount: number; totalCount: number }>>('/api/v1/mfa/backup-codes');
      return response.data.data;
    },
    
    /**
     * Regenerate backup codes
     */
    regenerateBackupCodes: async (): Promise<{ backupCodes: string[] }> => {
      const response = await client.post<ApiResponse<{ backupCodes: string[] }>>('/api/v1/mfa/backup-codes/regenerate');
      return response.data.data;
    },
    
    /**
     * Verify with backup code (recovery)
     */
    verifyWithBackupCode: async (data: MFARecoveryRequest): Promise<MFARecoveryResponse> => {
      const response = await client.post<ApiResponse<MFARecoveryResponse>>('/api/v1/mfa/recovery', data);
      return response.data.data;
    },
    
    /**
     * Create MFA challenge for step-up authentication
     */
    createChallenge: async (data: MFAChallengeRequest): Promise<MFAChallengeResponse> => {
      const response = await client.post<ApiResponse<MFAChallengeResponse>>('/api/v1/mfa/challenge', data);
      return response.data.data;
    },
    
    /**
     * Get challenge status
     */
    getChallengeStatus: async (challengeId: string): Promise<MFAChallengeResponse> => {
      const response = await client.get<ApiResponse<MFAChallengeResponse>>(`/api/v1/mfa/challenge/${challengeId}`);
      return response.data.data;
    },
    
    /**
     * Set primary MFA method
     */
    setPrimaryMethod: async (methodId: string): Promise<{ success: boolean }> => {
      const response = await client.post<ApiResponse<{ success: boolean }>>('/api/v1/mfa/primary', { methodId });
      return response.data.data;
    },
    
    /**
     * Get WebAuthn registration options
     */
    getWebAuthnRegistration: async (data: WebAuthnRegistrationRequest): Promise<WebAuthnRegistrationResponse> => {
      const response = await client.post<ApiResponse<WebAuthnRegistrationResponse>>('/api/v1/mfa/webauthn/register/begin', data);
      return response.data.data;
    },
    
    /**
     * Complete WebAuthn registration
     */
    completeWebAuthnRegistration: async (credential: unknown): Promise<MFASetupResponse> => {
      const response = await client.post<ApiResponse<MFASetupResponse>>('/api/v1/mfa/webauthn/register/complete', { credential });
      return response.data.data;
    },
    
    /**
     * Get WebAuthn authentication options
     */
    getWebAuthnAuth: async (): Promise<WebAuthnAuthResponse> => {
      const response = await client.get<ApiResponse<WebAuthnAuthResponse>>('/api/v1/mfa/webauthn/auth/begin');
      return response.data.data;
    },
    
    /**
     * Complete WebAuthn authentication
     */
    completeWebAuthnAuth: async (credential: unknown): Promise<MFAVerifyResponse> => {
      const response = await client.post<ApiResponse<MFAVerifyResponse>>('/api/v1/mfa/webauthn/auth/complete', { credential });
      return response.data.data;
    },
  };
};

export type MfaEndpoints = ReturnType<typeof createMfaEndpoints>;
