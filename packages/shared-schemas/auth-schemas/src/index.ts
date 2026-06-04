/**
 * Shared Schemas - Root Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/index
 * 
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Pure Zod schema exports only
 */

// ============================================================
// Auth Domain Schemas
// ============================================================
export * from './auth';

// ============================================================
// Role & Permission Schemas
// ============================================================
export * from './role';

// ============================================================
// Session & Device Schemas (with renamed exports to avoid conflicts)
// ============================================================
export {
  // Session schemas (renamed to avoid conflict with auth)
  SessionIdSchema as SessionDocumentIdSchema,
  SessionSchema,
  SessionStatusSchema,
  SessionTrustLevelSchema,
  SessionTokensSchema,
  LocationInfoSchema,
  RefreshTokenSchema,
  AccessTokenSchema,
  TokenIdSchema,
  // Request schemas
  CreateSessionSchema,
  RefreshSessionSchema,
  TerminateSessionSchema,
  TerminateSessionsSchema as TerminateSessionsRequestSchema,
  ValidateSessionSchema,
  SessionHeartbeatSchema,
  SessionTransferRequestSchema,
  SessionFilterSchema,
  SessionCleanupRequestSchema,
  // Response schemas
  CreateSessionResponseSchema,
  RefreshSessionResponseSchema,
  TerminateSessionsResponseSchema,
  SessionValidationResponseSchema,
  SessionHeartbeatResponseSchema,
  SessionTransferResponseSchema,
  SessionListResponseSchema,
  SessionStatisticsResponseSchema,
  SessionCleanupResponseSchema,
  // Error schemas
  SessionErrorSchema,
  // Types
  type SessionId,
  type RefreshToken,
  type AccessToken,
  type TokenId,
  type SessionStatus,
  type SessionTrustLevel,
  type LocationInfo,
  type SessionTokens,
  type Session,
  type CreateSessionRequest,
  type CreateSessionResponse,
  type RefreshSessionRequest,
  type RefreshSessionResponse,
  type TerminateSessionRequest,
  type TerminateSessionsRequest,
  type TerminateSessionsResponse,
  type ValidateSessionRequest,
  type SessionValidationResponse,
  type SessionHeartbeatRequest,
  type SessionHeartbeatResponse,
  type SessionTransferRequest,
  type SessionTransferResponse,
  type SessionFilterRequest,
  type SessionListResponse,
  type SessionStatisticsResponse,
  type SessionCleanupRequest,
  type SessionCleanupResponse,
  type SessionError,
  // Device schemas
  DeviceIdSchema,
  DeviceTypeSchema,
  OSTypeSchema,
  BrowserTypeSchema,
  DeviceTrustLevelSchema,
  DeviceInfoSchema,
  DeviceFingerprintSchema,
  TrustedDeviceSchema,
  DeviceRiskAssessmentSchema,
  DeviceActivitySchema,
  RegisterDeviceSchema,
  UpdateDeviceTrustSchema,
  RemoveDeviceSchema,
  DeviceSessionTransferSchema,
  DevicePairingSchema,
  DeviceUnpairSchema,
  DeviceFilterSchema,
  DeviceResponseSchema,
  DeviceListResponseSchema,
  DeviceSessionTransferResponseSchema,
  DevicePairingResponseSchema,
  DeviceStatisticsResponseSchema,
  DeviceErrorSchema,
  NetworkTypeSchema,
  MobileOperatorSchema,
  type DeviceId,
  type DeviceType,
  type OSType,
  type BrowserType,
  type DeviceTrustLevel,
  type DeviceInfo,
  type DeviceFingerprint,
  type TrustedDevice,
  type DeviceRiskAssessment,
  type DeviceActivity,
  type RegisterDeviceRequest,
  type UpdateDeviceTrustRequest,
  type RemoveDeviceRequest,
  type DeviceSessionTransferRequest,
  type DevicePairingRequest,
  type DeviceUnpairRequest,
  type DeviceFilterRequest,
  type DeviceResponse,
  type DeviceListResponse,
  type DeviceSessionTransferResponse,
  type DevicePairingResponse,
  type DeviceStatisticsResponse,
  type DeviceError,
  type NetworkType,
  type MobileOperator,
} from './session';
